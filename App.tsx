
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Sparkles, Star, ArrowRight } from 'lucide-react';
import HeartParticles from './components/HeartParticles';
import ConfettiEffect from './components/ConfettiEffect';
import MusicPlayer from './components/MusicPlayer';
import ImageSlider from './components/ImageSlider';

const REACTION_PHRASES = [
  "მოიცადე, რა? 🤨",
  "კარგი მცდელობაა! 😋",
  "ძალიან ნელი ხარ! 💨",
  "მაუსი გაგიფუჭდა? 😂",
  "კინაღამ გამოგივიდა! 🤏",
  "უი, სხვა მხარეს! ⬅️",
  "კიდევ დაფიქრდი! 😉",
  "შეცდომა: 'არა' ვერ მოიძებნა ❌",
  "დამიჭირე თუ შეძლებ! 🏃‍♀️",
  "სცადე ის დიდი მანათობელი ღილაკი! ✨"
];

const App: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [reaction, setReaction] = useState("");
  const [isInteracted, setIsInteracted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setShowOverlay(false);
    setIsInteracted(true);
  };

  const handleYes = () => {
    setAccepted(true);
  };

  const moveNoButton = useCallback(() => {
    if (accepted) return;
    
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.3;
    const newX = (Math.random() - 0.5) * radius * 2;
    const newY = (Math.random() - 0.5) * radius * 1.5;
    
    setNoPos({ x: newX, y: newY });
    
    const randomPhrase = REACTION_PHRASES[Math.floor(Math.random() * REACTION_PHRASES.length)];
    setReaction(randomPhrase);
    
    setTimeout(() => setReaction(""), 2500);
  }, [accepted]);

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center transition-all duration-1000 ${accepted ? 'bg-[#fff0f3]' : 'bg-[#fffafb]'}`}
    >
      {showOverlay && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fffafb] transition-opacity duration-700">
          <HeartParticles count={15} />
          <div className="z-10 w-full max-w-lg text-center flex flex-col items-center gap-12">
             <div className="space-y-4 px-6">
                <p className="text-rose-400 font-serif italic text-3xl md:text-5xl overlay-text-reveal">
                  წერილი შენთვის...
                </p>
                <div className="w-16 h-[1px] bg-rose-200 mx-auto opacity-50"></div>
             </div>
             
             <button 
                onClick={handleStart}
                className="group relative w-40 h-40 md:w-56 md:h-56 flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95"
             >
                <div className="absolute inset-0 bg-rose-100/50 blur-[100px] rounded-full group-hover:bg-rose-200/50 transition-colors"></div>
                <div className="relative animate-float">
                  <Heart className="w-32 h-32 md:w-48 md:h-48 text-rose-500 fill-current drop-shadow-2xl" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-xl md:text-2xl tracking-[0.2em] select-none uppercase">გახსნა</span>
                  </div>
                </div>
             </button>

             <p className="text-rose-300 text-xs tracking-[0.4em] uppercase font-black opacity-60 animate-pulse">
               დააჭირე დასაწყებად
             </p>
          </div>
        </div>
      )}

      <HeartParticles count={25} />
      {accepted && <ConfettiEffect />}
      
      <MusicPlayer autoPlay={isInteracted} />

      <main className={`z-10 w-full max-w-5xl px-4 md:px-6 flex flex-col items-center transition-all duration-1000 ease-out ${showOverlay ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'}`}>
        {!accepted ? (
          <div className="w-full space-y-12 md:space-y-16 py-8">
            <header className="space-y-6 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-4 bg-rose-50 px-6 py-2 rounded-full border border-rose-100 shadow-sm">
                <Star className="w-3 h-3 text-rose-500 fill-current" />
                <span className="text-rose-500 font-black text-[10px] tracking-[0.4em] uppercase">შეტყობინება სიყვარულით</span>
                <Star className="w-3 h-3 text-rose-500 fill-current" />
              </div>
              <h2 className="text-2xl md:text-4xl font-serif text-slate-800 italic leading-relaxed px-4">
                ჰეი ჩემო სიყვარულო 💕{"\n"}ერთი ძალიან მნიშვნელოვანი შეკითხვა მაქვს...
              </h2>
            </header>

            <div className="glass p-8 md:p-20 rounded-[3rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden text-center group max-w-3xl mx-auto">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
              
              <h1 className="text-3xl md:text-7xl font-serif font-black text-rose-600 leading-tight tracking-tighter mb-12">
                გახდები ჩემი ვალენტინი? 💘
              </h1>
              
              <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <button
                  onClick={handleYes}
                  className="pulse-premium group relative min-w-[180px] md:min-w-[220px] px-10 md:px-14 py-5 md:py-6 bg-rose-500 text-white rounded-full text-lg md:text-2xl font-black transition-all hover:bg-rose-600 hover:scale-110 active:scale-95 shadow-[0_20px_40px_-10px_rgba(244,63,94,0.5)] z-20"
                >
                  <span className="flex items-center justify-center gap-3">
                    დიახ 💖 <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <div className="relative h-16 w-32 md:w-40 flex items-center justify-center">
                  <button
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    onTouchStart={(e) => { e.preventDefault(); moveNoButton(); }}
                    style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                    className="no-button whitespace-nowrap px-8 md:px-10 py-3 md:py-4 border-2 border-rose-200 text-rose-400 rounded-full text-base md:text-lg font-bold bg-white/60 hover:bg-rose-50 backdrop-blur-md shadow-sm"
                  >
                    არა 😢
                  </button>
                </div>
              </div>

              {reaction && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-[fadeIn_0.3s_ease-out]">
                  <p className="text-rose-500 font-black italic text-sm md:text-base tracking-wide bg-white/80 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md border border-rose-100">
                    {reaction}
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Redesigned Success Page - Better Screen Fitting */
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-4 md:py-10 animate-[zoomIn_0.8s_cubic-bezier(0.34,1.56,0.64,1)]">
            
            {/* Left: Content Card */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
              <div className="glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl relative overflow-hidden w-full max-w-lg">
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-rose-200/30 rounded-full blur-[60px]"></div>
                
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <div className="h-[2px] w-12 bg-rose-500 rounded-full hidden lg:block"></div>
                  <span className="text-rose-500 font-black text-xs tracking-[0.3em] uppercase">ჩვენი დასაწყისი</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-black text-rose-600 mb-6 tracking-tight drop-shadow-sm">
                  ურა!!! 💕
                </h1>
                
                <p className="text-lg md:text-2xl text-slate-800 font-serif italic leading-relaxed mb-8">
                  ვიცოდი რომ დამთანხმდებოდი! შენ მსოფლიოში ყველაზე ბედნიერ ადამიანად მაქციე. 😍
                </p>

                <div className="space-y-4">
                  <div className="flex justify-center lg:justify-start gap-3">
                    {[1, 2, 3].map(i => (
                      <Heart key={i} className={`w-6 h-6 md:w-8 md:h-8 text-rose-500 fill-current animate-pulse`} style={{ animationDelay: `${i * 200}ms` }} />
                    ))}
                  </div>
                  <p className="text-rose-500 font-black tracking-[0.4em] uppercase text-xs md:text-base">
                    მიყვარხარ უსასრულოდ ❤️
                  </p>
                </div>
              </div>

              {/* Extra Small Decorative Detail */}
              <div className="hidden lg:flex items-center gap-4 opacity-50 px-4">
                <Star className="w-4 h-4 text-rose-300 fill-current" />
                <p className="text-rose-300 font-serif italic text-sm">მიყვარხარ უსასრულოდ ❤️</p>
                <Star className="w-4 h-4 text-rose-300 fill-current" />
              </div>
            </div>

            {/* Right: Slider Section */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center">
              <div className="w-full max-w-sm md:max-w-md lg:max-w-full aspect-[4/5] md:aspect-[4/4.5] transform transition-all hover:rotate-1 duration-700">
                <ImageSlider />
              </div>
            </div>
            
          </div>
        )}
      </main>

      <footer className="mt-auto py-8 text-rose-300 text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-black opacity-30 select-none text-center">
        სიყვარულით შექმნილი შენთვის
      </footer>
    </div>
  );
};

export default App;
