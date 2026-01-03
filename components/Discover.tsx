
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
  const [requestingId, setRequestingId] = useState<string | null>(null);

  const handleRequestSwap = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    setRequestingId(userId);
    setTimeout(() => setRequestingId(null), 2000);
  };

  const filteredUsers = useMemo(() => {
    return MOCK_USERS.filter(u => {
      const term = searchTerm.toLowerCase();
      const matchesSearch = u.name.toLowerCase().includes(term) || 
                           u.bio.toLowerCase().includes(term) ||
                           u.source.toLowerCase().includes(term) ||
                           u.offeredSkills.some(s => s.name.toLowerCase().includes(term)) ||
                           u.major.toLowerCase().includes(term);
                           
      const matchesSkill = !selectedSkill || 
                          u.offeredSkills.some(s => s.name === selectedSkill) ||
                          u.desiredSkills.includes(selectedSkill);
      return matchesSearch && matchesSkill;
    });
  }, [searchTerm, selectedSkill]);

  return (
    <div className="space-y-8 pb-12">
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
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'people' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Peer Matches
              </button>
              <button 
                onClick={() => setView('groups')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'groups' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
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
              placeholder={`Search by name, skill, or platform (GitHub, LinkedIn, Instagram)...`} 
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all bg-slate-50/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
            {['Photography', 'Content Creation', 'Java', 'Web Designing', 'App Developer', 'Designer'].map(skill => (
              <button 
                key={skill}
                onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${selectedSkill === skill ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-100' : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50/30'}`}
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
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 hover:border-teal-300 hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full"
              onClick={() => onSelectUser(user)}
            >
              <div className="h-32 bg-gradient-to-br from-teal-50 to-white relative">
                 <div className="absolute top-4 left-4">
                    <span className={`bg-white/95 backdrop-blur shadow-sm px-3 py-1.5 rounded-xl text-[10px] font-black flex items-center gap-2 border border-slate-100 ${user.source === 'Instagram' ? 'text-rose-500' : user.source === 'GitHub' ? 'text-slate-900' : 'text-teal-600'}`}>
                      {user.source.toUpperCase()}
                    </span>
                 </div>
                 <img 
                   src={user.avatar} 
                   alt={user.name} 
                   className="absolute bottom-0 left-8 translate-y-1/2 w-20 h-20 rounded-3xl border-4 border-white shadow-2xl bg-white object-cover group-hover:scale-105 transition-transform"
                 />
                 <div className="absolute bottom-[-10px] right-6 bg-teal-50 text-teal-700 px-3 py-1 rounded-xl text-[10px] font-black shadow-sm border border-teal-100">
                   {Math.floor(Math.random() * 20) + 80}% AI Match
                 </div>
              </div>
              <div className="pt-12 p-8 flex-grow">
                <div className="flex justify-between items-start mb-1">
                   <h3 className="text-xl font-black text-slate-800">{user.name}</h3>
                   <div className="text-amber-500 font-black text-xs">★ {user.rating}</div>
                </div>
                <p className="text-xs text-teal-600 font-bold mb-4">{user.major}</p>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-6">{user.bio}</p>
                
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Core Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {user.offeredSkills.slice(0, 3).map(s => (
                      <span key={s.name} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-[10px] font-bold border border-teal-100">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                 <button 
                   onClick={(e) => handleRequestSwap(e, user.id)}
                   className={`w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${requestingId === user.id ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-100 text-slate-700 hover:bg-teal-600 hover:text-white hover:border-teal-600 active:scale-95'}`}
                 >
                   {requestingId === user.id ? 'Request Sent! ⚡' : 'Request Swap'}
                 </button>
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
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
                </div>
                <div className="p-8 flex-grow">
                   <h3 className="text-2xl font-black text-slate-800 mb-3">{group.name}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8">{group.description}</p>
                </div>
                <div className="px-8 pb-8">
                   <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-teal-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
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
