import App from '@/components/PbPage.vue';
import store from '@/store';
import '@/assets/common.scss';
import Draggable from '@/directives/draggable';
import Selectable from '@/directives/selectable';
import PageModule from '@/store/modules/page';
import { Request } from '@/api/request';
import * as Vue from 'vue';
import { componentList as buildInList } from '@/build-in/index';
import {
  ElInput,
  ElButton,
  ElCard,
} from 'element-plus';
import { getComonents } from './api';

const components = [
  ElInput,
  ElButton,
  ElCard,
];

const app = Vue.createApp(App);
app.component('pb-css', {
  render() {
    const { h } = Vue;
    return h('style', this.$slots.default());
  },
});
components.forEach((component) => {
  app.component(component.name, component);
});
(async () => {
  buildInList.forEach((component) => {
    app.component(component.name, component);
  });

  const { data } = await getComonents();

  const componentList = data;
  for (let i = 0; i < componentList.length; i += 1) {
    const component = componentList[i];
    eval('window.Vue = Vue;');
    if (component.lib) {
      const head = document.querySelector('head');
      const link = document.createElement('link');
      link.href = component.lib.cssUrl;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      head?.appendChild(link);

      const res = await Request({
        url: component.lib.umdUrl,
        withCredentials: false,
      });
      eval(`${res};`);
    }
    if (component.componentName && !component.buildIn) {
      // console.log(`${component.componentName}`);
      eval(`app.component(component.componentName, ${component.componentName});`);
    }
  }

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
