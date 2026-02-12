
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { data } = useAdmin();

  const filteredProjects = activeFilter === 'All'
    ? data.projects
    : data.projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 px-6 min-h-screen bg-slate-50 dark:bg-background-dark/50 scroll-mt-32">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-16 text-center space-y-4">
          <h2 className="font-serif text-5xl md:text-6xl text-slate-900 dark:text-white">Selected Projects</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
            A collection of high-impact Quality Assurance engineering projects across diverse technological landscapes.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {['All', 'Web', 'Mobile', 'BI', 'API'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-pill border transition-all font-semibold text-sm ${activeFilter === cat
                ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/5'
                : 'border-slate-200 dark:border-slate-800 hover:border-primary text-slate-500 dark:text-slate-400'
                }`}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-white dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                  src={project.image}
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-pill flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-white">{project.category} Testing</span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider rounded-pill border border-primary/10">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-secondary/5 rounded-2xl p-4 border border-secondary/10">
                  <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-1">Impact</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "{project.impact}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

