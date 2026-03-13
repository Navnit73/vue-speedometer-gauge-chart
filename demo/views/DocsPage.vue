<template>
  <div class="speedometer-docs">

    <!-- Header -->
    <header class="docs-header">
      <div class="header-content">
        <div class="header-badge">v2.0.0 · MIT</div>
        <h1>
          <span class="header-icon">⚡</span>
          Vue Advanced Speedometer
        </h1>
        <p class="subtitle">Professional-grade gauge chart library for Vue 3 with TypeScript support</p>
        <div class="badge-group">
          <span class="badge badge-green">Vue 3</span>
          <span class="badge badge-blue">TypeScript</span>
          <span class="badge badge-purple">Customizable</span>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="docs-nav">
      <a href="#installation" class="nav-link">Installation</a>
      <a href="#basic-usage" class="nav-link">Basic Usage</a>
      <a href="#props" class="nav-link">Props</a>
      <a href="#examples" class="nav-link">Examples</a>
      <a href="#v2-examples" class="nav-link">V2 Features ✨</a>
      <a href="#slots" class="nav-link">Slots</a>
      <a href="#events" class="nav-link">Events</a>
      <a href="#methods" class="nav-link">Methods</a>
      <a href="#types" class="nav-link">TypeScript</a>
    </nav>

    <!-- Main -->
    <main class="docs-main">

      <!-- Installation -->
      <section id="installation" class="docs-section">
        <div class="section-label">Getting Started</div>
        <h2>Installation</h2>
        <p class="section-desc">Install via your preferred package manager and register the component globally or
          locally.</p>

        <div class="install-tabs">
          <button v-for="pkg in packageManagers" :key="pkg.name"
            :class="['tab-btn', { active: activePackage === pkg.name }]" @click="activePackage = pkg.name">
            {{ pkg.name }}
          </button>
        </div>

        <div class="code-block">
          <span class="code-lang">shell</span>
          <pre><code>{{ getInstallCommand() }}</code></pre>
          <button class="copy-btn" @click="copyToClipboard(getInstallCommand())">
            <span>Copy</span>
          </button>
        </div>

        <div class="setup-tabs-content">
          <div class="setup-col">
            <h3>Global Registration</h3>
            <div class="code-block">
              <span class="code-lang">ts</span>
              <pre><code>// main.ts
import { createApp } from 'vue'
import { VueSpeedometer } from 'vue-advanced-speedometer'
import 'vue-advanced-speedometer/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.component('VueSpeedometer', VueSpeedometer)
app.mount('#app')</code></pre>
            </div>
          </div>
          <div class="setup-col">
            <h3>Local Import</h3>
            <div class="code-block">
              <span class="code-lang">vue</span>
              <pre><code>&lt;script setup&gt;
import { VueSpeedometer } from 'vue-advanced-speedometer'
import 'vue-advanced-speedometer/dist/style.css'
&lt;/script&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Basic Usage -->
      <section id="basic-usage" class="docs-section">
        <div class="section-label">Usage</div>
        <h2>Basic Usage</h2>
        <p class="section-desc">Get up and running with minimal configuration or customize with powerful props.</p>

        <div class="example-grid">
          <div class="example-card">
            <div class="example-card-header">
              <span class="example-title">Minimal</span>
              <span class="example-chip">Default</span>
            </div>
            <div class="gauge-preview">
              <VueSpeedometer :value="65" :max="100" />
            </div>
            <div class="code-block small">
              <pre><code>&lt;VueSpeedometer :value="65" :max="100" /&gt;</code></pre>
            </div>
          </div>

          <div class="example-card">
            <div class="example-card-header">
              <span class="example-title">With Custom Props</span>
              <span class="example-chip example-chip-dark">Dark Theme</span>
            </div>
            <div class="gauge-preview gauge-preview-dark">
              <VueSpeedometer :value="120" :max="180" type="full" theme="dark" :animationDuration="1000" />
            </div>
            <div class="code-block small">
              <pre><code>&lt;VueSpeedometer
  :value="120"
  :max="180"
  type="full"
  theme="dark"
  :animationDuration="1000"
