<template>
    <div class="global-search" :class="{ active: isFeedLine }">
        <div class="parent-search" :style="boxHeight">
            <div :class="{ label: isLabel, 'search-box': true }" ref="searchBox">
                <template v-for="(item, index) in configItem" :key="index">
                    <GupoForm.Item :label="item?.label" :labelWrap="true" :labelCol="labelCol" :wrapperCol="wrapperCol" v-bind="item?.formItemProps">
                        <component
                            :is="components[item.type]"
                            :allowClear="allowClear"
                            :value="props.formData[item.key]"
                            @update:value="updateValue(item.key, $event)"
                            v-bind="generateProps(item) || {}"
                        />
                        <!-- select -->
                        <template v-if="item.type === 'select'">
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
                        <!-- 自定义组件 -->
                        <template v-else-if="item.type === 'custom'">
                            <div class="common-box">
                                <component
                                    :is="item.component"
                                    :modelValue="props.formData[item.key]"
                                    @update:modelValue="updateValue(item.key, $event)"
                                    ref="$customForm"
                                />
                            </div>
                        </template>
                    </GupoForm.Item>
                </template>
                <GupoForm.Item>
                    <div class="empty-box" />
                </GupoForm.Item>
            </div>
        </div>
        <div class="btn-box" :class="{ isOpen: isOpen, label: isLabel }">
            <GupoButton @click="reset">重置</GupoButton>
            <GupoButton type="primary" @click="search">查询</GupoButton>
            <span class="operation" @click="isOpen = !isOpen" v-if="isFeedLine">
                {{ isOpen ? '收起' : '展开' }}
                <DownOutlined :class="{ active: isOpen }" />
            </span>
        </div>
    </div>
</template>

