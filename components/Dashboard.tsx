
import React, { useEffect, useState } from 'react';
import { UserProfile, SkillMatch, ProjectBrief, LearningPathStep } from '../types';
import { getSmartMatches, generateLearningPath } from '../services/geminiService';
import { MOCK_USERS, MOCK_PROJECTS } from '../constants';

interface DashboardProps {
  user: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectUser }) => {
  const [matches, setMatches] = useState<SkillMatch[]>([]);
  const [learningPath, setLearningPath] = useState<LearningPathStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [smartMatches, path] = await Promise.all([
          getSmartMatches(user, MOCK_USERS),
          generateLearningPath(user, MOCK_USERS)
        ]);
        setMatches(smartMatches);
        setLearningPath(path);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const ambassadors = MOCK_USERS.filter(u => u.isAmbassador || u.isFacultyEndorsed);

  return (
    <div className="space-y-16 animate-in fade-in duration-500 pb-32">
      {/* Wallet / Credit Header */}
      <section className="bg-white border-2 border-indigo-50 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-[1.5rem] flex items-center justify-center text-3xl shadow-inner">⚡</div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">Time-Banking Wallet</h2>
            <p className="text-slate-500 font-medium">You have <span className="text-emerald-600 font-bold">{user.credits} Skill Credits</span> available.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Lifetime Earned</p>
             <p className="text-xl font-black text-slate-800">42 hrs</p>
          </div>
          <div className="bg-indigo-600 px-8 py-4 rounded-2xl text-white shadow-xl shadow-indigo-100 font-black cursor-pointer hover:bg-indigo-700 transition-all">
            Find Mentors
          </div>
        </div>
      </section>

      {/* AI Learning Path */}
      <section className="bg-indigo-950 rounded-[3rem] p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="p-3 bg-white/10 rounded-2xl border border-white/20">
               <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </span>
            <h2 className="text-4xl font-black">Your AI Learning Path</h2>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8 opacity-50">
              {[1, 2, 3].map(i => <div key={i} className="h-40 bg-white/5 rounded-3xl border border-white/10 animate-pulse"></div>)}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {learningPath.map((step, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group">
                   <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center font-black mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                      {idx + 1}
                   </div>
                   <h3 className="text-xl font-black mb-3">{step.title}</h3>
                   <p className="text-indigo-200/70 text-sm leading-relaxed mb-6">{step.description}</p>
                   {step.suggestedMentorId && (
                     <button className="text-xs font-black text-indigo-300 flex items-center gap-2 group-hover:underline">
                        Suggested Mentor found →
                     </button>
                   )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Hub (Collaborative Learning) */}
      <section>
        <div className="flex justify-between items-end mb-10 px-4">
          <div>
            <h2 className="text-4xl font-black text-slate-800 mb-3">Project Hub</h2>
            <p className="text-slate-500 font-medium">Swap skills while building something real. Projects are the ultimate proof of work.</p>
          </div>
          <button className="px-6 py-3 border-2 border-slate-200 rounded-2xl font-black text-sm hover:border-indigo-600 transition-all">Create Project</button>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
           {MOCK_PROJECTS.map(project => (
             <div key={project.id} className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 h-64 md:h-auto relative">
                   <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent"></div>
                   <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black text-slate-800 border border-white uppercase tracking-tighter shadow-xl">{project.category}</span>
                   </div>
                </div>
                <div className="p-10 md:w-1/2 flex flex-col">
                   <h3 className="text-2xl font-black text-slate-800 mb-4">{project.title}</h3>
                   <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3">{project.description}</p>
                   <div className="space-y-4 mt-auto">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Needed to join</p>
                      <div className="flex flex-wrap gap-2">
                        {project.neededSkills.map(s => (
                          <span key={s} className="px-3 py-1 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black border border-rose-100">{s}</span>
                        ))}
                      </div>
                      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm mt-4 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">Request to Join</button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Verified Mentors (Cold Start Fix) */}
      <section className="bg-white border border-slate-200 rounded-[3rem] p-12">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="text-4xl font-black text-slate-800 mb-2">Ambassador Network</h2>
              <p className="text-slate-500 font-medium text-lg">Trust matters. These mentors are verified through Faculty or Peer Reviews.</p>
            </div>
            <button className="px-8 py-4 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-100">Browse All Ambassadors</button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {ambassadors.map(mentor => (
              <div key={mentor.id} className="group bg-slate-50 rounded-[3rem] p-10 border border-slate-100 hover:border-indigo-300 hover:bg-white transition-all shadow-sm hover:shadow-xl">
                 <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <img src={mentor.avatar} className="w-20 h-20 rounded-[1.5rem] border-4 border-white shadow-xl object-cover" />
                      {mentor.isFacultyEndorsed && (
                        <div className="absolute -top-3 -right-3 bg-indigo-600 text-white p-2 rounded-xl shadow-xl">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-800">{mentor.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-indigo-500 uppercase tracking-tighter">{mentor.isFacultyEndorsed ? 'Faculty Endorsed' : 'Ambassador'}</span>
                        <span className="text-amber-500 text-xs font-black">★ {mentor.rating}</span>
                      </div>
                    </div>
                 </div>
                 <div className="space-y-4 mb-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Endorsed Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.offeredSkills.map(s => (
                        <div key={s.name} className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
                          <span className="text-[10px] font-black text-slate-600">{s.name}</span>
                          {s.isVerified && <span className="text-emerald-500 font-bold text-xs">✓</span>}
                          {s.endorsements && <span className="text-[9px] text-slate-400 font-bold ml-1">{s.endorsements}</span>}
                        </div>
                      ))}
                    </div>
                 </div>
                 <button onClick={() => onSelectUser(mentor)} className="w-full py-4 bg-white border-2 border-slate-200 rounded-2xl font-black text-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all shadow-sm">Start Swap Session</button>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default Dashboard;
