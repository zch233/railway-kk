<template>
    <div class="sales-volume">
        <GupoTabSelector v-model="rangeValue" :options="rangeList" />
        <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane :key="1" tab="销售额">
                <GupoCharts v-bind="salesChartOption" :key="activeKey" />
            </a-tab-pane>
            <a-tab-pane :key="2" tab="访问量">
                <GupoCharts v-bind="salesChartOption" :key="activeKey" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import GupoCharts from '@src/components/GupoCharts/index.vue';
import GupoTabSelector from '@src/components/GupoTabSelector/index.vue';

/**
 * data
 */
const activeKey = ref(1);
const rangeValue = ref(1);
const rangeList = ref([
    {
        label: '今日',
        value: 1,
    },
    {
        label: '本周',
        value: 2,
    },
    {
        label: '本月',
        value: 3,
    },
    {
        label: '全年',
        value: 3,
    },
]);

/**
 * computed
 */
const salesChartOption = computed(() => {
    return {
        height: '300',
        title: activeKey.value === 1 ? '销售额趋势' : '访问量趋势',
        dataset: {
            dimensions: ['salesVolume', activeKey.value === 1 ? '销售量' : '访问量'],
            source: [
                ['1月', 101],
                ['2月', 28],
                ['3月', 100],
                ['4月', 51],
                ['5月', 68],
                ['6月', 150],
                ['7月', 100],
                ['8月', 70],
                ['9月', 50],
                ['10月', 66],
                ['11月', 150],
                ['12月', 190],
            ],
        },
        option: {
            legend: {
                show: false,
            },
            title: {
                textStyle: {
                    fontSize: 15,
                },
            },
            xAxis: {
                axisLabel: {
                    margin: 12,
                    fontSize: 14,
                },
            },
            yAxis: {
                axisLabel: {
                    fontSize: 14,
                },
            },
            series: [{ type: 'bar', barWidth: '30%' }],
        },
    };
});
</script>

<style lang="less" scoped>
.sales-volume {
    position: relative;

    :deep(.ant-tabs) {
        .ant-tabs-tab {
            padding: 0 0 13px;
            line-height: 32px;
        }

        .ant-tabs-tab-btn {
            font-size: 15px;
        }
    }

    .gupo-tab-selector {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 99;
    }
}
</style>
