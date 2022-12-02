<template>
    <div class="search container">
        <GlobalSearch
            :formData="searchData1.formData"
            :itemConfigs="searchData1.itemConfigs"
            @update:formData="Object.assign(searchData1.formData, $event)"
            @search="gupoMessage.info('当前参数：' + JSON.stringify(searchData1.formData))"
        />
        <GlobalSearch :itemConfigs="searchData2.itemConfigs" @search="gupoMessage.info('当前参数：' + JSON.stringify($event))" />
        <GlobalSearch
            defaultOpen
            :formData="searchData3.formData"
            :itemConfigs="searchData3.itemConfigs"
            @update:formData="Object.assign(searchData3.formData, $event)"
            @search="gupoMessage.info('当前参数：' + JSON.stringify(searchData3.formData))"
        />
    </div>
</template>

<script setup>
import dayjs from 'dayjs';
import GlobalSearch from '@src/components/GlobalSearch/index.vue';
import CustomComp from './components/CustomComp.vue';
import { gupoMessage } from '@src/components/UI';

const searchData1 = {
    formData: reactive({
        name: undefined,
        algorithm: 'lru',
        type: undefined,
        num: [],
    }),
    itemConfigs: [
        {
            key: 'name',
            type: 'input',
            props: {
                placeholder: '请输入分组名称',
            },
        },
        {
            key: 'algorithm',
            type: 'select',
            props: {
                placeholder: '请选择关联算法',
                showSearch: true,
                options: [
                    {
                        label: 'LRU',
                        value: 'lru',
                    },
                    {
                        label: 'FIFO',
                        value: 'fifo',
                    },
                ],
            },
        },
        {
            key: 'type',
            type: 'select',
            props: {
                placeholder: '请选择分组类型',
                showSearch: true,
                options: [
                    {
                        label: '类型1',
                        value: '1',
                    },
                    {
                        label: '类型2',
                        value: '2',
                    },
                ],
            },
        },
        {
            key: 'num',
            type: 'custom',
            component: CustomComp,
        },
    ],
};
const searchData2 = {
    itemConfigs: [
        {
            key: 'name',
            type: 'input',
            props: {
                placeholder: '请输入分组名称',
            },
        },
        {
            key: 'algorithm',
            type: 'select',
            props: {
                placeholder: '请选择关联算法',
                showSearch: true,
                options: [
                    {
                        label: 'LRU',
                        value: 'lru',
                    },
                    {
                        label: 'FIFO',
                        value: 'fifo',
                    },
                ],
            },
        },
        {
            key: 'type',
            type: 'select',
            props: {
                placeholder: '请选择分组类型',
                showSearch: true,
                options: [
                    {
                        label: '类型1',
                        value: '1',
                    },
                    {
                        label: '类型2',
                        value: '2',
                    },
                ],
            },
        },
        {
            key: 'time',
            type: 'datePicker',
            props: {
                valueFormat: 'YYYY-MM-DD',
                placeholder: '请选择日期',
            },
        },
        {
            key: 'time_range',
            type: 'datePicker.rangePicker',
            props: {
                disabledDate: current => current && current > dayjs().endOf('day'),
                valueFormat: 'YYYY-MM-DD',
                placeholder: ['请选开始时间', '请选结束时间'],
            },
        },
    ],
};
const searchData3 = {
    formData: reactive({
        name: undefined,
        algorithm: undefined,
        type: undefined,
        time: '',
        time_range: [],
    }),
    itemConfigs: [
        {
            key: 'name',
            type: 'input',
            label: '分组名称',
            props: {
                placeholder: '请输入分组名称',
            },
        },
        {
            key: 'algorithm',
            type: 'select',
            label: '分组名称',
            props: {
                placeholder: '请选择关联算法',
                showSearch: true,
                options: [
                    {
                        label: 'LRU',
                        value: 'lru',
                    },
                    {
                        label: 'FIFO',
                        value: 'fifo',
                    },
                ],
            },
        },
        {
            key: 'type',
            type: 'select',
            label: '分组类型',
            props: {
                placeholder: '请选择分组类型',
                showSearch: true,
                options: [
                    {
                        label: '类型1',
                        value: '1',
                    },
                    {
                        label: '类型2',
                        value: '2',
                    },
                ],
            },
        },
        {
            key: 'time',
            type: 'datePicker',
            label: '日期',
            props: {
                valueFormat: 'YYYY-MM-DD',
                placeholder: '请选择日期',
            },
        },
        {
            key: 'time_range',
            type: 'datePicker.rangePicker',
            label: '时间段',
            props: {
                disabledDate: current => current && current > dayjs().endOf('day'),
                valueFormat: 'YYYY-MM-DD',
                placeholder: ['请选开始时间', '请选结束时间'],
            },
        },
    ],
};
</script>

<style lang="less" scoped></style>
