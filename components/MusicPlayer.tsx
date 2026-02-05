import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, AlertCircle } from 'lucide-react';

interface MusicPlayerProps {
  autoPlay: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlay }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * 🎵 აქ ჩასვით თქვენი MP3 ფაილის ლინკი
   * მაგალითად: "https://tqveni-saiti.ge/simgera.mp3"
   */
  const AUDIO_URL = "public/music/lovemusic.mp3"; 

  useEffect(() => {
    if (autoPlay && !isPlaying && !hasError) {
      handlePlay();
    }
  }, [autoPlay]);

  const handlePlay = () => {
    if (audioRef.current && AUDIO_URL) {
      audioRef.current.volume = 0.4;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch(err => {
          console.warn("Autoplay was prevented by browser or source is invalid.", err);
        });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !AUDIO_URL) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch(err => {
          console.error("Playback failed:", err);
          setHasError(true);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleAudioError = () => {
    console.error("Audio source error: The provided URL might be broken or unsupported.");
    setHasError(true);
    setIsPlaying(false);
  };

  return (
    <div className="fixed top-6 right-6 md:top-10 md:right-10 z-[60] animate-[fadeIn_2s_ease-out]">
      <audio
        ref={audioRef}
        src={AUDIO_URL}
        loop
        preload="auto"
        onError={handleAudioError}
      />
      
      <div className={`glass-card flex items-center gap-1.5 p-1.5 rounded-full px-3 md:px-4 shadow-xl border transition-all duration-300 ${
        hasError ? 'border-amber-200 bg-amber-50/80' : 'border-rose-100/50 hover:scale-105'
      }`}>
        <div className={`p-1.5 ${hasError ? 'text-amber-500' : 'text-rose-500'} ${isPlaying ? 'animate-spin-slow' : ''}`}>
           {hasError ? <AlertCircle className="w-4 h-4" /> : <Music className="w-4 h-4" />}
        </div>
        
        <div className={`h-4 w-[1px] mx-1 ${hasError ? 'bg-amber-200' : 'bg-rose-200/50'}`}></div>

        <button 
          onClick={togglePlay}
          disabled={hasError}
          className={`p-2 rounded-full transition-all active:scale-90 ${
            hasError ? 'text-amber-400 cursor-not-allowed' : 'text-rose-600 hover:bg-rose-50'
          }`}
          title={hasError ? "მუსიკა ვერ ჩაიტვირთა" : (isPlaying ? "პაუზა" : "დაკვრა")}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 ml-0.5 fill-current" />}
        </button>
        
        <button 
          onClick={toggleMute}
          className="p-2 text-rose-400 hover:bg-rose-50 rounded-full transition-all active:scale-90"
          title={isMuted ? "ხმის ჩართვა" : "გაჩუმება"}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
      
      {hasError && (
        <div className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-sm border border-amber-100 p-2 px-3 rounded-lg shadow-sm whitespace-nowrap animate-bounce">
          <p className="text-[10px] text-amber-600 font-bold uppercase tracking-tighter">
            ლინკი არასწორია - შეცვალეთ კოდში
          </p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;