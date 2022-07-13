<template>
    <div class="go-back" v-if="showGoBack">
        <div @click="handleGoBack">
            <arrow-left-outlined />
            <span>{{ title }}</span>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
const route = useRoute();
const router = useRouter();

const title = computed(() => {
    return route.meta.title;
});
const showGoBack = computed(() => {
    return route.meta?.showGoBack || false;
});
const handleGoBack = () => {
    router.go(-1);
};
</script>

<style lang="less" scoped>
.go-back {
    height: 60px;
    padding: 0 @space24;
    font-size: 20px;
    line-height: 60px;
    color: @FontColor1;
    background: #fff;
    box-shadow: inset 0 5px 5px rgba(148, 161, 196, 0.1);

    div {
        display: inline-block;
        cursor: pointer;

        span:last-child {
            margin-left: @space8;
        }
    }
}
</style>
