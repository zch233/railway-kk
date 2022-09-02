<template>
    <div class="global-empty">
        <a-empty :image="image" :image-style="imgageStyle" :description="description" />
    </div>
</template>

<script setup>
/**  @description:空状态  **/
import empty from '@src/assets/images/empty.png';

defineProps({
    description: {
        type: String,
        default: '暂无内容',
    },
    image: {
        type: String,
        default: empty,
    },
    imgageStyle: {
        type: Object,
        default: () => ({}),
    },
});
</script>
<style lang="less" scoped>
.global-empty {
    margin: @space8 0;

    :deep(.ant-empty-description) {
        color: @textColor-second;
    }
}
</style>
