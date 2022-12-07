<script lang="jsx">
import { gupoMessage, GupoModal, GupoButton } from '@src/components/UI';
import GupoCharts from '@src/components/GupoCharts/index.vue';
import { workbook2blob } from '@src/views/OrderList/utils';
import { getStatus, timeSlot } from '@src/views/List/utils';
import GlobalFormItem from '@src/components/GlobalForm/Item.vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export default defineComponent({
    name: 'ModalExport',
    expose: ['showModal'],
    setup() {
        const modal = reactive({
            visible: false,
            loading: false,
        });
        const formData = ref({ timeStep: 60 });
        const params = ref({});
        const chartDataOption = ref({});
        const setChartDataOption = () => {
            const dataMap = {
                normal: {},
                abnormal: {},
            };
            const dateArr = timeSlot(formData.value.timeStep).slice(1).concat('24:00');
            params.value.data?.list.map(v => {
                for (let i = 0; i < dateArr.length; i++) {
                    const section = [dateArr[i - 1] || '00:00', dateArr[i]];
                    dataMap.normal[section.join('-')] = dataMap.normal[section.join('-')] || 0;
                    dataMap.abnormal[section.join('-')] = dataMap.abnormal[section.join('-')] || 0;
                    if (
                        dayjs(`${params.value.day} ${v[4] === '=' ? v[5] : v[4]}`).isBetween(
                            dayjs(`${params.value.day} ${section[0]}`).add(-1, 'second'),
                            dayjs(`${params.value.day} ${section[1]}`)
                        )
                    ) {
                        dataMap[getStatus(v, params.value.day) ? 'normal' : 'abnormal'][section.join('-')] += 1;
                    }
                }
            });
            return {
                height: 450,
                colors: ['#91cc75', '#ee6666'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // Use axis to trigger tooltip
                        type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                },
                option: {
                    legend: {},
                    xAxis: {
                        type: 'category',
                        data: dateArr,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                    },
                    series: [
                        {
                            name: '正常',
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: true,
                                formatter: val => (val.value === 0 ? '' : val.value),
                            },
                            emphasis: {
                                focus: 'series',
                            },
                            data: Object.values(dataMap.normal),
                        },
                        {
                            name: '停运',
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: true,
                                formatter: val => (val.value === 0 ? '' : val.value),
                            },
                            emphasis: {
                                focus: 'series',
                            },
                            data: Object.values(dataMap.abnormal),
                        },
                    ],
                },
            };
        };
        const showModal = data => {
            modal.visible = true;
            params.value = data;
            chartDataOption.value = setChartDataOption();
        };
        const Modal = () => (
            <GupoModal
                width='1800px'
                visible={modal.visible}
                onUpdate:value={e => (modal.visible = e)}
                onOk={() => (modal.visible = false)}
                onCancel={() => (modal.visible = false)}
                confirmLoading={modal.loading}
                title={`今日统计(${params.value.day})`}
            >
                <GlobalFormItem
                    labelCol={{ span: 0 }}
                    formData={formData.value}
                    onUpdate:formData={e => (formData.value = e)}
                    item={{
                        key: 'timeStep',
                        label: '间隔时长',
                        type: 'select',
                        props: {
                            options: [15, 30, 60, 120, 180].map(value => ({ label: `${value}分钟`, value })),
                        },
                    }}
                />
                <GupoCharts {...chartDataOption.value} />
                <GupoButton
                    type='primary'
                    onClick={() => {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(workbook2blob(params.value.dom));
                        link.download = `车次表(${params.value.day})${dayjs().format('YYYY-MM-DD HH-mm-ss')}.xlsx`;
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        gupoMessage.success('导出成功');
                    }}
                >
                    导出
                </GupoButton>
            </GupoModal>
        );
        return {
            Modal,
            showModal,
        };
    },
    render() {
        return this.Modal();
    },
});
</script>
