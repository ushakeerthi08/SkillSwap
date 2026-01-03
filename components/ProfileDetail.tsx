
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
          className="flex items-center gap-4 text-slate-400 hover:text-teal-600 font-black transition-all group"
        >
          <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100 group-hover:bg-teal-50 group-hover:border-teal-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="text-sm uppercase tracking-widest">Explore More Peers</span>
        </button>
        
        <div className="flex items-center gap-4">
           {user.isFacultyEndorsed && (
             <div className="flex items-center gap-2 bg-teal-50 text-teal-700 px-5 py-2 rounded-2xl border border-teal-100">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
               <span className="text-xs font-black uppercase tracking-tighter">Verified Skills</span>
             </div>
           )}
        </div>
      </div>

      <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-50 overflow-hidden">
        {/* Banner */}
        <div className="h-96 bg-slate-900 relative overflow-hidden group">
          <img 
            src={user.portfolio?.[0]?.imageUrl || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&fit=crop"} 
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
            </div>
            <div className="text-center md:text-left md:pb-8 flex-grow">
              <div className="flex flex-wrap items-center gap-5 justify-center md:justify-start mb-6">
                 <h1 className="text-6xl font-black text-white drop-shadow-2xl">{user.name}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-8 justify-center md:justify-start text-teal-100/80 font-bold text-2xl">
                <span>{user.major}</span>
                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
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
                <span className="w-3 h-12 bg-teal-600 rounded-full"></span>
                The Vision
              </h2>
              <p className="text-slate-600 leading-relaxed text-3xl font-medium italic opacity-90">"{user.bio}"</p>
              
              <div className="flex flex-wrap gap-6 mt-12">
                {user.githubUrl && (
                  <a href={user.githubUrl} target="_blank" className="flex items-center gap-4 bg-slate-950 text-white px-10 py-5 rounded-3xl font-black hover:bg-teal-600 transition-all shadow-2xl hover:-translate-y-1">
                    GitHub
                  </a>
                )}
                {user.linkedInUrl && (
                  <a href={user.linkedInUrl} target="_blank" className="flex items-center gap-4 bg-[#0077b5] text-white px-10 py-5 rounded-3xl font-black hover:bg-teal-600 transition-all shadow-2xl hover:-translate-y-1">
                    LinkedIn
                  </a>
                )}
                {user.instagramUrl && (
                  <a href={user.instagramUrl} target="_blank" className="flex items-center gap-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white px-10 py-5 rounded-3xl font-black hover:bg-teal-600 transition-all shadow-2xl hover:-translate-y-1">
                    Instagram
                  </a>
                )}
              </div>
            </section>

            {/* Education History */}
            <section>
              <h2 className="text-4xl font-black text-slate-800 mb-12 flex items-center gap-5">
                <span className="w-3 h-12 bg-teal-600 rounded-full"></span>
                Education
              </h2>
              <div className="space-y-10">
                {user.education?.map((edu, idx) => (
                  <div key={idx} className="flex gap-10 items-start pb-8 border-b border-slate-50 last:border-0">
                    <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-3xl flex items-center justify-center shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-800">{edu.school}</h4>
                      <p className="text-teal-600 font-bold">{edu.degree} in {edu.field}</p>
                      <p className="text-slate-400 text-sm font-bold mt-1">{edu.startYear} - {edu.endYear}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Portfolio */}
            {user.portfolio?.length > 0 && (
              <section>
                <h2 className="text-4xl font-black text-slate-800 mb-12 flex items-center gap-5">
                  <span className="w-3 h-12 bg-teal-600 rounded-full"></span>
                  Proof of Work
                </h2>
                <div className="grid sm:grid-cols-2 gap-12">
                  {user.portfolio.map((item, idx) => (
                    <div key={idx} className="group bg-white border border-slate-100 rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col">
                      <div className="h-64 overflow-hidden relative">
                         <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                         <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
                           {item.tags?.map(tag => (
                             <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase border border-white/20">#{tag}</span>
                           ))}
                         </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-black text-slate-800 mb-3">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="bg-slate-900 rounded-[4rem] p-12 sticky top-32 text-white shadow-2xl overflow-hidden">
               <h3 className="font-black text-white text-3xl mb-12 leading-tight">Start swapping with {user.name.split(' ')[0]}</h3>
               <div className="space-y-6">
                  <button 
                    onClick={() => onStartSession(user)}
                    className="w-full py-6 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-[2.5rem] transition-all active:scale-95 flex items-center justify-center gap-5 text-lg"
                  >
                    Start Call
                  </button>
                  <button 
                    onClick={() => onStartSession(user)}
                    className="w-full py-6 bg-white/5 border-2 border-white/10 text-white font-black rounded-[2.5rem] transition-all flex items-center justify-center gap-5 text-lg"
                  >
                    Message
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
