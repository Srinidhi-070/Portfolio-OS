import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';
import { APPS_METADATA, PROJECTS, SKILL_CATEGORIES } from '../../data/portfolioData';
import {
  Search,
  FolderGit2,
  Cpu,
  Terminal,
  Mail,
  FileText,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openApp, theme } = useOS();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLight = theme === 'arctic-light';

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  // Compile search items
  const appItems = APPS_METADATA.map(a => ({
    id: `app-${a.id}`,
    title: a.title,
    subtitle: a.description,
    type: 'Application',
    icon: a.icon,
    action: () => { openApp(a.id); setIsSearchOpen(false); }
  }));

  const projectItems = PROJECTS.map(p => ({
    id: `proj-${p.id}`,
    title: p.title,
    subtitle: `${p.category} • ${p.techStack.slice(0, 3).join(', ')}`,
    type: 'Project',
    icon: 'FolderGit2',
    action: () => { openApp('projects', { projectId: p.id }); setIsSearchOpen(false); }
  }));

  const skillItems: any[] = [];
  SKILL_CATEGORIES.forEach(cat => {
    cat.skills.forEach(s => {
      skillItems.push({
        id: `skill-${s.name}`,
        title: s.name,
        subtitle: `${cat.name} • Proficiency ${s.level}%`,
        type: 'Skill',
        icon: 'Cpu',
        action: () => { openApp('skills'); setIsSearchOpen(false); }
      });
    });
  });

  const actionItems = [
    {
      id: 'action-resume',
      title: 'Download / View Resume',
      subtitle: 'Open PDF viewer and quick export',
      type: 'Action',
      icon: 'FileText',
      action: () => { openApp('resume'); setIsSearchOpen(false); }
    },
    {
      id: 'action-contact',
      title: 'Contact Srinidhi N S',
      subtitle: 'Send direct message or email',
      type: 'Action',
      icon: 'Mail',
      action: () => { openApp('contact'); setIsSearchOpen(false); }
    },
    {
      id: 'action-terminal',
      title: 'Run Terminal Command (neofetch)',
      subtitle: 'Launch Warp Terminal CLI',
      type: 'Action',
      icon: 'Terminal',
      action: () => { openApp('terminal'); setIsSearchOpen(false); }
    }
  ];

  const allItems = [...appItems, ...projectItems, ...skillItems, ...actionItems];

  const filtered = query.trim() === ''
    ? allItems.slice(0, 10)
    : allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <div
      onClick={() => setIsSearchOpen(false)}
      className="fixed inset-0 z-[80] flex items-start justify-center pt-20 px-4 animate-fade-in"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl glass-panel-heavy rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-in"
        style={{ color: 'var(--text-primary)' }}
      >
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--surface-0)' }}>
          <Search className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={handleKeyDown}
            placeholder="Type to search projects, skills, commands, resume..."
            className="flex-1 glass-input focus:outline-none bg-transparent"
            style={{ color: 'var(--text-primary)' }}
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: 'var(--text-primary)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-1 os-scrollbar">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>
              No matching results found for "{query}". Try searching 'GuardianVoice', 'PyTorch', or 'Resume'.
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-100`}
                  style={{
                    backgroundColor: isSelected ? 'var(--surface-2)' : 'transparent',
                    border: `1px solid ${isSelected ? 'var(--glass-border)' : 'transparent'}`,
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)'
                  }}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-2 rounded-lg glass-surface" style={{ color: 'var(--text-secondary)' }}>
                      {item.type === 'Project' && <FolderGit2 className="w-4 h-4 text-amber-400" />}
                      {item.type === 'Skill' && <Cpu className="w-4 h-4 text-cyan-400" />}
                      {item.type === 'Application' && <Sparkles className="w-4 h-4 text-emerald-400" />}
                      {item.type === 'Action' && <ArrowRight className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</div>
                      <div className="text-[11px] truncate" style={{ color: 'var(--text-secondary)' }}>{item.subtitle}</div>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded glass-surface font-mono" style={{ color: 'var(--text-secondary)' }}>
                    {item.type}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Keyboard Hints */}
        <div className="px-4 py-2 border-t text-[11px] flex items-center justify-between" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--surface-0)', color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 glass-surface rounded-md font-mono border" style={{ borderColor: 'var(--glass-border)' }}>↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 glass-surface rounded-md font-mono border" style={{ borderColor: 'var(--glass-border)' }}>↵</kbd> Select</span>
            <span><kbd className="px-1.5 py-0.5 glass-surface rounded-md font-mono border" style={{ borderColor: 'var(--glass-border)' }}>ESC</kbd> Close</span>
          </div>
          <span className="hidden sm:inline font-semibold accent-text">Portfolio OS Search</span>
        </div>
      </div>
    </div>
  );
};

