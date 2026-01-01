
import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: { name: string; credits: number; avatar: string };
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, user }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hidden sm:block">SkillSwap</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'dashboard' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('discover')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'discover' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              Discover
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'messages' ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500 hover:text-indigo-600'}`}
            >
              Messages
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
              <span className="mr-1">⚡</span> {user.credits} hrs
            </div>
            <button onClick={() => setActiveTab('profile')} className="flex items-center gap-2 group transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600">{user.name}</p>
                <p className="text-xs text-slate-500">View Profile</p>
              </div>
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
