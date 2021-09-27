import {
  createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw,
} from 'vue-router';
import Builder from '@/views/Builder.vue';
import Pages from '@/views/Pages.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/pages',
  },
  {
    path: '/pages',
    component: Pages,
  },
  {
    path: '/page-builder/:id',
    name: 'Builder',
    component: Builder,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/component-store',
    name: 'ComponentStore',
    component: () => import(/* webpackChunkName: "component-store" */ '../views/ComponentStore.vue'),
  },
  {
    path: '/panel-store',
    name: 'PanelStore',
    component: () => import(/* webpackChunkName: "panel-store" */ '../views/PanelStore.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
