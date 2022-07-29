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
    padding-bottom: 55px;

    .ant-menu-inline,
    .ant-menu-vertical,
    .ant-menu-vertical-left {
        border-right: none;
    }

    .ant-menu-inline .ant-menu-item,
    .ant-menu-inline .ant-menu-submenu-title {
        width: 100%;
    }

    .ant-layout-sider-children {
        padding: 10px 0;
        overflow-x: auto;

        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }

        &::-webkit-scrollbar-thumb {
            background: hsla(0, 0%, 100%, 0.2);
            border-radius: 3px;
            box-shadow: inset 0 0 5px hsl(0deg 0% 100% / 5%);
        }

        &::-webkit-scrollbar-track {
            background: hsla(0, 0%, 100%, 0.15);
            border-radius: 3px;
            box-shadow: inset 0 0 5px rgb(37 37 37 / 5%);
        }

        .ant-menu-item,
        .ant-menu-submenu-title {
            height: 52px;
            padding: 0 18px !important;
            margin: 0;
            line-height: 52px;
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
        padding: 0 18px;
        overflow: hidden;
        line-height: 1;
        text-align: left;

        .trigger {
            display: flex;
            width: 100%;
            height: 100%;
            color: #999;
            border-top: 1px solid #ebeef5;
            align-items: center;

            .anticon {
                font-size: 18px;
                color: var(--ant-primary-color);
            }

            span:last-child {
                margin-left: 10px;
                white-space: nowrap;
                opacity: 1;
                transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), margin 0.3s, color 0.3s;
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

.ant-layout-sider.layout-sider.ant-layout-sider-light .ant-layout-sider-children {
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.12);
        border-radius: 3px;
        box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.06);
        border-radius: 3px;
        box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
    }
}

.ant-tooltip-inner .menu-item .anticon {
    display: none;
}
</style>
