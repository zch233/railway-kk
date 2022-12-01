<template>
    <div>
        <GupoForm
            ref="$formRef"
            :labelWrap="true"
            :model="formDataValue"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            @submit="submit"
            @validate="validate"
            v-bind="$attrs"
        >
            <GupoForm.Item
                v-for="(item, index) in itemConfigs"
                :key="index"
                :name="item.key"
                :wrapper-col="item.type === 'operation' || !item.label ? formatterOperationWrapperCol : { ...wrapperCol }"
                :label="item?.label"
                v-bind="item?.formItemProps"
            >
                <!-- 下面定义的component类型 -->
                <template v-if="Object.keys(normalComponents).includes(item.type)">
                    <component
                        :is="normalComponents[item.type]"
                        :value="formDataValue[item.key]"
                        @update:value="updateValue(item.key, $event)"
                        :allowClear="allowClear"
                        v-bind="generateProps(item) || {}"
                    />
                </template>
                <!-- select -->
                <template v-else-if="item.type === 'select'">
                    <component
                        :is="compositeComponents.select"
                        :value="formDataValue[item.key]"
                        @update:value="updateValue(item.key, $event)"
                        :allowClear="allowClear"
                        v-bind="generateProps(item) || {}"
                        ><template #option="option" v-if="item?.props?.option">
                            <slot name="option" :option="option" :data="formDataValue">
                                <component :is="item?.props?.option?.(option)" />
                            </slot> </template
                    ></component>
                </template>
                <!-- switch -->
                <template v-else-if="item.type === 'switch'">
                    <component
                        :is="compositeComponents.switch"
                        :checked="formDataValue[item.key]"
                        @update:checked="updateValue(item.key, $event)"
                        v-bind="item?.props || {}"
                    />
                </template>
                <template v-else-if="item.type === 'upload'">
                    <component
                        :is="compositeComponents.upload"
                        :file-list="formDataValue[item.key]"
                        @update:file-list="updateValue(item.key, $event)"
                        v-on="{
                            preview: item.props?.onPreview || handlePreview,
                        }"
                        v-bind="item?.props || {}"
                    >
                        <slot name="uploadContent" :data="formDataValue">
                            <template v-if="typeof item.props?.uploadContent === 'string'">
                                {{ item?.props?.uploadContent }}
                            </template>
                            <template v-else>
                                <component :is="item.props?.uploadContent" v-bind="item.props?.uploadContentProps || {}" />
                            </template>
                        </slot>
                        <GupoImage
                            :style="{ display: 'none' }"
                            :preview="{
                                visible: previewVisible,
                                onVisibleChange: setVisible,
                            }"
                            :src="previewImage"
                        />
                    </component>
                </template>
                <template v-else-if="item.type === 'upload.dragger'">
                    <component
                        :is="compositeComponents['upload.dragger']"
                        :file-list="formDataValue[item.key]"
                        @update:file-list="updateValue(item.key, $event)"
                        v-bind="item?.props || {}"
                    >
                        <slot name="uploadContent" :data="formDataValue">
                            <template v-if="typeof item.props?.uploadContent === 'string'">
                                {{ item?.props?.uploadContent }}
                            </template>
                            <template v-else>
                                <component :is="item.props?.uploadContent" v-bind="item.props?.uploadContentProps || {}" />
                            </template>
                        </slot>
                    </component>
                </template>
                <!-- 自定义组件 -->
                <template v-else-if="item.type === 'custom'">
                    <component
                        :is="item.component"
                        :value="formDataValue[item.key]"
                        @update:value="updateValue(item.key, $event)"
                        v-bind="item?.props || {}"
                        ref="$customFormItem"
                    />
                </template>
                <!-- 提交按钮 -->
                <template v-else-if="item.type === 'operation'">
                    <GupoButton v-if="item.submitButton" type="primary" html-type="submit" :loading="loading" v-bind="item.submitButton.props">
                        {{ item.submitButton.text || '提交' }}
                    </GupoButton>
                    <GupoButton v-if="item.cancelButton" @click="cancel" v-bind="item.cancelButton.props">
                        {{ item.cancelButton.text || '取消' }}
                    </GupoButton>
                </template>
            </GupoForm.Item>
            <slot name="footer" :data="formDataValue" />
        </GupoForm>
    </div>
</template>

<script setup>
/**  @description:form封装

 支持类型
 input, input.password, input.textarea,
 inputNumber, 它不属于antd input组件下，是单独的一个组件，所以不写成input.number
 select, 新增了showSearch（搜索）属性，
 checkbox,
 radio,
 switch,
 datePicker, datePicker.rangePicker,
 timePicker, timePicker.timeRangePicker,
 rate,
 slider,
 cascader, 新增了showSearch（搜索）属性，
 treeSelect,
 upload, upload.dragger


 props参数除了formItemProps和props.showSearch其余和antd文档相同
 举例配置项：
 itemConfigs:[
 {
            key: 'key',
            label: '输入框',
            type: 'select',
            props:{
                showSearch:true,
                options:[]
            },
            // 配置Form.Item，这个配置项用的比较少
            formItemProps: {
                labelAlign: 'right',
            },
        },
 ]

 tips：
 1、select和treeSelect 在单选的时候定义参数写成undefined,否则placeholder不显示。
 2、当select和treeSelect自定义后缀失效的时候可能是开了多选或者checkable导致。
 3、触发自己的方法(例如select的change事件),在props传on+事件名(onChange)
 * **/
