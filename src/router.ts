import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getStored } from './setup/stored'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'menu',
    component: () => import('./menu/Menu.vue')
  },
  {
    path: '/play',
    name: 'game',
    component: () => import('./game/Game.vue')
  },
  {
    path: '/setup',
    name: 'setup',
    component: () => import('./setup/Setup.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.name !== 'setup' && (!getStored('ip') || !getStored('light') || !getStored('user'))){
    return { name: 'setup' }
  }
})

export { router }
