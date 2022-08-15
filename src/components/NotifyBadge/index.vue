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
    position: relative;
    font-size: 24px;
    color: var(--ant-primary-color);
    cursor: pointer;

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
        background: var(--ant-error-color);
        border-radius: 100%;
    }
}
</style>
