<template>
    <div class="search">
        <GlobalContent title="公共内容">
            <template #content>
                <GlobalEmpty />
            </template>
        </GlobalContent>
    </div>
</template>

<script setup>
import GlobalContent from '@src/components/GlobalContent/index.vue';
import GlobalEmpty from '@src/components/GlobalEmpty/index.vue';
</script>

<style lang="less" scoped>
.search {
    margin: @space6;
}
</style>
