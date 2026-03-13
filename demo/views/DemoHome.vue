<template>
  <div class="demo-app" :class="'theme-' + activeTheme">
    <!-- Hero Header -->
    <header class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-icon">⚡</span>
          Vue Advanced Speedometer
        </h1>
        <p class="hero-subtitle">
          Professional-grade gauge chart library for Vue 3 — SVG rendered, animated, and highly customizable
        </p>
        <div class="hero-badges">
          <span class="badge">Vue 3</span>
          <span class="badge">TypeScript</span>
          <span class="badge">SVG</span>
          <span class="badge">60 FPS</span>
          <span class="badge">Tree-shakable</span>
          <span class="badge badge-new">V2</span>
        </div>
      </div>
    </header>

    <!-- Controls Bar -->
    <section class="controls-bar">
      <div class="control-group">
        <label class="control-label">Value</label>
        <input
          type="range"
          :min="0"
          :max="180"
          v-model.number="gaugeValue"
          class="slider"
        />
        <span class="control-value">{{ gaugeValue }}</span>
      </div>
      <div class="control-group">
        <label class="control-label">Theme</label>
        <div class="theme-pills">
          <button
            v-for="t in themes"
            :key="t"
            :class="['theme-pill', { active: activeTheme === t }]"
            @click="activeTheme = t"
          >
            {{ t }}
          </button>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">Animation</label>
        <select v-model.number="animDuration" class="select-input">
          <option :value="200">Fast (200ms)</option>
          <option :value="800">Normal (800ms)</option>
          <option :value="1500">Slow (1500ms)</option>
          <option :value="2500">Very Slow (2500ms)</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label">Easing</label>
        <select v-model="easingType" class="select-input">
          <option value="easeOutCubic">Cubic</option>
          <option value="easeOutElastic">Elastic</option>
          <option value="easeBounceOut">Bounce</option>
          <option value="easeOutBack">Back</option>
          <option value="linear">Linear</option>
        </select>
      </div>
      <div class="control-group">
        <button class="btn btn-primary" @click="randomize">🎲 Random</button>
        <button class="btn btn-outline" @click="gaugeValue = 0">↺ Reset</button>
      </div>
    </section>

    <!-- Gauge Types Section -->
    <section class="section">
      <h2 class="section-title">Gauge Types</h2>
      <div class="gauge-grid three-col">
        <!-- Semi Circle -->
        <div class="gauge-card">
          <h3 class="card-label">Semi Circle</h3>
          <VueSpeedometer
            ref="semiRef"
            :value="gaugeValue"
            :max="180"
            type="semi"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
            :alerts="alerts"
            :tooltips="true"
            @value-change="onValueChange"
            @segment-enter="onSegmentEnter"
            @animation-end="onAnimationEnd"
          />
        </div>
        <!-- Full Circle -->
        <div class="gauge-card">
          <h3 class="card-label">Full Circle</h3>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            type="full"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
            :alerts="alerts"
          />
        </div>
        <!-- Quarter -->
        <div class="gauge-card">
          <h3 class="card-label">Quarter Gauge</h3>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            type="quarter"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>
      </div>
    </section>

    <!-- Gradient Section -->
    <section class="section">
      <h2 class="section-title">Gradient Arcs</h2>
      <div class="gauge-grid two-col">
        <div class="gauge-card">
          <h3 class="card-label">Cool Gradient</h3>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            :gradient="['#00f5d4','#00bbf9','#9b5de5']"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>
        <div class="gauge-card">
          <h3 class="card-label">Warm Gradient</h3>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            :gradient="['#00ff88','#ffee00','#ff3300']"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>
      </div>
    </section>

    <!-- Custom Segments -->
    <section class="section">
      <h2 class="section-title">Custom Segments &amp; Slots</h2>
      <div class="gauge-grid two-col">
        <div class="gauge-card">
          <h3 class="card-label">Custom Segments</h3>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            :segments="customSegments"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>
        <div class="gauge-card">
          <h3 class="card-label">Custom Center Slot</h3>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          >
            <template #center="{ value, percentage }">
              <div class="custom-center">
                <div class="custom-center-value">{{ Math.round(value) }}</div>
                <div class="custom-center-label">km/h</div>
                <div class="custom-center-pct">{{ Math.round(percentage) }}%</div>
              </div>
            </template>
          </VueSpeedometer>
        </div>
      </div>
    </section>

    <!-- Alerts Section -->
    <section class="section">
      <h2 class="section-title">Alerts &amp; Thresholds</h2>
      <div class="gauge-grid two-col">
        <div class="gauge-card">
          <h3 class="card-label">With Alerts (80 / 140)</h3>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            :alerts="alerts"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>
        <div class="gauge-card">
          <h3 class="card-label">Neon Theme</h3>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            theme="neon"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>
      </div>
    </section>

    <!-- ========================================= -->
    <!--  V2 VERSION 2 FEATURES                    -->
    <!-- ========================================= -->
    <section class="section v2-section">
      <div class="v2-badge-row">
        <span class="v2-badge">✨ NEW IN V2</span>
      </div>
      <h2 class="section-title">Version 2 Features</h2>

      <div class="gauge-grid two-col">
        <!-- Dual Needles -->
        <div class="gauge-card">
          <h3 class="card-label">Dual Needles</h3>
          <p class="card-desc">Multiple needles with independent colors and labels</p>
          <VueSpeedometer
            :max="180"
            :needles="dualNeedles"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
          <div class="card-controls">
            <div class="mini-control">
              <span class="mini-label" style="color: #3b82f6">● Current</span>
              <input type="range" :min="0" :max="180" v-model.number="dualNeedleA" class="slider-sm" />
              <span class="mini-val">{{ dualNeedleA }}</span>
            </div>
            <div class="mini-control">
              <span class="mini-label" style="color: #ef4444">● Target</span>
              <input type="range" :min="0" :max="180" v-model.number="dualNeedleB" class="slider-sm" />
              <span class="mini-val">{{ dualNeedleB }}</span>
            </div>
          </div>
        </div>

        <!-- Logarithmic Scale -->
        <div class="gauge-card">
          <h3 class="card-label">Logarithmic Scale</h3>
          <p class="card-desc">Log₁₀ scale with custom tick formatter</p>
          <VueSpeedometer
            :value="logValue"
            :min="1"
            :max="10000"
            :logarithmic="true"
            :formatTick="formatLogTick"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
            :majorTicks="4"
            :formatValue="formatLogValue"
          />
          <div class="card-controls">
            <input type="range" :min="1" :max="10000" v-model.number="logValue" class="slider" />
            <span class="control-value">{{ logValue.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Concentric Arcs -->
        <div class="gauge-card">
          <h3 class="card-label">Concentric Arcs</h3>
          <p class="card-desc">Secondary metric rings inside/outside the main arc</p>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            :concentricArcs="concentricArcsData"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>

        <!-- Format Tick -->
        <div class="gauge-card">
          <h3 class="card-label">Custom Tick Format</h3>
          <p class="card-desc">Format tick labels as currency, RPM, etc.</p>
          <VueSpeedometer
            :value="currencyValue"
            :min="0"
            :max="10000"
            :formatTick="formatCurrency"
            :formatValue="formatCurrencyValue"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
            :majorTicks="5"
          />
          <div class="card-controls">
            <input type="range" :min="0" :max="10000" v-model.number="currencyValue" class="slider" />
            <span class="control-value">${{ currencyValue.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Sparkline History -->
        <div class="gauge-card gauge-card-wide">
          <h3 class="card-label">Value History Sparkline</h3>
          <p class="card-desc">Trailing sparkline showing recent value history</p>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            :valueHistory="valueHistoryData"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>

        <!-- Tooltips -->
        <div class="gauge-card gauge-card-wide">
          <h3 class="card-label">Segment Tooltips</h3>
          <p class="card-desc">Hover over segments to see the value range</p>
          <VueSpeedometer
            :value="gaugeValue"
            :max="180"
            :segments="customSegments"
            :tooltips="true"
            :theme="activeTheme"
            :animationDuration="animDuration"
            :easing="easingType"
          />
        </div>
      </div>
    </section>

    <!-- Export Section -->
    <section class="section">
      <h2 class="section-title">Export</h2>
      <div class="export-row">
        <button class="btn btn-primary" @click="exportPng">📸 Export PNG</button>
        <button class="btn btn-primary" @click="exportSvg">🖼️ Export SVG</button>
      </div>
    </section>

    <!-- Event Log -->
    <section class="section">
      <h2 class="section-title">Event Log</h2>
      <div class="event-log">
        <div v-for="(log, i) in eventLog.slice(-8)" :key="i" class="log-entry">
          <span class="log-type">{{ log.type }}</span>
          <span class="log-msg">{{ log.message }}</span>
        </div>
        <div v-if="eventLog.length === 0" class="log-empty">
          Move the slider to see events…
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>Vue Advanced Speedometer v2.0.0 · Lifetime License: <strong>$5</strong> · Built with ❤️ and Vue 3</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { VueSpeedometer } from '../../src'
import type { Segment, AlertThreshold, NeedleConfig, ConcentricArc } from '../../src'
import type { EasingName } from '../../src/utils/animation'

const gaugeValue = ref(75)
const activeTheme = ref('dark')
const animDuration = ref(800)
const easingType = ref<EasingName>('easeOutCubic')
const themes = ['light', 'dark', 'material', 'minimal', 'neon']
const semiRef = ref<InstanceType<typeof VueSpeedometer> | null>(null)

const customSegments: Segment[] = [
  { from: 0, to: 40, color: '#22c55e' },
  { from: 40, to: 80, color: '#84cc16' },
  { from: 80, to: 120, color: '#eab308' },
  { from: 120, to: 150, color: '#f97316' },
  { from: 150, to: 180, color: '#ef4444' },
]

const alerts: AlertThreshold[] = [
  { value: 80, color: '#f59e0b' },
  { value: 140, color: '#ef4444' },
]

// ============ V2 DEMO DATA ============

// Dual Needles
const dualNeedleA = ref(60)
const dualNeedleB = ref(130)
const dualNeedles = computed<NeedleConfig[]>(() => [
  { value: dualNeedleA.value, color: '#3b82f6', label: 'CUR', width: 3 },
  { value: dualNeedleB.value, color: '#ef4444', label: 'TGT', width: 2 },
])

// Logarithmic scale
const logValue = ref(500)
function formatLogTick(val: number): string {
  if (val >= 1000) return `${(val / 1000).toFixed(val >= 10000 ? 0 : 1)}k`
  return Math.round(val).toString()
}
function formatLogValue(val: number): string {
  if (val >= 1000) return `${(val / 1000).toFixed(1)}k`
  return val.toString()
}

// Concentric arcs
const concentricArcsData = computed<ConcentricArc[]>(() => [
  { radius: 80, color: '#3b82f6', value: gaugeValue.value * 0.7, max: 180, width: 5 },
  { radius: 70, color: '#22c55e', value: gaugeValue.value * 0.5, max: 180, width: 5 },
])

// Currency format
const currencyValue = ref(4500)
function formatCurrency(val: number): string {
  if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`
  return `$${val}`
}
function formatCurrencyValue(val: number): string {
  return `$${val.toLocaleString()}`
}

// Sparkline history
const valueHistoryData = ref<number[]>([20, 35, 50, 42, 60, 55, 70, 65, 75])
watch(gaugeValue, (v) => {
  valueHistoryData.value = [...valueHistoryData.value.slice(-14), v]
})

// ============ EVENTS ============

interface LogEntry {
  type: string
  message: string
}
const eventLog = ref<LogEntry[]>([])

function addLog(type: string, message: string) {
  eventLog.value.push({ type, message })
  if (eventLog.value.length > 50) eventLog.value.shift()
}

function onValueChange(e: any) {
  addLog('value-change', `${e.oldValue?.toFixed?.(0) ?? '?'} → ${e.value?.toFixed?.(0) ?? '?'}`)
}

function onSegmentEnter(e: any) {
  addLog('segment-enter', `Entered segment ${e.index} (${e.segment.color})`)
}

function onAnimationEnd(e: any) {
  addLog('animation-end', `Finished at ${e.value?.toFixed?.(0) ?? '?'}`)
}

function randomize() {
  gaugeValue.value = Math.round(Math.random() * 180)
}

function exportPng() {
  semiRef.value?.exportAs('png')
}
function exportSvg() {
  semiRef.value?.exportAs('svg')
}
</script>

<style>
/* ============================================================
   DEMO APP STYLES
   ============================================================ */
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.demo-app {
  min-height: 100vh;
  background: #0f0f1a;
  color: #e2e8f0;
  transition: background 0.4s, color 0.4s;
}

/* When light theme is active */
.demo-app.theme-light,
.demo-app.theme-material {
  background: #f1f5f9;
  color: #1e293b;
}
.demo-app.theme-minimal {
  background: #f8fafc;
  color: #374151;
}

/* ---- Hero ---- */
.hero {
  position: relative;
  padding: 60px 24px 48px;
  text-align: center;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #667eea44 0%, #764ba244 100%);
  z-index: 0;
}
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
}
.hero-icon {
  font-size: 1.5em;
}
.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 20px;
  line-height: 1.5;
}
.hero-badges {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
.badge {
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 600;
  background: rgba(102, 126, 234, 0.15);
  color: #a5b4fc;
  border: 1px solid rgba(102, 126, 234, 0.25);
}
.badge-new {
  background: linear-gradient(135deg, #10b981, #059669);
  color: #fff;
  border-color: #10b981;
  animation: badge-pulse 2s ease-in-out infinite;
}
@keyframes badge-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
}
.theme-light .badge,
.theme-material .badge {
  background: rgba(102, 126, 234, 0.1);
  color: #4f46e5;
  border-color: rgba(79, 70, 229, 0.2);
}

/* ---- Controls ---- */
.controls-bar {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.theme-light .controls-bar,
.theme-material .controls-bar,
.theme-minimal .controls-bar {
  background: rgba(0, 0, 0, 0.02);
  border-color: rgba(0, 0, 0, 0.08);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}
.control-label {
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.6;
}
.control-value {
  font-size: 1.1rem;
  font-weight: 700;
  min-width: 40px;
  text-align: center;
  color: #a5b4fc;
}
.theme-light .control-value { color: #4f46e5; }

.slider {
  width: 180px;
  accent-color: #667eea;
  cursor: pointer;
}

.select-input {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}
.theme-light .select-input,
.theme-material .select-input {
  border-color: rgba(0,0,0,0.15);
  background: #fff;
}

.theme-pills {
  display: flex;
  gap: 4px;
}
.theme-pill {
  padding: 5px 12px;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: inherit;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  text-transform: capitalize;
  transition: all 0.2s;
}
.theme-pill:hover {
  background: rgba(102, 126, 234, 0.15);
}
.theme-pill.active {
  background: #667eea;
  color: #fff;
  border-color: #667eea;
}
.theme-light .theme-pill { border-color: rgba(0,0,0,0.15); }

.btn {
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: #fff;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}
.btn-outline {
  background: transparent;
  color: inherit;
  border: 1px solid rgba(255,255,255,0.15);
}
.btn-outline:hover {
  background: rgba(255,255,255,0.05);
}
.theme-light .btn-outline { border-color: rgba(0,0,0,0.15); }
.theme-light .btn-outline:hover { background: rgba(0,0,0,0.03); }

/* ---- Sections ---- */
.section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px 0;
}
.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 24px;
  letter-spacing: -0.3px;
}

/* V2 Section highlight */
.v2-section {
  position: relative;
  margin-top: 20px;
}
.v2-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: -24px;
  right: -24px;
  bottom: -40px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.04) 0%, rgba(59, 130, 246, 0.04) 100%);
  border-radius: 20px;
  pointer-events: none;
  z-index: 0;
}
.v2-section > * {
  position: relative;
  z-index: 1;
}
.v2-badge-row {
  margin-bottom: 8px;
}
.v2-badge {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  color: #fff;
}

/* ---- Gauge Grid ---- */
.gauge-grid {
  display: grid;
  gap: 24px;
}
.three-col { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.two-col { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); }

.gauge-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background 0.3s, border-color 0.3s;
}
.gauge-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(102, 126, 234, 0.2);
}
.gauge-card-wide {
  grid-column: span 2;
}
.theme-light .gauge-card,
.theme-material .gauge-card {
  background: #fff;
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.theme-light .gauge-card:hover,
.theme-material .gauge-card:hover {
  border-color: rgba(79, 70, 229, 0.2);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}
.theme-minimal .gauge-card {
  background: transparent;
  border-color: rgba(0,0,0,0.06);
}

.card-label {
  font-size: 0.85rem;
  font-weight: 600;
  opacity: 0.7;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.card-desc {
  font-size: 0.78rem;
  opacity: 0.5;
  margin-bottom: 12px;
  text-align: center;
}
.card-controls {
  width: 100%;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mini-control {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
}
.mini-label {
  font-weight: 600;
  min-width: 80px;
  font-size: 0.78rem;
}
.mini-val {
  font-weight: 700;
  min-width: 30px;
  text-align: right;
  font-size: 0.85rem;
  color: #a5b4fc;
}
.slider-sm {
  flex: 1;
  accent-color: #667eea;
  cursor: pointer;
}

/* ---- Custom center slot ---- */
.custom-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.custom-center-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}
.custom-center-label {
  font-size: 12px;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.custom-center-pct {
  font-size: 11px;
  opacity: 0.4;
}

/* ---- Export ---- */
.export-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

/* ---- Event Log ---- */
.event-log {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 16px;
  max-height: 220px;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  font-size: 0.82rem;
}
.theme-light .event-log,
.theme-material .event-log {
  background: #f8fafc;
  border-color: rgba(0,0,0,0.08);
}
.log-entry {
  padding: 4px 0;
  display: flex;
  gap: 10px;
}
.log-type {
  color: #a5b4fc;
  font-weight: 600;
  min-width: 120px;
}
.theme-light .log-type { color: #4f46e5; }
.log-msg {
  opacity: 0.7;
}
.log-empty {
  opacity: 0.4;
  text-align: center;
  padding: 20px;
}

/* ---- Footer ---- */
.footer {
  text-align: center;
  padding: 48px 24px;
  opacity: 0.5;
  font-size: 0.85rem;
}

/* ---- Responsive ---- */
@media (max-width: 640px) {
  .hero-title { font-size: 1.6rem; }
  .controls-bar { flex-direction: column; gap: 14px; }
  .slider { width: 100%; }
  .three-col, .two-col { grid-template-columns: 1fr; }
  .gauge-card-wide { grid-column: span 1; }
}
</style>
