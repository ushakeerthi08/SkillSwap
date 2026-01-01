
import React, { useState } from 'react';
import { UserProfile, SkillLevel } from '../types';

interface ProfileDetailProps {
  user: UserProfile;
  currentUser: UserProfile;
  onBack: () => void;
  onStartSession: (user: UserProfile) => void;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ user, currentUser, onBack, onStartSession }) => {
  const [requestSent, setRequestSent] = useState(false);

  const handleRequestSwap = () => {
    setRequestSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
      >
        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        Back to search
      </button>

      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/20 border border-slate-200 overflow-hidden">
        {/* Header Section */}
        <div className="h-64 bg-slate-950 p-8 flex items-end relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
             <img src={user.portfolio[0]?.imageUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&fit=crop"} className="w-full h-full object-cover blur-sm scale-110" />
             <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950"></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 relative z-10 translate-y-16">
            <div className="relative group">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-40 h-40 rounded-[2.5rem] border-4 border-white shadow-2xl bg-white object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white w-8 h-8 rounded-full shadow-lg"></div>
            </div>
            <div className="text-center sm:text-left sm:pb-4">
              <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start mb-2">
                 <h1 className="text-4xl font-black text-slate-900 sm:text-white drop-shadow-md">{user.name}</h1>
                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === 'Professional' ? 'bg-indigo-600 text-white' : 'bg-emerald-500 text-white'}`}>
                   {user.status}
                 </span>
              </div>
              <p className="text-indigo-600 sm:text-indigo-200 font-bold text-lg">
                {user.major} <span className="mx-2 opacity-50">•</span> {user.university}
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="pt-32 p-8 lg:p-12 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                Professional Bio
              </h2>
              <p className="text-slate-600 leading-relaxed text-xl font-medium">{user.bio}</p>
              
              <div className="flex gap-4 mt-8">
                {user.githubUrl && (
                  <a href={user.githubUrl} target="_blank" className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-slate-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    GitHub
                  </a>
                )}
                {user.linkedInUrl && (
                  <a href={user.linkedInUrl} target="_blank" className="flex items-center gap-2 bg-[#0077b5] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#006396] transition-all shadow-lg shadow-blue-100">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LinkedIn
                  </a>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                Selected Work
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                {user.portfolio.map((item, idx) => (
                  <div key={idx} className="group bg-slate-50 border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:border-indigo-300 transition-all">
                    {item.imageUrl && (
                      <div className="h-56 overflow-hidden relative">
                         <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm mb-6">{item.description}</p>
                      <button className="text-xs font-black text-indigo-600 flex items-center gap-2 hover:translate-x-1 transition-transform">
                        Explore Project
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200 sticky top-28">
               <h3 className="font-black text-slate-800 text-2xl mb-8">Collaborate</h3>
               
               <div className="space-y-4 mb-10">
                  <button 
                    onClick={() => onStartSession(user)}
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl transition-all shadow-2xl shadow-indigo-200 active:scale-95 flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    Video / Voice Call
                  </button>
                  <button 
                    onClick={() => onStartSession(user)}
                    className="w-full py-5 bg-white border-2 border-slate-200 hover:border-indigo-600 text-slate-800 font-black rounded-2xl transition-all flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                    Send Chat Message
                  </button>
               </div>

               <div className="space-y-6 pt-8 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-bold">Community Rating</span>
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-lg border border-amber-100">
                       <span className="font-black text-xs">★ {user.rating}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-bold">Expertise Level</span>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">Top 1% Mentor</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-bold">Swap Status</span>
                    <span className="text-[10px] font-black text-emerald-600 px-2 py-1 bg-emerald-50 rounded-lg ring-1 ring-emerald-100 uppercase tracking-tighter">Available Now</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
