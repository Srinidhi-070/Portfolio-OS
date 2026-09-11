import React from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA } from '../../data/portfolioData';
import { FloatingDock } from '../ui/floating-dock';
import {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap, FileText, Mail, Sliders
} from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap, FileText, Mail, Sliders
};

export const Dock: React.FC = () => {
  const { windows, activeWindowId, openApp, minimizeWindow } = useOS();

  const dockItems = APPS_METADATA.map((app) => {
    const IconComp = ICON_MAP[app.icon] || LayoutDashboard;
    
    // Status Logic
    const appWindows = windows.filter(w => w.appId === app.id);
    const isOpen = appWindows.length > 0;
    const isActive = appWindows.some(w => w.id === activeWindowId && !w.isMinimized);

    return {
      title: app.title,
      icon: (
        <div className="relative w-full h-full flex items-center justify-center text-neutral-500 dark:text-neutral-300">
          <IconComp className="w-full h-full" style={{ color: isActive ? 'var(--accent)' : 'inherit' }} />
          {isOpen && (
            <div 
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" 
              style={{ backgroundColor: isActive ? 'var(--accent)' : 'var(--text-tertiary)' }}
            />
          )}
        </div>
      ),
      href: "#",
      onClick: () => {
        if (isActive) {
          const activeWin = appWindows.find(w => w.id === activeWindowId);
          if (activeWin) minimizeWindow(activeWin.id);
        } else {
          openApp(app.id);
        }
      }
    };
  });

  return (
    <div className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-40">
      <FloatingDock
        desktopClassName="glass-panel-heavy shadow-2xl bg-transparent dark:bg-transparent"
        mobileClassName="translate-y-0 shadow-2xl glass-panel-heavy bg-transparent dark:bg-transparent"
        items={dockItems}
      />
    </div>
  );
};
