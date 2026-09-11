import React, { useEffect } from 'react';
import { OSProvider, useOS } from './context/OSContext';
import { TopBar } from './components/desktop/TopBar';
import { Desktop } from './components/desktop/Desktop';
import { Dock } from './components/desktop/Dock';
import { Window } from './components/desktop/Window';
import { BootScreen } from './components/desktop/BootScreen';
import { LockScreen } from './components/desktop/LockScreen';
import { CommandPalette } from './components/desktop/CommandPalette';
import { NotificationsCenter } from './components/desktop/NotificationsCenter';
import { AnimatePresence } from 'framer-motion';
import { QuickSettings } from './components/desktop/QuickSettings';

const OSContent: React.FC = () => {
  const { isBooting, isLocked, windows, theme } = useOS();

  if (isBooting) {
    return <BootScreen />;
  }

  if (isLocked) {
    return <LockScreen />;
  }

  return (
    <div className={`relative w-screen h-screen overflow-hidden select-none font-sans ${theme === 'arctic-light' ? 'arctic-light' : ''}`} style={{ background: 'var(--surface-0)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
      {/* Top Bar */}
      <TopBar />

      {/* Main Desktop Stage */}
      <Desktop />

      {/* Active Application Windows */}
      <AnimatePresence>
        {windows.map(win => (
          <Window key={win.id} windowState={win} />
        ))}
      </AnimatePresence>

      {/* Dock */}
      <Dock />

      {/* Modals & Slideouts */}
      <CommandPalette />
      <NotificationsCenter />
      <QuickSettings />
    </div>
  );
};

export function App() {
  return (
    <OSProvider>
      <OSContent />
    </OSProvider>
  );
}

export default App;
