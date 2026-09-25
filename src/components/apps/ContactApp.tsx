import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useOS } from '../../context/OSContext';
import { Mail, Send, Github, Linkedin, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';

export const ContactApp: React.FC = () => {
  const { theme, addNotification } = useOS();
  const isLight = theme === 'arctic-light';

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    try {
      // TODO: Get your free form endpoint URL from https://formspree.io/
      // It will look something like: "https://formspree.io/f/xabcdefg"
      const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwlkaqyg";

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact Form Submission',
          message: formData.message
        })
      });

      if (res.ok) {
        setSubmitted(true);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        addNotification('Message Delivered', `Thank you ${formData.name}! Your message was sent successfully.`, 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        throw new Error(data.error || 'API Error');
      }
    } catch (err) {
      addNotification('Delivery Note', 'Message logged locally. Direct emails can also be sent to nssrinidhi72884@gmail.com', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-4 sm:p-6 max-w-4xl mx-auto space-y-6 sm:space-y-8 select-none `}>
      {/* Header */}
      <div className={`pb-4 border-b `}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-2" style={{ backgroundColor: 'var(--accent-subtle)', color: 'var(--accent)' }}>
          <Mail className="w-3.5 h-3.5" /> Direct Contact Center
        </div>
        <h1 className={`text-2xl font-extrabold `}>Get in Touch with Srinidhi N S</h1>
        <p className={`text-xs mt-1 `}>Open for AI Engineering, Machine Learning, Full-Stack & Product Ops opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Cards */}
        <div className="space-y-3 md:col-span-1">
          <div className="glass-card p-4 space-y-2">
            <div className={`text-xs font-bold flex items-center justify-between `}>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} /> Direct Email</span>
              <button
                onClick={handleCopyEmail}
                className={`p-1 rounded transition-colors `}
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className={`text-xs font-mono font-bold break-all `}>{PERSONAL_INFO.email}</div>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="glass-card-interactive p-4 flex items-center justify-between group block"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 glass-icon">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-xs font-bold transition-colors `}>GitHub Profile</div>
                <div className={`text-[10px] `}>@Srinidhi-070</div>
              </div>
            </div>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="glass-card-interactive p-4 flex items-center justify-between group block"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 glass-icon">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-xs font-bold transition-colors `}>LinkedIn Network</div>
                <div className={`text-[10px] `}>ns-srinidhi-270351218</div>
              </div>
            </div>
          </a>
        </div>

        {/* Messaging Form */}
        <div className="glass-card md:col-span-2 p-6 shadow-xl space-y-4">
          <div className={`flex items-center gap-2 font-bold text-sm `}>
            <MessageSquare className="w-4 h-4" style={{ color: 'var(--accent)' }} /> Send a Message
          </div>

          {submitted ? (
            <div className="p-6 text-center space-y-3 rounded-xl" style={{ backgroundColor: 'var(--accent-subtle)' }}>
              <Sparkles className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="text-sm font-bold" style={{ color: 'var(--accent)' }}>Message Received!</div>
              <p className={`text-xs `}>
                Thank you for reaching out. Srinidhi will get back to you promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl btn-accent font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block mb-1 font-medium `}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="glass-input w-full"
                  />
                </div>
                <div>
                  <label className={`block mb-1 font-medium `}>Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@company.com"
                    className="glass-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className={`block mb-1 font-medium `}>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI Engineering Opportunity / Project Inquiry"
                  className="glass-input w-full"
                />
              </div>

              <div>
                <label className={`block mb-1 font-medium `}>Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="glass-input w-full resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg btn-accent"
              >
                <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Dispatch Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