/&gt;</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Props -->
      <section id="props" class="docs-section">
        <div class="section-label">API Reference</div>
        <h2>Props</h2>
        <p class="section-desc">Complete reference for all available component props.</p>

        <div class="props-table-container">
          <table class="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in propsData" :key="prop.name">
                <td><code class="prop-name">{{ prop.name }}</code></td>
                <td><code class="prop-type">{{ prop.type }}</code></td>
                <td><code class="prop-default">{{ prop.default }}</code></td>
                <td class="prop-desc">{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Playground -->
        <div class="playground">
          <div class="playground-header">
            <div class="playground-title">
              <span class="playground-icon">🎮</span>
              Interactive Playground
            </div>
            <span class="playground-subtitle">Tweak props and see changes live</span>
          </div>

          <div class="playground-grid">
            <div class="playground-controls">
              <div class="control-group">
                <div class="control-item">
                  <label>
                    <span class="control-label">Value</span>
                    <span class="control-value">{{ playground.value }}</span>
                  </label>
                  <input type="range" v-model.number="playground.value" :min="0" :max="200" />
                </div>

                <div class="control-item">
                  <label>
                    <span class="control-label">Max</span>
                    <span class="control-value">{{ playground.max }}</span>
                  </label>
                  <input type="range" v-model.number="playground.max" :min="50" :max="300" step="10" />
                </div>

                <div class="control-item">
                  <label>
                    <span class="control-label">Animation</span>
                    <span class="control-value">{{ playground.animation }}ms</span>
                  </label>
                  <input type="range" v-model.number="playground.animation" :min="0" :max="2000" step="100" />
                </div>
              </div>

              <div class="select-group">
                <div class="control-item">
                  <label><span class="control-label">Type</span></label>
                  <select v-model="playground.type">
                    <option value="semi">Semi Circle</option>
                    <option value="full">Full Circle</option>
                    <option value="quarter">Quarter</option>
                  </select>
                </div>

                <div class="control-item">
                  <label><span class="control-label">Theme</span></label>
                  <select v-model="playground.theme">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="material">Material</option>
                    <option value="minimal">Minimal</option>
                    <option value="neon">Neon</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="playground-preview">
              <VueSpeedometer :value="playground.value" :max="playground.max" :type="playground.type"
                :theme="playground.theme" :animationDuration="playground.animation" />
            </div>
          </div>
        </div>
      </section>

      <!-- Examples -->
      <section id="examples" class="docs-section">
        <div class="section-label">Showcase</div>
        <h2>Real-World Examples</h2>
        <p class="section-desc">Common patterns to get you started quickly.</p>

        <div class="examples-grid">
          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Custom Segments</span>
            </div>
            <div class="gauge-preview">
              <VueSpeedometer :value="95" :max="180" :segments="demoSegments" />
            </div>
            <div class="code-block">
              <pre><code>{{ segmentCode }}</code></pre>
            </div>
          </div>

          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Gradient Arc</span>
            </div>
            <div class="gauge-preview">
              <VueSpeedometer :value="120" :max="180" :gradient="['#00ff88', '#ffaa00', '#ff3300']" />
            </div>
            <div class="code-block">
              <pre><code>{{ gradientCode }}</code></pre>
            </div>
          </div>

          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Alert Thresholds</span>
            </div>
            <div class="gauge-preview">
              <VueSpeedometer :value="150" :max="180" :alerts="demoAlerts" />
            </div>
            <div class="code-block">
              <pre><code>{{ alertCode }}</code></pre>
            </div>
          </div>

          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Custom Center Slot</span>
            </div>
            <div class="gauge-preview">
              <VueSpeedometer :value="85" :max="100">
                <template #center="{ value, percentage }">
                  <div class="custom-center">
                    <div class="big-value">{{ Math.round(value) }}</div>
                    <div class="small-label">SCORE</div>
                    <div class="percentage-val">{{ Math.round(percentage) }}%</div>
                  </div>
                </template>
              </VueSpeedometer>
            </div>
            <div class="code-block">
              <pre><code>{{ slotCode }}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- V2 Feature Examples -->
      <section id="v2-examples" class="docs-section">
        <div class="section-label" style="color: #10b981">New in V2</div>
        <h2>V2 Feature Examples ✨</h2>
        <p class="section-desc">Interactive examples for every new V2 prop. Each example includes a live preview and the code to reproduce it.</p>

        <div class="examples-grid">

          <!-- needles -->
          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Multi-Needle (needles)</span>
              <span class="example-chip" style="background:#dbeafe;color:#1d4ed8">V2</span>
            </div>
            <p class="v2-desc">Render multiple needles with independent values, colors, and labels.</p>
            <div class="gauge-preview">
              <VueSpeedometer :max="200" :needles="v2Needles" />
            </div>
            <div class="v2-controls">
              <label>Needle A: <input type="range" :min="0" :max="200" v-model.number="v2NeedleA" /> {{ v2NeedleA }}</label>
              <label>Needle B: <input type="range" :min="0" :max="200" v-model.number="v2NeedleB" /> {{ v2NeedleB }}</label>
            </div>
            <div class="code-block small"><pre><code>{{ needlesCode }}</code></pre></div>
          </div>

          <!-- logarithmic -->
          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Logarithmic Scale (logarithmic)</span>
              <span class="example-chip" style="background:#dbeafe;color:#1d4ed8">V2</span>
            </div>
            <p class="v2-desc">Switch from linear to log₁₀ spacing — ideal for wide-range data.</p>
            <div class="gauge-preview">
              <VueSpeedometer :value="v2LogVal" :min="1" :max="10000" :logarithmic="true" :formatTick="fmtLog" :formatValue="fmtLogVal" :majorTicks="4" />
            </div>
            <div class="v2-controls">
              <label>Value: <input type="range" :min="1" :max="10000" v-model.number="v2LogVal" /> {{ v2LogVal.toLocaleString() }}</label>
            </div>
            <div class="code-block small"><pre><code>{{ logCode }}</code></pre></div>
          </div>

          <!-- formatTick -->
          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Custom Tick Labels (formatTick)</span>
              <span class="example-chip" style="background:#dbeafe;color:#1d4ed8">V2</span>
            </div>
            <p class="v2-desc">Format tick labels as currency, RPM, percentages — anything you need.</p>
            <div class="gauge-preview">
              <VueSpeedometer :value="v2Currency" :min="0" :max="10000" :formatTick="fmtCurrency" :formatValue="fmtCurrencyVal" :majorTicks="5" />
            </div>
            <div class="v2-controls">
              <label>Revenue: <input type="range" :min="0" :max="10000" v-model.number="v2Currency" /> ${{ v2Currency.toLocaleString() }}</label>
            </div>
            <div class="code-block small"><pre><code>{{ formatTickCode }}</code></pre></div>
          </div>

          <!-- concentricArcs -->
          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Concentric Arcs (concentricArcs)</span>
              <span class="example-chip" style="background:#dbeafe;color:#1d4ed8">V2</span>
            </div>
            <p class="v2-desc">Add secondary metric rings inside or outside the main gauge arc.</p>
            <div class="gauge-preview">
              <VueSpeedometer :value="75" :max="100" :concentricArcs="v2ConcentricData" />
            </div>
            <div class="code-block small"><pre><code>{{ concentricCode }}</code></pre></div>
          </div>

          <!-- tooltips -->
          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Segment Tooltips (tooltips)</span>
              <span class="example-chip" style="background:#dbeafe;color:#1d4ed8">V2</span>
            </div>
            <p class="v2-desc">Hover over colored segments to see their value range.</p>
            <div class="gauge-preview">
              <VueSpeedometer :value="95" :max="180" :segments="demoSegments" :tooltips="true" />
            </div>
            <div class="code-block small"><pre><code>{{ tooltipsCode }}</code></pre></div>
          </div>

          <!-- valueHistory -->
          <div class="example-card large">
            <div class="example-card-header">
              <span class="example-title">Value Sparkline (valueHistory)</span>
              <span class="example-chip" style="background:#dbeafe;color:#1d4ed8">V2</span>
            </div>
            <p class="v2-desc">Pass an array of recent values to render a trailing sparkline trail.</p>
            <div class="gauge-preview">
              <VueSpeedometer :value="v2SparkVal" :max="100" :valueHistory="v2History" />
            </div>
            <div class="v2-controls">
              <label>Value: <input type="range" :min="0" :max="100" v-model.number="v2SparkVal" /> {{ v2SparkVal }}</label>
            </div>
            <div class="code-block small"><pre><code>{{ sparklineCode }}</code></pre></div>
          </div>

        </div>
      </section>

      <!-- Slots -->
      <section id="slots" class="docs-section">
        <div class="section-label">API Reference</div>
        <h2>Slots</h2>
        <p class="section-desc">Scoped slots to fully customize the gauge's inner content.</p>

        <div class="slot-card">
          <div class="slot-header">
            <code class="slot-name">#center</code>
            <span class="slot-badge">Scoped Slot</span>
          </div>
          <p class="slot-desc">Customize the center display area of the gauge.</p>
          <div class="slot-props-box">
            <div class="slot-prop-row">
              <code>value: number</code>
              <span>Current gauge value</span>
            </div>
            <div class="slot-prop-row">
              <code>percentage: number</code>
              <span>Value as percentage (0–100)</span>
            </div>
          </div>
          <div class="code-block small">
            <pre><code>&lt;template #center="{ value, percentage }"&gt;
          &lt;div class="custom-display"&gt;
          {{ value }} ({{ percentage }}%)
          &lt;/div&gt;
          &lt;/template&gt;</code></pre>
          </div>
        </div>
      </section>

      <!-- Events -->
      <section id="events" class="docs-section">
        <div class="section-label">API Reference</div>
        <h2>Events</h2>
        <p class="section-desc">Listen to lifecycle events emitted by the component.</p>

        <div class="events-list">
          <div v-for="event in eventsData" :key="event.name" class="event-card">
            <div class="event-header">
              <code class="event-name">@{{ event.name }}</code>
              <code class="event-payload">{{ event.payload }}</code>
            </div>
            <p class="event-desc">{{ event.description }}</p>
            <div class="event-demo" v-if="event.name === 'value-change'">
              <button class="demo-btn" @click="triggerEventDemo">Trigger Demo</button>
              <div class="event-output">
                <span class="event-output-dot"></span>
                {{ eventOutput }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Methods -->
      <section id="methods" class="docs-section">
        <div class="section-label">API Reference</div>
        <h2>Exposed Methods</h2>
        <p class="section-desc">Call methods directly on the component ref to trigger actions programmatically.</p>

        <div class="methods-grid">
          <div class="method-card">
            <div class="method-header">
              <code class="method-name">animateTo()</code>
            </div>
            <p class="method-desc">Manually animate the needle to a specific value.</p>
            <div class="method-signature">
              <code>animateTo(value: number, duration?: number): void</code>
            </div>
            <div class="method-demo">
              <VueSpeedometer ref="methodGaugeRef" :value="30" :max="100" />
              <div class="demo-controls">
                <button @click="animateToRandom">Random</button>
                <button @click="animateToValue(75)">Go to 75</button>
              </div>
            </div>
          </div>

          <div class="method-card">
            <div class="method-header">
              <code class="method-name">exportAs()</code>
            </div>
            <p class="method-desc">Export the gauge as a PNG or SVG file.</p>
            <div class="method-signature">
              <code>exportAs(format: 'png' | 'svg'): void</code>
            </div>
            <div class="method-demo">
              <VueSpeedometer ref="exportGaugeRef" :value="60" :max="100" />
              <div class="demo-controls">
                <button @click="exportPNG">Export PNG</button>
                <button @click="exportSVG">Export SVG</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TypeScript -->
      <section id="types" class="docs-section">
        <div class="section-label">TypeScript</div>
        <h2>Type Definitions</h2>
        <p class="section-desc">Full TypeScript support out of the box with exported types and interfaces.</p>

        <div class="types-grid">
          <div class="type-card">
            <div class="type-card-label">Interface</div>
            <h3>Segment</h3>
            <div class="code-block">
              <pre><code>interface Segment {
            from: number // Start value
            to: number // End value
            color: string // CSS color
            }</code></pre>
            </div>
          </div>

          <div class="type-card">
            <div class="type-card-label">Interface</div>
            <h3>AlertThreshold</h3>
            <div class="code-block">
              <pre><code>interface AlertThreshold {
            value: number // Threshold value
            color: string // Alert ring color
            }</code></pre>
            </div>
          </div>

          <div class="type-card">
            <div class="type-card-label">V2 Interface</div>
            <h3>NeedleConfig ✨</h3>
            <div class="code-block">
              <pre><code>interface NeedleConfig {
            value: number   // Needle value
            color?: string  // Needle color
            label?: string  // Label near tip
            width?: number  // Stroke width
            }</code></pre>
            </div>
          </div>

          <div class="type-card">
            <div class="type-card-label">V2 Interface</div>
            <h3>ConcentricArc ✨</h3>
            <div class="code-block">
              <pre><code>interface ConcentricArc {
            radius: number  // Arc radius
            color: string   // Arc color
            value: number   // Current value
            max?: number    // Max value
            width?: number  // Stroke width
            }</code></pre>
            </div>
          </div>

          <div class="type-card">
            <div class="type-card-label">Union Types</div>
            <h3>GaugeType & Theme</h3>
            <div class="code-block">
              <pre><code>type GaugeType =
            | 'semi'
            | 'full'
            | 'quarter'

            type Theme =
            | 'light' | 'dark'
            | 'material' | 'minimal'
            | 'neon'</code></pre>
            </div>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="docs-footer">
      <div class="footer-inner">
        <span>Vue Advanced Speedometer <strong>v2.0.0</strong></span>
        <span class="footer-divider">·</span>
        <span>MIT Licensed</span>
        <span class="footer-divider">·</span>
        <span>Built for the Vue community ❤️</span>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { VueSpeedometer } from '../../src'
import type { Segment, AlertThreshold, NeedleConfig, ConcentricArc } from '../../src'

const activePackage = ref('npm')
const packageManagers = [
  { name: 'npm', command: 'npm install vue-advanced-speedometer' },
  { name: 'yarn', command: 'yarn add vue-advanced-speedometer' },
  { name: 'pnpm', command: 'pnpm add vue-advanced-speedometer' }
]

const playground = ref({
  value: 75,
  max: 150,
  type: 'semi' as const,
  theme: 'light' as const,
  animation: 800
})

const methodGaugeRef = ref<InstanceType<typeof VueSpeedometer> | null>(null)
const exportGaugeRef = ref<InstanceType<typeof VueSpeedometer> | null>(null)

const demoSegments: Segment[] = [
  { from: 0, to: 60, color: '#22c55e' },
  { from: 60, to: 120, color: '#eab308' },
  { from: 120, to: 180, color: '#ef4444' }
]

const demoAlerts: AlertThreshold[] = [
  { value: 80, color: '#f59e0b' },
  { value: 140, color: '#ef4444' }
]

const eventOutput = ref('Waiting for event...')

const propsData = [
  { name: 'value', type: 'number', default: '0', description: 'Current gauge value' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum possible value' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum possible value' },
  { name: 'type', type: "'semi' | 'full' | 'quarter'", default: "'semi'", description: 'Gauge arc shape' },
  { name: 'theme', type: 'string', default: "'light'", description: 'Built-in theme name' },
  { name: 'segments', type: 'Segment[]', default: '[]', description: 'Custom colored segments' },
  { name: 'gradient', type: 'string[]', default: '[]', description: 'Gradient colors for arc' },
  { name: 'alerts', type: 'AlertThreshold[]', default: '[]', description: 'Threshold warning rings' },
  { name: 'showTicks', type: 'boolean', default: 'true', description: 'Show tick marks' },
  { name: 'majorTicks', type: 'number', default: '5', description: 'Number of major divisions' },
  { name: 'minorTicks', type: 'number', default: '4', description: 'Minor ticks between majors' },
  { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show value labels' },
  { name: 'animationDuration', type: 'number', default: '800', description: 'Animation duration in ms (0 to disable)' },
  { name: 'width', type: 'number | string', default: "'100%'", description: 'Container width' },
  { name: 'height', type: 'number | string', default: "'auto'", description: 'Container height' },
  { name: 'needles ✨', type: 'NeedleConfig[]', default: '[]', description: 'V2: Multiple needle configs with independent colors and labels' },
  { name: 'logarithmic ✨', type: 'boolean', default: 'false', description: 'V2: Use logarithmic (log₁₀) scale instead of linear' },
  { name: 'formatTick ✨', type: '(v: number) => string', default: 'undefined', description: 'V2: Custom tick label formatter function' },
  { name: 'concentricArcs ✨', type: 'ConcentricArc[]', default: '[]', description: 'V2: Secondary metric arcs inside/outside main arc' },
  { name: 'tooltips ✨', type: 'boolean', default: 'false', description: 'V2: Enable hover tooltips on segments' },
  { name: 'valueHistory ✨', type: 'number[]', default: '[]', description: 'V2: Value history array for sparkline trail' },
]

const eventsData = [
  { name: 'value-change', payload: '{ value: number, oldValue: number }', description: 'Fired when the value prop changes' },
  { name: 'segment-enter', payload: '{ segment: Segment, index: number }', description: 'Fired when needle enters a segment' },
  { name: 'segment-leave', payload: '{ segment: Segment, index: number }', description: 'Fired when needle leaves a segment' },
  { name: 'animation-end', payload: '{ value: number }', description: 'Fired when animation completes' }
]

// ===== V1 code examples =====
const segmentCode = `const segments = [
  { from: 0,   to: 60,  color: '#22c55e' },
  { from: 60,  to: 120, color: '#eab308' },
  { from: 120, to: 180, color: '#ef4444' }
]

<VueSpeedometer :value="95" :max="180" :segments="segments" />`

const gradientCode = `<VueSpeedometer
  :value="120"
  :max="180"
  :gradient="['#00ff88', '#ffaa00', '#ff3300']"
/>`

const alertCode = `const alerts = [
  { value: 80,  color: '#f59e0b' },
  { value: 140, color: '#ef4444' }
]

<VueSpeedometer :value="150" :max="180" :alerts="alerts" />`

const slotCode = `<VueSpeedometer :value="85" :max="100">
  <template #center="{ value, percentage }">
    <div class="custom-center">
      <div class="value">{{ value }}</div>
      <div class="pct">{{ percentage }}%</div>
    </div>
  </template>
</VueSpeedometer>`

// ===== V2 interactive data =====
const v2NeedleA = ref(60)
const v2NeedleB = ref(140)
const v2Needles = computed<NeedleConfig[]>(() => [
  { value: v2NeedleA.value, color: '#3b82f6', label: 'AVG', width: 3 },
  { value: v2NeedleB.value, color: '#ef4444', label: 'MAX', width: 2 },
])

const v2LogVal = ref(500)
function fmtLog(v: number): string {
  return v >= 1000 ? `${(v/1000).toFixed(v >= 10000 ? 0 : 1)}k` : Math.round(v).toString()
}
function fmtLogVal(v: number): string {
  return v >= 1000 ? `${(v/1000).toFixed(1)}k` : v.toString()
}

const v2Currency = ref(4500)
function fmtCurrency(v: number): string {
  return v >= 1000 ? `$${(v/1000).toFixed(0)}k` : `$${v}`
}
function fmtCurrencyVal(v: number): string {
  return `$${v.toLocaleString()}`
}

const v2ConcentricData: ConcentricArc[] = [
  { radius: 80, color: '#3b82f6', value: 55, max: 100, width: 5 },
  { radius: 70, color: '#22c55e', value: 40, max: 100, width: 5 },
]

const v2SparkVal = ref(50)
const v2History = ref([20, 35, 50, 42, 60, 55, 45, 50])
watch(v2SparkVal, (v) => {
  v2History.value = [...v2History.value.slice(-14), v]
})

// ===== V2 code examples =====
const needlesCode = `import type { NeedleConfig } from 'vue-advanced-speedometer'

const needles: NeedleConfig[] = [
  { value: 60,  color: '#3b82f6', label: 'AVG', width: 3 },
  { value: 140, color: '#ef4444', label: 'MAX', width: 2 },
]

<VueSpeedometer :max="200" :needles="needles" />`

const logCode = `<VueSpeedometer
  :value="500"
  :min="1"
  :max="10000"
  :logarithmic="true"
  :formatTick="(v) => v >= 1000 ? v/1000 + 'k' : v"
  :majorTicks="4"
/>`

const formatTickCode = `<VueSpeedometer
  :value="4500"
  :max="10000"
  :formatTick="(v) => v >= 1000 ? '$' + v/1000 + 'k' : '$' + v"
  :formatValue="(v) => '$' + v.toLocaleString()"
  :majorTicks="5"
/>`

const concentricCode = `import type { ConcentricArc } from 'vue-advanced-speedometer'

const arcs: ConcentricArc[] = [
  { radius: 80, color: '#3b82f6', value: 55, max: 100, width: 5 },
  { radius: 70, color: '#22c55e', value: 40, max: 100, width: 5 },
]

<VueSpeedometer :value="75" :max="100" :concentricArcs="arcs" />`

const tooltipsCode = `<VueSpeedometer
  :value="95"
  :max="180"
  :segments="segments"
  :tooltips="true"
/>`

const sparklineCode = `const history = ref([20, 35, 50, 42, 60, 55, 45, 50])

<VueSpeedometer
  :value="currentValue"
  :max="100"
  :valueHistory="history"
/>`

// ===== Shared functions =====
function getInstallCommand() {
  return packageManagers.find(p => p.name === activePackage.value)?.command || ''
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
}

function animateToRandom() {
  ;(methodGaugeRef.value as any)?.animateTo(Math.floor(Math.random() * 100), 800)
}

function animateToValue(val: number) {
  ;(methodGaugeRef.value as any)?.animateTo(val, 500)
}

function exportPNG() {
  ;(exportGaugeRef.value as any)?.exportAs('png')
}

function exportSVG() {
  ;(exportGaugeRef.value as any)?.exportAs('svg')
}

function triggerEventDemo() {
  eventOutput.value = `value-change fired at ${new Date().toLocaleTimeString()}`
}
</script>

<style scoped>
/* ============== Variables ============== */
.speedometer-docs {
  --primary: #2563eb;
  --primary-light: #eff6ff;
  --primary-mid: #bfdbfe;
  --text-heading: #0f172a;
  --text-body: #475569;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --surface: #f8fafc;
  --surface-2: #f1f5f9;
  --white: #ffffff;
  --code-bg: #0f172a;
  --code-text: #e2e8f0;
  --radius: 12px;
  --radius-lg: 16px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, .06), 0 1px 2px rgba(0, 0, 0, .04);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, .08);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, .1);

  max-width: 1300px;
  margin: 0 auto;
  padding: 0 24px 64px;
  font-family: 'Geist', 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text-body);
  background: var(--white);
  -webkit-font-smoothing: antialiased;
}

