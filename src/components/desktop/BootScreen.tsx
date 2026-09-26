import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { Logo } from '../Logo';
import { getAccentClasses } from '../../lib/theme';
import { ShieldCheck, Cpu, Terminal, ArrowRight } from 'lucide-react';

export const BootScreen: React.FC = () => {
  const { finishBoot, accentColor, theme } = useOS();
  const accent = getAccentClasses(accentColor);
  const isLight = theme === 'vercel-light' || theme === 'neo-brutal';

  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const BOOT_LOGS = [
    "BIOS 4.0.12 - Initializing Hardware Abstraction Layer...",
    "Mounting VFS /dev/port-os...",
    "Loading PyTorch & CUDA 12.2 Kernel Extensions...",
    "Initializing Neural Speech Processing (GuardianVoice)...",
    "Starting Vision Language Stream Engine (WebRTC VLM)...",
    "Initializing Portfolio Assistant Engine...",
    "System Authorization Granted. Launching Desktop UI..."
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      const pct = Math.min(100, Math.round((currentStep / BOOT_LOGS.length) * 100));
      setProgress(pct);

      if (currentStep <= BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentStep - 1]]);
      }

      if (currentStep >= BOOT_LOGS.length + 1) {
        clearInterval(interval);
        setTimeout(finishBoot, 300);
      }
    }, 240);

    return () => clearInterval(interval);
  }, [finishBoot]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 select-none bg-[#18181b] text-white" style={{ fontFamily: 'var(--font-mono)' }}>
      {/* Background Matrix/Grid lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--text-tertiary) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        {/* OS Logo */}
        <div className="mb-6 animate-glow-pulse" style={{ filter: 'drop-shadow(0 0 16px var(--accent-glow))' }}>
          <Logo size={64} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2" style={{ color: '#ffffff' }}>
          Portfolio OS <span className="text-xs px-2 py-0.5 rounded border" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)', borderColor: 'var(--accent-subtle)' }}>v2.5</span>
        </h1>
        <p className="text-xs mt-1" style={{ color: '#a1a1aa' }}>AI & Data Science Graduate — Portfolio OS</p>

        {/* Progress Bar */}
        <div className="w-full border h-2.5 rounded-full overflow-hidden my-6 p-0.5 bg-white/5"
             style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{ width: `${progress}%`, backgroundColor: 'var(--accent)', boxShadow: '0 0 12px var(--accent-glow)' }}
          />
        </div>

        {/* Boot Terminal Log Output */}
        <div className="w-full h-32 border rounded-xl p-3 text-left overflow-y-auto os-scrollbar text-[11px] space-y-1 mb-6 shadow-inner bg-black/40 backdrop-blur-md"
             style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#a1a1aa', fontFamily: 'var(--font-mono)' }}>
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="font-bold" style={{ color: 'var(--accent)' }}>[OK]</span>
              <span style={{ color: '#a1a1aa' }}>{log}</span>
            </div>
          ))}
        </div>

        {/* Quick Skip Button */}
        <button
          onClick={finishBoot}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-colors border glass-card-interactive"
          style={{ color: '#ffffff' }}
        >
          Skip Boot Sequence <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
