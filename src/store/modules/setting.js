import { defineStore } from 'pinia';
import { useLocalStorage } from '@src/utils/storage';
import { ConfigProvider } from 'ant-design-vue';
import { camelCase } from 'lodash';

const initTheme = {
    '--ant-primary-color': '#1890ff',
    '--ant-success-color': '#52c41a',
    '--ant-error-color': '#ff4d4f',
    '--ant-warning-color': '#faad14',
    '--ant-info-color': '#1890ff',
};

export const useStoreSetting = defineStore('settings', () => {
    const settings = reactive({
        layoutType: 'left',
        siderType: 'whiteSider',
        animateType: 'fade-slide',
    });
    const theme = useLocalStorage('theme', initTheme);
    const setTheme = data => {
        theme.value = { ...theme.value, ...data };
        // 如果是 ant 的主题色，需要调用 ConfigProvider.config
        const themeColors = ['--ant-primary-color', '--ant-success-color', '--ant-error-color', '--ant-warning-color', '--ant-info-color'];
        if (themeColors.find(v => Object.keys(data).includes(v))) {
            ConfigProvider.config({
                theme: Object.keys(theme.value)
                    .filter(v => themeColors.includes(v))
                    .reduce((res, key) => (res[camelCase(key.replace('ant', ''))] = theme.value[key]) && res, {}),
            });
        }
    };
    const setState = (key, value) => {
        settings[key] = value;
    };
    onMounted(() => {
        setTheme(theme.value);
    });
    return {
        ...toRefs(settings),
        theme,
        setTheme,
        setState,
    };
});