/* ============== Header ============== */
.docs-header {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 60%, #1d3461 100%);
  border-radius: 0 0 24px 24px;
  padding: 56px 40px 48px;
  margin-bottom: 36px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.docs-header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

.header-content {
  position: relative;
  max-width: 680px;
  margin: 0 auto;
}

.header-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 100px;
  padding: 4px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
  backdrop-filter: blur(4px);
}

.header-content h1 {
  font-size: 2.6rem;
  font-weight: 800;
  margin: 0 0 12px;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  line-height: 1.1;
}

.header-icon {
  font-size: 2.2rem;
}

.subtitle {
  font-size: 1.05rem;
  opacity: 0.8;
  margin-bottom: 24px;
  line-height: 1.5;
}

.badge-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.badge {
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge-green {
  background: #dcfce7;
  color: #16a34a;
}

.badge-blue {
  background: #dbeafe;
  color: #1d4ed8;
}

.badge-purple {
  background: #ede9fe;
  color: #7c3aed;
}

/* ============== Navigation ============== */
.docs-nav {
  display: flex;
  gap: 2px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 56px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 6px;
}

.nav-link {
  padding: 7px 16px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 100px;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.nav-link:hover {
  background: var(--white);
  color: var(--text-heading);
  box-shadow: var(--shadow-sm);
}

/* ============== Section Styles ============== */
.docs-section {
  margin-bottom: 72px;
  scroll-margin-top: 24px;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--primary);
  margin-bottom: 8px;
}

.docs-section h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-heading);
  margin: 0 0 8px;
  letter-spacing: -0.3px;
}

