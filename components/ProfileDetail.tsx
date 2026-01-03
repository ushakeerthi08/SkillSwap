
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
    <div className="max-w-6xl mx-auto space-y-12 pb-32 animate-in slide-in-from-bottom-8 duration-700">
      {/* Action Header */}
      <div className="flex justify-between items-center px-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-4 text-slate-400 hover:text-indigo-600 font-black transition-all group"
        >
          <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="text-sm uppercase tracking-widest">Explore More Peers</span>
        </button>
        
        <div className="flex items-center gap-4">
           {user.isFacultyEndorsed && (
             <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-2 rounded-2xl border border-indigo-100">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
               <span className="text-xs font-black uppercase tracking-tighter">Faculty Endorsed</span>
             </div>
           )}
           <button className="p-4 bg-white border border-slate-100 rounded-3xl text-slate-300 hover:text-rose-500 transition-all hover:scale-110 active:scale-95 shadow-sm">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
           </button>
        </div>
      </div>

      <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-50 overflow-hidden">
        {/* Banner with Parallax-ish feel */}
        <div className="h-96 bg-slate-900 relative overflow-hidden group">
          <img 
            src={user.portfolio[0]?.imageUrl || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&fit=crop"} 
            className="w-full h-full object-cover blur-sm opacity-50 scale-105 group-hover:scale-100 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-16 left-16 right-16 flex flex-col md:flex-row items-center md:items-end gap-12">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-56 h-56 rounded-[4rem] border-[8px] border-white shadow-2xl bg-white object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 border-[8px] border-white w-14 h-14 rounded-full shadow-2xl"></div>
            </div>
            <div className="text-center md:text-left md:pb-8 flex-grow">
              <div className="flex flex-wrap items-center gap-5 justify-center md:justify-start mb-6">
                 <h1 className="text-6xl font-black text-white drop-shadow-2xl">{user.name}</h1>
                 {user.isAmbassador && (
                   <span className="px-5 py-2 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl border border-white/20">
                     Ambassador
                   </span>
                 )}
              </div>
              <div className="flex flex-wrap items-center gap-8 justify-center md:justify-start text-indigo-100/80 font-bold text-2xl">
                <span>{user.major}</span>
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <span className="opacity-80 uppercase tracking-widest text-lg">{user.university}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profiles Details Grid */}
        <div className="p-16 lg:p-24 grid lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8 space-y-32">
            
            {/* Story */}
            <section>
              <h2 className="text-4xl font-black text-slate-800 mb-10 flex items-center gap-5">
                <span className="w-3 h-12 bg-indigo-600 rounded-full"></span>
                The Vision
              </h2>
              <p className="text-slate-600 leading-relaxed text-3xl font-medium italic opacity-90">"{user.bio}"</p>
              
              <div className="flex flex-wrap gap-6 mt-12">
                {user.githubUrl && (
                  <a href={user.githubUrl} target="_blank" className="flex items-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-3xl font-black hover:bg-indigo-600 transition-all shadow-2xl hover:-translate-y-1">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    GitHub Portfolio
                  </a>
                )}
                {user.linkedInUrl && (
                  <a href={user.linkedInUrl} target="_blank" className="flex items-center gap-4 bg-[#0077b5] text-white px-10 py-5 rounded-3xl font-black hover:bg-indigo-600 transition-all shadow-2xl hover:-translate-y-1">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    Professional Profile
                  </a>
                )}
              </div>
            </section>

            {/* Quality Control & Skill Verification */}
            <section className="bg-indigo-50/50 rounded-[3rem] p-12 border border-indigo-100">
               <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-4">
                  <span className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
                  </span>
                  Skill Quality Verification
               </h3>
               <div className="space-y-6">
                 {user.offeredSkills.map(skill => (
                   <div key={skill.name} className="bg-white p-6 rounded-[1.5rem] border border-indigo-100 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <div>
                          <p className="font-black text-slate-800">{skill.name}</p>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{skill.level} Proficiency</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase bg-emerald-50 px-4 py-2 rounded-xl">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        Portfolio Verified
                      </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* Selected Work (Portfolio) */}
            <section>
              <h2 className="text-4xl font-black text-slate-800 mb-12 flex items-center gap-5">
                <span className="w-3 h-12 bg-indigo-600 rounded-full"></span>
                Proof of Work
              </h2>
              <div className="grid sm:grid-cols-2 gap-12">
                {user.portfolio.map((item, idx) => (
                  <div key={idx} className="group bg-white border border-slate-100 rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.08)] hover:border-indigo-200 transition-all duration-700 flex flex-col">
                    <div className="h-72 overflow-hidden relative">
                       <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                       <div className="absolute bottom-8 left-10 flex flex-wrap gap-2">
                         {item.tags?.map(tag => (
                           <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black text-white border border-white/20 uppercase">#{tag}</span>
                         ))}
                       </div>
                    </div>
                    <div className="p-12 flex-grow">
                      <h3 className="text-3xl font-black text-slate-800 mb-5 group-hover:text-indigo-600 transition-colors leading-tight">{item.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-lg mb-10 opacity-80">{item.description}</p>
                      <button className="w-full py-5 bg-slate-50 border-2 border-slate-100 text-slate-900 font-black rounded-3xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest">
                        Project Details
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education History */}
            <section>
              <h2 className="text-4xl font-black text-slate-800 mb-12 flex items-center gap-5">
                <span className="w-3 h-12 bg-indigo-600 rounded-full"></span>
                Academic Foundation
              </h2>
              <div className="space-y-10">
                {user.education.map((edu, idx) => (
                  <div key={idx} className="flex gap-10 items-start relative pb-16 last:pb-0">
                    {idx !== user.education.length - 1 && <div className="absolute left-7 top-20 bottom-0 w-[2px] bg-slate-100"></div>}
                    <div className="w-14 h-14 bg-indigo-100 text-indigo-700 rounded-3xl flex items-center justify-center shrink-0 border border-indigo-200 z-10 shadow-lg shadow-indigo-100">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                    </div>
                    <div className="flex-grow pt-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-3">
                        <h4 className="text-3xl font-black text-slate-800 leading-tight">{edu.school}</h4>
                        <span className="px-5 py-2 bg-slate-50 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest border border-slate-100 shrink-0">{edu.startYear} — {edu.endYear}</span>
                      </div>
                      <p className="text-xl text-indigo-600 font-black">{edu.degree} <span className="text-slate-400 font-medium px-2">in</span> {edu.field}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="bg-slate-900 rounded-[4rem] p-12 sticky top-32 text-white shadow-2xl shadow-indigo-200 overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full"></div>
               <h3 className="font-black text-white text-3xl mb-12 leading-tight relative z-10">Start your swap with {user.name.split(' ')[0]}</h3>
               
               <div className="space-y-6 relative z-10">
                  <button 
                    onClick={() => onStartSession(user)}
                    className="w-full py-7 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-[2.5rem] transition-all shadow-2xl shadow-indigo-900 active:scale-95 flex items-center justify-center gap-5 text-xl"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    Start Live Call
                  </button>
                  <button 
                    onClick={() => onStartSession(user)}
                    className="w-full py-7 bg-white/5 border-[3px] border-white/10 hover:bg-white/10 text-white font-black rounded-[2.5rem] transition-all flex items-center justify-center gap-5 text-xl group"
                  >
                    <svg className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                    Send Message
                  </button>
               </div>

               <div className="mt-16 space-y-10 pt-12 border-t border-white/10 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Ambassador Rank</span>
                    <div className="flex items-center gap-3 bg-white/5 text-amber-400 px-5 py-2.5 rounded-2xl border border-white/10">
                       <span className="font-black text-sm">★ {user.rating} Verified</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Network reach</span>
                    <span className="text-sm font-black text-indigo-400 bg-indigo-400/10 px-5 py-2.5 rounded-2xl border border-indigo-400/20">Elite Node</span>
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
