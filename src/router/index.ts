import {
  createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw,
} from 'vue-router';
import Builder from '@/views/Builder.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/page-builder',
  },
  {
    path: '/page-builder',
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
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
