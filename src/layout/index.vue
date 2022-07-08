<template>
    <a-layout class="layout">
        <Header />
        <a-layout class="content">
            <Sider />
            <div class="main">
                <router-view v-slot="{ Component }">
                    <transition name="fade-transform" mode="out-in">
                        <keep-alive :key="routeKey">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </div>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Sider from './components/Sider/index.vue';
const route = useRoute();

const routeKey = computed(() => {
    return route.path;
});
</script>

<style lang="less" scoped>
.layout {
    width: 100%;
    height: 100vh;
    .main {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        > div {
            height: 100%;
            padding: 16px;
            background: #fff;
            box-shadow: 0 0 5px rgba(148, 161, 196, 0.3);
        }
    }
}
</style>
