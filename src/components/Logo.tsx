import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 32, className = '' }) => {
  return (
    <img 
      src="/favicon.png" 
      alt="Srinidhi Portfolio OS logo" 
      width={size} 
      height={size} 
      className={className + " object-contain"} 
      style={{ borderRadius: '25%' }}
    />
  );
};

export default Logo;