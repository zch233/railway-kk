import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { includes } from 'lodash';
import router from '@src/router';
import useUserStore from '@src/store/modules/user';
import usePermissionStore from '@src/store/modules/permission';

const excludePath = ['/auth', '/404']; // 排除的路径

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();
    const { token: queryToken, system_code: querySystemCode } = to.query;
    const token = userStore.token;
    if (queryToken && queryToken !== token) {
        userStore.setToken(queryToken);
        userStore.setSystemCode(querySystemCode);
    }
    if (!Object.keys(userStore.userInfo).length) await userStore.initUser();
    if (!permissionStore.hasRoute && !includes(excludePath, to.path)) {
        const { redirectRoute } = await permissionStore.initRoutes();
        next({ ...to, replace: true, path: to.fullPath === '/' ? redirectRoute : to.fullPath });
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});
