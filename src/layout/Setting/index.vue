<script setup name="Setting">
import { ref, computed } from 'vue';
import { SettingOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { useStoreSetting } from '@src/store/modules/setting';
import { animates, themes } from './libs/index';
import SettingCopy from '@src/layout/Setting/components/SettingCopy.vue';
import { GupoDrawer, GupoInput, GupoSelect, GupoSwitch, GupoTooltip } from '@src/components/UI';

const visible = ref(false);
const colorRef = ref();
const storeSetting = useStoreSetting();
const colorMaster = computed(() => storeSetting.theme['--color-master']);

const changeSetting = (state, value) => {
    storeSetting[value === undefined ? 'setTheme' : 'setSettings'](state, value);
};
</script>

<template>
    <div class="setting">
        <GupoDrawer :width="300" placement="right" v-model:visible="visible" :closable="false" class="setting-drawer">
            <template #handle>
                <div class="setting-button" @click="visible = !visible" :style="{ backgroundColor: colorMaster }">
                    <CloseOutlined v-if="visible" />
                    <SettingOutlined v-else />
                </div>
            </template>
            <div class="setting-item__title">主题色</div>
            <div class="setting-item__content">
                <div class="theme-color">
                    <span :style="{ backgroundColor: colorMaster }" @click="colorRef.click()" />
                    <input type="color" ref="colorRef" :value="storeSetting" @change="e => changeSetting({ '--color-master': e.target.value })" />
                    <GupoInput :value="colorMaster" @change="e => changeSetting({ '--color-master': e.target.value })" placeholder="请输入颜色值" />
                </div>
                <ul class="theme-list">
                    <li
                        v-for="backgroundColor in themes"
                        :key="backgroundColor"
                        :style="{ backgroundColor }"
                        :class="{ active: colorMaster === backgroundColor }"
                        @click="changeSetting({ '--color-master': backgroundColor })"
                    >
                        ✓
                    </li>
                </ul>
            </div>
            <div class="setting-item__title">导航模式</div>
            <div class="setting-item__content">
                <div class="checkbox-layout">
                    <GupoTooltip
                        placement="top"
                        v-for="item in [
                            { key: 'left', label: '左侧菜单模式' },
                            { key: 'top', label: '顶部菜单模式' },
                        ]"
                        :key="item.key"
                    >
                        <template #title>
                            <span>{{ item.label }}</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeSetting('layoutType', item.key)">
                            <CheckOutlined v-if="storeSetting.layoutType === item.key" />
                        </div>
                    </GupoTooltip>
                </div>
            </div>
            <div class="setting-item__title">导航栏风格</div>
            <div class="setting-item__content">
                <div class="checkbox-layout sider">
                    <GupoTooltip
                        placement="top"
                        v-for="item in [
                            { key: 'whiteSider', label: '白色侧边栏' },
                            { key: 'darkSider', label: '暗色侧边栏' },
                            { key: 'darkTop', label: '暗色顶栏' },
                        ]"
                        :key="item.key"
                    >
                        <template #title>
                            <span>{{ item.label }}</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeSetting('siderType', item.key)">
                            <CheckOutlined v-if="storeSetting.siderType === item.key" />
                        </div>
                    </GupoTooltip>
                </div>
            </div>
            <div class="setting-item__title">界面显示</div>
            <div class="setting-item__content">
                <div
                    class="setting-group"
                    v-for="item in [
                        { key: 'showHeader', label: '显示头部栏' },
                        { key: 'showMenu', label: '显示侧边栏' },
                        { key: 'showBreadcrumb', label: '显示面包屑导航' },
                        { key: 'showReloadView', label: '显示刷新按钮' },
                        { key: 'showSwitchOrg', label: '显示机构切换' },
                    ]"
                    :key="item.key"
                >
                    <div class="setting-group__title">{{ item.label }}</div>
                    <GupoSwitch :checked="storeSetting[item.key]" @change="val => changeSetting(item.key, val)" />
                </div>
            </div>
            <div class="setting-item__title">动画</div>
            <div class="setting-item__content">
                <div class="setting-group">
                    <div class="setting-group__title">动画类型</div>
                    <GupoSelect :value="storeSetting.animateType" :options="animates" @change="val => changeSetting('animateType', val)" />
                </div>
            </div>
            <!-- 复制配置 -->
            <SettingCopy />
        </GupoDrawer>
    </div>
