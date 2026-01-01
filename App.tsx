
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
  education: [
    { school: 'Central University', degree: 'B.A.', field: 'Interactive Media & Art', startYear: '2021', endYear: '2025' }
  ],
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
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8 px-6">
             <div className="text-[120px] filter drop-shadow-2xl">🛋️</div>
             <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-800">Communication Lounge</h2>
                <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-lg">Every conversation you start, every skill you swap, and every live session transcript will be organized right here.</p>
             </div>
             <button onClick={() => setActiveTab('discover')} className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-200 active:scale-95 transition-all text-lg">Find a Swapping Partner</button>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-4xl mx-auto bg-white p-16 rounded-[4rem] border border-slate-100 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
              <img src={CURRENT_USER.avatar} className="w-48 h-48 rounded-[3.5rem] border-[6px] border-slate-50 shadow-2xl object-cover" />
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-black text-slate-800 mb-2">{CURRENT_USER.name}</h1>
                <p className="text-indigo-600 font-bold text-2xl mb-6">{CURRENT_USER.major}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                   <span className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black uppercase tracking-[0.2em]">Verified Student</span>
                   <span className="px-5 py-2 bg-amber-50 text-amber-600 rounded-2xl text-xs font-black uppercase tracking-[0.2em]">Top Barterer</span>
                </div>
              </div>
            </div>
            <div className="space-y-12">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2">Personal Statement</label>
                <div className="p-10 bg-slate-50 rounded-[2.5rem] text-slate-700 font-medium leading-relaxed text-xl border border-slate-100">{CURRENT_USER.bio}</div>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                   <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2">I can mentor in</label>
                   <div className="flex flex-wrap gap-3">
                     {CURRENT_USER.offeredSkills.map(s => <span key={s.name} className="px-5 py-2.5 bg-indigo-50 text-indigo-700 rounded-2xl text-sm font-black border border-indigo-100">{s.name}</span>)}
                   </div>
                </div>
                <div>
                   <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 ml-2">I want to learn</label>
                   <div className="flex flex-wrap gap-3">
                     {CURRENT_USER.desiredSkills.map(s => <span key={s} className="px-5 py-2.5 bg-rose-50 text-rose-700 rounded-2xl text-sm font-black border border-rose-100">{s}</span>)}
                   </div>
                </div>
              </div>
              <button className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black hover:bg-indigo-600 transition-all shadow-2xl shadow-slate-200 text-xl">Manage Public Profile</button>
            </div>
          </div>
        );
      default:
        return <Dashboard user={CURRENT_USER} onSelectUser={handleSelectUser} />;
    }
  };

  return (
    <div className="min-h-screen pb-32 bg-slate-50/30">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={CURRENT_USER} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {renderContent()}
      </main>

      {/* Floating Session Overlay */}
      {activeSession && (
        <CommunicationHub 
          partner={activeSession} 
          onClose={() => setActiveSession(null)} 
        />
      )}

      {/* Modern Floating Navigation for All Screen Sizes */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-3xl border border-slate-200 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[3rem] px-10 py-5 flex items-center gap-12 z-50 transition-all hover:scale-105 active:scale-95">
         <button onClick={() => setActiveTab('dashboard')} className={`p-2.5 transition-all group flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-400'}`}>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Home</span>
         </button>
         <button onClick={() => setActiveTab('discover')} className={`p-2.5 transition-all group flex flex-col items-center gap-1 ${activeTab === 'discover' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-400'}`}>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Find</span>
         </button>
         <button onClick={() => setActiveTab('messages')} className={`p-2.5 transition-all group flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-400'}`}>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Chat</span>
         </button>
         <div className="h-8 w-[2px] bg-slate-100 mx-2 hidden sm:block"></div>
         <button onClick={() => setActiveTab('profile')} className={`p-2.5 transition-all group flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-indigo-600' : 'text-slate-400 hover:text-indigo-400'}`}>
            <img src={CURRENT_USER.avatar} className={`w-8 h-8 rounded-full border-2 transition-all ${activeTab === 'profile' ? 'border-indigo-600 scale-110' : 'border-transparent'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">You</span>
         </button>
      </div>
    </div>
  );
};

export default App;