.section-desc {
  color: var(--text-muted);
  font-size: 0.975rem;
  margin: 0 0 28px;
  line-height: 1.6;
}

.docs-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-heading);
  margin: 20px 0 10px;
}

/* ============== Install Tabs ============== */
.install-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
  background: var(--surface-2);
  padding: 4px;
  border-radius: 8px;
  width: fit-content;
}

.tab-btn {
  padding: 6px 18px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s;
}

.tab-btn.active {
  background: var(--white);
  color: var(--text-heading);
  box-shadow: var(--shadow-sm);
}

.setup-tabs-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 8px;
}

/* ============== Code Blocks ============== */
.code-block {
  position: relative;
  background: var(--code-bg);
  border-radius: var(--radius);
  padding: 18px 20px;
  margin: 12px 0;
  overflow-x: auto;
}

.code-block.small {
  padding: 12px 16px;
}

.code-lang {
  position: absolute;
  top: 10px;
  right: 50px;
  font-size: 0.7rem;
  color: #64748b;
  font-family: monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-block pre {
  margin: 0;
}

.code-block code {
  font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.875rem;
  color: var(--code-text);
  line-height: 1.7;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  padding: 4px 10px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #94a3b8;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.copy-btn:hover {
  background: #334155;
  color: #f1f5f9;
}

/* ============== Example Cards ============== */
.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
}

