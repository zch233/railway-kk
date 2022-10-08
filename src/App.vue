<template>
    <a-config-provider :locale="zhCN">
        <ThemeConfigProvider>
            <router-view v-slot="{ Component }">
                <transition>
                    <component :is="Component" />
                </transition>
            </router-view>
        </ThemeConfigProvider>
    </a-config-provider>
</template>

<script setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import ThemeConfigProvider from '@src/components/ThemeConfigProvider';
dayjs.locale('zh-cn');
</script>
