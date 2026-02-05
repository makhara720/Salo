
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';

const IMAGES = [
  {
    url: "images/image00001.jpeg",
    caption: "ჩვენი ბედნიერი წუთები ✨"
  },
  {
    url: "images/image00002.jpeg",
    caption: "შენ ჩემი სამყარო ხარ 🌎"
  },
  {
    url: "images/image00003.jpeg",
    caption: "ლამაზი მოგონებები 📸"
  },
  {
    url: "images/image00004.jpeg",
    caption: "ჩვენი საერთო მომავალი 🥂"
  }
];

const ImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  };
  
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  return (
    <div className="relative group w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(244,63,94,0.25)] border-[8px] md:border-[12px] border-white ring-1 ring-rose-100/30 transition-all duration-700">
      {IMAGES.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
            index === currentIndex ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-105 translate-x-4'
          }`}
        >
          <img
            src={item.url}
            alt={`Love ${index + 1}`}
            className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
          />
          {/* Enhanced Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-rose-950/70 via-rose-900/10 to-transparent"></div>
          
          <div className={`absolute bottom-8 md:bottom-12 left-0 right-0 px-6 md:px-12 text-center transition-all duration-1000 delay-300 ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
             <p className="text-white font-serif italic text-base md:text-2xl drop-shadow-lg tracking-tight">
               {item.caption}
             </p>
          </div>
        </div>
      ))}
      
      {/* Editorial Navigation */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-6 pointer-events-none">
        <button 
          onClick={prev}
          className="pointer-events-auto p-3 md:p-4 bg-white/20 backdrop-blur-2xl text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/40 border border-white/30 scale-75 md:scale-100"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button 
          onClick={next}
          className="pointer-events-auto p-3 md:p-4 bg-white/20 backdrop-blur-2xl text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/40 border border-white/30 scale-75 md:scale-100"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Luxury Page Indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-10">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
            className={`transition-all duration-500 rounded-full h-1 ${
              index === currentIndex ? 'bg-white w-8 md:w-12 shadow-sm' : 'bg-white/30 w-2 md:w-3'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-4 md:top-8 right-4 md:right-8 bg-white/95 p-3 md:p-4 rounded-full shadow-2xl border border-rose-50 flex items-center justify-center scale-90 md:scale-100">
        <Heart className="w-5 h-5 md:w-6 md:h-6 text-rose-500 fill-current animate-pulse" />
      </div>

      <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-rose-500/90 p-1.5 md:p-2 rounded-full shadow-lg scale-90 md:scale-100">
        <Star className="w-3 h-3 md:w-4 md:h-4 text-white fill-current animate-spin-slow" />
      </div>
    </div>
  );
};

export default ImageSlider;
