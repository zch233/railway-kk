import { defineStore } from 'pinia';
// import { getUserDetail } from '@src/api/auth/index';

const userStore = defineStore({
    id: 'user',
    state: () => {
        return {
            token: '',
            systemCode: '',
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
        setUserInfo(value) {
            this.userInfo = value;
        },
        async initUser() {
            // 设置用户信息
            // const { data } = await getUserDetail();
            // this.setUserInfo(data);
        },
        logout() {
            this.token = '';
            this.systemCode = '';
            this.userInfo = {};
            window.location.href = import.meta.env.VITE_LOGIN_URL;
        },
    },
    getters: {},
    persist: true,
});

export default function useUserStore() {
    return userStore();
}
