<template>
    <div class="follow-up">
        <a-input-number id="inputNumber" v-model:value="nums.min" :min="0" :max="numsMinMax" placeholder="跟进次数最小值" />
        <span class="line">—</span>
        <a-input-number id="inputNumber" v-model:value="nums.max" :min="numsManMin" placeholder="跟进次数最大值" />
    </div>
</template>

<script name="FollowUp" setup>
/**  @description:跟进次数  **/

const emits = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
});

const nums = reactive({
    min: '',
    max: '',
});

// 跟进最小值的最大值max
const numsMinMax = computed(() => {
    if (nums.max) {
        return nums.max - 1;
    } else {
        return 10000;
    }
});

// 跟进最大值的最小值min
const numsManMin = computed(() => {
    if (nums.min) {
        return nums.min + 1;
    } else {
        return 1;
    }
});

watch(
    () => props.modelValue,
    val => {
        nums.min = val[0];
        nums.max = val[1];
    },
    {
        immediate: true,
    }
);
watch(
    () => nums,
    val => {
        emits('update:modelValue', [val.min, val.max]);
    },
    {
        deep: true,
    }
);
</script>
<style lang="less" scoped>
.follow-up {
    display: flex;
    justify-content: space-between;
    align-items: center;

    :deep(.ant-input-number) {
        width: 45%;
    }

    .line {
        font-weight: bold;
        color: #d9d9d9;
    }
}
</style>
