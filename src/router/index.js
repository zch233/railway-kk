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
        component: () => import('@src/views/Forbidden/404.vue'),
        hidden: true,
    },
    {
        name: 'forbidden',
        path: '/forbidden',
        component: () => import('@src/views/Forbidden/index.vue'),
        hidden: true,
    },
    {
        name: 'redirect',
        path: '/redirect',
        component: () => import('@src/layout/index.vue'),
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@src/views/Redirect/index.vue'),
            },
        ],
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
