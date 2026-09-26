import { AccentColor, ThemeMode, WallpaperOption } from '../types';

/**
 * Accent color HSL mappings.
 * These get applied as CSS custom properties on :root
 * so the entire design system responds to accent changes.
 */
const ACCENT_HSL: Record<AccentColor, { h: number; s: number; l: number }> = {
  // Light Mode Accents (Deep, Rich, High-Contrast)
  crimson: { h: 0,   s: 72, l: 51 }, // #dc2626
  navy:    { h: 224, s: 64, l: 33 }, // #1e3a8a
  forest:  { h: 163, s: 94, l: 24 }, // #047857
  plum:    { h: 297, s: 64, l: 28 }, // #701a75
  
  // Dark Mode Accents (Bright, Luminous, Neon)
  cyan:    { h: 188, s: 86, l: 53 }, // #22d3ee
  pink:    { h: 328, s: 86, l: 70 }, // #f472b6
  lime:    { h: 142, s: 71, l: 58 }, // #4ade80
  amber:   { h: 43,  s: 96, l: 56 }, // #fbbf24
};

const WALLPAPER_MESH: Record<string, { mesh1: string; mesh2: string; mesh3: string; mesh4: string }> = {
  // Light Wallpapers
  'light-sakura': { mesh1: '#fce4ec', mesh2: '#f8bbd0', mesh3: '#ffcdd2', mesh4: '#ffffff' },
  'light-sky':    { mesh1: '#e0f2fe', mesh2: '#bae6fd', mesh3: '#7dd3fc', mesh4: '#f0f9ff' },
  'light-sage':   { mesh1: '#d0d7cf', mesh2: '#aab5a8', mesh3: '#d4dcd2', mesh4: '#eef2ec' },
  'light-peach':  { mesh1: '#ffedd5', mesh2: '#fed7aa', mesh3: '#fdba74', mesh4: '#fff7ed' },
  
  // Dark Wallpapers
  'dark-abyss':   { mesh1: '#020617', mesh2: '#0f172a', mesh3: '#1e293b', mesh4: '#000000' },
  'dark-nebula':  { mesh1: '#4c1d95', mesh2: '#701a75', mesh3: '#312e81', mesh4: '#000000' },
  'dark-matrix':  { mesh1: '#064e3b', mesh2: '#065f46', mesh3: '#022c22', mesh4: '#000000' },
  'dark-magma':   { mesh1: '#7f1d1d', mesh2: '#991b1b', mesh3: '#450a0a', mesh4: '#000000' },
};

/**
 * Theme identity palettes. Selecting a theme in Settings now visibly changes
 * the OS by recoloring the animated mesh background orbs (the dominant visual).
 * Keys must match the ThemeMode ids in src/types.ts.
 */
const THEME_MESH: Record<string, { mesh1: string; mesh2: string; mesh3: string; mesh4: string }> = {
  'linear-dark': { mesh1: '#27272a', mesh2: '#18181b', mesh3: '#3f3f46', mesh4: '#000000' },
  'vercel-light':{ mesh1: '#e4e4e7', mesh2: '#f4f4f5', mesh3: '#d4d4d8', mesh4: '#ffffff' },
  'dracula':     { mesh1: '#6272a4', mesh2: '#44475a', mesh3: '#ff79c6', mesh4: '#282a36' },
  'monochrome':  { mesh1: '#404040', mesh2: '#262626', mesh3: '#525252', mesh4: '#171717' },
  'neo-brutal':  { mesh1: '#d0d7cf', mesh2: '#aab5a8', mesh3: '#d0d7cf', mesh4: '#aab5a8' },
};

/**
 * Apply theme CSS variables to document root.
 * Call this in useEffect whenever theme/accent/wallpaper changes.
 */
export function applyThemeVariables(
  theme: ThemeMode,
  accent: AccentColor,
  wallpaper: WallpaperOption
) {
  const root = document.documentElement;
  
  // Apply accent HSL
  const hsl = ACCENT_HSL[accent];
  root.style.setProperty('--accent-h', String(hsl.h));
  root.style.setProperty('--accent-s', `${hsl.s}%`);
  root.style.setProperty('--accent-l', `${hsl.l}%`);

  // Apply mesh colors. The active Theme drives the identity palette (so the
  // Theme picker in Settings visibly changes the OS); the Wallpaper selector
  // overrides it when one is chosen. Falls back to the charcoal default.
  const themeMesh = THEME_MESH[theme];
  const wallpaperMesh = wallpaper?.id ? WALLPAPER_MESH[wallpaper.id] : undefined;
  const mesh = wallpaperMesh || themeMesh || THEME_MESH['linear-dark'];
  root.style.setProperty('--mesh-1', mesh.mesh1);
  root.style.setProperty('--mesh-2', mesh.mesh2);
  root.style.setProperty('--mesh-3', mesh.mesh3);
  root.style.setProperty('--mesh-4', mesh.mesh4);
}

/**
 * Returns Tailwind-class maps for the current accent color.
 * Still used by components that need explicit Tailwind classes.
 */
export function getAccentClasses(accent: AccentColor) {
  return {
    bg: 'btn-accent',
    bgSubtle: 'bg-[var(--accent-subtle)]',
    text: 'accent-text',
    textDark: 'accent-text',
    border: 'border-[var(--accent)]',
    ring: 'focus:ring-[var(--accent)]',
    badge: 'bg-[var(--accent-subtle)] text-[var(--accent)] border-[var(--accent-subtle)]',
    glow: 'shadow-[var(--accent-glow)]'
  };
}