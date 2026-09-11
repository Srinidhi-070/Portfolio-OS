import React, { CSSProperties } from "react";
import { useOS } from "../../context/OSContext";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

export const RippleBackground = React.memo(function RippleBackground({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className = "",
}: RippleProps) {
  const { theme } = useOS();
  const isLight = theme === 'arctic-light';
  
  // Base border colors matching ColorHunt variables
  const baseColor = isLight ? "17, 45, 78" : "238, 238, 238"; 

  return (
    <div
      className={`absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)] ${className}`}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full shadow-xl border [--i:${i}]`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `rgba(${baseColor}, ${borderOpacity / 100})`,
                backgroundColor: `rgba(${baseColor}, 0.015)`,
                top: "50%",
                left: "50%",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});
