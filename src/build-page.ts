import { createApp } from 'vue';
import App from '@/components/PbPage.vue';
import store from '@/store';
import '@/assets/common.scss';

const app = createApp(App);
app.use(store).mount('#app');
