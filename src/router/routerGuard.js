import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { includes } from 'lodash';
import router from '@src/router';
import { useStoreUser } from '@src/store/modules/user';
import { useStorePermission } from '@src/store/modules/permission';

const excludePath = ['/auth', '/404', '/forbidden']; // 排除的路径

router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const storeUser = useStoreUser();
    const storePermission = useStorePermission();
    const { token: queryToken, system_code: querySystemCode, org_id: queryOrgId } = to.query;
    const token = storeUser.token;
    const orgId = storeUser.orgId;
    const systemCode = storeUser.systemCode;

    if (queryToken && queryToken !== token) {
        storeUser.setToken(queryToken);
    }
    if (querySystemCode && querySystemCode !== systemCode) {
        storeUser.setSystemCode(querySystemCode);
    }
    if (queryOrgId && queryOrgId !== orgId) {
        storeUser.setOrgId(Number(queryOrgId));
    }

    if (!Object.keys(storeUser.userInfo).length) await storeUser.initUser();
    if (!storeUser.orgListMenu.length) await storeUser.getUserSystemOrg();
    if (!storePermission.hasRoute && !includes(excludePath, to.path)) {
        const { redirectRoute } = await storePermission.initRoutes();
        next({ ...to, replace: true, path: to.fullPath === '/' ? redirectRoute : to.fullPath });
    } else {
        next();
    }
});

router.afterEach(() => {
    NProgress.done();
});
