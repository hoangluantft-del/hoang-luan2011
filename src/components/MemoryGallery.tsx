import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, X } from 'lucide-react';
import {
  CLASSROOM_MOMENTS,
  ClassroomMomentItem,
  SCHOOL_PHOTOS,
  WishCategory,
} from '../data/tributeData';
import { BlossomFlower } from './FloralAccents';

interface MemoryGalleryProps {
  onWriteTributeForCategory: (category: WishCategory) => void;
}

export default function MemoryGallery({ onWriteTributeForCategory }: MemoryGalleryProps) {
  const [selectedMoment, setSelectedMoment] = useState<ClassroomMomentItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    src: string;
    alt: string;
    caption: string;
  } | null>(null);

  useEffect(() => {
    if (!selectedMoment && !lightboxPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMoment(null);
        setLightboxPhoto(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMoment, lightboxPhoto]);

  return (
    <section id="ky-niem" className="border-b border-[#FBCFE8] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        {/* 3 Real School & Classroom Highlights */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2">
              <BlossomFlower className="w-6 h-6 shrink-0" />
              <p className="text-xs font-medium uppercase tracking-wider text-[#BE185D]">
                Khoảnh khắc tại Trường THPT Nguyễn Trãi
              </p>
            </div>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#2E1021] text-balance">
              Hình ảnh thực tế thầy cô và học sinh nhà trường
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B4C5B] max-w-md leading-relaxed">
            Những khoảnh khắc chân thực trên lớp học, thư viện, sân trường và các buổi lễ kỷ niệm
            trang trọng của nhà trường.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLASSROOM_MOMENTS.map((moment) => (
            <article key={moment.id} className="flex flex-col group">
              <div className="aspect-[4/3] bg-[#FCE7F3] border border-[#FBCFE8] rounded-xl overflow-hidden">
                {!failedImages[moment.id] ? (
                  <img
                    src={moment.image}
                    alt={moment.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({
                        ...prev,
                        [moment.id]: true,
                      }))
                    }
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FDF2F8] text-[#831843]">
                    <BookOpen className="w-8 h-8 mb-2 opacity-70" />
                    <p className="font-serif text-base font-medium">{moment.title}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-[#6B4C5B] tabular-nums">
                  <span>Chương {moment.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{moment.category}</span>
                </div>

                <h3 className="mt-2 font-serif text-xl font-semibold text-[#2E1021] leading-snug">
                  {moment.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-[#6B4C5B] flex-1">
                  {moment.excerpt}
                </p>

                <div className="mt-5 pt-4 border-t border-[#FCE7F3]">
                  <button
                    type="button"
                    onClick={() => setSelectedMoment(moment)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#BE185D] hover:text-[#9D174D] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE185D]"
                  >
                    <span>Đọc bài viết</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Full 16-photo Real School Album */}
        <div className="mt-14 pt-10 border-t border-[#FCE7F3]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2E1021]">
                Album ảnh Trường THPT Nguyễn Trãi – Phan Rang
              </h3>
              <p className="text-xs text-[#6B4C5B] mt-1">
                Nhấn vào từng ảnh để xem kích thước đầy đủ
              </p>
            </div>
            <span className="text-xs font-medium text-[#BE185D] tabular-nums shrink-0">
              {SCHOOL_PHOTOS.length} ảnh kỷ niệm
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {SCHOOL_PHOTOS.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxPhoto(photo)}
                className="group text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BE185D] rounded-lg cursor-pointer"
              >
                <div className="aspect-[4/3] bg-[#FCE7F3] border border-[#FBCFE8] rounded-lg overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-xs text-[#6B4C5B] line-clamp-2 group-hover:text-[#BE185D] transition-colors">
                  {photo.caption}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial Reading Modal */}
      {selectedMoment && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="chapter-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2E1021]/60 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedMoment(null);
            }
          }}
        >
          <div className="animate-modal-enter bg-[#FFF8FA] border border-[#FBCFE8] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#FFF8FA]/95 border-b border-[#FBCFE8]">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B4C5B] tabular-nums">
                <span>Chương {selectedMoment.index}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedMoment.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMoment(null)}
                aria-label="Đóng bài viết"
                className="inline-flex items-center justify-center w-9 h-9 rounded-md text-[#2E1021] hover:bg-[#FCE7F3] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h3
                id="chapter-modal-title"
                className="font-serif text-2xl sm:text-3xl font-semibold text-[#2E1021] leading-tight text-balance"
              >
                {selectedMoment.title}
              </h3>
              <p className="mt-2 text-sm text-[#6B4C5B]">{selectedMoment.subtitle}</p>

              <figure className="mt-6">
                <div className="aspect-[4/3] bg-[#FCE7F3] border border-[#FBCFE8] rounded-lg overflow-hidden">
                  {!failedImages[selectedMoment.id] ? (
                    <img
                      src={selectedMoment.image}
                      alt={selectedMoment.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 text-[#831843]">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <figcaption className="mt-2 text-xs font-serif italic text-[#6B4C5B]">
                  {selectedMoment.caption}
                </figcaption>
              </figure>

              <div className="mt-7 space-y-4 text-base leading-[1.8] text-[#2E1021] max-w-prose">
                {selectedMoment.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0
                        ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-[#BE185D]'
                        : ''
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-8 py-5 border-y border-[#FBCFE8] text-center">
                <blockquote className="font-serif italic text-lg sm:text-xl text-[#831843] leading-relaxed">
                  {selectedMoment.quote}
                </blockquote>
                <p className="mt-2 text-xs uppercase tracking-wider text-[#6B4C5B]">
                  {selectedMoment.quoteAuthor}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedMoment(null)}
                  className="px-4 py-2 text-sm font-medium text-[#6B4C5B] hover:bg-[#FCE7F3] rounded-md transition-colors cursor-pointer"
                >
                  Đóng lại
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const cat = selectedMoment.suggestedCategory;
                    setSelectedMoment(null);
                    onWriteTributeForCategory(cat);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#BE185D] hover:bg-[#9D174D] rounded-md transition-colors cursor-pointer"
                >
                  Viết lời chúc cho Thầy Cô
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh trường"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2E1021]/75 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxPhoto(null);
          }}
        >
          <div className="animate-modal-enter relative max-w-4xl w-full bg-white border border-[#FBCFE8] rounded-xl overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              aria-label="Đóng ảnh"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 text-[#2E1021] hover:bg-[#FCE7F3] flex items-center justify-center shadow-sm cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxPhoto.src}
              alt={lightboxPhoto.alt}
              referrerPolicy="no-referrer"
              className="w-full max-h-[75vh] object-contain bg-[#2E1021]"
            />
            <div className="px-5 py-3.5 bg-[#FFF8FA] border-t border-[#FBCFE8]">
              <p className="text-sm font-medium text-[#2E1021]">{lightboxPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
