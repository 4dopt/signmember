
import React from 'react';

interface HeaderProps {
  onJoinClick?: () => void;
  showCTA?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onJoinClick, showCTA = true }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-md mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#064e3b] rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/10">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2v4M12 18v4" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-[#064e3b] leading-none font-heading uppercase">PlayGolf</span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-emerald-600 uppercase">Northwick Park</span>
          </div>
        </div>
        
        {showCTA && (
          <button 
            onClick={onJoinClick}
            className="text-[#064e3b] font-extrabold text-xs border-2 border-[#064e3b]/10 bg-emerald-50/50 px-4 py-1.5 rounded-full active:scale-95 transition-transform uppercase tracking-wider"
          >
            Join
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
