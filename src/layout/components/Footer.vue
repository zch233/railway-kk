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
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: @space4 0 0;
    padding-bottom: 10px;
    font-size: 12px;
    line-height: 18px;
    color: @FontColor2;
    text-align: center;

    img {
        width: 15px;
        margin-right: 4px;
    }

    div:first-child {
        margin-bottom: @space2;
    }
}
</style>
