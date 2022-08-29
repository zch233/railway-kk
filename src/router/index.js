import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        name: 'auth',
        path: '/auth',
        component: () => import('@src/views/Auth/index.vue'),
        hidden: true,
    },
    {
        name: '404',
        path: '/404',
        component: () => import('@src/views/404.vue'),
        hidden: true,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 路由切换回滚到指定位置
    scrollBehavior: () => {
        if (document.querySelector('.ant-layout-content.content')) {
            document.querySelector('.ant-layout-content.content').scrollTop = 0;
        }
    },
});

export default router;
