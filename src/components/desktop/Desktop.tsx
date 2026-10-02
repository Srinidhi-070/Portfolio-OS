import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Award,
  FileText,
  Mail,
  Sliders,
  Sparkles,
  ExternalLink,
  Code2,
  Brain,
  CheckCircle,
  Clock,
  Pin,
  Copy,
  Download,
  Trash2,
  Palette,
  Check
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

  const noteRef = useRef<HTMLTextAreaElement>(null);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStickyNote(e.target.value);
    if (noteRef.current) {
      noteRef.current.style.height = 'auto';
      noteRef.current.style.height = `${noteRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (noteRef.current) {
      noteRef.current.style.height = 'auto';
      noteRef.current.style.height = `${noteRef.current.scrollHeight}px`;
    }
  }, []);

  const hasOpenWindows = windows.some(w => !w.isMinimized);

  const [isCopied, setIsCopied] = useState(false);
  const [noteColorIndex, setNoteColorIndex] = useState(0);

  const noteColors = [
    'var(--glass-bg)',
    isLight ? '#fef08a' : '#422006',
    isLight ? '#bae6fd' : '#082f49',
    isLight ? '#fbcfe8' : '#4c0519',
  ];

  const handleCopyNote = () => {
    navigator.clipboard.writeText(stickyNote);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClearNote = () => {
    setStickyNote('');
    if (noteRef.current) {
      noteRef.current.style.height = 'auto';
    }
  };

  const handleDownloadNote = () => {
    const blob = new Blob([stickyNote], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scratchpad.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleColorChange = () => {
    setNoteColorIndex((prev) => (prev + 1) % noteColors.length);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY });
  };

  const widgetBaseClass = "absolute w-80 bg-[var(--glass-bg)] rounded-[1.25rem] border border-[var(--glass-border)] pointer-events-auto shadow-sm cursor-grab active:cursor-grabbing overflow-hidden";
  const dragProps = { drag: true, dragMomentum: false, whileDrag: { scale: 1.02, zIndex: 50 } };

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

      {/* Main Desktop Layout */}
      <div className={`relative z-10 w-full h-full p-4 md:p-6 overflow-hidden pointer-events-none transition-all duration-500 ease-out ${hasOpenWindows ? 'opacity-30 blur-[8px] scale-[0.97]' : 'opacity-100 blur-0 scale-100'}`}>
        
        {/* Left Column: Pinned Desktop Icons */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-row sm:flex-col flex-wrap gap-2 sm:gap-4 max-h-[calc(100dvh-110px)] overflow-y-auto scrollbar-none content-start pb-16 pointer-events-none z-10">
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

        {/* Free-Floating Draggable Widgets */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          
          <motion.div {...dragProps} className={`${widgetBaseClass} top-[1.5rem] right-[1.5rem]`}>
            <UserProfileCard compact={false} />
          </motion.div>

          <motion.div {...dragProps} className={`${widgetBaseClass} top-[1.5rem] right-[23rem]`}>
            <ClockWidget />
          </motion.div>

          <motion.div {...dragProps} className={`${widgetBaseClass} top-[9rem] right-[23rem]`}>
            <SystemMonitorWidget />
          </motion.div>

          <motion.div {...dragProps} className={`${widgetBaseClass} top-[18.5rem] right-[23rem]`}>
            <GitHubWidget />
          </motion.div>

          <motion.div {...dragProps} className={`absolute w-80 rounded-[1.25rem] border border-[var(--glass-border)] pointer-events-auto shadow-sm cursor-grab active:cursor-grabbing overflow-hidden p-3.5 top-[28rem] right-[23rem]`} style={{ backgroundColor: noteColors[noteColorIndex], transition: 'background-color 0.3s' }}>
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center gap-1.5 font-bold text-[10px]" style={{ color: 'var(--accent)' }}>
                <Pin className="w-3 h-3" style={{ color: 'var(--accent)' }} /> Scratchpad
              </div>
              <div className="flex items-center gap-2.5">
                <button onClick={handleColorChange} className="opacity-50 hover:opacity-100 transition-opacity" title="Change Color">
                  <Palette className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                </button>
                <button onClick={handleCopyNote} className="opacity-50 hover:opacity-100 transition-opacity" title="Copy Note">
                  {isCopied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />}
                </button>
                <button onClick={handleDownloadNote} className="opacity-50 hover:opacity-100 transition-opacity" title="Download Note">
                  <Download className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
                </button>
                <button onClick={handleClearNote} className="opacity-50 hover:opacity-100 transition-opacity text-red-500" title="Clear Note">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <textarea
              ref={noteRef}
              value={stickyNote}
              onChange={handleNoteChange}
              className="mt-2 w-full min-h-[5rem] bg-transparent border-0 text-[11px] font-mono focus:outline-none resize-none leading-relaxed cursor-text overflow-hidden"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              placeholder="Type desktop notes here..."
              onPointerDown={(e) => e.stopPropagation()}
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
};
