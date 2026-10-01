import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA, PERSONAL_INFO, PROJECTS } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import { InteractiveBackground } from './InteractiveBackground';
import { DesktopPet } from './DesktopPet';
import { UserProfileCard } from './UserProfileCard';
import { ClockWidget } from './widgets/ClockWidget';
import { SystemMonitorWidget } from './widgets/SystemMonitorWidget';
import { GitHubWidget } from './widgets/GitHubWidget';
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

import { ContextMenu } from './ContextMenu';

export const Desktop: React.FC = () => {
  const { openApp, wallpaper, accentColor, theme, windows } = useOS();
  const isLight = theme === 'vercel-light' || theme === 'neo-brutal';
  const accent = getAccentClasses(accentColor);

  const [stickyNote, setStickyNote] = useState<string>(
    "Portfolio OS Quick Notes:\n\u2022 Check out GuardianVoice (AI Voice Scam Detector)\n\u2022 Try 'sudo hire-me' in Warp Terminal!\n\u2022 Explore 16+ GitHub Repositories"
  );
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const hasOpenWindows = windows.some(w => !w.isMinimized);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY });
  };

  return (
    <div 
      className="relative w-full h-[calc(100dvh-32px)] overflow-hidden select-none transition-colors duration-200"
      style={{ color: 'var(--text-primary)' }}
      onContextMenu={handleContextMenu}
    >
      <DesktopPet />

      {/* Background ready for user's custom background animation */}
      <InteractiveBackground />
      
      {contextMenu && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          onClose={() => setContextMenu(null)} 
        />
      )}

      {/* Main Desktop Grid Layout */}
      <div className={`relative z-10 w-full h-full p-4 md:p-6 grid grid-cols-[auto_1fr] gap-6 overflow-hidden pointer-events-none transition-all duration-500 ease-out ${hasOpenWindows ? 'opacity-30 blur-[8px] scale-[0.97]' : 'opacity-100 blur-0 scale-100'}`}>
        {/* Left Column: Pinned Desktop Icons Grid */}
        <div className="flex flex-row sm:flex-col flex-wrap gap-2 sm:gap-4 max-h-[calc(100dvh-110px)] overflow-y-auto scrollbar-none content-start pb-16 pointer-events-none">
          {APPS_METADATA.map(app => {
            const IconComp = ICON_MAP[app.icon] || LayoutDashboard;
            return (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                className="group flex flex-col items-center justify-center w-16 sm:w-24 p-1.5 sm:p-2 rounded-xl focus:outline-none shrink-0 pointer-events-auto"
                style={{ background: 'transparent', borderColor: 'transparent' }}
              >
                <div className={`app-tile w-12 h-12 sm:w-14 sm:h-14`}>
                  <IconComp className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <span className="mt-2 sm:mt-2.5 text-[10px] sm:text-[11px] font-medium text-center tracking-wide drop-shadow-md line-clamp-1 group-hover:font-semibold"
                      style={{ color: 'var(--text-primary)' }}>
                  {app.shortTitle || app.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Desktop Floating Widgets */}
        <div className="hidden lg:flex flex-col gap-3 items-end justify-start pr-4 pointer-events-none w-80 ml-auto overflow-y-auto max-h-[calc(100dvh-80px)] os-scrollbar pb-10">
          {/* User Profile Card */}
          <div className="w-full widget-3d pointer-events-auto animate-fade-in">
            <UserProfileCard compact={false} />
          </div>

          {/* Clock */}
          <div className="w-full pointer-events-auto animate-fade-in">
            <ClockWidget />
          </div>

          {/* System Monitor */}
          <div className="w-full pointer-events-auto animate-fade-in">
            <SystemMonitorWidget />
          </div>

          {/* GitHub */}
          <div className="w-full pointer-events-auto animate-fade-in">
            <GitHubWidget />
          </div>

          {/* Sticky Notes */}
          <div
            className="w-full p-3.5 rounded-2xl pointer-events-auto animate-fade-in"
            style={{
              background: isLight ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center gap-1.5 font-bold text-[10px]" style={{ color: 'var(--accent)' }}>
                <Pin className="w-3 h-3" style={{ color: 'var(--accent)' }} /> Scratchpad
              </div>
              <span className="text-[9px] opacity-50" style={{ color: 'var(--text-tertiary)' }}>Editable</span>
            </div>
            <textarea
              value={stickyNote}
              onChange={e => setStickyNote(e.target.value)}
              className="mt-2 w-full h-20 bg-transparent border-0 text-[11px] font-mono focus:outline-none resize-none leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
              placeholder="Type desktop notes here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