import { ref, computed } from 'vue';
import {
    GupoButton,
    GupoForm,
    GupoInput,
    GupoSelect,
    GupoCheckbox,
    GupoRadio,
    GupoInputNumber,
    GupoSwitch,
    GupoDatePicker,
    GupoTimePicker,
    GupoRate,
    GupoSlider,
    GupoCascader,
    GupoTreeSelect,
    GupoUpload,
    GupoImage,
} from '@src/components/UI';

const normalComponents = {
    input: GupoInput,
    'input.password': GupoInput.Password,
    'input.textarea': GupoInput.TextArea,
    inputNumber: GupoInputNumber,
    datePicker: GupoDatePicker,
    'datePicker.rangePicker': GupoDatePicker.RangePicker,
    timePicker: GupoTimePicker,
    'timePicker.timeRangePicker': GupoTimePicker.TimeRangePicker,
    rate: GupoRate,
    slider: GupoSlider,
    treeSelect: GupoTreeSelect,
    checkbox: GupoCheckbox.Group,
    radio: GupoRadio.Group,
    cascader: GupoCascader,
};

const compositeComponents = {
    select: GupoSelect,
    switch: GupoSwitch,
    upload: GupoUpload,
    'upload.dragger': GupoUpload.Dragger,
};

const props = defineProps({
    rules: {
        type: Object,
        default: () => ({}),
    },
    itemConfigs: {
        type: Array,
        default: () => {
            return [];
        },
    },
    formData: {
        type: Object,
    },
    // 左侧label展示所占col
    labelCol: {
        type: Object,
        default: () => ({
            span: 2,
        }),
    },
    // 右侧input展示所占col
    wrapperCol: {
        type: Object,
        default: () => ({}),
    },
    // 操作按钮所占col
    operationWrapperCol: {
        type: Object,
        default: () => ({}),
    },
    // 提交loading
    loading: {
        type: Boolean,
        default: () => false,
    },
    // 是否全部需要allowClear
    allowClear: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits([
    'finish',
    'finishFailed',
    'cancel',
    'submit',
    'validate',
    'update:formData',
    'update:checked',
    'update:value',
    'update:modelValue',
    'update:file-list',
]);

// 操作按钮区域 wrapperCol
const formatterOperationWrapperCol = computed(() =>
    Object.values(props.operationWrapperCol).length ? props.operationWrapperCol : { offset: props.labelCol.span, span: props.wrapperCol.span }
);

const _formData = reactive(
    props.itemConfigs.reduce((res, cur) => {
        res[cur.key] = undefined;
        return res;
    }, {})
);

const formDataValue = computed(() => props.formData || _formData);

const updateValue = (key, value) => {
    if (props.formData) {
        emits('update:formData', { ...props.formData, [key]: value });
    } else {
        _formData[key] = value;
    }
};

const $formRef = ref();
const $customFormItem = ref('');

// select筛选选项
const selectFilterOption = (input, option) => {
    return Object.values(option).join().toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
//cascader筛选
const cascaderFilterOption = (inputValue, path) => {
    return path.some(option => Object.values(option).join().toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
};

// 定义单独配置
const generateProps = item => {
    const formatLabel = typeof item.label === 'string' ? item.label : '';
    // 部分特殊的组件需要提前加一些额外的配置
    const componentMap = {
        input: {
            placeholder: '请输入' + formatLabel,
        },
        inputNumber: {
            placeholder: '请输入' + formatLabel,
        },
        'input.password': {
            placeholder: '请输入' + formatLabel,
            autocomplete: 'off',
        },
        'input.textarea': {
            placeholder: '请输入' + formatLabel,
        },
        treeSelect: {
            placeholder: '请选择' + formatLabel,
        },
        select: {
            placeholder: '请选择' + formatLabel,
            filterOption: selectFilterOption,
        },
        cascader: {
            placeholder: '请选择' + formatLabel,
            showSearch: item?.props?.showSearch ? cascaderFilterOption : false,
        },
    };
    return {
        ...componentMap[item.type],
        ...item?.props,
    };
};

const onFinish = values => {
    emits('finish', values);
};

const onFinishFailed = errorInfo => {
    emits('finishFailed', errorInfo);
};

const submit = event => {
    emits('submit', event);
};

const cancel = () => {
    emits('cancel');
};

const validate = (name, status, errorMsgs) => {
    emits('validate', { name, status, errorMsgs });
};

// 图片预览
const previewVisible = ref(false);
const previewImage = ref('');
const handlePreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
    }
    previewImage.value = file.url || file.preview;
    setVisible(true);
};
const getBase64 = file => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};
const setVisible = value => {
    previewVisible.value = value;
};

// 内置方法导出
const clearValidate = e => $formRef.value.clearValidate(e);
const resetFields = e => $formRef.value.resetFields(e);
const scrollToField = e => $formRef.value.scrollToField(e);
const validateFields = e => $formRef.value.validateFields(e);

defineExpose({ validateFields, scrollToField, clearValidate, resetFields, $customFormItem });
</script>
<style lang="less" scoped></style>
