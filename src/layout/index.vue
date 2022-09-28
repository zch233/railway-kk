<template>
    <a-layout class="layout">
        <Header />
        <a-layout>
            <Sider v-if="storeSetting.layoutType === 'left'" />
            <a-layout>
                <Breadcrumb v-if="storeSetting.shwoBreadcrumb" />
                <GoBack />
                <a-layout-content class="content">
                    <div class="main">
                        <router-view v-slot="{ Component }">
                            <transition :name="storeSetting.animateType" mode="out-in">
                                <keep-alive :include="include">
                                    <component :is="Component" />
                                </keep-alive>
                            </transition>
                        </router-view>
                        <Footer />
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <Setting />
    </a-layout>
</template>

<script setup>
import { computed } from 'vue';
// import { useRoute } from 'vue-router';
import { useStoreSetting } from '@src/store/modules/setting';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import GoBack from './components/GoBack.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Sider from './components/Sider/index.vue';
import Setting from './setting/index.vue';
import { useStorePermission } from '@src/store/modules/permission.js';

// const route = useRoute();
const storeSetting = useStoreSetting();
const storePermission = useStorePermission();

// const routeKey = computed(() => {
//     return route.path;
// });

const include = computed(() => {
    return storePermission.getKeepAliveList();
});
</script>

<style lang="less" scoped>
.layout {
    width: 100%;
    height: 100vh;

    .content {
        overflow-x: hidden;
        overflow-y: auto;

        .main {
            position: relative;
            min-height: 100%;
            padding-bottom: 72px;

            > div:not(.footer) {
                width: 100%;
                min-height: 400px;
            }
        }
    }
}
</style>
