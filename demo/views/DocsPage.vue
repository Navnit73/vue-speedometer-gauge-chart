<template>
  <div class="docs">
    <!-- Skip to content link for accessibility -->
    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Header with gradient and floating elements -->
    <header class="header">
      <div class="header-bg">
        <div class="header-bg-glow"></div>
        <div class="header-bg-dots"></div>
      </div>

      <div class="header-content">
        <div class="header-top">
          <span class="version-badge">
            <span class="version-dot"></span>
            v2.0.0 · MIT
          </span>
        </div>

        <div class="header-main">
          <h1 class="title">
            <span class="title-icon">⚡</span>
            Vue Advanced Speedometer
          </h1>
          <p class="subtitle">
            Professional-grade gauge chart library for Vue 3 with full TypeScript support
          </p>

          <div class="tech-badges">
            <span class="tech-badge vue">Vue 3</span>
            <span class="tech-badge ts">TypeScript</span>
            <span class="tech-badge customizable">Customizable</span>
          </div>
        </div>

        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-value">25+</span>
            <span class="stat-label">Props</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">10+</span>
            <span class="stat-label">Examples</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">100%</span>
            <span class="stat-label">TS Coverage</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Sticky navigation -->
    <nav class="nav" :class="{ 'nav-sticky': isNavSticky }" ref="navRef">
      <div class="nav-container">
        <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Menu">
          <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>

        <div class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`" class="nav-link"
            :class="{ active: activeSection === item.id }" @click="handleNavClick(item.id)">
            {{ item.label }}
            <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
          </a>
        </div>

        <button class="theme-toggle" @click="toggleTheme" aria-label="Toggle theme">
          <svg v-if="isDark" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Main content -->
    <main id="main-content" class="main">
      <div class="main-container">
        <!-- Sidebar table of contents (desktop) -->
        <aside class="toc">
          <div class="toc-sticky">
            <p class="toc-title">On this page</p>
            <ul class="toc-list">
              <li v-for="item in navItems" :key="item.id" class="toc-item">
                <a :href="`#${item.id}`" class="toc-link" :class="{ active: activeSection === item.id }"
                  @click="handleTocClick(item.id)">
                  {{ item.label }}
                </a>
              </li>
            </ul>

            <div class="toc-cta">
              <a href="https://github.com/Navnit73/vue-speedometer-gauge-chart" target="_blank" rel="noopener"
                class="github-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </aside>

        <!-- Documentation content -->
        <div class="content">
          <!-- Installation -->
          <section id="installation" class="section" ref="installationRef">
            <div class="section-header">
              <span class="section-tag">Getting Started</span>
              <h2 class="section-title">Installation</h2>
            </div>
            <p class="section-description">
              Get started with Vue Advanced Speedometer in your project.
            </p>

            <div class="package-managers">
              <button v-for="pkg in packageManagers" :key="pkg.name" class="package-btn"
                :class="{ active: activePackage === pkg.name }" @click="activePackage = pkg.name">
                {{ pkg.name }}
              </button>
            </div>

            <div class="code-card">
              <div class="code-header">
                <span class="code-language">bash</span>
                <button class="copy-button" @click="copyToClipboard(getInstallCommand())">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>Copy</span>
                </button>
              </div>
              <pre class="code-content"><code>{{ getInstallCommand() }}</code></pre>
            </div>

            <div class="setup-grid">
              <div class="setup-card">
                <h3 class="setup-title">Global Registration</h3>
                <div class="code-card compact">
                  <div class="code-header">
                    <span class="code-language">ts</span>
                    <button class="copy-button" @click="copyToClipboard(globalRegistrationCode)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <pre class="code-content"><code>{{ globalRegistrationCode }}</code></pre>
                </div>
              </div>

              <div class="setup-card">
                <h3 class="setup-title">Local Import</h3>
                <div class="code-card compact">
                  <div class="code-header">
                    <span class="code-language">vue</span>
                    <button class="copy-button" @click="copyToClipboard(localImportCode)">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <pre class="code-content"><code>{{ localImportCode }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- Basic Usage -->
          <section id="basic-usage" class="section" ref="basicUsageRef">
            <div class="section-header">
              <span class="section-tag">Quick Start</span>
              <h2 class="section-title">Basic Usage</h2>
            </div>
            <p class="section-description">
              Simple and powerful. Here's how to get started with minimal configuration.
            </p>

            <div class="examples-grid">
              <div class="example-card">
                <div class="example-preview">
                  <VueSpeedometer :value="65" :max="100" />
                </div>
                <div class="example-info">
                  <div class="example-header">
                    <h3 class="example-name">Minimal</h3>
                    <span class="example-badge">Default</span>
                  </div>
                  <div class="code-card compact">
                    <pre class="code-content"><code>&lt;VueSpeedometer :value="65" :max="100" /&gt;</code></pre>
                  </div>
                </div>
              </div>

              <div class="example-card">
                <div class="example-preview dark-bg">
                  <VueSpeedometer :value="120" :max="180" type="full" theme="dark" :animationDuration="1000" />
                </div>
                <div class="example-info">
                  <div class="example-header">
                    <h3 class="example-name">Dark Theme</h3>
                    <span class="example-badge">Custom</span>
                  </div>
                  <div class="code-card compact">
                    <pre
                      class="code-content"><code>&lt;VueSpeedometer :value="120" :max="180" type="full" theme="dark" :animationDuration="1000" /&gt;</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Interactive Playground -->
          <section id="playground" class="section" ref="playgroundRef">
            <div class="section-header">
              <span class="section-tag">Live Demo</span>
              <h2 class="section-title">Interactive Playground</h2>
            </div>
            <p class="section-description">
              Tweak props and see changes in real-time.
            </p>

            <div class="playground-card">
              <div class="playground-preview">
                <VueSpeedometer :value="playground.value" :max="playground.max" :type="playground.type"
                  :theme="playground.theme" :animationDuration="playground.animation" />
              </div>

              <div class="playground-controls">
                <div class="control-group">
                  <div class="control-row">
                    <label class="control-label">
                      <span>Value</span>
                      <span class="control-value">{{ playground.value }}</span>
                    </label>
                    <input type="range" v-model.number="playground.value" :min="0" :max="200" class="control-slider">
                  </div>

                  <div class="control-row">
                    <label class="control-label">
                      <span>Max</span>
                      <span class="control-value">{{ playground.max }}</span>
                    </label>
                    <input type="range" v-model.number="playground.max" :min="50" :max="300" step="10"
                      class="control-slider">
                  </div>

                  <div class="control-row">
                    <label class="control-label">
                      <span>Animation</span>
                      <span class="control-value">{{ playground.animation }}ms</span>
                    </label>
                    <input type="range" v-model.number="playground.animation" :min="0" :max="2000" step="100"
                      class="control-slider">
                  </div>
                </div>

                <div class="control-group">
                  <div class="control-row">
                    <label class="control-label">Type</label>
                    <select v-model="playground.type" class="control-select">
                      <option value="semi">Semi Circle</option>
                      <option value="full">Full Circle</option>
                      <option value="quarter">Quarter</option>
                    </select>
                  </div>

                  <div class="control-row">
                    <label class="control-label">Theme</label>
                    <select v-model="playground.theme" class="control-select">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="material">Material</option>
                      <option value="minimal">Minimal</option>
                      <option value="neon">Neon</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Props API -->
          <section id="props" class="section" ref="propsRef">
            <div class="section-header">
              <span class="section-tag">API Reference</span>
              <h2 class="section-title">Props</h2>
            </div>
            <p class="section-description">
              Complete reference for all available component props.
            </p>

            <div class="props-table-wrapper">
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
          </section>

          <!-- V2 Features -->
          <section id="v2-features" class="section" ref="v2FeaturesRef">
            <div class="section-header">
              <span class="section-tag feature-tag">✨ New in v2.0</span>
              <h2 class="section-title">Advanced Features</h2>
            </div>
            <p class="section-description">
              Powerful new features for complex use cases.
            </p>

            <div class="features-grid">
              <!-- Multi-needle -->
              <div class="feature-card">
                <div class="feature-preview">
                  <VueSpeedometer :max="200" :needles="v2Needles" />
                </div>
                <div class="feature-content">
                  <h3 class="feature-title">
                    Multi-Needle
                    <span class="feature-badge">v2</span>
                  </h3>
                  <p class="feature-desc">Render multiple needles with independent values, colors, and labels.</p>
                  <div class="feature-controls">
                    <div class="control-row">
                      <span class="control-label-small">Needle A</span>
                      <input type="range" :min="0" :max="200" v-model.number="v2NeedleA" class="control-slider">
                      <span class="control-value-small">{{ v2NeedleA }}</span>
                    </div>
                    <div class="control-row">
                      <span class="control-label-small">Needle B</span>
                      <input type="range" :min="0" :max="200" v-model.number="v2NeedleB" class="control-slider">
                      <span class="control-value-small">{{ v2NeedleB }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Logarithmic Scale -->
              <div class="feature-card">
                <div class="feature-preview">
                  <VueSpeedometer :value="v2LogVal" :min="1" :max="10000" :logarithmic="true" :formatTick="fmtLog"
                    :formatValue="fmtLogVal" :majorTicks="4" />
                </div>
                <div class="feature-content">
                  <h3 class="feature-title">
                    Logarithmic Scale
                    <span class="feature-badge">v2</span>
                  </h3>
                  <p class="feature-desc">Switch from linear to log₁₀ spacing for wide-range data.</p>
                  <div class="feature-controls">
                    <input type="range" :min="1" :max="10000" v-model.number="v2LogVal" class="control-slider">
                    <span class="control-value-small">{{ v2LogVal.toLocaleString() }}</span>
                  </div>
                </div>
              </div>

              <!-- Custom Formatting -->
              <div class="feature-card">
                <div class="feature-preview">
                  <VueSpeedometer :value="v2Currency" :min="0" :max="10000" :formatTick="fmtCurrency"
                    :formatValue="fmtCurrencyVal" :majorTicks="5" />
                </div>
                <div class="feature-content">
                  <h3 class="feature-title">
                    Custom Formatting
                    <span class="feature-badge">v2</span>
                  </h3>
                  <p class="feature-desc">Format ticks and values as currency, percentages, etc.</p>
                  <div class="feature-controls">
                    <input type="range" :min="0" :max="10000" v-model.number="v2Currency" class="control-slider">
                    <span class="control-value-small">${{ v2Currency.toLocaleString() }}</span>
                  </div>
                </div>
              </div>

              <!-- Concentric Arcs -->
              <div class="feature-card">
                <div class="feature-preview">
                  <VueSpeedometer :value="75" :max="100" :concentricArcs="v2ConcentricData" />
                </div>
                <div class="feature-content">
                  <h3 class="feature-title">
                    Concentric Arcs
                    <span class="feature-badge">v2</span>
                  </h3>
                  <p class="feature-desc">Add secondary metric rings inside or outside the main gauge.</p>
                </div>
              </div>

              <!-- Tooltips -->
              <div class="feature-card">
                <div class="feature-preview">
                  <VueSpeedometer :value="95" :max="180" :segments="demoSegments" :tooltips="true" />
                </div>
                <div class="feature-content">
                  <h3 class="feature-title">
                    Segment Tooltips
                    <span class="feature-badge">v2</span>
                  </h3>
                  <p class="feature-desc">Hover over segments to see their value range.</p>
                </div>
              </div>

              <!-- Sparkline Trail -->
              <div class="feature-card">
                <div class="feature-preview">
                  <VueSpeedometer :value="v2SparkVal" :max="100" :valueHistory="v2History" />
                </div>
                <div class="feature-content">
                  <h3 class="feature-title">
                    Sparkline Trail
                    <span class="feature-badge">v2</span>
                  </h3>
                  <p class="feature-desc">Visualize recent values with a trailing sparkline.</p>
                  <div class="feature-controls">
                    <input type="range" :min="0" :max="100" v-model.number="v2SparkVal" class="control-slider">
                    <span class="control-value-small">{{ v2SparkVal }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Slots -->
          <section id="slots" class="section" ref="slotsRef">
            <div class="section-header">
              <span class="section-tag">Customization</span>
              <h2 class="section-title">Slots</h2>
            </div>
            <p class="section-description">
              Fully customize the gauge's inner content with scoped slots.
            </p>

            <div class="slot-demo">
              <div class="slot-preview">
                <VueSpeedometer :value="85" :max="100">
                  <template #center="{ value, percentage }">
                    <div class="custom-center">
                      <span class="custom-center-value">{{ Math.round(value) }}</span>
                      <span class="custom-center-label">SCORE</span>
                      <span class="custom-center-percentage">{{ Math.round(percentage) }}%</span>
                    </div>
                  </template>
                </VueSpeedometer>
              </div>

              <div class="slot-info">
                <div class="slot-header">
                  <code class="slot-name">#center</code>
                  <span class="slot-badge">Scoped Slot</span>
                </div>
                <p class="slot-desc">Customize the center display area of the gauge.</p>
                <div class="slot-props">
                  <div class="slot-prop">
                    <code>value: number</code>
                    <span>Current gauge value</span>
                  </div>
                  <div class="slot-prop">
                    <code>percentage: number</code>
                    <span>Value as percentage (0–100)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Events -->
          <section id="events" class="section" ref="eventsRef">
            <div class="section-header">
              <span class="section-tag">API Reference</span>
              <h2 class="section-title">Events</h2>
            </div>
            <p class="section-description">
              Listen to lifecycle events emitted by the component.
            </p>

            <div class="events-grid">
              <div v-for="event in eventsData" :key="event.name" class="event-card">
                <div class="event-header">
                  <code class="event-name">@{{ event.name }}</code>
                  <code class="event-type">{{ event.payload }}</code>
                </div>
                <p class="event-desc">{{ event.description }}</p>
              </div>
            </div>
          </section>

          <!-- Methods -->
          <section id="methods" class="section" ref="methodsRef">
            <div class="section-header">
              <span class="section-tag">API Reference</span>
              <h2 class="section-title">Methods</h2>
            </div>
            <p class="section-description">
              Call methods directly on the component ref to trigger actions programmatically.
            </p>

            <div class="methods-grid">
              <div class="method-card">
                <div class="method-header">
                  <code class="method-name">animateTo()</code>
                </div>
                <p class="method-desc">Manually animate the needle to a specific value.</p>
                <div class="method-demo">
                  <VueSpeedometer ref="methodGaugeRef" :value="30" :max="100" />
                  <div class="method-actions">
                    <button class="method-btn" @click="animateToRandom">Random</button>
                    <button class="method-btn" @click="animateToValue(75)">Go to 75</button>
                  </div>
                </div>
              </div>

              <div class="method-card">
                <div class="method-header">
                  <code class="method-name">exportAs()</code>
                </div>
                <p class="method-desc">Export the gauge as a PNG or SVG file.</p>
                <div class="method-demo">
                  <VueSpeedometer ref="exportGaugeRef" :value="60" :max="100" />
                  <div class="method-actions">
                    <button class="method-btn" @click="exportPNG">PNG</button>
                    <button class="method-btn" @click="exportSVG">SVG</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- TypeScript -->
          <section id="typescript" class="section" ref="typescriptRef">
            <div class="section-header">
              <span class="section-tag">TypeScript</span>
              <h2 class="section-title">Type Definitions</h2>
            </div>
            <p class="section-description">
              Full TypeScript support with exported types and interfaces.
            </p>

            <div class="types-grid">
              <div v-for="type in typeDefinitions" :key="type.title" class="type-card">
                <div class="type-label">{{ type.label }}</div>
                <h3 class="type-title">{{ type.title }}</h3>
                <div class="code-card compact">
                  <pre class="code-content"><code>{{ type.code }}</code></pre>
                </div>
              </div>
            </div>
          </section>

          <!-- Author -->
          <section class="section author-section">
            <div class="author-card">
              <div class="author-avatar">
                <span class="author-initial">NR</span>
              </div>
              <div class="author-info">
                <h3 class="author-name">Navnit Rai</h3>
                <p class="author-role">Creator & Maintainer</p>
                <div class="author-links">
                  <a href="mailto:navnitrai5389@gmail.com" class="author-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Email</span>
                  </a>
                  <a href="https://github.com/Navnit73/" target="_blank" rel="noopener" class="author-link">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>Vue Advanced Speedometer <strong>v2.0.0</strong> · MIT Licensed</p>
        <p>Built with ❤️ for the Vue community</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { VueSpeedometer } from '../../src'
import type { Segment, AlertThreshold, NeedleConfig, ConcentricArc } from '../../src'

// ===== State =====
const activePackage = ref('npm')
const mobileMenuOpen = ref(false)
const activeSection = ref('installation')
const isNavSticky = ref(false)
const isDark = ref(false)

// Refs for sections
const installationRef = ref<HTMLElement>()
const basicUsageRef = ref<HTMLElement>()
const playgroundRef = ref<HTMLElement>()
const propsRef = ref<HTMLElement>()
const v2FeaturesRef = ref<HTMLElement>()
const slotsRef = ref<HTMLElement>()
const eventsRef = ref<HTMLElement>()
const methodsRef = ref<HTMLElement>()
const typescriptRef = ref<HTMLElement>()
const navRef = ref<HTMLElement>()

// ===== Navigation =====
const navItems = [
  { id: 'installation', label: 'Installation' },
  { id: 'basic-usage', label: 'Basic Usage' },
  { id: 'playground', label: 'Playground' },
  { id: 'props', label: 'Props' },
  { id: 'v2-features', label: 'V2 Features', badge: '✨' },
  { id: 'slots', label: 'Slots' },
  { id: 'events', label: 'Events' },
  { id: 'methods', label: 'Methods' },
  { id: 'typescript', label: 'TypeScript' }
]

// ===== Package Managers =====
const packageManagers = [
  { name: 'npm', command: 'npm install vue-advanced-speedometer' },
  { name: 'yarn', command: 'yarn add vue-advanced-speedometer' },
  { name: 'pnpm', command: 'pnpm add vue-advanced-speedometer' }
]

// ===== Code Examples =====
const globalRegistrationCode = `// main.ts
import { createApp } from 'vue'
import { VueSpeedometer } from 'vue-advanced-speedometer'
import 'vue-advanced-speedometer/dist/style.css'
import App from './App.vue'

const app = createApp(App)
app.component('VueSpeedometer', VueSpeedometer)
app.mount('#app')`

const localImportCode = `<script setup>
import { VueSpeedometer } from 'vue-advanced-speedometer'
import 'vue-advanced-speedometer/dist/style.css'
<\/script>`

// ===== Playground =====
const playground = ref({
  value: 75,
  max: 150,
  type: 'semi' as const,
  theme: 'light' as const,
  animation: 800
})

// ===== V2 Interactive Data =====
const v2NeedleA = ref(60)
const v2NeedleB = ref(140)
const v2Needles = computed<NeedleConfig[]>(() => [
  { value: v2NeedleA.value, color: '#3b82f6', label: 'AVG', width: 3 },
  { value: v2NeedleB.value, color: '#ef4444', label: 'MAX', width: 2 },
])

const v2LogVal = ref(500)
function fmtLog(v: number): string {
  return v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k` : Math.round(v).toString()
}
function fmtLogVal(v: number): string {
  return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toString()
}

const v2Currency = ref(4500)
function fmtCurrency(v: number): string {
  return v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`
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

// ===== Demo Data =====
const demoSegments: Segment[] = [
  { from: 0, to: 60, color: '#22c55e' },
  { from: 60, to: 120, color: '#eab308' },
  { from: 120, to: 180, color: '#ef4444' }
]

// ===== Props Data =====
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
  { name: 'needles ✨', type: 'NeedleConfig[]', default: '[]', description: 'Multiple needle configs with independent colors and labels' },
  { name: 'logarithmic ✨', type: 'boolean', default: 'false', description: 'Use logarithmic (log₁₀) scale instead of linear' },
  { name: 'formatTick ✨', type: '(v: number) => string', default: 'undefined', description: 'Custom tick label formatter function' },
  { name: 'concentricArcs ✨', type: 'ConcentricArc[]', default: '[]', description: 'Secondary metric arcs inside/outside main arc' },
  { name: 'tooltips ✨', type: 'boolean', default: 'false', description: 'Enable hover tooltips on segments' },
  { name: 'valueHistory ✨', type: 'number[]', default: '[]', description: 'Value history array for sparkline trail' },
]

// ===== Events Data =====
const eventsData = [
  { name: 'value-change', payload: '{ value: number, oldValue: number }', description: 'Fired when the value prop changes' },
  { name: 'segment-enter', payload: '{ segment: Segment, index: number }', description: 'Fired when needle enters a segment' },
  { name: 'segment-leave', payload: '{ segment: Segment, index: number }', description: 'Fired when needle leaves a segment' },
  { name: 'animation-end', payload: '{ value: number }', description: 'Fired when animation completes' }
]

// ===== Type Definitions =====
const typeDefinitions = [
  {
    label: 'Interface',
    title: 'Segment',
    code: `interface Segment {
  from: number
  to: number
  color: string
}`
  },
  {
    label: 'Interface',
    title: 'AlertThreshold',
    code: `interface AlertThreshold {
  value: number
  color: string
}`
  },
  {
    label: 'V2 Interface',
    title: 'NeedleConfig',
    code: `interface NeedleConfig {
  value: number
  color?: string
  label?: string
  width?: number
}`
  },
  {
    label: 'V2 Interface',
    title: 'ConcentricArc',
    code: `interface ConcentricArc {
  radius: number
  color: string
  value: number
  max?: number
  width?: number
}`
  },
  {
    label: 'Union Types',
    title: 'GaugeType & Theme',
    code: `type GaugeType = 'semi' | 'full' | 'quarter'
type Theme = 'light' | 'dark' | 'material' | 'minimal' | 'neon'`
  }
]

// ===== Refs for methods =====
const methodGaugeRef = ref<InstanceType<typeof VueSpeedometer> | null>(null)
const exportGaugeRef = ref<InstanceType<typeof VueSpeedometer> | null>(null)

// ===== Methods =====
function getInstallCommand() {
  return packageManagers.find(p => p.name === activePackage.value)?.command || ''
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function handleNavClick(id: string) {
  mobileMenuOpen.value = false
  const element = document.getElementById(id)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

function handleTocClick(id: string) {
  handleNavClick(id)
}

function animateToRandom() {
  ; (methodGaugeRef.value as any)?.animateTo(Math.floor(Math.random() * 100), 800)
}

function animateToValue(val: number) {
  ; (methodGaugeRef.value as any)?.animateTo(val, 500)
}

function exportPNG() {
  ; (exportGaugeRef.value as any)?.exportAs('png')
}

function exportSVG() {
  ; (exportGaugeRef.value as any)?.exportAs('svg')
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

// ===== Scroll Spy =====
function updateActiveSection() {
  const sections = navItems.map(item => ({
    id: item.id,
    element: document.getElementById(item.id)
  }))

  const scrollPosition = window.scrollY + 100

  for (const section of sections) {
    if (section.element) {
      const { offsetTop, offsetHeight } = section.element
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id
        break
      }
    }
  }
}

function handleScroll() {
  updateActiveSection()

  if (navRef.value) {
    isNavSticky.value = window.scrollY > navRef.value.offsetTop
  }
}

// ===== Lifecycle =====
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ===== CSS Variables ===== */
.docs {
  --primary: #2563eb;
  --primary-light: #3b82f6;
  --primary-dark: #1d4ed8;
  --primary-bg: #eff6ff;
  --secondary: #8b5cf6;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --text-tertiary: #64748b;
  --text-inverse: #ffffff;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --border-light: #e2e8f0;
  --border-medium: #cbd5e1;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Fira Code', 'JetBrains Mono', monospace;
}

.docs.dark {
  --primary: #3b82f6;
  --primary-light: #60a5fa;
  --primary-dark: #2563eb;
  --primary-bg: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --text-inverse: #0f172a;
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --border-light: #334155;
  --border-medium: #475569;
}

/* ===== Base ===== */
.docs {
  font-family: var(--font-sans);
  color: var(--text-secondary);
  background: var(--bg-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  transition: background-color 0.3s, color 0.3s;
}

/* ===== Skip Link ===== */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
}

.skip-link:focus {
  top: 0;
}

/* ===== Header ===== */
.header {
  position: relative;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  color: var(--text-inverse);
  overflow: hidden;
  padding: 3rem 1.5rem;
}

@media (min-width: 768px) {
  .header {
    padding: 4rem 2rem;
  }
}

@media (min-width: 1024px) {
  .header {
    padding: 5rem 2rem;
  }
}

.header-bg {
  position: absolute;
  inset: 0;
}

.header-bg-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.header-bg-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}

.header-content {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
}

.header-top {
  margin-bottom: 2rem;
}

.version-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  font-size: 0.875rem;
  backdrop-filter: blur(4px);
}

.version-dot {
  width: 0.5rem;
  height: 0.5rem;
  background: var(--success);
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.header-main {
  max-width: 48rem;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .title {
    font-size: 3rem;
  }
}

@media (min-width: 1024px) {
  .title {
    font-size: 3.5rem;
  }
}

.title-icon {
  font-size: 2.5rem;
}

@media (min-width: 768px) {
  .title-icon {
    font-size: 3rem;
  }
}

.subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  margin: 0 0 2rem;
  line-height: 1.5;
}

@media (min-width: 768px) {
  .subtitle {
    font-size: 1.25rem;
  }
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-badge {
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-stats {
  display: none;
}

@media (min-width: 1024px) {
  .header-stats {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 9999px;
    backdrop-filter: blur(8px);
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.75rem;
  opacity: 0.7;
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.2);
}

/* ===== Navigation ===== */
.nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  transition: all 0.3s;
}

.nav-sticky {
  box-shadow: var(--shadow-md);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
}

.mobile-menu-btn:hover {
  background: var(--bg-secondary);
}

@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }
}

.nav-links {
  display: none;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
    flex: 1;
    justify-content: center;
  }
}

.nav-links.mobile-open {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
  padding: 1rem;
  box-shadow: var(--shadow-lg);
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--bg-secondary);
}

