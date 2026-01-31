
import React from 'react';

interface HeaderProps {
  onJoinClick?: () => void;
  showCTA?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onJoinClick, showCTA = true }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-md mx-auto px-6 h-20 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="PlayGolf Northwick Park"
            className="h-16 w-auto object-contain max-w-[200px]"
          />
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
