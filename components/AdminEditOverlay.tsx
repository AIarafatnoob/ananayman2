
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Project, Experience, Education } from '../types';

export const AdminEditOverlay: React.FC = () => {
    const { isAdmin, setIsAdmin, data, setData, exportData, resetData } = useAdmin();
    const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'projects' | 'export'>('experience');

    if (!isAdmin) return null;

    const handleSave = (section: keyof typeof data, updatedItems: any[]) => {
        setData({ ...data, [section]: updatedItems });
    };

    const removeItem = (section: keyof typeof data, id: string) => {
        const updated = (data[section] as any[]).filter(item => item.id !== id);
        handleSave(section, updated);
    };

    const addItem = (section: keyof typeof data) => {
        const newId = `new_${Math.random().toString(36).substr(2, 9)}`;
        let newItem: any;

        if (section === 'experience') {
            newItem = { id: newId, period: '', role: '', company: '', points: [''], isNew: true };
        } else if (section === 'education') {
            newItem = { id: newId, year: '', degree: '', institution: '', description: '', type: 'education', isNew: true };
        } else if (section === 'projects') {
            newItem = { id: newId, title: '', category: 'Web', image: '', tags: [], impact: '', description: '', isNew: true };
        }

        handleSave(section, [...(data[section] as any[]), newItem]);

        // Use a timeout to allow the DOM to update before scrolling
        setTimeout(() => {
            const element = document.getElementById(newId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const updateItem = (section: keyof typeof data, id: string, field: string, value: any) => {
        const updated = (data[section] as any[]).map(item => {
            if (item.id === id) {
                if (field === 'points' || field === 'tags') {
                    // Handle arrays (simple comma separated for now)
                    return { ...item, [field]: typeof value === 'string' ? value.split(',').map(s => s.trim()) : value };
                }
                return { ...item, [field]: value };
            }
            return item;
        });
        handleSave(section, updated);
    };

    return (
        <div className="fixed inset-0 z-[90] flex items-end justify-center pointer-events-none p-6">
            <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[2.5rem] flex flex-col pointer-events-auto overflow-hidden h-[80vh] animate-in slide-in-from-bottom-12 duration-500">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">edit_note</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Portfolio Editor</h2>
                            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Admin Mode Active</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to reset all changes to default?')) {
                                    resetData();
                                }
                            }}
                            className="px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                        >
                            Reset All
                        </button>
                        <button
                            onClick={() => setIsAdmin(false)}
                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95"
                        >
                            Exit Editor
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex px-6 py-2 gap-2 bg-slate-50/30 dark:bg-slate-800/20 border-b border-slate-100 dark:border-slate-800">
                    {[
                        { id: 'experience', icon: 'work', label: 'Experience' },
                        { id: 'education', icon: 'school', label: 'Education' },
                        { id: 'projects', icon: 'rocket_launch', label: 'Projects' },
                        { id: 'export', icon: 'terminal', label: 'Export JSON' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }`}
                        >
                            <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {activeTab === 'experience' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Work Experience</h3>
                                <button onClick={() => addItem('experience')} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Add Experience
                                </button>
                            </div>
                            {data.experience.map(item => (
                                <div key={item.id} id={item.id} className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 relative group animate-in zoom-in-95 duration-300">
                                    {item.isNew && (
                                        <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-primary/20 animate-bounce-slow">NEW</div>
                                    )}
                                    <button onClick={() => removeItem('experience', item.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-slate-400">Period</label>
                                            <input
                                                value={item.period}
                                                onChange={e => updateItem('experience', item.id, 'period', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-slate-400">Company</label>
                                            <input
                                                value={item.company}
                                                onChange={e => updateItem('experience', item.id, 'company', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-black text-slate-400">Role</label>
                                        <input
                                            value={item.role}
                                            onChange={e => updateItem('experience', item.id, 'role', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-black text-slate-400">Key Points (One per line)</label>
                                        <textarea
                                            value={item.points.join('\n')}
                                            onChange={e => updateItem('experience', item.id, 'points', e.target.value.split('\n'))}
                                            rows={3}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'education' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Education & Certifications</h3>
                                <button onClick={() => addItem('education')} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Add Item
                                </button>
                            </div>
                            {data.education.map(item => (
                                <div key={item.id} id={item.id} className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 relative animate-in zoom-in-95 duration-300">
                                    {item.isNew && (
                                        <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-primary/20 animate-bounce-slow">NEW</div>
                                    )}
                                    <button onClick={() => removeItem('education', item.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-slate-400">Year/Label</label>
                                            <input
                                                value={item.year}
                                                onChange={e => updateItem('education', item.id, 'year', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-slate-400">Type</label>
                                            <select
                                                value={item.type}
                                                onChange={e => updateItem('education', item.id, 'type', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                            >
                                                <option value="education">Education</option>
                                                <option value="certification">Certification</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-black text-slate-400">Degree / Certificate Name</label>
                                        <input
                                            value={item.degree}
                                            onChange={e => updateItem('education', item.id, 'degree', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-black text-slate-400">Institution</label>
                                        <input
                                            value={item.institution}
                                            onChange={e => updateItem('education', item.id, 'institution', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-black text-slate-400">Description</label>
                                        <textarea
                                            value={item.description}
                                            onChange={e => updateItem('education', item.id, 'description', e.target.value)}
                                            rows={2}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Portfolio Projects</h3>
                                <button onClick={() => addItem('projects')} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                    Add Project
                                </button>
                            </div>
                            {data.projects.map(item => (
                                <div key={item.id} id={item.id} className="p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 relative animate-in zoom-in-95 duration-300">
                                    {item.isNew && (
                                        <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-primary/20 animate-bounce-slow">NEW</div>
                                    )}
                                    <button onClick={() => removeItem('projects', item.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-slate-400">Title</label>
                                            <input
                                                value={item.title}
                                                onChange={e => updateItem('projects', item.id, 'title', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase font-black text-slate-400">Category</label>
                                            <select
                                                value={item.category}
                                                onChange={e => updateItem('projects', item.id, 'category', e.target.value)}
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                            >
                                                <option value="Web">Web</option>
                                                <option value="Mobile">Mobile</option>
                                                <option value="API">API</option>
                                                <option value="BI">BI</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-black text-slate-400">Tags (Comma separated)</label>
                                        <input
                                            value={item.tags.join(', ')}
                                            onChange={e => updateItem('projects', item.id, 'tags', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-black text-slate-400">Impact Description</label>
                                        <textarea
                                            value={item.impact}
                                            onChange={e => updateItem('projects', item.id, 'impact', e.target.value)}
                                            rows={2}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-black text-slate-400">Image URL (Unsplash or direct link)</label>
                                        <input
                                            value={item.image}
                                            onChange={e => updateItem('projects', item.id, 'image', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'export' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 p-6 rounded-[2rem]">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-800/30 rounded-2xl flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-amber-600">info</span>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-amber-800 dark:text-amber-200 font-bold">How to make changes permanent?</h4>
                                        <p className="text-amber-700/80 dark:text-amber-200/60 text-sm leading-relaxed">
                                            All changes you've made are currently stored only in your browser. To make them permanent for all visitors, copy the JSON block below and replace the content of <code className="bg-amber-100/50 dark:bg-amber-800/50 px-2 py-0.5 rounded">data/portfolioData.ts</code> in your source code.
                                        </p>
                                        <div className="flex gap-4 mt-4">
                                            <button
                                                onClick={() => {
                                                    const code = `export const initialPortfolioData = ${exportData()};`;
                                                    navigator.clipboard.writeText(code);
                                                    alert('Copied to clipboard! You can now paste this into portfolioData.ts');
                                                }}
                                                className="px-6 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-600/20 hover:bg-amber-700 transition-all flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-sm">content_copy</span>
                                                Copy Code
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const dataStr = `export const initialPortfolioData = ${exportData()};`;
                                                    const blob = new Blob([dataStr], { type: 'text/typescript' });
                                                    const url = URL.createObjectURL(blob);
                                                    const link = document.createElement('a');
                                                    link.href = url;
                                                    link.download = 'portfolioData.ts';
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                    URL.revokeObjectURL(url);
                                                }}
                                                className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                                            >
                                                <span className="material-symbols-outlined text-sm">download</span>
                                                Download file
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute top-4 right-4 text-[10px] font-black uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">JSON Output</div>
                                <pre className="p-8 bg-slate-900 text-slate-300 rounded-[2.5rem] text-[11px] font-mono overflow-x-auto border border-slate-800 leading-relaxed max-h-[400px]">
                                    {exportData()}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
