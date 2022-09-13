import { defineStore } from 'pinia';
import { useLocalStorage } from '@src/utils/storage';

export const useStoreUser = defineStore('user', () => {
    const token = useLocalStorage('token', '');
    const orgId = useLocalStorage('orgId', '');
    const userInfo = ref({});
    const systemCode = useLocalStorage('systemCode', '');

    const setToken = value => (token.value = value);
    const setSystemCode = value => (systemCode.value = value);
    const setOrgId = value => (orgId.value = value);
    const setUserInfo = value => (userInfo.value = value);

    const clearData = () => {
        token.value = '';
        systemCode.value = '';
        userInfo.value = {};
    };
    const initUser = async () => {
        // 设置用户信息
        // const { data } = await getUserDetail();
        // this.setUserInfo(data);
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
        setUserInfo,
        clearData,
        initUser,
        logout,
    };
});
