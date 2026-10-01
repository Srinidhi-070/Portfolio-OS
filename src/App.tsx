import React from 'react';
import { OSProvider, useOS } from './context/OSContext';
import { BootScreen } from './components/desktop/BootScreen';
import { LockScreen } from './components/desktop/LockScreen';
import { DesktopEnvironment } from './components/desktop/DesktopEnvironment';
import { MobileEnvironment } from './components/mobile/MobileEnvironment';
import { useIsMobile } from './hooks/useIsMobile';

const OSContent: React.FC = () => {
  const { isBooting, isLocked } = useOS();
  const isMobile = useIsMobile();

  if (isBooting) {
    return <BootScreen />;
  }

  if (isLocked) {
    return <LockScreen />;
  }

  if (isMobile) {
    return <MobileEnvironment />;
  }

  return <DesktopEnvironment />;
};

export function App() {
  return (
    <OSProvider>
      <OSContent />
    </OSProvider>
  );
}

export default App;
