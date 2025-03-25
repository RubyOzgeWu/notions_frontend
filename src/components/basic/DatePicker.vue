<template>
  <el-date-picker
    v-bind="props"
    :modelValue="modelValue"
    class="w-full"
    type="date"
    placeholder="Pick a day"
    format="YYYY/MM/DD"
    value-format="YYYY-MM-DD"
    @update:modelValue="(val) => $emit('update:modelValue', val)"
  />
</template>

<script setup>
const props = defineProps({
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>
