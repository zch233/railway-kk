import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register'; // Here the svg sprite map has been generated
import router from '@src/router';
import '@src/router/routerGuard';
import store from '@src/store';
import '@src/styles/reset.css';
import 'ant-design-vue/dist/antd.variable.min.css';
import '@src/styles/transition/index.less';
import '@src/styles/global.less';
import { permissionDirective } from '@src/utils/directives.js';

export const app = createApp(App);
permissionDirective(app);
app.use(router).use(store).mount('#app');
