import React from 'react';

/**
 * Animated mesh-gradient background using pure CSS.
 * Four large, blurred orbs drift slowly to create a living canvas.
 * Colors are driven by CSS custom properties (--mesh-1 to --mesh-4)
 * which change per wallpaper selection.
 */
export const InteractiveBackground: React.FC = () => {
  return (
    <div className="mesh-bg" aria-hidden="true">
      <div className="mesh-orb mesh-orb-1" />
      <div className="mesh-orb mesh-orb-2" />
      <div className="mesh-orb mesh-orb-3" />
      <div className="mesh-orb mesh-orb-4" />
    </div>
  );
};
