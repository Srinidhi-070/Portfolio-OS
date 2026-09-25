import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useOS } from '../../context/OSContext';
import bannerImg from '../../assets/images/banner.png';
import { User, Mail, Phone, MapPin, Github, Linkedin, FileText, Sparkles, ExternalLink, Award } from 'lucide-react';

interface UserProfileCardProps {
  compact?: boolean;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ compact = false }) => {
  const { openApp, theme, addNotification } = useOS();
  const isLight = theme === 'arctic-light';

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    addNotification('Email Copied', 'Copied email to clipboard!', 'info');
  };

  return (
    <div className="w-full transition-all duration-200">
      {/* Header Banner */}
      <div className="relative h-20 w-full flex items-end p-3 overflow-hidden">
        <img src={bannerImg} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
      </div>

      <div className="p-4 relative -mt-8 space-y-3">
        {/* User Avatar + Title */}
        <div className="flex items-end gap-3">
          <div className="relative group">
            <div className="relative overflow-hidden" style={{ borderRadius: 'var(--radius-md)', padding: 3, background: 'var(--glass-border-active)', width: 'fit-content' }}>
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                className="w-16 h-20 object-cover object-top"
                style={{ borderRadius: 'calc(var(--radius-md) - 3px)' }}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--surface-0)' }} />
          </div>

          <div className="space-y-0.5 pb-0.5 min-w-0">
            <h3 className="font-extrabold text-sm tracking-tight truncate" style={{ color: 'var(--text-primary)' }}>{PERSONAL_INFO.name}</h3>
            <p className="text-[11px] font-semibold accent-text leading-snug">{PERSONAL_INFO.title}</p>
            <div className="text-[10px] flex items-center gap-1 truncate" style={{ color: 'var(--text-secondary)' }}>
              <MapPin className="w-2.5 h-2.5 shrink-0" /> {PERSONAL_INFO.location}
            </div>
          </div>
        </div>

        {/* Bio snippet */}
        <p className="text-[11px] leading-snug line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {PERSONAL_INFO.bio}
        </p>

        {/* Contact Badges */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono">
          <button
            onClick={copyEmail}
            className="p-1.5 rounded-lg border flex items-center gap-1.5 truncate text-left transition-colors glass-surface hover:bg-[var(--surface-2)]"
            style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
          >
            <Mail className="w-3 h-3 shrink-0" style={{ color: 'var(--accent)' }} />
            <span className="truncate">{PERSONAL_INFO.email}</span>
          </button>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-lg border flex items-center gap-1.5 truncate transition-colors glass-surface hover:bg-[var(--surface-2)]"
            style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
          >
            <Github className="w-3 h-3 shrink-0" style={{ color: 'var(--text-secondary)' }} />
            <span className="truncate">Srinidhi-070</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="pt-1 flex items-center gap-2">
          <button
            onClick={() => openApp('resume')}
            className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md btn-accent transition-all"
          >
            <FileText className="w-3.5 h-3.5" /> View Resume
          </button>
          <button
            onClick={() => openApp('contact')}
            className="py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all glass-surface hover:bg-[var(--surface-2)]"
            style={{ borderColor: 'var(--glass-border)', color: 'var(--text-primary)' }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

