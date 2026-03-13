<template>
  <div
    ref="containerRef"
    class="vue-speedometer-container"
    :style="containerStyle"
  >
    <svg
      ref="svgRef"
      :viewBox="viewBox"
      :width="containerWidth || '100%'"
      :height="containerHeight || 'auto'"
      class="vue-speedometer-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Gradient definition for arc -->
        <linearGradient
          v-if="gradientColors.length > 1"
          :id="gradientId"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            v-for="(color, i) in gradientColors"
            :key="i"
            :offset="`${(i / (gradientColors.length - 1)) * 100}%`"
            :stop-color="color"
          />
        </linearGradient>

        <!-- Glow filter for neon/alert effects -->
        <filter :id="glowFilterId" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <!-- Needle shadow -->
        <filter :id="needleShadowId" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.3" />
        </filter>

        <!-- Sparkline gradient -->
        <linearGradient
          v-if="valueHistory.length > 1"
          :id="sparklineGradientId"
          x1="0%" y1="0%" x2="100%" y2="0%"
        >
          <stop offset="0%" :stop-color="needleColorFinal" stop-opacity="0" />
          <stop offset="100%" :stop-color="needleColorFinal" stop-opacity="0.6" />
        </linearGradient>
      </defs>

      <!-- Background arc -->
      <path
        :d="backgroundArcPath"
        fill="none"
        :stroke="currentTheme.arcBackground"
        :stroke-width="arcWidth"
        stroke-linecap="round"
      />

      <!-- Colored segments -->
      <g v-for="(seg, i) in renderedSegments" :key="'seg-' + i">
        <path
          :d="seg.path"
          fill="none"
          :stroke="seg.color"
          :stroke-width="arcWidth"
          stroke-linecap="round"
          :opacity="seg.opacity"
          :filter="activeAlert && currentTheme.glowColor ? `url(#${glowFilterId})` : undefined"
          @mouseenter="onSegmentHover(i, $event)"
          @mouseleave="onSegmentLeaveHover(i)"
        />
        <!-- Native SVG tooltip on segment -->
        <title v-if="tooltips">{{ seg.label }}</title>
      </g>

      <!-- Gradient arc (if gradient prop provided) -->
      <path
        v-if="gradientColors.length > 1"
        :d="valueArcPath"
        fill="none"
        :stroke="`url(#${gradientId})`"
        :stroke-width="arcWidth"
        stroke-linecap="round"
      />

      <!-- Concentric arcs (V2 secondary metrics) -->
      <g v-for="(ca, i) in renderedConcentricArcs" :key="'ca-' + i">
        <path
          :d="ca.bgPath"
          fill="none"
          :stroke="currentTheme.arcBackground"
          :stroke-width="ca.width"
          stroke-linecap="round"
          opacity="0.4"
        />
        <path
          :d="ca.valuePath"
          fill="none"
          :stroke="ca.color"
          :stroke-width="ca.width"
          stroke-linecap="round"
          opacity="0.85"
        />
      </g>

      <!-- Value history sparkline (V2) -->
      <path
        v-if="sparklinePath"
        :d="sparklinePath"
        fill="none"
        :stroke="`url(#${sparklineGradientId})`"
        :stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.7"
        class="vue-speedometer-sparkline"
      />

      <!-- Minor ticks -->
      <line
        v-for="(tick, i) in minorTickMarks"
        :key="'minor-' + i"
        :x1="tick.x1"
        :y1="tick.y1"
        :x2="tick.x2"
        :y2="tick.y2"
        :stroke="currentTheme.tickColor"
        :stroke-width="1"
        stroke-linecap="round"
        :opacity="0.5"
      />

      <!-- Major ticks -->
      <line
        v-for="(tick, i) in majorTickMarks"
        :key="'major-' + i"
        :x1="tick.x1"
        :y1="tick.y1"
        :x2="tick.x2"
        :y2="tick.y2"
        :stroke="currentTheme.tickColor"
        :stroke-width="2.5"
        stroke-linecap="round"
      />

      <!-- Labels -->
      <template v-if="showLabels">
        <text
          v-for="(label, i) in tickLabels"
          :key="'label-' + i"
          :x="label.x"
          :y="label.y"
          :fill="currentTheme.labelColor"
          :font-size="labelFontSize"
          :font-family="currentTheme.fontFamily"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          {{ label.text }}
        </text>
      </template>

      <!-- Alert indicator ring -->
      <circle
        v-if="activeAlert"
        :cx="center.x"
        :cy="center.y"
        :r="arcRadius + arcWidth / 2 + 6"
        fill="none"
        :stroke="activeAlert.color"
        :stroke-width="2"
        :opacity="alertPulseOpacity"
        class="vue-speedometer-alert-ring"
      />

      <!-- Needles — V2 multi-needle support -->
      <g v-for="(needle, ni) in computedNeedles" :key="'needle-' + ni">
        <line
          :x1="needle.tail.x"
          :y1="needle.tail.y"
          :x2="needle.tip.x"
          :y2="needle.tip.y"
          :stroke="needle.color"
          :stroke-width="needle.width"
          stroke-linecap="round"
          :filter="`url(#${needleShadowId})`"
        />
        <!-- Needle label (V2) -->
        <text
          v-if="needle.label"
          :x="needle.labelPos.x"
          :y="needle.labelPos.y"
          :fill="needle.color"
          :font-size="9"
          :font-family="currentTheme.fontFamily"
          text-anchor="middle"
          dominant-baseline="middle"
          font-weight="600"
          opacity="0.8"
        >
          {{ needle.label }}
        </text>
      </g>

      <!-- Center circle (pivot dot) -->
      <circle
        :cx="center.x"
        :cy="center.y"
        :r="centerDotRadius"
        :fill="needleColorFinal"
        :stroke="currentTheme.needleCircleColor"
        :stroke-width="2"
      />

      <!-- Value text (default, if no center slot) -->
      <text
        v-if="!hasCenterSlot"
        :x="valueTextPos.x"
        :y="valueTextPos.y"
        :fill="currentTheme.valueColor"
        :font-size="valueFontSize"
        :font-family="currentTheme.fontFamily"
        font-weight="700"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        {{ formattedValue }}
      </text>

      <!-- Center slot via foreignObject -->
      <foreignObject
        v-if="hasCenterSlot"
        :x="center.x - centerSlotSize / 2"
        :y="center.y + 15"
        :width="centerSlotSize"
        :height="centerSlotSize * 0.6"
      >
        <div class="vue-speedometer-center-slot" xmlns="http://www.w3.org/1999/xhtml">
          <slot name="center" :value="currentDisplayValue" :percentage="percentage" />
        </div>
      </foreignObject>

      <!-- Tooltip overlay (V2) -->
      <foreignObject
        v-if="tooltipVisible"
        :x="tooltipPos.x - 60"
        :y="tooltipPos.y - 36"
        width="120"
        height="32"
        style="pointer-events: none; overflow: visible;"
      >
        <div class="vue-speedometer-tooltip" xmlns="http://www.w3.org/1999/xhtml">
          {{ tooltipText }}
        </div>
      </foreignObject>
    </svg>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  useSlots,
  type PropType,
} from 'vue'
import { clamp, polarToCartesian, describeArc, valueToAngle, valueToAngleLog, mapLogRange } from '../utils/math'
import { animate, type AnimationHandle, type EasingName } from '../utils/animation'
import { getGradientColor, generateGradientId } from '../utils/color'
import { getTheme, type SpeedometerTheme, type ThemeName } from '../themes'
import { exportAsPng, exportAsSvg, exportAsPdf } from '../utils/export'

