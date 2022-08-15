import { defineStore } from 'pinia';

const settingStore = defineStore({
    id: 'app',
    state: () => {
        return {
            themeColor: '#1890ff',
        };
    },
    actions: {
        setState(key, value) {
            this[key] = value;
        },
    },
});

export default function useSettingStore() {
    return settingStore();
}
