<template>
    <div class="infinite-scroll container">
        <GupoCard title="默认">
            <GupoInfiniteScroll :height="400" :load="handleLoad1">
                <p v-for="(item, i) in loadList1" :key="i">{{ item }}</p>
            </GupoInfiniteScroll>
        </GupoCard>
        <GupoCard title="异步请求 Loading">
            <GupoInfiniteScroll :height="400" :load="handleLoad2" :showLoading="true">
                <p v-for="(item, i) in loadList2" :key="i">{{ item }}</p>
            </GupoInfiniteScroll>
        </GupoCard>
    </div>
</template>

<script setup>
import GupoInfiniteScroll from '@src/components/GupoInfiniteScroll/index.vue';
import GupoCard from '@src/components/GupoCard/index.vue';

const loadList1 = ref(new Array(10).fill(0).map((item, i) => i + 1));
const loadList2 = ref(new Array(10).fill(0).map((item, i) => i + 1));

const handleLoad1 = () => {
    loadList1.value.push(...new Array(10).fill(0).map((item, i) => loadList1.value.length + i + 1));
};

const handleLoad2 = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            loadList2.value.push(...new Array(10).fill(0).map((item, i) => loadList2.value.length + i + 1));
            console.log(loadList2.value);
            resolve();
        }, 1000);
    });
};
</script>

<style lang="less" scoped>
.infinite-scroll {
    p {
        line-height: 40px;
        color: #64a4fd;
        text-align: center;
        background: #edf5ff;
    }

    .gupo-card + .gupo-card {
        margin-top: @space4;
    }
}
</style>
