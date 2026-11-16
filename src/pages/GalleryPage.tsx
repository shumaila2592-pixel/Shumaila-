import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { GALLERY_CATEGORIES } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import type { GalleryCategory } from '../types/institution';
import { ResilientImage } from '../components/ResilientImage';

export const GalleryPage: React.FC = () => {
  const { gallery } = useInstitution();
  const [activeCategory, setActiveCategory] = useState<'all' | GalleryCategory>(
    'all'
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return gallery;
    return gallery.filter((item) => item.category === activeCategory);
  }, [gallery, activeCategory]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % filteredItems.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const currentLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="bg-white">
      <section className="bg-[#102D55] text-white py-14 lg:py-20 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D5A83D]">
            Institutional Moments
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold mt-2">
            Photo Gallery
          </h1>
          <p className="text-base text-white/85 mt-4 max-w-2xl leading-relaxed">
            Explore classroom learning, kindergarten activities, computer labs,
            technical workshops, paramedical training, and campus events.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-[#F8F6EF] border-b border-[#102D55]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setLightboxIndex(null);
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-[#102D55] text-white'
                : 'bg-white text-[#102D55] border border-[#102D55]/15 hover:bg-white/80'
            }`}
          >
            All Photos
          </button>
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setLightboxIndex(null);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-[#102D55] text-white'
                  : 'bg-white text-[#102D55] border border-[#102D55]/15 hover:bg-white/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 rounded-2xl bg-[#F8F6EF] border border-[#102D55]/10">
              <p className="font-serif text-xl font-semibold text-[#102D55]">
                No photographs added in this category yet
              </p>
              <p className="text-sm text-[#252525]/70 mt-1">
                Administrators can upload photographs in the Admin Dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredItems.map((item, idx) => (
                <figure
                  key={item.id}
                  className="group rounded-2xl overflow-hidden border border-[#102D55]/10 bg-white shadow-xs hover:shadow-md transition-shadow"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="relative w-full aspect-[4/3] block overflow-hidden bg-[#F8F6EF] text-left focus-visible:outline-2 focus-visible:outline-[#D5A83D]"
                  >
                    <ResilientImage
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-[#0A1E3B]/0 group-hover:bg-[#0A1E3B]/35 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#102D55] text-xs font-semibold shadow">
                        <ZoomIn className="w-4 h-4" />
                        <span>View Photo</span>
                      </span>
                    </div>
                  </button>
                  <figcaption className="p-5 space-y-1">
                    <p className="text-xs font-medium text-[#8A6816]">
                      {item.category}
                    </p>
                    <h2 className="font-serif text-lg font-semibold text-[#102D55]">
                      {item.title}
                    </h2>
                    {item.caption && (
                      <p className="text-xs text-[#252525]/75 leading-relaxed pt-1">
                        {item.caption}
                      </p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxItem.title}
          className="fixed inset-0 z-50 bg-[#0A1E3B]/92 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close photo viewer"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {filteredItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredItems.length) %
                      filteredItems.length
                  );
                }}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
                }}
                aria-label="Next photo"
                className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div
            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] bg-[#0A1E3B] flex items-center justify-center overflow-hidden">
              <ResilientImage
                src={currentLightboxItem.imageUrl}
                alt={currentLightboxItem.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white">
              <div>
                <p className="text-xs font-semibold text-[#8A6816]">
                  {currentLightboxItem.category}
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#102D55]">
                  {currentLightboxItem.title}
                </h3>
                {currentLightboxItem.caption && (
                  <p className="text-sm text-[#252525]/75 mt-1">
                    {currentLightboxItem.caption}
                  </p>
                )}
              </div>
              <span className="text-xs font-mono tabular-nums text-[#252525]/60 shrink-0">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
