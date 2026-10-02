import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap,
  Award, FileText, Mail, Sliders, Battery, Wifi, ChevronLeft, AppWindow, ChevronUp
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
import { CertificationsApp } from '../apps/CertificationsApp';
import { InteractiveBackground } from '../desktop/InteractiveBackground';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap, Award, FileText, Mail, Sliders
};

const APP_COMPONENTS: Record<string, React.FC<{ windowState: any }>> = {
  home: HomeApp, about: AboutApp, projects: ProjectsApp, skills: SkillsApp, terminal: TerminalApp,
  github: GitHubApp, experience: ExperienceApp, education: EducationApp, resume: ResumeApp,
  contact: ContactApp, settings: SettingsApp,
  certifications: CertificationsApp
};

export const MobileEnvironment: React.FC = () => {
  const { theme, wallpaper, accentColor, openApp, windows, activeWindowId, closeWindow } = useOS();
  const accent = getAccentClasses(accentColor);
  const [time, setTime] = useState(new Date());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  return (
    <div className={`relative w-screen h-[100dvh] overflow-hidden select-none font-sans ${theme}`} style={{ background: 'var(--surface-0)', color: 'var(--text-primary)' }}>
      {/* Background */}
      {wallpaper.type === 'mesh' ? (
        <InteractiveBackground />
      ) : (
        <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${wallpaper.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}

      {/* Mobile Status Bar */}
      <div className="absolute top-0 w-full h-12 px-6 flex items-center justify-between z-50 text-xs font-bold pointer-events-none" style={{ color: 'var(--text-primary)' }}>
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <div className="flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <Battery className="w-5 h-5" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        {/* Base Home Screen */}
        {!activeApp && (
          <motion.div 
            key="home-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col pt-24 pb-6 px-4 pointer-events-none"
          >
            {/* Clock Widget on Home */}
            <div className="flex flex-col items-center mt-12 gap-1">
              <div className="text-[4rem] font-light tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
              <div className="text-sm font-medium opacity-70 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {/* Swipe Up Animation for App Drawer */}
            <motion.div 
              className="absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center gap-2 cursor-pointer z-20 touch-none pointer-events-auto"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              onClick={() => setIsDrawerOpen(true)}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, info) => { if (info.offset.y < -20) setIsDrawerOpen(true) }}
            >
              <div className="p-3 rounded-full shadow-lg border border-[var(--glass-border)]" style={{ backgroundColor: 'var(--surface-0)' }}>
                <ChevronUp className="w-6 h-6 opacity-80" style={{ color: 'var(--accent)' }} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60" style={{ color: 'var(--text-primary)' }}>
                Apps
              </span>
            </motion.div>
          </motion.div>
        )}

        <AnimatePresence>
          {/* App Drawer Overlay */}
          {isDrawerOpen && !activeApp && (
            <motion.div
              key="app-drawer"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="absolute top-12 bottom-0 left-0 right-0 z-30 flex flex-col rounded-t-[2.5rem] border-t border-[var(--glass-border)] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pointer-events-auto"
              style={{ backgroundColor: 'var(--glass-bg-heavy)', backdropFilter: 'blur(var(--glass-blur-heavy))' }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => { if (info.offset.y > 50) setIsDrawerOpen(false) }}
            >
              {/* Drawer Handle */}
              <div className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 rounded-full opacity-20" style={{ backgroundColor: 'var(--text-primary)' }} />
              </div>
              
              <div className="flex-1 px-4 overflow-y-auto os-scrollbar pb-12">
                <div className="grid grid-cols-4 gap-y-8 gap-x-2 content-start pt-2">
                  {APPS_METADATA.map(app => {
                    const Icon = ICON_MAP[app.icon] || AppWindow;
                    return (
                      <div key={app.id} className="flex flex-col items-center gap-1.5">
                        <button 
                          onClick={() => { openApp(app.id); setIsDrawerOpen(false); }}
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
              </div>
            </motion.div>
          )}

          {/* Active Full-Screen App - iOS Style Sheet */}
          {activeApp && (
            <motion.div 
              key="active-app"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute top-10 bottom-0 left-0 right-0 z-40 flex flex-col rounded-t-[2rem] overflow-hidden border-t border-[var(--glass-border)] shadow-2xl glass-panel-heavy pointer-events-auto"
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
              <div className="flex-1 overflow-y-auto os-scrollbar relative bg-transparent">
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
