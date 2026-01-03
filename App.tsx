
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Discover from './components/Discover';
import ProfileDetail from './components/ProfileDetail';
import CommunicationHub from './components/CommunicationHub';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import SelfProfile from './components/SelfProfile';
import { UserProfile, SkillLevel } from './types';
import { MOCK_USERS } from './constants';

const INITIAL_USER: UserProfile = {
  id: 'current_user',
  name: 'Jamie Taylor',
  major: 'Interactive Design',
  university: 'Central Polytech',
  status: 'Student',
  source: 'SkillSwap Native',
  bio: 'Visual storyteller blending digital design with human interaction. Focused on building high-impact community tools.',
  offeredSkills: [
    { name: 'Motion Design', level: SkillLevel.ADVANCED, category: 'Design & Creative', isVerified: true, endorsements: 18 },
    { name: 'Photography', level: SkillLevel.INTERMEDIATE, category: 'Design & Creative', isVerified: true, endorsements: 7 }
  ],
  desiredSkills: ['Creative Coding', 'Data Art'],
  credits: 14,
  rating: 4.9,
  totalSwaps: 8,
  avatar: 'https://i.pravatar.cc/150?u=jamie',
  education: [
    { school: 'Central Polytech', degree: 'B.Des', field: 'Interaction Design', startYear: '2021', endYear: '2025' }
  ],
  portfolio: [
    { 
      title: 'Neon Echoes', 
      description: 'An experimental motion graphic piece exploring urban soundscapes.', 
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop',
      tags: ['Motion', 'After Effects']
    }
  ],
  timeSpentTotal: 42,
  courseBreakdown: [
    { skillName: 'Motion Design', hours: 18, color: 'bg-teal-500' },
    { skillName: 'Photography', hours: 12, color: 'bg-cyan-500' },
    { skillName: 'Creative Coding', hours: 8, color: 'bg-indigo-500' },
    { skillName: 'Data Art', hours: 4, color: 'bg-rose-500' }
  ],
  activityHistory: [
    { id: 'act1', type: 'swap_completed', title: 'Swap with Sarah Chen', timestamp: '2h ago', meta: 'Exchanged Motion Design for UI Critique' },
    { id: 'act2', type: 'credit_earned', title: 'Peer Review Reward', timestamp: '1d ago', meta: '+5 Credits for helpful documentation' },
    { id: 'act3', type: 'project_joined', title: 'Joined EcoTrack', timestamp: '3d ago', meta: 'Assigned as Motion Specialist' }
  ],
  notifications: [
    { id: 'n1', from: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah', message: 'The feedback was amazing, Jamie! Ready for our next session?', time: '10m ago', isRead: false, type: 'message' },
    { id: 'n2', from: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=alex', message: 'Sent a request to join your project.', time: '1h ago', isRead: false, type: 'request' }
  ]
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [activeSession, setActiveSession] = useState<UserProfile | null>(null);
  const [isSplashing, setIsSplashing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSelectUser = (user: UserProfile) => {
    setSelectedProfile(user);
    setActiveTab('profileDetail');
  };

  const startCommunication = (user: UserProfile) => {
    setActiveSession(user);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const renderContent = () => {
    if (activeTab === 'profileDetail' && selectedProfile) {
      return (
        <ProfileDetail 
          user={selectedProfile} 
          currentUser={currentUser} 
          onBack={() => setActiveTab('discover')} 
          onStartSession={startCommunication}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={currentUser} onSelectUser={handleSelectUser} />;
      case 'discover':
        return <Discover onSelectUser={handleSelectUser} />;
      case 'messages':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-8 px-6 animate-in fade-in duration-700">
             <div className="text-[120px] filter drop-shadow-2xl">⚡</div>
             <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-800 tracking-tight">Barter Vault</h2>
                <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-lg font-medium">Your historical swaps, active collaborations, and credit receipts will appear here.</p>
             </div>
             <button onClick={() => setActiveTab('discover')} className="px-10 py-5 bg-teal-600 text-white rounded-[2rem] font-black shadow-2xl shadow-teal-200 active:scale-95 transition-all text-lg hover:bg-teal-700">Find Your Next Swap</button>
          </div>
        );
      case 'profile':
        return (
          <SelfProfile 
            user={currentUser} 
            onUpdateUser={(updated) => setCurrentUser(updated)} 
          />
        );
      default:
        return <Dashboard user={currentUser} onSelectUser={handleSelectUser} />;
    }
  };

  return (
    <div className="min-h-screen pb-40 bg-slate-50/50 overflow-x-hidden">
      {/* Launch Experience */}
      {isSplashing && <SplashScreen onComplete={() => setIsSplashing(false)} />}

      {/* Auth Gate */}
      {!isSplashing && !isAuthenticated && (
        <AuthScreen onLogin={handleLoginSuccess} />
      )}

      {/* Main App Container */}
      <div className={`transition-all duration-1000 ${(!isSplashing && isAuthenticated) ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={currentUser} />
        
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

        {/* Modern Floating Navigation - Teal styling */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-3xl border border-slate-200 shadow-[0_40px_80px_rgba(0,0,0,0.1)] rounded-[3rem] px-10 py-5 flex items-center gap-12 z-50 transition-all hover:scale-[1.02] active:scale-95">
           <button onClick={() => setActiveTab('dashboard')} className={`p-2.5 transition-all group flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-teal-600' : 'text-slate-400 hover:text-teal-500'}`}>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Home</span>
           </button>
           <button onClick={() => setActiveTab('discover')} className={`p-2.5 transition-all group flex flex-col items-center gap-1 ${activeTab === 'discover' ? 'text-teal-600' : 'text-slate-400 hover:text-teal-500'}`}>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Explore</span>
           </button>
           <button onClick={() => setActiveTab('messages')} className={`p-2.5 transition-all group flex flex-col items-center gap-1 ${activeTab === 'messages' ? 'text-teal-600' : 'text-slate-400 hover:text-teal-500'}`}>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Vault</span>
           </button>
           <div className="h-8 w-[2px] bg-slate-100 mx-2 hidden sm:block"></div>
           <button onClick={() => setActiveTab('profile')} className={`p-2.5 transition-all group flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-teal-600' : 'text-slate-400 hover:text-teal-500'}`}>
              <img src={currentUser.avatar} className={`w-8 h-8 rounded-full border-2 transition-all ${activeTab === 'profile' ? 'border-teal-600 scale-110' : 'border-transparent'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Identity</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default App;
