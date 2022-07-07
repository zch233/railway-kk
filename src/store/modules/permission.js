import { defineStore } from 'pinia';
import router from '@src/router';
import Layout from '@src/layout/index.vue';
// import { getRouterPermission } from '@src/api/auth/index';
import data from '@src/utils/mock';

// 驼峰转换
const transferPascalCase2Kebabcase = str => str && str.replace(/\B([A-Z])/g, '-$1').toLowerCase();

const permissionStore = defineStore({
    id: 'permission',
    state: () => {
        return {
            menuList: [],
            hasRoute: false,
            permission: {},
        };
    },
    actions: {
        setHasRoute(value) {
            this.hasRoute = value;
        },
        setMenuList(value) {
            this.menuList = value;
        },
        setPermission(value) {
            this.permission = value;
        },
        async initRoutes() {
            // eslint-disable-next-line no-async-promise-executor
            return new Promise(async resolve => {
                // 有接口则替换为接口返回 data 即可
                // const { data } = await getRouterPermission();
                this.setPermission(data);
                this.setRoutes(data);
                // 返回登录成功后前往的页面地址
                resolve({ redirectRoute: this.$state.menuList[0]?.children?.[0]?.path || this.$state.menuList[0]?.path || '/' });
            });
        },
        setRoutes(menus) {
            const routes = {
                path: '/',
                name: 'layout',
                component: Layout,
                redirect: '',
                children: [],
            };
            const generateMeta = ({ activeMenu, ...meta }) => {
                return {
                    ...meta,
                    ...(activeMenu && {
                        activeMenu: transferPascalCase2Kebabcase(activeMenu),
                    }),
                };
            };
            const modules = import.meta.glob('../../views/**/*.vue');
            const generateRoute = item => ({
                path: transferPascalCase2Kebabcase(item.path ?? ''),
                name: item.path?.slice(1).replace(/\//g, '.'),
                meta: item.meta && generateMeta(item.meta),
                component: modules[`../../views${item.path}/index.vue`],
            });
            const generateRoutes = list => {
                const menuRouter = [];
                list.forEach(item => {
                    const children = item.children && item.children.length > 0 ? generateRoutes(item.children) : [];
                    const route = {
                        ...generateRoute(item),
                        children: children,
                    };
                    if (item.redirect) route.redirect = item.redirect;
                    if (item.children?.length === 0) routes?.children?.push(route);
                    menuRouter.push(route);
                });
                return menuRouter;
            };
            const menuRouter = generateRoutes(menus.router);
            const otherPageRoutes = {
                path: '/more',
                component: Layout,
                children: (menus.otherPage || []).map(item => generateRoute(item)),
            };
            if (otherPageRoutes.children.length > 0) {
                // 如果有详情页的路由则加入
                router.addRoute(otherPageRoutes);
            }
            if (routes.children && routes.children.length > 0) {
                // 如果有菜单的路由则加入
                routes.redirect = routes?.children?.[0]?.path;
                router.addRoute([routes][0]);
                router.addRoute({
                    path: '/:catchAll(.*)',
                    redirect: { path: '/404' },
                });
                // 设置页面展示菜单数组
                this.setHasRoute(true);
                this.setMenuList(menuRouter);
            }
        },
    },
    getters: {},
});

export default function usePermissionStore() {
    return permissionStore();
}
