
import React, { useState } from 'react';
import { CERTIFICATIONS } from '../../data/portfolioData';
import { Award, GraduationCap, BookOpen, BrainCircuit, Code, ExternalLink, ShieldCheck, BarChart3, Bot, X } from 'lucide-react';
import { useOS } from '../../context/OSContext';

const ICON_MAP: Record<string, React.FC<any>> = {
  Award,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  Code,
  BarChart3,
  Bot
};

export const CertificationsApp: React.FC = () => {
  const { theme } = useOS();
  const [selectedCertUrl, setSelectedCertUrl] = useState<string | null>(null);

  const handleOpenPreview = (url: string) => {
    // Convert Google Drive view URL to preview URL for iframe embedding
    const previewUrl = url.replace('/view?usp=sharing', '/preview');
    setSelectedCertUrl(previewUrl);
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 sm:space-y-8 select-none relative h-full flex flex-col">
      {/* Header */}
      <div className="pb-4 border-b shrink-0" style={{ borderColor: 'var(--glass-border)' }}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
             style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
          <ShieldCheck className="w-3.5 h-3.5" /> Verified Credentials
        </div>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Certifications & Degrees</h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Degrees, Diplomas, and professional certifications I've earned.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 flex-1 overflow-y-auto os-scrollbar pb-10">
        {CERTIFICATIONS.map((cert) => {
          const Icon = cert.icon ? (ICON_MAP[cert.icon] || Award) : Award;
          const isDegree = cert.type === 'Degree' || cert.type === 'Diploma';
          
          return (
            <div 
              key={cert.id} 
              className="relative p-1 rounded-2xl transition-all duration-300 hover:scale-[1.02] group shrink-0"
              style={{
                background: isDegree 
                  ? 'linear-gradient(135deg, var(--accent) 0%, transparent 100%)' 
                  : 'var(--glass-border)'
              }}
            >
              <div className="h-full w-full glass-card p-5 sm:p-6 flex flex-col justify-between" style={{ borderRadius: 'calc(var(--radius-xl) - 4px)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--surface-1)' }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  <span 
                    className="px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full border"
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
                  <h3 className="text-base sm:text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                    {cert.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-medium flex items-center justify-between" style={{ color: 'var(--accent)' }}>
                    <span>{cert.issuer}</span>
                    <span className="text-[10px] sm:text-xs opacity-70" style={{ color: 'var(--text-secondary)' }}>{cert.date}</span>
                  </div>
                  {cert.description && (
                    <p className="text-xs leading-relaxed mt-2 sm:mt-3" style={{ color: 'var(--text-secondary)' }}>
                      {cert.description}
                    </p>
                  )}
                </div>

                {cert.credentialUrl && (
                  <button 
                    onClick={() => handleOpenPreview(cert.credentialUrl!)}
                    className="flex items-center gap-2 text-xs font-semibold w-full justify-center p-2 rounded-xl transition-colors active:scale-95 hover:brightness-110"
                    style={{ backgroundColor: 'var(--surface-hover)', color: 'var(--text-primary)' }}
                  >
                    Preview Credential <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Document Preview Modal */}
      {selectedCertUrl && (
        <div className="absolute inset-0 z-50 flex flex-col glass-panel-heavy rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="h-12 border-b flex items-center justify-between px-4 shrink-0" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--surface-1)' }}>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>Document Viewer</span>
            <button 
              onClick={() => setSelectedCertUrl(null)}
              className="p-1.5 rounded-lg transition-colors hover:bg-red-500/20 hover:text-red-500"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 w-full bg-black/5">
            <iframe 
              src={selectedCertUrl} 
              className="w-full h-full border-none"
              allow="autoplay"
              title="Certificate Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
};
