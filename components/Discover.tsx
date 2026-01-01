
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
                           u.bio.toLowerCase().includes(searchTerm.toLowerCase());
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
             <h1 className="text-3xl font-bold text-slate-800 mb-2 font-display">Discover Connections</h1>
             <p className="text-slate-500">Find mentors from LinkedIn, GitHub, and collaborative groups.</p>
           </div>
           <div className="flex bg-slate-100 p-1 rounded-2xl">
              <button 
                onClick={() => setView('people')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'people' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                People
              </button>
              <button 
                onClick={() => setView('groups')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${view === 'groups' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Interest Groups
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
              placeholder={`Search ${view}...`} 
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
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-300 hover:shadow-2xl transition-all cursor-pointer group flex flex-col"
              onClick={() => onSelectUser(user)}
            >
              <div className="h-28 bg-gradient-to-br from-indigo-50 via-slate-50 to-violet-50 relative">
                 <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur shadow-sm px-2 py-1 rounded-lg text-[10px] font-bold text-slate-600 flex items-center gap-1.5 border border-slate-100">
                      {user.source === 'LinkedIn' && <span className="text-blue-600">in</span>}
                      {user.source === 'GitHub' && <span className="text-black">git</span>}
                      {user.source === 'Discord' && <span className="text-indigo-400">dc</span>}
                      {user.source}
                    </span>
                 </div>
                 <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${user.status === 'Professional' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-100 shadow-sm'}`}>
                      {user.status}
                    </span>
                 </div>
                 <img 
                   src={user.avatar} 
                   alt={user.name} 
                   className="absolute bottom-0 left-6 translate-y-1/2 w-16 h-16 rounded-2xl border-4 border-white shadow-xl bg-white object-cover"
                 />
              </div>
              <div className="pt-10 p-6 flex-grow">
                <h3 className="text-lg font-bold text-slate-800 mb-0.5">{user.name}</h3>
                <p className="text-[10px] text-indigo-500 font-bold mb-3 uppercase tracking-wider">{user.major}</p>
                <p className="text-sm text-slate-600 line-clamp-2 mb-6 h-10 leading-relaxed">{user.bio}</p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                       <span className="w-4 h-[1px] bg-slate-200"></span> Offers
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {user.offeredSkills.map(s => (
                        <span key={s.name} className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold border border-emerald-100">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center group-hover:bg-indigo-50/30 transition-colors">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 text-sm">★</span>
                  <span className="text-xs font-bold text-slate-700">{user.rating}</span>
                </div>
                <div className="flex gap-2">
                   {user.linkedInUrl && <div className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></div>}
                   {user.githubUrl && <div className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400"><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {MOCK_GROUPS.map(group => (
             <div key={group.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col">
                <div className="h-48 relative overflow-hidden">
                   <img src={group.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                   <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <div className="flex flex-wrap gap-2">
                        {group.tags.map(tag => (
                          <span key={tag} className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/20">#{tag}</span>
                        ))}
                      </div>
                   </div>
                </div>
                <div className="p-8 flex-grow">
                   <h3 className="text-xl font-bold text-slate-800 mb-3">{group.name}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed mb-6">{group.description}</p>
                   <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" />)}
                      </div>
                      <span className="text-xs font-bold text-slate-400">+{group.memberCount} members</span>
                   </div>
                </div>
                <div className="px-8 pb-8">
                   <button className="w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-colors shadow-xl shadow-slate-200">
                     Join Group
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="py-24 text-center">
           <div className="text-5xl mb-4">🛸</div>
           <h3 className="text-xl font-bold text-slate-800">No matches found</h3>
           <p className="text-slate-500 max-w-sm mx-auto">Try adjusting your skill filters or broadening your search terms.</p>
        </div>
      )}
    </div>
  );
};

export default Discover;
