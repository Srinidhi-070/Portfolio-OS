import React from 'react';
import { useOS } from '../../context/OSContext';
import { WALLPAPERS, PERSONAL_INFO } from '../../data/portfolioData';
import { AccentColor, ThemeMode } from '../../types';
import srinidhiPhoto from '../../assets/srinidhi_headshot.jpg';
import {
  Sliders,
  Palette,
  Volume2,
  VolumeX,
  HardDrive,
  Cpu,
  Shield,
  RotateCcw,
  Check,
  Sparkles,
  Info,
  User,
  Activity,
  Mail,
  MapPin,
  FileText
} from 'lucide-react';

export const SettingsApp: React.FC = () => {
  const {
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    wallpaper,
    setWallpaper,
    soundEnabled,
    setSoundEnabled,
    addNotification,
    accentColor: currentAccent
  } = useOS();

  const isLight = theme === 'arctic-light';

  const THEMES: { id: ThemeMode; name: string; desc: string }[] = [
    { id: 'obsidian', name: 'Obsidian Dark', desc: 'Sleek OLED deep black with high contrast text' },
    { id: 'midnight-violet', name: 'Midnight Violet', desc: 'Subtle indigo violet dark workspace' },
    { id: 'cyber-blue', name: 'Cyber Blue', desc: 'Neon cyan tech theme' },
    { id: 'emerald-glass', name: 'Emerald Glass', desc: 'Warm dark theme with emerald green accents' },
    { id: 'arctic-light', name: 'Arctic Light', desc: 'High legibility frosted glass light mode' }
  ];

  const ACCENTS: { id: AccentColor; name: string; bg: string }[] = [
    { id: 'emerald', name: 'Emerald', bg: 'bg-emerald-500' },
    { id: 'violet', name: 'Violet', bg: 'bg-violet-500' },
    { id: 'cyan', name: 'Cyan', bg: 'bg-cyan-500' },
    { id: 'amber', name: 'Amber', bg: 'bg-amber-500' },
    { id: 'rose', name: 'Rose', bg: 'bg-rose-500' },
    { id: 'indigo', name: 'Indigo', bg: 'bg-indigo-500' }
  ];

  return (
    <div className={`p-6 max-w-4xl mx-auto space-y-8 select-none `}>
      {/* Header */}
      <div className={`pb-4 border-b `}>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2  border`}>
          <Sliders className="w-3.5 h-3.5" /> OS System Configuration
        </div>
        <h1 className={`text-2xl font-extrabold `}>Settings & Customization</h1>
        <p className={`text-xs mt-1 `}>Personalize themes, accent colors, audio feedback, and system settings.</p>
      </div>

      {/* Developer Profile & Photo Section */}
      <div className="glass-card p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <img
          src={srinidhiPhoto}
          alt={PERSONAL_INFO.name}
          className="w-20 h-24 rounded-2xl object-cover object-top border-2 border-emerald-500/80 shadow-xl shrink-0"
        />
        <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
            <User className="w-3 h-3" /> User Account
          </div>
          <h2 className={`text-lg font-bold tracking-tight `}>{PERSONAL_INFO.name}</h2>
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{PERSONAL_INFO.title}</p>
          <div className={`flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs font-mono pt-1 `}>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> {PERSONAL_INFO.email}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-rose-600 dark:text-rose-400" /> {PERSONAL_INFO.location}</span>
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 `}>
          <Palette className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Color Mode & Atmosphere
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`glass-card-interactive p-4 text-left ${
                theme === t.id
                  ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]'
                  : ''
              }`}
            >
              <div className="flex items-center justify-between font-bold text-xs">
                <span className={theme === t.id ? 'accent-text' : (isLight ? 'text-slate-800' : 'text-slate-200')}>{t.name}</span>
                {theme === t.id && <Check className="w-4 h-4 accent-text font-bold" />}
              </div>
              <p className={`text-[11px] mt-1 leading-relaxed `}>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 `}>
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Accent Color Palette
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {ACCENTS.map(acc => (
            <button
              key={acc.id}
              onClick={() => setAccentColor(acc.id)}
              className={`glass-card p-3 text-center flex flex-col items-center gap-2 transition-all hover:scale-105 ${
                currentAccent === acc.id ? 'accent-glow border-[var(--accent)] ring-1 ring-[var(--accent)]' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${acc.bg} flex items-center justify-center`}>
                {currentAccent === acc.id && <Check className="w-4 h-4 text-white drop-shadow-md font-bold" />}
              </div>
              <span className={`text-xs font-medium `}>{acc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Wallpapers */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 `}>
          <HardDrive className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Desktop Wallpaper
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {WALLPAPERS.map(wp => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp)}
              className={`glass-surface p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                wallpaper.id === wp.id
                  ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]'
                  : 'border-[var(--glass-border)] hover:border-[var(--accent-subtle)]'
              }`}
            >
              <div>
                <div className={`text-xs font-bold ${wallpaper.id === wp.id ? 'accent-text' : (isLight ? 'text-slate-800' : 'text-slate-200')}`}>{wp.name}</div>
                <div className={`text-[10px] `}>Gradient Canvas</div>
              </div>
              <div className={`w-6 h-6 rounded-full border shadow-sm ${wp.previewBg}`} />
            </button>
          ))}
        </div>
      </div>

      {/* System Telemetry & Info */}
      <div className="glass-card p-5 space-y-3">
        <div className={`flex items-center gap-2 font-bold text-xs `}>
          <Info className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> System Information
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="glass-surface p-3 rounded-xl border border-[var(--glass-border)]">
            <div className={`text-[10px] `}>OS Version</div>
            <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">Portfolio OS v2.5</div>
          </div>
          <div className="glass-surface p-3 rounded-xl border border-[var(--glass-border)]">
            <div className={`text-[10px] `}>Framework</div>
            <div className="font-mono text-cyan-600 dark:text-cyan-400 font-bold mt-0.5">React 19 + Vite</div>
          </div>
          <div className="glass-surface p-3 rounded-xl border border-[var(--glass-border)]">
            <div className={`text-[10px] `}>AI Engine</div>
            <div className="font-mono text-amber-600 dark:text-amber-400 font-bold mt-0.5">Simulated AI</div>
          </div>
          <div className="glass-surface p-3 rounded-xl border border-[var(--glass-border)]">
            <div className={`text-[10px] `}>Environment</div>
            <div className="font-mono text-purple-600 dark:text-purple-400 font-bold mt-0.5">Cloud Run Container</div>
          </div>
        </div>
      </div>
    </div>
  );
};
