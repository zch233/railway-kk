<template>
    <a-config-provider :locale="zhCN">
        <router-view v-slot="{ Component }">
            <transition name="scale-transform" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </a-config-provider>
</template>

<script setup>
import { ConfigProvider } from 'ant-design-vue';
import { useStoreSetting } from '@src/store/modules/setting';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

watch(
    () => useStoreSetting().themeColor,
    val => {
        ConfigProvider.config({
            theme: {
                primaryColor: val,
            },
        });
    }
);
</script>