.example-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  transition: box-shadow 0.2s;
}

.example-card:hover {
  box-shadow: var(--shadow-md);
}

.example-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.example-title {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-heading);
}

.example-chip {
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--primary-light);
  color: var(--primary);
  padding: 2px 10px;
  border-radius: 100px;
}

.example-chip-dark {
  background: #1e293b;
  color: #94a3b8;
}

.gauge-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 160px;
  background: var(--surface);
  border-radius: 10px;
  margin-bottom: 14px;
}

.gauge-preview-dark {
  background: #1e293b;
}

/* ============== Props Table ============== */
.props-table-container {
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 36px;
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

.props-table th {
  background: var(--surface);
  padding: 12px 16px;
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border);
}

.props-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.props-table tr:last-child td {
  border-bottom: none;
}

.prop-name {
  background: var(--primary-light);
  color: var(--primary);
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.82rem;
  font-weight: 600;
}

.prop-type {
  color: #7c3aed;
  background: #faf5ff;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.82rem;
}

.prop-default {
  color: #065f46;
  background: #ecfdf5;
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.82rem;
}

.prop-desc {
  color: var(--text-body);
  font-size: 0.875rem;
}

/* ============== Playground ============== */
.playground {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.playground-header {
  padding: 18px 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--white);
}

.playground-title {
  font-weight: 700;
  font-size: 1rem;
  color: var(--text-heading);
  display: flex;
  align-items: center;
  gap: 8px;
}

