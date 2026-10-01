import React, { useState, useEffect } from 'react';
import { Cpu, MemoryStick, BatteryFull } from 'lucide-react';

export const SystemMonitorWidget: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(5, Math.min(95, prev + (Math.random() * 10 - 5))));
      setRamUsage(prev => Math.max(30, Math.min(85, prev + (Math.random() * 4 - 2))));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { icon: Cpu, label: 'CPU', value: `${cpuUsage.toFixed(0)}%`, pct: cpuUsage, color: 'var(--accent)' },
    { icon: MemoryStick, label: 'RAM', value: `${ramUsage.toFixed(0)}%`, pct: ramUsage, color: 'var(--accent)' },
    { icon: BatteryFull, label: 'BAT', value: '100%', pct: 100, color: '#10b981' },
  ];

  return (
    <div
      className="w-full p-4 rounded-2xl"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--glass-blur))',
        border: '1px solid var(--glass-border)',
      }}
    >
      <span className="text-[9px] uppercase font-bold tracking-[0.15em] opacity-50" style={{ color: 'var(--text-secondary)' }}>
        System Monitor
      </span>
      <div className="flex gap-2 mt-2.5">
        {items.map(({ icon: Icon, label, value, pct, color }) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl" style={{ background: 'var(--surface-1, rgba(255,255,255,0.03))' }}>
            <Icon className="w-3.5 h-3.5 opacity-60" style={{ color: 'var(--text-secondary)' }} />
            <span className="text-[9px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
            <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{value}</span>
            <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'var(--glass-border)' }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};