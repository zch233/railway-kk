<template>
    <div class="setting">
        <a-drawer :width="300" :placement="right" :visible="visible" :closable="false" class="setting-drawer">
            <template #handle>
                <div class="setting-button" @click="visible = !visible">
                    <CloseOutlined v-if="visible" />
                    <SettingOutlined v-else />
                </div>
            </template>
            <div class="setting-item__title">主题色</div>
            <div class="setting-item__content">
                <div class="theme-color">
                    <span :style="{ background: setting.themeColor }" @click="colorRef.click()"></span>
                    <input type="color" ref="colorRef" :value="setting.themeColor" @change="e => changeState('themeColor', e)" />
                    <a-input :value="setting.themeColor" @change="e => changeState('themeColor', e)" placeholder="请输入颜色值" />
                </div>
            </div>
            <div class="setting-item__title">导航模式</div>
            <div class="setting-item__content">
                <div class="checkbox-layout">
                    <a-tooltip placement="top">
                        <template #title>
                            <span>左侧菜单模式</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('layoutType', 'left')">
                            <CheckOutlined v-if="setting.layoutType === 'left'" />
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>顶部菜单模式</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('layoutType', 'top')">
                            <CheckOutlined v-if="setting.layoutType === 'top'" />
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
                            <CheckOutlined v-if="setting.siderType === 'whiteSider'" />
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>暗色侧边栏</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('siderType', 'darkSider')">
                            <CheckOutlined v-if="setting.siderType === 'darkSider'" />
                        </div>
                    </a-tooltip>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>暗色顶栏</span>
                        </template>
                        <div class="checkbox-layout-item" @click="changeState('siderType', 'darkTop')">
                            <CheckOutlined v-if="setting.siderType === 'darkTop'" />
                        </div>
                    </a-tooltip>
                </div>
            </div>
        </a-drawer>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { SettingOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons-vue';
import useSettingStore from '@src/store/modules/setting';

/**
 * data
 */
const visible = ref(false);
const colorRef = ref();
const setting = computed(() => {
    const settingStore = useSettingStore();
    return settingStore;
});

/**
 * methods
 */
const changeState = (state, value) => {
    const settingStore = useSettingStore();
    settingStore.setState(state, state === 'themeColor' ? value.srcElement.value : value);
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
    background-color: var(--ant-primary-color);
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
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
}

.setting-item__content {
    padding-bottom: 24px;
    margin-bottom: 24px;
    border-bottom: 1px solid @BorderColor1;
}

.theme-color {
    position: relative;
    display: flex;

    > span {
        display: block;
        width: 80px;
        height: 32px;
        margin-right: @space12;
        border: 2px solid @BorderColor1;
    }

    input[type='color'] {
        position: absolute;
        bottom: 0;
        left: 0;
        visibility: hidden;
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
</style>
