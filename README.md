# Vue Advanced Speedometer ⚡

A **high-quality Vue 3 speedometer / gauge chart component** built with SVG.  
Smooth animations, customizable themes, and flexible API make it ideal for **dashboards, admin panels, IoT monitors, and analytics apps**.

**GitHub Repository:**  
https://github.com/Navnit73/vue-speedometer-gauge-chart

**Docs:**  
https://vue-speedometer-gauge-chart.vercel.app/docs

![Vue](https://img.shields.io/badge/Vue-3.x-42b883)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6)
![Size](https://img.shields.io/badge/Size-~15KB_gzip-green)

---

## ✨ Features

- 3 Gauge Types — full circle, semi circle, quarter gauge
- 5 Built-in Themes — light, dark, material, minimal, neon
- Gradient arcs with multiple color stops
- Custom colored segments (safe / warning / danger zones)
- Smooth 60 FPS animations using requestAnimationFrame
- Custom center slot for HTML or Vue components
- Alert thresholds with pulse effect
- Export as PNG, SVG, or PDF
- Developer API methods
- Responsive with ResizeObserver
- Tree-shakable imports
- Full TypeScript support

---

# 📦 Installation

```bash
npm install vue-advanced-speedometer
```

---

# 🚀 Quick Start

## Global Registration

```ts
import { createApp } from 'vue'
import VueAdvancedSpeedometer from 'vue-advanced-speedometer'
import 'vue-advanced-speedometer/dist/style.css'

const app = createApp(App)

app.use(VueAdvancedSpeedometer)

app.mount('#app')
```

---

## Local Import

```vue
<script setup>
import { VueSpeedometer } from 'vue-advanced-speedometer'
import 'vue-advanced-speedometer/dist/style.css'
</script>

<template>
  <VueSpeedometer :value="75" :max="180" />
</template>
```

---

# 📖 Props API

| Prop | Type | Default | Description |
|-----|-----|-----|-----|
| value | number | 0 | Current gauge value |
| min | number | 0 | Minimum value |
| max | number | 100 | Maximum value |
| type | string | semi | Gauge type: full, semi, quarter |
| segments | Segment[] | [] | Custom colored arc segments |
| gradient | string[] | [] | Gradient colors |
| needleColor | string | theme default | Needle color |
| needleWidth | number | 3 | Needle width |
| showTicks | boolean | true | Display tick marks |
| majorTicks | number | 5 | Major tick divisions |
| minorTicks | number | 4 | Minor ticks per major |
| showLabels | boolean | true | Show value labels |
| animationDuration | number | 800 | Animation time in ms |
| easing | string | easeOutCubic | Animation easing |
| theme | string | light | Built-in theme |
| customTheme | object | {} | Custom theme override |
| alerts | AlertThreshold[] | [] | Alert thresholds |
| arcWidth | number | 20 | Arc thickness |
| width | number or string | 100% | Container width |
| height | number or string | auto | Container height |
| formatValue | function | — | Custom value formatter |

---

# Types

```ts
interface Segment {
  from: number
  to: number
  color: string
}

interface AlertThreshold {
  value: number
  color: string
}
```

---

# Events

| Event | Payload | Description |
|------|------|------|
| value-change | { value, oldValue } | Fired when value changes |
| segment-enter | { segment, index } | Needle enters segment |
| segment-leave | { segment, index } | Needle leaves segment |
| animation-end | { value } | Animation finished |

---

# Slots

| Slot | Props | Description |
|-----|-----|-----|
| center | { value, percentage } | Custom center content |

---

# Exposed Methods

Access using template ref.

```vue
<script setup>
import { ref } from 'vue'
import { VueSpeedometer } from 'vue-advanced-speedometer'

const gaugeRef = ref()

gaugeRef.value.setValue(50)
gaugeRef.value.animateTo(80, 1200)
gaugeRef.value.reset()
gaugeRef.value.exportAs('png')
</script>

<template>
  <VueSpeedometer ref="gaugeRef" :value="50" />
</template>
```

Supported export formats

```
png
svg
pdf
```

---

# 🎨 Examples

## Gauge Types

```vue
<VueSpeedometer :value="75" type="semi" />
<VueSpeedometer :value="75" type="full" />
<VueSpeedometer :value="75" type="quarter" />
```

---

## Themes

```vue
<VueSpeedometer :value="75" theme="dark" />
<VueSpeedometer :value="75" theme="neon" />
<VueSpeedometer :value="75" theme="material" />
```

---

## Gradient Arc

```vue
<VueSpeedometer
  :value="75"
  :gradient="['#00ff88','#ffee00','#ff3300']"
/>
```

---

## Custom Segments

```vue
<VueSpeedometer
  :value="75"
  :max="180"
  :segments="[
    { from: 0, to: 60, color: '#22c55e' },
    { from: 60, to: 120, color: '#eab308' },
    { from: 120, to: 180, color: '#ef4444' }
  ]"
/>
```

---

# 🏗 Development

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

Build library

```bash
npm run build
```

---

# 💰 Pricing

Lifetime license: **$5**

Includes

- Lifetime access
- All future updates
- Unlimited projects
- Commercial usage

---

# 📄 License

Commercial license.

See **LICENSE.md** for full details.