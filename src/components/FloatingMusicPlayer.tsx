import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { MUSIC_TRACKS, MusicTrackId } from '../lib/musicEngine';

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  getPlayerState: () => number;
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
}

interface YTNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: () => void;
        onStateChange?: (event: { data: number }) => void;
      };
    }
  ) => YTPlayerInstance;
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface FloatingMusicPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  activeTrack: MusicTrackId;
  playSignal: number;
  onSyncPlaying: (playing: boolean) => void;
  onSyncMuted: (muted: boolean) => void;
  onToggleMute: () => void;
  onSelectTrack: (track: MusicTrackId) => void;
}

export default function FloatingMusicPlayer({
  isPlaying,
  isMuted,
  activeTrack,
  playSignal,
  onSyncPlaying,
  onSyncMuted,
  onToggleMute,
  onSelectTrack,
}: FloatingMusicPlayerProps) {
  const [expanded, setExpanded] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [waitingTapForSound, setWaitingTapForSound] = useState(false);

  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const loadedTrackRef = useRef<MusicTrackId>(activeTrack);
  const lastSignalRef = useRef(playSignal);
  const userStoppedRef = useRef(false);
  const userMutedRef = useRef(false);
  const isMutedRef = useRef(isMuted);

  isMutedRef.current = isMuted;

  const currentMeta = MUSIC_TRACKS.find((t) => t.id === activeTrack) ?? MUSIC_TRACKS[0];

  // Auto-unmute and start playback on first page interaction if browser blocked initial sound
  useEffect(() => {
    if (!waitingTapForSound) return;

    const unlockSound = () => {
      setWaitingTapForSound(false);
      if (userStoppedRef.current || userMutedRef.current) return;
      const player = playerRef.current;
      if (!player) return;
      player.unMute();
      player.playVideo();
      onSyncMuted(false);
    };

    window.addEventListener('pointerdown', unlockSound, { capture: true, once: true, passive: true });
    window.addEventListener('keydown', unlockSound, { capture: true, once: true, passive: true });
    window.addEventListener('touchstart', unlockSound, { capture: true, once: true, passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockSound, { capture: true });
      window.removeEventListener('keydown', unlockSound, { capture: true });
      window.removeEventListener('touchstart', unlockSound, { capture: true });
    };
  }, [waitingTapForSound, onSyncMuted]);

  // Load YouTube IFrame API once and auto-start music when entering the site
  useEffect(() => {
    let mounted = true;
    let fallbackTimer: number | null = null;

    const initPlayer = () => {
      if (!mounted || !hostRef.current || !window.YT?.Player || playerRef.current) return;

      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId: currentMeta.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          loop: 1,
          playlist: currentMeta.youtubeId,
        },
        events: {
          onReady: () => {
            if (!mounted || !playerRef.current) return;
            setPlayerReady(true);

            if (!userStoppedRef.current) {
              if (!userMutedRef.current) {
                playerRef.current.unMute();
              } else {
                playerRef.current.mute();
              }
              playerRef.current.playVideo();

              // If browser blocked unmuted autoplay, fall back to muted autoplay + unlock on 1st tap
              fallbackTimer = window.setTimeout(() => {
                if (!mounted || !playerRef.current || userStoppedRef.current) return;
                const state = playerRef.current.getPlayerState?.();
                const playingState = window.YT?.PlayerState?.PLAYING ?? 1;
                if (state !== playingState) {
                  playerRef.current.mute();
                  playerRef.current.playVideo();
                  onSyncMuted(true);
                  setWaitingTapForSound(true);
                }
              }, 700);
            }
          },
          onStateChange: (event) => {
            if (!mounted || !window.YT?.PlayerState) return;
            if (event.data === window.YT.PlayerState.PLAYING) {
              onSyncPlaying(true);
              if (!isMutedRef.current) {
                setWaitingTapForSound(false);
              }
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
              onSyncPlaying(false);
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prevReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevReady) prevReady();
        initPlayer();
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        document.head.appendChild(tag);
      }
    }

    return () => {
      mounted = false;
      if (fallbackTimer !== null) {
        window.clearTimeout(fallbackTimer);
      }
      playerRef.current?.destroy();
      playerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync mute state
  useEffect(() => {
    if (!playerReady || !playerRef.current) return;
    if (isMuted) {
      playerRef.current.mute();
    } else {
      playerRef.current.unMute();
    }
  }, [isMuted, playerReady]);

  // Switch song when activeTrack changes
  useEffect(() => {
    if (loadedTrackRef.current === activeTrack) return;
    loadedTrackRef.current = activeTrack;
    userStoppedRef.current = false;
    if (!playerReady || !playerRef.current) return;
    const track = MUSIC_TRACKS.find((t) => t.id === activeTrack) ?? MUSIC_TRACKS[0];
    playerRef.current.unMute();
    playerRef.current.loadVideoById(track.youtubeId);
    onSyncMuted(false);
    onSyncPlaying(true);
  }, [activeTrack, playerReady, onSyncPlaying, onSyncMuted]);

  // Respond to external play/pause signals (e.g. from PoetryCorner)
  useEffect(() => {
    if (playSignal === lastSignalRef.current) return;
    lastSignalRef.current = playSignal;
    if (!playerReady || !playerRef.current) return;

    if (isPlaying && !isMuted) {
      userStoppedRef.current = true;
      setWaitingTapForSound(false);
      playerRef.current.pauseVideo();
    } else {
      userStoppedRef.current = false;
      userMutedRef.current = false;
      setWaitingTapForSound(false);
      playerRef.current.unMute();
      playerRef.current.playVideo();
      onSyncMuted(false);
    }
  }, [playSignal, playerReady, isPlaying, isMuted, onSyncMuted]);

  const handleTogglePlay = () => {
    if (!playerReady || !playerRef.current) {
      setExpanded(true);
      return;
    }

    if (isPlaying && !isMuted) {
      userStoppedRef.current = true;
      setWaitingTapForSound(false);
      playerRef.current.pauseVideo();
    } else {
      userStoppedRef.current = false;
      userMutedRef.current = false;
      setWaitingTapForSound(false);
      if (isMuted) {
        onSyncMuted(false);
      }
      playerRef.current.unMute();
      playerRef.current.playVideo();
    }
  };

  const handleMuteButtonClick = () => {
    if (!isMuted) {
      userMutedRef.current = true;
      setWaitingTapForSound(false);
    } else {
      userMutedRef.current = false;
      userStoppedRef.current = false;
      setWaitingTapForSound(false);
      if (playerReady && playerRef.current && !isPlaying) {
        playerRef.current.playVideo();
      }
    }
    onToggleMute();
  };

  const statusText = waitingTapForSound
    ? 'Chạm bất kỳ đâu để bật tiếng'
    : isPlaying
      ? isMuted
        ? 'Đang tắt tiếng · Bấm loa để bật'
        : 'Đang phát trọn bài · Bấm để tắt'
      : 'Đã tắt nhạc · Bấm để phát';

  return (
    <aside
      aria-label="Trình phát nhạc tri ân 20/11"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 w-[256px] sm:w-[276px]"
    >
      <div className="bg-white/95 backdrop-blur-md border border-[#F9A8D4] rounded-xl shadow-lg overflow-hidden">
        {/* Compact Corner Header Bar */}
        <div className="px-2.5 py-2 bg-gradient-to-r from-[#831843] via-[#9D174D] to-[#BE185D] text-white flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying && !isMuted ? 'Tắt nhạc nền' : 'Phát trọn bài hát'}
              className="w-7 h-7 rounded-full bg-white text-[#9D174D] hover:bg-[#FFF1F5] flex items-center justify-center shrink-0 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {isPlaying && !isMuted ? (
                <Pause className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" aria-hidden="true" />
              )}
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <Music className="w-3 h-3 text-[#FDE68A] shrink-0" aria-hidden="true" />
                <p className="text-xs font-semibold truncate">
                  {currentMeta.title} · {currentMeta.artist}
                </p>
              </div>
              <p className="text-[10px] text-[#FCE7F3] truncate">{statusText}</p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              onClick={handleMuteButtonClick}
              aria-pressed={isMuted}
              aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
              className="w-6 h-6 rounded hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-[#FDE68A]" aria-hidden="true" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label={expanded ? 'Thu nhỏ trình phát' : 'Mở trình phát nhạc'}
              title={expanded ? 'Thu nhỏ' : 'Mở rộng'}
              className="w-6 h-6 rounded hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              {expanded ? (
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Keep iframe mounted with real dimensions so full song plays smoothly even when minimized */}
        <div
          className={
            expanded ? 'max-h-[220px] transition-all duration-200' : 'max-h-0 overflow-hidden'
          }
        >
          <div className="px-2 py-1.5 bg-[#FFF8FA] border-b border-[#FCE7F3] grid grid-cols-2 gap-1.5">
            {MUSIC_TRACKS.map((track) => {
              const selected = track.id === activeTrack;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => onSelectTrack(track.id)}
                  className={`px-2 py-1 rounded text-[11px] font-medium border truncate transition-colors cursor-pointer ${
                    selected
                      ? 'bg-[#BE185D] text-white border-[#BE185D]'
                      : 'bg-white text-[#6B4C5B] border-[#FBCFE8] hover:text-[#2E1021]'
                  }`}
                >
                  {track.title}
                </button>
              );
            })}
          </div>

          <div className="w-full h-[140px] bg-[#1C0D15]">
            <div ref={hostRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </aside>
  );
}
