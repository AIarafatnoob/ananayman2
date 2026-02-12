
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const resumeUrl = '/Resume.pdf';
    // Open in new tab
    window.open(resumeUrl, '_blank');
    // Start download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Anan-Aiman-Tuba-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="glass-nav border border-slate-200/50 dark:border-slate-800/50 px-6 md:px-8 py-3 rounded-pill flex items-center gap-3 md:gap-8 shadow-sm transition-all duration-300">
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={`text-xs md:text-sm font-semibold tracking-tight transition-all duration-300 ${activeSection === link.id
                ? 'text-primary scale-110'
                : 'text-slate-500 dark:text-slate-400 hover:text-primary'
              }`}
          >
            {link.name}
          </a>
        ))}
        <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden md:block"></div>
        <button
          onClick={handleDownload}
          className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 md:px-5 py-2 rounded-pill text-[10px] md:text-xs font-bold flex items-center gap-2 group transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="hidden md:inline">Download CV</span>
          <span className="md:hidden">CV</span>
          <span className="material-symbols-outlined !text-sm">download</span>
        </button>
      </nav>
    </header>

  );
};
