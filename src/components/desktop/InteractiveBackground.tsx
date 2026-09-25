import React from 'react';
import { BackgroundRippleEffect } from '../ui/background-ripple-effect';
import { useOS } from '../../context/OSContext';

export const InteractiveBackground: React.FC = () => {
  const { theme } = useOS();
  const isNeoBrutal = theme === 'neo-brutal';

  if (isNeoBrutal) {
    return null;
  }

  return (
    <>
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-orb mesh-orb-4" />
      </div>
      <BackgroundRippleEffect />
    </>
  );
};