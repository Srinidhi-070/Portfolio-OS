import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { useOS } from '../../context/OSContext';
import { getAccentClasses } from '../../lib/theme';
import {
  Cpu,
  BrainCircuit,
  Server,
  Layout,
  Cloud,
  Database,
  CheckCircle2,
  Search,
  Zap,
  Layers,
  PieChart
} from 'lucide-react';
import { SearchField } from '@heroui/react';

const CATEGORY_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  BrainCircuit,
  Server,
  Layout,
  Cloud,
  Database,
  CheckCircle2
};

export const SkillsApp: React.FC = () => {
  const { accentColor, theme } = useOS();
  const accent = getAccentClasses(accentColor);
  const isLight = theme === 'arctic-light';

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allSkills = SKILL_CATEGORIES.flatMap(c => c.skills.map(s => ({ ...s, categoryName: c.name })));
  const topSkills = allSkills.filter(s => s.isTopSkill);

  return (
    <div className={`p-6 max-w-5xl mx-auto space-y-8 select-none `}>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4" style={{ borderBottom: '1px solid var(--glass-border)' }}>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2 border"
               style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
            <Cpu className="w-3.5 h-3.5" /> Technical Competency Matrix
          </div>
          <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Skills & Specializations</h1>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Deep Learning, Computer Vision, Backend Services, Cloud & Product Operations.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          {/* @ts-ignore */}
          <SearchField 
            fullWidth
            value={searchQuery}
            onChange={setSearchQuery}
            className="w-full"
          >
            {/* @ts-ignore */}
            <SearchField.Group className="flex items-center w-full rounded-xl glass-input border border-[var(--glass-border)] text-xs focus:outline-none">
              <SearchField.SearchIcon className="w-4 h-4 ml-3 text-[var(--text-tertiary)]" />
              {/* @ts-ignore */}
              <SearchField.Input
                // @ts-ignore
                placeholder="Search skills (e.g. PyTorch)..."
                className="w-full pl-2 pr-3 py-2 bg-transparent text-[var(--text-primary)] focus:outline-none"
              />
              {/* @ts-ignore */}
              <SearchField.ClearButton className="mr-3 opacity-60 hover:opacity-100 text-[var(--text-primary)]" />
            </SearchField.Group>
          </SearchField>
        </div>
      </div>

      {/* Top Skills Spotlight */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
          <Zap className="w-4 h-4 text-amber-500" /> Primary Engineering Stack
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {topSkills.map(skill => (
            <div key={skill.name} className="p-3.5 rounded-2xl glass-card transition-all space-y-2 shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                <span className="truncate">{skill.name}</span>
                <span className="font-mono text-[11px]" style={{ color: 'var(--accent)' }}>{skill.level}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface-3)' }}>
                <div className={`h-full rounded-full skill-bar-fill ${accent.bg}`} style={{ width: `${skill.level}%` }} />
              </div>
              {skill.experienceYears && (
                <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{skill.experienceYears} Experience</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-6">
        {SKILL_CATEGORIES.map(cat => {
          const IconComp = CATEGORY_ICON_MAP[cat.icon] || Cpu;
          const filteredCategorySkills = cat.skills.filter(s =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()))
          );

          if (filteredCategorySkills.length === 0) return null;

          return (
            <div key={cat.id} className="p-5 rounded-2xl glass-card space-y-4">
              <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <div className="p-2 rounded-xl glass-surface" style={{ color: 'var(--accent)' }}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{cat.name}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{cat.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCategorySkills.map(skill => (
                  <div key={skill.name} className="p-3.5 rounded-xl glass-surface border border-[var(--glass-border)] space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                      <span>{skill.name}</span>
                      <span className="font-mono" style={{ color: 'var(--accent)' }}>{skill.level}%</span>
                    </div>

                    <div className="w-full h-2 rounded-full overflow-hidden p-0.5" style={{ backgroundColor: 'var(--surface-3)' }}>
                      <div className={`h-full rounded-full skill-bar-fill ${accent.bg}`} style={{ width: `${skill.level}%` }} />
                    </div>

                    {skill.description && (
                      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
