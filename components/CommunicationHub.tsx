
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';

interface CommunicationHubProps {
  partner: UserProfile;
  onClose: () => void;
}

const CommunicationHub: React.FC<CommunicationHubProps> = ({ partner, onClose }) => {
  const [mode, setMode] = useState<'chat' | 'voice' | 'video'>('chat');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([
    { sender: partner.name, text: "Hey! Ready to swap some skills today?" }
  ]);
  const [input, setInput] = useState('');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync mute state with active stream tracks
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
    }
  }, [isMuted]);

  const toggleVideo = async () => {
    if (isCameraOff) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        streamRef.current = stream;
        
        // Apply current mute state to new stream
        stream.getAudioTracks().forEach(track => track.enabled = !isMuted);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setIsCameraOff(false);
      } catch (e) { 
        console.error("Error accessing media devices:", e); 
      }
    } else {
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraOff(true);
    }
  };

  const startScreenShare = async () => {
    if (!isSharing) {
      try {
        const screenStream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
        setIsSharing(true);
        screenStream.getVideoTracks()[0].onended = () => {
            setIsSharing(false);
            if (localVideoRef.current && streamRef.current) {
              localVideoRef.current.srcObject = streamRef.current;
            }
        };
      } catch (e) { console.error(e); }
    } else {
      setIsSharing(false);
      if (localVideoRef.current && streamRef.current) {
        localVideoRef.current.srcObject = streamRef.current;
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'You', text: input }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
      {/* Sidebar/Main Content (Video/Voice area) */}
      <div className="flex-grow relative bg-black flex flex-col overflow-hidden">
        <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
          <button 
            onClick={onClose} 
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl backdrop-blur-xl border border-white/10 transition-all active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2.5 rounded-[1.5rem] border border-white/10 shadow-2xl">
            <img src={partner.avatar} className="w-10 h-10 rounded-full border-2 border-white/20" />
            <div className="flex flex-col">
              <span className="text-white font-black text-sm leading-tight">{partner.name}</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                In Session
              </span>
            </div>
          </div>
        </div>

        {/* Video Canvas */}
        <div className="flex-grow flex items-center justify-center p-8 bg-gradient-to-b from-slate-900 to-black">
          {mode === 'video' ? (
            <div className="w-full h-full relative max-w-6xl rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl border border-white/5">
              <video 
                ref={remoteVideoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover opacity-80" 
                poster={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&fit=crop`}
              />
              {/* User PIP */}
              <div className="absolute bottom-8 right-8 w-64 h-44 bg-slate-950 rounded-[2rem] border-4 border-white/10 overflow-hidden shadow-2xl group transition-all hover:scale-105">
                 <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                 {isCameraOff && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white gap-2">
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                       <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                       </svg>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Camera Off</span>
                   </div>
                 )}
                 <div className="absolute top-3 left-3 flex gap-1">
                   {isMuted && <div className="bg-rose-500 p-1.5 rounded-lg text-white shadow-lg"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg></div>}
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full animate-pulse"></div>
                <div className="w-48 h-48 rounded-[3.5rem] border-[6px] border-indigo-500 p-2 animate-pulse relative z-10">
                  <img src={partner.avatar} className="w-full h-full rounded-[2.5rem] object-cover" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-white font-black text-3xl tracking-tight">
                  {mode === 'voice' ? 'Voice Session' : 'Ready to Start'}
                </p>
                <p className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-xs">Waiting for audio sync...</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="bg-slate-900/40 backdrop-blur-3xl border-t border-white/5 p-8 flex justify-center items-center gap-6 sm:gap-10 relative z-30">
          {/* Mute Button */}
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-5 rounded-3xl transition-all shadow-2xl flex items-center justify-center ${
                isMuted 
                ? 'bg-rose-600 text-white shadow-rose-900/40 ring-4 ring-rose-600/20' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMuted ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                )}
              </svg>
            </button>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{isMuted ? 'Unmute' : 'Mute'}</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={() => { setMode(mode === 'video' ? 'voice' : 'video'); toggleVideo(); }}
              className={`p-5 rounded-3xl transition-all shadow-2xl flex items-center justify-center ${
                mode === 'video' 
                ? 'bg-indigo-600 text-white shadow-indigo-900/40 ring-4 ring-indigo-600/20' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{mode === 'video' ? 'Cam Off' : 'Cam On'}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button 
              onClick={startScreenShare}
              className={`p-5 rounded-3xl transition-all shadow-2xl flex items-center justify-center ${
                isSharing 
                ? 'bg-emerald-600 text-white shadow-emerald-900/40 ring-4 ring-emerald-600/20' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </button>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Share</span>
          </div>

          <button 
            onClick={onClose} 
            className="ml-4 p-5 bg-rose-600 hover:bg-rose-700 text-white rounded-[1.5rem] transition-all shadow-2xl shadow-rose-950/40 font-black px-10 text-sm uppercase tracking-widest active:scale-95"
          >
            Leave
          </button>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-full md:w-[400px] bg-white flex flex-col border-l border-slate-200 shadow-2xl">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-slate-800 text-xl tracking-tight">Live Chat</h3>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg border border-indigo-100">Syncing...</span>
        </div>
        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`px-5 py-3 rounded-[1.5rem] text-sm max-w-[90%] leading-relaxed ${
                m.sender === 'You' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100' 
                : 'bg-slate-100 text-slate-700 rounded-tl-none'
              }`}>
                {m.text}
              </div>
              <span className="text-[9px] text-slate-400 mt-2 font-black uppercase tracking-widest">{m.sender}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-3">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium"
          />
          <button type="submit" className="p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-90">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunicationHub;
