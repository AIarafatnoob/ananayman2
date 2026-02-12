import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const { data } = useAdmin();

  return (
    <section id="about" className="py-24 px-6 pastel-gradient border-t border-slate-100 dark:border-slate-800 scroll-mt-32">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              My Journey
            </div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Blending Precision with <span className="italic font-serif font-normal text-primary">Reliability.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                With over <span className="text-slate-900 dark:text-white font-bold">3+ years of experience</span> as a Senior Software QA Engineer, I bridge the gap between complex software requirements and seamless user experiences.
              </p>
              <p>
                My journey began at <span className="text-slate-900 dark:text-white font-medium">East West University</span>, where I earned my CSE degree. Today, I specialize in architecting automation frameworks that reduce manual effort by up to 70%, ensuring high-velocity delivery without compromising on quality.
              </p>
              <p>
                I believe that quality is not just a stage in development, but a mindset. My approach combines rigorous technical testing with a keen eye for UI/UX detail, ensuring every release is both functional and delightful.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">500+</span>
                <span className="text-xs uppercase tracking-widest text-slate-500">Bugs Squashed</span>
              </div>
              <div className="w-[1px] h-10 bg-slate-200 dark:bg-slate-800"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">15+</span>
                <span className="text-xs uppercase tracking-widest text-slate-500">Live Projects</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 pt-12">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-500">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
                <h3 className="text-2xl font-bold transition-all duration-300">
                  {activeTab === 'experience' ? 'Professional Experience' : 'Education & Recognition'}
                </h3>
                <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-2xl relative w-fit">
                  {/* Sliding Underline Highlight (Morphic Transition) */}
                  <div
                    className={`absolute bottom-2 h-0.5 bg-primary rounded-full transition-all duration-500 z-0 ease-in-out ${activeTab === 'experience' ? 'left-[2.875rem] w-12' : 'left-[10.875rem] w-12'
                      }`}
                  >
                  </div>

                  <button
                    onClick={() => setActiveTab('experience')}
                    className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors duration-300 relative z-10 w-32 ${activeTab === 'experience' ? 'text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors duration-300 relative z-10 w-32 ${activeTab === 'education' ? 'text-primary' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  >
                    Education
                  </button>
                </div>
              </div>

              <div className="relative min-h-[400px]">
                {activeTab === 'education' ? (
                  <div key="education" className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 ease-out">
                    {data.education.map((item, index) => (
                      <div key={item.id} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full mt-1 shadow-[0_0_15px_rgba(148,163,184,0.5)] ${item.type === 'education' ? 'bg-primary shadow-primary/50' : 'bg-secondary shadow-secondary/50'}`}></div>
                          {index !== data.education.length - 1 && <div className="w-px h-full bg-slate-200 dark:bg-slate-800 mt-2"></div>}
                        </div>
                        <div>
                          <span className={`text-xs font-bold uppercase tracking-widest ${item.type === 'education' ? 'text-primary' : 'text-secondary'}`}>{item.year}</span>
                          <h4 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">{item.degree}</h4>
                          <p className="text-slate-500 dark:text-slate-400 font-medium italic">{item.institution}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed mt-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div key="experience" className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700 ease-out">
                    {data.experience.map((item, index) => (
                      <div key={item.id} className="flex gap-6">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full mt-1 shadow-[0_0_15px_rgba(167,139,250,0.5)] ${index === 0 ? 'bg-primary' : 'bg-secondary'}`}></div>
                          {index !== data.experience.length - 1 && <div className="w-px h-full bg-slate-200 dark:bg-slate-800 mt-2"></div>}
                        </div>
                        <div>
                          <span className={`text-xs font-bold uppercase tracking-widest ${index === 0 ? 'text-primary' : 'text-secondary'}`}>{item.period}</span>
                          <h4 className="text-xl font-bold mt-1 text-slate-900 dark:text-white">{item.role}</h4>
                          <p className="text-slate-500 dark:text-slate-400 font-medium italic">{item.company}</p>
                          <ul className={`text-sm text-slate-600 dark:text-slate-500 leading-relaxed mt-3 space-y-2 list-disc pl-4 marker:text-primary ${index === 0 ? 'marker:text-primary' : 'marker:text-secondary'}`}>
                            {item.points.map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Marquee Tools Bar */}
      <div className="mt-24 mb-6 text-center">
        <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Technical skills</span>
      </div>
      <div className="py-8 md:py-12 bg-slate-50/80 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 overflow-hidden relative">
        <div className="flex whitespace-nowrap gap-8 md:gap-16 items-center animate-marquee">
          {[1, 2].map(i => (
            <div key={i} className="flex gap-8 md:gap-16 items-center">
              {[
                { name: 'Selenium', slug: 'selenium' },
                { name: 'Cypress', slug: 'cypress' },
                { name: 'Jira', slug: 'jira' },
                { name: 'Postman', slug: 'postman' },
                { name: 'Appium', slug: 'appium' },
                { name: 'Jest', slug: 'jest' },
                { name: 'Docker', slug: 'docker' },
                { name: 'Kubernetes', slug: 'kubernetes' },
                { name: 'Playwright', slug: 'playwright', customUrl: 'https://playwright.dev/img/playwright-logo.svg' }
              ].map(tool => (
                <div key={tool.name} className="flex items-center gap-2 md:gap-4 opacity-90 dark:opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110">
                  <img
                    src={tool.customUrl || `https://cdn.simpleicons.org/${tool.slug}`}
                    alt={tool.name}
                    className="w-5 h-5 md:w-8 md:h-8 object-contain"
                  />
                  <span className="text-sm md:text-2xl font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">{tool.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};
