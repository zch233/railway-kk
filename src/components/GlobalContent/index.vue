<template>
    <div class="global-content">
        <div class="title-content">
            <div class="left-title">
                <span class="line" :style="{ backgroundColor: lineColor }"></span>
                <span class="title">{{ title }}</span>
            </div>
            <div class="right-operation">
                <slot name="rightTitle"></slot>
            </div>
        </div>
        <div class="show-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup>
/**  @description:公共标题  **/
defineProps({
    title: {
        type: String,
        default: '',
    },
    lineColor: {
        type: String,
        default: '',
    },
});
</script>
<style lang="less" scoped>
.global-content {
    margin-bottom: @space5;
    background-color: #fff;

    .title-content {
        display: flex;
        padding: @space4 @space6;
        border-bottom: 1px solid @borderColor;
        align-items: center;
        justify-content: space-between;

        .left-title {
            display: flex;
            align-items: center;

            .title {
                font-size: 18px;
            }

            .line {
                display: inline-block;
                width: 3px;
                height: 18px;
                margin-right: @space2;
                background-color: @masterColor;
            }
        }
    }

    .show-content {
        padding: @space5 @space6;
    }
}
</style>
