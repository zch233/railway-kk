<template>
    <div class="gupo-card">
        <div class="gupo-card__title">
            <div class="title">{{ title }}</div>
            <slot name="extra"></slot>
        </div>
        <div class="gupo-card__content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: '',
    },
});
</script>

<style lang="less" scoped>
.gupo-card {
    background: #fff;

    &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: @space4 @space6;
        border-bottom: 1px solid var(--border-color);

        .title {
            display: flex;
            font-size: 16px;
            font-weight: bold;
            line-height: 1;
            align-items: center;

            &::before {
                display: inline-block;
                width: 2px;
                height: 16px;
                margin-right: @space2;
                background: var(--ant-primary-color);
                content: '';
            }
        }
    }

    &__content {
        padding: @space6;
    }
}
</style>
