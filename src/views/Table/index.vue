<template>
    <div class="business">
        <GlobalSearch
            @search="firstLoad()"
            :formData="searchData.formData"
            @update:formData="Object.assign(searchData.formData, $event)"
            :configItem="searchData.configItem"
            ref="$globalSearch"
        />
        <GlobalTable ref="$globalTable" :columns="columns" bordered :listApi="getList" :rowSelection="false" tableTitle="B超列表">
            <template #operation>
                <a-button type="primary" v-permission="'demo'">
                    <template #icon><PlusOutlined /></template>
                    自定义指令
                </a-button>
            </template>
            <!-- 表格插槽 -->
            <template #bodyCell="{ record, column }">
                <div v-if="column.key === 'operation'">
                    <span class="global-master-color" @click="goPage('Organization.Detail', record.id)">查看详情</span>
                </div>
            </template>
        </GlobalTable>
    </div>
</template>

<script setup>
/**  @description:列表模板  **/
import GlobalSearch from '@src/components/GlobalSearch/index.vue';
import GlobalTable from '@src/components/GlobalTable/index.vue';
import { PlusOutlined } from '@ant-design/icons-vue';

import { columns, configData } from './index.js';

const router = useRouter();
/* 
    data
*/

const searchData = configData().searchData;
const $globalTable = ref(null);
/* 
    methods
*/
const firstLoad = flag => {
    $globalTable.value.refresh(flag);
};

const getList = async listData => {
    console.log('listData :>> ', listData);
    // return await orgList({
    //     ...searchData.formData,
    //     ...listData,
    // });
};

const goPage = (name, id) => {
    router.push({
        name,
        query: { id },
    });
};
</script>
<style lang="less" scoped>
.business {
    padding: @space6;
}
</style>
