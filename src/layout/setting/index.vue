<template>
    <div class="setting">
        <a-drawer :width="400" :placement="right" :visible="visible" :closable="false" class="setting-drawer">
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
                    <input type="color" ref="colorRef" :value="setting.themeColor" @change="colorChange" />
                    <a-input :value="setting.themeColor" @change="colorChange" placeholder="请输入颜色值" />
                </div>
            </div>
        </a-drawer>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue';
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
const colorChange = e => {
    const settingStore = useSettingStore();
    settingStore.setState('themeColor', e.srcElement.value);
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
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 12px;
}
.setting-item__content {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid @BorderColor1;
}
.theme-color {
    display: flex;
    position: relative;
    > span {
        display: block;
        width: 80px;
        height: 32px;
        border: 2px solid @BorderColor1;
        margin-right: @space12;
    }
    input[type='color'] {
        visibility: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
</style>
