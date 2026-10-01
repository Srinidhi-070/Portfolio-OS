import React from 'react';
import { Github, GitCommit, Star, GitPullRequest } from 'lucide-react';
import { PERSONAL_INFO } from '../../../data/portfolioData';

export const GitHubWidget: React.FC = () => {
  const stats = [
    { icon: GitCommit, label: 'Commits', value: '1.2k', color: 'var(--accent)' },
    { icon: Star, label: 'Stars', value: '84', color: '#fbbf24' },
    { icon: GitPullRequest, label: 'PRs', value: '16+', color: '#3b82f6' },
  ];

  return (
    <div className="w-full p-4 glass-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Github className="w-3.5 h-3.5" style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-[9px] uppercase font-bold tracking-[0.15em]" style={{ color: 'var(--text-tertiary)' }}>
            GitHub
          </span>
        </div>
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noreferrer"
          className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}
        >
          @Srinidhi-070
        </a>
      </div>

      <div className="flex gap-2 mt-2.5">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl glass-surface">
            <Icon className="w-3.5 h-3.5" style={{ color }} />
            <span className="text-[9px] font-medium" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};