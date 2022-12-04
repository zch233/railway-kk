<script lang="jsx">
import * as XLSX from 'xlsx';
import dayjs from 'dayjs';
import { gupoMessage, GupoModal } from '@src/components/UI';
import GlobalFormItem from '@src/components/GlobalForm/Item.vue';
import { InboxOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'ModalImport',
    emits: ['updateColumns', 'updateDataSource', 'updatePlaces', 'updateWays', 'success'],
    expose: ['showModal'],
    setup(props, context) {
        const modal = reactive({
            visible: false,
            loading: false,
            formData: {
                file: [],
            },
        });
        const handelOk = () => {
            const file = modal.formData.file[0];
            const reader = new FileReader();
            reader.onload = e => {
                const bytes = new Uint8Array(e.target.result);
                const wb = XLSX.read(bytes, { cellDates: true });
                const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, range: 1 });
                context.emit(
                    'updateColumns',
                    data[0].map((title, key) => ({ key, title }))
                );
                const list = data.slice(1).map(arr => {
                    const item = arr.reduce((res, cur, index) => {
                        res[index] = typeof cur === 'object' ? dayjs(cur).format('HH:mm') : cur;
                        return res;
                    }, {});
                    item.status = '1';
                    return item;
                });
                context.emit('updateDataSource', { list, total: list.length });
                context.emit('updatePlaces', [...new Set(list.map(v => v[1]))]);
                context.emit('updateWays', [...new Set(list.map(v => v[6]))]);
                context.emit('success');
                modal.visible = false;
                gupoMessage.success('导入成功');
            };
            reader.readAsArrayBuffer(file);
        };
        const showModal = () => (modal.visible = true);
        const Modal = () => (
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
                    formData={modal.formData}
                    item={{
                        key: 'file',
                        type: 'upload.dragger',
                        props: {
                            customRequest: e => (modal.formData.file = [e.file]),
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
