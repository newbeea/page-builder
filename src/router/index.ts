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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/component-store',
    name: 'ComponentStore',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "component-store" */ '../views/ComponentStore.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
