import { defineStore } from 'pinia';

export const useStoreSetting = defineStore('settings', () => {
    const settings = reactive({
        themeColor: '#1890ff',
        layoutType: 'left',
        siderType: 'whiteSider',
        animateType: 'fade-slide',
    });
    const setState = (key, value) => {
        settings[key] = value;
    };
    return {
        ...toRefs(settings),
        setState,
    };
});