.nav-link.active {
  color: var(--primary);
  background: var(--primary-bg);
}

.nav-badge {
  margin-left: 0.375rem;
  padding: 0.125rem 0.375rem;
  background: var(--primary);
  color: white;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 600;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
}

.theme-toggle:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* ===== Main Layout ===== */
.main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.main-container {
  display: flex;
  gap: 2rem;
}

/* ===== Table of Contents ===== */
.toc {
  display: none;
  width: 14rem;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .toc {
    display: block;
  }
}

.toc-sticky {
  position: sticky;
  top: 6rem;
}

.toc-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin: 0 0 1rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
}

.toc-item {
  margin-bottom: 0.5rem;
}

.toc-link {
  display: block;
  padding: 0.375rem 0.75rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  border-left: 2px solid transparent;
  transition: all 0.2s;
}

.toc-link:hover {
  color: var(--text-primary);
  border-left-color: var(--border-medium);
}

.toc-link.active {
  color: var(--primary);
  border-left-color: var(--primary);
  font-weight: 500;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  transition: all 0.2s;
}

.github-link:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-medium);
}

/* ===== Content ===== */
.content {
  flex: 1;
  min-width: 0;
}

/* ===== Sections ===== */
.section {
  margin-bottom: 4rem;
  scroll-margin-top: 5rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.section-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--primary-bg);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;
  margin-bottom: 0.5rem;
}

