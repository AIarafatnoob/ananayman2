import React, { useEffect, useRef, useState } from 'react';
import Profileanimated from './Assets/Profileanimated.png';
import profilereal from './Assets/profilereal.png';
import { AdminPINModal } from './AdminPINModal';
import { useAdmin } from '../context/AdminContext';

const InteractiveRibbon: React.FC<{ nameRef: React.RefObject<HTMLHeadingElement> }> = ({ nameRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const lastInteractionTime = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const points: { x: number; y: number }[] = [];
    const numPoints = 25; // Smoother long trail
    for (let i = 0; i < numPoints; i++) {
      points.push({ x: canvas.width / 2, y: canvas.height / 2 });
    }

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const isIdle = !mouseRef.current.active && (now - lastInteractionTime.current > 5000);

      let targetX, targetY;

      if (isIdle && nameRef.current) {
        const rect = nameRef.current.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        // Coordinates of the name relative to the canvas
        const centerX = (rect.left - canvasRect.left) + rect.width / 2;
        const centerY = (rect.top - canvasRect.top) + rect.height / 2;

        // Elliptical orbit path
        const radiusX = rect.width / 2 + 50;
        const radiusY = rect.height / 2 + 25;
        const angle = now / 1500;

        targetX = centerX + Math.cos(angle) * radiusX;
        targetY = centerY + Math.sin(angle) * radiusY;
      } else {
        targetX = mouseRef.current.active ? mouseRef.current.x : canvas.width / 2 + Math.sin(now / 1500) * 150;
        targetY = mouseRef.current.active ? mouseRef.current.y : canvas.height / 2 + Math.cos(now / 1500) * 100;
      }

      // Update points
      points[0].x += (targetX - points[0].x) * 0.15;
      points[0].y += (targetY - points[0].y) * 0.15;

      for (let i = 1; i < numPoints; i++) {
        const p = points[i];
        const prev = points[i - 1];
        p.x += (prev.x - p.x) * 0.25;
        p.y += (prev.y - p.y) * 0.25;
      }

      // Draw Ribbon
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < numPoints - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }

      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(167, 139, 250, 0.5)'); // primary more intense
      gradient.addColorStop(1, 'rgba(153, 246, 228, 0.4)'); // secondary more intense

      ctx.shadowBlur = window.innerWidth < 768 ? 15 : 30;
      ctx.shadowColor = 'rgba(167, 139, 250, 0.3)';
      ctx.strokeStyle = gradient;
      ctx.lineWidth = window.innerWidth < 768 ? 10 : 20;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastInteractionTime.current = Date.now();
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      lastInteractionTime.current = Date.now();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
        active: true
      };
    };

    const section = canvas.closest('section');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
      section.addEventListener('touchstart', handleTouchMove, { passive: true });
      section.addEventListener('touchmove', handleTouchMove, { passive: true });
      section.addEventListener('touchend', handleMouseLeave);
    }

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
        section.removeEventListener('touchstart', handleTouchMove);
        section.removeEventListener('touchmove', handleTouchMove);
        section.removeEventListener('touchend', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
    />
  );
};

interface DraggableBadgeProps {
  children: React.ReactNode;
  initialClassName: string;
  animationDuration: string;
}

