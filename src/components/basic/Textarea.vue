<template>
  <el-mention
    v-bind="props"
    :modelValue="modelValue"
    type="textarea"
    placeholder="請輸入描述"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>
