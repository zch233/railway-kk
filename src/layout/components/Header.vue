<template>
    <a-layout-header class="header box-shadow">
        <div class="header-left">
            <div class="header-left__logo">
                <img src="../../assets/logo.png" />
                <span>萧山</span>
            </div>
            <div class="header-left__text">标准后台模板</div>
        </div>
    </a-layout-header>
</template>

<script setup></script>

<style lang="less" scoped>
.header {
    width: 100%;
    padding: 0 10px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: width 0.3s ease;
    z-index: 99;
    &-left {
        display: flex;
        align-items: center;
        &__logo {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 198px;
            img {
                width: 120px;
            }
            span {
                display: inline-block;
                line-height: 1;
                padding: 3px 8px;
                margin-right: 15px;
                color: #fff;
                background: var(--ant-primary-color);
                border-radius: 2px;
            }
        }
        &__text {
            line-height: 1;
            padding: 0 15px;
            font-size: 15px;
            border-left: 1px solid #d5d9de;
        }
    }
}
</style>
