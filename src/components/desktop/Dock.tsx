import React, { useRef, useState } from "react";
import { useOS } from '../../context/OSContext';
import { APPS_METADATA } from '../../data/portfolioData';
import { AppID } from '../../types';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap, FileText, Mail, Sliders
} from 'lucide-react';
import { cn } from "../../lib/utils";

const ICON_MAP: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  LayoutDashboard, User, FolderGit2, Cpu, Terminal, Github, Briefcase, GraduationCap, FileText, Mail, Sliders
};

export const Dock: React.FC = () => {
  let mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[98vw] select-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="glass-panel-heavy rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 px-2 sm:px-4 flex items-center gap-1.5 sm:gap-3 shadow-2xl transition-all duration-300"
      >
        {APPS_METADATA.map((app) => (
          <IconContainer mouseX={mouseX} key={app.id} app={app} />
        ))}
      </motion.div>
    </div>
  );
};

const IconContainer: React.FC<{ mouseX: any; app: any }> = ({ mouseX, app }) => {
  let ref = useRef<HTMLButtonElement>(null);
  
  const { windows, activeWindowId, openApp, minimizeWindow } = useOS();

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [45, 85, 45]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [45, 85, 45]);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [22, 42, 22]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [22, 42, 22]);

  let width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let widthIcon = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightIcon = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  const IconComp = ICON_MAP[app.icon] || LayoutDashboard;
  const appWindows = windows.filter(w => w.appId === app.id);
  const isOpen = appWindows.length > 0;
  const isActive = appWindows.some(w => w.id === activeWindowId && !w.isMinimized);
  const isMinimized = appWindows.length > 0 && appWindows.every(w => w.isMinimized);

  return (
    <div className="relative group flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-12 left-1/2 px-3 py-1.5 rounded-lg glass-panel text-xs font-medium whitespace-nowrap shadow-xl pointer-events-none z-50"
            style={{ backgroundColor: 'var(--surface-3)', color: 'var(--text-primary)', borderColor: 'var(--glass-border)' }}
          >
            {app.title}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (isActive) {
            const activeWin = appWindows.find(w => w.id === activeWindowId);
            if (activeWin) minimizeWindow(activeWin.id);
          } else {
            openApp(app.id);
          }
        }}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl glass-card-interactive transition-colors focus:outline-none",
          isActive ? 'shadow-lg' : ''
        )}
      >
        <div 
           className="absolute inset-0 rounded-2xl pointer-events-none transition-colors duration-200" 
           style={{
             backgroundColor: isActive ? 'var(--surface-3)' : hovered ? 'var(--surface-2)' : isOpen ? 'var(--surface-1)' : 'transparent',
             borderColor: isActive ? 'var(--glass-border-active)' : 'transparent',
             borderWidth: '1px'
           }} 
        />
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="relative z-10 flex items-center justify-center">
          <IconComp style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)', width: '100%', height: '100%' }} />
        </motion.div>

        {isOpen && (
          <div
            className="absolute -bottom-1.5 w-1 h-1 rounded-full transition-all duration-300"
            style={{ 
              backgroundColor: isActive ? 'var(--accent)' : 'var(--text-tertiary)',
              boxShadow: isActive ? '0 0 6px var(--accent-glow)' : 'none',
              opacity: isMinimized ? 0.5 : 1
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
