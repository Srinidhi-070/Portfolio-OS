import re

with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# We need to replace everything from ":root {" down to the end of ".arctic-light { ... }"
# We can use regex to find this block

new_themes = """
:root {
  /* Accent (set dynamically via JS) */
  --accent-h: 182;
  --accent-s: 100%;
  --accent-l: 35%;
  --accent: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
  --accent-light: hsl(var(--accent-h), var(--accent-s), 55%);
  --accent-glow: hsl(var(--accent-h), var(--accent-s), var(--accent-l) / 0.4);
  --accent-subtle: hsl(var(--accent-h), var(--accent-s), var(--accent-l) / 0.15);

  --hover-surprise: var(--accent);

  /* Shared Defaults */
  --glass-blur: 32px;
  --glass-blur-heavy: 48px;
  --glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.1);

  /* Fonts */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'Fira Code', monospace;

  /* Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
}

/* 1. OBSIDIAN (Pure Neutral Dark / OLED Black Base) */
:root, .obsidian {
  --glass-bg: rgba(9, 9, 11, 0.75);
  --glass-bg-heavy: rgba(0, 0, 0, 0.85);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-active: rgba(255, 255, 255, 0.2);
  --glass-window-bg: rgba(9, 9, 11, 0.5);

  --surface-0: #000000;
  --surface-1: rgba(24, 24, 27, 0.4);
  --surface-2: rgba(39, 39, 42, 0.4);
  --surface-3: rgba(63, 63, 70, 0.8);
  --surface-hover: rgba(255, 255, 255, 0.05);

  --text-primary: #ffffff;
  --text-secondary: #a1a1aa;
  --text-tertiary: #71717a;
  --text-inverse: #000000;
}

/* 2. ARCTIC LIGHT (Pure Neutral White) */
.arctic-light {
  --glass-bg: rgba(255, 255, 255, 0.75);
  --glass-bg-heavy: rgba(250, 250, 250, 0.95);
  --glass-border: rgba(0, 0, 0, 0.1);
  --glass-border-active: rgba(0, 0, 0, 0.25);
  --glass-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.8);
  --glass-window-bg: rgba(255, 255, 255, 0.6);

  --surface-0: #ffffff;
  --surface-1: rgba(244, 244, 245, 0.5);
  --surface-2: rgba(228, 228, 231, 0.6);
  --surface-3: rgba(212, 212, 216, 0.9);
  --surface-hover: rgba(0, 0, 0, 0.03);

  --text-primary: #09090b;
  --text-secondary: #52525b;
  --text-tertiary: #a1a1aa;
  --text-inverse: #ffffff;
}

/* 3. MIDNIGHT VIOLET (Deep Indigo/Violet Dark) */
.midnight-violet {
  --glass-bg: rgba(10, 7, 20, 0.75);
  --glass-bg-heavy: rgba(5, 3, 12, 0.85);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-active: rgba(255, 255, 255, 0.2);
  --glass-window-bg: rgba(10, 7, 20, 0.5);

  --surface-0: #05030c;
  --surface-1: rgba(24, 18, 43, 0.4);
  --surface-2: rgba(46, 34, 82, 0.4);
  --surface-3: rgba(67, 56, 110, 0.8);
  --surface-hover: rgba(255, 255, 255, 0.05);

  --text-primary: #ffffff;
  --text-secondary: #a7a1c4;
  --text-tertiary: #7b7596;
  --text-inverse: #05030c;
}

/* 4. CYBER BLUE (Deep Navy/Cyan Dark) */
.cyber-blue {
  --glass-bg: rgba(4, 11, 22, 0.75);
  --glass-bg-heavy: rgba(2, 6, 13, 0.85);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-active: rgba(255, 255, 255, 0.2);
  --glass-window-bg: rgba(4, 11, 22, 0.5);

  --surface-0: #02060d;
  --surface-1: rgba(15, 30, 56, 0.4);
  --surface-2: rgba(27, 51, 88, 0.4);
  --surface-3: rgba(42, 73, 122, 0.8);
  --surface-hover: rgba(255, 255, 255, 0.05);

  --text-primary: #ffffff;
  --text-secondary: #93a7c6;
  --text-tertiary: #647b9e;
  --text-inverse: #02060d;
}

/* 5. EMERALD GLASS (Deep Pine/Forest Dark) */
.emerald-glass {
  --glass-bg: rgba(5, 15, 11, 0.75);
  --glass-bg-heavy: rgba(2, 8, 5, 0.85);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-border-active: rgba(255, 255, 255, 0.2);
  --glass-window-bg: rgba(5, 15, 11, 0.5);

  --surface-0: #020805;
  --surface-1: rgba(13, 38, 27, 0.4);
  --surface-2: rgba(23, 61, 44, 0.4);
  --surface-3: rgba(38, 89, 66, 0.8);
  --surface-hover: rgba(255, 255, 255, 0.05);

  --text-primary: #ffffff;
  --text-secondary: #92b3a3;
  --text-tertiary: #658a77;
  --text-inverse: #020805;
}
"""

# Find the block from ":root {" down to the closing brace of ".arctic-light {"
pattern = re.compile(r':root\s*\{.*?\.arctic-light\s*\{.*?\}', re.DOTALL)
css = pattern.sub(new_themes, css)

with open('src/index.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Themes updated")
