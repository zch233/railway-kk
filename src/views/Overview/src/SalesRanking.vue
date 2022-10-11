<template>
    <div class="sales-ranking">
        <div class="common-header">
            <a-range-picker v-model:value="timeRange" />
        </div>
        <div class="sales-ranking__title">门店销售额排名</div>
        <div class="sales-ranking__content global-scrollbar">
            <div class="content-item" v-for="(item, i) in tableData" :key="i">
                <span>
                    <i>{{ ++i }}</i>
                    {{ item.label }}
                </span>
                <span>{{ item.value }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

/**
 * data
 */
const timeRange = ref([]);
const tableData = ref([
    {
        label: '工专路一号店',
        value: '323,234',
    },
    {
        label: '工专路二号店',
        value: '323,234',
    },
    {
        label: '工专路三号店',
        value: '323,234',
    },
    {
        label: '工专路四号店',
        value: '323,234',
    },
    {
        label: '工专路五号店',
        value: '323,234',
    },
    {
        label: '工专路六号店',
        value: '323,234',
    },
    {
        label: '工专路七号店',
        value: '323,234',
    },
]);
</script>

<style lang="less" scoped>
.sales-ranking {
    display: flex;
    flex-direction: column;
    height: 100%;

    .ant-picker-range {
        width: 100%;
    }

    &__title {
        margin-bottom: @space3;
        font-size: 15px;
        font-weight: bold;
    }

    &__content {
        height: 268px;
    }

    .content-item {
        display: flex;
        margin-bottom: @space4;
        line-height: 1.5;
        justify-content: space-between;

        > span i {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: @space3;
            line-height: 20px;
            text-align: center;
            background: #f0f2f5;
            border-radius: 50%;
        }

        &:nth-child(1) span i,
        &:nth-child(2) span i,
        &:nth-child(3) span i {
            color: #fff;
            background: #344658;
        }
    }
}
</style>
