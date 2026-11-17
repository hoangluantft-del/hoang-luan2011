import { ArrowUp, Mail } from 'lucide-react';
import { SCHOOL_LOGO } from '../data/tributeData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FFF1F5] border-t border-[#FBCFE8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-3.5">
          <img
            src={SCHOOL_LOGO}
            alt="Logo Trường THPT Nguyễn Trãi"
            className="h-12 w-auto object-contain bg-white rounded-lg border border-[#FBCFE8] p-1 shrink-0 mt-0.5"
          />
          <div>
            <p className="font-serif text-lg font-semibold text-[#831843]">
              Kỷ Niệm Ngày Nhà Giáo Việt Nam 20/11 — Trường THPT Nguyễn Trãi (1954)
            </p>
            <p className="mt-1 text-xs text-[#6B4C5B]">
              Trang lưu bút, thả hoa và thiết kế thiệp tri ân quý Thầy Cô nhân dịp 20/11.
            </p>
            <p className="mt-2 text-xs text-[#6B4C5B] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#BE185D] shrink-0" aria-hidden="true" />
              <span>Liên hệ ban biên tập:</span>
              <a
                href="mailto:hoangluantft@gmail.com"
                className="font-medium text-[#831843] hover:text-[#BE185D] underline underline-offset-2"
              >
                hoangluantft@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#6B4C5B]">
          <a href="#luu-but" className="hover:text-[#BE185D] transition-colors">
            Lời chúc
          </a>
          <a href="#ky-niem" className="hover:text-[#BE185D] transition-colors">
            Ảnh trường
          </a>
          <a href="#thiep-tri-an" className="hover:text-[#BE185D] transition-colors">
            Thiệp 20/11
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#BE185D] hover:text-[#9D174D] transition-colors cursor-pointer"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
