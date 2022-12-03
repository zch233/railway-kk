<script lang="jsx">
import GlobalTable from '@src/components/GlobalTable/index.vue';
import * as XLSX from 'xlsx';
import { GupoButton, GupoModal } from '@src/components/UI';
import { InboxOutlined } from '@ant-design/icons-vue';
import GlobalFormItem from '@src/components/GlobalForm/Item.vue';
import dayjs from 'dayjs';
import { useLocalStorage } from '@src/utils/storage';

export default defineComponent({
    name: 'List',
    setup() {
        const columns = useLocalStorage('columns', []);
        const dataSource = useLocalStorage('dataSource', {
            list: [],
            paginate: { total: 0 },
        });
        const getList = async () => {
            return new Promise(resolve => {
                resolve({
                    data: dataSource.value,
                });
            });
        };
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
                dataSource.value.list = data.slice(1).map(arr =>
                    arr.reduce((res, cur, index) => {
                        res[index] = typeof cur === 'object' ? dayjs(cur).format('HH:mm') : cur;
                        return res;
                    }, {})
                );
                dataSource.value.paginate.total = dataSource.value.list.length;
                $globalTable.value.refresh();
                modal.visible = false;
            };
            reader.readAsArrayBuffer(file);
        };
        const $globalTable = ref();
        return () => (
            <div class='container'>
                <GlobalTable
                    ref={$globalTable}
                    columns={columns.value}
                    listApi={getList}
                    operationRender={() => (
                        <GupoButton type='primary' onClick={() => (modal.visible = true)}>
                            导入
                        </GupoButton>
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
