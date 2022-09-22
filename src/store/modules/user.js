import { defineStore } from 'pinia';
import { useLocalStorage } from '@src/utils/storage';
// import { getUserDetail, userSystemOrg } from '@src/api/auth/index.js';

export const useStoreUser = defineStore('user', () => {
    const token = useLocalStorage('token', '');
    const orgId = useLocalStorage('orgId', 1);
    const systemCode = useLocalStorage('systemCode', '');
    const userInfo = ref({});
    const orgListMenu = ref([]);

    const setToken = value => (token.value = value);
    const setSystemCode = value => (systemCode.value = value);
    const setOrgId = value => (orgId.value = value);
    const setUserInfo = value => (userInfo.value = value);
    const setOrgListMenu = value => (orgListMenu.value = value);

    const clearData = () => {
        token.value = '';
        systemCode.value = '';
        orgId.value = '';
    };

    // 设置用户信息
    const initUser = async () => {
        // const { data } = await getUserDetail();
        // setUserInfo(data);
    };

    // 获取左上角切换机构
    const getUserSystemOrg = async () => {
        // const { data } = await userSystemOrg();
        const data = [
            {
                id: 1,
                name: '杭州古珀医疗科技有限公司',
            },
            {
                id: 2,
                name: '萧山卫健',
            },
        ];
        setOrgListMenu(data);
    };

    const logout = () => {
        clearData();
        window.location.replace(import.meta.env.VITE_LOGIN_URL);
    };
    return {
        token,
        setToken,
        systemCode,
        setSystemCode,
        orgId,
        setOrgId,
        userInfo,
        orgListMenu,
        setUserInfo,
        setOrgListMenu,
        clearData,
        initUser,
        logout,
        getUserSystemOrg,
    };
});
