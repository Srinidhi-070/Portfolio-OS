import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { WindowState } from '../../types';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import {
  X,
  Minus,
  Square,
  Maximize2,
  Minimize2,
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
  Move
} from 'lucide-react';

// Lazy import app views
import { HomeApp } from '../apps/HomeApp';
import { AboutApp } from '../apps/AboutApp';
import { ProjectsApp } from '../apps/ProjectsApp';
import { SkillsApp } from '../apps/SkillsApp';
import { ExperienceApp } from '../apps/ExperienceApp';
import { EducationApp } from '../apps/EducationApp';
import { GitHubApp } from '../apps/GitHubApp';
import { ResumeApp } from '../apps/ResumeApp';
import { ContactApp } from '../apps/ContactApp';
import { TerminalApp } from '../apps/TerminalApp';
import { SettingsApp } from '../apps/SettingsApp';

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

interface WindowProps {
  windowState: WindowState;
}

export const Window: React.FC<WindowProps> = ({ windowState }) => {
  const {
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    accentColor,
    theme
  } = useOS();

  const isLight = theme === 'arctic-light';
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; winX: number; winY: number }>({ x: 0, y: 0, winX: 0, winY: 0 });
  const resizeStartRef = useRef<{ startX: number; startY: number; startW: number; startH: number }>({ startX: 0, startY: 0, startW: 0, startH: 0 });

  const isActive = activeWindowId === windowState.id;
  const appMeta = APPS_METADATA.find(a => a.id === windowState.appId);
  const IconComp = appMeta ? (ICON_MAP[appMeta.icon] || LayoutDashboard) : LayoutDashboard;

  const windowRef = useRef<HTMLDivElement>(null);

  // Dragging logic
  const handleMouseDownHeader = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;
    focusWindow(windowState.id);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      winX: windowState.position.x,
      winY: windowState.position.y
    };
  };

  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (windowState.isMaximized) return;
    focusWindow(windowState.id);
    setIsResizing(true);
    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: windowState.size.width,
      startH: windowState.size.height
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && windowRef.current) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        const newX = Math.max(10, Math.min(dragStartRef.current.winX + dx, window.innerWidth - 100));
        const newY = Math.max(38, Math.min(dragStartRef.current.winY + dy, window.innerHeight - 80));
        windowRef.current.style.left = `${newX}px`;
        windowRef.current.style.top = `${newY}px`;
      } else if (isResizing && windowRef.current) {
        const dw = e.clientX - resizeStartRef.current.startX;
        const dh = e.clientY - resizeStartRef.current.startY;
        const newW = Math.max(380, Math.min(resizeStartRef.current.startW + dw, window.innerWidth - 20));
        const newH = Math.max(280, Math.min(resizeStartRef.current.startH + dh, window.innerHeight - 80));
        windowRef.current.style.width = `${newW}px`;
        windowRef.current.style.height = `${newH}px`;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        const newX = Math.max(10, Math.min(dragStartRef.current.winX + dx, window.innerWidth - 100));
        const newY = Math.max(38, Math.min(dragStartRef.current.winY + dy, window.innerHeight - 80));
        updateWindowPosition(windowState.id, { x: newX, y: newY });
        setIsDragging(false);
      } else if (isResizing) {
        const dw = e.clientX - resizeStartRef.current.startX;
        const dh = e.clientY - resizeStartRef.current.startY;
        const newW = Math.max(380, Math.min(resizeStartRef.current.startW + dw, window.innerWidth - 20));
        const newH = Math.max(280, Math.min(resizeStartRef.current.startH + dh, window.innerHeight - 80));
        updateWindowSize(windowState.id, { width: newW, height: newH });
        setIsResizing(false);
      }
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, windowState.id, updateWindowPosition, updateWindowSize]);

  if (windowState.isMinimized) {
    return null; // Hidden when minimized
  }

  // Render App Body based on appId
  const renderAppContent = () => {
    switch (windowState.appId) {
      case 'home':
        return <HomeApp />;
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp initialParams={windowState.params} />;
      case 'skills':
        return <SkillsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'education':
        return <EducationApp />;
      case 'github':
        return <GitHubApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'settings':
        return <SettingsApp />;
      default:
        return <div className="p-6 text-[var(--text-secondary)]">App instance loading...</div>;
    }
  };

  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;

  const stylePosition = (windowState.isMaximized || isSmallScreen)
    ? { top: '32px', left: '0px', width: '100vw', height: 'calc(100vh - 32px - 64px)', zIndex: windowState.zIndex }
    : {
        top: `${Math.max(38, Math.min(windowState.position.y, window.innerHeight - 100))}px`,
        left: `${Math.max(10, Math.min(windowState.position.x, window.innerWidth - 100))}px`,
        width: `${Math.min(windowState.size.width, window.innerWidth - 20)}px`,
        height: `${Math.min(windowState.size.height, window.innerHeight - 90)}px`,
        zIndex: windowState.zIndex
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      ref={windowRef as any}
      onClick={() => focusWindow(windowState.id)}
      style={{
        ...stylePosition,
        borderColor: isActive ? 'var(--accent)' : 'var(--glass-border)',
        boxShadow: isActive ? '0 0 0 1px var(--accent-subtle), 0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
      }}
      className={`fixed flex flex-col rounded-xl overflow-hidden glass-panel ${(isDragging || isResizing) ? '' : 'transition-all duration-150'}`}
    >
      {/* Header Bar */}
      <div
        onMouseDown={handleMouseDownHeader}
        onDoubleClick={() => maximizeWindow(windowState.id)}
        className="h-10 px-4 flex items-center justify-between select-none cursor-move border-b glass-panel"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        {/* Left: Window Controls */}
        <div className="flex items-center gap-1 mr-6" onMouseDown={e => e.stopPropagation()}>
          <button
            onClick={e => { e.stopPropagation(); minimizeWindow(windowState.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--surface-2)]"
            style={{ color: 'var(--text-secondary)' }}
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); maximizeWindow(windowState.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--surface-2)]"
            style={{ color: 'var(--text-secondary)' }}
            title="Maximize"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); closeWindow(windowState.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-rose-500/20 hover:text-rose-400"
            style={{ color: 'var(--text-secondary)' }}
            title="Close Window"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Title & Icon */}
        <div className="flex-1 text-center text-xs font-mono tracking-widest uppercase truncate flex items-center justify-center gap-2"
             style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
          <div className="p-0.5 rounded" style={{ color: 'var(--accent)' }}>
            <IconComp className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">{windowState.title} — srinidhi@port-os</span>
        </div>

        {/* Right: Auxiliary Action */}
        <div className="flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
          <button
            onClick={e => { e.stopPropagation(); maximizeWindow(windowState.id); }}
            className="p-1 rounded transition-colors hidden sm:block"
            style={{ color: 'var(--text-tertiary)' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* App Body Content — translucent so the mesh shows through the glass */}
      <div className="flex-1 overflow-auto relative os-scrollbar"
           style={{ color: 'var(--text-primary)' }}>
        {renderAppContent()}
      </div>

      {/* Resizing Handle */}
      {!windowState.isMaximized && (
        <div
          onMouseDown={handleMouseDownResize}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-center justify-center z-30"
          style={{ color: 'var(--text-tertiary)' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-tertiary)'}
          title="Resize Window"
        >
          <div className="w-1.5 h-1.5 border-r-2 border-b-2 border-current" />
        </div>
      )}
    </motion.div>
  );
};

