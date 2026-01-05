
import React, { useState } from 'react';
import { UserProfile, SkillLevel } from '../types';

interface SelfProfileProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

const SelfProfile: React.FC<SelfProfileProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showNotificationsCenter, setShowNotificationsCenter] = useState(false);
  const [activeNotifTab, setActiveNotifTab] = useState<'received' | 'sent' | 'reviews' | 'projects'>('received');
  const [editForm, setEditForm] = useState({
    name: user.name,
    major: user.major,
    bio: user.bio,
    avatar: user.avatar
  });

  const handleSave = () => {
    onUpdateUser({
      ...user,
      ...editForm
    });
    setIsEditing(false);
  };

  const renderNotificationsCenter = () => (
    <div className="fixed inset-0 z-[200] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[4rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Identity Notifications</h2>
            <p className="text-slate-500 font-medium">Manage your barter requests and ecosystem activity.</p>
          </div>
          <button 
            onClick={() => setShowNotificationsCenter(false)}
            className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-3xl transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex border-b border-slate-100 overflow-x-auto px-10 gap-8">
          {[
            { id: 'received', label: 'Swap Requests (Received)' },
            { id: 'sent', label: 'Swap Requests (Sent)' },
            { id: 'reviews', label: 'Reviews Received' },
            { id: 'projects', label: 'Projects Done' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveNotifTab(tab.id as any)}
              className={`py-6 text-xs font-black uppercase tracking-widest border-b-4 transition-all whitespace-nowrap ${activeNotifTab === tab.id ? 'border-teal-600 text-teal-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-grow overflow-y-auto p-10 bg-slate-50/30">
          {activeNotifTab === 'received' && (
            <div className="space-y-6">
              {user.notifications.filter(n => n.type === 'request').map(n => (
                <div key={n.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6">
                  <img src={n.avatar} className="w-16 h-16 rounded-2xl border-2 border-slate-50 object-cover" />
                  <div className="flex-grow text-center md:text-left">
                    <p className="font-black text-slate-800 text-lg">{n.from}</p>
                    <p className="text-slate-500 text-sm italic">"{n.message}"</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-6 py-3 bg-teal-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 transition-all">Accept</button>
                    <button className="px-6 py-3 bg-slate-100 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all">Decline</button>
                  </div>
                </div>
              ))}
              {user.notifications.filter(n => n.type === 'request').length === 0 && (
                <div className="flex flex-col items-center justify-center h-full py-20 text-slate-300">
                  <p className="font-black uppercase tracking-widest text-sm">No pending requests</p>
                </div>
              )}
            </div>
          )}

          {activeNotifTab === 'sent' && (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                  <div>
                    <p className="font-black text-slate-800">Sarah Chen</p>
                    <p className="text-xs text-slate-400 font-bold">Waiting for response...</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-3 py-1.5 rounded-lg">Sent 2h ago</span>
              </div>
            </div>
          )}

          {activeNotifTab === 'reviews' && (
            <div className="space-y-8">
              {user.activityHistory.filter(act => act.type === 'swap_completed').map(act => (
                <div key={act.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-black">★ 5.0</div>
                    <p className="font-black text-slate-800">{act.title}</p>
                  </div>
                  <p className="text-slate-600 italic leading-relaxed text-sm">"Jamie was an absolute pro. Highly recommend for any motion design needs!"</p>
                </div>
              ))}
            </div>
          )}

          {activeNotifTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {user.activityHistory.filter(act => act.type === 'project_joined').map(act => (
                <div key={act.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-teal-500 transition-all">
                  <h4 className="text-xl font-black text-slate-800 mb-2">{act.title}</h4>
                  <p className="text-sm text-slate-500 font-medium mb-6">{act.meta}</p>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-teal-600">
                    <span>Status: Active</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-32 space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {showNotificationsCenter && renderNotificationsCenter()}
      
      {/* Profile Header & Stats Card */}
      <section className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-teal-600 to-teal-400 opacity-90 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          {/* Notifications Button */}
          <button 
            onClick={() => setShowNotificationsCenter(true)}
            className="absolute top-8 right-8 p-5 bg-white/20 backdrop-blur-xl border border-white/30 text-white rounded-3xl hover:bg-white/30 transition-all flex items-center gap-3 active:scale-95 group shadow-2xl"
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white animate-bounce"></div>
            </div>
            <span className="font-black text-sm uppercase tracking-widest">Notifications</span>
          </button>
        </div>
        
        <div className="px-16 pb-16">
          <div className="relative -mt-24 flex flex-col md:flex-row items-end gap-10 mb-12">
            <div className="relative group">
              <img 
                src={user.avatar} 
                className="w-48 h-48 rounded-[3.5rem] border-[8px] border-white shadow-2xl object-cover bg-white" 
              />
              {isEditing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-[3.5rem] cursor-pointer group-hover:bg-black/50 transition-all">
                  <input 
                    type="text" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                  />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Change Pic</span>
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              {isEditing ? (
                <div className="space-y-4 max-w-md">
                  <input 
                    className="text-4xl font-black text-slate-800 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 w-full focus:outline-teal-500"
                    value={editForm.name}
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                  />
                  <input 
                    className="text-xl text-teal-600 font-bold bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-full focus:outline-teal-500"
                    value={editForm.major}
                    onChange={e => setEditForm({...editForm, major: e.target.value})}
                  />
                </div>
              ) : (
                <div className="pb-4">
                  <h1 className="text-5xl font-black text-slate-800 tracking-tight mb-2">{user.name}</h1>
                  <p className="text-teal-600 text-xl font-bold">{user.major}</p>
                </div>
              )}
            </div>
            
            <div className="flex gap-4 mb-4">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-black shadow-xl shadow-teal-100 active:scale-95 transition-all">Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="px-8 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black active:scale-95 transition-all">Cancel</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="px-10 py-4 border-2 border-slate-200 text-slate-600 rounded-2xl font-black hover:border-teal-500 hover:text-teal-600 transition-all active:scale-95 flex items-center gap-3">
                  Edit Identity
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Swaps</p>
              <p className="text-4xl font-black text-slate-800">{user.totalSwaps}</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Projects</p>
              <p className="text-4xl font-black text-slate-800">{(user.activityHistory?.filter(a => a.type === 'project_joined').length || 0)}</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Learning Time</p>
              <p className="text-4xl font-black text-slate-800">{user.timeSpentTotal}h</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Credits</p>
              <p className="text-4xl font-black text-teal-600">{user.credits}⚡</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          {/* Bio Section */}
          <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl">
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-4">
              <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
              The Vision
            </h3>
            {isEditing ? (
              <textarea 
                className="w-full p-8 bg-slate-50 border border-slate-200 rounded-[2rem] text-slate-700 font-medium text-lg min-h-[160px] focus:outline-teal-500"
                value={editForm.bio}
                onChange={e => setEditForm({...editForm, bio: e.target.value})}
              />
            ) : (
              <p className="text-2xl font-medium text-slate-600 leading-relaxed italic">"{user.bio}"</p>
            )}
          </section>

          {/* Education Details Section */}
          <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl">
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-4">
              <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
              Academic Journey
            </h3>
            <div className="space-y-10">
              {user.education.map((edu, idx) => (
                <div key={idx} className="relative pl-10">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-100"></div>
                  <div className="absolute left-[-5px] top-2 w-[12px] h-[12px] rounded-full bg-teal-500 shadow-lg shadow-teal-500/20"></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                    <h4 className="text-xl font-black text-slate-800">{edu.school}</h4>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">{edu.startYear} - {edu.endYear}</span>
                  </div>
                  <p className="text-teal-600 font-bold mb-3">{edu.degree} in {edu.field}</p>
                  {edu.description && (
                    <p className="text-slate-500 text-sm leading-relaxed italic bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Time Analytics */}
          <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl">
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-4">
              <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
              Course Time Breakdown
            </h3>
            <div className="space-y-8">
              {user.courseBreakdown.map(course => (
                <div key={course.skillName} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="font-black text-slate-700">{course.skillName}</span>
                    <span className="text-sm font-bold text-slate-400">{course.hours} hours</span>
                  </div>
                  <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${course.color}`} 
                      style={{ width: `${(course.hours / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Activity Timeline */}
          <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl">
            <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-4">
              <span className="w-2 h-8 bg-teal-500 rounded-full"></span>
              Recent Activity
            </h3>
            <div className="space-y-12 relative">
              <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-slate-100"></div>
              {user.activityHistory.map((act) => (
                <div key={act.id} className="flex gap-8 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${act.type === 'swap_completed' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-white'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <div className="pt-1 flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-black text-slate-800 text-lg">{act.title}</p>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{act.timestamp}</span>
                    </div>
                    <p className="text-slate-500 font-medium text-sm">{act.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Portfolio / Ledger */}
        <div className="lg:col-span-4 space-y-12">
          <section className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl">
             <div className="flex items-center gap-4 mb-8">
               <h3 className="text-xl font-black text-slate-800">Social Connections</h3>
             </div>
             <div className="space-y-4">
               {['LinkedIn', 'GitHub', 'Instagram'].map(platform => (
                 <div key={platform} className="flex justify-between text-sm py-2 border-b border-slate-50">
                   <span className="font-bold text-slate-400">{platform}</span>
                   <span className="text-teal-600 font-black cursor-pointer hover:underline">Connect</span>
                 </div>
               ))}
             </div>
          </section>

          <section className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-xl">
             <h3 className="text-xl font-black mb-8">Barter Vault</h3>
             <p className="text-sm text-slate-400 leading-relaxed mb-8">Securely tracking your exchanged value across the ecosystem.</p>
             <button className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
               View Full Ledger
             </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SelfProfile;
