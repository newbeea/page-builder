import App from '@/components/PbPage.vue';
import store from '@/store';
import '@/assets/common.scss';
import Draggable from '@/directives/draggable';
import Selectable from '@/directives/selectable';
import PageModule from '@/store/modules/page';
import axios from 'axios';
import * as Vue from 'vue';
// import thirdPartyComponents from '@/db';
import { componentList } from '@/build-in/index';
import {
  ElInput,
  ElButton,
  ElCard,
} from 'element-plus';

const components = [
  ElInput,
  ElButton,
  ElCard,
];

const app = Vue.createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});
(async () => {
  componentList.forEach((component) => {
    app.component(component.name, component);
  });
  // for (let i = 0; i < thirdPartyComponents.length; i += 1) {
  //   const component = thirdPartyComponents[i];
  //   const res = await axios.get(component.url);
  //   eval(`window.Vue = Vue; ${res.data}; app.component(${component.name}.component.name, ${component.name}.component);`);
  // }
  app
    .use(store)
    .use(Draggable, {
      store: PageModule,
    })
    .use(Selectable, {
      store: PageModule,
    })
    .mount('#app');
})();
