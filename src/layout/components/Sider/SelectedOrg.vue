<template>
    <div class="slider-top" v-show="!collapsed">
        <Tooltip placement="right">
            <template #title> {{ title }} </template>
            <div class="company">
                <HomeFilled />
                <div class="company-name">{{ title }}</div>
            </div>
        </Tooltip>
        <Dropdown>
            <div class="change-company">切换机构 <SwapOutlined /></div>
            <template #overlay>
                <Menu @click="handleMenuClick">
                    <Menu.Item v-for="item in list" :key="item[valueKey]">
                        <span>{{ item[labelKey] }}</span>
                    </Menu.Item>
                </Menu>
            </template>
        </Dropdown>
    </div>
    <div class="home-icon">
        <HomeFilled v-show="collapsed" />
    </div>
</template>

<script setup>
/**  @description:机构切换  **/
import { Tooltip, Dropdown, Menu } from 'ant-design-vue';
import { HomeFilled, SwapOutlined } from '@ant-design/icons-vue';
import { find } from 'lodash';

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
});
const emit = defineEmits(['update:modelValue', 'onChange']);
const handleMenuClick = e => {
    emit('update:modelValue', e.key);
    emit('onChange', e);
};
const currentItem = computed(() => {
    return find(props.list, [props.valueKey, props.modelValue]);
});
const title = computed(() => {
    return currentItem.value[props.labelKey];
});
</script>

<style lang="less" scoped>
.slider-top {
    padding: @space2 20px 0;
    background-color: #fff;

    .company {
        display: flex;
        align-items: center;

        .company-name {
            margin-left: 10px;
            overflow: hidden;
            font-size: 17px;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        :deep(.anticon.anticon-home) {
            font-size: 18px;
        }
    }

    .change-company {
        display: flex;
        padding: 6px 0 0 30px;
        font-size: 13px;
        color: var(--color-master);
        cursor: pointer;
        align-items: center;

        & :deep(.anticon.anticon-swap) {
            margin-left: 6px;
            font-size: 14px;
        }
    }
}

.home-icon {
    padding: 0 31px;
    margin: 15px 0 13px;
}
</style>
