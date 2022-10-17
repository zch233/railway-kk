<template>
    <div class="card container">
        <GupoCard title="默认卡片">
            <div>默认内容</div>
        </GupoCard>
        <GupoCard title="自定义右侧内容">
            <template #extra>
                <a-button type="primary">操作</a-button>
            </template>
            <div>默认内容</div>
        </GupoCard>
    </div>
</template>

<script setup>
import GupoCard from '@src/components/GupoCard/index.vue';
</script>

<style lang="less" scoped>
.card {
    .gupo-card + .gupo-card {
        margin-top: @space4;
    }
}
</style>
