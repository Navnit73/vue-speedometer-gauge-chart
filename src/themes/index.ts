/**
 * Built-in themes for VueSpeedometer.
 */

export interface SpeedometerTheme {
  name: string
  background: string
  arcBackground: string
  arcDefaultColors: string[]
  needleColor: string
  needleCircleColor: string
  tickColor: string
  labelColor: string
  valueColor: string
  titleColor: string
  fontFamily: string
  glowColor?: string
}

export const themes: Record<string, SpeedometerTheme> = {
  light: {
    name: 'light',
    background: '#ffffff',
    arcBackground: '#e8ecf1',
    arcDefaultColors: ['#4caf50', '#ffeb3b', '#f44336'],
    needleColor: '#37474f',
    needleCircleColor: '#455a64',
    tickColor: '#90a4ae',
    labelColor: '#546e7a',
    valueColor: '#263238',
    titleColor: '#37474f',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  dark: {
    name: 'dark',
    background: '#1a1a2e',
    arcBackground: '#16213e',
    arcDefaultColors: ['#00e5ff', '#7c4dff', '#ff4081'],
    needleColor: '#00e5ff',
    needleCircleColor: '#0a1628',
    tickColor: '#4a5568',
    labelColor: '#a0aec0',
    valueColor: '#e2e8f0',
    titleColor: '#cbd5e0',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    glowColor: '#00e5ff',
  },

  material: {
    name: 'material',
    background: '#fafafa',
    arcBackground: '#e0e0e0',
    arcDefaultColors: ['#2196f3', '#ff9800', '#f44336'],
    needleColor: '#424242',
    needleCircleColor: '#616161',
    tickColor: '#bdbdbd',
    labelColor: '#757575',
    valueColor: '#212121',
    titleColor: '#424242',
    fontFamily: "'Roboto', 'Segoe UI', sans-serif",
  },

  minimal: {
    name: 'minimal',
    background: 'transparent',
    arcBackground: '#f0f0f0',
    arcDefaultColors: ['#6b7280'],
    needleColor: '#374151',
    needleCircleColor: '#4b5563',
    tickColor: '#d1d5db',
    labelColor: '#9ca3af',
    valueColor: '#1f2937',
    titleColor: '#374151',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },

  neon: {
    name: 'neon',
    background: '#0d0d0d',
    arcBackground: '#1a1a1a',
    arcDefaultColors: ['#39ff14', '#ffff00', '#ff073a'],
    needleColor: '#39ff14',
    needleCircleColor: '#111111',
    tickColor: '#333333',
    labelColor: '#39ff14',
    valueColor: '#39ff14',
    titleColor: '#39ff14',
    fontFamily: "'Orbitron', 'Courier New', monospace",
    glowColor: '#39ff14',
  },
}

export type ThemeName = keyof typeof themes

export function getTheme(name: string): SpeedometerTheme {
  return themes[name] || themes.light
}
