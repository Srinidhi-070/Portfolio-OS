import React from 'react';
import { EDUCATION } from '../../data/portfolioData';
import { GraduationCap, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export const EducationApp: React.FC = () => {
  const { theme } = useOS();
  const isLight = theme === 'vercel-light';

  return (
    <div className={`p-6 max-w-4xl mx-auto space-y-8 select-none `}>
      {/* Header */}
      <div className="pb-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2"
             style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
          <GraduationCap className="w-3.5 h-3.5" /> Academic Qualifications
        </div>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Education & Coursework</h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Specialization in Artificial Intelligence & Data Science.</p>
      </div>

      {/* Education Cards */}
      <div className="space-y-6">
        {EDUCATION.map(edu => (
          <div key={edu.id} className="p-6 rounded-2xl glass-card space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <div>
                <h2 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h2>
                <div className="text-xs font-semibold mt-1" style={{ color: 'var(--accent)' }}>{edu.institution}</div>
              </div>

              <div className="text-right text-xs space-y-1">
                <div className="font-mono" style={{ color: 'var(--text-secondary)' }}>{edu.period}</div>
                {edu.grade && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full font-semibold text-[11px]"
                        style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)', borderColor: 'var(--accent-subtle)' }}>
                    {edu.grade}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{edu.description}</p>

            {/* Coursework */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Core Specialized Coursework
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {edu.coursework.map((course, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl glass-surface text-xs flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--accent)' }} />
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Award className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Key Honors & Accomplishments
              </h4>
              <ul className="space-y-1.5 text-xs leading-relaxed p-3.5 rounded-xl"
                  style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--text-secondary)' }}>
                {edu.achievements.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: 'var(--accent)' }}>★</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
