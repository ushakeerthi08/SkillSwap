
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { name: string; credits: number; avatar: string };
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, user }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-2">
      <div className="max-w-7xl mx-auto flex justify-between h-16 items-center">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 group-hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hidden sm:block font-display">SkillSwap</span>
        </div>

        <div className="hidden md:flex items-center bg-slate-50 px-2 py-1.5 rounded-2xl border border-slate-100">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 bg-white shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-indigo-600'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('discover')}
            className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all ${activeTab === 'discover' ? 'text-indigo-600 bg-white shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-indigo-600'}`}
          >
            Discover
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`px-6 py-2.5 text-sm font-black rounded-xl transition-all ${activeTab === 'messages' ? 'text-indigo-600 bg-white shadow-sm ring-1 ring-slate-100' : 'text-slate-400 hover:text-indigo-600'}`}
          >
            Messages
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-2xl text-xs font-black border border-emerald-100 shadow-sm animate-in slide-in-from-right duration-500">
            <span className="mr-2 text-lg">⚡</span> {user.credits} Skill Credits
          </div>
          <button onClick={() => setActiveTab('profile')} className="flex items-center gap-3 group transition-all p-1 hover:bg-slate-50 rounded-2xl">
            <div className="text-right hidden sm:block px-2">
              <p className="text-sm font-black text-slate-800 group-hover:text-indigo-600 leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Top Node</p>
            </div>
            <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-2xl border-4 border-white shadow-xl group-hover:scale-105 transition-transform object-cover" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
