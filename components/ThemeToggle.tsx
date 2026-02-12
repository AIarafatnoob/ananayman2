
import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggle }) => {
  return (
    <button
      className="fixed bottom-8 right-6 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg z-50 transition-all active:scale-90"
      onClick={toggle}
      title="Toggle Dark Mode"
    >
      <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">
        {isDarkMode ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};
