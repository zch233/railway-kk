<template>
    <div class="setting">
        <a-drawer :width="300" placement="right" :visible="visible" :closable="false" class="setting-drawer">
            <template #handle>
                <div class="setting-button" @click="visible = !visible" :style="{ backgroundColor: storeSetting.theme['--ant-primary-color'] }">
                    <CloseOutlined v-if="visible" />
                    <SettingOutlined v-else />
                </div>
            </template>
            <div class="setting-item__title">主题色</div>
            <div class="setting-item__content">
                <div class="theme-color">
                    <span :style="{ backgroundColor: storeSetting.theme['--ant-primary-color'] }" @click="colorRef.click()"></span>
                    <input type="color" ref="colorRef" :value="storeSetting" @change="e => storeSetting.setTheme({ '--ant-primary-color': e.target.value })" />
                    <a-input
                        :value="storeSetting.theme['--ant-primary-color']"
                        @change="e => storeSetting.setTheme({ '--ant-primary-color': e.target.value })"
                        placeholder="请输入颜色值"
                    />
                </div>
                <ul class="theme-list">
                    <li
                        v-for="backgroundColor in [
                            '#2d8cf0',
                            '#0960bd',
                            '#0084f4',
                            '#009688',
                            '#536dfe',
                            '#ff5c93',
                            '#ee4f12',
                            '#0096c7',
                            '#9c27b0',
                            '#ff9800',
                            '#ff3d68',
                            '#00c1d4',
                            '#71efa3',
                            '#171010',
                            '#78dec7',
                            '#1768ac',
                            '#fc5404',
                            '#ff4848',
                            '#0a1d37',
                            '#39a6a3',
                            '#ff8474',
                        ]"
                        :key="backgroundColor"
                        :style="{ backgroundColor }"
                        :class="{ active: storeSetting.theme['--ant-primary-color'] === backgroundColor }"
                        @click="storeSetting.setTheme({ '--ant-primary-color': backgroundColor })"
                    >
                        ✓
                    </li>
                </ul>
            </div>
            <div class="setting-item__title">导航模式</div>
            <div class="setting-item__content">
                <div class="checkbox-layout">
                    <a-tooltip placement="top">
                        <template #title>
                            <span>左侧菜单模式</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('layoutType', 'left')">
                            <CheckOutlined v-if="storeSetting.layoutType === 'left'" />
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>顶部菜单模式</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('layoutType', 'top')">
                            <CheckOutlined v-if="storeSetting.layoutType === 'top'" />
                        </div>
                    </a-tooltip>
                </div>
            </div>
            <div class="setting-item__title">导航栏风格</div>
            <div class="setting-item__content">
                <div class="checkbox-layout sider">
                    <a-tooltip placement="top">
                        <template #title>
                            <span>白色侧边栏</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('siderType', 'whiteSider')">
                            <CheckOutlined v-if="storeSetting.siderType === 'whiteSider'" />
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>暗色侧边栏</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('siderType', 'darkSider')">
                            <CheckOutlined v-if="storeSetting.siderType === 'darkSider'" />
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>暗色顶栏</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('siderType', 'darkTop')">
                            <CheckOutlined v-if="storeSetting.siderType === 'darkTop'" />
                        </div>
                    </a-tooltip>
                </div>
            </div>
            <div class="setting-item__title">界面显示</div>
            <div class="setting-item__content">
                <div class="setting-group">
                    <div class="setting-group__title">显示面包屑导航</div>
                    <a-switch :checked="storeSetting.shwoBreadcrumb" @change="val => changeState('shwoBreadcrumb', val)" />
                </div>
            </div>
            <div class="setting-item__title">动画</div>
            <div class="setting-item__content">
                <div class="setting-group">
                    <div class="setting-group__title">动画类型</div>
                    <a-select :value="storeSetting.animateType" :options="animates" @change="val => changeState('animateType', val)" />
                </div>
            </div>
            <!-- 复制配置 -->
            <div class="setting-copy">
                <a-alert message="点击复制配置，需覆盖到 src\store\modules\setting.js 中 initTheme、settings 变量中" type="warning" @click="handleCopy" />
            </div>
        </a-drawer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import copy from 'copy-to-clipboard';
import { SettingOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons-vue';
import { useStoreSetting } from '@src/store/modules/setting';
import { animates } from './libs/animateSetting';

/**
 * data
 */
const visible = ref(false);
const colorRef = ref();
const storeSetting = useStoreSetting();

/**
 * methods
 */
const changeState = (state, value) => {
    storeSetting.setState(state, state === 'themeColor' ? value.target.value : value);
};
const handleCopy = () => {
    const { layoutType, siderType, animateType, shwoBreadcrumb } = storeSetting;
    copy(
        `${JSON.stringify(storeSetting.theme, null, 4)}\n${JSON.stringify(
            {
                layoutType,
                siderType,
                animateType,
                shwoBreadcrumb,
            },
            null,
            4
        )}
        `
    );
    message.success('复制成功');
};
</script>

<style lang="less" scoped>
.setting-button {
    position: absolute;
    top: 30%;
    right: 0;
    z-index: 99;
    display: flex;
    width: 48px;
    height: 48px;
    font-size: 20px;
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
    margin-bottom: 24px;
    font-size: 15px;
    line-height: 22px;
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
        background: @BorderColor1;
        content: '';
    }

    &::after {
        right: 0;
        left: auto;
    }
}

.setting-item__content {
    margin-bottom: 36px;
}

.theme-color {
    position: relative;
    display: flex;

    > span {
        display: block;
        width: 80px;
        height: 32px;
        margin-right: @space3;
        border: 2px solid @BorderColor1;
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
    margin: 18px 0 0;

    li {
        display: flex;
        width: 20px;
        height: 20px;
        margin: 0 5px 5px 3px;
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
        margin-right: 16px;
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

    &__title {
        height: 32px;
        margin-right: 18px;
        line-height: 32px;
        flex-shrink: 0;
    }

    > div:not(.setting-group__title) {
        flex: 1;
    }
}

.setting-copy {
    .ant-alert {
        cursor: pointer;
        opacity: 0.8;
        user-select: none;
    }
}
</style>
