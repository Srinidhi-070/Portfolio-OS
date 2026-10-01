import React, { useState, useEffect } from 'react';

export const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dateStr = time.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });

  const hDeg = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;
  const mDeg = time.getMinutes() * 6;
  const sDeg = time.getSeconds() * 6;

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex flex-col gap-0.5">
        <span className="text-[9px] uppercase font-bold tracking-[0.15em]" style={{ color: 'var(--text-tertiary)' }}>
          Local Time
        </span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold tabular-nums" style={{ color: 'var(--text-primary)' }}>
            {hours}:{minutes}
          </span>
          <span className="text-sm tabular-nums" style={{ color: 'var(--text-tertiary)' }}>
            {seconds}
          </span>
        </div>
        <span className="text-[10px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{dateStr}</span>
      </div>

      {/* Mini Analog Clock */}
      <div
        className="relative w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'var(--surface-2)' }}
      >
        <div className="absolute w-1 h-1 rounded-full z-10" style={{ backgroundColor: 'var(--accent)' }} />
        <div
          className="absolute w-[1.5px] rounded-full origin-bottom"
          style={{
            height: '12px', bottom: '50%', left: 'calc(50% - 0.75px)',
            backgroundColor: 'var(--text-primary)', transform: `rotate(${hDeg}deg)`,
          }}
        />
        <div
          className="absolute w-[1px] rounded-full origin-bottom"
          style={{
            height: '16px', bottom: '50%', left: 'calc(50% - 0.5px)',
            backgroundColor: 'var(--text-secondary)', transform: `rotate(${mDeg}deg)`,
          }}
        />
        <div
          className="absolute w-[0.5px] rounded-full origin-bottom"
          style={{
            height: '18px', bottom: '50%', left: 'calc(50% - 0.25px)',
            backgroundColor: 'var(--accent)', transform: `rotate(${sDeg}deg)`,
          }}
        />
      </div>
    </div>
  );
};