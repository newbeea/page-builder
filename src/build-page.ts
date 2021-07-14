import { createApp } from 'vue';
import App from '@/components/PbPage.vue';
import store from '@/store';
import '@/assets/common.scss';
import Draggable from '@/directives/draggable';
import PageModule from '@/store/modules/page';

const app = createApp(App);
// app.directive('draggable', (el: any, binding: any) => {
//   console.log(binding);
//   if (binding.value) {
//     el.setAttribute('draggable', true);
//   }
// });
app.use(store).use(Draggable, {
  store: PageModule,
}).mount('#app');
