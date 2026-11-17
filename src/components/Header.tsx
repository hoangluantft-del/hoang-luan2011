import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onJumpToWishes: () => void;
}

const NAV_LINKS = [
  { href: '#trang-chu', label: 'Trang chủ' },
  { href: '#luu-but', label: 'Lời chúc' },
  { href: '#ky-niem', label: 'Ảnh trường' },
  { href: '#thiep-tri-an', label: 'Thiệp 20/11' },
];

export default function Header({ onJumpToWishes }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8FA]/95 backdrop-blur-sm border-b border-[#FBCFE8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#trang-chu"
          className="font-serif text-xl font-semibold tracking-tight text-[#831843] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE185D]"
        >
          Tri Ân Thầy Cô 20/11
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6B4C5B]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#BE185D] underline-offset-4 hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE185D]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onJumpToWishes}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D]"
          >
            Viết lời chúc
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#2E1021] hover:bg-[#FCE7F3] rounded-md transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#FBCFE8] bg-[#FFF8FA] px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-2 text-sm font-medium text-[#2E1021] hover:bg-[#FCE7F3] rounded-md"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onJumpToWishes();
              }}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] rounded-md transition-colors cursor-pointer"
            >
              Viết lời chúc gửi Thầy Cô
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
