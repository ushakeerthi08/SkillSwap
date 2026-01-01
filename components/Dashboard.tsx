
import React, { useEffect, useState } from 'react';
import { UserProfile, SkillMatch } from '../types';
import { getSmartMatches } from '../services/geminiService';
import { MOCK_USERS } from '../constants';

interface DashboardProps {
  user: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectUser }) => {
  const [matches, setMatches] = useState<SkillMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      const smartMatches = await getSmartMatches(user, MOCK_USERS);
      setMatches(smartMatches);
      setIsLoading(false);
    };
    fetchMatches();
  }, [user]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero / Stats */}
      <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-indigo-100 text-lg mb-6 max-w-md">
              You have {user.credits} learning hours available in your barter wallet. Ready to swap a skill?
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
                <p className="text-xs text-indigo-200 uppercase tracking-wider font-semibold mb-1">Total Swaps</p>
                <p className="text-2xl font-bold">{user.totalSwaps}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
                <p className="text-xs text-indigo-200 uppercase tracking-wider font-semibold mb-1">Reputation</p>
                <p className="text-2xl font-bold">{user.rating} ★</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
             <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>
                <img 
                  src="https://picsum.photos/seed/learn/400/400" 
                  alt="Learning illustration" 
                  className="relative rounded-2xl w-64 h-64 object-cover border-4 border-white/10 shadow-2xl"
                />
             </div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-1/2 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"></div>
      </section>

      {/* Recommended Matches */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Smart Matches for You</h2>
            <p className="text-slate-500">AI-powered recommendations based on your profile</p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-20 bg-slate-50 rounded-xl mb-4"></div>
                <div className="h-10 bg-slate-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, idx) => (
              <div 
                key={match.user.id} 
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3">
                    <img src={match.user.avatar} className="w-12 h-12 rounded-full border border-slate-100" />
                    <div>
                      <h3 className="font-bold text-slate-800">{match.user.name}</h3>
                      <p className="text-xs text-slate-500">{match.user.university}</p>
                    </div>
                  </div>
                  <div className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight">
                    {match.matchScore}% Match
                  </div>
                </div>

                <div className="mb-4 flex-grow">
                  <p className="text-sm text-slate-600 line-clamp-2 italic mb-3">"{match.matchReason}"</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {match.user.offeredSkills.map(s => (
                      <span key={s.name} className="bg-indigo-50 text-indigo-600 text-[10px] px-2 py-0.5 rounded-full font-medium">
                        Teaches: {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => onSelectUser(match.user)}
                  className="w-full py-2.5 bg-slate-50 hover:bg-indigo-600 hover:text-white text-indigo-600 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 group"
                >
                  View Profile
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Active Exchanges */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {[
              { type: 'complete', user: 'Maria K.', skill: 'Python Data Visualization', date: '2 days ago' },
              { type: 'pending', user: 'Ethan J.', skill: 'UI Prototyping', date: '5 hours ago' }
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'complete' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                   {activity.type === 'complete' ? '✓' : '•'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {activity.type === 'complete' ? 'Successfully swapped' : 'New request from'} <span className="text-indigo-600">{activity.user}</span>
                  </p>
                  <p className="text-xs text-slate-500">{activity.skill} • {activity.date}</p>
                </div>
                <button className="text-xs font-semibold text-slate-400 hover:text-indigo-600">Details</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 shadow-sm flex flex-col justify-center text-center">
            <h3 className="font-bold text-indigo-900 mb-2">Boost Your Profile</h3>
            <p className="text-sm text-indigo-700 mb-4">Complete 3 more swaps to reach "Expert" status and unlock premium mentorship tags.</p>
            <div className="w-full bg-indigo-200 h-2 rounded-full mb-4">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <button className="text-indigo-600 font-bold text-sm hover:underline">Complete My Goals</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
