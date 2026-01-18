
import React from 'react';
import { User } from '../types';

interface Props {
  user: User;
  onLogout: () => void;
  setView: (view: 'HOME' | 'HISTORY') => void;
  currentView: 'HOME' | 'HISTORY';
}

const Header: React.FC<Props> = ({ user, onLogout, setView, currentView }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-orange-100 sticky top-0 z-40 px-4">
      <div className="max-w-4xl mx-auto h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-orange-500 to-red-600 p-2.5 rounded-2xl shadow-lg shadow-orange-100 rotate-3">
            <i className="fas fa-om text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900 leading-none italic uppercase tracking-tighter">TEMPLE</h1>
            <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.3em] leading-none mt-1">Verifier</p>
          </div>
        </div>

        <div className="hidden md:flex items-center bg-gray-50 p-1 rounded-2xl border border-gray-100">
          <button 
            onClick={() => setView('HOME')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentView === 'HOME' ? 'bg-white text-orange-600 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Monitor
          </button>
          <button 
            onClick={() => setView('HISTORY')}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentView === 'HISTORY' ? 'bg-white text-orange-600 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Audit Logs
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-gray-900 uppercase leading-none">{user.name}</p>
            <p className="text-[9px] text-orange-500 font-black uppercase tracking-widest mt-1">{user.role}</p>
          </div>
          <button 
            onClick={onLogout}
            className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all hover:shadow-lg hover:shadow-red-50"
          >
            <i className="fas fa-power-off text-lg"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
