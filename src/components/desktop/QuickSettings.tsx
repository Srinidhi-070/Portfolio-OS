import React from 'react';
import { useOS } from '../../context/OSContext';
import { WALLPAPERS } from '../../data/portfolioData';
import { AccentColor, ThemeMode } from '../../types';
import {
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Sparkles,
  Lock,
  X,
  Palette,
  Check,
  Sun,
  Moon
} from 'lucide-react';

export const QuickSettings: React.FC = () => {
  const {
    isQuickSettingsOpen,
    setIsQuickSettingsOpen,
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    wallpaper,
    setWallpaper,
    soundEnabled,
    setSoundEnabled,
    setLocked,
    openApp
  } = useOS();

  if (!isQuickSettingsOpen) return null;

  const isLight = theme === 'vercel-light' || theme === 'neo-brutal';

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
    <div
      onClick={() => setIsQuickSettingsOpen(false)}
      className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-xs flex justify-end animate-fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-sm h-full border-l shadow-2xl rounded-l-2xl rounded-r-none p-4 flex flex-col transition-colors duration-200 animate-slide-in-right os-scrollbar"
        style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <SlidersHorizontal className="w-4 h-4 accent-text" /> Quick Control
          </div>
          <button
            onClick={() => setIsQuickSettingsOpen(false)}
            className="p-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-[var(--surface-2)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-5 os-scrollbar">
          {/* Theme Mode Toggle */}
          <div className="glass-card flex items-center justify-between p-3 rounded-xl border">
            <div className="flex items-center gap-2.5">
              {isLight ? (
                <Sun className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              ) : (
                <Moon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              )}
              <div>
                <div className="text-xs font-semibold">Dark Theme Mode</div>
                <div className="text-[10px] opacity-70">
                  {isLight ? 'Frosted Light Active' : 'Elegant Dark Active'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setTheme(isLight ? 'linear-dark' : 'vercel-light')}
              className="w-10 h-5 rounded-full p-0.5 transition-colors"
              style={{ backgroundColor: !isLight ? 'var(--accent)' : 'var(--surface-3)' }}
              title="Toggle Dark / Light Theme"
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${!isLight ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="glass-card flex items-center justify-between p-3 rounded-xl border">
            <div className="flex items-center gap-2.5">
              {soundEnabled ? <Volume2 className="w-4 h-4 accent-text" /> : <VolumeX className="w-4 h-4 opacity-40" />}
              <div>
                <div className="text-xs font-semibold">Audio Feedback</div>
                <div className="text-[10px] opacity-70">Synthesized UI clicks</div>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-10 h-5 rounded-full p-0.5 transition-colors"
              style={{ backgroundColor: soundEnabled ? 'var(--accent)' : 'var(--surface-3)' }}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${soundEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Accent Color Palette */}
          <div>
            <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <Palette className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> System Accent Color
            </div>
            <div className="grid grid-cols-4 gap-2">
              {ACCENTS.map(acc => (
                <button
                  key={acc.id}
                  onClick={() => setAccentColor(acc.id)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform hover:scale-110 ring-1 ring-white/15 ${accentColor === acc.id ? 'ring-2 ring-white scale-105' : 'hover:ring-white/40'}`}
                  style={{ backgroundColor: acc.bg }}
                  title={acc.name}
                >
                  {accentColor === acc.id && <Check className="w-4 h-4 text-white font-bold" />}
                </button>
              ))}
            </div>
          </div>

          {/* Wallpapers Quick Selector */}
          <div>
            <div className="text-xs font-semibold mb-2 flex items-center justify-between" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Desktop Wallpaper</span>
              <button onClick={() => { openApp('settings'); setIsQuickSettingsOpen(false); }} className="text-[10px] accent-text hover:underline">Full Settings</button>
            </div>
            <div className="space-y-2">
              {WALLPAPERS.map(wp => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp)}
                   className={`w-full p-2 rounded-xl border text-left flex items-center justify-between gap-2 transition-all`}
                   style={{
                     backgroundColor: wallpaper.id === wp.id ? 'var(--surface-2)' : 'transparent',
                     borderColor: wallpaper.id === wp.id ? 'var(--glass-border)' : 'transparent',
                     color: wallpaper.id === wp.id ? 'var(--text-primary)' : 'var(--text-secondary)'
                   }}
                 >
                   <span className="text-xs font-medium truncate">{wp.name}</span>
                   <div className={`w-6 h-6 rounded-full border shrink-0 ring-1 ring-white/20 ${wp.previewBg}`} />
                </button>
              ))}
            </div>
          </div>

          {/* System Lock Action */}
          <button
            onClick={() => { setLocked(true); setIsQuickSettingsOpen(false); }}
            className="w-full py-2.5 rounded-xl text-amber-500 border hover:bg-amber-500/10 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            style={{ borderColor: 'rgba(245,158,11,0.3)', backgroundColor: 'rgba(245,158,11,0.1)' }}
          >
            <Lock className="w-4 h-4" /> Lock System Session
          </button>
        </div>
      </div>
    </div>
  );
};

