<template>
    <div class="go-back">
        <GupoGoBack title="加入到 Layout 中的" appendToLayout />
        <GupoGoBack title="默认情况" />
        <GupoGoBack :showGoBack="false">
            <div :style="{ fontSize: '18px', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
                自定义内容
                <a-range-picker v-model:value="timeRange" />
            </div>
        </GupoGoBack>
        <GupoGoBack title="自定义返回事件" :goBack="handleGoBack" />
    </div>
</template>

<script setup>
import GupoGoBack from '@src/components/GupoGoBack/index.vue';

const timeRange = ref([]);

const handleGoBack = () => {
    alert('触发自定义返回事件');
};
</script>

<style lang="less" scoped>
.gupo-go-back {
    margin-bottom: @space6;
}
</style>
