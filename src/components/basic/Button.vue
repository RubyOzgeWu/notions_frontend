<template>
  <el-button :type="type" @click="$emit('click')">
    <slot></slot>
  </el-button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "success",
  },
});
defineEmits(["click"]);
</script>
