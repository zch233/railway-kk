<script setup name="GupoTabSelector">
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
    },
    options: {
        type: Array,
        default: () => [],
    },
});
const emit = defineEmits(['update:modelValue']);

/**
 * data
 */
const current = ref('');

/**
 * watch
 */
watch(
    () => props.modelValue,
    () => {
        current.value = props.modelValue;
    },
    {
        immediate: true,
    }
);

const handleClick = value => {
    current.value = value;
    emit('update:modelValue', value);
};
</script>

<template>
    <div class="gupo-tab-selector">
        <span v-for="(item, i) in props.options" :key="i" :class="{ active: current === item.value }" @click="handleClick(item.value)">
            {{ item.label }}
        </span>
    </div>
</template>

<style lang="less" scoped>
.gupo-tab-selector {
    display: flex;
    margin-right: 12px;

    span {
        display: inline-block;
        padding: 0 8px;
        font-size: 14px;
        line-height: 32px;
        cursor: pointer;
        transition: color 0.3s ease;
        user-select: none;

        &.active {
            color: var(--color-master);
        }
    }
}
</style>
