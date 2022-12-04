<script lang="jsx">
import { gupoMessage, GupoModal } from '@src/components/UI';
import { useStoreApp } from '@src/store/modules/app';
import dayjs from 'dayjs';

export default defineComponent({
    name: 'ModalOrder',
    emits: ['success'],
    expose: ['showModal', 'init'],
    setup(props, context) {
        const appStore = useStoreApp();
        const modal = reactive({
            visible: false,
            loading: false,
        });
        const list = ref([]);
        const init = value => {
            console.log(value);
            list.value = value;
            showModal();
        };
        const showModal = () => (modal.visible = true);
        const onFinish = e => {
            appStore.setOrderList([
                ...appStore.orderList,
                {
                    ...e,
                    id: Date.now(),
                    day: dayjs().format('YYYY-MM-DD'),
                    list: list.value,
                },
            ]);
            gupoMessage.success('添加成功');
            modal.visible = false;
            context.emit('success');
        };
        const Modal = () => (
            <GupoModal
                title='调令'
                visible={modal.visible}
                onUpdate:value={e => (modal.visible = e)}
                onOk={() => (modal.visible = false)}
                onCancel={() => (modal.visible = false)}
                confirmLoading={modal.loading}
                footer={null}
            >
                <ABadgeRibbon
                    text={
                        <span>
                            总计：<b>{list.value.length}</b> 车次
                        </span>
                    }
                >
                    <ACard title='将对已选的车次进行操作' size='small' />
                </ABadgeRibbon>
                <ADivider />
                <GlobalForm
                    rules={{
                        select: {
                            required: true,
                            message: '请输入类型',
                            trigger: 'change',
                        },
                        rangePicker: {
                            required: true,
                            message: '请选择生效日期',
                            trigger: 'change',
                        },
                    }}
                    itemConfigs={[
                        {
                            key: 'type',
                            label: '类型',
                            type: 'select',
                            props: {
                                options: [
                                    { value: '1', label: '恢复' },
                                    { value: '0', label: '停运' },
                                ],
                            },
                        },
                        {
                            key: 'time',
                            label: '生效日期',
                            type: 'datePicker.rangePicker',
                            props: {
                                valueFormat: 'YYYY-MM-DD',
                            },
                        },
                        {
                            type: 'operation',
                            submitButton: {
                                text: '提交',
                            },
                            cancelButton: {
                                text: '取消',
                                props: {
                                    type: 'danger',
                                },
                            },
                        },
                    ]}
                    labelCol={{ span: 5 }}
                    onFinish={onFinish}
                    onCancel={() => (modal.visible = false)}
                />
            </GupoModal>
        );
        return {
            Modal,
            showModal,
            init,
        };
    },
    render() {
        return this.Modal();
    },
});
</script>
