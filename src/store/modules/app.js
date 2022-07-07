import { defineStore } from 'pinia';

const appStore = defineStore({
    id: 'app',
    state: () => {},
    getters: {},
    actions: {},
    persist: true,
});

export default function useAppStore() {
    return appStore();
}
