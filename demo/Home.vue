<template>
  <div class="app-wrapper">
    <nav class="main-nav">
      <div class="nav-brand">⚡ VueSpeedometer</div>
      <div class="nav-links">
        <router-link to="/">Demo</router-link>
        <router-link to="/docs">Documentation</router-link>
        <a href="https://github.com/Navneet/vue-advanced-speedometer" target="_blank" class="nav-github">GitHub</a>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
/* Base global styles */
body {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  background: #0f0f1a;
  color: #fff;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-brand {
  font-weight: 700;
  font-size: 1.2rem;
  color: #a5b4fc;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links a.router-link-exact-active {
  color: #667eea;
}

.nav-github {
  opacity: 0.6;
}
.nav-github:hover {
  opacity: 1;
}
</style>