.playground-subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.playground-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 0;
}

.playground-controls {
  padding: 24px;
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--white);
}

.control-group,
.select-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-item label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-body);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.control-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary);
  font-variant-numeric: tabular-nums;
}

.control-item input[type="range"] {
  width: 100%;
  accent-color: var(--primary);
  height: 4px;
  border-radius: 4px;
}

.control-item select {
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--surface);
  font-size: 0.875rem;
  color: var(--text-heading);
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;
}

.control-item select:focus {
  border-color: var(--primary);
}

.playground-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
  background: var(--surface);
  min-height: 260px;
}

/* ============== Custom Center ============== */
.custom-center {
  text-align: center;
}

.big-value {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-heading);
  line-height: 1;
}

.small-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 4px 0 2px;
}

.percentage-val {
  font-size: 12px;
  color: var(--text-muted);
}

/* ============== Slots ============== */
.slot-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.slot-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.slot-name {
  background: var(--primary);
  color: white;
  padding: 4px 14px;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
}

.slot-badge {
  background: var(--surface-2);
  color: var(--text-muted);
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
}

.slot-desc {
  color: var(--text-body);
  margin: 0 0 16px;
}

.slot-props-box {
  background: var(--surface);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.slot-prop-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.875rem;
}

.slot-prop-row code {
  background: var(--primary-light);
  color: var(--primary);
  padding: 2px 8px;
  border-radius: 5px;
  font-size: 0.82rem;
  white-space: nowrap;
}

