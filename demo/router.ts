import { createRouter, createWebHistory } from 'vue-router'
import DemoHome from './views/DemoHome.vue'
import DocsPage from './views/DocsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DemoHome },
    { path: '/docs', component: DocsPage },
  ]
})

export default router
