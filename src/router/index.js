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
});

export default router;