.slot-prop-row span {
  color: var(--text-muted);
}

/* ============== Events ============== */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  transition: box-shadow 0.15s;
}

.event-card:hover {
  box-shadow: var(--shadow-sm);
}

.event-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.event-name {
  background: #1e293b;
  color: #f8fafc;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
}

.event-payload {
  font-size: 0.8rem;
  color: var(--text-muted);
  background: var(--surface-2);
  padding: 2px 8px;
  border-radius: 5px;
}

.event-desc {
  color: var(--text-body);
  font-size: 0.875rem;
  margin: 4px 0 0;
}

.event-demo {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-btn {
  padding: 7px 16px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  white-space: nowrap;
}

.demo-btn:hover {
  background: #1d4ed8;
}

.demo-btn:active {
  transform: scale(0.97);
}

.event-output {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Fira Code', monospace;
  font-size: 0.82rem;
  color: var(--text-muted);
  background: var(--surface);
  padding: 6px 12px;
  border-radius: 7px;
  flex: 1;
}

.event-output-dot {
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ============== Methods ============== */
.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
}

.method-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 22px;
}

.method-header {
  margin-bottom: 10px;
}

.method-name {
  background: var(--surface-2);
  color: var(--text-heading);
  padding: 5px 14px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
}

.method-desc {
  color: var(--text-body);
  font-size: 0.875rem;
  margin: 0 0 14px;
}

