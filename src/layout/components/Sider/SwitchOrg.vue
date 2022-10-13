<script setup>
import { HomeFilled, SwapOutlined } from '@ant-design/icons-vue';

const props = defineProps({
    modelValue: {
        required: true,
    },
    collapsed: {
        type: Boolean,
        default: true,
    },
    list: {
        type: Array,
        default: () => [],
    },
    labelKey: {
        type: String,
        default: 'name',
    },
    valueKey: {
        type: String,
        default: 'value',
    },
    theme: {
        type: String,
        default: 'light',
    },
});
const emit = defineEmits(['update:modelValue', 'onChange']);

const handleMenuClick = e => {
    emit('update:modelValue', e.key);
    emit('onChange', e);
};
const title = computed(() => {
    return currentItem.value[props.labelKey];
});
const currentItem = computed(() => {
    return props.list.find(v => v[props.valueKey] === props.modelValue);
});
</script>

<template>
    <div class="switch-org" :class="{ 'is-dark': theme === 'dark' }">
        <ATooltip placement="right">
            <template #title>{{ title }}</template>
            <div class="switch-org__name">
                <HomeFilled />
                <div>{{ title }}</div>
            </div>
        </ATooltip>
        <ADropdown>
            <div class="switch-org__change">
                切换机构
                <SwapOutlined />
            </div>
            <template #overlay>
                <AMenu @click="handleMenuClick" :theme="theme">
                    <AMenuItem v-for="item in list" :key="item[valueKey]" :disabled="item[valueKey] === props.modelValue">
                        <span>{{ item[labelKey] }}</span>
                    </AMenuItem>
                </AMenu>
            </template>
        </ADropdown>
    </div>
</template>

<style lang="less" scoped>
.switch-org {
    padding: 0 18px 10px;
    overflow: hidden;
    transition: all 0.3s ease;

    &.is-dark {
        .switch-org__name {
            color: #fff;
        }
    }

    &__name {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        transition: color 0.3s ease;

        > div {
            margin-left: 10px;
            overflow: hidden;
            font-size: 17px;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: opacity 0.3s ease;
        }

        :deep(.anticon.anticon-home) {
            font-size: 18px !important;
        }
    }

    &__change {
        display: flex;
        padding-left: 28px;
        overflow: hidden;
        font-size: 13px;
        color: var(--color-master);
        white-space: nowrap;
        cursor: pointer;
        transition: opacity 0.3s ease;
        align-items: center;

        :deep(.anticon.anticon-swap) {
            margin-left: 6px;
            font-size: 14px !important;
        }
    }
}

.ant-layout-sider-collapsed .switch-org {
    height: 52px;
    padding: 0 calc(50% - 9px) !important;
    line-height: 52px;

    &__name > div,
    &__change {
        text-align: center;
        opacity: 0;
    }
}
</style>
