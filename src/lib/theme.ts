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
  // Light Wallpapers (Subtle, Elegant, Professional)
  'light-silver': { mesh1: '#f8f9fa', mesh2: '#e9ecef', mesh3: '#dee2e6', mesh4: '#ffffff' },
  'light-sage':   { mesh1: '#d4dcd2', mesh2: '#e2e8e0', mesh3: '#c5cfc2', mesh4: '#ffffff' },
  'light-arctic': { mesh1: '#e0f2fe', mesh2: '#f0f9ff', mesh3: '#bae6fd', mesh4: '#ffffff' },
  'light-sand':   { mesh1: '#fdf5e6', mesh2: '#fff8dc', mesh3: '#faebd7', mesh4: '#ffffff' },
  
  // Dark Wallpapers (Classic, High Contrast, Deep)
  'dark-obsidian': { mesh1: '#00adb5', mesh2: '#393e46', mesh3: '#00adb5', mesh4: '#222831' },
  'dark-violet':   { mesh1: '#f8b500', mesh2: '#393e46', mesh3: '#f8b500', mesh4: '#222831' },
  'dark-space':    { mesh1: '#020617', mesh2: '#0f172a', mesh3: '#1e293b', mesh4: '#000000' },
  'dark-cyber':    { mesh1: '#e94560', mesh2: '#16213e', mesh3: '#0f3460', mesh4: '#e94560' },
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