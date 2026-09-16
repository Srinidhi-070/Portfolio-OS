import React, { useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { Terminal, Moon, Sun, Mail, RefreshCw, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  const { theme, setTheme, openApp } = useOS();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const isLight = theme === 'arctic-light';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const toggleTheme = () => {
    setTheme(isLight ? 'default' : 'arctic-light');
    onClose();
  };

  const handleOpenApp = (appId: string) => {
    openApp(appId);
    onClose();
  };

  const menuItems = [
    { icon: <Terminal className="w-4 h-4" />, label: "Open Terminal", onClick: () => handleOpenApp('terminal') },
    { icon: isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />, label: isLight ? "Dark Mode" : "Light Mode", onClick: toggleTheme },
    { icon: <Mail className="w-4 h-4" />, label: "Contact Me", onClick: () => handleOpenApp('contact') },
    { icon: <Github className="w-4 h-4" />, label: "View Source", onClick: () => { window.open(PERSONAL_INFO.github, '_blank'); onClose(); } },
    { icon: <RefreshCw className="w-4 h-4" />, label: "Refresh", onClick: () => window.location.reload() },
  ];

  // Keep menu on screen
  const menuWidth = 200;
  const menuHeight = 220;
  const safeX = x + menuWidth > window.innerWidth ? window.innerWidth - menuWidth - 10 : x;
  const safeY = y + menuHeight > window.innerHeight ? window.innerHeight - menuHeight - 10 : y;

  return (
    <div 
      ref={menuRef}
      className="fixed z-50 w-48 glass-panel-heavy rounded-xl shadow-2xl py-2 overflow-hidden border border-[var(--glass-border)] animate-fade-in"
      style={{ left: safeX, top: safeY }}
    >
      <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-[var(--glass-border)] mb-1">
        Portfolio OS
      </div>
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className="w-full px-3 py-2 text-sm flex items-center gap-3 hover:bg-[var(--accent)] hover:text-white transition-colors duration-150 text-left"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>
  );
};
