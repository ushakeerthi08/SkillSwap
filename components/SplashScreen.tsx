
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for fade animation to complete before unmounting
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-teal-600 to-cyan-700 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="relative group animate-in zoom-in-90 duration-700">
        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-white/20 blur-[60px] rounded-full scale-150 animate-pulse"></div>
        
        {/* Central Brand Icon */}
        <div className="relative w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-teal-600 shadow-2xl shadow-black/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
