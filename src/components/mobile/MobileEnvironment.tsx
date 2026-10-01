import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap, FileText, Mail, Sliders, Battery, Wifi, ChevronLeft, AppWindow
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
  const { theme, wallpaper, accentColor, openApp, closeApp, activeApp } = useOS();
  const accent = getAccentClasses(accentColor);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAppMetadata = APPS_METADATA.find(app => app.id === activeApp);
  const ActiveComponent = activeApp ? APP_COMPONENTS[activeApp] : null;

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
      <div className="absolute top-0 w-full h-10 px-6 flex items-center justify-between z-50 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <Battery className="w-5 h-5" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full h-full pt-12 pb-8 flex flex-col">
        <AnimatePresence mode="wait">
          {!activeApp ? (
            /* Home Screen */
            <motion.div 
              key="home-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 p-6 overflow-y-auto os-scrollbar pb-24 mt-12"
            >
              <div className="grid grid-cols-4 gap-y-10 gap-x-4">
                {APPS_METADATA.map(app => {
                  const Icon = ICON_MAP[app.icon] || AppWindow;
                  return (
                    <div key={app.id} className="flex flex-col items-center gap-2">
                      <button 
                        onClick={() => openApp(app.id)}
                        className="w-[60px] h-[60px] rounded-[18px] flex items-center justify-center glass-card-interactive shadow-lg transition-transform active:scale-90"
                      >
                        <Icon className="w-8 h-8" style={{ color: 'var(--text-primary)' }} />
                      </button>
                      <span className="text-[11px] font-semibold tracking-wide truncate w-full text-center" style={{ color: 'var(--text-primary)', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                        {app.shortTitle}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* Active Full-Screen App */
            <motion.div 
              key="active-app"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-40 flex flex-col glass-panel-heavy"
              style={{ backgroundColor: 'var(--surface-0)' }}
            >
              {/* App Header */}
              <div className="h-16 px-4 flex items-center justify-between glass-surface border-b border-[var(--glass-border)] z-50 pt-4">
                <button 
                  onClick={() => closeApp(activeApp)}
                  className="p-2 -ml-2 rounded-full glass-card-interactive flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <ChevronLeft className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                </button>
                <div className="text-sm font-bold truncate pr-6">{activeAppMetadata?.title}</div>
                <div className="w-10" /> {/* Balance */}
              </div>
              
              {/* App Content */}
              <div className="flex-1 overflow-y-auto os-scrollbar relative bg-[var(--surface-0)]">
                {ActiveComponent && <ActiveComponent windowState={{ id: activeApp, title: activeAppMetadata?.title, isMaximized: true }} />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Indicator (iPhone style) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 rounded-full z-50 opacity-80" style={{ backgroundColor: 'var(--text-primary)' }} />
    </div>
  );
};


