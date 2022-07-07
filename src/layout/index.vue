<template>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :key="routeKey">
                    <component :is="Component" />
                </keep-alive>
            </transition>
        </router-view>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const routeKey = computed(() => {
    let route = useRoute();
    return route.path;
});
</script>

<style lang="less" scoped></style>
