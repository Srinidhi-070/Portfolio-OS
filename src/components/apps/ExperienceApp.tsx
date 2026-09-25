import React from 'react';
import { EXPERIENCES } from '../../data/portfolioData';
import { useOS } from '../../context/OSContext';
import { getAccentClasses } from '../../lib/theme';
import { Briefcase, Building, Calendar, MapPin, CheckCircle2, TrendingUp, Award, Check } from 'lucide-react';

export const ExperienceApp: React.FC = () => {
  const { accentColor, theme } = useOS();
  const accent = getAccentClasses(accentColor);
  const isLight = theme === 'arctic-light';

  return (
    <div className={`p-6 max-w-4xl mx-auto space-y-8 select-none `}>
      {/* Header */}
      <div className="pb-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
             style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
          <Briefcase className="w-3.5 h-3.5" /> Career & Internship History
        </div>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Work Experience & Leadership</h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Product Operations Intern & AI Engineering Project Leader.</p>
      </div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {EXPERIENCES.map(exp => (
          <div key={exp.id} className="p-6 rounded-2xl glass-card space-y-5 shadow-xl">
            {/* Role Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <div>
                <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
                  {exp.type}
                </span>
                <h2 className="text-lg font-extrabold mt-1" style={{ color: 'var(--text-primary)' }}>{exp.role}</h2>
                <div className="text-xs font-semibold flex items-center gap-1.5 mt-0.5" style={{ color: 'var(--accent)' }}>
                  <Building className="w-3.5 h-3.5" /> {exp.company}
                </div>
              </div>

              <div className="text-right text-xs space-y-1" style={{ color: 'var(--text-secondary)' }}>
                <div className="flex items-center gap-1 sm:justify-end font-mono" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} /> {exp.period}
                </div>
                <div className="flex items-center gap-1 sm:justify-end">
                  <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} /> {exp.location}
                </div>
              </div>
            </div>

            {/* Impact Metrics Badges if present */}
            {exp.impactMetrics && (
              <div className="grid grid-cols-2 gap-3">
                {exp.impactMetrics.map(m => (
                  <div key={m.label} className="p-3 rounded-xl glass-surface text-center">
                    <div className="text-xl font-black" style={{ color: 'var(--accent)' }}>{m.value}</div>
                    <div className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Responsibilities */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Key Responsibilities
              </h4>
              <ul className="space-y-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: 'var(--accent)' }}>•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Award className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Highlight Achievements
              </h4>
              <ul className="space-y-1.5 text-xs leading-relaxed p-3.5 rounded-xl"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--text-secondary)' }}>
                {exp.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-3 h-3 shrink-0" style={{ color: 'var(--accent)' }} />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.skills.map(s => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-lg glass-surface" style={{ color: 'var(--text-secondary)' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
