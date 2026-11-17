import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import MemoryGallery from './components/MemoryGallery';
import TributeWall from './components/TributeWall';
import CardStudio from './components/CardStudio';
import PoetryCorner from './components/PoetryCorner';
import Footer from './components/Footer';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import { RoseFireworksOverlay } from './components/FloralAccents';
import { TributeWish, WishCategory } from './data/tributeData';
import {
  db,
  getOrCreateVisitorId,
  handleFirestoreError,
  OperationType,
} from './lib/firebase';
import { isValidWishImageDataUrl } from './lib/imageUtils';
import { MusicTrackId } from './lib/musicEngine';

function formatTimestampDate(ts: unknown): string {
  if (ts instanceof Timestamp) {
    const d = ts.toDate();
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}/${d.getFullYear()}`;
  }
  const now = new Date();
  return `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}/${now.getFullYear()}`;
}

export default function App() {
  const [visitorId] = useState<string>(() => getOrCreateVisitorId());

  const [firestoreWishes, setFirestoreWishes] = useState<TributeWish[]>([]);
  const [bouquetUserIds, setBouquetUserIds] = useState<string[]>([]);
  const [wishFlowerCounts, setWishFlowerCounts] = useState<Record<string, number>>({});
  const [userLikedWishIds, setUserLikedWishIds] = useState<Record<string, boolean>>({});
  const [isOfferingFlower, setIsOfferingFlower] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<'Tất cả' | WishCategory>('Tất cả');
  const [composerOpen, setComposerOpen] = useState(true);
  const [draftCategory, setDraftCategory] = useState<WishCategory>('Thầy Cô Chủ Nhiệm');

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [activeTrack, setActiveTrack] = useState<MusicTrackId>('nguoi-thay');
  const [playSignal, setPlaySignal] = useState(0);

  // Listen to public wishes in real time (zero pre-seeded wishes)
  useEffect(() => {
    const q = query(collection(db, 'wishes'), where('isPublic', '==', true));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const loaded: TributeWish[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          const createdAtMs =
            data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now();
          return {
            id: docSnap.id,
            teacherName: String(data.teacherName || 'Quý Thầy Cô'),
            senderName: String(data.senderName || 'Học trò'),
            cohort: String(data.cohort || 'Học sinh Trường THPT Nguyễn Trãi'),
            category: (data.category as WishCategory) || 'Thầy Cô Chủ Nhiệm',
            message: String(data.message || ''),
            imageDataUrl:
              typeof data.imageDataUrl === 'string' && isValidWishImageDataUrl(data.imageDataUrl)
                ? data.imageDataUrl
                : undefined,
            authorUid: String(data.authorUid || ''),
            createdAt: formatTimestampDate(data.createdAt),
            createdAtMs,
          };
        });
        loaded.sort((a, b) => (b.createdAtMs ?? 0) - (a.createdAtMs ?? 0));
        setFirestoreWishes(loaded);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'wishes');
      }
    );
    return () => unsub();
  }, []);

  // Listen to real bouquet flower offerings
  useEffect(() => {
    const q = query(collection(db, 'bouquetFlowers'), where('isPublic', '==', true));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setBouquetUserIds(snapshot.docs.map((d) => d.id));
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'bouquetFlowers');
      }
    );
    return () => unsub();
  }, []);

  // Listen to per-wish flower counts
  useEffect(() => {
    if (firestoreWishes.length === 0) {
      setWishFlowerCounts({});
      setUserLikedWishIds({});
      return;
    }

    const unsubs = firestoreWishes.map((wish) => {
      const q = query(
        collection(db, 'wishes', wish.id, 'flowers'),
        where('isPublic', '==', true)
      );
      return onSnapshot(
        q,
        (snapshot) => {
          const count = snapshot.size;
          const liked = snapshot.docs.some((d) => d.id === visitorId);
          setWishFlowerCounts((prev) => ({ ...prev, [wish.id]: count }));
          setUserLikedWishIds((prev) => ({ ...prev, [wish.id]: liked }));
        },
        (error) => {
          handleFirestoreError(error, OperationType.LIST, `wishes/${wish.id}/flowers`);
        }
      );
    });

    return () => {
      unsubs.forEach((u) => u());
    };
  }, [firestoreWishes, visitorId]);

  const hasGivenBouquetFlower = useMemo(
    () => bouquetUserIds.includes(visitorId),
    [bouquetUserIds, visitorId]
  );

  const totalFlowers = useMemo(() => {
    const firestoreWishFlowers = Object.values(wishFlowerCounts).reduce((a, b) => a + b, 0);
    return bouquetUserIds.length + firestoreWishFlowers;
  }, [bouquetUserIds.length, wishFlowerCounts]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGiveBouquetFlower = async () => {
    setIsOfferingFlower(true);
    try {
      const ref = doc(db, 'bouquetFlowers', visitorId);
      if (bouquetUserIds.includes(visitorId)) {
        try {
          await deleteDoc(ref);
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, `bouquetFlowers/${visitorId}`);
        }
      } else {
        try {
          await setDoc(ref, {
            userId: visitorId,
            senderName: 'Học trò tri ân',
            isPublic: true,
            createdAt: serverTimestamp(),
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `bouquetFlowers/${visitorId}`);
        }
      }
    } finally {
      setIsOfferingFlower(false);
    }
  };

  const handleAddWish = async (newWish: {
    teacherName: string;
    senderName: string;
    cohort: string;
    category: WishCategory;
    message: string;
    imageDataUrl?: string;
  }) => {
    const randSuffix = Math.random().toString(36).slice(2, 8);
    const wishId = `w_${Date.now()}_${randSuffix}`;
    const path = `wishes/${wishId}`;
    const payload: Record<string, unknown> = {
      teacherName: newWish.teacherName.slice(0, 100),
      senderName: newWish.senderName.slice(0, 80),
      cohort: newWish.cohort.slice(0, 80),
      category: newWish.category,
      message: newWish.message.slice(0, 1000),
      authorUid: visitorId,
      isPublic: true,
      createdAt: serverTimestamp(),
    };
    if (newWish.imageDataUrl && isValidWishImageDataUrl(newWish.imageDataUrl)) {
      payload.imageDataUrl = newWish.imageDataUrl;
    }

    try {
      await setDoc(doc(db, 'wishes', wishId), payload);
      setSelectedCategory('Tất cả');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleToggleWishFlower = async (wishId: string) => {
    const path = `wishes/${wishId}/flowers/${visitorId}`;
    const ref = doc(db, 'wishes', wishId, 'flowers', visitorId);

    if (userLikedWishIds[wishId]) {
      try {
        await deleteDoc(ref);
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, path);
      }
    } else {
      try {
        await setDoc(ref, {
          userId: visitorId,
          senderName: 'Học trò tri ân',
          isPublic: true,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }
  };

  const handleWriteFromMemory = (category: WishCategory) => {
    setDraftCategory(category);
    setComposerOpen(true);
    scrollToSection('luu-but');
  };

  const handleToggleMusicPlay = () => {
    if (!isMusicPlaying && isMusicMuted) {
      setIsMusicMuted(false);
    }
    setPlaySignal((prev) => prev + 1);
  };

  const handleToggleMusicMute = () => {
    setIsMusicMuted((prev) => !prev);
  };

  const handleSelectTrack = (track: MusicTrackId) => {
    if (isMusicMuted) {
      setIsMusicMuted(false);
    }
    setActiveTrack(track);
  };

  const handleSyncPlaying = useCallback((playing: boolean) => {
    setIsMusicPlaying(playing);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8FA] text-[#2E1021] relative">
      <RoseFireworksOverlay />
      <Header
        onJumpToWishes={() => {
          setComposerOpen(true);
          scrollToSection('luu-but');
        }}
      />

      <main className="flex-1">
        <HeroSection
          totalWishes={firestoreWishes.length}
          totalFlowers={totalFlowers}
          hasGivenBouquetFlower={hasGivenBouquetFlower}
          isOfferingFlower={isOfferingFlower}
          onGiveBouquetFlower={handleGiveBouquetFlower}
          onJumpToWishes={() => {
            setComposerOpen(true);
            scrollToSection('luu-but');
          }}
          onJumpToCardStudio={() => scrollToSection('thiep-tri-an')}
          onJumpToMemories={() => scrollToSection('ky-niem')}
        />

        <TributeWall
          wishes={firestoreWishes}
          wishFlowerCounts={wishFlowerCounts}
          userLikedWishIds={userLikedWishIds}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          composerOpen={composerOpen}
          onToggleComposer={setComposerOpen}
          draftCategory={draftCategory}
          onChangeDraftCategory={setDraftCategory}
          onAddWish={handleAddWish}
          onToggleFlower={handleToggleWishFlower}
        />

        <MemoryGallery onWriteTributeForCategory={handleWriteFromMemory} />

        <CardStudio />

        <PoetryCorner
          isPlaying={isMusicPlaying}
          isMuted={isMusicMuted}
          onTogglePlay={handleToggleMusicPlay}
        />
      </main>

      <Footer />

      <FloatingMusicPlayer
        isPlaying={isMusicPlaying}
        isMuted={isMusicMuted}
        activeTrack={activeTrack}
        playSignal={playSignal}
        onSyncPlaying={handleSyncPlaying}
        onToggleMute={handleToggleMusicMute}
        onSelectTrack={handleSelectTrack}
      />
    </div>
  );
}
