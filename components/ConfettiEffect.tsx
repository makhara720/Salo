
import React, { useEffect, useRef } from 'react';

const ConfettiEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      type: 'circle' | 'heart';

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.size = Math.random() * 8 + 4;
        const colors = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fff1f2'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * -5 - 3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.type = Math.random() > 0.5 ? 'heart' : 'circle';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += 0.05; // gravity
        this.rotation += this.rotationSpeed;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        
        if (this.type === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Heart shape
          ctx.beginPath();
          const s = this.size;
          ctx.moveTo(0, s);
          ctx.bezierCurveTo(-s, 0, -s, -s, 0, -s);
          ctx.bezierCurveTo(s, -s, s, 0, 0, s);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        
        // Remove off-screen particles and replace occasionally
        if (p.y > canvas.height + 200) {
          particles[index] = new Particle();
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-20"
    />
  );
};

export default ConfettiEffect;
