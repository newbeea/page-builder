import { createApp } from 'vue';
import router from '@/router';
import App from '@/App.vue';
import store from '@/store';
import '@/assets/common.scss';
import {
  ElMenu,
  ElMenuItem,
  ElCard,
  ElTabs,
  ElTabPane,
  ElIcon,
  // ElInfiniteScroll,
  // ElLoading,
  // ElMessage,
  // ElMessageBox,
  // ElNotification,
} from 'element-plus';

const components = [
  ElMenu,
  ElMenuItem,
  ElCard,
  ElTabs,
  ElTabPane,
  ElIcon,
];

// const plugins = [
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification,
// ];

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

// plugins.forEach((plugin) => {
//   app.use(plugin);
// });
app.use(store).use(router).mount('#app');
