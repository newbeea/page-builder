import App from '@/components/PbPage.vue';
import store from '@/store';
import '@/assets/common.scss';
import Draggable from '@/directives/draggable';
import PageModule from '@/store/modules/page';
import axios from 'axios';
import * as Vue from 'vue';
// import thirdPartyComponents from '@/db';
import { componentList } from '@/build-in/index';

const app = Vue.createApp(App);

(async () => {
  componentList.forEach((component) => {
    app.component(component.name, component);
  });
  // for (let i = 0; i < thirdPartyComponents.length; i += 1) {
  //   const component = thirdPartyComponents[i];
  //   const res = await axios.get(component.url);
  //   eval(`window.Vue = Vue; ${res.data}; app.component(${component.name}.component.name, ${component.name}.component);`);
  // }
  app.use(store).use(Draggable, {
    store: PageModule,
  }).mount('#app');
})();
