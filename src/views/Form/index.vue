<template>
    <div class="form-parent">
        <div class="form">
            <div class="form-content">
                <GlobalForm
                    :rules="addForm.rules"
                    :configItem="addForm.configItem"
                    :formData="addForm.formData"
                    @update:formData="Object.assign(addForm.formData, $event)"
                    :labelCol="{ span: 5 }"
                    ref="$globalForm"
                    @onFinish="onFinish"
                />
                <!-- 自定义按钮 -->
                <a-button type="primary" @click="customSubmit">自定义提交</a-button>
            </div>
        </div>
    </div>
</template>

<script setup>
/**  @description:数据同步  **/
import { useDataSync } from './index.jsx';

const addForm = useDataSync().addFrom;
const $globalForm = ref('');

onMounted(() => {
    getConfigDetails();
});

const customSubmit = () => {
    $globalForm.value.validateFields().then(() => {
        console.log('addForm.formData :>> ', addForm.formData);
    });
};

const onFinish = () => {
    console.log('addForm.formData :>> ', addForm.formData);
};

// 获取详情赋值
const getConfigDetails = () => {
    // 接口返回数据
    let data = { name: 11, 没用字段: 11 };

    const { name } = data;
    Object.assign(addForm.formData, { name });
};
</script>
<style lang="less" scoped>
.form-parent {
    padding: @space6;

    .form {
        background-color: #fff;

        .form-content {
            width: 500px;
            padding: @space6 0;
            margin: 0px auto;
        }
    }
}
</style>
