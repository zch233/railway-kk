<template>
    <div class="global-table" ref="$globalTable">
        <div class="top-area" v-if="isTopOperation">
            <div class="left">{{ tableTitle || `${route.meta.title || ''}列表` }}</div>
            <div class="right">
                <slot name="operation" />
                <GupoDivider type="vertical" v-if="operation.length" />
                <div class="operation-icon" v-if="operation.includes('size')">
                    <GupoDropdown :trigger="['click']" overlayClassName="density">
                        <GupoTooltip>
                            <template #title>密度</template>
                            <ColumnHeightOutlined />
                        </GupoTooltip>
                        <template #overlay>
                            <GupoMenu @click="handelDesity">
                                <GupoMenu.Item v-for="item in densityData" :key="item.key" :class="{ active: density === item.key }">
                                    <span>{{ item.name }}</span>
                                </GupoMenu.Item>
                            </GupoMenu>
                        </template>
                    </GupoDropdown>
                </div>
                <div class="operation-icon" @click="fullscreenHandle" v-if="operation.includes('fullscreen')">
                    <GupoTooltip>
                        <template #title>放大</template>
                        <FullscreenExitOutlined v-if="isFullScreen" />
                        <FullscreenOutlined v-else />
                    </GupoTooltip>
                </div>
                <div class="operation-icon" @click="refresh(true)" v-if="operation.includes('reload')">
                    <GupoTooltip>
                        <template #title>刷新</template>
                        <ReloadOutlined />
                    </GupoTooltip>
                </div>
                <div class="operation-icon" v-if="operation.includes('setting')">
                    <ColumnSetting :options="columnSettingOptions" @change="changeOption" />
                </div>
            </div>
        </div>
        <!-- 选择区域 -->
        <div class="selected" v-show="hasSelected">
            <div class="selected-left">
                <InfoCircleFilled />
                <span class="selected-num">
                    已选择 <span class="global-master-color">{{ selectedData.rowKeys.length }}</span> 项
                </span>
                <span class="tip"> <slot name="selected-tip" /> </span>
            </div>
            <div class="selected-right">
                <span v-if="!hiddenCancelSelected" class="global-master-color" @click="cancelSelected">取消选择</span>
                <!-- cancelSelected: 取消选择； item：选中行-->
                <slot name="selected-operation" :cancelSelected="cancelSelected" :item="selectedDataSource" />
            </div>
        </div>
        <!-- 表格区域-->
        <div id="global-table">
            <GupoTable
                :row-selection="formatRowSelection"
                :dataSource="tableData.dataSource"
                :columns="defineColumns"
                :pagination="formatPagination"
                @change="change"
                :size="density"
                :loading="tableData.loading"
                v-bind="$attrs"
                :rowKey="rowKey"
                v-show="hasColumns"
            >
                <template #headerCell="{ title, column }">
                    <slot name="headerCell" :column="column" :title="title" />
                </template>
                <template #bodyCell="{ text, record, index, column }">
                    <slot name="bodyCell" :column="column" :text="text" :index="index" :record="record" />
                </template>
                <template #title v-if="title">
                    <slot name="title" />
                </template>
                <template #footer v-if="footer">
                    <slot name="footer" />
                </template>
                <template #summary v-if="summary">
                    <slot name="summary" />
                </template>
                <template #emptyText v-if="emptyText">
                    <slot name="emptyText" />
                </template>
                <template #expandedRowRender v-if="expandedRowRender">
                    <slot name="expandedRowRender" />
                </template>
                <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" v-if="customFilterDropdown">
                    <slot
                        name="customFilterDropdown"
                        :setSelectedKeys="setSelectedKeys"
                        :selectedKeys="selectedKeys"
                        :confirm="confirm"
                        :clearFilters="clearFilters"
                        :column="column"
                    />
                </template>
                <template #customFilterIcon="{ filtered, column }" v-if="customFilterIcon">
                    <slot name="customFilterIcon" :filtered="filtered" :column="column" />
                </template>
            </GupoTable>
        </div>
    </div>
</template>

<script name="GlobalTable" setup>
import screenfull from 'screenfull';
import { cloneDeep } from 'lodash-unified';
import { reactive, ref, computed, toRefs, onMounted } from 'vue';
import { FullscreenOutlined, FullscreenExitOutlined, ReloadOutlined, ColumnHeightOutlined, InfoCircleFilled } from '@ant-design/icons-vue';
import { GupoTable, GupoDivider, GupoDropdown, GupoMenu, GupoTooltip } from '@src/components/UI/index.js';
import ColumnSetting from './ColumnSetting.vue';

