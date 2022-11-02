<template>
    <div class="add-modal">
        <a-modal
            v-model:visible="visible"
            width="550px"
            wrapClassName="add-modal"
            @ok="handelOk"
            @cancel="cancelModal"
            :confirmLoading="confirmLoading"
            title="新建"
        >
            <GlobalForm
                :rules="documentForm.rules"
                :configItem="documentForm.configItem"
                :formData="documentForm.formData"
                @update:formData="Object.assign(documentForm.formData, $event)"
                :labelCol="{ span: 4 }"
                ref="$documentForm"
            />
        </a-modal>
    </div>
</template>

<script setup name="Add">
/**  @description:新建  **/
import { configData } from './index.js';

const emits = defineEmits(['update:modelVisible']);

const documentForm = configData().documentForm;
const $documentForm = ref(null);
const confirmLoading = ref(false);

const props = defineProps({
    modelVisible: {
        type: Boolean,
        default: false,
    },
});

const visible = computed({
    get() {
        return props.modelVisible;
    },
    set(val) {
        emits('update:modelVisible', val);
    },
});

const handelOk = () => {
    $documentForm.value.validateFields().then(() => {
        // 新建成功记得 cancelModal() 他不会清空数据
    });
};

const cancelModal = () => {
    visible.value = false;
    $documentForm.value.resetFields();
};
</script>
<style lang="less" scoped></style>
