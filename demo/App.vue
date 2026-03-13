<template>
  <div class="app-layout">
    <nav class="top-nav">
      <div class="nav-brand">
        <span class="nav-icon">⚡</span>
        Vue Advanced Speedometer
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-link" active-class="active">Demo</router-link>
        <router-link to="/docs" class="nav-link" active-class="active">Documentation</router-link>
        <a href="https://github.com/Navni11/vue-advanced-speedometer" class="nav-link" target="_blank">GitHub</a>
      </div>
    </nav>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Layout styles that apply to the whole app */
body {
  margin: 0;
  padding: 0;
  background: #f8fafc;
  color: #0f172a;
  font-family: 'Inter', system-ui, sans-serif;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-brand {
  font-weight: 700;
  font-size: 1.1rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  color: #64748b;
  transition: color 0.2s;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: #0f172a;
}

.nav-link.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.main-content {
  flex: 1;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #0f0f1a;
    color: #f8fafc;
  }
  .top-nav {
    background: #1e1e2d;
    border-bottom-color: #334155;
  }
  .nav-brand { color: #f8fafc; }
  .nav-link { color: #94a3b8; }
  .nav-link:hover { color: #f8fafc; }
}
</style>
