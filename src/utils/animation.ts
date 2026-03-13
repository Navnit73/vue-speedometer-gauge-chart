/**
 * requestAnimationFrame-based animation engine with easing.
 */

export type EasingFunction = (t: number) => number

/** Built-in easing functions */
export const easings = {
  linear: (t: number) => t,

  easeInQuad: (t: number) => t * t,

  easeOutQuad: (t: number) => t * (2 - t),

  easeInOutQuad: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  easeOutCubic: (t: number) => --t * t * t + 1,

  easeInOutCubic: (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  easeOutElastic: (t: number) => {
    const p = 0.3
    return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
  },

  easeOutBack: (t: number) => {
    const s = 1.70158
    return --t * t * ((s + 1) * t + s) + 1
  },

  easeBounceOut: (t: number) => {
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  },

  // Aliases for naming consistency
  easeElasticOut: (t: number) => {
    const p = 0.3
    return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
  },

  easeBackOut: (t: number) => {
    const s = 1.70158
    return --t * t * ((s + 1) * t + s) + 1
  },
} as const

export type EasingName = keyof typeof easings

export interface AnimationHandle {
  cancel: () => void
}

/**
 * Animate a value from `from` to `to` over `duration` ms.
 * Calls `onUpdate(current)` each frame and `onComplete()` when done.
 */
export function animate(
  from: number,
  to: number,
  duration: number,
  easing: EasingFunction | EasingName,
  onUpdate: (value: number) => void,
  onComplete?: () => void
): AnimationHandle {
  const easingFn = typeof easing === 'string' ? easings[easing] : easing
  let startTime: number | null = null
  let rafId: number | null = null
  let cancelled = false

  function step(timestamp: number) {
    if (cancelled) return
    if (startTime === null) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / Math.max(duration, 1), 1)
    const easedProgress = easingFn(progress)
    const currentValue = from + (to - from) * easedProgress

    onUpdate(currentValue)

    if (progress < 1) {
      rafId = requestAnimationFrame(step)
    } else {
      onUpdate(to) // ensure exact final value
      onComplete?.()
    }
  }

  rafId = requestAnimationFrame(step)

  return {
    cancel: () => {
      cancelled = true
      if (rafId !== null) cancelAnimationFrame(rafId)
    },
  }
}
