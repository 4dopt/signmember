
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Header from './Header';

interface Member {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    experience: string;
    years_playing: string;
    created_at: string;
}

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [skillFilter, setSkillFilter] = useState('all');
    const [yearsFilter, setYearsFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all'); // all, today, week, month, custom
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchMembers();
    }, []);

    // Filter members based on current filters
    const filteredMembers = members.filter(member => {
        const matchesSearch = searchTerm === '' ||
            member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSkill = skillFilter === 'all' || member.experience === skillFilter;
        const matchesYears = yearsFilter === 'all' || member.years_playing === yearsFilter;

        // Date filtering
        let matchesDate = true;
        if (dateFilter !== 'all' && member.created_at) {
            const memberDate = new Date(member.created_at);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (dateFilter === 'today') {
                const todayEnd = new Date(today);
                todayEnd.setHours(23, 59, 59, 999);
                matchesDate = memberDate >= today && memberDate <= todayEnd;
            } else if (dateFilter === 'week') {
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);
                matchesDate = memberDate >= weekAgo;
            } else if (dateFilter === 'month') {
                const monthAgo = new Date(today);
                monthAgo.setMonth(today.getMonth() - 1);
                matchesDate = memberDate >= monthAgo;
            } else if (dateFilter === 'custom' && startDate && endDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                matchesDate = memberDate >= start && memberDate <= end;
            }
        }

        return matchesSearch && matchesSkill && matchesYears && matchesDate;
    });

    const fetchMembers = async () => {
        try {
            const { data, error: fetchError } = await supabase
                .from('members')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setMembers(data || []);
        } catch (err) {
            console.error('Error fetching members:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch members');
        } finally {
            setLoading(false);
        }
    };

    const downloadCSV = () => {
        console.log('Download CSV clicked, filtered members:', filteredMembers.length);

        if (filteredMembers.length === 0) {
            alert('No members to download');
            return;
        }

        try {
            // CSV headers
            const headers = ['Name', 'Email', 'Phone', 'Skill Level', 'Years at Club', 'Date Submitted'];

            // CSV rows - use filtered members
            const rows = filteredMembers.map(member => {
                return [
                    member.full_name || '',
                    member.email || '',
                    member.phone || '',
                    member.experience || '',
                    member.years_playing || '',
                    member.created_at ? new Date(member.created_at).toLocaleDateString() : ''
                ];
            });

            // Escape function for CSV
            const escapeCSV = (value: string): string => {
                const str = String(value);
                if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            };

            // Build CSV content
            const csvRows = [
                headers.map(h => escapeCSV(h)).join(','),
                ...rows.map(row => row.map(cell => escapeCSV(cell)).join(','))
            ];
            const csvContent = csvRows.join('\n');

            console.log('CSV content generated, rows:', csvRows.length);

            // Create download
            const date = new Date().toISOString().split('T')[0];
            const filename = `members_${date}.csv`;

            // Use data URL approach for better compatibility
            const csvData = '\uFEFF' + csvContent; // BOM for Excel
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });

            // Create temporary link
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                console.log('CSV download completed:', filename);
            } else {
                throw new Error('Browser does not support download attribute');
            }
        } catch (error) {
            console.error('Error downloading CSV:', error);
            alert('Failed to download CSV: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_authenticated');
        onLogout();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header showCTA={false} />

            <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-heading font-black text-[#064e3b] uppercase italic">Admin Dashboard</h1>
                        <p className="text-sm text-slate-400 font-medium mt-2">Manage membership submissions</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-sm transition-all"
                    >
                        Logout
                    </button>
                </div>

                {loading ? (
                    <div className="bg-white rounded-3xl p-12 text-center shadow-xl">
                        <p className="text-slate-400 font-medium">Loading members...</p>
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                            <p className="text-sm text-red-600 font-medium">{error}</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-xl font-black text-slate-900">Members ({filteredMembers.length})</h2>
                                    <p className="text-xs text-slate-400 mt-1">{filteredMembers.length === members.length ? 'All form submissions' : `Filtered from ${members.length} total`}</p>
                                </div>
                                <button
                                    onClick={downloadCSV}
                                    disabled={filteredMembers.length === 0}
                                    className="px-6 py-3 bg-[#064e3b] hover:bg-[#053d2f] disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-950/20"
                                >
                                    Download CSV
                                </button>
                            </div>

                            {/* Filter Controls */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Search */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Search</label>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Name or email..."
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none text-slate-900 font-medium text-sm"
                                    />
                                </div>

                                {/* Skill Filter */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Skill Level</label>
                                    <div className="relative">
                                        <select
                                            value={skillFilter}
                                            onChange={(e) => setSkillFilter(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none appearance-none text-slate-900 font-medium text-sm"
                                        >
                                            <option value="all">All Levels</option>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Advanced">Advanced</option>
                                            <option value="Elite">Elite</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#064e3b]">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Years Filter */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Years at Club</label>
                                    <div className="relative">
                                        <select
                                            value={yearsFilter}
                                            onChange={(e) => setYearsFilter(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none appearance-none text-slate-900 font-medium text-sm"
                                        >
                                            <option value="all">All Years</option>
                                            <option value="0-1 years">0-1 years</option>
                                            <option value="2-5 years">2-5 years</option>
                                            <option value="6-10 years">6-10 years</option>
                                            <option value="10+ years">10+ years</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#064e3b]">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Date Range Filter */}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Date Range</label>
                                    <div className="relative">
                                        <select
                                            value={dateFilter}
                                            onChange={(e) => setDateFilter(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none appearance-none text-slate-900 font-medium text-sm"
                                        >
                                            <option value="all">All Time</option>
                                            <option value="today">Today</option>
                                            <option value="week">Last 7 Days</option>
                                            <option value="month">Last 30 Days</option>
                                            <option value="custom">Custom Range</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#064e3b]">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Custom Date Range Inputs */}
                            {dateFilter === 'custom' && (
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none text-slate-900 font-medium text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">End Date</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-50 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-[#064e3b] transition-all outline-none text-slate-900 font-medium text-sm"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Skill</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Years at Club</th>
                                        <th className="px-6 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredMembers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                                                No submissions yet
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMembers.map((member) => (
                                            <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-bold text-slate-900">{member.full_name}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{member.email}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{member.phone || '-'}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{member.experience}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{member.years_playing}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">
                                                    {new Date(member.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
