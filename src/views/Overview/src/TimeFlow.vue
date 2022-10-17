<template>
    <div class="time-flow">
        <GupoCharts v-bind="timeFlowOption" />
    </div>
</template>

<script setup>
import GupoCharts from '@src/components/GupoCharts/index.vue';

const timeFlowOption = computed(() => {
    return {
        height: 400,
        option: {
            xAxis: {
                data: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
            },
            series: [
                {
                    name: '客流量',
                    type: 'line',
                    data: new Array(10).fill(0).map(() => parseInt(Math.random() * 100)),
                },
                {
                    name: '支付笔数',
                    type: 'line',
                    data: new Array(10).fill(0).map(() => parseInt(Math.random() * 100)),
                },
            ],
        },
    };
});
</script>

<style lang="less" scoped></style>
