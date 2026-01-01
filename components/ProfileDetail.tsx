
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

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24 animate-in slide-in-from-bottom-6 duration-500">
      {/* Action Header */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 font-black transition-all group"
        >
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-200 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="text-sm">Back to Discovery</span>
        </button>
        
        <div className="flex items-center gap-3">
           <span className="text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:block">Shared Interest: {user.offeredSkills[0].category}</span>
           <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
           <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Banner with Parallax-ish feel */}
        <div className="h-80 bg-slate-900 relative overflow-hidden group">
          <img 
            src={user.portfolio[0]?.imageUrl || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&fit=crop"} 
            className="w-full h-full object-cover blur-sm opacity-60 scale-105 group-hover:scale-100 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-center md:items-end gap-10">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-48 h-48 rounded-[3rem] border-[6px] border-white shadow-2xl bg-white object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-[6px] border-white w-12 h-12 rounded-full shadow-xl"></div>
            </div>
            <div className="text-center md:text-left md:pb-6 flex-grow">
              <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start mb-4">
                 <h1 className="text-5xl font-black text-white drop-shadow-xl">{user.name}</h1>
                 <span className={`px-4 py-1.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl ${user.status === 'Professional' ? 'bg-indigo-600 text-white' : 'bg-emerald-500 text-white'}`}>
                   {user.status}
                 </span>
              </div>
              <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start text-indigo-100/90 font-bold text-xl">
                <span>{user.major}</span>
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                <span>{user.university}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profiles Details Grid */}
        <div className="p-12 lg:p-16 grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-24">
            
            {/* Bio */}
            <section>
              <h2 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-4">
                <span className="w-2.5 h-10 bg-indigo-600 rounded-full"></span>
                Story & Passion
              </h2>
              <p className="text-slate-600 leading-relaxed text-2xl font-medium italic">"{user.bio}"</p>
              
              <div className="flex flex-wrap gap-5 mt-10">
                {user.githubUrl && (
                  <a href={user.githubUrl} target="_blank" className="flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl font-black hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-100">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    Source Code
                  </a>
                )}
                {user.instagramUrl && (
                  <a href={user.instagramUrl} target="_blank" className="flex items-center gap-3 bg-gradient-to-tr from-yellow-400 via-rose-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black hover:opacity-90 transition-all shadow-2xl">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    Moments
                  </a>
                )}
              </div>
            </section>

            {/* Selected Work (Portfolio) */}
            <section>
              <h2 className="text-3xl font-black text-slate-800 mb-10 flex items-center gap-4">
                <span className="w-2.5 h-10 bg-indigo-600 rounded-full"></span>
                Selected Projects
              </h2>
              <div className="grid sm:grid-cols-2 gap-10">
                {user.portfolio.map((item, idx) => (
                  <div key={idx} className="group bg-slate-50 border border-slate-200 rounded-[3rem] overflow-hidden hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:border-indigo-300 transition-all duration-500 flex flex-col">
                    <div className="h-64 overflow-hidden relative">
                       <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent"></div>
                       <div className="absolute bottom-6 left-8 flex items-center gap-2">
                         <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl text-white">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                         </div>
                       </div>
                    </div>
                    <div className="p-10 flex-grow">
                      <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-base mb-8">{item.description}</p>
                      <button className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-800 font-black rounded-2xl hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center gap-3">
                        View Project
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education History */}
            <section>
              <h2 className="text-3xl font-black text-slate-800 mb-10 flex items-center gap-4">
                <span className="w-2.5 h-10 bg-indigo-600 rounded-full"></span>
                Education Path
              </h2>
              <div className="space-y-6">
                {user.education.map((edu, idx) => (
                  <div key={idx} className="flex gap-8 items-start relative pb-12 last:pb-0">
                    {idx !== user.education.length - 1 && <div className="absolute left-6 top-16 bottom-0 w-[2px] bg-slate-100"></div>}
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 z-10">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                    </div>
                    <div className="flex-grow pt-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                        <h4 className="text-xl font-black text-slate-800">{edu.school}</h4>
                        <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold uppercase tracking-widest">{edu.startYear} — {edu.endYear}</span>
                      </div>
                      <p className="text-lg text-indigo-600 font-bold">{edu.degree} in {edu.field}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-10">
            <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-200 sticky top-32">
               <h3 className="font-black text-slate-800 text-3xl mb-10 leading-tight">Collaborate with {user.name.split(' ')[0]}</h3>
               
               <div className="space-y-5">
                  <button 
                    onClick={() => onStartSession(user)}
                    className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl transition-all shadow-2xl shadow-indigo-100 active:scale-95 flex items-center justify-center gap-4 text-lg"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    Live Session
                  </button>
                  <button 
                    onClick={() => onStartSession(user)}
                    className="w-full py-6 bg-white border-[3px] border-slate-200 hover:border-indigo-600 text-slate-800 font-black rounded-3xl transition-all flex items-center justify-center gap-4 text-lg group"
                  >
                    <svg className="w-7 h-7 text-indigo-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                    Direct Message
                  </button>
               </div>

               <div className="mt-12 space-y-8 pt-10 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-black uppercase tracking-widest">Reputation</span>
                    <div className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-2xl border border-amber-100">
                       <span className="font-black text-sm">★ {user.rating} / 5.0</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 font-black uppercase tracking-widest">Global Rank</span>
                    <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-2xl">Elite Mentor</span>
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
