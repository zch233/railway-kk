<template>
    <div class="global-table">
        <div class="top-area" v-if="isTopOperation">
            <div class="left">{{ tableTitle }}</div>
            <div class="right">
                <slot name="operation"> </slot>
                <GupoDivider type="vertical" />
                <div class="operation-icon">
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
                <!-- <div class="operation-icon" @click="fullscreenHandle">
                    <GupoTooltip>
                        <template #title>放大</template>
                        <FullscreenOutlined />
                    </GupoTooltip>
                </div> -->
                <div class="operation-icon" @click="refresh">
                    <GupoTooltip>
                        <template #title>刷新</template>
                        <ReloadOutlined />
                    </GupoTooltip>
                </div>
                <div class="operation-icon">
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
                <span class="tip"> <slot name="selected-tip"></slot> </span>
            </div>
            <div class="selected-right">
                <span v-if="!hiddenCancelSelected" class="global-master-color" @click="cancelSelected">取消选择</span>

                <!-- cancelSelected: 取消选择； item：选中行-->
                <slot name="selected-operation" :cancelSelected="cancelSelected" :item="selectedDataSource"></slot>
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
            >
                <template #headerCell="{ title, column }">
                    <slot name="headerCell" :column="column" :title="title"></slot>
                </template>
                <template #bodyCell="{ text, record, index, column }">
                    <slot name="bodyCell" :column="column" :text="text" :index="index" :record="record"></slot>
                </template>
                <template #title v-if="title">
                    <slot name="title"></slot>
                </template>
                <template #footer v-if="footer">
                    <slot name="footer"></slot>
                </template>
                <template #summary v-if="summary">
                    <slot name="summary"></slot>
                </template>
                <template #emptyText v-if="emptyText">
                    <slot name="emptyText"></slot>
                </template>
                <template #expandedRowRender v-if="expandedRowRender">
                    <slot name="expandedRowRender"></slot>
                </template>
                <template #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" v-if="customFilterDropdown">
                    <slot
                        name="customFilterDropdown"
                        :setSelectedKeys="setSelectedKeys"
                        :selectedKeys="selectedKeys"
                        :confirm="confirm"
                        :clearFilters="clearFilters"
                        :column="column"
                    ></slot>
                </template>
                <template #customFilterIcon="{ filtered, column }" v-if="customFilterIcon">
                    <slot name="customFilterIcon" :filtered="filtered" :column="column"></slot>
                </template>
            </GupoTable>
        </div>
    </div>
</template>

<script setup>
import { GupoTable, GupoDivider, GupoDropdown, GupoMenu, GupoTooltip } from '@src/components/UI/index.js';
// FullscreenOutlined
import { ReloadOutlined, ColumnHeightOutlined, InfoCircleFilled } from '@ant-design/icons-vue';
import ColumnSetting from './ColumnSetting.vue';

import { reactive, ref, computed, toRefs, onMounted } from 'vue';
import { cloneDeep } from 'lodash';

const emits = defineEmits(['change', 'selectChange']);
const props = defineProps({
    isTopOperation: {
        type: Boolean,
        default: true,
    },
    tableTitle: {
        type: String,
        default: '应用列表',
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

const { pageNames, sortNames, sortOrder } = toRefs(props);

const defaultMeta = {
    current_page: 1,
    per_page: props?.pagination?.defaultPageSize ? props.pagination.defaultPageSize : 10,
};
let meta = reactive({ ...defaultMeta });

onMounted(() => {
    getList();
});

const change = (data, filters, sorter) => {
    const { current, pageSize } = data;
    meta.current_page = current;
    meta.per_page = pageSize;
    getList(sorter, filters);
    emits('change', { data, filters, sorter });
    selectedData.rowKeys = [];
};

// 刷新 传参: 不恢复到默认页码;
const refresh = flag => {
    if (!flag) {
        const { current_page } = defaultMeta;
        meta.current_page = current_page;
    } else if (tableData.dataSource.length === 1 && meta.current_page > 1) {
        // 当删除只有最后一条数据时，并且不是最后一页，页码 -1
        meta.current_page -= 1;
    }
    getList();
    selectedData.rowKeys = [];
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
const defineColumns = ref(props.columns);
const columnSettingOptions = computed(() => props.columns.map(item => item.title));

const changeOption = options => {
    defineColumns.value = props.columns.filter(v => options.includes(v.title));
};

// 放大
/* const fullscreenHandle = () => {
    let element = document.getElementById('global-table');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
    }
}; */

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
    padding: @globalSpace @space8 @space2;
    background-color: #fff;
    box-shadow: 0px 0px 15px rgba(148, 161, 196, 0.25);

    .top-area {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: @space4;

        .right {
            .operation-icon {
                display: inline-block;
                margin: 0 @space2;

                &:last-child {
                    margin-right: 0;
                }

                &:hover {
                    color: @masterColor;
                }
            }
        }
    }

    .selected {
        display: flex;
        padding: @space3 @space4;
        margin-bottom: @space4;
        font-size: 14px;
        background-color: @masterColor-light-4;
        border: 1px solid @masterColor-light-3;
        justify-content: space-between;
        align-items: center;

        .selected-left {
            .anticon-info-circle {
                margin-right: @space2;
                color: @masterColor;
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
}
</style>
<style lang="less">
.ant-dropdown.density {
    .ant-dropdown-menu-item.active {
        background-color: @masterColor-light-4;

        span {
            color: @masterColor;
        }
    }
}
</style>