const emits = defineEmits(['change', 'selectChange', 'cancelSelected']);
const props = defineProps({
    isTopOperation: {
        type: Boolean,
        default: true,
    },
    tableTitle: {
        type: String,
        default: '',
    },
    operation: {
        type: Array,
        default: () => ['size', 'fullscreen', 'reload', 'setting'],
    },
    columns: {
        type: Array,
        default: () => [],
    },
    listApi: {
        type: Function,
        require: true,
    },
    pageNames: {
        type: Object,
        default: () => ({ page: 'page', size: 'per_page' }),
    },
    pageData: {},
    // 接口返回参数
    listApiParamsName: {
        type: Object,
        default: () => ({ list: 'list', paginate: 'paginate', total: 'total' }),
    },
    /*
    排序的键名 
        sortField: 接口排序类型字段，（sortBy）
        sortOrder：排序筛选条件，可选值：ascend，descend （sort）
        defaultField: 默认排序的关键字名，
        defaultOrder：默认排序的条件；可选值：ascend，descend
    */
    sortNames: {
        type: Object,
        default: () => ({ sortField: '', sortOrder: '', defaultField: '', defaultOrder: '' }),
    },
    sortOrder: {
        type: Object,
        default: () => ({ ascend: 'asc', descend: 'desc' }),
    },
    // 默认表格尺寸
    size: {
        type: String,
        default: 'default', //middle,small
    },
    // 分页的所有配置项
    pagination: {
        type: [Object, Boolean],
        default: () => ({}),
    },
    rowSelection: {
        type: [Object, Boolean],
        default: () => false,
    },
    // 选择表格行所用的键
    rowKey: {
        type: String,
        default: 'key',
    },
    // 选中的值
    selectedRowKeys: {
        type: Array,
        default: () => [],
    },
    // 隐藏整个选择展示区域
    hiddenRowSelectionArea: {
        type: Boolean,
        default: false,
    },
    // 隐藏'取消选择'
    hiddenCancelSelected: {
        type: Boolean,
        default: false,
    },
    // 下面的都是插槽是否显示，默认显示会出现显示问题，只有使用时再显示
    expandedRowRender: {
        type: Boolean,
        default: false,
    },
    customFilterIcon: {
        type: Boolean,
        default: false,
    },
    title: {
        type: Boolean,
        default: false,
    },
    footer: {
        type: Boolean,
        default: false,
    },
    emptyText: {
        type: Boolean,
        default: false,
    },
    summary: {
        type: Boolean,
        default: false,
    },
    customFilterDropdown: {
        type: Boolean,
        default: false,
    },
});
const route = useRoute();
const $globalTable = ref();
const isFullScreen = ref(false);
const { pageNames, sortNames, sortOrder } = toRefs(props);

const defaultMeta = {
    current_page: 1,
    per_page: props?.pagination?.defaultPageSize ? props.pagination.defaultPageSize : 10,
};
let meta = reactive({ ...defaultMeta });

onMounted(() => {
    getList();
    if (!screenfull.isEnabled) return;
    screenfull.on('change', fullscreenChange);
});

onBeforeUnmount(() => {
    if (!screenfull.isEnabled) return;
    screenfull.off('change', fullscreenChange);
});

const change = (data, filters, sorter) => {
    const { current, pageSize } = data;
    meta.current_page = current;
    meta.per_page = pageSize;
    getList(sorter, filters);
    emits('change', { data, filters, sorter });
};

// 刷新 传参: 不恢复到默认页码;
const refresh = noRevertDefaultPage => {
    if (!noRevertDefaultPage) {
        const { current_page } = defaultMeta;
        meta.current_page = current_page;
    } else if (tableData.dataSource.length === 1 && meta.current_page > 1) {
        // 当删除只有最后一条数据时，并且不是最后一页，页码 -1
        meta.current_page -= 1;
    }
    getList();
};

// 密度
const densityData = [
    {
        name: '默认',
        key: 'default',
    },
    {
        name: '中等',
        key: 'middle',
    },
    {
        name: '紧凑',
        key: 'small',
    },
];
const density = ref(props.size);
const handelDesity = ({ key }) => {
    density.value = key;
};

// 设置
const defaultColumns = ref(cloneDeep(props.columns));
const defineColumns = computed({
    get() {
        return defaultColumns.value.map(item => {
            return {
                ...item,
                dataIndex: item?.dataIndex || item.key,
                customRender:
                    item.customRender ||
                    (({ text: val, record: row }) => {
                        //当前单元格值 是否为 空 值
                        const isNullValue = val === null || val === '' || val === ' ';
                        //判断值若为 空 则返回 '-'
                        //否则判断值若 自定义格式化 则返回自己的 setValue() 方法的返回值
                        //否则返回 prop
                        return isNullValue ? '—' : item.setValue ? item.setValue(val, row) : val;
                    }),
            };
        });
    },
    set(val) {
        defaultColumns.value = val;
    },
});

