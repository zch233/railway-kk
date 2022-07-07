import { request } from '@src/utils/request';
import useUserStore from '@src/store/modules/user';
const userApiUrl = import.meta.env.VITE_USER_API_URL;

// 用户中心 查询账号信息
export const getUserDetail = () => {
    return request({
        baseURL: userApiUrl,
        url: '/apiUser/apiUserDetails',
        method: 'get',
    });
};

// 用户中心 获取用户路由权限
export const getRouterPermission = () => {
    const userStore = useUserStore();
    return request({
        baseURL: userApiUrl,
        url: '/apiRouterPermissionNew',
        method: 'get',
        params: {
            system_code: userStore.systemCode,
        },
    });
};
