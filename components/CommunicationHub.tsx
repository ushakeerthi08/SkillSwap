
import React, { useState, useEffect, useRef } from 'react';
import { UserProfile } from '../types';

interface CommunicationHubProps {
  partner: UserProfile;
  onClose: () => void;
}

const CommunicationHub: React.FC<CommunicationHubProps> = ({ partner, onClose }) => {
  const [mode, setMode] = useState<'chat' | 'voice' | 'video'>('chat');
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [messages, setMessages] = useState<{sender: string, text: string}[]>([
    { sender: partner.name, text: "Hey! Ready to swap some skills today?" }
  ]);
  const [input, setInput] = useState('');

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleVideo = async () => {
    if (isCameraOff) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: !isMuted });
        streamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setIsCameraOff(false);
      } catch (e) { console.error(e); }
    } else {
      streamRef.current?.getTracks().forEach(track => track.stop());
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
            if (localVideoRef.current) localVideoRef.current.srcObject = streamRef.current;
        };
      } catch (e) { console.error(e); }
    } else {
      setIsSharing(false);
      if (localVideoRef.current) localVideoRef.current.srcObject = streamRef.current;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'You', text: input }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col md:flex-row animate-in fade-in duration-300">
      {/* Sidebar/Main Content (Video/Voice area) */}
      <div className="flex-grow relative bg-black flex flex-col">
        <div className="absolute top-6 left-6 z-10 flex items-center gap-4">
          <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
            <img src={partner.avatar} className="w-8 h-8 rounded-full border border-white/20" />
            <span className="text-white font-bold">{partner.name}</span>
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          </div>
        </div>

        {/* Video Canvas */}
        <div className="flex-grow flex items-center justify-center p-4">
          {mode === 'video' ? (
            <div className="w-full h-full relative max-w-5xl rounded-3xl overflow-hidden bg-slate-800 shadow-2xl">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover grayscale-[0.2]" poster="https://i.pravatar.cc/800?u=partner" />
              <div className="absolute bottom-6 right-6 w-48 h-32 bg-slate-900 rounded-2xl border-2 border-white/20 overflow-hidden shadow-xl">
                 <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                 {isCameraOff && <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-white text-xs">Camera Off</div>}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-full border-4 border-indigo-500 p-1 animate-pulse">
                <img src={partner.avatar} className="w-full h-full rounded-full object-cover" />
              </div>
              <p className="text-white font-bold text-xl">{mode === 'voice' ? 'Voice Session in Progress...' : 'Waiting for connection'}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-slate-900/80 backdrop-blur-xl border-t border-white/5 p-6 flex justify-center items-center gap-4 sm:gap-8">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all ${isMuted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMuted ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" : "M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z M19 10v1a7 7 0 01-7 7m-7-7v1a7 7 0 017 7 m0 0v4m0 0H8m4 0h4"} />
            </svg>
          </button>
          
          <button 
            onClick={() => { setMode(mode === 'video' ? 'voice' : 'video'); toggleVideo(); }}
            className={`p-4 rounded-full transition-all ${mode === 'video' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          </button>

          <button 
            onClick={startScreenShare}
            className={`p-4 rounded-full transition-all ${isSharing ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </button>

          <button onClick={onClose} className="p-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl transition-all shadow-xl shadow-rose-900/20 font-bold px-8">
            End Session
          </button>
        </div>
      </div>

      {/* Chat Sidebar */}
      <div className="w-full md:w-96 bg-white flex flex-col border-l border-slate-200">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Session Chat</h3>
        </div>
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-2 rounded-2xl text-sm max-w-[85%] ${m.sender === 'You' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
                {m.text}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">{m.sender}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="p-6 border-t border-slate-100 bg-slate-50 flex gap-2">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunicationHub;
