import React from 'react';
import { RippleBackground } from './RippleBackground';

/**
 * Animated mesh-gradient background using pure CSS.
 * Augmented with the Aceternity Ripple Effect.
 */
export const InteractiveBackground: React.FC = () => {
  return (
    <>
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
        <div className="mesh-orb mesh-orb-4" />
      </div>
      <RippleBackground />
    </>
  );
};
