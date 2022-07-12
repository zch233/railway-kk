<template>
    <div class="notify-badge">
        <bell-outlined />
        <i>{{ count >= 99 ? 99 : count }}</i>
    </div>
</template>

<script setup>
import { BellOutlined } from '@ant-design/icons-vue';

defineProps({
    count: {
        type: Number,
        default: 99,
    },
});
</script>

<style lang="less" scoped>
.notify-badge {
    font-size: 24px;
    color: var(--ant-primary-color);
    position: relative;
    cursor: pointer;
    i {
        font-style: normal;
        font-size: 13px;
        display: inline-block;
        position: absolute;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        border-radius: 100%;
        right: -6px;
        top: -6px;
        color: #fff;
        background: var(--ant-error-color);
    }
}
</style>
