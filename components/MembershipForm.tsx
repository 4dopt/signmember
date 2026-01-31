
import React, { useState } from 'react';
import Header from './Header';
import { supabase } from '../lib/supabase';

interface MembershipFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: 'Beginner',
    yearsPlaying: '0-1 years'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('members')
        .insert([
          {
            email: formData.email,
            full_name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone || null,
            experience: formData.experience,
            years_playing: formData.yearsPlaying
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      onSubmit();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header showCTA={false} />

      <div className="pt-24 pb-12 px-6 max-w-md mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-[#064e3b] font-black text-[10px] mb-6 transition-colors group uppercase tracking-[0.15em]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Course
        </button>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 animate-fade-in-up">
          <div className="mb-10">
            <h2 className="text-3xl font-heading font-black text-[#064e3b] mb-1 uppercase italic">Join the Club</h2>
            <p className="text-sm text-slate-400 font-medium">Elevate your performance today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
              <input
                required
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none text-slate-900 font-bold"
                placeholder="Ex. Tiger"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
              <input
                required
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none text-slate-900 font-bold"
                placeholder="Ex. Woods"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Private Email</label>
              <input
                required
                type="email"
                inputMode="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none text-slate-900 font-bold"
                placeholder="name@email.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Skill</label>
                <div className="relative">
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none appearance-none text-slate-900 font-bold"
                  >
                    <option>Beginner</option>
                    <option>Advanced</option>
                    <option>Elite</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#064e3b]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Years at Club</label>
                <div className="relative">
                  <select
                    value={formData.yearsPlaying}
                    onChange={(e) => setFormData({ ...formData, yearsPlaying: e.target.value })}
                    className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none appearance-none text-slate-900 font-bold"
                  >
                    <option>0-1 years</option>
                    <option>2-5 years</option>
                    <option>6-10 years</option>
                    <option>10+ years</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#064e3b]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#064e3b] hover:bg-[#053d2f] active:scale-[0.98] text-white rounded-[1.25rem] font-black text-xl transition-all shadow-xl shadow-emerald-950/20 font-heading uppercase tracking-tight disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Claim My Invite'}
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-5 leading-relaxed font-medium">
                Instant activation upon approval. No fees applied.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
