import React from 'react';
import { useOS } from '../../../context/OSContext';
import { Github, GitCommit, Star, GitPullRequest } from 'lucide-react';
import { PERSONAL_INFO } from '../../../data/portfolioData';

export const GitHubWidget: React.FC = () => {
  const { theme } = useOS();

  return (
    <div className="w-96 sm:w-[26rem] p-4 widget-3d pointer-events-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
          <span className="text-[10px] uppercase font-bold tracking-widest" style={{ color: 'var(--text-tertiary)' }}>GitHub Activity</span>
        </div>
        <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
          @Srinidhi-070
        </a>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 flex flex-col items-center justify-center py-2 glass-surface rounded-xl border border-[var(--glass-border)]">
          <GitCommit className="w-4 h-4 mb-1" style={{ color: 'var(--accent)' }} />
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Commits</span>
          <span className="text-sm font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>1,248</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center py-2 glass-surface rounded-xl border border-[var(--glass-border)]">
          <Star className="w-4 h-4 mb-1" style={{ color: '#fbbf24' }} />
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>Stars</span>
          <span className="text-sm font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>84</span>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center py-2 glass-surface rounded-xl border border-[var(--glass-border)]">
          <GitPullRequest className="w-4 h-4 mb-1" style={{ color: '#3b82f6' }} />
          <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>PRs</span>
          <span className="text-sm font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>16+</span>
        </div>
      </div>
    </div>
  );
};