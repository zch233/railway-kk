<template>
    <div class="top-tabs">
        <GupoTopTabs v-model="tabsActive1" :options="tabsList1" appendToLayout />
        <GupoTopTabs v-model="tabsActive2" :options="tabsList2" animated>
            <template #doctor>doctor</template>
            <template #pharmacist>pharmacist</template>
            <template #nurse>nurse</template>
        </GupoTopTabs>
        <GupoTopTabs v-model="tabsActive2" :options="tabsList2">
            <template #defalut>使用默认插槽 当前选中：{{ tabsActive2 }}</template>
        </GupoTopTabs>
    </div>
</template>

<script setup>
import GupoTopTabs from '@src/components/GupoTopTabs/index.vue';

const tabsActive1 = ref('layout');
const tabsList1 = ref([
    {
        label: '加入到 Layout 中的1',
        name: 'layout',
    },
    {
        label: '加入到 Layout 中的2',
        name: 'layout1',
    },
]);

const tabsActive2 = ref('doctor');
const tabsList2 = ref([
    {
        label: '医生',
        name: 'doctor',
    },
    {
        label: '药师',
        name: 'pharmacist',
    },
    {
        label: '护士',
        name: 'nurse',
    },
]);
</script>

<style lang="less" scoped>
.top-tabs {
    .gupo-top-tabs {
        margin-top: @space6;
    }
}
</style>
