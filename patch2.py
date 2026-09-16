import re

with open('src/components/apps/SettingsApp.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = re.sub(r"\(isLight \? 'text-slate-800' : 'text-slate-200'\)", "'text-[var(--text-primary)]'", c)

with open('src/components/apps/SettingsApp.tsx', 'w', encoding='utf-8') as f:
    f.write(c)
