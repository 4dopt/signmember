
import React from 'react';

interface SuccessMessageProps {
  onFinish: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onFinish }) => {
  return (
    <div className="min-h-screen bg-[#022c22] flex flex-col justify-center px-6">
      <div className="bg-white rounded-[3rem] p-10 text-center shadow-2xl animate-fade-in-up max-w-md mx-auto w-full relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-emerald-500"></div>
        
        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#064e3b] rotate-3 shadow-lg shadow-emerald-900/5">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-4xl font-heading font-black text-[#064e3b] mb-4 uppercase italic leading-none">Welcome <br/> To The Club</h2>
        <p className="text-slate-500 mb-10 leading-relaxed text-sm font-medium">
          Access granted. Your digital member card has been dispatched to your private inbox.
        </p>

        <button 
          onClick={onFinish}
          className="w-full py-4.5 bg-[#064e3b] hover:bg-[#053d2f] active:scale-95 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-950/10 font-heading uppercase tracking-tight"
        >
          Explore Facilities
        </button>
        
        <div className="mt-12 pt-8 border-t border-slate-50">
          <div className="flex justify-center -space-x-3 mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <img 
                key={i}
                className="h-10 w-10 rounded-full ring-4 ring-white object-cover shadow-sm" 
                src={`https://picsum.photos/seed/golf-${i + 50}/64/64`} 
                alt="Member"
              />
            ))}
          </div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Joined by 2,400+ members</p>
        </div>
      </div>
      
      <p className="text-center text-emerald-400/40 text-[10px] font-black uppercase tracking-[0.1em] mt-10">
        PlayGolf • Northwick Park • Official Member
      </p>
    </div>
  );
};

export default SuccessMessage;
