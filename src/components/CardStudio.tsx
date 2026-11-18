import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { CARD_TEMPLATES, CardTemplate, SCHOOL_LOGO, WISH_PRESETS } from '../data/tributeData';
import { BlossomFlower } from './FloralAccents';

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push('');
      continue;
    }

    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const testLine = `${currentLine} ${words[i]}`;
      if (ctx.measureText(testLine).width <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
  }
  return lines;
}

function drawCanvasBlossom(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  petalColor: string,
  centerColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -radius * 0.65, radius * 0.36, radius * 0.52, 0, 0, Math.PI * 2);
    ctx.fillStyle = petalColor;
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.24, 0, Math.PI * 2);
  ctx.fillStyle = centerColor;
  ctx.fill();
  ctx.restore();
}

async function generateCardPng(
  template: CardTemplate,
  recipient: string,
  message: string,
  sender: string
): Promise<string> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const width = 1600;
  const height = 1066;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = template.bgHex;
  ctx.fillRect(0, 0, width, height);

  // Outer & Inner decorative borders
  ctx.strokeStyle = template.borderHex;
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  ctx.lineWidth = 1;
  ctx.strokeRect(64, 64, width - 128, height - 128);

  // Corner floral blossoms
  drawCanvasBlossom(ctx, 118, 118, 28, template.borderHex, template.accentHex);
  drawCanvasBlossom(ctx, width - 118, 118, 28, template.borderHex, template.accentHex);
  drawCanvasBlossom(ctx, 118, height - 118, 28, template.borderHex, template.accentHex);
  drawCanvasBlossom(ctx, width - 118, height - 118, 28, template.borderHex, template.accentHex);

  // Header crest & kicker
  let kickerY = 150;
  try {
    const logoImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('logo load failed'));
      img.src = SCHOOL_LOGO;
    });
    const logoH = 74;
    const logoW = Math.round((logoImg.width / Math.max(1, logoImg.height)) * logoH);
    const padX = 14;
    const padY = 8;
    const boxW = logoW + padX * 2;
    const boxH = logoH + padY * 2;
    const boxX = width / 2 - boxW / 2;
    const boxY = 92;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 10);
    ctx.fill();
    ctx.drawImage(logoImg, boxX + padX, boxY + padY, logoW, logoH);
    kickerY = 222;
  } catch {
    kickerY = 150;
  }

  ctx.fillStyle = template.accentHex;
  ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NGÀY NHÀ GIÁO VIỆT NAM  ·  20 / 11', width / 2, kickerY);

  // Divider line under kicker
  ctx.beginPath();
  ctx.moveTo(width / 2 - 140, kickerY + 26);
  ctx.lineTo(width / 2 + 140, kickerY + 26);
  ctx.strokeStyle = template.borderHex;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Recipient Title
  ctx.fillStyle = template.textHex;
  ctx.font = '600 54px "Playfair Display", Georgia, serif';
  ctx.fillText(`Kính gửi ${recipient || 'Quý Thầy Cô'}`, width / 2, kickerY + 102);

  // Body Message
  ctx.fillStyle = template.textHex;
  ctx.font = '400 32px "Plus Jakarta Sans", sans-serif';
  const maxWidth = 1120;
  const lines = wrapCanvasText(ctx, message, maxWidth).slice(0, 9);
  const lineHeight = 50;
  const startY = kickerY + 195;

  lines.forEach((line, idx) => {
    ctx.fillText(line, width / 2, startY + idx * lineHeight);
  });

  // Footer signature
  ctx.strokeStyle = template.borderHex;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 180, height - 220);
  ctx.lineTo(width / 2 + 180, height - 220);
  ctx.stroke();

  ctx.fillStyle = template.mutedHex;
  ctx.font = 'italic 30px "Playfair Display", Georgia, serif';
  ctx.fillText(`Trân trọng kính chúc — ${sender || 'Học trò tri ân'}`, width / 2, height - 150);

  return canvas.toDataURL('image/png');
}