const columnSettingOptions = computed(() => props.columns.map(item => item.title));

const hasColumns = ref(true);
const changeOption = options => {
    hasColumns.value = !!options.length;
    if (!options.length) return;
    defineColumns.value = props.columns.filter(v => options.includes(v.title));
};

// 放大
const fullscreenHandle = () => {
    screenfull.toggle($globalTable.value);
};
const fullscreenChange = () => {
    isFullScreen.value = screenfull.isFullscreen;
};

// 反选框
const selectedData = reactive({
    rowKeys: [],
    loading: false,
});

watchEffect(() => {
    selectedData.rowKeys = cloneDeep(props.selectedRowKeys);
});

const onSelectChange = selectedRowKeys => {
    selectedData.rowKeys = selectedRowKeys;
    emits('selectChange', selectedRowKeys);
};
const hasSelected = computed(() => selectedData.rowKeys.length > 0 && !props.hiddenRowSelectionArea);

// 取消选择
const cancelSelected = () => {
    selectedData.rowKeys = [];
    emits('selectChange', []);
    emits('cancelSelected');
};

const tableData = reactive({
    dataSource: [],
    total: 0,
    loading: false,
});

// 获取接口数据
const getList = async (sorter, filters) => {
    let sorters = sorter
        ? sorter
        : {
              field: sortNames.value.defaultField,
              order: sortNames.value.defaultOrder,
          };
    tableData.loading = true;
    const result = await props
        .listApi({
            [pageNames.value.page]: meta.current_page,
            [pageNames.value.size]: meta.per_page,
            ...(sortNames.value.sortField && { [sortNames.value.sortField]: sorters.field, [sortNames.value.sortOrder]: sortOrder.value[sorters.order] }),
            ...filters,
        })
        .finally(() => {
            tableData.loading = false;
        });
    const { data } = result;
    let list = data[props.listApiParamsName.list];
    list.forEach((item, index) => {
        item.key = index;
    });
    tableData.dataSource = list;
    tableData.total = data?.[props.listApiParamsName.paginate]?.[props.listApiParamsName.total];
};

const formatPagination = computed(() => {
    return props.pagination
        ? {
              total: tableData.total,
              current: meta.current_page,
              defaultPageSize: meta.per_page,
              showTotal: total => `总计${total}条`,
              'show-quick-jumper': true,
              ...props.pagination,
          }
        : props.pagination;
});

const formatRowSelection = computed(() => {
    return props.rowSelection
        ? {
              selectedRowKeys: selectedData.rowKeys,
              onChange: onSelectChange,
              ...props.rowSelection,
          }
        : null;
});

// 筛选选中的数据
const selectedDataSource = computed(() => tableData.dataSource.filter(item => selectedData.rowKeys.includes(item[props.rowKey])));

defineExpose({ refresh, selectedDataSource, onSelectChange });
</script>

<style lang="less" scoped>
.global-table {
    padding: @space4 @space8 @space2;
    background-color: #fff;
    box-shadow: 0px 0px 15px rgba(148, 161, 196, 0.25);

    .top-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: @space4;

        .left {
            font-size: 16px;
        }

        .right {
            .operation-icon {
                display: inline-block;
                margin: 0 @space2;

                &:last-child {
                    margin-right: 0;
                }

                &:hover {
                    color: var(--color-master);
                }
            }
        }
    }

    .selected {
        display: flex;
        padding: @space3 @space4;
        margin-bottom: @space4;
        font-size: var(--font-size-content);
        background-color: var(--color-master-light-4);
        border: 1px solid var(--color-master-light-3);
        justify-content: space-between;
        align-items: center;

        .selected-left {
            .anticon-info-circle {
                margin-right: @space2;
                color: var(--color-master);
            }

            span.global-master-color {
                font-weight: bold;
            }

            .tip {
                margin-left: @space5;
            }
        }

        .selected-right {
            display: flex;

            span {
                margin-left: @space5;
                cursor: pointer;
            }
        }
    }

    #global-table {
        background-color: #fff;
    }

    :deep(.ant-table) {
        .ant-table-thead > tr > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan]):before {
            display: none;
        }
    }
}
</style>
<style lang="less">
.ant-dropdown.density {
    .ant-dropdown-menu-item.active {
        background-color: var(--color-master-light-4);

        span {
            color: var(--color-master);
        }
    }
}
</style>
