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

const VIBRANT_MESH = {
  mesh1: 'rgba(99, 102, 241, 0.45)', // Indigo
  mesh2: 'rgba(168, 85, 247, 0.45)', // Purple
  mesh3: 'rgba(236, 72, 153, 0.45)', // Pink
  mesh4: 'rgba(14, 165, 233, 0.45)'  // Cyan
};

const WALLPAPER_MESH: Record<string, { mesh1: string; mesh2: string; mesh3: string; mesh4: string }> = {
  'light-silver': VIBRANT_MESH,
  'light-sage': VIBRANT_MESH,
  'light-arctic': VIBRANT_MESH,
  'light-sand': VIBRANT_MESH,
  'dark-obsidian': VIBRANT_MESH,
  'dark-violet': VIBRANT_MESH,
  'dark-space': VIBRANT_MESH,
  'dark-cyber': VIBRANT_MESH,
};

const THEME_MESH: Record<string, { mesh1: string; mesh2: string; mesh3: string; mesh4: string }> = {
  'linear-dark': VIBRANT_MESH,
  'vercel-light': VIBRANT_MESH,
  'dracula': VIBRANT_MESH,
  'monochrome': VIBRANT_MESH,
  'neo-brutal': VIBRANT_MESH,
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