import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User } from '../types';

interface Props {
  user: User;
  onLogout: () => void;
  onNavigate: (view: 'HOME' | 'HISTORY', anchor?: string) => void;
  currentView: 'HOME' | 'HISTORY';
}

const Header: React.FC<Props> = ({ user, onLogout, onNavigate, currentView }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { label: string; view: 'HOME' | 'HISTORY'; anchor?: string }[] = [
    { label: 'Home', view: 'HOME' },
    { label: 'AI Verifier', view: 'HOME', anchor: 'ai-verifier' },
    { label: 'History', view: 'HISTORY' },
  ];

  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-100 sticky top-0 z-40 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto h-20 flex items-center justify-between">
        <button
          onClick={() => onNavigate('HOME')}
          className="flex items-center space-x-3"
        >
          <div className="bg-gradient-to-tr from-orange-500 to-red-600 w-11 h-11 rounded-xl shadow-lg shadow-orange-100 flex items-center justify-center">
            <i className="fas fa-om text-white text-lg"></i>
          </div>
          <div className="text-left">
            <h1 className="text-lg font-black text-gray-900 leading-none">Temple Verifier</h1>
            <p className="text-[10px] font-semibold text-gray-400 mt-1">AI Ritual Compliance System</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.anchor
              ? false
              : currentView === link.view;
            return (
              <button
                key={link.label}
                onClick={() => onNavigate(link.view, link.anchor)}
                className={`relative text-sm font-semibold pb-1 transition-colors ${
                  isActive ? 'text-orange-600' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="header-active-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-orange-500 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-2xl pl-2 pr-3 py-2 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              <i className="fas fa-user text-sm"></i>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-black text-gray-900 leading-none">{user.name}</p>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">{user.role || 'User'}</p>
            </div>
            <i className={`fas fa-chevron-down text-[10px] text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`}></i>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-1"
              >
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <i className="fas fa-power-off text-xs"></i>
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
