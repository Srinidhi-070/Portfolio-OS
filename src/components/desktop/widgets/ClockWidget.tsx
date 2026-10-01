import React, { useState, useEffect } from 'react';
import { useOS } from '../../../context/OSContext';

export const ClockWidget: React.FC = () => {
  const { theme } = useOS();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  
  const dateStr = time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="w-96 sm:w-[26rem] p-6 widget-3d pointer-events-auto flex items-center justify-between">
      <div className="flex flex-col">
        <div className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--accent)' }}>Local Time</div>
        <div className="text-4xl font-light tracking-tighter mt-1" style={{ color: 'var(--text-primary)' }}>
          {hours}:{minutes}<span className="text-xl text-[var(--text-tertiary)] ml-1">{seconds}</span>
        </div>
        <div className="text-xs mt-1 font-medium" style={{ color: 'var(--text-secondary)' }}>{dateStr}</div>
      </div>
      
      {/* Decorative Analog Element */}
      <div className="relative w-16 h-16 rounded-full border-2 flex items-center justify-center glass-surface" style={{ borderColor: 'var(--accent-subtle)' }}>
        <div className="absolute w-1 h-1 rounded-full z-10" style={{ backgroundColor: 'var(--accent)' }} />
        {/* Hour hand */}
        <div 
          className="absolute bottom-1/2 left-1/2 w-0.5 h-4 origin-bottom rounded-full" 
          style={{ backgroundColor: 'var(--text-primary)', transform: `translateX(-50%) rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg)` }}
        />
        {/* Minute hand */}
        <div 
          className="absolute bottom-1/2 left-1/2 w-0.5 h-6 origin-bottom rounded-full" 
          style={{ backgroundColor: 'var(--text-secondary)', transform: `translateX(-50%) rotate(${time.getMinutes() * 6}deg)` }}
        />
        {/* Second hand */}
        <div 
          className="absolute bottom-1/2 left-1/2 w-[1px] h-7 origin-bottom rounded-full" 
          style={{ backgroundColor: 'var(--accent)', transform: `translateX(-50%) rotate(${time.getSeconds() * 6}deg)` }}
        />
      </div>
    </div>
  );
};