<template>
    <div class="form global-page-content">
        <div class="form-content">
            <GlobalForm
                :rules="addForm.rules"
                :configItem="addForm.configItem"
                :formData="addForm.formData"
                @update:formData="Object.assign(addForm.formData, $event)"
                :labelCol="{ span: 0 }"
                ref="$globalForm"
            />
            <!-- 自定义按钮 -->
            <a-button type="primary" @click="submit">保存</a-button>
        </div>
    </div>
</template>

<script setup>
/**  @description:数据同步  **/
import { useDataSync } from './index.js';

const addForm = useDataSync().addFrom;
const $globalForm = ref('');

onMounted(() => {
    getConfigDetails();
});

const submit = () => {
    $globalForm.value.validateFields().then(() => {
        console.log('保存成功');
    });
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
.form {
    margin: @space6;
    box-sizing: border-box;

    .form-content {
        width: 500px;
        margin: 100px auto;
    }
}
</style>
