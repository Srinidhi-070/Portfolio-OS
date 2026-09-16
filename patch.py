import re

with open('src/components/apps/ResumeApp.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(r"\$\{\s*isLight \? 'border-\[var\(--glass-border\)\]' : 'border-\[var\(--glass-border\)\]'\s*\}", "border-[var(--glass-border)]", c)
c = re.sub(r"isLight \? 'text-\[var\(--text-primary\)\]' : 'text-slate-100'", "'text-[var(--text-primary)]'", c)
c = re.sub(r"isLight \? 'border-\[var\(--glass-border\)\]' : 'border-slate-800'", "'border-[var(--glass-border)]'", c)
c = re.sub(r"isLight \? 'border-\[var\(--glass-border\)\] text-\[var\(--text-primary\)\] hover:bg-\[var\(--surface-2\)\]200' : 'border-\[var\(--glass-border\)\] text-\[var\(--text-secondary\)\] hover:bg-\[var\(--surface-2\)\]800'", "'border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--surface-2)]'", c)
c = re.sub(r"isLight \? 'border-\[var\(--glass-border\)\] text-\[var\(--text-primary\)\]' : 'border-\[var\(--glass-border\)\] text-\[var\(--text-secondary\)\]'", "'border-[var(--glass-border)] text-[var(--text-primary)]'", c)

with open('src/components/apps/ResumeApp.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
