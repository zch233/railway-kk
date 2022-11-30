<script name="GupoTopTabs" setup>
/**
 * GupoTopTabs
 * https://www.antdv.com/components/tabs-cn/#Tabs.TabPane
 * @param { Boolean } modelValue     当前激活 tab 面板的 key
 * @param { Array }   options        tab 面板列表
 * @param { Boolean } appendToLayout 是否放入 layout
 * @param { Boolean } forceRender    被隐藏时是否渲染 DOM 结构
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { GupoTabs } from '@src/components/UI/index.js';
import { useStoreSetting } from '@src/store/modules/setting';

const storeSetting = useStoreSetting();

const display = ref(false);

const props = defineProps({
    modelValue: {
        type: String || Number,
    },
    options: {
        type: Array,
        default: () => [],
    },
    appendToLayout: {
        type: Boolean,
        default: false,
    },
    forceRender: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['update:modelValue']);

/**
 * data
 */
const topTabsRef = ref();

/**
 * computed
 */
const activeKey = computed({
    get() {
        return props.modelValue;
    },
    set(newVal) {
        emits('update:modelValue', newVal);
    },
});

onMounted(() => {
    display.value = true;
    if (!props.appendToLayout) return;
    document.querySelector('.content-top').appendChild(topTabsRef.value);
});

onBeforeUnmount(() => {
    if (!props.appendToLayout) return;
    topTabsRef.value.parentNode.removeChild(topTabsRef.value);
});
</script>

<template>
    <transition :name="storeSetting.animateType" mode="out-in">
        <div class="gupo-top-tabs" v-show="display" ref="topTabsRef">
            <GupoTabs
                v-model:activeKey="activeKey"
                v-bind="{
                    ...$attrs,
                }"
            >
                <GupoTabs.TabPane v-for="{ label, name } in options" :key="name" :tab="label" :forceRender="forceRender">
                    <slot :name="name" />
                </GupoTabs.TabPane>
            </GupoTabs>
            <!-- 默认插槽 -->
            <slot />
        </div>
    </transition>
</template>

<style lang="less" scoped>
.gupo-top-tabs {
    width: 100%;

    :deep(.ant-tabs) {
        .ant-tabs-nav {
            margin-bottom: 0;
            background: #fff;

            &::before {
                display: none;
            }
        }

        .ant-tabs-nav-list {
            padding: 0 calc(var(--base-space) * 6);
        }

        .ant-tabs-tab {
            padding: 16px 10px 10px;
        }
    }
}
</style>
