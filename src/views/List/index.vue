<script lang="jsx">
import { GupoButton, GupoTag } from '@src/components/UI';
import { useLocalStorage } from '@src/utils/storage';
import ModalImport from '@src/views/List/ModalImport.vue';
import ModalOrder from '@src/views/List/ModalOrder.vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import { useStoreApp } from '@src/store/modules/app';

const initFormData = () => ({
    time: dayjs().add(1, 'day').format('YYYY-MM-DD'),
});
export default defineComponent({
    name: 'List',
    setup() {
        const $globalTable = ref();
        const $modalImport = ref();
        const $modalOrder = ref();
        const appStore = useStoreApp();
        const filterOptions = reactive(initFormData());
        const itemConfigs = computed(() => [
            {
                key: 'time',
                type: 'datePicker',
                props: {
                    valueFormat: 'YYYY-MM-DD',
                    placeholder: '请选择日期',
                },
            },
            {
                key: '1',
                type: 'select',
                props: {
                    placeholder: '请选择办客站',
                    showSearch: true,
                    options: places.value.map(value => ({ label: value, value })),
                },
            },
            {
                key: '2',
                type: 'input',
                props: {
                    placeholder: '请输入车次',
                },
            },
            {
                key: '6',
                type: 'select',
                props: {
                    placeholder: '请选择线路',
                    showSearch: true,
                    options: ways.value.map(value => ({ label: value, value })),
                },
            },
            {
                key: 'status',
                type: 'select',
                props: {
                    placeholder: '请选择状态',
                    showSearch: true,
                    options: [
                        { value: '1', label: '正常' },
                        { value: '0', label: '停运' },
                    ],
                },
            },
        ]);
        const places = useLocalStorage('places', []);
        const ways = useLocalStorage('ways', []);
        const columns = useLocalStorage('columns', []);
        const dataSource = useLocalStorage('dataSource', { list: [], total: 0 });
        const filterDataSource = ref();
        const selectedRowKeys = ref([]);
        return () => (
            <div class='container'>
                <GlobalSearch
                    defaultFormData={initFormData()}
                    itemConfigs={itemConfigs.value}
                    onSearch={e => {
                        Object.assign(filterOptions, e);
                        const list = dataSource.value.list
                            .filter(v => (e[1] ? v[1] === e[1] : true)) // 筛选办客站
                            .filter(v => (e[6] ? v[6] === e[6] : true)) // 筛选线路
                            .filter(v => (e[2] ? v[2].includes(e[2]) : true)) // 筛选车次
                            .filter(v => (e['status'] ? e['status'] === v['status'] : true)); // 筛选状态
                        filterDataSource.value = {
                            list,
                            total: list.length,
                        };
                        $globalTable.value.refresh();
                    }}
                />
                <GlobalTable
                    rowKey='0'
                    rowSelection={{ selectedRowKeys: selectedRowKeys.value, onChange: e => (selectedRowKeys.value = e) }}
                    ref={$globalTable}
                    columns={columns.value.concat({
                        key: 'status',
                        title: '状态',
                        customRender: ({ record }) => {
                            let status = true;
                            appStore.orderList.map(v => {
                                if (v.list.includes(record[0])) {
                                    if (dayjs(filterOptions.time).isBetween(dayjs(v.time[0]).add(-1, 'day'), dayjs(v.time[1]).add(1, 'day'))) {
                                        status = v.type === '1';
                                    }
                                }
                            });
                            return status ? <GupoTag color='green'>正常</GupoTag> : <GupoTag color='red'>停运</GupoTag>;
                        },
                    })}
                    listApi={async () => ({ data: filterDataSource.value || dataSource.value })}
                    operationRender={() => (
                        <>
                            <GupoButton type='primary' onClick={() => $modalImport.value.showModal()}>
                                导入
                            </GupoButton>
                            <GupoButton type='primary'>重看当日统计</GupoButton>
                            <GupoButton
                                type='primary'
                                disabled={selectedRowKeys.value.length === 0}
                                onClick={() => $modalOrder.value.init({ list: selectedRowKeys.value })}
                            >
                                添加调令
                            </GupoButton>
                        </>
                    )}
                />
                <ModalImport
                    ref={$modalImport}
                    onSuccess={() => $globalTable.value.refresh()}
                    onUpdateColumns={e => (columns.value = e)}
                    onUpdateDataSource={e => (dataSource.value = e)}
                    onUpdatePlaces={e => (places.value = e)}
                    onUpdateWays={e => (ways.value = e)}
                />
                <ModalOrder
                    ref={$modalOrder}
                    onSuccess={() => {
                        $globalTable.value.refresh();
                        selectedRowKeys.value = [];
                    }}
                />
            </div>
        );
    },
});
</script>
