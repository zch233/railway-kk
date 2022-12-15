import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        name: 'Redirect',
        path: '/redirect',
        component: () => import('@src/layout/index.vue'),
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
