import { createApp } from 'vue';
import * as Vue from 'vue';
import router from '@/router';
import App from '@/App.vue';
import store from '@/store';
import Draggable from '@/directives/draggable';
import '@/assets/common.scss';
import PageModule from '@/store/modules/page';
import BuilderModule from '@/store/modules/builder';
import axios from 'axios';
import {
  ElMenu,
  ElMenuItem,
  ElCard,
  ElTabs,
  ElTabPane,
  ElIcon,
  ElInput,
  ElTree,
  ElSelect,
  ElOption,
  ElSwitch,
  ElCollapse,
  ElCollapseItem,
  ElForm,
  ElFormItem,
  ElRadioButton,
  ElRadioGroup,
  ElTooltip,
  ElAutocomplete,
  ElDrawer,
  ElButton,
  ElColorPicker,
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
  ElInput,
  ElTree,
  ElSelect,
  ElOption,
  ElSwitch,
  ElCollapse,
  ElCollapseItem,
  ElForm,
  ElFormItem,
  ElRadioButton,
  ElRadioGroup,
  ElTooltip,
  ElAutocomplete,
  ElDrawer,
  ElButton,
  ElColorPicker,
];

// const plugins = [
//   ElInfiniteScroll,
//   ElLoading,
//   ElMessage,
//   ElMessageBox,
//   ElNotification,
// ];

const app = Vue.createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

// plugins.forEach((plugin) => {
//   app.use(plugin);
// });
app.use(Draggable, {
  store: PageModule,
});
app.use(store).use(router);

(async () => {
  const { data: response } = await axios.get('/api/panels');

  const thirdPartyPanels = response.data;
  BuilderModule.SET_PANELS(thirdPartyPanels);
  for (let i = 0; i < thirdPartyPanels.length; i += 1) {
    const component = thirdPartyPanels[i];

    const head = document.querySelector('head');
    const link = document.createElement('link');
    link.href = component.cssUrl;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head?.appendChild(link);

    const res = await axios.get(component.umdUrl);
    eval(`window.Vue = Vue; ${res.data}; console.log(component.name); app.component(component.name, ${component.name});`);
  }

  const { data: res } = await axios.get('/api/components');

  const componentList = res.data;
  BuilderModule.SET_COMPONENTS(componentList);
  app
    .mount('#app');
})();
