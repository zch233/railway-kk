<template>
    <transition :name="storeSetting.animateType" mode="out-in">
        <div class="gupo-go-back" v-show="display" ref="goBackRef">
            <div class="gupo-go-back__item" @click="handleGoBack" v-if="showGoBack">
                <arrow-left-outlined />
                <span>{{ title || route.meta.title }}</span>
            </div>
            <slot></slot>
        </div>
    </transition>
</template>

<script name="GupoGoBack" setup>
/**
 * GupoGoBack
 * @param { Boolean } title          标题
 * @param { Boolean } showGoBack     是否展示返回按钮
 * @param { Boolean } appendToLayout 是否放入 layout
 */
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import { useStoreSetting } from '@src/store/modules/setting';
const route = useRoute();
const router = useRouter();
const storeSetting = useStoreSetting();

const display = ref(false);

const props = defineProps({
    title: {
        type: String,
        default: '',
    },
    showGoBack: {
        type: Boolean,
        default: true,
    },
    appendToLayout: {
        type: Boolean,
        default: false,
    },
});

const goBackRef = ref();
const handleGoBack = () => {
    router.go(-1);
};

onMounted(() => {
    display.value = true;
    if (!props.appendToLayout) return;
    document.querySelector('.content-top').appendChild(goBackRef.value);
});

watch(
    () => route.path,
    () => {
        if (!props.appendToLayout) return;
        goBackRef.value.parentNode.removeChild(goBackRef.value);
    }
);
</script>

<style lang="less" scoped>
.gupo-go-back {
    width: 100%;
    background: #fff;
    box-shadow: 0 5px 5px rgba(148, 161, 196, 0.1);

    &__item {
        display: inline-block;
        height: 60px;
        padding: 0 @space6;
        font-size: 18px;
        line-height: 60px;
        color: var(--font-color-1);
        cursor: pointer;

        span:last-child {
            margin-left: @space2;
        }
    }
}
</style>
