import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useOS } from '../../context/OSContext';
import { getAccentClasses } from '../../lib/theme';
import srinidhiPhoto from '../../assets/srinidhi_headshot.jpg';
import {
  User,
  Target,
  Compass,
  Heart,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  Code2,
  Brain,
  Shield,
  ArrowRight,
  MapPin,
  Phone
} from 'lucide-react';

export const AboutApp: React.FC = () => {
  const { openApp, accentColor, theme } = useOS();
  const accent = getAccentClasses(accentColor);
  const isLight = theme === 'vercel-light';

  return (
    <div className={`p-4 sm:p-6 max-w-4xl mx-auto space-y-6 sm:space-y-8 `}>
      {/* Bio Header with User Photograph */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl glass-card shadow-2xl relative overflow-hidden">
        <div className="relative group shrink-0">
          <div className="photo-frame relative w-32 h-32 md:w-36 md:h-36">
            <img
              src={srinidhiPhoto}
              alt={PERSONAL_INFO.name}
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full font-bold text-[11px] border-2 flex items-center gap-1 shadow-lg"
                 style={{ backgroundColor: 'var(--accent)', color: 'white', borderColor: 'var(--glass-border)' }}>
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: 'white' }} />
              Verified Profile
            </div>
          </div>
        </div>

        <div className="space-y-3 text-center md:text-left flex-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
               style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)', borderColor: 'var(--accent-subtle)' }}>
            <Sparkles className="w-3.5 h-3.5" /> Aspiring AI Engineer & Product Ops Professional
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>{PERSONAL_INFO.name}</h1>
          <p className="text-xs font-semibold flex items-center justify-center md:justify-start gap-2" style={{ color: 'var(--accent)' }}>
            <span>{PERSONAL_INFO.title}</span>
            <span>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>{PERSONAL_INFO.location}</span>
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{PERSONAL_INFO.bio}</p>

          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
            <button
              onClick={() => openApp('projects')}
              className={`px-3.5 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 shadow-md ${accent.bg} hover:brightness-110`}
              style={{ color: 'white' }}
            >
              View Projects <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => openApp('resume')}
              className="px-3.5 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 glass-surface hover:brightness-110"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--glass-border)' }}
            >
              Resume PDF
            </button>
          </div>
        </div>
      </div>

      {/* Mission & Aspirations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl glass-card space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            <Target className="w-4 h-4" style={{ color: 'var(--accent)' }} /> Core Mission
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{PERSONAL_INFO.mission}</p>
        </div>

        <div className="p-5 rounded-2xl glass-card space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
            <Compass className="w-4 h-4" style={{ color: 'var(--accent)' }} /> Career Aspirations
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Aspiring to design production-grade Artificial Intelligence infrastructure, specialized Computer Vision networks, real-time speech processing, and automated product operations pipelines that bridge cutting-edge research with seamless end-user UX.
          </p>
        </div>
      </div>

      {/* Career Interests & Domain Focus */}
      <div className="space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Brain className="w-5 h-5" style={{ color: 'var(--accent)' }} /> Technical Domains & Interests
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl glass-surface text-xs">
            <div className="font-bold mb-1" style={{ color: 'var(--accent)' }}>AI Voice Safety</div>
            <div className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Deepfake detection, MFCC audio features, scam speech intent classification.</div>
          </div>
          <div className="p-3.5 rounded-xl glass-surface text-xs">
            <div className="font-bold mb-1" style={{ color: 'var(--accent)' }}>Computer Vision</div>
            <div className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>YOLOv8 object tracking, plant pathology CNNs, MediaPipe 3D gesture UI.</div>
          </div>
          <div className="p-3.5 rounded-xl glass-surface text-xs">
            <div className="font-bold mb-1" style={{ color: 'var(--accent)' }}>WebRTC & Spatial AI</div>
            <div className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Low latency video channels, Vision Language Models, Three.js WebGL rendering.</div>
          </div>
          <div className="p-3.5 rounded-xl glass-surface text-xs">
            <div className="font-bold mb-1" style={{ color: 'var(--accent)' }}>Product Operations</div>
            <div className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>Bug triage automation, product analytics, QA regression testing, Jira workflows.</div>
          </div>
        </div>
      </div>

      {/* Interactive Journey Timeline */}
      <div className="space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Award className="w-5 h-5" style={{ color: 'var(--accent)' }} /> Journey Timeline
        </h3>

        <div className="relative ml-4 pl-6 space-y-6" style={{ borderLeft: '1px solid var(--glass-border)' }}>
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--surface-0)' }} />
            <div className="text-xs font-semibold font-mono" style={{ color: 'var(--accent)' }}>March 2026 – Present</div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Product Operations Intern & Aspiring AI Engineer</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Optimizing engineering bug triage workflows, automating operational metrics, and deploying high-impact AI repositories like GuardianVoice and WebRTC VLM Detection.
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--surface-0)' }} />
            <div className="text-xs font-semibold font-mono" style={{ color: 'var(--accent)' }}>2023 - 2024</div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Deep Learning & Computer Vision Specialization</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Developed LeafMedic CNN plant disease classification, RoadSafe accident detection, and Gesture Media Controller using PyTorch, OpenCV, and TensorFlow.
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full border-2" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--surface-0)' }} />
            <div className="text-xs font-semibold font-mono" style={{ color: 'var(--accent)' }}>2023 – 2026</div>
            <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>B.E. in Artificial Intelligence & Data Science</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Pursuing undergraduate degree in AI & DS, mastering data structures, neural network design, relational databases, and cloud architecture.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
