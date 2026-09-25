import re

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        c = f.read()
    for old, new in replacements:
        c = c.replace(old, new)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(c)

# 1. ResumeApp
replace_in_file('src/components/apps/ResumeApp.tsx', [
    ('dark:text-[var(--accent)] ', ''),
    ('print:text-[var(--accent)]', '')
])

# 2. SettingsApp - convert hardcoded colors to accent
replace_in_file('src/components/apps/SettingsApp.tsx', [
    ('bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30', 'bg-[var(--accent-subtle)] text-[var(--accent)]'),
    ('text-emerald-600 dark:text-emerald-400', 'text-[var(--accent)]'),
    ('text-cyan-600 dark:text-cyan-400', 'text-[var(--accent)]'),
    ('text-rose-600 dark:text-rose-400', 'text-[var(--accent)]'),
    ('text-amber-600 dark:text-amber-400', 'text-[var(--accent)]'),
    ('text-indigo-500 dark:text-indigo-400', 'text-[var(--accent)]'),
    ('text-purple-600 dark:text-purple-400', 'text-[var(--accent)]'),
    ('border-emerald-500/80', 'border-[var(--accent)]')
])

# 3. Dock
replace_in_file('src/components/desktop/Dock.tsx', [
    ('text-neutral-500 dark:text-neutral-300', 'text-[var(--text-secondary)]'),
    ('dark:bg-transparent', ''),
    ('bg-transparent  ', 'bg-transparent ')
])

# 4. Floating Dock
replace_in_file('src/components/ui/floating-dock.tsx', [
    ('bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900', 'glass-panel px-4 pb-3 md:flex'),
    ('border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white', 'glass-surface border border-[var(--glass-border)] px-2 py-0.5 text-xs whitespace-pre text-[var(--text-primary)]')
])

# 5. Background ripple
replace_in_file('src/components/ui/background-ripple-effect.tsx', [
    ('dark:hover:bg-white/20', '')
])

print("Done stripping dark: classes")