.feature-tag {
  background: #fef3c7;
  color: #d97706;
}

.dark .feature-tag {
  background: #854d0e;
  color: #fbbf24;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  line-height: 1.2;
}

@media (min-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
}

.section-description {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* ===== Package Managers ===== */
.package-managers {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  background: var(--bg-secondary);
  padding: 0.25rem;
  border-radius: var(--radius-md);
  width: fit-content;
}

.package-btn {
  padding: 0.5rem 1.25rem;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.package-btn.active {
  background: var(--bg-primary);
  color: var(--text-primary);
  box-shadow: var(--shadow-sm);
}

/* ===== Code Cards ===== */
.code-card {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 1rem;
}

.code-card.compact {
  margin-bottom: 0;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
}

.code-language {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.copy-button {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.copy-button:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.code-content {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
}

.code-content code {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-primary);
}

/* ===== Setup Grid ===== */
.setup-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .setup-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.setup-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.75rem;
}

/* ===== Examples Grid ===== */
.examples-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (min-width: 640px) {
  .examples-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.example-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.example-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
}

.example-preview.dark-bg {
  background: #1e293b;
}

.example-info {
  padding: 1.5rem;
}

.example-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.example-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.example-badge {
  padding: 0.25rem 0.75rem;
  background: var(--primary-bg);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
}

/* ===== Playground ===== */
.playground-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-top: 1.5rem;
}

.playground-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
}

