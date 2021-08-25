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
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

const app = Vue.createApp(App);
app.use(ElementPlus);
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
    eval(`window.Vue = Vue; ${res.data}; app.component(component.name, ${component.name});`);
  }

  const { data: res } = await axios.get('/api/components');

  const componentList = res.data;
  BuilderModule.SET_COMPONENTS(componentList);
  app
    .mount('#app');
})();
