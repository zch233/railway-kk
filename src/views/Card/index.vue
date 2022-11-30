<template>
    <div class="card container">
        <GlobalCard title="默认卡片">
            <div>默认内容</div>
        </GlobalCard>
        <GlobalCard title="自定义右侧内容">
            <template #extra>
                <a-button type="primary">操作</a-button>
            </template>
            <div>默认内容</div>
        </GlobalCard>
    </div>
</template>

<script setup>
import GlobalCard from '@src/components/GlobalCard/index.vue';
</script>

<style lang="less" scoped>
.card {
    .gupo-card + .gupo-card {
        margin-top: calc(var(--base-space) * 4);
    }
}
</style>