.playground-controls {
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .playground-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.control-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.control-value {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
}

.control-slider {
  width: 100%;
  height: 0.375rem;
  background: var(--border-light);
  border-radius: 9999px;
  appearance: none;
}

.control-slider::-webkit-slider-thumb {
  appearance: none;
  width: 1rem;
  height: 1rem;
  background: var(--primary);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: var(--shadow-md);
}

.control-select {
  padding: 0.5rem 0.75rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-primary);
  outline: none;
  transition: all 0.2s;
}

.control-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* ===== Features Grid ===== */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.feature-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.feature-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
}

.feature-content {
  padding: 1.5rem;
}

.feature-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
}

.feature-badge {
  padding: 0.125rem 0.375rem;
  background: var(--primary);
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  border-radius: 9999px;
}

.feature-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.feature-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.control-label-small {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-tertiary);
}

.control-value-small {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--primary);
}

/* ===== Props Table ===== */
.props-table-wrapper {
  overflow-x: auto;
  margin-top: 1.5rem;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.props-table th {
  padding: 1rem;
  background: var(--bg-secondary);
  font-weight: 600;
  color: var(--text-secondary);
  text-align: left;
  border-bottom: 1px solid var(--border-light);
}

.props-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--border-light);
  color: var(--text-secondary);
}

