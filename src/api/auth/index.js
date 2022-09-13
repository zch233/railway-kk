import { request } from '@src/utils/request';
import { useStoreUser } from '@src/store/modules/user';
const userApiUrl = import.meta.env.VITE_USER_API_URL;

// 用户中心 查询账号信息
export const getUserDetail = () => {
    return request({
        baseURL: userApiUrl,
        url: '/open/user/tokenDetail',
        method: 'get',
    });
};

// 用户中心 获取用户路由权限
export const getRouterPermission = () => {
    const storeUser = useStoreUser();
    return request({
        baseURL: userApiUrl,
        url: '/open/permission/router',
        method: 'get',
        params: {
            system_code: storeUser.systemCode,
            org_id: storeUser.orgId,
        },
    });
};
