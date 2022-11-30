import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register'; // Here the svg sprite map has been generated
import router from '@src/router';
import '@src/router/routerGuard';
import store from '@src/store';
import 'ant-design-vue/dist/antd.variable.min.css';
import '@src/styles/global.less';
import { setupDirectives } from '@src/directives';

const app = createApp(App);

setupDirectives(app);

app.use(router).use(store).mount('#app');
