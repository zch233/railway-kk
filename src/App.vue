<template>
    <AConfigProvider :locale="zhCN">
        <router-view v-slot="{ Component }">
            <transition>
                <component :is="Component" />
            </transition>
        </router-view>
    </AConfigProvider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
</script>