export default function CardStudio() {
  const [templateId, setTemplateId] = useState<CardTemplate['id']>('rose');
  const [recipient, setRecipient] = useState('Quý Thầy Cô kính mến');
  const [message, setMessage] = useState(WISH_PRESETS[0].text);
  const [sender, setSender] = useState('Học sinh Trường THPT Nguyễn Trãi');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const activeTemplate =
    CARD_TEMPLATES.find((t) => t.id === templateId) ?? CARD_TEMPLATES[0];

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const dataUrl = await generateCardPng(
        activeTemplate,
        recipient.trim(),
        message.trim(),
        sender.trim()
      );
      if (dataUrl) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'thiep-tri-an-20-11.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    const fullText = `Kính gửi ${recipient.trim() || 'Quý Thầy Cô'},\n\n${message.trim()}\n\nTrân trọng,\n${sender.trim() || 'Học trò tri ân'} — Chúc mừng Ngày Nhà giáo Việt Nam 20/11`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <section id="thiep-tri-an" className="border-b border-[#FBCFE8] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <BlossomFlower className="w-6 h-6 shrink-0" />
            <p className="text-xs font-medium uppercase tracking-wider text-[#BE185D]">
              Xưởng thiết kế thiệp hoa 20/11
            </p>
          </div>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#2E1021] text-balance">
            Thiết kế tấm thiệp sắc hồng tặng Thầy Cô
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#6B4C5B] max-w-2xl">
            Chọn mẫu thiệp hoa hồng, điền tên thầy cô bạn muốn gửi tặng và tải xuống ảnh PNG độ
            phân giải cao.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 bg-[#FFF8FA] border border-[#FBCFE8] rounded-xl p-4 sm:p-6">
            <div>
              <span className="block text-sm font-medium text-[#2E1021] mb-2.5">
                1. Chọn mẫu thiệp
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {CARD_TEMPLATES.map((tpl) => {
                  const selected = tpl.id === templateId;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setTemplateId(tpl.id)}
                      className={`flex items-center gap-3.5 p-3 text-left rounded-lg border transition-colors cursor-pointer ${
                        selected
                          ? 'bg-white border-[#BE185D] ring-1 ring-[#BE185D]'
                          : 'bg-white/75 border-[#FBCFE8] hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-8 h-8 rounded-md border shrink-0"
                        style={{
                          backgroundColor: tpl.bgHex,
                          borderColor: tpl.borderHex,
                        }}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#2E1021]">{tpl.name}</p>
                        <p className="text-xs text-[#6B4C5B] truncate">{tpl.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="card-recipient"
                className="block text-sm font-medium text-[#2E1021] mb-1.5"
              >
                2. Kính gửi Thầy / Cô
              </label>
              <input
                id="card-recipient"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ví dụ: Cô Ngọc Bảo hoặc Thầy Minh"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#FBCFE8] rounded-md text-[#2E1021] focus:outline-none focus:border-[#BE185D]"
              />
            </div>

            <div>
              <label
                htmlFor="card-message"
                className="block text-sm font-medium text-[#2E1021] mb-1.5"
              >
                3. Lời chúc trên thiệp
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {WISH_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setMessage(preset.text)}
                    className="px-2.5 py-1 text-xs font-medium text-[#831843] bg-white border border-[#FBCFE8] rounded-md hover:bg-[#FCE7F3] transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <textarea
                id="card-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#FBCFE8] rounded-md text-[#2E1021] focus:outline-none focus:border-[#BE185D]"
              />
            </div>

            <div>
              <label
                htmlFor="card-sender"
                className="block text-sm font-medium text-[#2E1021] mb-1.5"
              >
                4. Ký tên người gửi
              </label>
              <input
                id="card-sender"
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Ví dụ: Học trò Minh Anh"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#FBCFE8] rounded-md text-[#2E1021] focus:outline-none focus:border-[#BE185D]"
              />
            </div>
          </div>

          {/* Live Preview & Export Column */}
          <div className="lg:col-span-7 flex flex-col">
            <div
              className="relative min-h-[360px] sm:aspect-[3/2] w-full rounded-xl p-5 sm:p-8 flex flex-col justify-between transition-colors duration-200 border"
              style={{
                backgroundColor: activeTemplate.bgHex,
                borderColor: activeTemplate.borderHex,
                color: activeTemplate.textHex,
              }}
            >
              {/* Corner floral blossoms on preview */}
              <BlossomFlower className="w-6 h-6 sm:w-8 sm:h-8 absolute top-3 left-3 pointer-events-none" />
              <BlossomFlower className="w-6 h-6 sm:w-8 sm:h-8 absolute top-3 right-3 pointer-events-none" />
              <BlossomFlower className="w-6 h-6 sm:w-8 sm:h-8 absolute bottom-3 left-3 pointer-events-none" />
              <BlossomFlower className="w-6 h-6 sm:w-8 sm:h-8 absolute bottom-3 right-3 pointer-events-none" />

              <div
                className="w-full flex-1 border p-4 sm:p-6 flex flex-col justify-between text-center rounded-md"
                style={{ borderColor: activeTemplate.borderHex }}
              >
                <div>
                  <div className="inline-flex items-center justify-center bg-white rounded-md px-2 py-1 mb-2 shadow-xs">
                    <img
                      src={SCHOOL_LOGO}
                      alt="Logo Trường THPT Nguyễn Trãi"
                      className="h-7 sm:h-9 w-auto object-contain"
                    />
                  </div>
                  <p
                    className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] tabular-nums"
                    style={{ color: activeTemplate.accentHex }}
                  >
                    Ngày Nhà Giáo Việt Nam · 20 / 11
                  </p>
                  <div
                    className="w-24 h-px mx-auto my-2 opacity-60"
                    style={{ backgroundColor: activeTemplate.borderHex }}
                  />
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold leading-snug break-words">
                    Kính gửi {recipient.trim() || 'Quý Thầy Cô'}
                  </h3>
                </div>

                <p className="my-3 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto whitespace-pre-line break-words">
                  {message.trim() || 'Kính chúc Thầy/Cô luôn thật nhiều sức khỏe và niềm vui.'}
                </p>

                <div>
                  <div
                    className="w-32 h-px mx-auto mb-3 opacity-60"
                    style={{ backgroundColor: activeTemplate.borderHex }}
                  />
                  <p
                    className="font-serif italic text-xs sm:text-base break-words"
                    style={{ color: activeTemplate.mutedHex }}
                  >
                    Trân trọng kính chúc — {sender.trim() || 'Học trò tri ân'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-[#6B4C5B]">
                Ảnh xuất ra có kích thước chuẩn <span className="tabular-nums">1600 × 1066 px</span>{' '}
                kèm họa tiết hoa ở bốn góc.
              </p>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 text-sm font-medium text-[#2E1021] bg-white border border-[#FBCFE8] hover:bg-[#FCE7F3] rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#BE185D]" aria-hidden="true" />
                      <span>Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Sao chép lời chúc</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:py-2 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] disabled:opacity-60 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>{downloading ? 'Đang tạo ảnh...' : 'Tải thiệp PNG'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
