import { defineStore } from 'pinia';
// import { getUserDetail } from '@src/api/auth/index';

const userStore = defineStore({
    id: 'user',
    state: () => {
        return {
            token: '',
            systemCode: '',
            orgId: '',
            userInfo: {},
        };
    },
    actions: {
        setToken(value) {
            this.token = value;
        },
        setSystemCode(value) {
            this.systemCode = value;
        },
        setOrgId(id) {
            this.orgId = id;
        },
        setUserInfo(value) {
            this.userInfo = value;
        },
        async initUser() {
            // 设置用户信息
            // const { data } = await getUserDetail();
            // this.setUserInfo(data);
        },
        clearData() {
            this.token = '';
            this.systemCode = '';
            this.userInfo = {};
        },
        logout() {
            this.clearData();
            window.location.replace(import.meta.env.VITE_LOGIN_URL);
        },
    },
    getters: {},
    persist: {
        key: 'demo',
        paths: ['token', 'systemCode'],
    },
});

export default function useUserStore() {
    return userStore();
}
