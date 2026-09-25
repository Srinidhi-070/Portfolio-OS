import React from 'react';
import { useOS } from '../../context/OSContext';
import { PERSONAL_INFO, PROJECTS } from '../../data/portfolioData';
import { getAccentClasses } from '../../lib/theme';
import srinidhiPhoto from '../../assets/srinidhi_headshot.jpg';
import {
  Sparkles,
  ArrowRight,
  FolderGit2,
  Terminal,
  Cpu,
  Github,
  Mail,
  FileText,
  Activity,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  BrainCircuit,
  Boxes,
  MapPin,
  Phone
} from 'lucide-react';

export const HomeApp: React.FC = () => {
  const { openApp, accentColor, theme } = useOS();
  const accent = getAccentClasses(accentColor);
  const isLight = theme === 'arctic-light';

  const featuredProjects = PROJECTS.filter(p => p.featured).slice(0, 4);

  return (
    <div className={`p-4 sm:p-6 max-w-5xl mx-auto space-y-6 sm:space-y-8 `}>
      {/* Hero Welcome Banner with User Profile Photo */}
      <div className="relative rounded-2xl glass-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-subtle)] to-transparent opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }} />

        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* User Profile Photo Showcase — framed so the B&W portrait stands out */}
          <div className="relative group shrink-0">
            <div className="photo-frame relative w-32 h-32 md:w-36 md:h-36">
              <img
                src={srinidhiPhoto}
                alt={PERSONAL_INFO.name}
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full font-bold text-xs border-2 flex items-center gap-1 shadow-lg"
                   style={{ backgroundColor: 'var(--accent)', color: isLight ? 'white' : 'var(--surface-0)', borderColor: 'var(--glass-border)' }}>
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: isLight ? 'white' : 'var(--surface-0)' }} />
                Online
              </div>
            </div>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                 style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
              <Sparkles className="w-3.5 h-3.5" /> Portfolio OS v2.5 Verified Profile
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Hello, I'm <span className={accent.text}>{PERSONAL_INFO.name}</span>
            </h1>

            <p className="text-xs md:text-sm font-semibold flex items-center justify-center md:justify-start gap-3" style={{ color: 'var(--accent)' }}>
              <span>{PERSONAL_INFO.title}</span>
              <span style={{ color: 'var(--text-tertiary)' }}>•</span>
              <span className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                <MapPin className="w-3.5 h-3.5" /> {PERSONAL_INFO.location}
              </span>
            </p>

            <p className="text-xs md:text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {PERSONAL_INFO.bio}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <button
                onClick={() => openApp('resume')}
                className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-lg ${accent.bg} hover:brightness-110`}
                style={{ color: isLight ? 'white' : 'var(--surface-0)' }}
              >
                <FileText className="w-4 h-4" /> Curriculum Vitae
              </button>
              <button
                onClick={() => openApp('projects')}
                className="px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all glass-surface hover:brightness-110"
              >
                <FolderGit2 className="w-4 h-4" style={{ color: 'var(--accent)' }} /> Explore 16 Repos
              </button>
              <button
                onClick={() => openApp('contact')}
                className="px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all btn-ghost"
              >
                <Mail className="w-4 h-4" style={{ color: 'var(--accent)' }} /> Get in Touch
              </button>
            </div>
          </div>

          {/* Quick Info Badges */}
          <div className="w-full md:w-auto flex md:flex-col gap-3 shrink-0">
            <div className="flex-1 p-3.5 rounded-xl glass-card text-center">
              <div className="text-2xl font-black" style={{ color: 'var(--accent)' }}>7.8</div>
              <div className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>B.E. GPA</div>
            </div>
            <div className="flex-1 p-3.5 rounded-xl glass-card text-center">
              <div className="text-2xl font-black" style={{ color: 'var(--accent)' }}>16+</div>
              <div className="text-[10px] font-medium" style={{ color: 'var(--text-secondary)' }}>GitHub Repos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <BrainCircuit className="w-5 h-5" style={{ color: 'var(--accent)' }} /> Featured AI Systems & Full Stack Apps
          </h2>
          <button
            onClick={() => openApp('projects')}
            className="text-xs hover:underline flex items-center gap-1 font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => openApp('projects', { projectId: proj.id })}
              className="group p-5 rounded-2xl glass-card-interactive cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)', borderColor: 'var(--accent-subtle)' }}>
                    {proj.category}
                  </span>
                  <ExternalLink className="w-4 h-4 transition-colors" style={{ color: 'var(--text-tertiary)' }} />
                </div>

                <h3 className="text-base font-bold transition-colors" style={{ color: 'var(--text-primary)' }}>
                  {proj.title}
                </h3>
                <p className="text-xs mt-1.5 leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {proj.shortDescription}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-4 pt-3 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid var(--glass-border)' }}>
                {proj.techStack.slice(0, 4).map(tech => (
                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded glass-surface" style={{ color: 'var(--text-secondary)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Competency Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-card space-y-2">
          <div className="w-9 h-9 glass-icon">
            <Cpu className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>AI & Deep Learning</h4>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            PyTorch & TensorFlow model architecture, transfer learning, MFCC audio scam detection & CNN plant diagnostic engines.
          </p>
        </div>

        <div className="p-4 rounded-2xl glass-card space-y-2">
          <div className="w-9 h-9 glass-icon">
            <Boxes className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Full-Stack & WebRTC</h4>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Sub-100ms low-latency media streams, WebGL Three.js spatial navigation, FastAPI microservices & React 19 UIs.
          </p>
        </div>

        <div className="p-4 rounded-2xl glass-card space-y-2">
          <div className="w-9 h-9 glass-icon">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Product Operations</h4>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Automated bug triage workflows, metric telemetry tracking, QA testing suites & cross-functional engineering alignment.
          </p>
        </div>
      </div>
    </div>
  );
};
