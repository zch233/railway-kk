<template>
    <transition-group name="breadcrumb" tag="div" class="ant-breadcrumb breadcrumb box-shadow">
        <a-breadcrumb-item v-for="(item, index) in levelList.data" :key="item.name">
            <span v-if="index === 0">当前位置：</span>
            <span
                v-if="item.redirect === 'noRedirect' || index === levelList.data.length - 1 || !item.path || !item.component"
                :class="{ 'last-item': index === levelList.data.length - 1 }"
            >
                {{ item.title || item.meta?.title }}
            </span>
            <router-link v-else :to="item.path">
                {{ item.meta?.title }}
            </router-link>
        </a-breadcrumb-item>
    </transition-group>
</template>

<script setup>
import { reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import { get } from 'lodash';
import { useStorePermission } from '@src/store/modules/permission';
const route = useRoute();

const levelList = reactive({
    data: [],
});

watch(route, () => {
    if (route.path.startsWith('/redirect/')) return;
    getBreadcrumb();
});
let storePermission = useStorePermission();

const getBreadcrumb = () => {
    const { meta, path } = route;
    const jRoute = {
        path: route.path,
        meta: route.meta,
        name: route.name,
        key: Math.random(),
    };
    const activeMenu = get(meta, 'activeMenu', '');
    if (activeMenu) {
        let list = loopMenu(storePermission.menuList, activeMenu) || [];
        levelList.data = list.concat([jRoute]);
    } else {
        levelList.data = loopMenu(storePermission.menuList, path) || [];
    }
};

const loopMenu = (_menuList, _activeMenu) => {
    for (let index = 0; index < _menuList.length; index++) {
        const item = _menuList[index];
        if (item.path === _activeMenu) {
            item.key = Math.random();
            return [item];
        } else {
            if (item.children && item.children.length > 0) {
                const result = loopMenu(item.children, _activeMenu);
                if (result && result.length > 0) {
                    return [item].concat(result);
                }
            }
        }
    }
};

getBreadcrumb();
</script>

<style lang="less" scoped>
.breadcrumb {
    width: 100%;
    height: 45px;
    padding: 0 @space6;
    line-height: 45px;
    background: #fff;

    .no-redirect {
        color: #666;
        cursor: text;
    }

    a {
        &:hover {
            color: #999;
        }
    }

    .last-item {
        color: #000;
    }
}
</style>
