import type { App, Plugin } from 'vue'
import VueSpeedometer from './components/VueSpeedometer.vue'

export { VueSpeedometer }

// Re-export types
export type { Segment, AlertThreshold, NeedleConfig, ConcentricArc } from './components/VueSpeedometer.vue'
export type { SpeedometerTheme, ThemeName } from './themes'
export type { EasingName } from './utils/animation'

// Re-export utilities that may be useful
export { getTheme, themes } from './themes'
export { easings } from './utils/animation'

/**
 * Vue plugin installer.
 * Usage: app.use(VueAdvancedSpeedometer)
 */
const VueAdvancedSpeedometer: Plugin = {
  install(app: App) {
    app.component('VueSpeedometer', VueSpeedometer)
  },
}

export default VueAdvancedSpeedometer