</template>

<style lang="less" scoped>
.setting-button {
    @shape: 48px;
    position: absolute;
    top: 30%;
    right: 0;
    z-index: 10;
    display: flex;
    width: @shape;
    height: @shape;
    font-size: var(--font-size-headline);
    color: #fff;
    text-align: center;
    pointer-events: auto;
    cursor: pointer;
    border-radius: 4px 0 0 4px;
    align-items: center;
    justify-content: center;
}

.setting-drawer .setting-button {
    right: auto;
    left: 0;
    transform: translateX(-100%);
}

.setting-item__title {
    position: relative;
    margin-bottom: calc(var(--base-space) * 6);
    font-size: calc(var(--font-size-subtitle) - 1px);
    line-height: 1.48;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;

    &::before,
    &::after {
        position: absolute;
        top: 50%;
        left: 0;
        display: inline-block;
        width: 30%;
        height: 1px;
        background: var(--border-color);
        content: '';
    }

    &::after {
        right: 0;
        left: auto;
    }
}

.setting-item__content {
    margin-bottom: calc(var(--base-space) * 9);
}

.theme-color {
    position: relative;
    display: flex;

    > span {
        display: block;
        width: 80px;
        height: 32px;
        margin-right: @space3;
        border: 2px solid var(--border-color);
    }

    input[type='color'] {
        position: absolute;
        bottom: 0;
        left: 0;
        visibility: hidden;
    }
}

.theme-list {
    display: flex;
    flex-wrap: wrap;
    margin: calc(var(--base-space) * 5 - 2px) 0 0;

    li {
        @shape: 20px;
        @space: calc(var(--base-space) + 1px);
        display: flex;
        width: @shape;
        height: @shape;
        margin: 0 @space @space calc(var(--base-space) - 1px);
        color: transparent;
        cursor: pointer;
        transition: all 0.25s;
        align-items: center;
        justify-content: center;

        &.active {
            color: #fff;
        }
    }
}

.checkbox-layout {
    display: flex;

    &-item {
        position: relative;
        width: 45px;
        height: 35px;
        margin-right: calc(var(--base-space) * 4);
        overflow: hidden;
        cursor: pointer;
        background-color: #f0f2f5;
        border-radius: 4px;
        box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            width: 15px;
            height: 35px;
            background-color: #001529;
            content: '';
        }

        &::after {
            position: absolute;
            top: 0;
            right: 0;
            z-index: 0;
            width: 30px;
            height: 10px;
            background-color: #fff;
            content: '';
        }

        &:nth-child(2) {
            &::before {
                background-color: #fff;
            }

            &::after {
                background-color: #001529;
            }
        }

        :deep(.anticon-check) {
            position: absolute;
            right: 7px;
            bottom: 6px;
        }
    }

    &.sider {
        .checkbox-layout-item:nth-child(1)::before {
            background-color: #fff;
        }

        .checkbox-layout-item:nth-child(2)::before {
            background-color: #001529;
        }

        .checkbox-layout-item:nth-child(2)::after {
            background-color: #fff;
        }

        .checkbox-layout-item:nth-child(3)::after {
            background-color: #001529;
        }
    }
}

.setting-group {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & + .setting-group {
        margin-top: 18px;
    }

    &__title {
        margin-right: 18px;
        flex-shrink: 0;
    }

    > div:not(.setting-group__title) {
        flex: 1;
    }
}
</style>
