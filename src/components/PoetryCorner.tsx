import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { CHALKBOARD_POEMS } from '../data/tributeData';
import { BlossomFlower } from './FloralAccents';

const MELODY_NOTES: Array<{ freq: number; duration: number }> = [
  { freq: 392.0, duration: 0.55 },
  { freq: 440.0, duration: 0.55 },
  { freq: 523.25, duration: 0.85 },
  { freq: 440.0, duration: 0.55 },
  { freq: 392.0, duration: 0.55 },
  { freq: 329.63, duration: 0.9 },
  { freq: 293.66, duration: 0.55 },
  { freq: 329.63, duration: 0.55 },
  { freq: 392.0, duration: 0.85 },
  { freq: 329.63, duration: 0.55 },
  { freq: 293.66, duration: 0.55 },
  { freq: 261.63, duration: 1.1 },
];

export default function PoetryCorner() {
  const [activePoemId, setActivePoemId] = useState(CHALKBOARD_POEMS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const activePoem =
    CHALKBOARD_POEMS.find((p) => p.id === activePoemId) ?? CHALKBOARD_POEMS[0];

  const stopAudio = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const scheduleNextNote = (ctx: AudioContext) => {
    const note = MELODY_NOTES[stepRef.current % MELODY_NOTES.length];
    stepRef.current += 1;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(note.freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + note.duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + note.duration + 0.05);

    timerRef.current = window.setTimeout(() => {
      if (audioCtxRef.current) {
        scheduleNextNote(audioCtxRef.current);
      }
    }, note.duration * 1000);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    audioCtxRef.current = ctx;
    stepRef.current = 0;
    setIsPlaying(true);
    scheduleNextNote(ctx);
  };

  return (
    <section id="tho-nhac" className="border-b border-[#FBCFE8] bg-[#FFF8FA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <BlossomFlower className="w-6 h-6 shrink-0" />
              <p className="text-xs font-medium uppercase tracking-wider text-[#BE185D]">
                Góc báo tường & giai điệu
              </p>
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#2E1021] text-balance">
              Vần thơ kính tặng quý Thầy Cô
            </h2>
          </div>

          <button
            type="button"
            onClick={togglePlay}
            aria-pressed={isPlaying}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isPlaying
                ? 'bg-[#BE185D] text-white border-[#BE185D]'
                : 'bg-white text-[#2E1021] border-[#FBCFE8] hover:bg-[#FCE7F3]'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4" aria-hidden="true" />
                <span>Đang phát nhạc nền · Dừng</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" aria-hidden="true" />
                <span>Nghe giai điệu tri ân</span>
              </>
            )}
          </button>
        </div>

        {/* Rose-Burgundy Velvet Poetry Board */}
        <div className="relative bg-gradient-to-br from-[#831843] to-[#500724] text-[#FFF1F2] rounded-xl p-6 sm:p-10 lg:p-12 border border-[#F472B6]/40 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 pb-6 mb-8 border-b border-white/15">
            {CHALKBOARD_POEMS.map((poem) => {
              const active = poem.id === activePoemId;
              return (
                <button
                  key={poem.id}
                  type="button"
                  onClick={() => setActivePoemId(poem.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-white text-[#831843]'
                      : 'text-[#FCE7F3] hover:bg-white/10'
                  }`}
                >
                  {poem.title}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-widest text-[#FBCFE8]">
                {activePoem.yearNote} · {activePoem.author}
              </p>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-white">
                {activePoem.title}
              </h3>

              <div className="mt-6 space-y-1.5 font-serif italic text-lg sm:text-xl leading-relaxed text-[#FFF1F2]">
                {activePoem.verses.map((line, idx) =>
                  line === '' ? (
                    <div key={idx} className="h-3" aria-hidden="true" />
                  ) : (
                    <p key={idx}>{line}</p>
                  )
                )}
              </div>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-white/15 lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/15">
              <p className="text-xs uppercase tracking-widest text-[#FDE68A]">
                Lời ngỏ của lớp
              </p>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#FCE7F3]">
                {activePoem.reflection}
              </p>
              <div className="mt-6 pt-5 border-t border-white/15 text-xs text-[#FBCFE8]">
                <p>Chúc mừng Ngày Nhà Giáo Việt Nam 20 tháng 11</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
