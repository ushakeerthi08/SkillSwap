
import React, { useState, useMemo } from 'react';
import { UserProfile, Group } from '../types';
import { AVAILABLE_SKILLS, MOCK_USERS, MOCK_GROUPS } from '../constants';

interface DiscoverProps {
  onSelectUser: (user: UserProfile) => void;
}

const Discover: React.FC<DiscoverProps> = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [view, setView] = useState<'people' | 'groups'>('people');

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           u.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           u.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSkill = !selectedSkill || 
                          u.offeredSkills.some(s => s.name === selectedSkill) ||
                          u.desiredSkills.includes(selectedSkill);
      return matchesSearch && matchesSkill;
    });
  }, [searchTerm, selectedSkill]);

  return (
    <div className="space-y-8 pb-12">
      {/* Social Media Style Recommendations Bar */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-hidden">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Social Discoveries</h3>
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar scroll-smooth px-2">
           {MOCK_USERS.map(user => (
             <button 
                key={`suggested-${user.id}`}
                onClick={() => onSelectUser(user)}
                className="flex flex-col items-center gap-2 group min-w-[80px]"
             >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 via-rose-500 to-indigo-600 rounded-full p-[2px] animate-pulse">
                    <div className="bg-white rounded-full p-1">
                      <img src={user.avatar} className="w-16 h-16 rounded-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                     <span className="text-[10px]">{user.source === 'Instagram' ? '📸' : user.source === 'GitHub' ? '💻' : user.source === 'LinkedIn' ? '💼' : '🤝'}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 truncate w-20 text-center">{user.name.split(' ')[0]}</span>
             </button>
           ))}
        </div>
      </section>

      {/* Header & Tabs */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
           <div>
             <h1 className="text-3xl font-black text-slate-800 mb-2 font-display">Expand Your Network</h1>
             <p className="text-slate-500">Connect with peers across social platforms & interest groups.</p>
           </div>
           <div className="flex bg-slate-100 p-1 rounded-2xl">
              <button 
                onClick={() => setView('people')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'people' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Peer Matches
              </button>
              <button 
                onClick={() => setView('groups')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'groups' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Circles & Groups
              </button>
           </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder={`Search by name, skill, or source (Instagram, GitHub)...`} 
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all bg-slate-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {AVAILABLE_SKILLS.slice(0, 6).map(skill => (
              <button 
                key={skill}
                onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${selectedSkill === skill ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50/30'}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === 'people' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <div 
              key={user.id} 
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 hover:border-indigo-300 hover:shadow-2xl transition-all cursor-pointer group flex flex-col"
              onClick={() => onSelectUser(user)}
            >
              <div className="h-32 bg-gradient-to-br from-indigo-50 to-white relative">
                 <div className="absolute top-4 left-4">
                    <span className={`bg-white/95 backdrop-blur shadow-sm px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-2 border border-slate-100 ${user.source === 'Instagram' ? 'text-rose-500' : user.source === 'GitHub' ? 'text-slate-900' : 'text-indigo-600'}`}>
                      {user.source === 'Instagram' && <span>📸</span>}
                      {user.source === 'GitHub' && <span>💻</span>}
                      {user.source === 'LinkedIn' && <span>💼</span>}
                      {user.source === 'Discord' && <span>💬</span>}
                      {user.source.toUpperCase()}
                    </span>
                 </div>
                 <img 
                   src={user.avatar} 
                   alt={user.name} 
                   className="absolute bottom-0 left-8 translate-y-1/2 w-20 h-20 rounded-3xl border-4 border-white shadow-2xl bg-white object-cover group-hover:scale-105 transition-transform"
                 />
              </div>
              <div className="pt-12 p-8 flex-grow">
                <h3 className="text-xl font-black text-slate-800 mb-1">{user.name}</h3>
                <p className="text-xs text-indigo-600 font-bold mb-4">{user.major}</p>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6">{user.bio}</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Core Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {user.offeredSkills.map(s => (
                        <span key={s.name} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-bold border border-indigo-100">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center group-hover:bg-indigo-50/20">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-100 text-amber-600 p-1.5 rounded-lg">
                    <span className="text-xs font-black">★ {user.rating}</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {MOCK_GROUPS.map(group => (
             <div key={group.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 hover:shadow-2xl transition-all group flex flex-col">
                <div className="h-56 relative overflow-hidden">
                   <img src={group.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
                   <div className="absolute bottom-6 left-8 flex flex-wrap gap-2">
                        {group.tags.map(tag => (
                          <span key={tag} className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-tighter">#{tag}</span>
                        ))}
                   </div>
                </div>
                <div className="p-8 flex-grow">
                   <h3 className="text-2xl font-black text-slate-800 mb-3">{group.name}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8">{group.description}</p>
                   <div className="flex items-center justify-between">
                      <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i+20}`} className="w-10 h-10 rounded-full border-4 border-white" />)}
                      </div>
                      <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-xl">{group.memberCount.toLocaleString()} Peers</span>
                   </div>
                </div>
                <div className="px-8 pb-8">
                   <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                     Join Circle
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};

export default Discover;
