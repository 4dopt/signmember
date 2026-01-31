
import React, { useState } from 'react';
import Header from './Header';

interface AdminLoginProps {
    onLogin: () => void;
    onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === (import.meta as any).env.VITE_ADMIN_PASSWORD) {
            localStorage.setItem('admin_authenticated', 'true');
            onLogin();
        } else {
            setError('Incorrect password');
            setPassword('');
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
                    Back
                </button>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
                    <div className="mb-10">
                        <h2 className="text-3xl font-heading font-black text-[#064e3b] mb-1 uppercase italic">Admin Login</h2>
                        <p className="text-sm text-slate-400 font-medium">Enter password to access dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none text-slate-900 font-bold"
                                placeholder="Enter admin password"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-5 bg-[#064e3b] hover:bg-[#053d2f] active:scale-[0.98] text-white rounded-[1.25rem] font-black text-xl transition-all shadow-xl shadow-emerald-950/20 font-heading uppercase tracking-tight"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
