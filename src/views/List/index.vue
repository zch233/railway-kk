<script lang="jsx">
import GlobalTable from '@src/components/GlobalTable/index.vue';
import * as XLSX from 'xlsx';
import { GupoButton, gupoMessage, GupoModal, GupoTag } from '@src/components/UI';
import { InboxOutlined } from '@ant-design/icons-vue';
import GlobalFormItem from '@src/components/GlobalForm/Item.vue';
import dayjs from 'dayjs';
import { useLocalStorage } from '@src/utils/storage';

export default defineComponent({
    name: 'List',
    setup() {
        const places = useLocalStorage('places', []);
        const ways = useLocalStorage('ways', []);
        const columns = useLocalStorage('columns', []);
        const dataSource = useLocalStorage('dataSource', {
            list: [],
            paginate: { total: 0 },
        });
        const filterDataSource = ref();
        const modal = reactive({
            visible: false,
            loading: false,
        });
        const formData = reactive({
            file: [],
        });
        const handelOk = () => {
            const file = formData.file[0];
            const reader = new FileReader();
            reader.onload = e => {
                const bytes = new Uint8Array(e.target.result);
                const wb = XLSX.read(bytes, { cellDates: true });
                const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, range: 1 });
                columns.value = data[0].map((title, key) => ({ key, title }));
                dataSource.value.list = data.slice(1).map(arr => {
                    const item = arr.reduce((res, cur, index) => {
                        res[index] = typeof cur === 'object' ? dayjs(cur).format('HH:mm') : cur;
                        return res;
                    }, {});
                    item.status = true;
                    return item;
                });
                dataSource.value.paginate.total = dataSource.value.list.length;
                places.value = [...new Set(dataSource.value.list.map(v => v[1]))];
                ways.value = [...new Set(dataSource.value.list.map(v => v[6]))];
                $globalTable.value.refresh();
                modal.visible = false;
                gupoMessage.success('导入成功');
            };
            reader.readAsArrayBuffer(file);
        };
        const $globalTable = ref();
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
                key: '6',
                type: 'select',
                props: {
                    placeholder: '请选择线路',
                    showSearch: true,
                    options: ways.value.map(value => ({ label: value, value })),
                },
            },
        ]);
        return () => (
            <div class='container'>
                <GlobalSearch
                    itemConfigs={itemConfigs.value}
                    onSearch={e => {
                        const list = dataSource.value.list.filter(v => (e[1] ? v[1] === e[1] : true)).filter(v => (e[6] ? v[6] === e[6] : true));
                        filterDataSource.value = {
                            list,
                            total: list.length,
                        };
                        $globalTable.value.refresh();
                    }}
                />
                <GlobalTable
                    ref={$globalTable}
                    columns={columns.value.concat({
                        key: 'status',
                        title: '状态',
                        customRender: ({ text }) => (text ? <GupoTag color='green'>正常</GupoTag> : <GupoTag color='red'>停运</GupoTag>),
                    })}
                    listApi={async () => {
                        return new Promise(resolve => {
                            resolve({
                                data: filterDataSource.value || dataSource.value,
                            });
                        });
                    }}
                    operationRender={() => (
                        <>
                            <GupoButton type='primary' onClick={() => (modal.visible = true)}>
                                导入
                            </GupoButton>
                            <GupoButton type='primary'>重看统计</GupoButton>
                            <GupoButton type='primary'>停运调令</GupoButton>
                            <GupoButton type='primary'>恢复调令</GupoButton>
                        </>
                    )}
                />
                <GupoModal
                    visible={modal.visible}
                    onUpdate:value={e => (modal.visible = e)}
                    onOk={handelOk}
                    onCancel={() => (modal.visible = false)}
                    confirmLoading={modal.loading}
                    title='导入'
                >
                    <GlobalFormItem
                        labelCol={{ span: 0 }}
                        formData={formData}
                        item={{
                            key: 'file',
                            type: 'upload.dragger',
                            props: {
                                customRequest: e => (formData.file = [e.file]),
                                uploadContent: () => (
                                    <div>
                                        <p class='ant-upload-drag-icon'>
                                            <InboxOutlined />
                                        </p>
                                        <p class='ant-upload-text'>单击或将文件拖动到此区域以上传</p>
                                        <p class='ant-upload-hint'>文件提示</p>
                                    </div>
                                ),
                                name: 'file',
                            },
                        }}
                    />
                </GupoModal>
            </div>
        );
    },
});
</script>
