<template>
    <div class="table container">
        <GlobalTable :columns="columns" :listApi="getList">
            <template #operation>
                <a-button type="primary" @click="addVisible = true">
                    <template #icon><PlusOutlined /></template>
                    新建
                </a-button>
            </template>
            <template #bodyCell="{ record, column }">
                <div v-if="column.key === '4'">
                    <span class="status" v-if="record['4'] === 0">关闭</span>
                    <span class="status primary" v-if="record['4'] === 1">运行中</span>
                    <span class="status success" v-if="record['4'] === 2">已上线</span>
                    <span class="status error" v-if="record['4'] === 3">异常</span>
                </div>
                <div v-if="column.key === 'operation'">
                    <div class="operate">
                        <span class="pointer">配置</span>
                        <span class="pointer error">删除</span>
                    </div>
                </div>
            </template>
        </GlobalTable>
        <Add v-model:modelVisible="addVisible" />
    </div>
</template>

<script setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import GlobalTable from '@src/components/GlobalTable/index.vue';
import Add from './component/Add.vue';

const addVisible = ref(false);

const columns = [
    {
        title: '规则编号',
        dataIndex: '1',
        key: '1',
    },
    {
        title: '描述',
        dataIndex: '2',
        key: '2',
    },
    {
        title: '服务调用次数',
        dataIndex: '3',
        key: '3',
    },
    {
        title: '状态',
        dataIndex: '4',
        key: '4',
    },
    {
        title: '更新时间',
        dataIndex: '5',
        key: '5',
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        props: {
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
            ],
        },
    },
];

const getList = async listData => {
    console.log('listData：', listData);
    const { page, per_page } = listData;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: {
                    list: new Array(per_page).fill({}).map((item, i) => {
                        return {
                            1: 'TradeCode' + (i + (page - 1) * per_page + 1),
                            2: '这是一段描述，关于这个应用的描述文字内容',
                            3: '357 万',
                            4: parseInt(Math.random() * 4),
                            5: '2021-10-30  23:12:00',
                        };
                    }),
                    paginate: { total: 99 },
                },
            });
        }, 800);
    });
};
</script>

<style lang="less" scoped></style>
