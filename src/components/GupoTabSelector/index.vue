<template>
    <div class="gupo-tab-selector">
        <span v-for="(item, i) in props.options" :key="i" :class="modelValue === item.value ? 'active' : ''" @click="value = item.value">
            {{ item.label }}
        </span>
    </div>
</template>

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
const value = ref('');

/**
 * watch
 */
watch(
    () => props.modelValue,
    val => {
        value.value = val;
    },
    {
        immediate: true,
    }
);
watch(
    () => value.value,
    val => {
        emit('update:modelValue', val);
    },
    {
        immediate: true,
    }
);
</script>

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