.props-table tr:last-child td {
  border-bottom: none;
}

.prop-name {
  padding: 0.25rem 0.5rem;
  background: var(--primary-bg);
  color: var(--primary);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
}

.prop-type {
  padding: 0.25rem 0.5rem;
  background: var(--bg-tertiary);
  color: var(--secondary);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
}

.prop-default {
  padding: 0.25rem 0.5rem;
  background: var(--bg-tertiary);
  color: var(--success);
  border-radius: var(--radius-sm);
  font-size: 0.8125rem;
}

.prop-desc {
  color: var(--text-secondary);
}

/* ===== Slot Demo ===== */
.slot-demo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .slot-demo {
    grid-template-columns: 1fr 1fr;
  }
}

.slot-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.slot-info {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.slot-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.slot-name {
  padding: 0.25rem 0.75rem;
  background: var(--primary);
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.slot-badge {
  padding: 0.25rem 0.5rem;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  font-size: 0.75rem;
  border-radius: 9999px;
}

.slot-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.slot-props {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.slot-prop {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.slot-prop code {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--primary);
}

.slot-prop span {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* ===== Custom Center ===== */
.custom-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.custom-center-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
}

.custom-center-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.custom-center-percentage {
  font-size: 0.875rem;
  color: var(--primary);
  font-weight: 600;
}

/* ===== Events Grid ===== */
.events-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (min-width: 640px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.event-card {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.event-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.event-name {
  padding: 0.25rem 0.75rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.event-type {
  padding: 0.125rem 0.5rem;
  background: var(--primary-bg);
  color: var(--primary);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
}

.event-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* ===== Methods Grid ===== */
.methods-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (min-width: 768px) {
  .methods-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.method-card {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.method-header {
  margin-bottom: 0.75rem;
}

.method-name {
  padding: 0.25rem 0.75rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
}

.method-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.method-demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
}

.method-actions {
  display: flex;
  gap: 0.5rem;
}

.method-btn {
  flex: 1;
  padding: 0.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.method-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border-color: var(--border-medium);
}

/* ===== Types Grid ===== */
.types-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (min-width: 640px) {
  .types-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.type-card {
  padding: 1.5rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
}

.type-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-bottom: 0.5rem;
}

.type-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem;
}

/* ===== Author Section ===== */
.author-section {
  margin-top: 3rem;
}

.author-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  border-radius: var(--radius-xl);
  color: white;
}

.author-avatar {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.author-initial {
  color: white;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.author-role {
  font-size: 0.875rem;
  opacity: 0.8;
  margin: 0 0 1rem;
}

.author-links {
  display: flex;
  gap: 1rem;
}

.author-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  color: white;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.author-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* ===== Footer ===== */
.footer {
  margin-top: 4rem;
  padding: 2rem 1.5rem;
  border-top: 1px solid var(--border-light);
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.footer-content p {
  margin: 0.25rem 0;
}

/* ===== Responsive Adjustments ===== */
@media (max-width: 768px) {
  .main {
    padding: 1.5rem 1rem;
  }

  .section {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .playground-preview {
    padding: 2rem 1rem;
  }

  .feature-preview {
    padding: 1.5rem;
  }

  .author-card {
    flex-direction: column;
    text-align: center;
  }

  .author-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 2rem 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .title-icon {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .tech-badges {
    flex-direction: column;
  }

  .nav-links.mobile-open {
    max-height: 80vh;
    overflow-y: auto;
  }

  .example-preview {
    padding: 1.5rem;
  }

  .example-info {
    padding: 1rem;
  }

  .playground-controls {
    padding: 1rem;
  }

  .feature-content {
    padding: 1rem;
  }

  .method-actions {
    flex-direction: column;
  }

  .author-links {
    flex-direction: column;
  }

  .author-link {
    width: 100%;
    justify-content: center;
  }
}

/* ===== Dark Mode Overrides ===== */
.dark .code-content code {
  color: #e2e8f0;
}

.dark .example-preview.dark-bg {
  background: #0f172a;
}

.dark .feature-badge {
  background: var(--primary);
}

.dark .slot-name {
  background: var(--primary);
}

.dark .method-name {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

/* ===== Animations ===== */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section {
  animation: fadeIn 0.5s ease-out;
}

.example-card,
.feature-card,
.method-card,
.event-card,
.type-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.example-card:hover,
.feature-card:hover,
.method-card:hover,
.event-card:hover,
.type-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* ===== Print Styles ===== */
@media print {

  .nav,
  .toc,
  .theme-toggle,
  .mobile-menu-btn,
  .copy-button,
  .method-actions,
  .feature-controls,
  .playground-controls,
  .footer {
    display: none !important;
  }

  .header {
    background: none;
    color: black;
    padding: 1rem;
  }

  .header-bg {
    display: none;
  }

  .section {
    break-inside: avoid;
  }

  .code-card {
    border: 1px solid #ddd;
  }
}
</style>