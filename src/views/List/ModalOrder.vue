<script lang="jsx">
import { gupoMessage, GupoModal } from '@src/components/UI';
import { useStoreApp } from '@src/store/modules/app';

export default defineComponent({
    name: 'ModalOrder',
    emits: ['success'],
    expose: ['showModal', 'init'],
    setup(props, context) {
        const $globalForm = ref();
        const appStore = useStoreApp();
        const modal = reactive({
            visible: false,
            loading: false,
        });
        const formData = reactive({});
        const params = ref({});
        const init = value => {
            params.value = value;
            if (value.day) {
                Object.assign(formData, value);
            }
            showModal();
        };
        const showModal = () => (modal.visible = true);
        const onFinish = e => {
            if (params.value.day) {
                const index = appStore.orderList.findIndex(v => v.day === formData.day);
                // eslint-disable-next-line no-unused-vars
                const { key, ...data } = formData;
                appStore.setOrderList(
                    appStore.orderList
                        .slice(0, index)
                        .concat(data)
                        .concat(appStore.orderList.slice(index + 1))
                );
            } else {
                appStore.setOrderList([
                    ...appStore.orderList,
                    {
                        ...e,
                        day: Date.now(),
                        list: params.value.list,
                    },
                ]);
            }
            gupoMessage.success('操作成功');
            modal.visible = false;
            $globalForm.value.resetFields();
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
                            总计：<b>{params.value.list?.length}</b> 车次
                        </span>
                    }
                >
                    <ACard title='将对已选的车次进行操作' size='small' />
                </ABadgeRibbon>
                <ADivider />
                <GlobalForm
                    formData={formData}
                    onUpdate:formData={e => Object.assign(formData, e)}
                    ref={$globalForm}
                    rules={{
                        type: {
                            required: true,
                            message: '请输入类型',
                            trigger: 'change',
                        },
                        time: {
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
