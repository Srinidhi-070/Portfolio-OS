import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, EDUCATION } from '../../data/portfolioData';
import { useOS } from '../../context/OSContext';
import srinidhiPhoto from '../../assets/srinidhi_headshot.jpg';
import { FileText, Mail, Github, Linkedin, CheckCircle2, Copy, Check, ExternalLink, Award, Download } from 'lucide-react';

export const ResumeApp: React.FC = () => {
  const { theme, addNotification } = useOS();
  const isLight = theme === 'vercel-light';

  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    addNotification('Email Copied', `${PERSONAL_INFO.email} copied to clipboard!`, 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-4 sm:p-6 max-w-4xl mx-auto space-y-6 select-none transition-colors duration-200 ${
      'text-[var(--text-primary)]'
    }`}>
      {/* Top Action Header */}
      <div className={`flex flex-wrap items-center justify-between pb-4 border-b print:hidden ${
        'border-[var(--glass-border)]'
      }`}>
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 text-[var(--accent)] border border-teal-500/30 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" /> Official Resume — Portfolio OS
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Srinidhi N S — Curriculum Vitae</h1>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <button
            onClick={copyEmail}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 btn-ghost border ${
              'border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--surface-2)]'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent)]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Email' : 'Copy Email'}
          </button>

          <a
            href="/Resume.pdf"
            download="Srinidhi_N_S_Resume.pdf"
            className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg btn-accent"
          >
            <Download className="w-4 h-4" /> Download Resume
          </a>
        </div>
      </div>

      {/* Printable Resume Document Container */}
      <div className={`glass-card p-8 space-y-6 shadow-2xl transition-colors duration-200 print:bg-white print:text-black print:border-0 print:p-0`}>
        {/* Resume Title Header */}
        <div className={`border-b pb-6 print:border-black `}>
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="flex items-center gap-4">
              <img
                src={srinidhiPhoto}
                alt={PERSONAL_INFO.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border-2 border-emerald-500/60 shadow-lg shrink-0"
              />
              <div>
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight print:text-black `}>
                  {PERSONAL_INFO.name}
                </h1>
                <div className="text-xs sm:text-sm font-semibold text-[var(--accent)]  mt-0.5">
                  {PERSONAL_INFO.title}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 print:hidden">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors btn-ghost ${
                  'border-[var(--glass-border)] text-[var(--text-primary)]'
                }`}
              >
                <Github className="w-3.5 h-3.5" /> GitHub <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors btn-ghost ${
                  'border-[var(--glass-border)] text-[var(--text-primary)]'
                }`}
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </div>

          <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs font-mono print:text-black `}>
            <span><strong className="font-semibold">Email:</strong> {PERSONAL_INFO.email}</span>
            <span>•</span>
            <span><strong className="font-semibold">GitHub:</strong> github.com/Srinidhi-070</span>
            <span>•</span>
            <span><strong className="font-semibold">LinkedIn:</strong> linkedin.com/in/ns-srinidhi-270351218</span>
            <span>•</span>
            <span><strong className="font-semibold">Location:</strong> {PERSONAL_INFO.location}</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider text-[var(--accent)]  border-b pb-1 print:border-black border-[var(--glass-border)]`}>
            Professional Summary
          </h3>
          <p className={`text-xs leading-relaxed print:text-black `}>
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Technical Competencies */}
        <div className="space-y-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider text-[var(--accent)]  border-b pb-1 print:border-black border-[var(--glass-border)]`}>
            Technical Competencies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className={`glass-surface p-2.5 rounded-lg border print:border-black print:bg-white`}>
              <span className={`font-bold print:text-black `}>AI & Deep Learning:</span> PyTorch, TensorFlow, OpenCV, YOLOv8, MediaPipe, Scikit-Learn, Gemini API, RAG, WebRTC VLM
            </div>
            <div className={`glass-surface p-2.5 rounded-lg border print:border-black print:bg-white`}>
              <span className={`font-bold print:text-black `}>Backend & Web:</span> Python (FastAPI, Flask), Node.js, Express, TypeScript, React 19, Next.js, Tailwind CSS
            </div>
            <div className={`glass-surface p-2.5 rounded-lg border print:border-black print:bg-white`}>
              <span className={`font-bold print:text-black `}>Databases & Cloud:</span> PostgreSQL, Vector DBs (FAISS, Chroma), Docker, GCP Cloud Run, Kafka, Prometheus
            </div>
            <div className={`glass-surface p-2.5 rounded-lg border print:border-black print:bg-white`}>
              <span className={`font-bold print:text-black `}>Product Operations:</span> Bug Triage Automation, Jira, QA Test Suites, Telemetry Dashboards, Technical SOPs
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <h3 className={`text-xs font-bold uppercase tracking-wider text-[var(--accent)]  border-b pb-1 print:border-black border-[var(--glass-border)]`}>
            Experience & Internships
          </h3>

          {EXPERIENCES.map(exp => (
            <div key={exp.id} className="space-y-1.5 text-xs">
              <div className="flex justify-between items-baseline font-bold">
                <span >
                  {exp.role} — <span className="text-[var(--accent)] ">{exp.company}</span>
                </span>
                <span className={`font-mono text-[11px] print:text-black `}>
                  {exp.period}
                </span>
              </div>
              <ul className={`space-y-1 pl-4 list-disc print:text-black `}>
                {exp.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Key Featured AI Projects */}
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider text-[var(--accent)]  border-b pb-1 print:border-black border-[var(--glass-border)]`}>
            Key Engineering Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {PROJECTS.filter(p => p.featured).map(p => (
              <div key={p.id} className={`glass-surface p-3 rounded-xl border print:bg-[var(--surface-2)] print:border-black`}>
                <div className={`font-bold print:text-black `}>{p.title}</div>
                <div className={`text-[11px] mt-0.5 print:text-black `}>{p.shortDescription}</div>
                <div className="text-[10px] text-[var(--accent)]  font-mono mt-1 font-medium">
                  Stack: {p.techStack.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="space-y-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider text-[var(--accent)]  border-b pb-1 print:border-black border-[var(--glass-border)]`}>
            Education
          </h3>
          {EDUCATION.map(edu => (
            <div key={edu.id} className="flex justify-between items-baseline text-xs font-bold">
              <div>
                <div >{edu.degree}</div>
                <div className={`text-[11px] font-normal print:text-black `}>
                  {edu.institution}
                </div>
              </div>
              <div className={`text-right font-mono print:text-black `}>
                <div>{edu.period}</div>
                <div className="text-[10px] text-[var(--accent)]  font-semibold">{edu.grade}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};




