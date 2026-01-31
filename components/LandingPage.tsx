
import React from 'react';
import Header from './Header';

interface LandingPageProps {
  onJoinClick: () => void;
  onAdminClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onJoinClick, onAdminClick }) => {
  return (
    <div className="relative min-h-screen bg-white pb-32">
      <Header onJoinClick={onJoinClick} />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-bg.jpg"
            className="w-full h-full object-cover brightness-[0.5]"
            alt="Golf Course"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#022c22] via-[#022c22]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-6 pb-20 animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em] mb-4 backdrop-blur-md border border-emerald-400/20">
            Est. Northwick Park
          </span>
          <h1 className="text-5xl font-heading text-white mb-4 leading-[1.05] uppercase italic font-black">
            Master <br /> Your <span className="text-emerald-400">Swing</span>
          </h1>
          <p className="text-base text-slate-300 mb-8 leading-relaxed max-w-sm font-medium">
            Join London's Most happening Golf driving range facility. Enjoy Exclusive benefits and offers by Joining PlayGolf Membership.
          </p>

          {/* Primary Hero CTA */}
          <button
            onClick={onJoinClick}
            className="group relative w-full bg-emerald-500 hover:bg-emerald-400 text-[#022c22] font-black text-sm uppercase tracking-[0.15em] py-4 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Join Free Membership
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
          </button>
        </div>
      </section>

      {/* Benefits Section - Mobile Optimized */}
      <section className="py-20 px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-black text-[#064e3b] mb-2 uppercase italic tracking-tighter">Premium Access</h2>
          <div className="w-16 h-1.5 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="space-y-10">
          {[
            {
              title: "EARN LOYALTY POINTS",
              desc: "Accumulate points on every visit and redeem them for range credit or premium gear.",
              icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            },
            {
              title: "EXCLUSIVE OFFERS",
              desc: "Unlock member-only discounts on Drivers, balls, and Food/drinks.",
              icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            },
            {
              title: "REALTIME UPDATES",
              desc: "Be the first to know about course conditions, event schedules, and bay availability.",
              icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            }
          ].map((benefit, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 bg-[#064e3b] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/10">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={benefit.icon}></path>
                </svg>
              </div>
              <div className="pt-1">
                <h3 className="font-heading font-black text-[#064e3b] text-lg mb-1 tracking-tight">{benefit.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Card */}
      <section className="px-6 py-8">
        <div className="bg-[#022c22] rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <p className="text-white text-xl font-heading font-bold leading-relaxed italic mb-8 border-l-4 border-emerald-500 pl-6">
            "The community is unrivaled. My handicap dropped by 6 points in my first season!"
          </p>
          <div className="flex items-center gap-4">
            <img src="https://picsum.photos/seed/golf-man/100/100" className="w-12 h-12 rounded-2xl border-2 border-emerald-500/50 object-cover" alt="Member" />
            <div>
              <div className="text-white font-black font-heading text-sm tracking-wide uppercase">Mike Thompson</div>
              <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Handicap: 8.2</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/95 to-transparent z-40">
        <div className="max-w-md mx-auto">
          <button
            onClick={onJoinClick}
            className="animate-soft-pulse w-full py-5 bg-[#064e3b] hover:bg-[#053d2f] active:scale-[0.98] text-white rounded-[1.25rem] font-black text-xl transition-all shadow-2xl shadow-emerald-950/40 flex items-center justify-center gap-2 font-heading uppercase tracking-tight"
          >
            Join Free Now
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        </div>
      </div>

      <footer className="py-12 px-6 text-center border-t border-slate-50 mt-12">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">© 2024 PlayGolf Northwick Park</p>
        <button
          onClick={onAdminClick}
          className="mt-4 text-slate-300 hover:text-[#064e3b] text-[9px] font-bold uppercase tracking-widest transition-colors"
        >
          Admin
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;
