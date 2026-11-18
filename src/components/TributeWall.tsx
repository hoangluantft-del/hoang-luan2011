import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  Flower2,
  ImagePlus,
  PenLine,
  Search,
  X,
} from 'lucide-react';
import { TributeWish, WISH_CATEGORIES, WishCategory } from '../data/tributeData';
import { compressImageForWish } from '../lib/imageUtils';
import { BlossomFlower } from './FloralAccents';

interface TributeWallProps {
  wishes: TributeWish[];
  wishFlowerCounts: Record<string, number>;
  userLikedWishIds: Record<string, boolean>;
  selectedCategory: 'Tất cả' | WishCategory;
  onSelectCategory: (category: 'Tất cả' | WishCategory) => void;
  composerOpen: boolean;
  onToggleComposer: (open: boolean) => void;
  draftCategory: WishCategory;
  onChangeDraftCategory: (cat: WishCategory) => void;
  onAddWish: (newWish: {
    teacherName: string;
    senderName: string;
    cohort: string;
    category: WishCategory;
    message: string;
    imageDataUrl?: string;
  }) => Promise<void>;
  onToggleFlower: (wishId: string) => Promise<void>;
}

export default function TributeWall({
  wishes,
  wishFlowerCounts,
  userLikedWishIds,
  selectedCategory,
  onSelectCategory,
  composerOpen,
  onToggleComposer,
  draftCategory,
  onChangeDraftCategory,
  onAddWish,
  onToggleFlower,
}: TributeWallProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [cohort, setCohort] = useState('');
  const [message, setMessage] = useState('');
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined);
  const [processingImage, setProcessingImage] = useState(false);
  const [lightboxWish, setLightboxWish] = useState<TributeWish | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!lightboxWish) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxWish(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxWish]);

  const filteredWishes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return wishes.filter((item) => {
      const matchesCategory =
        selectedCategory === 'Tất cả' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.teacherName.toLowerCase().includes(q) ||
        item.senderName.toLowerCase().includes(q) ||
        item.cohort.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
    });
  }, [wishes, selectedCategory, searchQuery]);

  const handleImageSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProcessingImage(true);
    setErrorMsg('');
    try {
      const compressed = await compressImageForWish(file);
      setImageDataUrl(compressed);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Không thể tải ảnh lên. Vui lòng thử ảnh khác.'
      );
    } finally {
      setProcessingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClearImage = () => {
    setImageDataUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const cleanTeacher = teacherName.trim();
    const cleanSender = senderName.trim();
    const cleanCohort = cohort.trim() || 'Học sinh Trường THPT Nguyễn Trãi';
    const cleanMsg = message.trim();

    if (cleanTeacher.length < 2 || cleanTeacher.length > 100) {
      setErrorMsg('Vui lòng nhập tên Thầy / Cô bạn muốn tri ân (2–100 ký tự).');
      return;
    }
    if (cleanSender.length < 1 || cleanSender.length > 80) {
      setErrorMsg('Vui lòng nhập tên của bạn (tối đa 80 ký tự).');
      return;
    }
    if (cleanCohort.length > 80) {
      setErrorMsg('Tên lớp / niên khóa tối đa 80 ký tự.');
      return;
    }
    if (cleanMsg.length < 5 || cleanMsg.length > 1000) {
      setErrorMsg('Lời chúc cần có ít nhất 5 ký tự và tối đa 1000 ký tự.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    try {
      await onAddWish({
        teacherName: cleanTeacher,
        senderName: cleanSender,
        cohort: cleanCohort,
        category: draftCategory,
        message: cleanMsg,
        imageDataUrl,
      });

      setTeacherName('');
      setMessage('');
      handleClearImage();
      setJustSubmitted(true);
      setTimeout(() => setJustSubmitted(false), 5000);
    } catch {
      setErrorMsg('Không thể lưu lời chúc lúc này. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="luu-but" className="border-b border-[#FBCFE8] bg-[#FFF8FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <BlossomFlower className="w-6 h-6 shrink-0" />
              <p className="text-xs font-medium uppercase tracking-wider text-[#BE185D]">
                Lưu bút 20/11 tự do chia sẻ
              </p>
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#2E1021] text-balance">
              Bức tường lời chúc tri ân các Thầy Cô
            </h2>
            <p className="mt-2 text-sm text-[#6B4C5B] max-w-xl">
              Không cần đăng nhập — bạn muốn gửi lời chúc đến thầy cô nào, chỉ cần điền tên thầy
              cô ấy vào bên dưới cùng ảnh kỷ niệm (nếu có) và thả hoa tươi nhé.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onToggleComposer(!composerOpen)}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
          >
            {composerOpen ? (
              <>
                <X className="w-4 h-4" aria-hidden="true" />
                <span>Thu gọn khung viết</span>
              </>
            ) : (
              <>
                <PenLine className="w-4 h-4" aria-hidden="true" />
                <span>Viết lời chúc mới</span>
              </>
            )}
          </button>
        </div>

        {/* Submission Confirmation Banner */}
        {justSubmitted && (
          <div
            role="status"
            className="mb-6 flex items-center gap-3 px-4 py-3 bg-[#FDF2F8] border border-[#F9A8D4] text-[#831843] rounded-lg text-sm"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#BE185D]" aria-hidden="true" />
            <span>Lời chúc của bạn đã được ghim lên bức tường tri ân!</span>
          </div>
        )}

        {/* Shared Wish Composer — Open Directly Without Login */}
        {composerOpen && (
          <div className="mb-10 p-4 sm:p-8 bg-white border border-[#FBCFE8] rounded-xl shadow-xs">
            <div className="pb-4 mb-6 border-b border-[#FCE7F3]">
              <h3 className="font-serif text-xl font-semibold text-[#2E1021]">
                Gửi lời chúc tri ân đến Thầy / Cô của bạn
              </h3>
              <p className="text-xs text-[#6B4C5B] mt-1">
                Nhập tên thầy cô, lời chúc và ảnh kỷ niệm (tùy chọn) — lời chúc sẽ hiển thị ngay
                cho mọi người cùng xem.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <p className="mb-4 px-3.5 py-2.5 text-sm text-[#9F1239] bg-[#FFF1F2] border border-[#FECDD3] rounded-md">
                  {errorMsg}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="wish-teacher"
                    className="block text-sm font-medium text-[#2E1021] mb-1.5"
                  >
                    Kính gửi Thầy / Cô <span className="text-[#BE185D]">*</span>
                  </label>
                  <input
                    id="wish-teacher"
                    type="text"
                    maxLength={100}
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Nhập tên thầy/cô (VD: Cô Ngọc Bảo, Thầy Minh...)"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFF8FA] border border-[#FBCFE8] rounded-md text-[#2E1021] placeholder:text-[#9D7A8C] focus:outline-none focus:border-[#BE185D] focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="wish-category"
                    className="block text-sm font-medium text-[#2E1021] mb-1.5"
                  >
                    Nhóm tri ân
                  </label>
                  <select
                    id="wish-category"
                    value={draftCategory}
                    onChange={(e) => onChangeDraftCategory(e.target.value as WishCategory)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFF8FA] border border-[#FBCFE8] rounded-md text-[#2E1021] focus:outline-none focus:border-[#BE185D] focus:bg-white"
                  >
                    {WISH_CATEGORIES.filter((c) => c !== 'Tất cả').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="wish-sender"
                    className="block text-sm font-medium text-[#2E1021] mb-1.5"
                  >
                    Tên của bạn <span className="text-[#BE185D]">*</span>
                  </label>
                  <input
                    id="wish-sender"
                    type="text"
                    maxLength={80}
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Minh Anh"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFF8FA] border border-[#FBCFE8] rounded-md text-[#2E1021] placeholder:text-[#9D7A8C] focus:outline-none focus:border-[#BE185D] focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="wish-cohort"
                    className="block text-sm font-medium text-[#2E1021] mb-1.5"
                  >
                    Lớp / Niên khóa
                  </label>
                  <input
                    id="wish-cohort"
                    type="text"
                    maxLength={80}
                    value={cohort}
                    onChange={(e) => setCohort(e.target.value)}
                    placeholder="Ví dụ: Lớp 12A1 hoặc Cựu học sinh"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FFF8FA] border border-[#FBCFE8] rounded-md text-[#2E1021] placeholder:text-[#9D7A8C] focus:outline-none focus:border-[#BE185D] focus:bg-white"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="wish-message"
                  className="block text-sm font-medium text-[#2E1021] mb-1.5"
                >
                  Lời chúc gửi Thầy / Cô <span className="text-[#BE185D]">*</span>
                </label>
                <textarea
                  id="wish-message"
                  rows={4}
                  maxLength={1000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Viết những lời chúc tốt đẹp nhất gửi đến thầy cô nhân ngày 20/11..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FFF8FA] border border-[#FBCFE8] rounded-md text-[#2E1021] placeholder:text-[#9D7A8C] focus:outline-none focus:border-[#BE185D] focus:bg-white"
                />
              </div>

              {/* Optional Photo Attachment */}
              <div className="mt-5">
                <span className="block text-sm font-medium text-[#2E1021] mb-1.5">
                  Ảnh kỷ niệm đính kèm{' '}
                  <span className="text-xs font-normal text-[#6B4C5B]">(không bắt buộc)</span>
                </span>

                <input
                  ref={fileInputRef}
                  id="wish-photo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/*"
                  onChange={handleImageSelect}
                  className="sr-only"
                />

                {!imageDataUrl ? (
                  <label
                    htmlFor="wish-photo"
                    className="flex flex-col sm:flex-row items-center justify-center gap-2.5 px-4 py-4 border border-dashed border-[#F472B6] bg-[#FFF8FA] hover:bg-[#FDF2F8] rounded-lg cursor-pointer transition-colors"
                  >
                    <ImagePlus className="w-5 h-5 text-[#BE185D]" aria-hidden="true" />
                    <span className="text-sm text-[#831843] font-medium text-center">
                      {processingImage
                        ? 'Đang tối ưu kích thước ảnh...'
                        : 'Chọn ảnh kỷ niệm cùng thầy cô từ thiết bị của bạn'}
                    </span>
                  </label>
                ) : (
                  <div className="relative inline-block rounded-lg overflow-hidden border border-[#FBCFE8] bg-[#FFF8FA]">
                    <img
                      src={imageDataUrl}
                      alt="Xem trước ảnh đính kèm lời chúc"
                      className="max-h-52 w-auto object-contain block"
                    />
                    <button
                      type="button"
                      onClick={handleClearImage}
                      aria-label="Xóa ảnh đính kèm"
                      className="absolute top-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-[#2E1021]/80 hover:bg-[#BE185D] rounded-md transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Xóa ảnh</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => onToggleComposer(false)}
                  className="px-4 py-2 text-sm font-medium text-[#6B4C5B] hover:bg-[#FCE7F3] rounded-md transition-colors cursor-pointer"
                >
                  Thu gọn
                </button>
                <button
                  type="submit"
                  disabled={submitting || processingImage}
                  className="px-5 py-2 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] disabled:opacity-60 rounded-md transition-colors cursor-pointer"
                >
                  {submitting ? 'Đang gửi...' : 'Gửi lời chúc lên bảng tri ân'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter & Search Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#FBCFE8]">
          <div
            role="tablist"
            aria-label="Lọc lời chúc theo chủ đề"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FCE7F3]/75 rounded-lg"
          >
            {WISH_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-white text-[#831843] shadow-xs'
                      : 'text-[#6B4C5B] hover:text-[#2E1021]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search
              className="w-4 h-4 text-[#9D7A8C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên thầy cô, học sinh..."
              aria-label="Tìm kiếm lời chúc"
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-white border border-[#FBCFE8] rounded-md text-[#2E1021] placeholder:text-[#9D7A8C] focus:outline-none focus:border-[#BE185D]"
            />
          </div>
        </div>

        {/* Empty State or Wishes Grid */}
        {wishes.length === 0 ? (
          <div className="py-16 px-6 text-center bg-white border border-[#FBCFE8] rounded-xl">
            <div className="flex justify-center mb-3">
              <BlossomFlower className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#2E1021]">
              Chưa có lời chúc nào được viết
            </h3>
            <p className="mt-2 text-sm text-[#6B4C5B] max-w-md mx-auto leading-relaxed">
              Bảng lưu bút đang chờ những lời chúc đầu tiên từ các bạn. Hãy điền tên thầy cô bạn
              muốn tri ân ở khung bên trên và thả những đóa hoa tươi nhé!
            </p>
            {!composerOpen && (
              <button
                type="button"
                onClick={() => onToggleComposer(true)}
                className="mt-6 px-5 py-2.5 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] rounded-md transition-colors cursor-pointer"
              >
                Viết lời chúc đầu tiên
              </button>
            )}
          </div>
        ) : filteredWishes.length === 0 ? (
          <div className="py-14 px-6 text-center bg-white border border-[#FBCFE8] rounded-xl">
            <p className="font-serif text-xl text-[#2E1021]">
              Không tìm thấy lời chúc phù hợp
            </p>
            <p className="mt-2 text-sm text-[#6B4C5B]">
              Thử đổi từ khóa tìm kiếm hoặc chọn lại mục “Tất cả”.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('Tất cả');
              }}
              className="mt-5 px-4 py-2 text-sm font-medium text-[#BE185D] border border-[#BE185D] rounded-md hover:bg-[#FDF2F8] transition-colors cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWishes.map((wish) => {
              const flowerCount = wishFlowerCounts[wish.id] ?? 0;
              const liked = Boolean(userLikedWishIds[wish.id]);

              return (
                <article
                  key={wish.id}
                  className="flex flex-col justify-between p-5 sm:p-6 bg-white border border-[#FBCFE8] hover:border-[#F472B6]/80 rounded-xl hover:shadow-sm transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center gap-2 min-w-0 text-xs text-[#6B4C5B] tabular-nums">
                      <span className="truncate">{wish.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="shrink-0">{wish.createdAt}</span>
                    </div>

                    <h3 className="mt-2 font-serif text-lg font-semibold text-[#831843] break-words">
                      Kính gửi {wish.teacherName}
                    </h3>

                    {wish.imageDataUrl && (
                      <button
                        type="button"
                        onClick={() => setLightboxWish(wish)}
                        className="mt-3 block w-full overflow-hidden rounded-lg border border-[#FCE7F3] bg-[#FFF8FA] cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
                      >
                        <img
                          src={wish.imageDataUrl}
                          alt={`Ảnh kỷ niệm đính kèm lời chúc gửi ${wish.teacherName}`}
                          className="w-full h-48 object-cover hover:scale-[1.02] transition-transform duration-300"
                        />
                      </button>
                    )}

                    <p className="mt-3 text-sm leading-[1.7] text-[#3B1E2D] whitespace-pre-line break-words">
                      “{wish.message}”
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#FCE7F3] flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#2E1021] truncate">
                        {wish.senderName}
                      </p>
                      <p className="text-xs text-[#6B4C5B] truncate">{wish.cohort}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleFlower(wish.id)}
                      aria-pressed={liked}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        liked
                          ? 'bg-[#BE185D] text-white border-[#BE185D]'
                          : 'bg-[#FFF8FA] text-[#BE185D] border-[#FBCFE8] hover:bg-[#FCE7F3]'
                      }`}
                    >
                      <Flower2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span className="tabular-nums">{flowerCount}</span>
                      <span>Thả hoa</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Wish Image */}
      {lightboxWish && lightboxWish.imageDataUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Ảnh đính kèm từ ${lightboxWish.senderName}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={() => setLightboxWish(null)}
        >
          <div
            className="animate-modal-enter relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxWish(null)}
              aria-label="Đóng ảnh"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-[#BE185D] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
            <img
              src={lightboxWish.imageDataUrl}
              alt={`Ảnh kỷ niệm gửi ${lightboxWish.teacherName}`}
              className="w-full max-h-[75vh] object-contain bg-[#1C0D15]"
            />
            <div className="p-4 sm:p-5 bg-white border-t border-[#FCE7F3]">
              <p className="font-serif text-base font-semibold text-[#831843]">
                Kính gửi {lightboxWish.teacherName}
              </p>
              <p className="mt-1 text-sm text-[#3B1E2D]">{lightboxWish.message}</p>
              <p className="mt-2 text-xs text-[#6B4C5B]">
                Người gửi: {lightboxWish.senderName} · {lightboxWish.cohort}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
