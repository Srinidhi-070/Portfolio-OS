import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import srinidhiPhoto from '../../assets/srinidhi_headshot.jpg';
import { InteractiveBackground } from './InteractiveBackground';
import { Lock, Unlock, ArrowRight, ShieldCheck, User } from 'lucide-react';

export const LockScreen: React.FC = () => {
  const { setLocked, accentColor, theme } = useOS();
  const accent = getAccentClasses(accentColor);
  const isLight = theme === 'arctic-light';

  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLocked(false);
  };

  return (
    <div className="fixed inset-0 z-[90] flex flex-col items-center justify-between p-8 select-none"
         style={{ backgroundColor: 'var(--surface-0)', color: 'var(--text-primary)' }}>
      {/* Interactive Background Canvas */}
      <div className="absolute inset-0 z-0">
        <InteractiveBackground />
      </div>

      {/* Top: Clock & Date */}
      <div className="relative z-10 flex flex-col items-center mt-12 animate-fade-in slide-in-from-top-4 duration-300">
        <div className="text-6xl md:text-7xl font-light tracking-tight drop-shadow-lg" style={{ color: 'var(--text-primary)' }}>
          {timeStr}
        </div>
        <div className="text-sm md:text-base font-medium mt-2" style={{ color: 'var(--text-secondary)' }}>
          {dateStr}
        </div>
      </div>

      {/* Center: Profile & Unlock Form */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm mb-16 animate-scale-in duration-200 glass-panel-heavy rounded-2xl p-8 border"
           style={{ borderColor: 'var(--glass-border)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <div className="relative mb-4">
          <div className="photo-frame relative w-24 h-24 rounded-full" style={{ borderRadius: '9999px' }}>
            <img
              src={srinidhiPhoto}
              alt={PERSONAL_INFO.name}
              className="rounded-full object-cover object-top w-full h-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 p-1.5 rounded-full border"
               style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--glass-border)', color: 'var(--accent)' }}>
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{PERSONAL_INFO.name}</h2>
        <p className="text-xs mb-6" style={{ color: 'var(--text-tertiary)' }}>{PERSONAL_INFO.title}</p>

        <form onSubmit={handleUnlock} className="w-full flex flex-col gap-3">
          <div className="relative w-full">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Press Enter to Unlock"
              className="w-full py-2.5 px-4 pr-10 rounded-xl glass-input text-xs focus:outline-none transition-colors"
              style={{ color: 'var(--text-primary)' }}
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--accent)', color: 'white' }}
            >
              <ArrowRight className="w-3.5 h-3.5 font-bold" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleUnlock()}
            className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors border glass-card-interactive"
            style={{ color: 'var(--text-primary)' }}
          >
            <Unlock className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            Unlock Portfolio OS
          </button>
        </form>
      </div>

      {/* Bottom: System Footer */}
      <div className="relative z-10 text-xs flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
        <Lock className="w-3.5 h-3.5" />
        Portfolio OS Protected Workspace • Click anywhere or press Enter
      </div>
    </div>
  );
};
