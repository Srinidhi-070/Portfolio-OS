import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

// --- CSS Animations ---
// We inject a tiny style block to power the pet animations without needing to alter global css
const petStyles = `
  @keyframes float-pet {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes blink-eyes {
    0%, 96%, 98%, 100% { transform: scaleY(1); }
    97%, 99% { transform: scaleY(0.1); }
  }
  @keyframes ear-twitch {
    0%, 100% { transform: rotate(0deg); }
    10% { transform: rotate(15deg); }
    20% { transform: rotate(-10deg); }
    30% { transform: rotate(5deg); }
    40% { transform: rotate(0deg); }
  }
  @keyframes antenna-pulse {
    0%, 100% { fill: #ef4444; filter: drop-shadow(0 0 2px #ef4444); }
    50% { fill: #fca5a5; filter: drop-shadow(0 0 6px #fca5a5); }
  }
  .pet-float { animation: float-pet 3s ease-in-out infinite; }
  .pet-blink { animation: blink-eyes 4s infinite; }
  .pet-ear-l { animation: ear-twitch 5s infinite; transform-origin: bottom right; }
  .pet-ear-r { animation: ear-twitch 5s infinite 0.2s; transform-origin: bottom left; }
  .pet-antenna { animation: antenna-pulse 2s infinite; }
`;

// --- Character SVGs ---

