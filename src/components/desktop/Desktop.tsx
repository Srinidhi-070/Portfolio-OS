import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA, PERSONAL_INFO, PROJECTS } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import { InteractiveBackground } from './InteractiveBackground';
import { UserProfileCard } from './UserProfileCard';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Terminal,
  Github,
  Briefcase,
  GraduationCap,
  FileText,
  Mail,
  Sliders,
  Sparkles,
  ExternalLink,
  Code2,
  Brain,
  CheckCircle,
  Clock,
  Pin
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Terminal,
  Github,
  Briefcase,
  GraduationCap,
  FileText,
  Mail,
  Sliders
};

export const Desktop: React.FC = () => {
  const { openApp, wallpaper, accentColor, theme, windows } = useOS();
  const isLight = theme === 'arctic-light';
  const accent = getAccentClasses(accentColor);

  const [stickyNote, setStickyNote] = useState<string>(
    "🚀 Portfolio OS Quick Notes:\n• Check out GuardianVoice (AI Voice Scam Detector)\n• Try 'sudo hire-me' in Warp Terminal!\n• Explore 16+ GitHub Repositories"
  );

  const hasOpenWindows = windows.some(w => !w.isMinimized);

  return (
    <div className="relative w-full h-[calc(100vh-32px)] overflow-hidden select-none transition-colors duration-200"
         style={{ color: 'var(--text-primary)' }}>
      {/* Background ready for user's custom background animation */}
      <InteractiveBackground />

      {/* Main Desktop Grid Layout */}
      <div className={`relative z-10 w-full h-full p-4 md:p-6 grid grid-cols-[auto_1fr] gap-6 overflow-hidden pointer-events-none transition-all duration-500 ease-out ${hasOpenWindows ? 'opacity-30 blur-[8px] scale-[0.97]' : 'opacity-100 blur-0 scale-100'}`}>
        {/* Left Column: Pinned Desktop Icons Grid */}
        <div className="flex flex-row sm:flex-col flex-wrap gap-2 sm:gap-4 max-h-[calc(100vh-110px)] overflow-y-auto scrollbar-none content-start pb-16 pointer-events-none">
          {APPS_METADATA.map(app => {
            const IconComp = ICON_MAP[app.icon] || LayoutDashboard;
            return (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                className="group flex flex-col items-center justify-center w-16 sm:w-24 p-1.5 sm:p-2 rounded-xl transition-all duration-150 focus:outline-none shrink-0 glass-card-interactive pointer-events-auto"
                style={{ background: 'transparent', borderColor: 'transparent' }}
                onMouseOver={(e) => { 
                  e.currentTarget.style.background = 'var(--surface-1)'; 
                  e.currentTarget.style.borderColor = 'var(--glass-border)'; 
                  e.currentTarget.style.backdropFilter = 'blur(var(--glass-blur))';
                }}
                onMouseOut={(e) => { 
                  e.currentTarget.style.background = 'transparent'; 
                  e.currentTarget.style.borderColor = 'transparent'; 
                  e.currentTarget.style.backdropFilter = 'none';
                }}
              >
                <div className={`app-tile w-10 h-10 sm:w-12 sm:h-12 transition-transform duration-200`}>
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="mt-1 sm:mt-1.5 text-[9px] sm:text-[10px] font-medium text-center tracking-tight drop-shadow-xs line-clamp-1 group-hover:font-semibold"
                      style={{ color: 'var(--text-primary)' }}>
                  {app.shortTitle || app.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Desktop Floating Widgets (User Profile & Scratchpad Cards) */}
        <div className="hidden lg:flex flex-col gap-4 items-end justify-start pr-4 pointer-events-none max-w-md ml-auto">
          {/* User Section Profile Card */}
          <div className="w-96 sm:w-[26rem] animate-fade-in slide-in-from-right-4 duration-300 glass-card pointer-events-auto">
            <UserProfileCard compact={false} />
          </div>

          {/* Sticky Notes Widget */}
          <div className="w-96 sm:w-[26rem] rounded-2xl glass-card p-4 shadow-2xl backdrop-blur-xl pointer-events-auto">
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center gap-1.5 font-bold text-xs" style={{ color: 'var(--accent)' }}>
                <Pin className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Desktop Scratchpad
              </div>
              <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Editable</span>
            </div>
            <textarea
              value={stickyNote}
              onChange={e => setStickyNote(e.target.value)}
              className="mt-2.5 w-full h-24 bg-transparent border-0 text-xs font-mono focus:outline-none resize-none leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
              placeholder="Type desktop notes here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
