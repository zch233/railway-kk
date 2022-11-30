<template>
    <div class="category-proportion">
        <div class="common-header">
            <div class="common-header__title">销售额类别占比</div>
            <div class="common-header__operate">
                <a-radio-group v-model:value="radioActive">
                    <a-radio-button :value="1">全部渠道</a-radio-button>
                    <a-radio-button :value="2">线上</a-radio-button>
                    <a-radio-button :value="3">门店</a-radio-button>
                </a-radio-group>
                <EllipsisOutlined />
            </div>
        </div>
        <GupoCharts v-bind="categoryProportionOption" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import GupoCharts from '@src/components/GupoCharts/index.vue';

/**
 * data
 */
const radioActive = ref(1);

/**
 * computed
 */
const categoryProportionOption = computed(() => {
    const sourceData = [
        { value: 4544, name: '家用电器' },
        { value: 3321, name: '食用酒水' },
        { value: 3113, name: '个护健康' },
        { value: 2341, name: '服饰箱包' },
        { value: 1231, name: '母婴产品' },
        { value: 1231, name: '其他' },
    ];
    const sourceTotal = sourceData.reduce((res, { value }) => {
        res += value;
        return res;
    }, 0);
    const sourceMap = sourceData.reduce((res, { name, value }) => {
        res[name] = {
            name,
            value: '¥' + value,
            percentage: ((value / sourceTotal) * 100).toFixed(2) + '%',
        };
        return res;
    }, {});
    return {
        width: 'calc(100% -10px)',
        height: 410,
        title: '销售额',
        option: {
            tooltip: {
                trigger: 'item',
            },
            title: {
                textStyle: {
                    fontSize: 15,
                },
            },
            legend: {
                top: 120,
                right: 30,
                type: 'scroll',
                orient: 'vertical',
                pageIconSize: 8,
                itemGap: 15,
                icon: 'circle',
                formatter: name => {
                    return `{a|${name}}{b||}{c|${sourceMap?.[name]?.['percentage']}}{d|${sourceMap?.[name]?.['value']}}`;
                },
                textStyle: {
                    rich: {
                        a: {
                            fontSize: 15,
                            color: '#5e5e5e',
                            width: 60,
                        },
                        b: {
                            fontSize: 15,
                            color: '#dadada',
                            width: 20,
                            align: 'center',
                        },
                        c: {
                            fontSize: 15,
                            color: '#a4a4a4',
                            width: 50,
                        },
                        d: {
                            fontSize: 15,
                            color: '#5e5e5e',
                            width: 60,
                            align: 'right',
                        },
                    },
                },
            },
            series: [
                {
                    type: 'pie',
                    center: ['30%', '50%'],
                    radius: ['60%', '80%'],
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{a|销售额}\n{b|¥ 123,224}',
                        rich: {
                            a: {
                                fontSize: 16,
                                color: '#8c8c8c',
                                padding: [0, 0, 15, 0],
                            },
                            b: {
                                fontSize: 30,
                            },
                        },
                    },
                    itemStyle: {
                        borderWidth: 4,
                        borderColor: '#fff',
                    },
                    data: [
                        { value: 4544, name: '家用电器' },
                        { value: 3321, name: '食用酒水' },
                        { value: 3113, name: '个护健康' },
                        { value: 2341, name: '服饰箱包' },
                        { value: 1231, name: '母婴产品' },
                        { value: 1231, name: '其他' },
                    ],
                },
            ],
        },
    };
});
</script>

<style lang="less" scoped></style>