const DraggableBadge: React.FC<DraggableBadgeProps> = ({ children, initialClassName, animationDuration }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    offsetRef.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      setPosition({
        x: clientX - offsetRef.current.x,
        y: clientY - offsetRef.current.y
      });
    };

    const handleUp = () => {
      setDragging(false);
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleUp);
    };
  }, [dragging]);

  return (
    <div
      className={initialClassName}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: dragging ? 50 : 10,
        pointerEvents: 'auto'
      }}
    >
      <div
        className={`cursor-grab active:cursor-grabbing select-none ${dragging ? '' : 'animate-float-subtle'}`}
        style={{
          animationDuration,
          transition: dragging ? 'none' : 'transform 0.1s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {children}
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showPINModal, setShowPINModal] = useState(false);
  const { setIsAdmin } = useAdmin();

  const handleProfileClick = () => {
    // Only allow on desktop (usually > 1024px)
    if (window.innerWidth < 1024) return;

    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 10) {
      setShowPINModal(true);
      setClickCount(0);
    }
    // Reset count after 3 seconds of inactivity
    setTimeout(() => setClickCount(0), 3000);
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-12 pastel-gradient overflow-hidden scroll-mt-32">
      <InteractiveRibbon nameRef={nameRef} />
      {/* Desktop Side Links */}
      <div className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-8 items-center z-20">
        <a className="text-slate-400 hover:text-primary transition-all hover:scale-125 flex items-center justify-center w-6 h-6" href="https://www.linkedin.com/in/anan-aiman-tuba/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
        </a>
        <a className="text-slate-400 hover:text-primary transition-all hover:scale-125" href="https://github.com/anantuba" target="_blank" rel="noopener noreferrer" title="GitHub">
          <span className="material-symbols-outlined">code</span>
        </a>
        <a className="text-slate-400 hover:text-primary transition-all hover:scale-125" href="mailto:anan.tuba1807@gmail.com" title="Email">
          <span className="material-symbols-outlined">mail</span>
        </a>
      </div>

      {/* Mobile Social Pill */}
      <div className="lg:hidden fixed bottom-8 left-6 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-5 py-3 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center gap-6">
        <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-all flex items-center justify-center w-5 h-5" href="https://www.linkedin.com/in/anan-aiman-tuba/" target="_blank" rel="noopener noreferrer">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
        </a>
        <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-all" href="https://github.com/anantuba" target="_blank" rel="noopener noreferrer">
          <span className="material-symbols-outlined !text-xl">code</span>
        </a>
        <a className="text-slate-600 dark:text-slate-400 hover:text-primary transition-all" href="mailto:anan.tuba1807@gmail.com">
          <span className="material-symbols-outlined !text-xl">mail</span>
        </a>
      </div>

      <div className="container max-w-6xl px-6 relative">
        <div className="flex flex-col items-center">
          {/* Portrait Image Container */}
          <div className="relative w-[280px] md:w-[450px] lg:w-[500px] mb-8">
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900/50 rounded-t-[200px] rounded-b-2xl -z-10 transform scale-105 md:scale-110"></div>
            <div
              onClick={handleProfileClick}
              className="relative group overflow-hidden rounded-t-[200px] rounded-b-2xl border-4 border-white dark:border-slate-800 shadow-2xl transition-transform duration-1000 ease-in-out hover:scale-[1.02] cursor-pointer active:scale-95"
            >
              <img
                alt="Anan Aiman Tuba Animated Portrait"
                className="w-full h-auto object-cover transition-all duration-1000 ease-in-out group-hover:scale-110"
                src={Profileanimated}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out">
                <img
                  alt="Anan Aiman Tuba Real Portrait"
                  className="w-full h-auto object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                  src={profilereal}
                />
              </div>
            </div>


            {/* Status Badges - Desktop Only */}
            <div className="hidden lg:contents">
              {/* Left Side Badges */}
              <DraggableBadge
                initialClassName="absolute -left-28 xl:-left-36 top-12 bg-white dark:bg-slate-900 p-3 xl:p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[140px]"
                animationDuration="6s"
              >
                <div className="text-xl xl:text-2xl font-bold text-primary">3+ Years</div>
                <div className="text-[9px] xl:text-[10px] uppercase tracking-widest text-slate-500 font-bold">QA Experience</div>
              </DraggableBadge>

              <DraggableBadge
                initialClassName="absolute -left-24 xl:-left-32 bottom-20 bg-white dark:bg-slate-900 p-3 xl:p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[140px]"
                animationDuration="9s"
              >
                <div className="text-2xl xl:text-3xl font-bold text-primary">70%</div>
                <div className="text-[9px] xl:text-[10px] uppercase tracking-widest text-slate-500 font-bold">Automation Coverage</div>
              </DraggableBadge>

              {/* Right Side Badges */}
              <DraggableBadge
                initialClassName="absolute -right-24 xl:-right-32 top-16 bg-white dark:bg-slate-900 p-3 xl:p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[140px]"
                animationDuration="7s"
              >
                <div className="text-xl xl:text-2xl font-bold text-secondary">99.1%</div>
                <div className="text-[9px] xl:text-[10px] uppercase tracking-widest text-slate-500 font-bold">Defect-Free rate</div>
              </DraggableBadge>

              <DraggableBadge
                initialClassName="absolute -right-20 xl:-right-24 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 p-3 xl:p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[165px]"
                animationDuration="8s"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-amber-500 text-sm">verified</span>
                  <span className="text-[9px] xl:text-[10px] uppercase tracking-widest text-slate-500 font-black">ISTQB Foundation</span>
                </div>
                <div className="text-[9px] xl:text-[10px] uppercase tracking-widest text-amber-500 font-bold italic">Global Certification</div>
              </DraggableBadge>

              <DraggableBadge
                initialClassName="absolute -right-16 xl:-right-20 bottom-24 bg-white dark:bg-slate-900 p-3 xl:p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-[125px]"
                animationDuration="10s"
              >
                <div className="flex gap-1 mb-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                </div>
                <div className="text-[9px] xl:text-[10px] uppercase tracking-widest text-slate-500 font-bold">CI/CD Expert</div>
              </DraggableBadge>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center mt-8 space-y-4">
            <h1 ref={nameRef} className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none text-slate-900 dark:text-white">
              Anan Aiman Tuba
            </h1>
            <div className="flex items-center justify-center gap-4 text-slate-500 dark:text-slate-400">
              <span className="h-[1px] w-8 bg-slate-300 dark:bg-slate-700"></span>
              <h2 className="text-base md:text-xl font-medium tracking-[0.2em] uppercase">
                Senior Software Quality Assurance Engineer
              </h2>
              <span className="h-[1px] w-8 bg-slate-300 dark:bg-slate-700"></span>
            </div>
          </div>

          <div className="mt-12 max-w-2xl text-center">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Experienced <span className="text-primary font-semibold">Software Assurance</span> professional specializing in web and mobile applications. Skilled in test automation, <span className="text-secondary font-semibold">UI/UX design</span> principles, and developing comprehensive testing strategies.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="bg-primary text-white px-8 py-4 rounded-pill font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">mail</span>
                Get In Touch
              </a>
              <a href="#projects" className="bg-secondary/20 text-slate-900 dark:text-white border border-secondary/30 px-8 py-4 rounded-pill font-bold flex items-center gap-2 hover:bg-secondary/30 transition-all">
                View Portfolio
                <span className="material-symbols-outlined">trending_flat</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="mt-20 animate-bounce-slow text-slate-300 cursor-pointer hover:text-primary transition-colors">
        <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
      </a>

      {showPINModal && (
        <AdminPINModal
          onSuccess={() => {
            setIsAdmin(true);
            setShowPINModal(false);
          }}
          onClose={() => setShowPINModal(false)}
        />
      )}
    </section>
  );
};
