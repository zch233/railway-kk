<script lang="jsx">
import { GupoButton, GupoTag, gupoMessage } from '@src/components/UI';
import { useLocalStorage } from '@src/utils/storage';
import ModalImport from '@src/views/List/ModalImport.vue';
import ModalOrder from '@src/views/List/ModalOrder.vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);
import ModalExport from '@src/views/List/ModalExport.vue';
import { getStatus, beginCars } from '@src/views/List/utils';
import GlobalIcon from '@src/components/GlobalIcon';

const initFormData = () => ({
    time: dayjs().add(1, 'day').format('YYYY-MM-DD'),
});

export default defineComponent({
    name: 'List',
    setup() {
        const $globalTable = ref();
        const $modalImport = ref();
        const $modalOrder = ref();
        const $modalExport = ref();
        const filterOptions = reactive(initFormData());
        const itemConfigs = computed(() => [
            {
                key: 'time',
                type: 'datePicker',
                props: {
                    valueFormat: 'YYYY-MM-DD',
                    placeholder: '请选择日期',
                    allowClear: false,
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
                    placeholder: '请选择站台',
                    showSearch: true,
                    options: platforms.value.map(value => ({ label: value, value })),
                },
            },
            {
                key: '7',
                type: 'select',
                props: {
                    placeholder: '请选择线路',
                    showSearch: true,
                    options: ways.value.map(value => ({ label: value, value })),
                },
            },
            {
                key: 'custom_status',
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
            {
                key: 'custom_begin',
                type: 'select',
                props: {
                    placeholder: '请选择是否始发车',
                    showSearch: true,
                    options: [
                        { value: '1', label: '是' },
                        { value: '0', label: '否' },
                    ],
                },
            },
        ]);
        const places = useLocalStorage('places', []);
        const platforms = useLocalStorage('platforms', []);
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
                        let list = dataSource.value.list;
                        // 筛选办客站
                        if (e[1]) {
                            list = list.filter(v => v[1] === e[1]);
                        }
                        // 筛选线路
                        if (e[7]) {
                            list = list.filter(v => v[7] === e[7]);
                        }
                        // 筛选站台
                        if (e[6]) {
                            list = list.filter(v => v[6] === e[6]);
                        }
                        // 筛选车次
                        if (e[2]) {
                            list = list.filter(v => v[2].includes(e[2]));
                        }
                        // 筛选状态
                        if (e['custom_status']) {
                            list = list.filter(v => getStatus(v, e.time) === (e['custom_status'] === '1'));
                        }
                        // 筛选始发车
                        if (e['custom_begin']) {
                            list = list.filter(v =>
                                e['custom_begin'] === '1' ? beginCars.includes(v[3].split('-')[0]) : !beginCars.includes(v[3].split('-')[0])
                            );
                        }
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
                    onSelectedCancel={() => (selectedRowKeys.value = [])}
                    ref={$globalTable}
                    columns={columns.value.concat([
                        {
                            key: 'custom_status',
                            title: '状态',
                            customRender: ({ record }) => {
                                return getStatus(record, filterOptions.time) ? <GupoTag color='green'>正常</GupoTag> : <GupoTag color='red'>停运</GupoTag>;
                            },
                        },
                        {
                            key: 'custom_begin',
                            title: '始发车',
                            customRender: ({ record }) => {
                                return beginCars.includes(record[3].split('-')[0]) ? <GlobalIcon style='font-size: 20px;color:#389e0d;' name='begin' /> : '-';
                            },
                        },
                    ])}
                    listApi={async () => ({ data: filterDataSource.value || dataSource.value })}
                    operationRender={() => (
                        <>
                            <GupoButton type='primary' onClick={() => $modalImport.value.showModal()}>
                                导入
                            </GupoButton>
                            <GupoButton
                                type='primary'
                                onClick={() => {
                                    const data = filterDataSource.value || dataSource.value;
                                    if (data.list.length === 0) {
                                        gupoMessage.error('无效数据');
                                        return;
                                    }
                                    $modalExport.value.showModal({
                                        data,
                                        filterOptions,
                                    });
                                }}
                            >
                                查看当日统计
                            </GupoButton>
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
                    onUpdatePlatforms={e => (platforms.value = e)}
                    onUpdateWays={e => (ways.value = e)}
                />
                <ModalOrder
                    ref={$modalOrder}
                    onSuccess={() => {
                        $globalTable.value.refresh();
                        selectedRowKeys.value = [];
                    }}
                />
                <ModalExport ref={$modalExport} />
            </div>
        );
    },
});
</script>