.method-signature {
  background: var(--code-bg);
  color: var(--code-text);
  padding: 12px 14px;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  margin-bottom: 16px;
}

.method-demo {
  background: var(--surface);
  padding: 16px;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.demo-controls {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.demo-controls button {
  flex: 1;
  padding: 8px 10px;
  background: var(--white);
  border: 1px solid var(--border);
  color: var(--text-heading);
  border-radius: 7px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}

.demo-controls button:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

/* ============== Types ============== */
.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.type-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.type-card-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 6px;
}

.type-card h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-heading);
}

/* ============== V2 Example Styles ============== */
.v2-desc {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 0 14px;
  line-height: 1.5;
}

.v2-controls {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0 4px;
}

.v2-controls label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-body);
}

.v2-controls input[type="range"] {
  flex: 1;
  accent-color: var(--primary);
  height: 4px;
  margin: 0 0 12px;
}

/* ============== Footer ============== */
.docs-footer {
  margin-top: 64px;
  padding: 24px;
  text-align: center;
  border-top: 1px solid var(--border);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.footer-divider {
  color: var(--border);
}

/* ============== Responsive ============== */
@media (max-width: 768px) {
  .docs-header {
    padding: 40px 24px 36px;
  }

  .docs-header h1 {
    font-size: 1.8rem;
  }

  .docs-nav {
    border-radius: 14px;
  }

  .nav-link {
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  .setup-tabs-content {
    grid-template-columns: 1fr;
  }

  .playground-grid {
    grid-template-columns: 1fr;
  }

  .playground-controls {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .example-grid,
  .examples-grid {
    grid-template-columns: 1fr;
  }

  .methods-grid,
  .types-grid {
    grid-template-columns: 1fr;
  }

  .event-demo {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>