<template>
    <div class="hot-search">
        <div class="common-header">
            <div class="common-header__title">线上热门搜索</div>
            <div class="common-header__operate">
                <CameraOutlined />
                <ShareAltOutlined />
                <EllipsisOutlined />
            </div>
        </div>
        <div class="hot-search__charts">
            <div class="charts-item">
                <div class="charts-item__title">
                    搜索用户数
                    <a-tooltip placement="top">
                        <template #title>
                            <span>搜索用户数</span>
                        </template>
                        <InfoCircleOutlined />
                    </a-tooltip>
                </div>
                <div class="charts-item__count">
                    <div>12,321</div>
                    <div>
                        <span>17.1</span>
                        <CaretUpOutlined :style="{ color: '#ef6266' }" />
                    </div>
                </div>
                <GupoCharts v-bind="searchCountOption" />
            </div>
            <div class="charts-item">
                <div class="charts-item__title">
                    人均搜索次数
                    <a-tooltip placement="top">
                        <template #title>
                            <span>人均搜索次数</span>
                        </template>
                        <InfoCircleOutlined />
                    </a-tooltip>
                </div>
                <div class="charts-item__count">
                    <div>2.7</div>
                    <div>
                        <span>26.2</span>
                        <CaretDownOutlined :style="{ color: '#5ec326' }" />
                    </div>
                </div>
                <GupoCharts v-bind="searchCountOption" />
            </div>
        </div>
        <a-table :columns="columns" :data-source="data" size="small" />
    </div>
</template>

<script setup>
import { ShareAltOutlined, EllipsisOutlined, CameraOutlined, InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import GupoCharts from '@src/components/GupoCharts/index.vue';

/**
 *
 */
const columns = [
    {
        title: '排名',
        dataIndex: '1',
        key: '1',
    },
    {
        title: '搜索关键词',
        dataIndex: '2',
        key: '2',
    },
    {
        title: '用户数',
        dataIndex: '3',
        key: '3',
        sorter: true,
    },
    {
        title: '周涨幅',
        dataIndex: '4',
        key: '4',
        sorter: true,
    },
];

const data = [
    {
        1: '1',
        2: '新款连衣裙',
        3: '2,234',
        4: '128%',
        5: true,
    },
    {
        1: '2',
        2: '四件套',
        3: '2,404',
        4: '3%',
        5: true,
    },
    {
        1: '3',
        2: '男士手包',
        3: '1,231',
        4: '58%',
        5: false,
    },
    {
        1: '4',
        2: '耳机',
        3: '1,021',
        4: '58%',
        5: false,
    },
    {
        1: '5',
        2: '短裤',
        3: '800',
        4: '58%',
        5: true,
    },
];

/**
 * computed
 */
const searchCountOption = computed(() => {
    return {
        height: 45,
        dataset: {
            dimensions: ['visits', '访问量'],
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
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                boundaryGap: false,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
            },
            yAxis: {
                splitLine: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
            },
            grid: {
                top: '5',
                bottom: '0',
                right: '5',
                left: '5',
            },
            series: [
                {
                    data: [12, 45, 23, 50, 60, 30, 20],
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    areaStyle: {
                        color: '#cfe1fe',
                    },
                },
            ],
        },
    };
});
</script>

<style lang="less" scoped>
.hot-search {
    &__charts {
        display: flex;
        margin-bottom: @space4;

        .charts-item {
            flex: 1;

            & + .charts-item {
                margin-left: @space4;
            }

            &__title {
                margin-bottom: @space2;
                color: #8e8e8e;

                :deep(.anticon) {
                    margin-left: @space2;
                }
            }

            &__count {
                display: flex;
                margin-bottom: @space2;
                font-size: 24px;
                align-items: center;

                > div:last-child {
                    margin-left: @space4;
                    font-size: 16px;

                    > span {
                        margin-right: @space2;
                    }
                }
            }
        }
    }

    :deep(.ant-pagination-item-active a) {
        background-color: unset;
    }

    :deep(.ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before) {
        display: none;
    }

    :deep(.ant-table-pagination.ant-pagination) {
        margin-bottom: 0;
    }
}
</style>
