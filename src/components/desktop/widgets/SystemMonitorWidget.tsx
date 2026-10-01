import React, { useState, useEffect } from 'react';
import { useOS } from '../../../context/OSContext';
import { Cpu, MemoryStick, BatteryMedium } from 'lucide-react';

export const SystemMonitorWidget: React.FC = () => {
  const { theme } = useOS();
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(5, Math.min(100, prev + (Math.random() * 10 - 5))));
      setRamUsage(prev => Math.max(30, Math.min(90, prev + (Math.random() * 4 - 2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-96 sm:w-[26rem] p-4 widget-3d pointer-events-auto">
      <div className="text-[10px] uppercase font-bold tracking-widest mb-3" style={{ color: 'var(--text-tertiary)' }}>System Monitor</div>
      <div className="grid grid-cols-3 gap-2">
        {/* CPU */}
        <div className="flex flex-col items-center p-2 rounded-xl glass-surface border border-[var(--glass-border)]">
          <Cpu className="w-4 h-4 mb-1" style={{ color: 'var(--accent)' }} />
          <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>CPU</div>
          <div className="text-xs font-bold font-mono mt-0.5" style={{ color: 'var(--text-primary)' }}>{cpuUsage.toFixed(1)}%</div>
          <div className="w-full h-1 rounded-full mt-1.5 overflow-hidden" style={{ backgroundColor: 'var(--surface-3)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${cpuUsage}%`, backgroundColor: 'var(--accent)' }} />
          </div>
        </div>

        {/* RAM */}
        <div className="flex flex-col items-center p-2 rounded-xl glass-surface border border-[var(--glass-border)]">
          <MemoryStick className="w-4 h-4 mb-1" style={{ color: 'var(--accent)' }} />
          <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Memory</div>
          <div className="text-xs font-bold font-mono mt-0.5" style={{ color: 'var(--text-primary)' }}>{ramUsage.toFixed(1)}%</div>
          <div className="w-full h-1 rounded-full mt-1.5 overflow-hidden" style={{ backgroundColor: 'var(--surface-3)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${ramUsage}%`, backgroundColor: 'var(--accent)' }} />
          </div>
        </div>

        {/* Battery */}
        <div className="flex flex-col items-center p-2 rounded-xl glass-surface border border-[var(--glass-border)]">
          <BatteryMedium className="w-4 h-4 mb-1" style={{ color: 'var(--accent)' }} />
          <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Battery</div>
          <div className="text-xs font-bold font-mono mt-0.5" style={{ color: 'var(--text-primary)' }}>100%</div>
          <div className="w-full h-1 rounded-full mt-1.5 overflow-hidden" style={{ backgroundColor: 'var(--surface-3)' }}>
            <div className="h-full rounded-full" style={{ width: `100%`, backgroundColor: '#10b981' }} />
          </div>
        </div>
      </div>
    </div>
  );
};