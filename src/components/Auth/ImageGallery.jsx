import React from 'react';
import Reveal from '../Reveal';

const images = [
  '/images/hot-hibiscus-tea.png',
  '/images/about-herbs.png',
  '/images/hero-tea.png',
  '/images/product-front.jpg',
  '/images/product-back.jpg',
  '/images/brewing-guide.png'
];

const ImageGallery = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-stone-900">
      {/* Masonry-style Grid */}
      <div className="grid grid-cols-2 gap-4 p-4 h-full animate-scroll-slow">
        <div className="space-y-4">
          {images.slice(0, 3).map((img, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="overflow-hidden rounded-2xl">
                <img 
                  src={img} 
                  alt="Gallery item" 
                  className="w-full h-auto object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="space-y-4 pt-12">
          {images.slice(3).map((img, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="overflow-hidden rounded-2xl">
                <img 
                  src={img} 
                  alt="Gallery item" 
                  className="w-full h-auto object-cover opacity-60 hover:opacity-100 transition-opacity duration-700"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/40 via-transparent to-stone-900" />
      
      {/* Brand Message overlay */}
      <div className="absolute bottom-12 left-12 z-10 max-w-sm">
        <Reveal>
          <h2 className="text-4xl font-display font-bold text-white mb-4 leading-tight">
            Discover the Art of <span className="italic text-primary">Herbal Healing</span>
          </h2>
          <p className="text-stone-300 text-lg">
            Join our community of tea lovers and unlock exclusive wellness blends.
          </p>
        </Reveal>
      </div>
    </div>
  );
};

export default ImageGallery;
