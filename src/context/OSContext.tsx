import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  AppID,
  WindowState,
  SystemNotification,
  ThemeMode,
  AccentColor,
  WallpaperOption
} from '../types';
import { APPS_METADATA, WALLPAPERS } from '../data/portfolioData';
import { soundEngine } from '../hooks/useSound';
import { applyThemeVariables } from '../lib/theme';

interface OSContextType {
  // Window Management
  windows: WindowState[];
  activeWindowId: string | null;
  openApp: (appId: AppID, params?: any) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
  closeAllWindowInstances: () => void;

  // OS State
  isBooting: boolean;
  finishBoot: () => void;
  isLocked: boolean;
  setLocked: (locked: boolean) => void;

  // Drawers & Overlays
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isQuickSettingsOpen: boolean;
  setIsQuickSettingsOpen: (open: boolean) => void;

  // Notifications
  notifications: SystemNotification[];
  addNotification: (title: string, message: string, type?: 'info' | 'success' | 'alert' | 'system', actionAppId?: AppID) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;

  // Settings & Theme
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  accentColor: AccentColor;
  setAccentColor: (accent: AccentColor) => void;
  wallpaper: WallpaperOption;
  setWallpaper: (wallpaper: WallpaperOption) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'n1',
    title: 'Welcome to Portfolio OS',
    message: 'Double-click any desktop icon to open apps, or use the bottom Dock to navigate quickly.',
    time: 'Just now',
    read: false,
    type: 'success'
  },
  {
    id: 'n2',
    title: 'Pro Tip: Try Right-Clicking',
    message: 'Right-click anywhere on the empty desktop background to access quick settings, theme toggler, and view source.',
    time: '1m ago',
    read: false,
    type: 'info'
  },
  {
    id: 'n3',
    title: 'Hidden Terminal Secrets',
    message: 'Open the Terminal app and type "ai joke", "sudo hire-me", or "ai skills" for some fun surprises!',
    time: '2m ago',
    read: false,
    type: 'alert',
    actionAppId: 'terminal'
  }
];

export const OSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [nextZIndex, setNextZIndex] = useState(10);

  // OS Lifecycle
  const [isBooting, setIsBooting] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  // Overlays
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Customization
  const [theme, setTheme] = useState<ThemeMode>('linear-dark');
  const [accentColor, setAccentColor] = useState<AccentColor>('cyan');
  const [wallpaper, setWallpaper] = useState<WallpaperOption>(WALLPAPERS[0]);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    soundEngine.enabled = enabled;
  };

  // Apply CSS custom properties when theme / accent / wallpaper changes
  useEffect(() => {
    applyThemeVariables(theme, accentColor, wallpaper);
    const root = document.documentElement;
    root.classList.remove('linear-dark', 'vercel-light', 'dracula', 'monochrome', 'tokyo-night', 'arctic-light', 'obsidian', 'midnight-violet', 'cyber-blue', 'emerald-glass');
    root.classList.add(theme);
    root.classList.toggle('reduce-motion', reducedMotion);
  }, [theme, accentColor, wallpaper, reducedMotion]);

  const finishBoot = () => {
    setIsBooting(false);
  };

  // Open default app on boot
  useEffect(() => {
    if (!isBooting && !isLocked && windows.length === 0) {
      // Open Home app by default
      openApp('home');
    }
  }, [isBooting, isLocked]);

  // Window Management
  const focusWindow = useCallback((windowId: string) => {
    setActiveWindowId(windowId);
    setWindows(prev =>
      prev.map(w => {
        if (w.id === windowId) {
          const newZIndex = nextZIndex + 1;
          setNextZIndex(newZIndex);
          return { ...w, zIndex: newZIndex, isMinimized: false };
        }
        return w;
      })
    );
  }, [nextZIndex]);

  const openApp = useCallback((appId: AppID, params?: any) => {
    const appMeta = APPS_METADATA.find(a => a.id === appId);
    if (!appMeta) return;

    // Close overlays
    setIsSearchOpen(false);
    setIsNotificationsOpen(false);
    setIsQuickSettingsOpen(false);

    // Check if window for this app already exists
    const existing = windows.find(w => w.appId === appId);
    if (existing) {
      if (params) {
        setWindows(prev => prev.map(w => w.id === existing.id ? { ...w, params } : w));
      }
      focusWindow(existing.id);
      soundEngine.playClick();
      return;
    }

    // Default window positions & bounds depending on viewport
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    let defaultWidth = Math.min(viewportWidth - 40, appId === 'terminal' ? 860 : appId === 'projects' ? 1040 : 920);
    let defaultHeight = Math.min(viewportHeight - 120, appId === 'terminal' ? 560 : 680);

    // Cascade positioning
    const offset = (windows.length % 5) * 28;
    const initialX = Math.max(20, Math.min((viewportWidth - defaultWidth) / 2 + offset, viewportWidth - defaultWidth - 20));
    const initialY = Math.max(50, Math.min((viewportHeight - defaultHeight) / 2 + offset - 20, viewportHeight - defaultHeight - 60));

    const windowId = `win-${appId}-${Date.now()}`;
    const newZIndex = nextZIndex + 1;
    setNextZIndex(newZIndex);

    const newWindow: WindowState = {
      id: windowId,
      appId,
      title: appMeta.title,
      icon: appMeta.icon,
      isOpen: true,
      isMinimized: false,
      isMaximized: viewportWidth < 768, // Auto-maximize on small screens
      position: { x: initialX, y: initialY },
      size: { width: defaultWidth, height: defaultHeight },
      zIndex: newZIndex,
      params
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindowId(windowId);
    soundEngine.playWindowOpen();
  }, [windows, nextZIndex, focusWindow]);

  const closeWindow = useCallback((windowId: string) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      const remaining = windows.filter(w => w.id !== windowId);
      if (remaining.length > 0) {
        const topWindow = remaining.reduce((max, w) => w.zIndex > max.zIndex ? w : max, remaining[0]);
        setActiveWindowId(topWindow.id);
      } else {
        setActiveWindowId(null);
      }
    }
    soundEngine.playWindowClose();
  }, [windows, activeWindowId]);

  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev =>
      prev.map(w => w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w)
    );
    soundEngine.playClick();
  }, []);

  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev =>
      prev.map(w => w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w)
    );
    soundEngine.playClick();
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w));
  }, []);

  const updateWindowSize = useCallback((id: string, size: { width: number; height: number }) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, size } : w));
  }, []);

  const closeAllWindowInstances = useCallback(() => {
    setWindows([]);
    setActiveWindowId(null);
  }, []);

  // Notifications
  const addNotification = useCallback((title: string, message: string, type: 'info' | 'success' | 'alert' | 'system' = 'info', actionAppId?: AppID) => {
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      read: false,
      type,
      actionAppId
    };
    setNotifications(prev => [newNotif, ...prev]);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Keyboard shortcut listener for Ctrl+K global search & Super key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsQuickSettingsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <OSContext.Provider
      value={{
        windows,
        activeWindowId,
        openApp,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
        closeAllWindowInstances,

        isBooting,
        finishBoot,
        isLocked,
        setLocked: setIsLocked,

        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isQuickSettingsOpen,
        setIsQuickSettingsOpen,

        notifications,
        addNotification,
        markNotificationRead,
        clearNotifications,

        theme,
        setTheme,
        accentColor,
        setAccentColor,
        wallpaper,
        setWallpaper,
        soundEnabled,
        setSoundEnabled,
        reducedMotion,
        setReducedMotion
      }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error('useOS must be used within an OSProvider');
  }
  return context;
};
