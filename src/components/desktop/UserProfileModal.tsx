import React from 'react';
import { createPortal } from 'react-dom';
import { PERSONAL_INFO, EDUCATION, EXPERIENCES } from '../../data/portfolioData';
import { useOS } from '../../context/OSContext';
import bannerImg from '../../assets/images/banner.png';
import { X, Mail, Phone, MapPin, Github, Linkedin, Award, Briefcase, GraduationCap, ExternalLink, Sparkles, FileText, Terminal as TerminalIcon } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { theme, openApp, addNotification } = useOS();
  const isLight = theme === 'arctic-light';

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addNotification('Copied', `${label} copied to clipboard!`, 'info');
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-fade-in" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} onClick={onClose}>
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 animate-scale-in glass-panel-heavy"
        style={{ color: 'var(--text-primary)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl transition-colors z-20 glass-surface hover:bg-[var(--surface-2)]"
          style={{ color: 'var(--text-primary)' }}
          aria-label="Close Profile"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="overflow-y-auto os-scrollbar flex-1">
        {/* Modal Header Banner */}
        <div className="relative h-32 w-full overflow-hidden">
          <img src={bannerImg} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        </div>

        {/* Profile Card Body */}
        <div className="px-6 pb-6 relative -mt-14 space-y-6">
          {/* Avatar & Key Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative group">
                <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-lg)', padding: 3, background: 'var(--glass-border-active)', width: 'fit-content' }}>
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-24 h-28 sm:w-28 sm:h-32 object-cover object-top transition-transform group-hover:scale-105"
                    style={{ borderRadius: 'calc(var(--radius-lg) - 3px)' }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--surface-0)' }}>
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

              <div className="space-y-1 pb-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold accent-text" style={{ backgroundColor: 'var(--accent-subtle)', borderColor: 'rgba(var(--accent), 0.3)' }}>
                  <Award className="w-3 h-3" /> AI & Data Science
                </div>
                <h2 className="text-2xl font-black tracking-tight">{PERSONAL_INFO.name}</h2>
                <p className="text-xs font-semibold accent-text">{PERSONAL_INFO.title}</p>
              </div>
            </div>

            {/* Direct Social Links */}
            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors glass-surface hover:bg-[var(--surface-2)]"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors glass-surface hover:bg-[var(--surface-2)]"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <Linkedin className="w-4 h-4" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Contact & Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-xl border glass-surface" style={{ borderColor: 'var(--glass-border)' }}>
            <button
              onClick={() => handleCopy(PERSONAL_INFO.phone, 'Phone number')}
              className="p-2 rounded-lg text-left transition-colors flex items-center gap-2 text-xs hover:bg-[var(--surface-2)]"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <div className="truncate">
                <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Phone</div>
                <div className="font-mono font-semibold">{PERSONAL_INFO.phone}</div>
              </div>
            </button>

            <button
              onClick={() => handleCopy(PERSONAL_INFO.email, 'Email address')}
              className="p-2 rounded-lg text-left transition-colors flex items-center gap-2 text-xs hover:bg-[var(--surface-2)]"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
              <div className="truncate">
                <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Email</div>
                <div className="font-mono font-semibold truncate">{PERSONAL_INFO.email}</div>
              </div>
            </button>

            <div className="p-2 rounded-lg flex items-center gap-2 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
              <div className="truncate">
                <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Location</div>
                <div className="font-semibold">{PERSONAL_INFO.location}</div>
              </div>
            </div>
          </div>

          {/* Bio Summary */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>About Me</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education & Experience Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education */}
            <div className="p-3.5 rounded-xl border space-y-2.5 glass-surface" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)]">
                <GraduationCap className="w-4 h-4" /> Education
              </div>
              {EDUCATION.map(edu => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-semibold">{edu.degree}</div>
                  <div className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{edu.institution}</div>
                  <div className="flex justify-between text-[10px] font-mono" style={{ color: 'var(--text-tertiary)' }}>
                    <span>{edu.period}</span>
                    <span className="text-[var(--accent)] font-bold">{edu.grade}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="p-3.5 rounded-xl border space-y-2.5 glass-surface" style={{ borderColor: 'var(--glass-border)' }}>
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent)]">
                <Briefcase className="w-4 h-4" /> Latest Roles
              </div>
              {EXPERIENCES.map(exp => (
                <div key={exp.id} className="text-xs space-y-0.5">
                  <div className="font-semibold">{exp.role}</div>
                  <div className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{exp.company} ({exp.location})</div>
                  <div className="text-[10px] font-mono" style={{ color: 'var(--text-tertiary)' }}>{exp.period}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t" style={{ borderColor: 'var(--glass-border)' }}>
            <div className="text-[11px] font-mono" style={{ color: 'var(--text-secondary)' }}>
              Status: Available for AI Engineering & Product Roles
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  openApp('resume');
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg btn-accent transition-all"
              >
                <FileText className="w-3.5 h-3.5" /> View Resume
              </button>
              <button
                onClick={() => {
                  openApp('terminal');
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-colors glass-surface hover:bg-[var(--surface-2)]"
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <TerminalIcon className="w-3.5 h-3.5" /> Warp CLI
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

