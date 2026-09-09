import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TERMINAL_FILES, PROJECTS, PERSONAL_INFO, EXPERIENCES } from '../../data/portfolioData';
import { useOS } from '../../context/OSContext';
import { soundEngine } from '../../hooks/useSound';
import { Terminal, Sparkles, Send, CornerDownLeft, RefreshCcw } from 'lucide-react';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  time: string;
}

export const TerminalApp: React.FC = () => {
  const { openApp, addNotification } = useOS();

  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="font-extrabold text-emerald-400">Welcome to Warp Terminal v2.5 — Portfolio OS CLI</div>
          <div className="text-xs">Type <span className="text-amber-300 font-bold">help</span> to list commands or type <span className="text-cyan-300 font-bold">ai &lt;question&gt;</span> to chat with Gemini 3.6 AI.</div>
          <div className="text-xs text-slate-500">Try running: <span className="text-emerald-400">sudo hire-me</span> or <span className="text-emerald-400">cat about.txt</span></div>
        </div>
      ),
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isAiLoading]);

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandList(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const time = new Date().toLocaleTimeString();
    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    let outputNode: React.ReactNode = null;

    if (mainCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (mainCmd === 'help') {
      outputNode = (
        <div className="space-y-1 text-xs text-slate-300" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="text-emerald-400 font-bold mb-1">AVAILABLE COMMANDS:</div>
          <div>• <span className="text-amber-300 font-bold">help</span> : Show this help menu</div>
          <div>• <span className="text-amber-300 font-bold">whoami</span> / <span className="text-amber-300 font-bold">bio</span> : Display Srinidhi's profile</div>
          <div>• <span className="text-amber-300 font-bold">ls</span> / <span className="text-amber-300 font-bold">projects</span> : List all 16 GitHub projects</div>
          <div>• <span className="text-amber-300 font-bold">skills</span> : Output technical skill matrix</div>
          <div>• <span className="text-amber-300 font-bold">exp</span> / <span className="text-amber-300 font-bold">experience</span> : Print career history</div>
          <div>• <span className="text-amber-300 font-bold">cat &lt;file&gt;</span> : Read terminal file (e.g., cat about.txt, cat projects.txt)</div>
          <div>• <span className="text-amber-300 font-bold">sudo hire-me</span> : Trigger interactive hiring proposal</div>
          <div>• <span className="text-amber-300 font-bold">open &lt;app&gt;</span> : Launch app (home, about, projects, skills, resume, contact)</div>
          <div>• <span className="text-amber-300 font-bold">ai &lt;question&gt;</span> : Query Gemini 3.6 AI Assistant</div>
          <div>• <span className="text-amber-300 font-bold">clear</span> : Clear screen</div>
        </div>
      );
    } else if (mainCmd === 'whoami' || mainCmd === 'bio') {
      outputNode = (
        <div className="space-y-1.5 text-xs text-slate-200" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="font-bold text-white text-sm">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</div>
          <p className="text-slate-300 leading-relaxed">{PERSONAL_INFO.bio}</p>
          <div className="text-emerald-400">Email: {PERSONAL_INFO.email}</div>
        </div>
      );
    } else if (mainCmd === 'ls' || mainCmd === 'projects') {
      outputNode = (
        <div className="space-y-2 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="text-amber-400 font-bold">FEATURED REPOSITORIES (16 Total):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROJECTS.map(p => (
              <div key={p.id} className="p-2 rounded bg-slate-900/60 border border-slate-800">
                <div className="text-emerald-300 font-bold">{p.title}</div>
                <div className="text-slate-400 text-[10px]">{p.category}</div>
                <div className="text-slate-500 text-[10px] mt-1">{p.techStack.slice(0, 3).join(', ')}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (mainCmd === 'sudo') {
      if (arg.toLowerCase() === 'hire-me') {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        addNotification('Offer Initialized', 'Thank you! Srinidhi is excited to collaborate with your team.', 'success');
        outputNode = (
          <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 space-y-2" style={{ fontFamily: 'var(--font-mono)' }}>
            <div className="text-emerald-400 font-extrabold text-sm">🎉 PERMISSION GRANTED: HIRING PROTOCOL ACTIVATED</div>
            <p className="text-xs">
              Srinidhi N S is available for AI Engineering & Product Operations roles. Direct email: <span className="text-white font-bold">nssrinidhi72884@gmail.com</span>
            </p>
          </div>
        );
      } else {
        outputNode = <div className="text-rose-400 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>sudo: {arg} command not found. Try: <span className="text-amber-300">sudo hire-me</span></div>;
      }
    } else if (mainCmd === 'cat') {
      const fileName = arg.trim();
      const fileData = TERMINAL_FILES[fileName];
      if (fileData) {
        outputNode = (
          <div className="p-3 rounded bg-slate-900/60 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
            {fileData}
          </div>
        );
      } else {
        outputNode = (
          <div className="text-rose-400 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
            cat: {fileName || 'file'}: No such file or directory. Available files: {Object.keys(TERMINAL_FILES).join(', ')}
          </div>
        );
      }
    } else if (mainCmd === 'open') {
      const targetApp = arg.trim().toLowerCase();
      if (['home', 'about', 'projects', 'skills', 'experience', 'education', 'github', 'resume', 'contact', 'settings'].includes(targetApp)) {
        openApp(targetApp as any);
        outputNode = <div className="text-emerald-400 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>Opening app: {targetApp}...</div>;
      } else {
        outputNode = <div className="text-rose-400 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>Unknown app '{targetApp}'. Try: open projects</div>;
      }
    } else {
      // Default: Pass to Gemini API for AI Chat response!
      setIsAiLoading(true);
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(),
        command: trimmed,
        output: <div className="text-cyan-400 text-xs flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)' }}><Sparkles className="w-3.5 h-3.5 animate-spin" /> Gemini AI Processing...</div>,
        time
      };
      setHistory(prev => [...prev, newHistoryItem]);
      setInput('');

      try {
        const queryText = mainCmd === 'ai' ? arg : trimmed;
        const res = await fetch('/api/ai-terminal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: queryText })
        });
        const json = await res.json();

        setHistory(prev =>
          prev.map(item =>
            item.id === newHistoryItem.id
              ? {
                  ...item,
                  output: (
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-1" style={{ fontFamily: 'var(--font-mono)' }}>
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Srinidhi AI Assistant:
                      </div>
                      <div className="whitespace-pre-wrap">{json.text || json.error}</div>
                    </div>
                  )
                }
              : item
          )
        );
      } catch (err) {
        setHistory(prev =>
          prev.map(item =>
            item.id === newHistoryItem.id
              ? {
                  ...item,
                  output: <div className="text-rose-400 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>Failed to query Gemini AI. Check connection.</div>
                }
              : item
          )
        );
      } finally {
        setIsAiLoading(false);
      }
      return;
    }

    setHistory(prev => [...prev, { id: Math.random().toString(), command: trimmed, output: outputNode, time }]);
    setInput('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full text-slate-100 p-4 flex flex-col justify-between overflow-hidden select-none"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* Terminal History Log Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 os-scrollbar">
        {history.map(item => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-400 font-bold">srinidhi@port-os</span>
              <span className="text-slate-600">:~#</span>
              <span className="text-white font-bold">{item.command}</span>
              <span className="text-[10px] text-slate-600 ml-auto">{item.time}</span>
            </div>
            <div className="pl-3 border-l-2 border-slate-800/80">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Bar */}
      <form onSubmit={handleFormSubmit} className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-xs">srinidhi@port-os:~#</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => soundEngine.playTerminalKey()}
          placeholder="Type command (e.g. help, whoami, projects, ai ...)"
          className="flex-1 bg-transparent border-none text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
          style={{ fontFamily: 'var(--font-mono)' }}
          autoFocus
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 disabled:opacity-40 hover:bg-emerald-500 hover:text-slate-950 transition-colors"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
