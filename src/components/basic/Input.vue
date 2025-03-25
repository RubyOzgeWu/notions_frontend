<template>
  <el-input
    v-bind="props"
    :modelValue="modelValue"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
  ></el-input>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>
