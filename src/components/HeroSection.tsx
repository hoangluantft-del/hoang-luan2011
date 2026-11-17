import { useState } from 'react';
import { BookOpen, Flower2, HeartHandshake, Mail, PenLine } from 'lucide-react';
import { SCHOOL_HERO_BG, SCHOOL_LOGO, SCHOOL_TEACHERS_CELEBRATION } from '../data/tributeData';
import { BlossomFlower, BlossomSprig } from './FloralAccents';

interface HeroSectionProps {
  totalWishes: number;
  totalFlowers: number;
  hasGivenBouquetFlower: boolean;
  isOfferingFlower: boolean;
  onGiveBouquetFlower: () => void;
  onJumpToWishes: () => void;
  onJumpToCardStudio: () => void;
  onJumpToMemories: () => void;
}

export default function HeroSection({
  totalWishes,
  totalFlowers,
  hasGivenBouquetFlower,
  isOfferingFlower,
  onGiveBouquetFlower,
  onJumpToWishes,
  onJumpToCardStudio,
  onJumpToMemories,
}: HeroSectionProps) {
  const [bgError, setBgError] = useState(false);
  const [featureError, setFeatureError] = useState(false);

  return (
    <section id="trang-chu">
      {/* Ceremonial Top Ribbon */}
      <div className="bg-[#831843] text-[#FDE68A] border-b border-[#F472B6]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] sm:text-xs font-medium tracking-[0.14em] uppercase text-center tabular-nums">
          <span>Kỷ niệm 44 năm Ngày Nhà Giáo Việt Nam</span>
          <span aria-hidden="true">·</span>
          <span>20/11/1982 – 20/11/2026</span>
          <span aria-hidden="true">·</span>
          <span>Trường THPT Nguyễn Trãi – Phan Rang (1954)</span>
        </div>
      </div>

      {/* Full-bleed Real School Photo Hero Banner */}
      <div className="relative overflow-hidden bg-[#4A0E2B]">
        {!bgError && (
          <img
            src={SCHOOL_HERO_BG}
            alt="Toàn cảnh cổng Trường THPT Nguyễn Trãi"
            referrerPolicy="no-referrer"
            onError={() => setBgError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Measured rose-plum scrim for >= 4.5:1 contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#3B0A22]/80 via-[#4A0E2B]/65 to-[#5B1336]/88"
        />

        {/* Corner blossom sprigs */}
        <div className="hidden sm:block pointer-events-none absolute top-6 left-6 opacity-85">
          <BlossomSprig className="w-28 h-20" />
        </div>
        <div className="hidden sm:block pointer-events-none absolute top-6 right-6 opacity-85 -scale-x-100">
          <BlossomSprig className="w-28 h-20" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-28 sm:pt-14 sm:pb-32 text-center">
          <div className="inline-flex items-center justify-center bg-white/95 rounded-xl px-3.5 py-2 shadow-md border border-[#FDE68A]/80 mb-5">
            <img
              src={SCHOOL_LOGO}
              alt="Logo Trường THPT Nguyễn Trãi 1954"
              className="h-14 sm:h-18 w-auto object-contain"
            />
          </div>

          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#FDE68A]">
            Lễ Kỷ Niệm Ngày Nhà Giáo Việt Nam · 20 tháng 11
          </p>

          <div className="w-28 h-px bg-[#FDE68A]/60 mx-auto my-4" aria-hidden="true" />

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.15] text-balance max-w-3xl mx-auto">
            Chào Mừng Ngày Nhà Giáo Việt Nam 20/11
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#FCE7F3] leading-relaxed max-w-2xl mx-auto">
            Tôn sư trọng đạo · Uống nước nhớ nguồn — Trang kỷ yếu trang trọng nơi học sinh Trường
            THPT Nguyễn Trãi gửi gắm những lời tri ân chân thành và những đóa hoa tươi thắm nhất
            kính dâng quý Thầy Cô.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onJumpToWishes}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#831843] bg-white hover:bg-[#FFF1F5] rounded-md shadow-sm transition-colors cursor-pointer"
            >
              <PenLine className="w-4 h-4" aria-hidden="true" />
              <span>Viết lời chúc gửi Thầy Cô</span>
            </button>

            <button
              type="button"
              onClick={onGiveBouquetFlower}
              disabled={isOfferingFlower}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] border border-[#FDE68A]/50 rounded-md transition-colors cursor-pointer disabled:opacity-70"
            >
              <Flower2 className="w-4 h-4" aria-hidden="true" />
              <span>
                {hasGivenBouquetFlower ? 'Đã dâng hoa kỷ niệm' : 'Dâng hoa kỷ niệm 20/11'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Clean White Action Cards overlapping bottom edge of school banner */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-18 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <button
            type="button"
            onClick={onJumpToWishes}
            className="group text-left bg-white hover:bg-[#FFF8FA] border border-[#FBCFE8] rounded-xl p-6 shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#BE185D]"
          >
            <div className="w-11 h-11 rounded-lg bg-[#FCE7F3] text-[#BE185D] flex items-center justify-center mb-4">
              <PenLine className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-lg font-semibold text-[#2E1021] group-hover:text-[#BE185D] transition-colors">
              Viết lời chúc
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6B4C5B] leading-relaxed">
              Nhắn gửi trực tiếp đến thầy cô bạn yêu quý (<span className="tabular-nums">{totalWishes}</span> lời chúc).
            </p>
          </button>

          <button
            type="button"
            onClick={onGiveBouquetFlower}
            disabled={isOfferingFlower}
            className="group text-left bg-white hover:bg-[#FFF8FA] border border-[#FBCFE8] rounded-xl p-6 shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#BE185D]"
          >
            <div className="w-11 h-11 rounded-lg bg-[#FCE7F3] text-[#BE185D] flex items-center justify-center mb-4">
              <Flower2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-lg font-semibold text-[#2E1021] group-hover:text-[#BE185D] transition-colors">
              Dâng hoa tri ân
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6B4C5B] leading-relaxed">
              Góp thêm hoa tươi vào bó hoa 20/11 (<span className="tabular-nums font-medium text-[#BE185D]">{totalFlowers}</span> đóa hoa).
            </p>
          </button>

          <button
            type="button"
            onClick={onJumpToCardStudio}
            className="group text-left bg-white hover:bg-[#FFF8FA] border border-[#FBCFE8] rounded-xl p-6 shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#BE185D]"
          >
            <div className="w-11 h-11 rounded-lg bg-[#FCE7F3] text-[#BE185D] flex items-center justify-center mb-4">
              <Mail className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-lg font-semibold text-[#2E1021] group-hover:text-[#BE185D] transition-colors">
              Tạo thiệp 20/11
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6B4C5B] leading-relaxed">
              Tự thiết kế thiệp hoa hồng trang trọng và tải ảnh PNG tặng thầy cô.
            </p>
          </button>

          <button
            type="button"
            onClick={onJumpToMemories}
            className="group text-left bg-white hover:bg-[#FFF8FA] border border-[#FBCFE8] rounded-xl p-6 shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#BE185D]"
          >
            <div className="w-11 h-11 rounded-lg bg-[#FCE7F3] text-[#BE185D] flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-lg font-semibold text-[#2E1021] group-hover:text-[#BE185D] transition-colors">
              Khoảnh khắc trường
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#6B4C5B] leading-relaxed">
              Ngắm lại hình ảnh quý thầy cô, lễ kỷ niệm và hoạt động học đường.
            </p>
          </button>
        </div>
      </div>

      {/* Rose-Pink Ceremonial Dedication Band featuring Real School 20/11 Photo */}
      <div className="bg-gradient-to-r from-[#831843] via-[#9D174D] to-[#BE185D] text-white border-y border-[#FDE68A]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-3">
              <BlossomFlower className="w-7 h-7 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#FDE68A]">
                Diễn văn tri ân · 20 tháng 11
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-balance">
              Tri ân những người thầy lặng lẽ thắp sáng ước mơ
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#FCE7F3] leading-[1.75] max-w-2xl">
              Nhân dịp kỷ niệm Ngày Nhà giáo Việt Nam 20/11, tập thể học sinh Trường THPT Nguyễn
              Trãi xin gửi lời tri ân sâu sắc nhất đến quý Thầy Cô Ban Giám Hiệu, quý Thầy Cô chủ
              nhiệm và Thầy Cô bộ môn đã luôn tận tụy dìu dắt chúng em nên người.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onJumpToWishes}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#831843] bg-white hover:bg-[#FFF1F5] rounded-md transition-colors cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" aria-hidden="true" />
                <span>Viết lời chúc tri ân</span>
              </button>
              <span className="text-xs sm:text-sm text-[#FDE68A] tabular-nums">
                {totalFlowers} đóa hoa · {totalWishes} lời chúc đã gửi
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-1.5 rounded-xl border border-[#FDE68A]/45 bg-[#6B1035]">
              <div className="aspect-[16/10] bg-[#831843] rounded-lg overflow-hidden">
                {!featureError ? (
                  <img
                    src={SCHOOL_TEACHERS_CELEBRATION}
                    alt="Quý thầy cô Trường THPT Nguyễn Trãi nhận hoa chúc mừng Ngày Nhà giáo Việt Nam 20-11"
                    referrerPolicy="no-referrer"
                    onError={() => setFeatureError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <BlossomFlower className="w-12 h-12 mb-2" />
                    <p className="font-serif text-lg">Chúc mừng Ngày Nhà giáo Việt Nam 20/11</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
