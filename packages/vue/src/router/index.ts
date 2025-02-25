import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'Portal'
    }
  },
  {
    path: '/portal',
    name: 'Portal',
    component: () => import('../views/portal/PortalPage.vue')
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/demo/DemoPage.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
