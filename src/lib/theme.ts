import { AccentColor, ThemeMode, WallpaperOption } from '../types';

/**
 * Accent color HSL mappings.
 * These get applied as CSS custom properties on :root
 * so the entire design system responds to accent changes.
 */
const ACCENT_HSL: Record<AccentColor, { h: number; s: number; l: number }> = {
  terracotta: { h: 11,  s: 73, l: 56 }, // #e05a3d
  cobalt:     { h: 221, s: 83, l: 53 }, // #2563eb
  pine:       { h: 176, s: 69, l: 22 }, // #115e59
  lavender:   { h: 258, s: 90, l: 66 }, // #8b5cf6
  mustard:    { h: 45,  s: 93, l: 47 }, // #eab308
  slate:      { h: 215, s: 19, l: 35 }, // #475569
};

const WALLPAPER_MESH: Record<string, { mesh1: string; mesh2: string; mesh3: string; mesh4: string }> = {
  'dark-obsidian':   { mesh1: '#00adb5', mesh2: '#393e46', mesh3: '#00adb5', mesh4: '#222831' }, // ColorHunt: Dark Teal
  'cyber-mesh':      { mesh1: '#e94560', mesh2: '#16213e', mesh3: '#0f3460', mesh4: '#e94560' }, // ColorHunt: Neon Red/Blue
  'aurora-waves':    { mesh1: '#11999e', mesh2: '#30e3ca', mesh3: '#40514e', mesh4: '#11999e' }, // ColorHunt: Aqua Mint
  'midnight-violet': { mesh1: '#f8b500', mesh2: '#393e46', mesh3: '#f8b500', mesh4: '#222831' }, // ColorHunt: Dark Yellow
  'arctic-clean':    { mesh1: '#3f72af', mesh2: '#dbe2ef', mesh3: '#112d4e', mesh4: '#3f72af' }, // ColorHunt: Crisp Blue
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