import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Bot, Sparkles, Cat } from 'lucide-react';

export const DesktopPet: React.FC = () => {
  const { theme } = useOS();
  const [message, setMessage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  const getPetConfig = () => {
    if (theme === 'neo-brutal') {
      return {
        icon: Cat,
        name: 'Retro Neko',
        messages: [
          'Meow! Try dragging those windows!',
          'This sage green is my favorite.',
          'Paws off my Scratchpad!',
          'Ready to explore the portfolio?',
          'Click the Apple logo for settings!'
        ],
        color: '#e05a3d' // terracotta
      };
    } else if (theme === 'vercel-light' || theme === 'arctic-light') {
      return {
        icon: Sparkles,
        name: 'Lumina',
        messages: [
          'A bright day for coding!',
          'Check out the Experience app.',
          'Productivity is up 20% today!',
          'Need help? Just click around.',
          'Srinidhi is a great AI Engineer!'
        ],
        color: '#1e3a8a' // navy
      };
    } else {
      return {
        icon: Bot,
        name: 'Cyber-Drone',
        messages: [
          'Systems are nominal.',
          'Did you check the GuardianVoice logs?',
          'Compiling... just kidding, it\s Vite.',
          'Dark mode is the only mode.',
          'Warp Terminal is ready.'
        ],
        color: '#22d3ee' // cyan
      };
    }
  };

  const config = getPetConfig();
  const IconComp = config.icon;

  const speak = () => {
    const randomMsg = config.messages[Math.floor(Math.random() * config.messages.length)];
    setMessage(randomMsg);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
    setTimeout(() => setMessage(null), 5000); // Disappear after 5s
  };

  useEffect(() => {
    // Speak every 45 seconds randomly
    const interval = setInterval(() => {
      if (Math.random() > 0.5) speak();
    }, 45000);
    
    // Speak on initial load after 3 seconds
    const timeout = setTimeout(speak, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [theme]); // re-run if theme changes so new messages apply

  return (
    <div className="absolute bottom-6 left-6 z-40 flex flex-col items-start gap-2 pointer-events-none">
      
      {/* Speech Bubble */}
      <div 
        className={`transition-all duration-300 transform origin-bottom-left ${message ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        <div className="glass-card px-4 py-2 text-xs font-medium shadow-xl pointer-events-auto max-w-[200px] border relative" style={{ borderColor: 'var(--glass-border)' }}>
          <span style={{ color: 'var(--text-primary)' }}>{message}</span>
          {/* Bubble Tail */}
          <div className="absolute -bottom-2 left-4 w-4 h-4 glass-card border-b border-r transform rotate-45 z-[-1]" style={{ borderColor: 'var(--glass-border)' }} />
        </div>
      </div>

      {/* Pet Character */}
      <button
        onClick={speak}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`glass-card-interactive p-3 rounded-2xl border pointer-events-auto transition-transform ${isWiggling ? 'scale-110 -rotate-12' : 'hover:scale-110'} ${isHovered ? 'shadow-[0_0_15px_var(--accent-glow)]' : ''}`}
        style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--card-bg)' }}
        title={config.name}
      >
        <IconComp className="w-7 h-7 transition-colors duration-300" style={{ color: isHovered ? 'var(--accent)' : config.color }} />
      </button>

    </div>
  );
};

export default DesktopPet;