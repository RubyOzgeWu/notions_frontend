<template>
  <el-checkbox
    class="custom-checkbox"
    v-bind="props"
    :modelValue="modelValue"
    :label="label"
    @change="$emit('update:modelValue', $event)"
  />
</template>
<script setup>
const props = defineProps({
  modelValue: Boolean,
  label: String,
});
defineEmits(["update:modelValue"]);
</script>

<style>
.el-checkbox {
  @apply scale-[1.25] origin-top-left;
}
</style>
