import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types';
import { useOS } from '../../context/OSContext';
import { getAccentClasses } from '../../lib/theme';
import {
  FolderGit2,
  Search,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Cpu,
  Brain,
  X,
  Code2,
  CheckCircle2,
  Grid,
  ListFilter,
  BarChart2,
  Tag
} from 'lucide-react';


interface ProjectsAppProps {
  initialParams?: { projectId?: string };
}

export const ProjectsApp: React.FC<ProjectsAppProps> = ({ initialParams }) => {
  const { accentColor, theme } = useOS();
  const accent = getAccentClasses(accentColor);
  const isLight = theme === 'arctic-light';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (initialParams?.projectId) {
      const found = PROJECTS.find(p => p.id === initialParams.projectId);
      if (found) setActiveProject(found);
    }
  }, [initialParams]);

  const allTechTags = Array.from(new Set(PROJECTS.flatMap(p => p.techStack))).sort();

  const filteredProjects = PROJECTS.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.overview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'All' || p.techStack.includes(selectedTech);
    return matchesCategory && matchesSearch && matchesTech;
  });

  return (
    <div className={`h-full flex flex-col md:flex-row glass-surface  overflow-hidden select-none`}>
      {/* Left Sidebar File Explorer Navigation */}
      <div className="w-full md:w-64 glass-panel border-b md:border-b-0 md:border-r border-[var(--glass-border)] p-4 shrink-0 space-y-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <FolderGit2 className="w-3.5 h-3.5 text-amber-500" /> Repositories Folder
          </div>
          <div className="space-y-1">
            {['All', 'AI / Machine Learning', 'Full Stack Projects'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  selectedCategory === cat
                    ? 'glass-surface border border-[var(--glass-border)]'
                    : 'hover:brightness-110'
                }`}
                style={{
                  color: selectedCategory === cat ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: selectedCategory === cat ? 'var(--surface-2)' : 'transparent'
                }}
              >
                <span>{cat === 'All' ? 'All Repositories (16)' : cat}</span>
                <span className="text-[10px] opacity-70">
                  {cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tech Tag Filters */}
        <div className="hidden md:block">
          <div className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <Tag className="w-3.5 h-3.5 text-cyan-500" /> Filter by Tech
          </div>
          <div className="flex flex-wrap gap-1 max-h-48 overflow-y-auto os-scrollbar pr-1">
            <button
              onClick={() => setSelectedTech('All')}
              className="text-[10px] px-2 py-1 rounded-md transition-all font-bold"
              style={{
                backgroundColor: selectedTech === 'All' ? 'var(--accent)' : 'var(--surface-3)',
                color: selectedTech === 'All' ? (isLight ? 'white' : 'var(--surface-0)') : 'var(--text-secondary)'
              }}
            >
              All Tech
            </button>
            {allTechTags.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className="text-[10px] px-2 py-1 rounded-md transition-all"
                style={{
                  backgroundColor: selectedTech === tech ? 'var(--accent)' : 'var(--surface-3)',
                  color: selectedTech === tech ? (isLight ? 'white' : 'var(--surface-0)') : 'var(--text-secondary)'
                }}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Search & Filter Bar */}
          <div className="p-4 border-b border-[var(--glass-border)] flex items-center gap-3" style={{ border: 'none', borderBottom: '1px solid var(--glass-border)', borderRadius: 0, backgroundColor: 'var(--surface-1)' }}>
            <div className="flex items-center w-full rounded-xl glass-input border border-[var(--glass-border)] text-xs focus-within:border-[var(--accent)] transition-colors">
              <Search className="w-4 h-4 ml-3 text-[var(--text-tertiary)] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 16+ repositories by title, keyword, or tech..."
                className="w-full pl-2 pr-4 py-2 bg-transparent text-[var(--text-primary)] focus:outline-none"
              />
              {searchQuery.length > 0 && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-3 p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-[var(--surface-3)] transition-all text-[var(--text-primary)] shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

        {/* Projects Cards Grid */}
        <div className="flex-1 overflow-y-auto os-scrollbar p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className="group p-4 rounded-2xl glass-card-interactive cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border"
                        style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)', borderColor: 'var(--accent-subtle)' }}>
                    {proj.category === 'AI / Machine Learning' ? 'AI / ML' : 'Full Stack'}
                  </span>
                  {proj.featured && (
                    <span className="text-[10px] px-2 py-0.5 rounded border flex items-center gap-1"
                          style={{ backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                      <Sparkles className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {proj.title}
                </h3>
                <p className="text-xs mt-1.5 leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                  {proj.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 flex flex-wrap gap-1" style={{ borderTop: '1px solid var(--glass-border)' }}>
                {proj.techStack.slice(0, 3).map(t => (
                  <span key={t} className="text-[9px] px-1.5 py-0.5 rounded glass-surface" style={{ color: 'var(--text-secondary)' }}>
                    {t}
                  </span>
                ))}
                {proj.techStack.length > 3 && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded glass-surface" style={{ color: 'var(--text-tertiary)' }}>
                    +{proj.techStack.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Inspector Detail Modal */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 z-50 glass-panel-heavy flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[85vh] glass-card shadow-2xl overflow-y-auto os-scrollbar p-6 space-y-6 relative animate-in zoom-in-95 duration-150"
            style={{ color: 'var(--text-primary)' }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl glass-surface hover:brightness-110"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold"
                   style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)', borderColor: 'var(--accent-subtle)' }}>
                {activeProject.category}
              </div>
              <h2 className="text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>{activeProject.title}</h2>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{activeProject.shortDescription}</p>
            </div>

            {/* GitHub & Live Links */}
            <div className="flex flex-wrap gap-3 pt-1 py-3" style={{ borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${accent.bg} hover:brightness-110 shadow-lg`}
                style={{ color: isLight ? 'white' : 'var(--surface-0)' }}
              >
                <Github className="w-4 h-4" /> View GitHub Repository
              </a>
              {activeProject.liveDemoUrl && (
                <a
                  href={activeProject.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 glass-surface border border-[var(--glass-border)] hover:brightness-110"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <ExternalLink className="w-4 h-4" style={{ color: 'var(--accent)' }} /> Live Demo
                </a>
              )}
            </div>

            {/* Metrics if available */}
            {activeProject.metrics && (
              <div className="grid grid-cols-2 gap-3">
                {activeProject.metrics.map(m => (
                  <div key={m.label} className="p-3 rounded-xl glass-surface border border-[var(--glass-border)] text-center">
                    <div className="text-lg font-black" style={{ color: 'var(--accent)' }}>{m.value}</div>
                    <div className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Layers className="w-3.5 h-3.5 text-cyan-500" /> System Overview
              </h4>
              <p className="text-xs leading-relaxed glass-surface p-3 rounded-xl border border-[var(--glass-border)]" style={{ color: 'var(--text-secondary)' }}>
                {activeProject.overview}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Key Features
              </h4>
              <ul className="space-y-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                {activeProject.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: 'var(--accent)' }}>•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture */}
            {activeProject.architecture && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                  <Code2 className="w-3.5 h-3.5 text-amber-500" /> Architecture Flow
                </h4>
                <div className="p-3 rounded-xl glass-surface font-mono text-[11px] border border-[var(--glass-border)] leading-relaxed" style={{ color: 'var(--accent)' }}>
                  {activeProject.architecture}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                <Cpu className="w-3.5 h-3.5 text-purple-500" /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.techStack.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded-lg glass-surface border border-[var(--glass-border)]" style={{ color: 'var(--text-primary)' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Challenges & Learnings */}
            {activeProject.challenges && (
              <div className="p-3.5 rounded-xl border text-xs space-y-1"
                   style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
                <div className="font-bold" style={{ color: '#a5b4fc' }}>Engineering Challenge & Learnings</div>
                <div>{activeProject.challenges} {activeProject.learnings}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
