/**
 * Color utilities for gradient interpolation and SVG gradient generation.
 */

export interface RGB {
  r: number
  g: number
  b: number
}

/** Parse a hex color string to RGB */
export function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '')
  const bigint = parseInt(clean, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

/** Convert RGB to hex string */
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    '#' +
    [r, g, b]
      .map((c) => {
        const hex = Math.round(c).toString(16)
        return hex.length === 1 ? '0' + hex : hex
      })
      .join('')
  )
}

/** Interpolate between two hex colors at position t (0–1) */
export function interpolateColor(color1: string, color2: string, t: number): string {
  const c1 = hexToRgb(color1)
  const c2 = hexToRgb(color2)
  return rgbToHex(
    c1.r + (c2.r - c1.r) * t,
    c1.g + (c2.g - c1.g) * t,
    c1.b + (c2.b - c1.b) * t
  )
}

/**
 * Given an array of hex colors and a position t (0–1),
 * return the interpolated color along the gradient.
 */
export function getGradientColor(colors: string[], t: number): string {
  if (colors.length === 0) return '#888888'
  if (colors.length === 1) return colors[0]

  const clamped = Math.max(0, Math.min(1, t))
  const segmentCount = colors.length - 1
  const segment = Math.min(Math.floor(clamped * segmentCount), segmentCount - 1)
  const localT = (clamped - segment / segmentCount) * segmentCount
  return interpolateColor(colors[segment], colors[segment + 1], localT)
}

let gradientIdCounter = 0

/** Generate a unique SVG gradient ID */
export function generateGradientId(): string {
  return `speedometer-grad-${++gradientIdCounter}-${Date.now()}`
}
