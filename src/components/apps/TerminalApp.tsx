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
        <div className="space-y-1 text-[var(--text-secondary)]" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="font-extrabold text-emerald-400">Welcome to Warp Terminal v2.5 — Portfolio OS CLI</div>
          <div className="text-xs">Type <span className="text-amber-300 font-bold">help</span> to list commands or just chat naturally with the <span className="text-cyan-300 font-bold">Srinidhi OS Assistant</span>!</div>
          <div className="text-xs text-[var(--text-tertiary)]">Try asking: <span className="text-emerald-400">"make me a sandwich"</span> or <span className="text-emerald-400">sudo hire-me</span></div>
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
        <div className="space-y-1 text-xs text-[var(--text-secondary)]" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="text-emerald-400 font-bold mb-1">AVAILABLE COMMANDS:</div>
          <div>• <span className="text-amber-300 font-bold">help</span> : Show this help menu</div>
          <div>• <span className="text-amber-300 font-bold">whoami</span> / <span className="text-amber-300 font-bold">bio</span> : Display Srinidhi's profile</div>
          <div>• <span className="text-amber-300 font-bold">ls</span> / <span className="text-amber-300 font-bold">projects</span> : List all 16 GitHub projects</div>
          <div>• <span className="text-amber-300 font-bold">skills</span> : Output technical skill matrix</div>
          <div>• <span className="text-amber-300 font-bold">exp</span> / <span className="text-amber-300 font-bold">experience</span> : Print career history</div>
          <div>• <span className="text-amber-300 font-bold">cat &lt;file&gt;</span> : Read terminal file (e.g., cat about.txt, cat projects.txt)</div>
          <div>• <span className="text-amber-300 font-bold">sudo hire-me</span> : Trigger interactive hiring proposal</div>
          <div>• <span className="text-amber-300 font-bold">open &lt;app&gt;</span> : Launch app (home, about, projects, skills, resume, contact)</div>
          <div>• <span className="text-amber-300 font-bold">ai &lt;question&gt;</span> : Chat with the Portfolio Assistant</div>
          <div>• <span className="text-amber-300 font-bold">clear</span> : Clear screen</div>
        </div>
      );
    } else if (mainCmd === 'whoami' || mainCmd === 'bio') {
      outputNode = (
        <div className="space-y-1.5 text-xs text-[var(--text-secondary)]" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="font-bold text-[var(--text-primary)] text-sm">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</div>
          <p className="text-[var(--text-secondary)] leading-relaxed">{PERSONAL_INFO.bio}</p>
          <div className="text-emerald-400">Email: {PERSONAL_INFO.email}</div>
        </div>
      );
    } else if (mainCmd === 'ls' || mainCmd === 'projects') {
      outputNode = (
        <div className="space-y-2 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          <div className="text-amber-400 font-bold">FEATURED REPOSITORIES (16 Total):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PROJECTS.map(p => (
              <div key={p.id} className="p-2 rounded glass-surface border border-[var(--glass-border)]">
                <div className="text-emerald-300 font-bold">{p.title}</div>
                <div className="text-[var(--text-tertiary)] text-[10px]">{p.category}</div>
                <div className="text-[var(--text-tertiary)] text-[10px] mt-1">{p.techStack.slice(0, 3).join(', ')}</div>
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
              Srinidhi N S is available for AI Engineering & Product Operations roles. Direct email: <span className="text-[var(--text-primary)] font-bold">nssrinidhi72884@gmail.com</span>
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
          <div className="p-3 rounded glass-surface border border-[var(--glass-border)] text-xs text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
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
      // Default: Simulated AI / Pre-fed Responses!
      const queryText = mainCmd === 'ai' ? arg : trimmed;
      const q = queryText.toLowerCase();
      let responseText = "";

      if (q.includes('make me a sandwich')) {
        responseText = "I'm a portfolio OS, not a deli. Sudo make it yourself 🥪.";
      } else if (q.includes('sudo rm -rf')) {
        responseText = "Nice try! I've already backed up my portfolio to a floppy disk 💾.";
      } else if (q.includes('who are you') || q.includes('who is srinidhi')) {
        responseText = "I am Srinidhi's simulated AI assistant! Srinidhi is an AI & Data Science Graduate and Product Operations Intern who builds interactive OS-style portfolios just like this one.";
      } else if (q.match(/^(hi|hello|hey|yo)/)) {
        responseText = "Hello there! I'm the built-in Portfolio Assistant, running on 100% pre-programmed caffeine ☕. Try asking me about Srinidhi's 'skills', 'experience', 'projects', or ask me for a 'joke'!";
      } else if (q.includes('hire') || q.includes('job') || q.includes('work')) {
        responseText = "Executing hire sequence... Target acquired. Prepare the offer letter! 💼\nYou can contact Srinidhi directly using the Contact App, or email nssrinidhi72884@gmail.com";
      } else if (q.includes('joke')) {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
          "There are 10 types of people in this world: Those who understand binary, and those who don't.",
          "I'd tell you a joke about UDP, but you might not get it.",
          "Why did the developer go broke? Because they used up all their cache!",
          "A SQL query goes into a bar, walks up to two tables and asks: 'Can I join you?'"
        ];
        responseText = jokes[Math.floor(Math.random() * jokes.length)];
      } else if (q.includes('matrix')) {
        responseText = "Wake up, Neo... The Portfolio OS has you 🐇.";
      } else if (q.includes('ping')) {
        responseText = "Pong! 0 packets transmitted, 0 received, 100% simulated packet loss.";
      } else if (q.includes('sudo')) {
        responseText = "Srinidhi has not placed you in the sudoers file. This incident will be reported to a very angry text log 📝.";
      } else if (q.includes('date') || q.includes('time')) {
        responseText = `Checking my internal simulated clock... it appears to be ${new Date().toLocaleString()}. But time is just an illusion in this OS.`;
      } else if (q.includes('why') || q.includes('broken')) {
        responseText = "It's a feature, not a bug.";
      } else if (q.includes('skills') || q.includes('tech')) {
        responseText = "Srinidhi specializes in Python, React, Next.js, AI/ML (TensorFlow, PyTorch), Node.js, and Cloud deployments! Type 'open skills' to see the full breakdown.";
      } else if (q.includes('experience') || q.includes('internship')) {
        responseText = "Srinidhi was a Product Operations Intern at Hiver, optimizing pipelines and automating QA! Type 'open experience' to see the details.";
      } else if (q.includes('projects') || q.includes('portfolio')) {
        responseText = "Srinidhi has built everything from AI Courtroom Simulators to AR Campus Navigation! Type 'open projects' to check out the portfolio gallery.";
      } else if (q.includes('education') || q.includes('degree')) {
        responseText = "Srinidhi holds a B.E. in Artificial Intelligence and Data Science from Dayananda Sagar Academy of Technology and Management (CGPA: 7.82).";
      } else if (q.includes('music') || q.includes('spotify')) {
        responseText = "I'm not equipped with speakers, but I can recommend some lo-fi beats to code to while you explore the portfolio! 🎧";
      } else if (q.includes('secret') || q.includes('easter egg')) {
        responseText = "You found a secret! 🎉 Did you know you can right-click anywhere on the desktop to open a custom OS context menu?";
      } else {
        responseText = `Hmm, I'm not sure how to respond to '${queryText}'.\n\nI'm a lightweight simulated assistant! Try asking about Srinidhi's 'skills', 'experience', 'projects', or just ask me to tell a 'joke'. You can also type 'help' for system commands!`;
      }

      setIsAiLoading(true);
      const newHistoryItem: HistoryItem = {
        id: Math.random().toString(),
        command: trimmed,
        output: <div className="text-cyan-400 text-xs flex items-center gap-2" style={{ fontFamily: 'var(--font-mono)' }}><Sparkles className="w-3.5 h-3.5 animate-spin" /> Processing simulated response...</div>,
        time
      };
      setHistory(prev => [...prev, newHistoryItem]);
      setInput('');

      // Simulate a realistic processing delay
      setTimeout(() => {
        setHistory(prev =>
          prev.map(item =>
            item.id === newHistoryItem.id
              ? {
                  ...item,
                  output: (
                    <div className="p-3 rounded-xl glass-surface border border-[var(--glass-border)] text-xs text-[var(--text-secondary)] leading-relaxed space-y-1" style={{ fontFamily: 'var(--font-mono)' }}>
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Srinidhi OS Assistant:
                      </div>
                      <div className="whitespace-pre-wrap">{responseText}</div>
                    </div>
                  )
                }
              : item
          )
        );
        setIsAiLoading(false);
      }, 800);
      return; // Return early because history is updated asynchronously
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
      className="h-full text-[var(--text-primary)] p-4 flex flex-col justify-between overflow-hidden select-none"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* Terminal History Log Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 os-scrollbar">
        {history.map(item => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-400 font-bold">srinidhi@port-os</span>
              <span className="text-[var(--text-tertiary)]">:~#</span>
              <span className="text-[var(--text-primary)] font-bold">{item.command}</span>
              <span className="text-[10px] text-[var(--text-tertiary)] ml-auto">{item.time}</span>
            </div>
            <div className="pl-3 border-l-2 border-[var(--glass-border)]">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input Bar */}
      <form onSubmit={handleFormSubmit} className="mt-3 pt-3 border-t border-[var(--glass-border)] flex items-center gap-2">
        <span className="text-emerald-400 font-bold text-xs">srinidhi@port-os:~#</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => soundEngine.playTerminalKey()}
          placeholder="Type command (e.g. help, whoami, projects, ai ...)"
          className="flex-1 bg-transparent border-none text-xs text-[var(--text-primary)] placeholder-slate-600 focus:outline-none"
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

