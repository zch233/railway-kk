<template>
    <div class="full-screen" @click="handleClick">
        <fullscreen-exit-outlined v-if="isFullScreen" />
        <fullscreen-outlined v-else />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { message } from 'ant-design-vue';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
import screenfull from 'screenfull';

/**
 * data
 */
const isFullScreen = ref(false);

/**
 * method
 */
const handleClick = () => {
    if (!screenfull.isEnabled) {
        return message.error('您的浏览器不支持全屏');
    }
    screenfull.toggle();
};
const handleChange = () => {
    isFullScreen.value = screenfull.isFullscreen;
};

onMounted(() => {
    if (!screenfull.isEnabled) return;
    screenfull.on('change', handleChange);
});

onBeforeUnmount(() => {
    if (!screenfull.isEnabled) return;
    screenfull.off('change', handleChange);
});
</script>

<style lang="less" scoped>
.full-screen {
    font-size: 24px;
    color: var(--ant-primary-color);
    cursor: pointer;
}
</style>
