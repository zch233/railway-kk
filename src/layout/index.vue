<script setup>
import { computed } from 'vue';
import { useStoreSetting } from '@src/store/modules/setting';
import { useStorePermission } from '@src/store/modules/permission.js';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Sider from './components/Sider/index.vue';
import Setting from './Setting/index.vue';

const storeSetting = useStoreSetting();
const storePermission = useStorePermission();

const include = computed(() => {
    return storePermission.getKeepAliveList();
});
</script>

<template>
    <ALayout class="layout">
        <Header v-if="storeSetting.showHeader" />
        <ALayout>
            <Sider v-if="storeSetting.layoutType === 'left' && storeSetting.showMenu" />
            <ALayout>
                <Breadcrumb v-if="storeSetting.shwoBreadcrumb" />
                <div class="content-top" id="contentTop" />
                <ALayoutContent class="content">
                    <div class="main">
                        <RouterView>
                            <template #default="{ Component }">
                                <transition :name="storeSetting.animateType" mode="out-in">
                                    <KeepAlive :include="include">
                                        <component :is="Component" />
                                    </KeepAlive>
                                </transition>
                            </template>
                        </RouterView>
                        <Footer />
                    </div>
                </ALayoutContent>
            </ALayout>
        </ALayout>
        <Setting />
    </ALayout>
</template>

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
