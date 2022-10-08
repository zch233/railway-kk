<template>
    <div class="reload-view">
        <RedoOutlined @click="handleReload" />
    </div>
</template>

<script setup>
import { RedoOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

const handleReload = () => {
    router.push({
        path: '/redirect' + unref(route).path,
        query: route.query,
        replace: true,
    });
};
</script>

<style lang="less" scoped>
.reload-view {
    font-size: 24px;
    color: var(--ant-primary-color);
    cursor: pointer;
}
</style>
