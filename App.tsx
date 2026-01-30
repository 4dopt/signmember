
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MembershipForm from './components/MembershipForm';
import SuccessMessage from './components/SuccessMessage';
import { AppView } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');

  // Smooth scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const handleJoinClick = () => setView('form');
  const handleBackToLanding = () => setView('landing');
  const handleFormSubmit = () => setView('success');

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {view === 'landing' && (
        <LandingPage onJoinClick={handleJoinClick} />
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
    </div>
  );
};

export default App;
