import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA, PERSONAL_INFO } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import srinidhiPhoto from '../../assets/srinidhi_headshot.jpg';
import { UserProfileModal } from './UserProfileModal';
import { Logo } from '../Logo';
import {
  Search,
  Bell,
  Wifi,
  Battery,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Power,
  Lock,
  RotateCcw,
  Sparkles,
  Terminal,
  Cpu,
  User,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    openApp,
    isSearchOpen,
    setIsSearchOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isQuickSettingsOpen,
    setIsQuickSettingsOpen,
    notifications,
    accentColor,
    soundEnabled,
    setLocked,
    theme,
    setTheme
  } = useOS();

  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [showSystemMenu, setShowSystemMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const isLight = theme === 'arctic-light';
  const unreadCount = notifications.filter(n => !n.read).length;

  const activeWindow = windows.find(w => w.id === activeWindowId && !w.isMinimized);
  const activeAppMeta = activeWindow ? APPS_METADATA.find(a => a.id === activeWindow.appId) : null;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateStr(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleThemeMode = () => {
    setTheme(isLight ? 'obsidian' : 'arctic-light');
  };

  return (
    <header className="relative z-50 h-8 w-full glass-panel border-b text-xs font-medium flex items-center justify-between px-4 select-none transition-colors duration-200"
      style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
    >
      {/* Left: System Menu & Active App */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="relative shrink-0">
          <button
            onClick={() => setShowSystemMenu(!showSystemMenu)}
            className="flex items-center gap-1.5 px-1.5 sm:px-2 py-1 rounded-md transition-colors focus:outline-none"
            style={{ 
              backgroundColor: showSystemMenu ? 'var(--surface-2)' : 'transparent',
              color: 'var(--text-primary)' 
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-2)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = showSystemMenu ? 'var(--surface-2)' : 'transparent'}
            aria-label="System Menu"
          >
            <Logo size={18} className="shrink-0" />
            <span className="font-semibold tracking-tight hidden sm:inline" style={{ color: 'var(--text-primary)' }}>Portfolio OS</span>
          </button>

          {/* System Dropdown Menu */}
          {showSystemMenu && (
            <div className="absolute top-8 left-0 w-64 rounded-xl border shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 glass-panel-heavy"
              style={{ borderColor: 'var(--glass-border)' }}>
              <button
                onClick={() => { setShowProfileModal(true); setShowSystemMenu(false); }}
                className="w-full text-left p-2 rounded-lg border mb-2 flex items-center gap-2.5 transition-colors group glass-card-interactive"
              >
                <img
                  src={srinidhiPhoto}
                  alt={PERSONAL_INFO.name}
                  className="w-10 h-10 rounded-xl object-cover object-top border group-hover:scale-105 transition-transform"
                  style={{ borderColor: 'var(--accent-subtle)' }}
                />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs truncate flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                    {PERSONAL_INFO.name}
                    <Sparkles className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="text-[10px] font-semibold truncate" style={{ color: 'var(--accent)' }}>{PERSONAL_INFO.title}</div>
                  <div className="text-[9px] truncate" style={{ color: 'var(--text-tertiary)' }}>Click to view Developer Profile</div>
                </div>
              </button>

              <button
                onClick={() => { openApp('about'); setShowSystemMenu(false); }}
                className="w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <User className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                About This OS
              </button>
              <button
                onClick={() => { openApp('terminal'); setShowSystemMenu(false); }}
                className="w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <Terminal className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                Open Warp Terminal
              </button>
              <button
                onClick={() => { openApp('settings'); setShowSystemMenu(false); }}
                className="w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 opacity-60" />
                System Preferences
              </button>

              <div className="my-1 border-t" style={{ borderColor: 'var(--glass-border)' }} />

              <button
                onClick={() => { setLocked(true); setShowSystemMenu(false); }}
                className="w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors text-amber-500 hover:bg-amber-500/20"
              >
                <Lock className="w-3.5 h-3.5" />
                Lock Screen
              </button>
              <button
                onClick={() => { window.location.reload(); }}
                className="w-full text-left px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors text-rose-500 hover:bg-rose-500/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reboot System
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <span className="shrink-0" style={{ color: 'var(--text-tertiary)' }}>/</span>

        {/* Active Application Info */}
        {activeAppMeta ? (
          <div className="flex items-center gap-2 min-w-0 truncate animate-fade-in duration-200">
            <span className="font-semibold truncate">{activeAppMeta.title}</span>
            <span className="hidden lg:inline text-[10px] px-1.5 py-0.5 rounded border shrink-0"
              style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--glass-border)', color: 'var(--text-secondary)' }}>
              Active
            </span>
          </div>
        ) : (
          <span className="hidden md:inline italic truncate" style={{ color: 'var(--text-tertiary)' }}>Desktop Workspace</span>
        )}
      </div>

      {/* Center: Live Clock & Date */}
      <div className="hidden sm:flex flex-1 justify-center items-center gap-2 font-semibold tracking-wide pointer-events-none whitespace-nowrap z-0">
        <span>{timeStr}</span>
        <span className="font-normal hidden md:inline" style={{ color: 'var(--text-tertiary)' }}>•</span>
        <span className="text-[11px] font-normal hidden md:inline" style={{ color: 'var(--text-secondary)' }}>{dateStr}</span>
      </div>

      {/* Right: Quick Triggers & Indicators */}
      <div className="flex items-center justify-end gap-1 sm:gap-1.5 shrink-0 z-10 flex-1">
        {/* Mobile Clock Fallback when center clock is hidden */}
        <span className="sm:hidden text-[11px] font-semibold pr-1">{timeStr}</span>

        {/* Global Search Trigger */}
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md border transition-colors glass-surface"
          style={{ borderColor: 'var(--glass-border)', color: 'var(--text-secondary)' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-1)'}
          title="Global Search (Ctrl + K)"
        >
          <Search className="w-3.5 h-3.5 opacity-70" />
          <span className="text-[10px] opacity-60 font-mono hidden xl:inline" style={{ fontFamily: 'var(--font-mono)' }}>Ctrl+K</span>
        </button>

        {/* Theme Toggle Button (Dark / Light) */}
        <button
          onClick={toggleThemeMode}
          className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-md border transition-all"
          style={{
            backgroundColor: isLight ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.15)',
            borderColor: isLight ? 'rgba(245,158,11,0.3)' : 'rgba(99,102,241,0.3)',
            color: isLight ? '#d97706' : '#a5b4fc'
          }}
          title={isLight ? 'Switch to Elegant Dark Mode' : 'Switch to Light Mode'}
        >
          {isLight ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-medium hidden md:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-medium hidden md:inline">Dark</span>
            </>
          )}
        </button>

        {/* Network Indicator */}
        <div className="hidden sm:flex p-1.5 rounded-md transition-colors"
          style={{ color: 'var(--accent)' }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Online: Cloud Engine Connected">
          <Wifi className="w-3.5 h-3.5" />
        </div>

        {/* Battery Indicator */}
        <div className="hidden md:flex p-1.5 rounded-md items-center gap-1 transition-colors"
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--surface-2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Battery: 98% (Power Source Attached)">
          <Battery className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
          <span className="text-[10px] hidden lg:inline opacity-70" style={{ color: 'var(--text-secondary)' }}>98%</span>
        </div>

        {/* Quick Settings Dropdown Trigger */}
        <button
          onClick={() => {
            setIsQuickSettingsOpen(!isQuickSettingsOpen);
            setIsNotificationsOpen(false);
          }}
          className="p-1.5 rounded-md transition-colors"
          style={{ 
            backgroundColor: isQuickSettingsOpen ? 'var(--surface-2)' : 'transparent',
            color: isQuickSettingsOpen ? 'var(--text-primary)' : 'var(--text-secondary)' 
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = isQuickSettingsOpen ? 'var(--surface-2)' : 'transparent'; }}
          title="Quick Settings"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>

        {/* User Profile Quick Trigger Button */}
        <button
          onClick={() => setShowProfileModal(!showProfileModal)}
          className="hidden lg:flex items-center gap-1.5 p-1 px-1.5 rounded-md transition-colors border glass-surface"
          style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-1)'; }}
          title="Srinidhi N S — View Developer Profile"
        >
          <img
            src={srinidhiPhoto}
            alt={PERSONAL_INFO.name}
            className="w-4 h-4 rounded-full object-cover object-top border"
            style={{ borderColor: 'var(--accent)' }}
          />
          <span className="text-[10px] font-semibold hidden xl:inline">Srinidhi</span>
        </button>

        {/* Notifications Bell Trigger */}
        <button
          onClick={() => {
            setIsNotificationsOpen(!isNotificationsOpen);
            setIsQuickSettingsOpen(false);
          }}
          className="relative p-1.5 rounded-md transition-colors"
          style={{ 
            backgroundColor: isNotificationsOpen ? 'var(--surface-2)' : 'transparent',
            color: isNotificationsOpen ? 'var(--text-primary)' : 'var(--text-secondary)' 
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = isNotificationsOpen ? 'var(--surface-2)' : 'transparent'; }}
          title="Notifications Center"
        >
          <Bell className="w-3.5 h-3.5" />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          )}
        </button>
      </div>

      {/* User Profile Detail Modal */}
      <UserProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </header>
  );
};
