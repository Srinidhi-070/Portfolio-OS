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

  const isLight = theme === 'vercel-light' || theme === 'neo-brutal';

  const THEMES: { id: ThemeMode; name: string; desc: string }[] = [
    { id: 'linear-dark', name: 'Linear Dark', desc: 'Ultra-modern OLED black with minimal zinc borders' },
    { id: 'vercel-light', name: 'Vercel Light', desc: 'Crisp, high-contrast pure white interface' },
    { id: 'dracula', name: 'Dracula Modern', desc: 'Deep purple-slate with high saturation accents' },
    { id: 'neo-brutal', name: 'Neo Brutal', desc: 'Playful high-contrast dark panels on sage green' },
    { id: 'monochrome', name: 'Monochrome', desc: 'Pure grayscale brutalism' }
  ];

  const ACCENTS: { id: AccentColor; name: string; bg: string }[] = [
    { id: 'crimson', name: 'Crimson (Light)', bg: '#dc2626' },
    { id: 'navy', name: 'Navy (Light)', bg: '#1e3a8a' },
    { id: 'forest', name: 'Forest (Light)', bg: '#047857' },
    { id: 'plum', name: 'Plum (Light)', bg: '#701a75' },
    { id: 'cyan', name: 'Cyan (Dark)', bg: '#22d3ee' },
    { id: 'pink', name: 'Pink (Dark)', bg: '#f472b6' },
    { id: 'lime', name: 'Lime (Dark)', bg: '#4ade80' },
    { id: 'amber', name: 'Amber (Dark)', bg: '#fbbf24' }
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
      <div className="glass-card p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 border border-[var(--glass-border)]">
        <img
          src={srinidhiPhoto}
          alt={PERSONAL_INFO.name}
          className="w-20 h-24 rounded-2xl object-cover object-top border-2 border-[var(--accent)] shadow-xl shrink-0"
        />
        <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] text-[10px] font-bold uppercase tracking-wider">
            <User className="w-3 h-3" /> User Account
          </div>
          <h2 className={`text-lg font-bold tracking-tight `}>{PERSONAL_INFO.name}</h2>
          <p className="text-xs font-semibold text-[var(--accent)]">{PERSONAL_INFO.title}</p>
          <div className={`flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs font-mono pt-1 `}>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[var(--accent)]" /> {PERSONAL_INFO.email}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[var(--accent)]" /> {PERSONAL_INFO.location}</span>
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 `}>
          <Palette className="w-4 h-4 text-[var(--accent)]" /> Color Mode & Atmosphere
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className="p-4 text-left rounded-[1.25rem] transition-all duration-200 shadow-sm"
              style={{
                backgroundColor: theme === t.id ? 'var(--surface-hover)' : 'var(--card-bg)',
                border: theme === t.id ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                transform: theme === t.id ? 'translateY(-2px)' : 'none',
                boxShadow: theme === t.id ? '0 4px 12px var(--accent-subtle)' : 'none'
              }}
            >
              <div className="flex items-center justify-between font-bold text-xs">
                <span className={theme === t.id ? 'accent-text' : 'text-[var(--text-primary)]'}>{t.name}</span>
                {theme === t.id && <Check className="w-4 h-4 accent-text font-bold" />}
              </div>
              <p className="text-[11px] mt-1.5 leading-relaxed opacity-80" style={{ color: theme === t.id ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Palette */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 `}>
          <Sparkles className="w-4 h-4 text-[var(--accent)]" /> Accent Color Palette
        </h3>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {ACCENTS.map(acc => (
            <button
              key={acc.id}
              onClick={() => setAccentColor(acc.id)}
              className="p-3 text-center flex flex-col items-center gap-2 transition-all rounded-[1rem] shadow-sm hover:scale-105"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: currentAccent === acc.id ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                boxShadow: currentAccent === acc.id ? '0 0 12px var(--accent-subtle)' : 'none'
              }}
            >
              <div className={`w-8 h-8 rounded-full ${acc.bg} flex items-center justify-center`}>
                {currentAccent === acc.id && <Check className="w-4 h-4 text-white drop-shadow-md font-bold" />}
              </div>
              <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{acc.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Wallpapers */}
      <div className="space-y-3">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 `}>
          <HardDrive className="w-4 h-4 text-[var(--accent)]" /> Desktop Wallpaper
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {WALLPAPERS.map(wp => (
            <button
              key={wp.id}
              onClick={() => setWallpaper(wp)}
              className="p-4 rounded-[1.25rem] text-left flex items-center justify-between transition-all shadow-sm"
              style={{
                backgroundColor: 'var(--surface-2)',
                border: wallpaper.id === wp.id ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                boxShadow: wallpaper.id === wp.id ? '0 0 12px var(--accent-subtle)' : 'none'
              }}
            >
              <div>
                <div className="text-xs font-bold" style={{ color: wallpaper.id === wp.id ? 'var(--accent)' : 'var(--text-primary)' }}>{wp.name}</div>
                <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Gradient Canvas</div>
              </div>
              <div className={`w-6 h-6 rounded-full border shadow-sm ${wp.previewBg}`} style={{ borderColor: 'var(--glass-border)' }} />
            </button>
          ))}
        </div>
      </div>

      {/* System Telemetry & Info */}
      <div className="glass-card p-5 space-y-3 border border-[var(--glass-border)]">
        <div className={`flex items-center gap-2 font-bold text-xs `}>
          <Info className="w-4 h-4 text-[var(--accent)]" /> System Information
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="glass-surface p-3 rounded-xl border border-[var(--glass-border)]">
            <div className={`text-[10px] `}>OS Version</div>
            <div className="font-mono text-[var(--accent)] font-bold mt-0.5">Portfolio OS v2.5</div>
          </div>
          <div className="glass-surface p-3 rounded-xl border border-[var(--glass-border)]">
            <div className={`text-[10px] `}>Framework</div>
            <div className="font-mono text-[var(--accent)] font-bold mt-0.5">React 19 + Vite</div>
          </div>
          <div className="glass-surface p-3 rounded-xl border border-[var(--glass-border)]">
            <div className={`text-[10px] `}>AI Engine</div>
            <div className="font-mono text-[var(--accent)] font-bold mt-0.5">Simulated AI</div>
          </div>
          <div className="glass-surface p-3 rounded-xl border border-[var(--glass-border)]">
            <div className={`text-[10px] `}>Environment</div>
            <div className="font-mono text-[var(--accent)] font-bold mt-0.5">Cloud Run Container</div>
          </div>
        </div>
      </div>
    </div>
  );
};
