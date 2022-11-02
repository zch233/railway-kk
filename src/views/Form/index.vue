<template>
    <div class="form-parent">
        <div class="form">
            <div class="form-content">
                <GlobalForm
                    :rules="addForm.rules"
                    :configItem="addForm.configItem()"
                    :formData="addForm.formData"
                    @update:formData="Object.assign(addForm.formData, $event)"
                    :labelCol="{ span: 5 }"
                    ref="$globalForm"
                    @finish="onFinish"
                />
                <!-- 自定义按钮 -->
                <a-button type="primary" @click="customSubmit">自定义提交</a-button>
            </div>
        </div>
    </div>
</template>

<script setup>
/**  @description:数据同步  **/
import { message } from 'ant-design-vue';
import { useDataSync } from './index.jsx';

// 需要用到监听方法，传参选项传参params
const params = reactive({
    addressOption: [],
    uploadChange: info => onChange(info),
    uploadLoading: false,
    imageUrl: '',
});

const addForm = useDataSync(params).addFrom;

const $globalForm = ref('');

onMounted(() => {
    getConfigDetails();
    getOption();
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

const getOption = () => {
    setTimeout(() => {
        params.addressOption = [
            {
                name: '安徽',
                code: 'anhui',
            },
            {
                name: '浙江',
                code: 'zhejiang',
            },
        ];
    }, 2000);
};

const onChange = info => {
    if (info.file.status === 'uploading') {
        params.uploadLoading = true;
        return;
    }
    if (info.file.status === 'done') {
        params.imageUrl = info.file.response.data.url;
        params.uploadLoading = false;
    }

    if (info.file.status === 'error') {
        params.uploadLoading = false;
        message.error('upload error');
    }
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
