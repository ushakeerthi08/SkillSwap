
import React, { useState } from 'react';

interface AuthScreenProps {
  onLogin: () => void;
}

type AuthView = 'selection' | 'register' | 'permissions';

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [view, setView] = useState<AuthView>('selection');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [permissions, setPermissions] = useState({
    camera: false,
    audio: false
  });

  const handleCreateAccountStart = () => {
    setView('register');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate registration processing and "opening next page"
    setTimeout(() => {
      setIsProcessing(false);
      setView('permissions');
    }, 1000);
  };

  const requestPermission = async (type: 'camera' | 'audio') => {
    try {
      const constraints = type === 'camera' ? { video: true } : { audio: true };
      await navigator.mediaDevices.getUserMedia(constraints);
      setPermissions(prev => ({ ...prev, [type]: true }));
    } catch (err) {
      console.error(`Permission denied for ${type}:`, err);
      // Mocking success for the demo flow even if physical hardware isn't toggled
      setPermissions(prev => ({ ...prev, [type]: true }));
    }
  };

  const finalizeAuth = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onLogin();
    }, 1000);
  };

  const renderSelection = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-20 h-20 bg-teal-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-teal-100 mx-auto mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </div>
      <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Join the Ecosystem</h1>
      <p className="text-slate-500 font-medium mb-12 leading-relaxed">
        Exchange your expertise for new skills. No money, just pure collaborative growth.
      </p>

      <div className="space-y-4">
        <button 
          onClick={handleCreateAccountStart}
          className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-teal-100 flex items-center justify-center gap-3 active:scale-95"
        >
          Create Account
        </button>

        <button 
          onClick={finalizeAuth}
          className="w-full py-5 bg-white border-2 border-slate-100 hover:border-teal-200 text-slate-700 font-black rounded-[2rem] transition-all flex items-center justify-center gap-4 active:scale-95"
        >
          <svg className="w-6 h-6" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
          </svg>
          Log in with Google
        </button>
      </div>

      <div className="mt-12 flex items-center justify-center gap-2">
        <span className="text-sm text-slate-400 font-medium">Already have an account?</span>
        <button onClick={finalizeAuth} className="text-sm font-black text-teal-600 hover:underline">Log in</button>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-left mb-8">
        <button onClick={() => setView('selection')} className="text-teal-600 font-bold flex items-center gap-2 mb-4 hover:opacity-70">
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
           Back
        </button>
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Fill in your details to start swapping.</p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="space-y-5">
        <div className="text-left">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Username</label>
          <input 
            required
            type="text" 
            placeholder="e.g. creative_mind"
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
            value={formData.username}
            onChange={e => setFormData({...formData, username: e.target.value})}
          />
        </div>
        <div className="text-left">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
          <input 
            required
            type="email" 
            placeholder="student@university.edu"
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="text-left">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
          <input 
            required
            type="password" 
            placeholder="Minimum 8 characters"
            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all font-medium"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <button 
          disabled={isProcessing}
          type="submit"
          className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-teal-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 mt-4"
        >
          {isProcessing ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : "Continue"}
        </button>
      </form>
    </div>
  );

  const renderPermissions = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center">
      {/* Centered Modal-like Box */}
      <div className="w-full p-8 bg-teal-50 rounded-[3rem] border border-teal-100 mb-8 shadow-inner">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
          </svg>
        </div>
        
        <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">Collaborative Learning</h2>
        <p className="text-slate-600 font-medium text-sm leading-relaxed mb-8">
          To provide the best peer-to-peer experience, SkillSwap needs access to your hardware for live sessions.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-teal-100 group transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${permissions.camera ? 'text-teal-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <span className="font-bold text-slate-700 text-sm">Allow Camera</span>
            </div>
            <button 
              onClick={() => requestPermission('camera')}
              disabled={permissions.camera}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${permissions.camera ? 'bg-emerald-50 text-emerald-600 cursor-default' : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95'}`}
            >
              {permissions.camera ? 'Enabled' : 'Grant'}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-teal-100 group transition-all">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${permissions.audio ? 'text-teal-600' : 'text-slate-400'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
              </div>
              <span className="font-bold text-slate-700 text-sm">Allow Audio</span>
            </div>
            <button 
              onClick={() => requestPermission('audio')}
              disabled={permissions.audio}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${permissions.audio ? 'bg-emerald-50 text-emerald-600 cursor-default' : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95'}`}
            >
              {permissions.audio ? 'Enabled' : 'Grant'}
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={finalizeAuth}
        disabled={isProcessing}
        className="w-full py-5 bg-slate-900 hover:bg-black text-white font-black rounded-[2rem] transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95"
      >
        {isProcessing ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : "Enter SkillSwap"}
      </button>
      
      <button onClick={finalizeAuth} className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-teal-600 transition-colors">
        Skip for now
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[150] bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-400/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-400/10 blur-[100px] rounded-full"></div>

      <div className="max-w-md w-full bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-slate-100 p-12 text-center relative z-10 transition-all duration-500">
        {view === 'selection' && renderSelection()}
        {view === 'register' && renderRegister()}
        {view === 'permissions' && renderPermissions()}
      </div>

      {/* Floating Trust Badge */}
      {view === 'selection' && (
        <div className="absolute bottom-10 flex items-center gap-3 bg-white/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-sm animate-bounce">
           <span className="text-emerald-500 font-bold">✓</span>
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">2.4k Students Online</span>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
