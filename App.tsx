
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MembershipForm from './components/MembershipForm';
import SuccessMessage from './components/SuccessMessage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');

  // Smooth scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  // Check if admin is authenticated
  useEffect(() => {
    if (view === 'admin-dashboard' && !localStorage.getItem('admin_authenticated')) {
      setView('admin-login');
    }
  }, [view]);

  const handleJoinClick = () => setView('form');
  const handleBackToLanding = () => setView('landing');
  const handleFormSubmit = () => setView('success');
  const handleAdminClick = () => setView('admin-login');
  const handleAdminLogin = () => setView('admin-dashboard');
  const handleAdminLogout = () => setView('landing');

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {view === 'landing' && (
        <LandingPage onJoinClick={handleJoinClick} onAdminClick={handleAdminClick} />
      )}
      {view === 'form' && (
        <MembershipForm
          onBack={handleBackToLanding}
          onSubmit={handleFormSubmit}
        />
      )}
      {view === 'success' && (
        <SuccessMessage onFinish={() => setView('landing')} />
      )}
      {view === 'admin-login' && (
        <AdminLogin onLogin={handleAdminLogin} onBack={handleBackToLanding} />
      )}
      {view === 'admin-dashboard' && (
        <AdminDashboard onLogout={handleAdminLogout} />
      )}
    </div>
  );
};

export default App;
