import React, { useState, useEffect, useRef } from 'react';

interface MetricCardProps {
  value: number;
  suffix?: string;
  label: string;
  color: string;
  delay?: number;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, suffix = '', label, color, delay = 0, className = '' }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);
  }, [isIntersecting, value, delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 degrees
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPos({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const colorClasses: Record<string, string> = {
    primary: "bg-primary/20 border-primary/30 text-white shadow-primary/10",
    secondary: "bg-secondary/20 border-secondary/30 text-white shadow-secondary/10",
    white: "bg-white/5 border-white/10 text-white shadow-black/10",
    accent: "bg-amber-400/20 border-amber-400/30 text-white shadow-amber-400/10"
  };

  const glowColor: Record<string, string> = {
    primary: "rgba(167, 139, 250, 0.4)",
    secondary: "rgba(153, 246, 228, 0.4)",
    white: "rgba(255, 255, 255, 0.2)",
    accent: "rgba(251, 191, 36, 0.4)"
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative aspect-square rounded-3xl border flex flex-col items-center justify-center text-center p-4 transition-all duration-200 ease-out cursor-default overflow-hidden ${colorClasses[color]} ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Interactive Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}px ${glowPos.y}px, ${glowColor[color]} 0%, transparent 70%)`
        }}
      />

      <div style={{ transform: 'translateZ(20px)' }}>
        <span className="text-4xl md:text-5xl font-black block tracking-tighter transition-all duration-500">
          {count}{suffix}
        </span>
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black opacity-40 mt-1 block">
          {label}
        </span>
      </div>

      {/* Subtle bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};
import { SkillCategory } from '../types';

const categories: SkillCategory[] = [
  {
    title: 'Automation Mastery',
    icon: 'auto_fix_high',
    color: 'primary',
    skills: ['Python / Java', 'Selenium Webdriver', 'Cypress / Playwright', 'Appium (Mobile)']
  },
  {
    title: 'Testing Excellence',
    icon: 'verified_user',
    color: 'secondary',
    skills: ['Functional & Regression', 'UAT / API Testing', 'Load & Performance', 'Security Fundamentals']
  },
  {
    title: 'Ecosystem & Tools',
    icon: 'terminal',
    color: 'accent',
    skills: ['Jira / Confluence', 'GitLab / Jenkins CI/CD', 'Docker / Kubernetes', 'PostgreSQL / Git']
  }
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 min-h-screen scroll-mt-32">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left flex flex-col lg:row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">Expertise Spectrum</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight mb-6">
              Mastering the <br /><span className="text-primary">QA Ecosystem</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-light">
              Building robust, scalable, and fail-safe digital experiences through advanced automation and strategic quality management.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((cat, idx) => (
            <div key={idx} className="backdrop-blur-xl bg-white/60 dark:bg-slate-900/40 border border-white/40 dark:border-white/5 p-8 rounded-3xl shadow-xl flex flex-col h-full group hover:translate-y-[-8px] transition-all duration-500">
              <div className={`w-14 h-14 bg-${cat.color === 'accent' ? 'amber-400' : cat.color}/10 rounded-2xl flex items-center justify-center mb-6 text-${cat.color === 'accent' ? 'amber-500' : cat.color} group-hover:bg-${cat.color === 'accent' ? 'amber-400' : cat.color}/20 transition-colors`}>
                <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-6">{cat.title}</h3>
              <div className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-3 py-2 px-4 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm">
                    <span className={`w-2 h-2 rounded-full bg-${cat.color === 'accent' ? 'amber-400' : cat.color}`}></span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Strategy Section */}
        <div className="relative overflow-hidden bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-px bg-primary"></span>
                <span className="text-primary font-bold tracking-widest text-xs uppercase">Strategic Oversight</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">Leadership & Strategy</h2>
              <p className="text-slate-400 text-lg max-w-xl mb-8 leading-relaxed">
                Orchestrating quality at the organizational level. Bridging the gap between business objectives and technical implementation through meticulous test planning and agile leadership.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                  <span className="material-symbols-outlined text-primary text-xl">groups</span>
                  <span className="font-medium text-sm">Agile / Scrum Leadership</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">
                  <span className="material-symbols-outlined text-secondary text-xl">map</span>
                  <span className="font-medium text-sm">Strategic Test Planning</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <MetricCard
                  value={12}
                  suffix="+"
                  label="Team Leads"
                  color="primary"
                  delay={0}
                />
                <MetricCard
                  value={100}
                  suffix="+"
                  label="Projects"
                  color="white"
                  delay={0.1}
                  className="lg:translate-y-6"
                />
                <MetricCard
                  value={0}
                  label="Critical Fails"
                  color="white"
                  delay={0.2}
                />
                <MetricCard
                  value={99}
                  suffix="%"
                  label="Accuracy"
                  color="secondary"
                  delay={0.3}
                  className="lg:translate-y-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
