import React from 'react';
import { BackgroundRippleEffect } from '../ui/background-ripple-effect';

export const InteractiveBackground: React.FC = () => {
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
