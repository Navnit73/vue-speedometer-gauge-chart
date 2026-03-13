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

    <!-- Developer Info -->
    <section class="section developer-section">
      <div class="developer-card">
        <div class="developer-avatar">
          <span class="avatar-initial">N</span>
        </div>
        <h2 class="developer-name">Navnit Rai</h2>
        <p class="developer-role">Creator & Maintainer</p>
        <div class="developer-links">
          <a href="mailto:navnitrai5389@gmail.com" class="dev-link dev-link-email">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>navnitrai5389@gmail.com</span>
          </a>
          <a href="https://github.com/Navnit73/" target="_blank" rel="noopener" class="dev-link dev-link-github">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>github.com/Navnit73</span>
          </a>
        </div>
        <p class="developer-tagline">Building open-source tools for the Vue ecosystem 🚀</p>
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

/* ---- Developer Section ---- */
.developer-section {
  margin-top: 48px;
  padding: 56px 24px;
  background: linear-gradient(135deg, #1e3a5f 0%, #1a1a2e 50%, #16213e 100%);
  border-radius: 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.developer-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(102, 126, 234, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.theme-light .developer-section,
.theme-material .developer-section,
.theme-minimal .developer-section {
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #2563eb 100%);
  border: none;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.2);
}

.theme-light .developer-section::before,
.theme-material .developer-section::before,
.theme-minimal .developer-section::before {
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.theme-light .developer-name,
.theme-material .developer-name,
.theme-minimal .developer-name,
.theme-light .avatar-initial,
.theme-material .avatar-initial,
.theme-minimal .avatar-initial {
  color: #ffffff;
}

.developer-card {
  position: relative;
  z-index: 1;
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.developer-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  animation: avatar-glow 3s ease-in-out infinite alternate;
}

@keyframes avatar-glow {
  from { box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3); }
  to { box-shadow: 0 8px 40px rgba(118, 75, 162, 0.4); }
}

.avatar-initial {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  line-height: 1;
}

.developer-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.3px;
}

.developer-role {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 16px;
  font-weight: 500;
}

.developer-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.dev-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.dev-link-email {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #a5b4fc;
}

.dev-link-email:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
}

.theme-light .dev-link-email,
.theme-material .dev-link-email,
.theme-minimal .dev-link-email {
  color: #ffffff;
}

.dev-link-github {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
}

.dev-link-github:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.08);
}

.theme-light .dev-link-github,
.theme-material .dev-link-github,
.theme-minimal .dev-link-github {
  color: #ffffff;
}

.developer-tagline {
  margin: 16px 0 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

/* ---- Footer ---- */
.footer {
  text-align: center;
  padding: 48px 24px;
  opacity: 0.5;
  font-size: 0.85rem;
}

/* ---- Responsive ---- */

/* --- Tablet (≤ 1024px) --- */
@media (max-width: 1024px) {
  .section {
    padding: 32px 20px 0;
  }

  .controls-bar {
    gap: 16px;
    padding: 18px 20px;
  }

  .slider {
    width: 140px;
  }

  .two-col {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

/* --- Small Tablet / Large Phone (≤ 768px) --- */
@media (max-width: 768px) {
  .hero {
    padding: 40px 20px 36px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
  }

  .controls-bar {
    flex-direction: column;
    gap: 14px;
    padding: 16px 16px;
    align-items: stretch;
  }

  .control-group {
    justify-content: space-between;
    width: 100%;
  }

  .slider {
    width: 100%;
    flex: 1;
  }

  .theme-pills {
    flex-wrap: wrap;
    gap: 6px;
  }

  .select-input {
    flex: 1;
  }

  .section {
    padding: 28px 16px 0;
  }

  .section-title {
    font-size: 1.2rem;
    margin-bottom: 18px;
  }

  .three-col,
  .two-col {
    grid-template-columns: 1fr;
  }

  .gauge-card-wide {
    grid-column: span 1;
  }

  .gauge-card {
    padding: 18px;
  }

  /* Event log */
  .event-log {
    padding: 12px;
    font-size: 0.78rem;
  }

  .log-entry {
    flex-direction: column;
    gap: 2px;
  }

  .log-type {
    min-width: unset;
    font-size: 0.75rem;
  }

  /* Export */
  .export-row {
    flex-direction: column;
  }

  .export-row .btn {
    width: 100%;
    text-align: center;
  }

  /* Footer */
  .footer {
    padding: 32px 16px;
    font-size: 0.8rem;
  }

  /* Mini controls (dual needle sliders) */
  .mini-control {
    flex-wrap: wrap;
  }

  .card-controls {
    gap: 10px;
  }
}

/* --- Phone (≤ 480px) --- */
@media (max-width: 480px) {
  .hero {
    padding: 28px 14px 24px;
  }

  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.85rem;
    margin-bottom: 14px;
  }

  .hero-badges {
    gap: 6px;
  }

  .badge {
    font-size: 0.68rem;
    padding: 3px 10px;
  }

  .controls-bar {
    padding: 14px 12px;
    gap: 12px;
  }

  .control-label {
    font-size: 0.72rem;
  }

  .control-value {
    font-size: 0.95rem;
  }

  .theme-pill {
    font-size: 0.7rem;
    padding: 4px 10px;
  }

  .btn {
    padding: 7px 14px;
    font-size: 0.8rem;
  }

  .section {
    padding: 20px 10px 0;
  }

  .section-title {
    font-size: 1.05rem;
    margin-bottom: 14px;
  }

  .gauge-card {
    padding: 14px;
    border-radius: 12px;
  }

  .card-label {
    font-size: 0.78rem;
  }

  .card-desc {
    font-size: 0.72rem;
  }

  /* V2 section */
  .v2-badge {
    font-size: 0.68rem;
    padding: 3px 10px;
  }

  /* Custom center slot */
  .custom-center-value {
    font-size: 22px;
  }

  .custom-center-label {
    font-size: 10px;
  }

  /* Event log */
  .event-log {
    max-height: 160px;
    padding: 10px;
    font-size: 0.72rem;
    border-radius: 10px;
  }

  /* Footer */
  .footer {
    padding: 24px 10px;
    font-size: 0.75rem;
  }

  .footer p {
    line-height: 1.6;
  }
}
</style>
