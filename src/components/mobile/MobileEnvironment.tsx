import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap, FileText, Mail, Sliders, Battery, Wifi, ChevronLeft, AppWindow, GripHorizontal
} from 'lucide-react';
import { HomeApp } from '../apps/HomeApp';
import { AboutApp } from '../apps/AboutApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { SkillsApp } from '../apps/SkillsApp';
import { TerminalApp } from '../apps/TerminalApp';
import { GitHubApp } from '../apps/GitHubApp';
import { ExperienceApp } from '../apps/ExperienceApp';
import { EducationApp } from '../apps/EducationApp';
import { ResumeApp } from '../apps/ResumeApp';
import { ContactApp } from '../apps/ContactApp';
import { SettingsApp } from '../apps/SettingsApp';
import { InteractiveBackground } from '../desktop/InteractiveBackground';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap, FileText, Mail, Sliders
};

const APP_COMPONENTS: Record<string, React.FC<{ windowState: any }>> = {
  home: HomeApp, about: AboutApp, projects: ProjectsApp, skills: SkillsApp, terminal: TerminalApp,
  github: GitHubApp, experience: ExperienceApp, education: EducationApp, resume: ResumeApp,
  contact: ContactApp, settings: SettingsApp
};

export const MobileEnvironment: React.FC = () => {
  const { theme, wallpaper, accentColor, openApp, windows, activeWindowId, closeWindow } = useOS();
  const accent = getAccentClasses(accentColor);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeWindow = windows.find(w => w.id === activeWindowId) || windows[windows.length - 1];
  const activeApp = activeWindow?.appId;

  const activeAppMetadata = APPS_METADATA.find(app => app.id === activeApp);
  const ActiveComponent = activeApp ? APP_COMPONENTS[activeApp] : null;

  const handleCloseApp = () => {
    if (activeWindow) {
      closeWindow(activeWindow.id);
    }
  };

  const dockApps = APPS_METADATA.slice(0, 4);
  const gridApps = APPS_METADATA.slice(4);

  return (
    <div className={`relative w-screen h-[100dvh] overflow-hidden select-none font-sans ${theme}`} style={{ background: 'var(--surface-0)', color: 'var(--text-primary)' }}>
      {/* Background */}
      {wallpaper.type === 'mesh' ? (
        <InteractiveBackground />
      ) : (
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${wallpaper.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      <div className="absolute inset-0 z-0" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--glass-blur))' }} />

      {/* Mobile Status Bar */}
      <div className="absolute top-0 w-full h-12 px-6 flex items-center justify-between z-50 text-xs font-bold pointer-events-none" style={{ color: 'var(--text-primary)' }}>
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <Battery className="w-5 h-5" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex flex-col">
        <AnimatePresence mode="wait">
          {!activeApp ? (
            /* Home Screen */
            <motion.div 
              key="home-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col relative w-full h-full pt-16 pb-6 px-4"
            >
              {/* App Grid */}
              <div className="flex-1 grid grid-cols-4 gap-y-8 gap-x-2 content-start pt-4">
                {gridApps.map(app => {
                  const Icon = ICON_MAP[app.icon] || AppWindow;
                  return (
                    <div key={app.id} className="flex flex-col items-center gap-1.5">
                      <button 
                        onClick={() => openApp(app.id)}
                        className="w-[60px] h-[60px] rounded-[1.25rem] flex items-center justify-center shadow-sm active:opacity-60 transition-opacity touch-manipulation border border-[var(--glass-border)]"
                        style={{ backgroundColor: 'var(--card-bg)' }}
                      >
                        <Icon className="w-7 h-7" style={{ color: 'var(--text-primary)' }} />
                      </button>
                      <span className="text-[10px] font-medium tracking-wide truncate w-full text-center" style={{ color: 'var(--text-primary)' }}>
                        {app.shortTitle || app.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Dock */}
              <div className="w-full h-[88px] rounded-[2rem] flex items-center justify-around px-2 mb-2 border border-[var(--glass-border)] shadow-xl shrink-0" style={{ backgroundColor: 'var(--glass-bg)' }}>
                {dockApps.map(app => {
                  const Icon = ICON_MAP[app.icon] || AppWindow;
                  return (
                    <button 
                      key={app.id}
                      onClick={() => openApp(app.id)}
                      className="w-[64px] h-[64px] rounded-[1.25rem] flex items-center justify-center shadow-sm active:opacity-60 transition-opacity touch-manipulation border border-[var(--glass-border)]"
                      style={{ backgroundColor: 'var(--card-bg)' }}
                    >
                      <Icon className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Active Full-Screen App - iOS Style Sheet */
            <motion.div 
              key="active-app"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute top-10 bottom-0 left-0 right-0 z-40 flex flex-col rounded-t-[2rem] overflow-hidden border-t border-[var(--glass-border)] shadow-2xl"
              style={{ backgroundColor: 'var(--surface-0)' }}
            >
              {/* App Header */}
              <div className="h-14 px-2 flex items-center justify-between border-b border-[var(--glass-border)] z-50 shrink-0" style={{ backgroundColor: 'var(--surface-1)' }}>
                <button 
                  onClick={handleCloseApp}
                  className="p-3 rounded-full flex items-center gap-1 active:opacity-50 transition-opacity touch-manipulation"
                >
                  <ChevronLeft className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                </button>
                <div className="text-sm font-bold truncate px-2">{activeAppMetadata?.title}</div>
                <div className="w-12" /> {/* Balance */}
              </div>
              
              {/* App Content */}
              <div className="flex-1 overflow-y-auto os-scrollbar relative" style={{ backgroundColor: 'var(--surface-0)' }}>
                {ActiveComponent && <ActiveComponent windowState={{ id: activeApp, title: activeAppMetadata?.title, isMaximized: true }} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Indicator (iPhone style) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[5px] rounded-full z-50 opacity-50 pointer-events-none" style={{ backgroundColor: 'var(--text-primary)' }} />
    </div>
  );
};
