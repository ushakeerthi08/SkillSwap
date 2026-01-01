
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Discover from './components/Discover';
import ProfileDetail from './components/ProfileDetail';
import CommunicationHub from './components/CommunicationHub';
import { UserProfile, SkillLevel } from './types';
import { MOCK_USERS } from './constants';

const CURRENT_USER: UserProfile = {
  id: 'current_user',
  name: 'Jamie Taylor',
  major: 'Interactive Media',
  university: 'Central University',
  status: 'Student',
  source: 'SkillSwap Native',
  bio: 'Creative coder blending art and tech. Building social impact tools.',
  offeredSkills: [
    { name: 'Video Editing', level: SkillLevel.ADVANCED, category: 'Design & Creative' },
    { name: 'Photography', level: SkillLevel.INTERMEDIATE, category: 'Design & Creative' }
  ],
  desiredSkills: ['Machine Learning', 'Data Visualization'],
  credits: 10,
  rating: 4.9,
  totalSwaps: 4,
  avatar: 'https://i.pravatar.cc/150?u=jamie',
  portfolio: []
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [activeSession, setActiveSession] = useState<UserProfile | null>(null);

  const handleSelectUser = (user: UserProfile) => {
    setSelectedProfile(user);
    setActiveTab('profileDetail');
  };

  const startCommunication = (user: UserProfile) => {
    setActiveSession(user);
  };

  const renderContent = () => {
    if (activeTab === 'profileDetail' && selectedProfile) {
      return (
        <ProfileDetail 
          user={selectedProfile} 
          currentUser={CURRENT_USER} 
          onBack={() => setActiveTab('discover')} 
          onStartSession={startCommunication}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={CURRENT_USER} onSelectUser={handleSelectUser} />;
      case 'discover':
        return <Discover onSelectUser={handleSelectUser} />;
      case 'messages':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
             <div className="text-7xl">🛋️</div>
             <h2 className="text-3xl font-black text-slate-800">Your Communication Lounge</h2>
             <p className="text-slate-500 max-w-sm">Active calls, voice sessions, and chat transcripts will live here.</p>
             <button onClick={() => setActiveTab('discover')} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-2xl shadow-indigo-200 active:scale-95 transition-all">Explore Mentors</button>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-3xl mx-auto bg-white p-12 rounded-[3rem] border border-slate-200 shadow-xl">
            <div className="flex items-center gap-8 mb-12">
              <img src={CURRENT_USER.avatar} className="w-32 h-32 rounded-[2rem] border-4 border-slate-50 shadow-xl" />
              <div>
                <h1 className="text-3xl font-black text-slate-800">{CURRENT_USER.name}</h1>
                <p className="text-indigo-600 font-bold text-lg">{CURRENT_USER.major}</p>
                <div className="flex gap-2 mt-3">
                   <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest">Active Member</span>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Bio</label>
                <div className="p-6 bg-slate-50 rounded-2xl text-slate-700 font-medium leading-relaxed">{CURRENT_USER.bio}</div>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Offered</label>
                   <div className="flex flex-wrap gap-2">
                     {CURRENT_USER.offeredSkills.map(s => <span key={s.name} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold">{s.name}</span>)}
                   </div>
                </div>
                <div>
                   <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Desired</label>
                   <div className="flex flex-wrap gap-2">
                     {CURRENT_USER.desiredSkills.map(s => <span key={s} className="px-3 py-1.5 bg-amber-50 text-amber-700 rounded-xl text-xs font-bold">{s}</span>)}
                   </div>
                </div>
              </div>
              <button className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">Update Profile Settings</button>
            </div>
          </div>
        );
      default:
        return <Dashboard user={CURRENT_USER} onSelectUser={handleSelectUser} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-50/50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={CURRENT_USER} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {renderContent()}
      </main>

      {/* Floating Session Overlay */}
      {activeSession && (
        <CommunicationHub 
          partner={activeSession} 
          onClose={() => setActiveSession(null)} 
        />
      )}

      {/* Mobile Nav */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] px-8 py-4 flex items-center gap-10 md:hidden z-50">
         <button onClick={() => setActiveTab('dashboard')} className={`p-2 transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
         </button>
         <button onClick={() => setActiveTab('discover')} className={`p-2 transition-all ${activeTab === 'discover' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
         </button>
         <button onClick={() => setActiveTab('messages')} className={`p-2 transition-all ${activeTab === 'messages' ? 'text-indigo-600 scale-110' : 'text-slate-400'}`}>
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
         </button>
      </div>
    </div>
  );
};

export default App;
