import { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, Phone, X } from 'lucide-react';

const ZALO_PHONE = '0372356269';
const ZALO_URL = `https://zalo.me/${ZALO_PHONE}`;

export default function ZaloSupportBubble() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ZALO_PHONE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard permission denied
    }
  };

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40 flex flex-col items-start gap-2">
      {open && (
        <div
          role="dialog"
          aria-label="Thông tin Zalo hỗ trợ"
          className="animate-modal-enter w-[228px] max-w-[calc(100vw-24px)] bg-white/95 backdrop-blur-md border border-[#BFDBFE] rounded-xl shadow-xl overflow-hidden"
        >
          <div className="px-3 py-2 bg-[#0068FF] text-white flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#0068FF] text-[10px] font-extrabold shrink-0">
                Z
              </span>
              <span className="text-xs font-semibold truncate">Zalo hỗ trợ</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng hộp Zalo hỗ trợ"
              className="w-7 h-7 rounded hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="p-3 space-y-2.5">
            <div>
              <p className="text-[11px] text-[#6B4C5B]">Số Zalo liên hệ / hỗ trợ</p>
              <p className="text-base font-bold tracking-wide text-[#0057D9] tabular-nums">
                {ZALO_PHONE}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-2.5 rounded-lg bg-[#0068FF] hover:bg-[#0057D9] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Mở chat Zalo ngay</span>
              </a>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="py-1.5 px-2 rounded-lg border border-[#DBEAFE] bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] text-[11px] font-medium inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" aria-hidden="true" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${ZALO_PHONE}`}
                  className="py-1.5 px-2 rounded-lg border border-[#FBCFE8] bg-[#FFF8FA] hover:bg-[#FCE7F3] text-[#831843] text-[11px] font-medium inline-flex items-center justify-center gap-1 transition-colors"
                >
                  <Phone className="w-3 h-3" aria-hidden="true" />
                  <span>Gọi ngay</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={`Zalo hỗ trợ ${ZALO_PHONE}`}
        title={`Zalo hỗ trợ: ${ZALO_PHONE}`}
        className="group relative flex items-center gap-2 rounded-full bg-[#0068FF] hover:bg-[#0057D9] active:scale-95 text-white p-1.5 sm:pr-3.5 shadow-lg shadow-[#0068FF]/25 border-2 border-white transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068FF]"
      >
        <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#0068FF] font-extrabold text-xs tracking-tight shrink-0">
          Zalo
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight text-left">
          <span className="text-[10px] font-medium text-white/90">Zalo hỗ trợ</span>
          <span className="text-xs font-bold tracking-wide tabular-nums">{ZALO_PHONE}</span>
        </span>
      </button>
    </div>
  );
}
