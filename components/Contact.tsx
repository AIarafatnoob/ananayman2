
import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden scroll-mt-32">
      {/* Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-0 md:opacity-100 z-0">
        <span className="watermark font-serif font-bold text-slate-900 dark:text-slate-100">ANAN</span>
      </div>

      <div className="container max-w-6xl px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] text-slate-900 dark:text-white">
              Let's connect and <span className="text-primary italic">build quality</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to improve your software's integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <a href="mailto:anan.tuba1807@gmail.com" className="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">mail</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">Email</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white break-all">anan.tuba1807@gmail.com</p>
            </a>

            <a href="tel:+8801770945699" className="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/5">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">call</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">Phone</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">+880 1770 945699</p>
            </a>

            <div className="group bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-4xl">location_on</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-2">Location</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">Mirpur, Dhaka</p>
            </div>
          </div>

        </div>
      </div>
    </section>

  );
};
