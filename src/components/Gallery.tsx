'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

export interface GalleryPhoto {
  id: string;
  src: string;
  caption: string;
  category: string;
}

export const GALLERY_CATEGORIES = ['Shows', 'Farming', 'Events', 'Facilities', 'Community', 'Other'];

const DEFAULT_PHOTOS: GalleryPhoto[] = [
  { id: 'gd1', src: '/images/agricultural-show.png', caption: 'Annual Agricultural Show', category: 'Shows' },
  { id: 'gd2', src: '/images/farmer-support.png', caption: 'Supporting Local Farmers', category: 'Farming' },
  { id: 'gd3', src: '/images/community-event.png', caption: 'Community Events', category: 'Events' },
  { id: 'gd4', src: '/images/pavilion.png', caption: 'Stacy Watler Agriculture Pavilion', category: 'Facilities' },
  { id: 'gd5', src: '/images/hero-bg.png', caption: 'Tropical Farmland', category: 'Farming' },
];

export function getStoredPhotos(): GalleryPhoto[] {
  if (typeof window === 'undefined') return DEFAULT_PHOTOS;
  try {
    const s = localStorage.getItem('cias_gallery');
    return s ? JSON.parse(s) : DEFAULT_PHOTOS;
  } catch { return DEFAULT_PHOTOS; }
}

export function savePhotos(photos: GalleryPhoto[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cias_gallery', JSON.stringify(photos));
  }
}

function Lightbox({ photo, onClose, onPrev, onNext }: {
  photo: GalleryPhoto; onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose, onPrev, onNext]);

  return (
    <div onClick={onClose} className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-5 right-6 text-white/80 hover:text-white text-3xl bg-transparent border-none cursor-pointer z-10">×</button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center text-lg transition-colors">◀</button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center text-lg transition-colors">▶</button>
      <div onClick={e => e.stopPropagation()} className="relative max-w-[90vw] max-h-[85vh]">
        <img src={photo.src} alt={photo.caption} className="max-w-full max-h-[80vh] rounded-xl object-contain" />
        <div className="text-center text-white mt-3 text-sm">
          {photo.caption}
          <span className="ml-2 text-xs bg-white/15 px-2.5 py-0.5 rounded-full">{photo.category}</span>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [filter, setFilter] = useState('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const fbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPhotos(getStoredPhotos());
    // Listen for gallery updates from admin
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cias_gallery') setPhotos(getStoredPhotos());
    };
    window.addEventListener('storage', onStorage);

    // Custom event for same-tab updates
    const onCustom = () => setPhotos(getStoredPhotos());
    window.addEventListener('cias_gallery_updated', onCustom);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('cias_gallery_updated', onCustom);
    };
  }, []);

  // Load Facebook SDK
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (document.getElementById('fb-sdk-script')) return;
    if (!document.getElementById('fb-root')) {
      const root = document.createElement('div');
      root.id = 'fb-root';
      document.body.prepend(root);
    }
    const script = document.createElement('script');
    script.id = 'fb-sdk-script';
    script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  }, []);

  const categories = ['All', ...Array.from(new Set(photos.map(p => p.category).filter(Boolean)))];
  const filtered = filter === 'All' ? photos : photos.filter(p => p.category === filter);

  const goPrev = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + photos.length) % photos.length : null), [photos.length]);
  const goNext = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % photos.length : null), [photos.length]);
  const closeLb = useCallback(() => setLightboxIdx(null), []);

  return (
    <>
      <section id="gallery" className="py-20 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Gallery</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Photos from our events, shows and community activities.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${filter === cat ? 'bg-[#027373] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {filtered.map((photo) => {
              const globalIdx = photos.indexOf(photo);
              const isBase64 = photo.src.startsWith('data:');
              return (
                <div key={photo.id} onClick={() => setLightboxIdx(globalIdx)}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                  {isBase64 ? (
                    <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <Image src={photo.src} alt={photo.caption} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 50vw, 33vw" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold text-sm">{photo.caption}</p>
                      <span className="text-white/70 text-xs">{photo.category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Facebook Feed */}
          <div className="border-t border-gray-100 pt-14">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#1877F2]/10 text-[#1877F2] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Live from Facebook
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Latest Updates</h3>
              <p className="text-gray-500">Follow <strong>@CaymanAgriculture</strong> for the latest photos and news</p>
            </div>
            <div className="flex justify-center" ref={fbRef}>
              <div className="fb-page" data-href="https://www.facebook.com/CaymanAgriculture" data-tabs="timeline" data-width="500" data-height="700" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true">
                <blockquote cite="https://www.facebook.com/CaymanAgriculture" className="fb-xfbml-parse-ignore">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#1877F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                    <a href="https://www.facebook.com/CaymanAgriculture" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#166FE5] transition-colors text-sm">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Visit Cayman Agriculture on Facebook
                    </a>
                    <p className="text-gray-400 text-sm mt-3">See our latest photos, events and updates</p>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxIdx !== null && photos[lightboxIdx] && (
        <Lightbox photo={photos[lightboxIdx]} onClose={closeLb} onPrev={goPrev} onNext={goNext} />
      )}
    </>
  );
}
