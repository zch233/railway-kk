<template>
    <a-layout-sider width="208" v-model:collapsed="collapsed" theme="light" class="layout-sider box-shadow" collapsible>
        <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline">
            <Menu v-for="sider in siderList" :key="sider.path" :data="sider" />
        </a-menu>
        <template #trigger>
            <div class="trigger">
                <menu-unfold-outlined v-if="collapsed" />
                <menu-fold-outlined v-else />
                <span>收起菜单</span>
            </div>
        </template>
    </a-layout-sider>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { uniq } from 'lodash';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import usePermissionStore from '@src/store/modules/permission';
import Menu from './Menu';
const route = useRoute();

/**
 * data
 */
const selectedKeys = ref([]);
const openKeys = ref([]);
const collapsed = ref(false);
const siderList = computed(() => {
    const permissionStore = usePermissionStore();
    return permissionStore.menuList;
});

/**
 * methods
 */
const findPatentValue = (array, value, valueName = 'path', childrenName = 'children') => {
    if (!value || !Array.isArray(array)) return [];
    const result = [];
    let valid = false;
    const seek = (array, value) => {
        let parentValue = '';
        const up = (array, value, lastValue) => {
            array.forEach(v => {
                const val = v[valueName];
                const child = v[childrenName];
                if (val === value) {
                    valid = true;
                    parentValue = lastValue;
                    return;
                }
                if (child && child.length) up(child, value, val);
            });
        };
        up(array, value);
        if (parentValue) {
            result.unshift(parentValue);
            seek(array, parentValue);
        }
    };
    seek(array, value);
    return valid ? result : [];
};

/**
 * watch
 */
watch(
    () => route,
    route => {
        const { meta, path } = route;
        if (meta.activeMenu) {
            selectedKeys.value = [meta.activeMenu];
            openKeys.value = uniq([...openKeys.value, ...findPatentValue(siderList.value, meta.activeMenu)]);
            return;
        }
        selectedKeys.value = [path];
        openKeys.value = uniq([...openKeys.value, ...findPatentValue(siderList.value, path)]);
    },
    {
        deep: true,
        immediate: true,
    }
);
</script>

<style lang="less">
.ant-layout-sider.layout-sider {
    padding-top: 10px;
    padding-bottom: 55px;
    .ant-layout-sider-children {
        .ant-menu-item,
        .ant-menu-submenu-title {
            margin: 0;
            height: 52px;
            line-height: 52px;
            padding: 0 18px !important;
            user-select: none;
        }
        .ant-menu-sub .ant-menu-item {
            padding-left: 48px !important;
        }
        .anticon {
            font-size: 22px !important;
        }
    }
    .ant-layout-sider-trigger {
        height: 55px;
        line-height: 1;
        padding: 0 18px;
        text-align: left;
        overflow: hidden;
        .trigger {
            width: 100%;
            height: 100%;
            border-top: 1px solid #ebeef5;
            color: #999;
            display: flex;
            align-items: center;
            .anticon {
                font-size: 18px;
                color: var(--ant-primary-color);
            }
            span:last-child {
                margin-left: 10px;
                opacity: 1;
                transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), margin 0.3s, color 0.3s;
                white-space: nowrap;
                user-select: none;
            }
        }
    }
    &.ant-layout-sider-collapsed {
        .ant-layout-sider-children {
            .ant-menu-item,
            .ant-menu-submenu-title {
                padding: 0 calc(50% - 11px) !important;
            }
        }
        .ant-layout-sider-trigger {
            padding: 0 32px;
            .trigger {
                span:last-child {
                    opacity: 0;
                }
            }
        }
    }
}
.ant-tooltip-inner .menu-item .anticon {
    display: none;
}
</style>
