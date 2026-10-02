
import React from 'react';
import { CERTIFICATIONS } from '../../data/portfolioData';
import { Award, GraduationCap, BookOpen, BrainCircuit, Code, ExternalLink, ShieldCheck } from 'lucide-react';
import { useOS } from '../../context/OSContext';

const ICON_MAP: Record<string, React.FC<any>> = {
  Award,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  Code
};

export const CertificationsApp: React.FC = () => {
  const { theme } = useOS();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 select-none">
      {/* Header */}
      <div className="pb-4 border-b" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
             style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
          <ShieldCheck className="w-3.5 h-3.5" /> Verified Credentials
        </div>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Certifications & Degrees</h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Degrees, Diplomas, and professional certifications I've earned.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CERTIFICATIONS.map((cert, idx) => {
          const Icon = cert.icon ? (ICON_MAP[cert.icon] || Award) : Award;
          const isDegree = cert.type === 'Degree' || cert.type === 'Diploma';
          
          return (
            <div 
              key={cert.id} 
              className="relative p-1 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
              style={{
                background: isDegree 
                  ? 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)' 
                  : 'var(--glass-border)'
              }}
            >
              <div className="h-full w-full glass-card p-6 flex flex-col justify-between" style={{ borderRadius: 'calc(var(--radius-xl) - 4px)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--surface-1)' }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <span 
                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border"
                    style={{ 
                      backgroundColor: 'var(--surface-0)', 
                      color: 'var(--text-secondary)',
                      borderColor: 'var(--glass-border)' 
                    }}
                  >
                    {cert.type}
                  </span>
                </div>

                <div className="space-y-2 mb-6 flex-1">
                  <h3 className="text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {cert.title}
                  </h3>
                  <div className="text-sm font-medium flex items-center justify-between" style={{ color: 'var(--accent)' }}>
                    <span>{cert.issuer}</span>
                    <span className="text-xs opacity-70" style={{ color: 'var(--text-secondary)' }}>{cert.date}</span>
                  </div>
                  {cert.description && (
                    <p className="text-xs leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
                      {cert.description}
                    </p>
                  )}
                </div>

                {cert.credentialUrl && (
                  <button className="flex items-center gap-2 text-xs font-semibold w-full justify-center p-2 rounded-xl transition-colors"
                    style={{ backgroundColor: 'var(--surface-hover)', color: 'var(--text-primary)' }}>
                    View Credential <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
