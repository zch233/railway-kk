import { defineStore } from 'pinia';
import { useLocalStorage } from '@src/utils/storage';

export const useStoreApp = defineStore('app', () => {
    const orderList = useLocalStorage('orderList', []);
    const setOrderList = e => (orderList.value = e);
    return {
        dataSource: computed(() => ({ list: orderList.value, total: orderList.value.length })),
        setOrderList,
        orderList,
    };
});
