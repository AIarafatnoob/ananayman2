
import React, { useState } from 'react';

interface AdminPINModalProps {
    onSuccess: () => void;
    onClose: () => void;
}

export const AdminPINModal: React.FC<AdminPINModalProps> = ({ onSuccess, onClose }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);
    const CORRECT_PIN = '1807';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === CORRECT_PIN) {
            onSuccess();
        } else {
            setError(true);
            setPin('');
            setTimeout(() => setError(false), 1000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-sm mx-4 transform animate-in zoom-in-95 duration-300">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl">lock</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Access</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Enter your 4-digit security PIN to enable editing capabilities.</p>

                    <form onSubmit={handleSubmit} className="pt-6 space-y-6">
                        <div className="flex justify-center gap-4">
                            <input
                                type="password"
                                maxLength={4}
                                value={pin}
                                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                                placeholder="••••"
                                className={`w-48 text-center text-4xl tracking-[1em] font-black py-4 rounded-2xl border-2 transition-all outline-none focus:ring-4 focus:ring-primary/10 ${error
                                        ? 'border-red-500 bg-red-50 dark:bg-red-500/10 animate-shake'
                                        : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 focus:border-primary'
                                    }`}
                                autoFocus
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                                Incorrect PIN. Please try again.
                            </p>
                        )}

                        <div className="flex gap-4 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                            >
                                Verify
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
