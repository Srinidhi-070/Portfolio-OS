import React, { useState, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA } from '../../data/portfolioData';
import { AppID } from '../../types';
import { getAccentClasses } from '../../lib/theme';
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
  ChevronUp
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

export const Dock: React.FC = () => {
  const { windows, activeWindowId, openApp, minimizeWindow, accentColor, theme } = useOS();
  const [hoveredAppId, setHoveredAppId] = useState<AppID | null>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const isLight = theme === 'arctic-light';
  
  const handleMouseMove = (e: React.MouseEvent) => {
    // Throttle with rAF so the magnification doesn't re-render all icons on every mousemove
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setMouseX(e.clientX);
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setMouseX(null);
    setHoveredAppId(null);
  };

  return (
    <div className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[98vw] select-none">
      <div 
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-panel-heavy rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 px-2 sm:px-4 flex items-center space-x-1.5 sm:space-x-3 shadow-2xl transition-all duration-300"
        style={{ 
          background: 'var(--glass-bg)', 
          backdropFilter: 'blur(var(--glass-blur))', 
          border: '1px solid var(--glass-border)' 
        }}
      >
        {APPS_METADATA.map((app, index) => {
          const IconComp = ICON_MAP[app.icon] || LayoutDashboard;

          // Check if window exists and its status
          const appWindows = windows.filter(w => w.appId === app.id);
          const isOpen = appWindows.length > 0;
          const isActive = appWindows.some(w => w.id === activeWindowId && !w.isMinimized);
          const isMinimized = appWindows.length > 0 && appWindows.every(w => w.isMinimized);

          // Calculate parabolic scale
          let scale = 1;
          if (mouseX !== null && dockRef.current) {
            const rect = dockRef.current.getBoundingClientRect();
            // Estimate icon center x-coordinate
            const iconsCount = APPS_METADATA.length;
            const iconWidth = rect.width / iconsCount;
            const iconCenter = rect.left + (index * iconWidth) + (iconWidth / 2);
            
            scale = 1 + 0.45 * Math.max(0, 1 - Math.abs(mouseX - iconCenter) / 120);
          }

          return (
            <div key={app.id} className="relative group/icon flex flex-col items-center" style={{ transform: `scale(${scale})`, transformOrigin: 'bottom', transition: mouseX === null ? 'transform 0.2s' : 'none' }}>
              {/* Hover Tooltip */}
              {hoveredAppId === app.id && (
                <div className="absolute -top-12 px-3 py-1.5 rounded-lg glass-panel text-xs font-medium whitespace-nowrap shadow-xl animate-in fade-in zoom-in-95 duration-100 pointer-events-none z-50"
                     style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text-primary)', borderColor: 'var(--glass-border)' }}>
                  {app.title}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" style={{ borderTopColor: 'var(--surface-2)' }} />
                </div>
              )}

              {/* Dock Button */}
              <button
                onClick={() => {
                  if (isActive) {
                    const activeWin = appWindows.find(w => w.id === activeWindowId);
                    if (activeWin) minimizeWindow(activeWin.id);
                  } else {
                    openApp(app.id);
                  }
                }}
                onMouseEnter={() => setHoveredAppId(app.id)}
                className={`relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-200 group cursor-pointer glass-card-interactive ${
                  isActive ? 'shadow-lg' : ''
                }`}
                style={{ 
                  backgroundColor: isActive ? 'var(--surface-2)' : isOpen ? 'var(--surface-1)' : 'transparent',
                  borderColor: isActive ? 'var(--glass-border)' : 'transparent'
                }}
                onMouseOver={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'var(--surface-2)'; }}
                onMouseOut={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = isOpen ? 'var(--surface-1)' : 'transparent'; }}
                aria-label={app.title}
              >
                <IconComp className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200"
                          style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }} />

                {/* Status Dot */}
                {isOpen && (
                  <div
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
                      boxShadow: isActive ? '0 0 6px var(--accent-glow)' : 'none',
                      opacity: isMinimized ? 0.5 : 1
                    }}
                  />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
