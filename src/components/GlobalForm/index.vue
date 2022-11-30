<template>
    <div>
        <GupoForm
            ref="$formRef"
            :labelWrap="true"
            :model="props.formData"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            v-bind="$attrs"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            @submit="submit"
            @validate="validate"
        >
            <GupoForm.Item
                v-for="(item, index) in configItem"
                :key="index"
                :name="item.key"
                :wrapper-col="item.type === 'operation' || !item.label ? formatterOperationWrapperCol : { ...wrapperCol }"
                :label="item?.label"
                v-bind="item?.formItemProps"
            >
                <!-- 下面定义的component类型 -->
                <template v-if="Object.keys(components).includes(item.type)">
                    <component
                        :is="components[item.type]"
                        :value="props.formData[item.key]"
                        @update:value="updateValue(item.key, $event)"
                        :allowClear="allowClear"
                        v-bind="generateProps(item) || {}"
                    />
                </template>
                <!-- select -->
                <template v-else-if="item.type === 'select'">
                    <GupoSelect
                        :value="props.formData[item.key]"
                        @update:value="updateValue(item.key, $event)"
                        :allowClear="allowClear"
                        v-bind="generateProps(item) || {}"
                    >
                        <template #option="option" v-if="item?.props?.option">
                            <slot name="option" :option="option">
                                <component :is="item?.props?.option?.(option)" />
                            </slot>
                        </template>
                    </GupoSelect>
                </template>
                <!-- switch -->
                <template v-else-if="item.type === 'switch'">
                    <GupoSwitch :checked="props.formData[item.key]" @update:checked="updateValue(item.key, $event)" v-bind="item?.props || {}" />
                </template>
                <template v-else-if="item.type === 'upload'">
                    <GupoUpload
                        :file-list="props.formData[item.key]"
                        @update:file-list="updateValue(item.key, $event)"
                        v-on="{
                            preview: item?.props?.onPreview ? item.props.onPreview : handlePreview,
                        }"
                        v-bind="item?.props || {}"
                    >
                        <slot name="uploadContent">
                            <template v-if="typeof item?.props?.uploadContent === 'function' || typeof item?.props?.uploadContent === 'string'">
                                <template v-if="typeof item?.props?.uploadContent === 'function'">
                                    <component :is="item?.props?.uploadContent()" />
                                </template>
                                <template v-else>
                                    {{ item?.props?.uploadContent }}
                                </template>
                            </template>
                            <template v-else>
                                <component :is="item?.props?.uploadContent" />
                            </template>
                        </slot>
                    </GupoUpload>
                    <GupoImage
                        :style="{ display: 'none' }"
                        :preview="{
                            visible: previewVisible,
                            onVisibleChange: setVisible,
                        }"
                        :src="previewImage"
                    />
                </template>
                <template v-else-if="item.type === 'upload.dragger'">
                    <Dragger :file-list="props.formData[item.key]" @update:file-list="updateValue(item.key, $event)" v-bind="item?.props || {}">
                        <slot name="uploadContent">
                            <template v-if="typeof item?.props?.uploadContent === 'function' || typeof item?.props?.uploadContent === 'string'">
                                <template v-if="typeof item?.props?.uploadContent === 'function'">
                                    <component :is="item?.props?.uploadContent()" />
                                </template>
                                <template v-else>
                                    {{ item?.props?.uploadContent }}
                                </template>
                            </template>
                            <template v-else>
                                <component :is="item?.props?.uploadContent" />
                            </template>
                        </slot>
                    </Dragger>
                </template>
                <!-- 自定义组件 -->
                <template v-else-if="item.type === 'custom'">
                    <component
                        :is="item.component"
                        :modelValue="props.formData[item.key]"
                        @update:modelValue="updateValue(item.key, $event)"
                        ref="$customForm"
                    />
                </template>
                <!-- 提交按钮 -->
                <template v-else-if="item.type === 'operation'">
                    <GupoButton v-if="item.submitButton" :type="item.submitButton.type || 'primary'" html-type="submit" :loading="loading">{{
                        item.submitButton.text || '提交'
                    }}</GupoButton>
                    <GupoButton v-if="item.cancelButton" :type="item.cancelButton.type || ''" @click="cancel">{{
                        item.cancelButton.text || '取消'
                    }}</GupoButton>
                </template>
            </GupoForm.Item>
            <slot name="footer" :data="props.formData" />
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
    configItem:[
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

const { TextArea, Password } = GupoInput;
const { RangePicker } = GupoDatePicker;
const { TimeRangePicker } = GupoTimePicker;
const { Dragger } = GupoUpload;

const components = {
    input: GupoInput,
    'input.password': Password,
    'input.textarea': TextArea,
    inputNumber: GupoInputNumber,
    datePicker: GupoDatePicker,
    'datePicker.rangePicker': RangePicker,
    timePicker: GupoTimePicker,
    'timePicker.timeRangePicker': TimeRangePicker,
    rate: GupoRate,
    slider: GupoSlider,
    treeSelect: GupoTreeSelect,
    checkbox: GupoCheckbox.Group,
    radio: GupoRadio.Group,
    // select: GupoSelect,
    cascader: GupoCascader,
};

const props = defineProps({
    rules: {
        type: Object,
        default: () => ({}),
    },
    configItem: {
        type: Array,
        default: () => {
            return [];
        },
    },
    formData: {
        type: Object,
        default: () => ({}),
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

const $formRef = ref();
const $customForm = ref('');

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
    let formatLable = item.label ? item.label : '';
    const componentMap = {
        input: {
            placeholder: '请输入' + formatLable,
        },
        inputNumber: {
            placeholder: '请输入' + formatLable,
        },
        'input.password': {
            placeholder: '请输入' + formatLable,
            autocomplete: 'off',
        },
        'input.textarea': {
            placeholder: '请输入' + formatLable,
        },
        treeSelect: {
            placeholder: '请选择' + formatLable,
        },
        select: {
            placeholder: '请选择' + formatLable,
            filterOption: selectFilterOption,
        },
        cascader: {
            placeholder: '请选择' + formatLable,
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

const updateValue = (key, e) => {
    // emits('update:value', e);
    emits('update:formData', { ...props.formData, [key]: e });
};

// 内置方法导出
const clearValidate = e => $formRef.value.clearValidate(e);
const resetFields = e => $formRef.value.resetFields(e);
const scrollToField = e => $formRef.value.scrollToField(e);
const validateFields = e => $formRef.value.validateFields(e);

defineExpose({ validateFields, scrollToField, clearValidate, resetFields, $customForm });
</script>
<style lang="less" scoped></style>