const CyberBot = ({ color }: { color: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" className="pet-float">
    {/* Antenna */}
    <rect x="23" y="2" width="2" height="8" fill={color} opacity="0.7" />
    <circle cx="24" cy="4" r="3" className="pet-antenna" />
    {/* Body */}
    <rect x="8" y="10" width="32" height="28" rx="8" fill="#1e293b" stroke={color} strokeWidth="2" />
    <rect x="12" y="14" width="24" height="12" rx="4" fill="#0f172a" />
    {/* Eyes */}
    <g className="pet-blink">
      <rect x="16" y="18" width="4" height="4" rx="1" fill={color} />
      <rect x="28" y="18" width="4" height="4" rx="1" fill={color} />
    </g>
    {/* Details */}
    <circle cx="16" cy="32" r="2" fill={color} opacity="0.5" />
    <circle cx="24" cy="32" r="2" fill={color} opacity="0.5" />
    <circle cx="32" cy="32" r="2" fill={color} opacity="0.5" />
  </svg>
);

const LuminaCloud = ({ color }: { color: string }) => (
  <svg width="56" height="48" viewBox="0 0 56 48" className="pet-float">
    {/* Cloud Body */}
    <path 
      d="M 16,36 C 8,36 4,30 6,24 C 8,16 16,14 20,16 C 24,6 36,6 40,14 C 48,14 52,22 50,30 C 48,36 40,36 38,36 Z" 
      fill="#ffffff" 
      stroke={color} 
      strokeWidth="2" 
      style={{ filter: `drop-shadow(0 4px 12px ${color}40)` }}
    />
    {/* Eyes */}
    <g className="pet-blink">
      <circle cx="22" cy="24" r="2.5" fill="#1e293b" />
      <circle cx="34" cy="24" r="2.5" fill="#1e293b" />
    </g>
    {/* Blushes */}
    <circle cx="17" cy="26" r="3" fill="#fca5a5" opacity="0.6" />
    <circle cx="39" cy="26" r="3" fill="#fca5a5" opacity="0.6" />
    {/* Smile */}
    <path d="M 26,26 Q 28,29 30,26" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const RetroNeko = ({ color }: { color: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" className="pet-float">
    {/* Ears */}
    <polygon points="10,20 10,6 22,14" fill={color} className="pet-ear-l" />
    <polygon points="38,20 38,6 26,14" fill={color} className="pet-ear-r" />
    {/* Head */}
    <rect x="8" y="14" width="32" height="26" rx="10" fill="#fef08a" stroke={color} strokeWidth="3" />
    {/* Eyes */}
    <g className="pet-blink">
      <circle cx="18" cy="24" r="3" fill="#1e293b" />
      <circle cx="30" cy="24" r="3" fill="#1e293b" />
    </g>
    {/* Nose & Mouth */}
    <polygon points="23,28 25,28 24,30" fill="#ef4444" />
    <path d="M 20,32 Q 24,34 24,30 Q 24,34 28,32" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    {/* Whiskers */}
    <line x1="4" y1="24" x2="10" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="4" y1="28" x2="10" y2="27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="44" y1="24" x2="38" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="44" y1="28" x2="38" y2="27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DesktopPet: React.FC = () => {
  const { theme } = useOS();
  const [message, setMessage] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);

  const getPetConfig = () => {
    if (theme === 'neo-brutal') {
      return {
        Component: RetroNeko,
        name: 'Retro Neko',
        messages: [
          'Meow! Did you see the LeafMedic project?',
          'The GuardianVoice architecture is purr-fect.',
          'Paws off my Scratchpad!',
          'Double click an app to open it!',
          'Srinidhi used React 19 for this OS. Meow!'
        ],
        color: '#e05a3d' // terracotta
      };
    } else if (theme === 'vercel-light' || theme === 'arctic-light') {
      return {
        Component: LuminaCloud,
        name: 'Lumina',
        messages: [
          'A bright day for coding!',
          'Check out the Experience app to see the Product Operations background.',
          'The WebRTC VLM project is fascinating!',
          'Need help? Just click around the dock.',
          'Srinidhi excels at Python and React!'
        ],
        color: '#1e3a8a' // navy
      };
    } else {
      return {
        Component: CyberBot,
        name: 'Cyber-Drone',
        messages: [
          'Systems are nominal.',
          'GuardianVoice logs verified. AI voice detection active.',
          'Initializing PyTorch models... Check the Skills matrix.',
          'Dark mode is optimal for power efficiency.',
          'Warp Terminal is ready. Try typing `help`.'
        ],
        color: '#22d3ee' // cyan
      };
    }
  };

  const config = getPetConfig();
  const PetBody = config.Component;

  const speak = () => {
    const randomMsg = config.messages[Math.floor(Math.random() * config.messages.length)];
    setMessage(randomMsg);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
    setTimeout(() => setMessage(null), 5000); // Disappear after 5s
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) speak();
    }, 35000); // speak a bit more frequently
    
    const timeout = setTimeout(speak, 2500);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [theme]);

  return (
    <>
      <style>{petStyles}</style>
      <div className="absolute bottom-24 right-6 sm:bottom-6 sm:left-6 sm:right-auto z-40 flex flex-col items-end sm:items-start gap-2 pointer-events-none">
        
        {/* Speech Bubble */}
        <div 
          className={`transition-all duration-300 transform origin-bottom-right sm:origin-bottom-left ${message ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        >
          <div className="glass-card px-4 py-2.5 text-xs font-medium shadow-2xl pointer-events-auto max-w-[220px] relative border" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--surface-1)' }}>
            <span style={{ color: 'var(--text-primary)', lineHeight: '1.4' }}>{message}</span>
            {/* Bubble Tail */}
            <div className="absolute -bottom-2 right-6 sm:right-auto sm:left-6 w-4 h-4 glass-card border-b border-r transform rotate-45 z-[-1]" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--surface-1)' }} />
          </div>
        </div>

        {/* Pet Character Body */}
        <button
          onClick={speak}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`p-2 rounded-2xl pointer-events-auto transition-transform ${isWiggling ? 'scale-110 -rotate-12' : 'hover:scale-110'}`}
          style={{ 
            filter: isHovered ? `drop-shadow(0 0 15px ${config.color}80)` : 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))',
            background: 'transparent',
            border: 'none',
            outline: 'none'
          }}
          title={config.name}
        >
          <PetBody color={config.color} />
        </button>

      </div>
    </>
  );
};

export default DesktopPet;