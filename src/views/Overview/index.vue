<template>
    <div class="overview container">
        <a-row>
            <a-col :span="6" class="container-background statistics">
                <div class="statistics-title">
                    <div>总销售额</div>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>总销售额</span>
                        </template>
                        <InfoCircleOutlined />
                    </a-tooltip>
                </div>
                <div class="statistics-number">¥126,560</div>
                <div class="statistics-diff">
                    <div>
                        <span>周同比</span>
                        <span>12%</span>
                        <CaretUpOutlined :style="{ color: '#ef6266' }" />
                    </div>
                    <div>
                        <span>日环比</span>
                        <span>11%</span>
                        <CaretDownOutlined :style="{ color: '#5ec326' }" />
                    </div>
                </div>
                <div class="statistics-bottom common">
                    <span>日均销售额</span>
                    <span>¥ 12,423</span>
                </div>
            </a-col>
            <a-col :span="6" class="container-background statistics">
                <div class="statistics-title">
                    <div>访问量</div>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>访问量</span>
                        </template>
                        <InfoCircleOutlined />
                    </a-tooltip>
                </div>
                <div class="statistics-number">8,846</div>
                <GupoCharts v-bind="visitsOption" />
                <div class="statistics-bottom common">
                    <span>日访问量</span>
                    <span>1,234</span>
                </div>
            </a-col>
            <a-col :span="6" class="container-background statistics">
                <div class="statistics-title">
                    <div>支付笔数</div>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>支付笔数</span>
                        </template>
                        <InfoCircleOutlined />
                    </a-tooltip>
                </div>
                <div class="statistics-number">6,560</div>
                <GupoCharts v-bind="payCountOption" />
                <div class="statistics-bottom common">
                    <span>转化率</span>
                    <span>60%</span>
                </div>
            </a-col>
            <a-col :span="6" class="container-background statistics">
                <div class="statistics-title">
                    <div>线上购物转化率</div>
                    <a-tooltip placement="top">
                        <template #title>
                            <span>线上购物转化率</span>
                        </template>
                        <InfoCircleOutlined />
                    </a-tooltip>
                </div>
                <div class="statistics-number">78%</div>
                <div class="statistics-progress">
                    <a-progress :percent="78" strokeColor="#44d8aa" :strokeWidth="10" />
                </div>
                <div class="statistics-bottom">
                    <div class="statistics-diff">
                        <div>
                            <span>周同比</span>
                            <span>12.3%</span>
                            <CaretUpOutlined :style="{ color: '#ef6266' }" />
                        </div>
                        <div>
                            <span>日环比</span>
                            <span>11%</span>
                            <CaretDownOutlined :style="{ color: '#5ec326' }" />
                        </div>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="18" class="container-background">
                <SalesVolume />
            </a-col>
            <a-col :span="6" class="container-background">
                <SalesRanking />
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="12" class="container-background">
                <HotSearch />
            </a-col>
            <a-col :span="12" class="container-background">
                <CategoryProportion />
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="24" class="container-background">
                <TimeFlow />
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { InfoCircleOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';
import SalesVolume from './src/SalesVolume.vue';
import SalesRanking from './src/SalesRanking.vue';
import HotSearch from './src/HotSearch.vue';
import CategoryProportion from './src/CategoryProportion.vue';
import TimeFlow from './src/TimeFlow.vue';
import GupoCharts from '@src/components/GupoCharts/index.vue';

/**
 * computed
 */
const visitsOption = computed(() => {
    return {
        height: '45',
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
        colors: ['#aa32f1'],
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
                data: ['10.01', '10.02', '10.03', '10.04', '10.05', '10.06', '10.07', '10.08', '10.09', '10.10', '10.11', '10.12', '10.12', '10.14', '10.15'],
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
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
            },
            series: [
                {
                    data: [82, 93, 90, 94, 190, 130, 130, 23, 132, 56, 94, 120, 130, 120, 33],
                    type: 'line',
                    showSymbol: false,
                    areaStyle: {
                        color: '#aa32f1',
                    },
                    lineStyle: {
                        opacity: 0,
                    },
                },
            ],
        },
    };
});
const payCountOption = computed(() => {
    return {
        height: '45',
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
                data: ['10.01', '10.02', '10.03', '10.04', '10.05', '10.06', '10.07', '10.08', '10.09', '10.10', '10.11', '10.12', '10.12', '10.14', '10.15'],
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
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
            },
            series: [
                {
                    data: [82, 93, 90, 94, 190, 130, 130, 123, 132, 56, 94, 120, 130, 120, 33],
                    type: 'bar',
                    barWidth: '60%',
                    areaStyle: {
                        color: '#aa32f1',
                    },
                    lineStyle: {
                        opacity: 0,
                    },
                },
            ],
        },
    };
});
</script>

<style lang="less">
.overview {
    .ant-row {
        flex-wrap: nowrap;

        & + .ant-row {
            margin-top: @space4;
        }
    }

    .ant-col {
        padding: @space4;

        & + .ant-col {
            flex: 1;
            margin-left: @space4;
        }
    }

    .common-header {
        display: flex;
        padding-bottom: @space3;
        margin-bottom: @space3;
        line-height: 32px;
        border-bottom: 1px solid #f0f0f0;
        justify-content: space-between;
        align-items: center;

        &__title {
            font-size: 15px;
            font-weight: bold;
        }

        &__operate {
            display: flex;
            align-items: center;

            .anticon {
                font-size: 15px;
                cursor: pointer;

                & + .anticon {
                    margin-left: @space4;
                }
            }

            .ant-radio-group {
                margin-right: @space4;
            }
        }
    }

    .statistics {
        > div:nth-child(3) {
            height: 45px;
        }

        &-title {
            display: flex;
            margin-bottom: @space2;
            color: #8c8c8c;
            align-items: center;
            justify-content: space-between;
        }

        &-number {
            margin-bottom: @space3;
            font-size: 30px;
            line-height: 1;
        }

        &-diff {
            display: flex;
            align-items: center;
            justify-content: space-between;

            > div > span {
                margin-right: @space2;

                &:first-child {
                    color: #666;
                }
            }
        }

        &-bottom {
            width: 100%;
            padding-top: @space2;
            margin-top: @space4;
            border-top: 1px solid #f0f0f0;

            &.common > span:first-child {
                margin-right: @space2;
                color: #666;
            }
        }

        &-progress {
            display: flex;
            align-items: center;

            .ant-progress {
                .ant-progress-outer {
                    padding: 0;
                    margin: 0;
                }

                .ant-progress-bg {
                    position: relative;
                    border-radius: 0;

                    &::before,
                    &::after {
                        position: absolute;
                        top: -7px;
                        right: -2px;
                        width: 2px;
                        height: 6px;
                        background: #44d8aa;
                        border-radius: 2px;
                        content: '';
                    }

                    &::after {
                        top: auto;
                        bottom: -7px;
                    }
                }

                .ant-progress-inner {
                    overflow: unset;
                    border-radius: 0;
                }

                .ant-progress-text {
                    display: none;
                }
            }
        }
    }
}
</style>