export interface Segment {
  from: number
  to: number
  color: string
}

export interface AlertThreshold {
  value: number
  color: string
}

/** V2: Multi-needle configuration */
export interface NeedleConfig {
  value: number
  color?: string
  label?: string
  width?: number
}

/** V2: Concentric arc for secondary metrics */
export interface ConcentricArc {
  radius: number
  color: string
  value: number
  max?: number
  width?: number
}

export default defineComponent({
  name: 'VueSpeedometer',

  props: {
    /** Current value */
    value: { type: Number, default: 0 },
    /** Minimum value */
    min: { type: Number, default: 0 },
    /** Maximum value */
    max: { type: Number, default: 100 },
    /** Gauge type */
    type: {
      type: String as PropType<'full' | 'semi' | 'quarter'>,
      default: 'semi',
    },
    /** Colored arc segments */
    segments: {
      type: Array as PropType<Segment[]>,
      default: () => [],
    },
    /** Arc gradient colors (overrides segments if provided) */
    gradient: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    /** Needle color */
    needleColor: { type: String, default: '' },
    /** Needle stroke width */
    needleWidth: { type: Number, default: 3 },
    /** Show tick marks */
    showTicks: { type: Boolean, default: true },
    /** Number of major tick divisions */
    majorTicks: { type: Number, default: 5 },
    /** Number of minor ticks between each major tick */
    minorTicks: { type: Number, default: 4 },
    /** Show value labels */
    showLabels: { type: Boolean, default: true },
    /** Animation duration in ms */
    animationDuration: { type: [Number, String], default: 800 },
    /** Animation easing */
    easing: {
      type: String as PropType<EasingName>,
      default: 'easeOutCubic',
    },
    /** Theme name */
    theme: {
      type: String as PropType<ThemeName | string>,
      default: 'light',
    },
    /** Custom theme object (overrides theme name) */
    customTheme: {
      type: Object as PropType<Partial<SpeedometerTheme>>,
      default: () => ({}),
    },
    /** Alert thresholds */
    alerts: {
      type: Array as PropType<AlertThreshold[]>,
      default: () => [],
    },
    /** Arc width / thickness */
    arcWidth: { type: Number, default: 20 },
    /** Width override */
    width: { type: [Number, String], default: undefined },
    /** Height override */
    height: { type: [Number, String], default: undefined },
    /** Value format function */
    formatValue: {
      type: Function as PropType<(value: number) => string>,
      default: undefined,
    },
    /** Title text under the value */
    title: { type: String, default: '' },

    // =================== V2 PROPS ===================

    /** V2: Multiple needles */
    needles: {
      type: Array as PropType<NeedleConfig[]>,
      default: () => [],
    },
    /** V2: Use logarithmic scale */
    logarithmic: { type: Boolean, default: false },
    /** V2: Custom tick label formatter */
    formatTick: {
      type: Function as PropType<(value: number) => string>,
      default: undefined,
    },
    /** V2: Concentric arcs for secondary metrics */
    concentricArcs: {
      type: Array as PropType<ConcentricArc[]>,
      default: () => [],
    },
    /** V2: Enable segment hover tooltips */
    tooltips: { type: Boolean, default: false },
    /** V2: Value history for sparkline trail */
    valueHistory: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  },

  emits: ['value-change', 'segment-enter', 'segment-leave', 'animation-end'],

  setup(props, { emit, expose }) {
    const slots = useSlots()

    // Refs
    const containerRef = ref<HTMLDivElement | null>(null)
    const svgRef = ref<SVGSVGElement | null>(null)
    const containerWidth = ref<number | undefined>(undefined)
    const containerHeight = ref<number | undefined>(undefined)
    const currentDisplayValue = ref(props.value)
    const alertPulseOpacity = ref(0.8)
    let animationHandle: AnimationHandle | null = null
    let alertAnimationId: number | null = null
    let resizeObserver: ResizeObserver | null = null

    // V2: Multi-needle animated display values
    const needleDisplayValues = ref<number[]>([])
    let needleAnimationHandles: (AnimationHandle | null)[] = []

    // V2: Tooltip state
    const tooltipVisible = ref(false)
    const tooltipText = ref('')
    const tooltipPos = ref({ x: 0, y: 0 })

    // Unique IDs
    const gradientId = generateGradientId()
    const glowFilterId = `speedometer-glow-${Date.now()}`
    const needleShadowId = `speedometer-needle-shadow-${Date.now()}`
    const sparklineGradientId = `speedometer-sparkline-${Date.now()}`

    // ================================================================
    //  LAYOUT GEOMETRY
    // ================================================================

    const SIZE = 300
    const PAD = 40

    const center = computed(() => {
      if (props.type === 'quarter') {
        return { x: SIZE - PAD - 10, y: SIZE - PAD - 10 }
      }
      return { x: SIZE / 2, y: SIZE / 2 }
    })

    const arcRadius = computed(() => {
      if (props.type === 'quarter') {
        return SIZE - PAD * 2 - 20
      }
      return SIZE / 2 - props.arcWidth / 2 - PAD
    })

    const arcConfig = computed(() => {
      switch (props.type) {
        case 'full':
          return { startAngle: 135, endAngle: 405, sweep: 270 }
        case 'quarter':
          return { startAngle: 180, endAngle: 270, sweep: 90 }
        case 'semi':
        default:
          return { startAngle: 180, endAngle: 360, sweep: 180 }
      }
    })

    const viewBox = computed(() => {
      switch (props.type) {
        case 'full':
          return `0 0 ${SIZE} ${SIZE + 35}`
        case 'quarter':
          return `0 0 ${SIZE} ${SIZE}`
        case 'semi':
        default:
          return `0 0 ${SIZE} ${SIZE * 0.75}`
      }
    })

    // ================================================================
    //  V2: Angle helper — picks linear or log based on prop
    // ================================================================
    function computeAngle(value: number): number {
      if (props.logarithmic) {
        return valueToAngleLog(
          value, props.min, props.max,
          arcConfig.value.startAngle, arcConfig.value.endAngle
        )
      }
      return valueToAngle(
        value, props.min, props.max,
        arcConfig.value.startAngle, arcConfig.value.endAngle
      )
    }

    // ================================================================
    //  NEEDLE — calculated endpoints
    // ================================================================

    const needleLengthVal = computed(() => arcRadius.value * 0.75)
    const needleTailLengthVal = computed(() => 15)
    const centerDotRadius = computed(() => 8)
    const centerSlotSize = computed(() => arcRadius.value * 0.9)
    const labelFontSize = computed(() => 11)
    const valueFontSize = computed(() => 28)

    // Primary needle angle
    const currentNeedleAngle = computed(() => computeAngle(currentDisplayValue.value))

    const needleTip = computed(() =>
      polarToCartesian(center.value.x, center.value.y, needleLengthVal.value, currentNeedleAngle.value)
    )

    const needleTail = computed(() =>
      polarToCartesian(center.value.x, center.value.y, needleTailLengthVal.value, currentNeedleAngle.value + 180)
    )

    // ================================================================
    //  V2: MULTI-NEEDLE computed array
    // ================================================================
    const computedNeedles = computed(() => {
      const result: {
        tip: { x: number; y: number }
        tail: { x: number; y: number }
        color: string
        width: number
        label: string
        labelPos: { x: number; y: number }
      }[] = []

      if (props.needles.length > 0) {
        // Multi-needle mode
        for (let i = 0; i < props.needles.length; i++) {
          const nc = props.needles[i]
          const displayVal = needleDisplayValues.value[i] ?? nc.value
          const angle = computeAngle(displayVal)
          const tip = polarToCartesian(center.value.x, center.value.y, needleLengthVal.value, angle)
          const tail = polarToCartesian(center.value.x, center.value.y, needleTailLengthVal.value, angle + 180)
          const labelPos = polarToCartesian(center.value.x, center.value.y, needleLengthVal.value + 14, angle)
          result.push({
            tip,
            tail,
            color: nc.color || needleColorFinal.value,
            width: nc.width || props.needleWidth,
            label: nc.label || '',
            labelPos,
          })
        }
      } else {
        // Single needle
        result.push({
          tip: needleTip.value,
          tail: needleTail.value,
          color: needleColorFinal.value,
          width: needleWidthFinal.value,
          label: '',
          labelPos: { x: 0, y: 0 },
        })
      }

      return result
    })

    // Value text position
    const valueTextPos = computed(() => {
      if (props.type === 'semi') {
        return { x: center.value.x, y: center.value.y + arcRadius.value * 0.4 }
      }
      if (props.type === 'quarter') {
        return { x: center.value.x - arcRadius.value * 0.45, y: center.value.y - 15 }
      }
      return { x: center.value.x, y: center.value.y + arcRadius.value * 0.4 }
    })

    // ---- Computed: Theme ----
    const currentTheme = computed<SpeedometerTheme>(() => {
      const base = getTheme(props.theme as string)
      return { ...base, ...props.customTheme } as SpeedometerTheme
    })

    const containerStyle = computed(() => ({
      background: currentTheme.value.background,
      width: props.width ? (typeof props.width === 'number' ? `${props.width}px` : props.width) : '100%',
      height: props.height ? (typeof props.height === 'number' ? `${props.height}px` : props.height) : 'auto',
    }))

    // ---- Computed: Colors ----
    const gradientColors = computed(() => props.gradient || [])

    const needleColorFinal = computed(() =>
      props.needleColor || currentTheme.value.needleColor
    )

    const needleWidthFinal = computed(() => props.needleWidth)

    // ---- Computed: Segments ----
    const effectiveSegments = computed<Segment[]>(() => {
      if (props.segments.length > 0) return props.segments
      const colors = currentTheme.value.arcDefaultColors
      const range = props.max - props.min
      const segCount = colors.length
      return colors.map((color, i) => ({
        from: props.min + (range / segCount) * i,
        to: props.min + (range / segCount) * (i + 1),
        color,
      }))
    })

    const renderedSegments = computed(() => {
      if (gradientColors.value.length > 1) return []
      return effectiveSegments.value.map((seg) => {
        const startA = computeAngle(seg.from)
        const endA = computeAngle(seg.to)
        return {
          path: describeArc(center.value.x, center.value.y, arcRadius.value, startA, endA),
          color: seg.color,
          opacity: 1,
          label: `${Math.round(seg.from)} → ${Math.round(seg.to)}`,
        }
      })
    })

    // ---- Computed: Value arc (for gradient) ----
    const valueArcPath = computed(() => {
      const valAngle = computeAngle(currentDisplayValue.value)
      return describeArc(
        center.value.x,
        center.value.y,
        arcRadius.value,
        arcConfig.value.startAngle,
        valAngle
      )
    })

    // ---- Computed: Background arc path ----
    const backgroundArcPath = computed(() =>
      describeArc(
        center.value.x,
        center.value.y,
        arcRadius.value,
        arcConfig.value.startAngle,
        arcConfig.value.endAngle
      )
    )

    // ================================================================
    //  V2: CONCENTRIC ARCS
    // ================================================================
    const renderedConcentricArcs = computed(() => {
      return props.concentricArcs.map((ca) => {
        const r = ca.radius
        const w = ca.width || 6
        const caMax = ca.max || props.max
        const valAngle = props.logarithmic
          ? valueToAngleLog(ca.value, props.min, caMax, arcConfig.value.startAngle, arcConfig.value.endAngle)
          : valueToAngle(ca.value, props.min, caMax, arcConfig.value.startAngle, arcConfig.value.endAngle)

        return {
          bgPath: describeArc(center.value.x, center.value.y, r, arcConfig.value.startAngle, arcConfig.value.endAngle),
          valuePath: describeArc(center.value.x, center.value.y, r, arcConfig.value.startAngle, valAngle),
          color: ca.color,
          width: w,
        }
      })
    })

    // ================================================================
    //  V2: SPARKLINE
    // ================================================================
    const sparklinePath = computed(() => {
      if (props.valueHistory.length < 2) return ''
      const points: { x: number; y: number }[] = []
      const histLen = props.valueHistory.length
      // Distribute history points along a small arc near the center
      const sparkRadius = arcRadius.value * 0.55
      for (let i = 0; i < histLen; i++) {
        const v = props.valueHistory[i]
        const angle = computeAngle(v)
        const t = i / (histLen - 1)
        // Sparkline radiates from slightly inner radius
        const r = sparkRadius - 10 + t * 20
        const pt = polarToCartesian(center.value.x, center.value.y, r, angle)
        points.push(pt)
      }
      if (points.length < 2) return ''
      let d = `M ${points[0].x} ${points[0].y}`
      for (let i = 1; i < points.length; i++) {
        d += ` L ${points[i].x} ${points[i].y}`
      }
      return d
    })

    // ---- Computed: Ticks (outside the arc) ----
    const majorTickMarks = computed(() => {
      if (!props.showTicks) return []
      const ticks: { x1: number; y1: number; x2: number; y2: number }[] = []
      const count = props.majorTicks
      for (let i = 0; i <= count; i++) {
        const t = i / count
        let angle: number
        if (props.logarithmic) {
          // Space ticks logarithmically
          const val = props.min + (props.max - props.min) * t
          angle = computeAngle(val)
        } else {
          angle = arcConfig.value.startAngle + (arcConfig.value.sweep / count) * i
        }
        const inner = polarToCartesian(center.value.x, center.value.y, arcRadius.value + props.arcWidth / 2 + 2, angle)
        const outer = polarToCartesian(center.value.x, center.value.y, arcRadius.value + props.arcWidth / 2 + 12, angle)
        ticks.push({ x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y })
      }
      return ticks
    })

    const minorTickMarks = computed(() => {
      if (!props.showTicks || props.minorTicks <= 0) return []
      const ticks: { x1: number; y1: number; x2: number; y2: number }[] = []
      const totalMinor = props.majorTicks * props.minorTicks
      for (let i = 0; i <= totalMinor; i++) {
        if (i % props.minorTicks === 0) continue
        const t = i / totalMinor
        let angle: number
        if (props.logarithmic) {
          const val = props.min + (props.max - props.min) * t
          angle = computeAngle(val)
        } else {
          angle = arcConfig.value.startAngle + (arcConfig.value.sweep / totalMinor) * i
        }
        const inner = polarToCartesian(center.value.x, center.value.y, arcRadius.value + props.arcWidth / 2 + 2, angle)
        const outer = polarToCartesian(center.value.x, center.value.y, arcRadius.value + props.arcWidth / 2 + 7, angle)
        ticks.push({ x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y })
      }
      return ticks
    })

    // ---- Computed: Labels (outside ticks) with V2 formatTick support ----
    const tickLabels = computed(() => {
      if (!props.showLabels) return []
      const labels: { x: number; y: number; text: string }[] = []
      const count = props.majorTicks
      for (let i = 0; i <= count; i++) {
        const t = i / count
        const val = props.min + ((props.max - props.min) / count) * i
        let angle: number
        if (props.logarithmic) {
          angle = computeAngle(val)
        } else {
          angle = arcConfig.value.startAngle + (arcConfig.value.sweep / count) * i
        }
        const pos = polarToCartesian(center.value.x, center.value.y, arcRadius.value + props.arcWidth / 2 + 24, angle)
        // V2: Use formatTick if provided
        const text = props.formatTick ? props.formatTick(val) : Math.round(val).toString()
        labels.push({ x: pos.x, y: pos.y, text })
      }
      return labels
    })

    // ---- Computed: Value ----
    const percentage = computed(() =>
      ((clamp(props.value, props.min, props.max) - props.min) / (props.max - props.min)) * 100
    )

    const formattedValue = computed(() => {
      const v = Math.round(currentDisplayValue.value)
      if (props.formatValue) return props.formatValue(v)
      return v.toString()
    })

    const hasCenterSlot = computed(() => !!slots.center)

    // ---- Computed: Alerts ----
    const activeAlert = computed<AlertThreshold | null>(() => {
      if (!props.alerts.length) return null
      const sorted = [...props.alerts].sort((a, b) => b.value - a.value)
      for (const alert of sorted) {
        if (currentDisplayValue.value >= alert.value) return alert
      }
      return null
    })

    // ---- Segment tracking for events ----
    let currentSegmentIndex = -1

    function findSegmentIndex(value: number): number {
      return effectiveSegments.value.findIndex(
        (seg) => value >= seg.from && value <= seg.to
      )
    }

    function checkSegmentTransition(newValue: number) {
      const newIndex = findSegmentIndex(newValue)
      if (newIndex !== currentSegmentIndex) {
        if (currentSegmentIndex >= 0) {
          emit('segment-leave', {
            segment: effectiveSegments.value[currentSegmentIndex],
            index: currentSegmentIndex,
          })
        }
        if (newIndex >= 0) {
          emit('segment-enter', {
            segment: effectiveSegments.value[newIndex],
            index: newIndex,
          })
        }
        currentSegmentIndex = newIndex
      }
    }

    // ---- V2: Tooltip handlers ----
    function onSegmentHover(index: number, event: MouseEvent) {
      if (!props.tooltips) return
      const seg = effectiveSegments.value[index]
      if (!seg) return
      tooltipText.value = `${Math.round(seg.from)} → ${Math.round(seg.to)}`
      // Position tooltip near mouse in SVG coordinates
      const svgEl = svgRef.value
      if (svgEl) {
        const pt = svgEl.createSVGPoint()
        pt.x = event.clientX
        pt.y = event.clientY
        const ctm = svgEl.getScreenCTM()
        if (ctm) {
          const svgPt = pt.matrixTransform(ctm.inverse())
          tooltipPos.value = { x: svgPt.x, y: svgPt.y }
        }
      }
      tooltipVisible.value = true
    }

    function onSegmentLeaveHover(_index: number) {
      tooltipVisible.value = false
    }

    // ---- Animation ----
    function animateTo(targetValue: number, duration?: number) {
      if (animationHandle) animationHandle.cancel()

      const dur = duration ?? Number(props.animationDuration)
      const from = currentDisplayValue.value
      const to = clamp(targetValue, props.min, props.max)

      if (dur <= 0) {
        currentDisplayValue.value = to
        checkSegmentTransition(to)
        emit('animation-end', { value: to })
        return
      }

      animationHandle = animate(
        from,
        to,
        dur,
        props.easing as EasingName,
        (v) => {
          currentDisplayValue.value = v
          checkSegmentTransition(v)
        },
        () => {
          currentDisplayValue.value = to
          emit('animation-end', { value: to })
          animationHandle = null
        }
      )
    }

    // V2: Animate individual needles
    function animateNeedle(index: number, targetValue: number, duration?: number) {
      if (needleAnimationHandles[index]) {
        needleAnimationHandles[index]!.cancel()
      }

      const dur = duration ?? Number(props.animationDuration)
      const from = needleDisplayValues.value[index] ?? props.min
      const to = clamp(targetValue, props.min, props.max)

      if (dur <= 0) {
        const vals = [...needleDisplayValues.value]
        vals[index] = to
        needleDisplayValues.value = vals
        return
      }

      needleAnimationHandles[index] = animate(
        from,
        to,
        dur,
        props.easing as EasingName,
        (v) => {
          const vals = [...needleDisplayValues.value]
          vals[index] = v
          needleDisplayValues.value = vals
        },
        () => {
          const vals = [...needleDisplayValues.value]
          vals[index] = to
          needleDisplayValues.value = vals
          needleAnimationHandles[index] = null
        }
      )
    }

    function setValue(v: number) {
      const clamped = clamp(v, props.min, props.max)
      currentDisplayValue.value = clamped
      checkSegmentTransition(clamped)
    }

    function reset() {
      animateTo(props.min)
    }

    function updateSegments(_segs: Segment[]) {
      // Segments are reactive through props
    }

    async function exportAs(format: 'png' | 'svg' | 'pdf') {
      if (!svgRef.value) return
      switch (format) {
        case 'png':
          await exportAsPng(svgRef.value)
          break
        case 'svg':
          exportAsSvg(svgRef.value)
          break
        case 'pdf':
          await exportAsPdf(svgRef.value)
          break
      }
    }

    // ---- Watch value changes ----
    watch(
      () => props.value,
      (newVal, oldVal) => {
        emit('value-change', { value: newVal, oldValue: oldVal })
        animateTo(newVal)
      }
    )

    // V2: Watch multi-needle values
    watch(
      () => props.needles.map((n) => n.value),
      (newVals, oldVals) => {
        // Ensure display values array is the right size
        while (needleDisplayValues.value.length < newVals.length) {
          needleDisplayValues.value.push(props.min)
        }
        for (let i = 0; i < newVals.length; i++) {
          if (!oldVals || oldVals[i] !== newVals[i]) {
            animateNeedle(i, newVals[i])
          }
        }
      },
      { deep: true }
    )

    // ---- Alert pulse animation ----
    function startAlertPulse() {
      let increasing = false
      function pulse() {
        if (activeAlert.value) {
          alertPulseOpacity.value += increasing ? 0.02 : -0.02
          if (alertPulseOpacity.value >= 1) increasing = false
          if (alertPulseOpacity.value <= 0.3) increasing = true
        }
        alertAnimationId = requestAnimationFrame(pulse)
      }
      alertAnimationId = requestAnimationFrame(pulse)
    }

    // ---- ResizeObserver ----
    function setupResizeObserver() {
      if (!containerRef.value) return
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          containerWidth.value = entry.contentRect.width
        }
      })
      resizeObserver.observe(containerRef.value)
    }

    // ---- Lifecycle ----
    onMounted(() => {
      setupResizeObserver()
      currentSegmentIndex = findSegmentIndex(props.value)
      animateTo(props.value)
      startAlertPulse()

      // V2: Initialize multi-needle display values
      if (props.needles.length > 0) {
        needleDisplayValues.value = props.needles.map(() => props.min)
        // Animate each to its target
        props.needles.forEach((nc, i) => {
          animateNeedle(i, nc.value)
        })
      }
    })

    onBeforeUnmount(() => {
      if (animationHandle) animationHandle.cancel()
      if (alertAnimationId) cancelAnimationFrame(alertAnimationId)
      if (resizeObserver) resizeObserver.disconnect()
      needleAnimationHandles.forEach((h) => h?.cancel())
    })

    // ---- Expose public API ----
    expose({
      setValue,
      animateTo,
      reset,
      updateSegments,
      exportAs,
    })

    return {
      // Refs
      containerRef,
      svgRef,
      containerWidth,
      containerHeight,
      currentDisplayValue,
      alertPulseOpacity,
      // IDs
      gradientId,
      glowFilterId,
      needleShadowId,
      sparklineGradientId,
      // Layout
      viewBox,
      arcConfig,
      center,
      arcRadius,
      centerDotRadius,
      centerSlotSize,
      labelFontSize,
      valueFontSize,
      // Needles
      needleTip,
      needleTail,
      needleColorFinal,
      needleWidthFinal,
      computedNeedles,
      // Value text
      valueTextPos,
      // Styles
      containerStyle,
      currentTheme,
      gradientColors,
      // Paths
      backgroundArcPath,
      valueArcPath,
      renderedSegments,
      // V2
      renderedConcentricArcs,
      sparklinePath,
      tooltipVisible,
      tooltipText,
      tooltipPos,
      onSegmentHover,
      onSegmentLeaveHover,
      // Ticks & labels
      majorTickMarks,
      minorTickMarks,
      tickLabels,
      // Data
      percentage,
      formattedValue,
      hasCenterSlot,
      activeAlert,
    }
  },
})
</script>

<style>
.vue-speedometer-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
}

.vue-speedometer-svg {
  display: block;
  max-width: 100%;
  height: auto;
}

.vue-speedometer-center-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
}

.vue-speedometer-alert-ring {
  animation: speedometer-pulse 1.5s ease-in-out infinite;
}

@keyframes speedometer-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.vue-speedometer-sparkline {
  transition: d 0.3s ease;
}

.vue-speedometer-tooltip {
  background: rgba(15, 23, 42, 0.9);
  color: #f1f5f9;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
