<template>
    <div class="footer">
        <div>
            <img src="../../assets/images/footer_logo.png" />
            <span>健康大脑 · 萧山</span>
        </div>
        <div>
            <span>古珀医疗科技有限公司出品</span>
        </div>
    </div>
</template>

<script setup></script>

<style lang="less" scoped>
.footer {
    color: @FontColor2;
    font-size: 12px;
    line-height: 18px;
    padding: @space16 0 0;
    text-align: center;
    img {
        width: 15px;
        margin-right: 4px;
    }
    div:first-child {
        margin-bottom: @space8;
    }
}
</style>
