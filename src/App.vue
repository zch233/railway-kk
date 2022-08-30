<template>
    <div id="app">
        <router-view v-slot="{ Component }">
            <transition>
                <a-config-provider :locale="zhCN">
                    <component :is="Component" />
                </a-config-provider>
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import { ConfigProvider } from 'ant-design-vue';
import useSettingStore from '@src/store/modules/setting';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

watch(
    () => useSettingStore().themeColor,
    val => {
        ConfigProvider.config({
            theme: {
                primaryColor: val,
            },
        });
    }
);
</script>