<script name="GlobalSearch" setup>
import { GupoButton, GupoInput, GupoSelect, GupoDatePicker, GupoTimePicker, GupoCascader, GupoTreeSelect, GupoForm } from '@src/components/UI/index.js';
import { DownOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-unified';
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue';

const { RangePicker } = GupoDatePicker;
const { TimeRangePicker } = GupoTimePicker;

const components = {
    input: GupoInput,
    datePicker: GupoDatePicker,
    'datePicker.rangePicker': RangePicker,
    timePicker: GupoTimePicker,
    'timePicker.timeRangePicker': TimeRangePicker,
    treeSelect: GupoTreeSelect,
    cascader: GupoCascader,
};

// 定义单独配置
const generateProps = item => {
    let formatLabel = item.label ? item.label : '';
    const componentMap = {
        input: {
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

const props = defineProps({
    // 默认高度
    defaultHeight: {
        type: Number,
        default: 50, // 输入框高 + 上下padding：9px
    },
    // 是否展开
    isOpenRow: {
        type: Boolean,
        default: false,
    },
    // 配置项,支持类型:input, select, datePicker, datePicker.rangePicker, timePicker, timePicker.timeRangePicker, cascader, treeSelect
    configItem: {
        type: Object,
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
        default: () => ({}),
    },
    // 右侧input展示所占col
    wrapperCol: {
        type: Object,
        default: () => ({}),
    },
    // 是否全部需要allowClear
    allowClear: {
        type: Boolean,
        default: true,
    },
});
const emits = defineEmits(['reset', 'search', 'update:formData']);

/**
 * data
 */
const defaultFormData = ref({});
const isOpen = ref(props.isOpenRow);
const searchBox = ref('');
const searhBoxHeight = ref('');

/**
 * methods
 */
const reset = () => {
    emits('update:formData', defaultFormData.value);
    emits('reset');
};
const insideReset = () => {
    emits('update:formData', defaultFormData.value);
};
const search = () => {
    emits('search');
};
const updateValue = (key, e) => {
    emits('update:formData', { ...props.formData, [key]: e });
};
const getSearhBoxHeight = () => {
    searhBoxHeight.value = searchBox.value.offsetHeight;
};

/**
 * watch
 */
watch(
    () => props.configItem,
    () => {
        const { formData } = props;
        defaultFormData.value = cloneDeep(formData);
    },
    {
        immediate: true,
    }
);
watch([() => isOpen.value, () => props.configItem], () => {
    nextTick(() => {
        getSearhBoxHeight();
    });
});

/**
 * computed
 */

// 获取高度
const boxHeight = computed(() => ({
    height: isOpen.value ? `${searhBoxHeight.value}px` : `${props.defaultHeight}px`,
}));
// 是否换行了
const isFeedLine = computed(() => searhBoxHeight.value > props.defaultHeight);
// 是否有label
const isLabel = computed(() => props.configItem.find(item => item.label));
// select筛选选项
const selectFilterOption = (input, option) => {
    return Object.values(option).join().toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
// cascader筛选
const cascaderFilterOption = (inputValue, path) => {
    return path.some(option => Object.values(option).join().toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
};

onMounted(() => {
    getSearhBoxHeight();
    window.addEventListener('resize', getSearhBoxHeight);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', getSearhBoxHeight);
});

defineExpose({ insideReset });
</script>
<style lang="less" scoped>
.global-search {
    position: relative;
    display: flex;
    width: 100%;
    padding: calc(@globalSpace - 9px) calc(@globalSpace - 20px);
    margin-bottom: @space5;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 0 15px rgba(148, 161, 196, 0.25);
    justify-content: space-between;

    .parent-search {
        width: 100%;
        height: 100%;
        overflow: hidden;
        transition: all 0.3s ease;

        .search-box {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            :deep(.ant-select-selection-item-content) {
                max-width: 10em;
            }

            .ant-form-item {
                margin: 9px 20px;
                @media (min-width: 1024px) {
                    & {
                        width: calc(33.33% - 40px);
                    }
                }
                @media (min-width: 1440px) {
                    & {
                        width: calc(25% - 40px);

                        :deep(.ant-select-selection-item-content) {
                            max-width: 9em;
                        }
                    }
                }
                @media (min-width: 1920px) {
                    & {
                        width: calc(20% - 40px);
                    }
                }

                :deep(.ant-input),
                :deep(.ant-picker),
                :deep(.ant-select),
                .empty-box,
                :deep(.search-item) {
                    width: 100%;
                }
            }

            .empty-box {
                height: 32px;
            }

            &.label .ant-form-item {
                @media (min-width: 1024px) {
                    & {
                        width: calc(50% - 40px);
                    }
                }
                @media (min-width: 1440px) {
                    & {
                        width: calc(33.33% - 40px);
                    }
                }
                @media (min-width: 1920px) {
                    & {
                        width: calc(25% - 40px);
                    }
                }
            }
        }
    }

    .btn-box {
        position: absolute;
        right: @globalSpace;
        bottom: calc(@globalSpace - 9px);
        z-index: 2;
        display: flex;
        height: 32px;
        margin: 9px 0px;
        background-color: #fff;
        align-items: center;
        justify-content: flex-end;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
        @media (min-width: 1024px) {
            & {
                width: calc(33.33% - 40px);
            }
        }
        @media (min-width: 1440px) {
            & {
                width: calc(25% - 40px);
            }
        }
        @media (min-width: 1920px) {
            & {
                width: calc(20% - 40px);
            }
        }

        .operation {
            margin-left: @space3;
            font-size: var(--font-size-content);
            color: var(--color-master);
            cursor: pointer;
            user-select: none;

            .anticon-down {
                margin-left: @space1;
                transform: rotate(0);
                transition: all 0.3s ease;

                &.active {
                    transform: rotate(180deg);
                }
            }
        }
    }

    .btn-box.label {
        @media (min-width: 1024px) {
            & {
                width: calc(50% - 40px);
            }
        }
        @media (min-width: 1440px) {
            & {
                width: calc(33.33% - 40px);
            }
        }
        @media (min-width: 1920px) {
            & {
                width: calc(25% - 40px);
            }
        }
    }
}
</style>
