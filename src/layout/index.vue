<template>
    <a-layout class="layout">
        <Header />
        <a-layout>
            <Sider />
            <a-layout>
                <Breadcrumb />
                <a-layout-content class="content">
                    <router-view v-slot="{ Component }">
                        <transition name="fade-transform" mode="out-in">
                            <keep-alive :key="routeKey">
                                <component :is="Component" />
                            </keep-alive>
                        </transition>
                    </router-view>
                    <Footer />
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Breadcrumb from './components/Breadcrumb.vue';
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
    .content {
        padding: @space24;
        overflow-x: hidden;
        overflow-y: auto;
        > div:not(.footer) {
            width: 100%;
            min-height: 400px;
            background: #fff;
            box-shadow: 0 0 5px rgba(148, 161, 196, 0.3);
        }
    }
}
</style>
