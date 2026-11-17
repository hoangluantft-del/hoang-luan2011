import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { CHALKBOARD_POEMS } from '../data/tributeData';
import { BlossomFlower } from './FloralAccents';

interface PoetryCornerProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
}

export default function PoetryCorner({
  isPlaying,
  isMuted,
  onTogglePlay,
}: PoetryCornerProps) {
  const [activePoemId, setActivePoemId] = useState(CHALKBOARD_POEMS[0].id);

  const activePoem =
    CHALKBOARD_POEMS.find((p) => p.id === activePoemId) ?? CHALKBOARD_POEMS[0];

  const activeAudio = isPlaying && !isMuted;

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
            onClick={onTogglePlay}
            aria-pressed={activeAudio}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeAudio
                ? 'bg-[#BE185D] text-white border-[#BE185D]'
                : 'bg-white text-[#2E1021] border-[#FBCFE8] hover:bg-[#FCE7F3]'
            }`}
          >
            {activeAudio ? (
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
