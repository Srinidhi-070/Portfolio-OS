import re

with open('src/components/apps/GitHubApp.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(r"isLight \? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-700 text-slate-200 hover:bg-slate-800'", "'border-[var(--glass-border)] text-[var(--text-primary)] hover:bg-[var(--surface-2)]'", c)
c = re.sub(r"text-slate-400", "text-[var(--text-tertiary)]", c)
c = re.sub(r"text-slate-500 dark:text-slate-400", "text-[var(--text-secondary)]", c)

with open('src/components/apps/GitHubApp.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
