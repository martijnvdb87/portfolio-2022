import { createApp } from 'vue';
import store from './store';
import App from './App.vue';
import router from './router';
import './styles/index.scss';

declare global {
  interface Window {
    Prism?: any;
  }
}

const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');