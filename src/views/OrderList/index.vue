<script lang="jsx">
import { useStoreApp } from '@src/store/modules/app';
import { GupoTag, GupoModal, gupoMessage, GupoButton } from '@src/components/UI';
import ModalOrder from '@src/views/List/ModalOrder.vue';
import dayjs from 'dayjs';
import { workbook2blob } from '@src/views/OrderList/utils';

export default defineComponent({
    name: 'OrderList',
    setup() {
        const $modalOrder = ref();
        const $globalTable = ref();
        const appStore = useStoreApp();
        const filterData = ref({});
        const filterList = computed(() => {
            const list = appStore.orderList
                .filter(v => (filterData.value.type ? v.type === filterData.value.type : true))
                .filter(v => (filterData.value.day ? dayjs(v.day).format('YYYY-MM-DD') === filterData.value.day : true))
                .reverse();
            return {
                list,
                total: list.length,
            };
        });
        const itemConfigs = computed(() => [
            {
                key: 'day',
                type: 'datePicker',
                props: {
                    valueFormat: 'YYYY-MM-DD',
                    placeholder: '请选择操作日期',
                },
            },
            {
                key: 'type',
                type: 'select',
                props: {
                    placeholder: '请选择类型',
                    showSearch: true,
                    options: [
                        { value: '1', label: '恢复' },
                        { value: '0', label: '停运' },
                    ],
                },
            },
        ]);
        return () => (
            <div class='container'>
                <GlobalSearch
                    itemConfigs={itemConfigs.value}
                    onSearch={e => {
                        filterData.value = e;
                        $globalTable.value.refresh();
                    }}
                />
                <GlobalTable
                    ref={$globalTable}
                    tableTitle='调令记录'
                    columns={[
                        { key: 'day', title: '操作日期', customRender: ({ text }) => dayjs(text).format('YYYY-MM-DD') },
                        {
                            key: 'type',
                            title: '类型',
                            customRender: ({ text }) => (text === '1' ? <GupoTag color='green'>恢复</GupoTag> : <GupoTag color='red'>停运</GupoTag>),
                        },
                        { key: 'time', title: '生效日期', customRender: ({ text }) => text.join(' 至 ') },
                        { key: 'list', title: '车次', customRender: ({ text }) => text.join(',') },
                        {
                            key: 'options',
                            title: '操作',
                            customRender: ({ record }) => (
                                <div class='operate'>
                                    <span class='pointer' onClick={() => $modalOrder.value.init(record)}>
                                        编辑
                                    </span>
                                    <span
                                        class='pointer error'
                                        onClick={() => {
                                            GupoModal.confirm({
                                                title: '提示',
                                                content: '确认要删除吗？',
                                                onOk: () => {
                                                    appStore.setOrderList(appStore.orderList.filter(v => v.day !== record.day));
                                                    $globalTable.value.refresh();
                                                    gupoMessage.success('删除成功');
                                                },
                                            });
                                        }}
                                    >
                                        删除
                                    </span>
                                </div>
                            ),
                        },
                    ]}
                    operationRender={() => (
                        <>
                            <GupoButton
                                type='primary'
                                danger
                                onClick={() => {
                                    GupoModal.confirm({
                                        title: '提示',
                                        content: '确认要删除吗？',
                                        onOk: () => {
                                            appStore.setOrderList([]);
                                            $globalTable.value.refresh();
                                            gupoMessage.success('清空成功');
                                        },
                                    });
                                }}
                            >
                                清空
                            </GupoButton>
                            <GupoButton
                                type='primary'
                                onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = URL.createObjectURL(workbook2blob(document.querySelector('.ant-table-content > table')));
                                    link.download = `调令记录${dayjs().format('YYYY-MM-DD HH-mm-ss')}.xlsx`;
                                    document.body.appendChild(link);
                                    link.click();
                                    link.remove();
                                    gupoMessage.success('导出成功');
                                }}
                            >
                                导出
                            </GupoButton>
                        </>
                    )}
                    listApi={async () => ({ data: filterList.value })}
                />
                <ModalOrder
                    ref={$modalOrder}
                    onSuccess={() => {
                        $globalTable.value.refresh();
                    }}
                />
            </div>
        );
    },
});
</script>
