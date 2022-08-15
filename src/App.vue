<template>
    <div id="app">
        <router-view v-slot="{ Component }">
            <transition>
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import { ConfigProvider } from 'ant-design-vue';
import useSettingStore from '@src/store/modules/setting';

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
