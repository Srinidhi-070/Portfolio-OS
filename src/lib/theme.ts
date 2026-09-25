import { AccentColor, ThemeMode, WallpaperOption } from '../types';

/**
 * Accent color HSL mappings.
 * These get applied as CSS custom properties on :root
 * so the entire design system responds to accent changes.
 */
const ACCENT_HSL: Record<AccentColor, { h: number; s: number; l: number }> = {
  emerald: { h: 160, s: 84, l: 39 },
  violet:  { h: 263, s: 70, l: 50 },
  cyan:    { h: 188, s: 94, l: 43 },
  amber:   { h: 39,  s: 95, l: 49 },
  rose:    { h: 350, s: 89, l: 60 },
  indigo:  { h: 239, s: 84, l: 67 },
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
  switch (accent) {
    case 'emerald':
      return {
        bg: 'bg-emerald-500',
        bgSubtle: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        textDark: 'text-emerald-500',
        border: 'border-emerald-500/30',
        ring: 'focus:ring-emerald-500',
        badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        glow: 'shadow-emerald-500/20'
      };
    case 'violet':
      return {
        bg: 'bg-violet-500',
        bgSubtle: 'bg-violet-500/10',
        text: 'text-violet-400',
        textDark: 'text-violet-500',
        border: 'border-violet-500/30',
        ring: 'focus:ring-violet-500',
        badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
        glow: 'shadow-violet-500/20'
      };
    case 'cyan':
      return {
        bg: 'bg-cyan-500',
        bgSubtle: 'bg-cyan-500/10',
        text: 'text-cyan-400',
        textDark: 'text-cyan-500',
        border: 'border-cyan-500/30',
        ring: 'focus:ring-cyan-500',
        badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
        glow: 'shadow-cyan-500/20'
      };
    case 'amber':
      return {
        bg: 'bg-amber-500',
        bgSubtle: 'bg-amber-500/10',
        text: 'text-amber-400',
        textDark: 'text-amber-500',
        border: 'border-amber-500/30',
        ring: 'focus:ring-amber-500',
        badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        glow: 'shadow-amber-500/20'
      };
    case 'rose':
      return {
        bg: 'bg-rose-500',
        bgSubtle: 'bg-rose-500/10',
        text: 'text-rose-400',
        textDark: 'text-rose-500',
        border: 'border-rose-500/30',
        ring: 'focus:ring-rose-500',
        badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        glow: 'shadow-rose-500/20'
      };
    case 'indigo':
    default:
      return {
        bg: 'bg-indigo-500',
        bgSubtle: 'bg-indigo-500/10',
        text: 'text-indigo-400',
        textDark: 'text-indigo-500',
        border: 'border-indigo-500/30',
        ring: 'focus:ring-indigo-500',
        badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
        glow: 'shadow-indigo-500/20'
      };
  }
}
