<script setup>
import { BellOutlined } from '@ant-design/icons-vue';

defineProps({
    count: {
        type: Number,
        default: 11,
    },
});
</script>

<template>
    <div class="notify-badge">
        <BellOutlined />
        <i v-if="count > 0">{{ count >= 99 ? 99 : count }}</i>
    </div>
</template>

<style lang="less" scoped>
.notify-badge {
    position: relative;
    font-size: 24px;
    color: var(--color-master);
    cursor: pointer;
    user-select: none;

    i {
        position: absolute;
        top: -6px;
        right: -6px;
        display: inline-block;
        width: 18px;
        height: 18px;
        font-size: 13px;
        font-style: normal;
        line-height: 18px;
        color: #fff;
        text-align: center;
        background: var(--color-error);
        border-radius: 100%;
    }
}
</style>
