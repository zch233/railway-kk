<script setup name="FullScreen">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
import screenfull from 'screenfull';
import { gupoMessage } from '@src/components/UI';

const isFullScreen = ref(false);

const handleClick = () => {
    if (!screenfull.isEnabled) {
        return gupoMessage.error('您的浏览器不支持全屏');
    }
    screenfull.toggle();
};
const handleChange = () => {
    isFullScreen.value = screenfull.isFullscreen;
};

onMounted(() => {
    if (screenfull.isEnabled) {
        screenfull.on('change', handleChange);
    }
});

onBeforeUnmount(() => {
    if (screenfull.isEnabled) {
        screenfull.off('change', handleChange);
    }
});
</script>

<template>
    <div class="full-screen" @click="handleClick">
        <FullscreenExitOutlined v-if="isFullScreen" />
        <FullscreenOutlined v-else />
    </div>
</template>

<style lang="less" scoped>
.full-screen {
    font-size: 24px;
    color: var(--color-master);
    cursor: pointer;
}
</style>
