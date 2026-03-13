/**
 * Math utilities for SVG gauge rendering.
 */

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Linear interpolation between a and b */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

/** Degrees to radians */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}

/** Radians to degrees */
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI
}

/** Convert polar coordinates to cartesian */
export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = degreesToRadians(angleDeg)
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

/**
 * Generate an SVG arc path `d` attribute.
 * Angles are in degrees, measured clockwise from 3-o'clock.
 */
export function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const diff = endAngle - startAngle
  const largeArcFlag = diff <= 180 ? '0' : '1'

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ')
}

/**
 * Compute the angle for a value within [min, max] mapped to [startAngle, endAngle].
 */
export function valueToAngle(
  value: number,
  min: number,
  max: number,
  startAngle: number,
  endAngle: number
): number {
  const clamped = clamp(value, min, max)
  return mapRange(clamped, min, max, startAngle, endAngle)
}

/**
 * Map a value from one range to another using a log₁₀ scale.
 * Handles min=0 by offsetting by 1 internally to avoid log(0).
 */
export function mapLogRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  // Offset to avoid log(0)
  const offset = inMin <= 0 ? 1 - inMin : 0
  const logMin = Math.log10(inMin + offset)
  const logMax = Math.log10(inMax + offset)
  const logVal = Math.log10(clamp(value, inMin, inMax) + offset)
  if (logMax === logMin) return outMin
  return ((logVal - logMin) / (logMax - logMin)) * (outMax - outMin) + outMin
}

/**
 * Compute the angle for a value using a logarithmic scale.
 */
export function valueToAngleLog(
  value: number,
  min: number,
  max: number,
  startAngle: number,
  endAngle: number
): number {
  const clamped = clamp(value, min, max)
  return mapLogRange(clamped, min, max, startAngle, endAngle)
}
