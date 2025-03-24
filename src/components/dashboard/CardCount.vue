<template>
  <el-card :style="{ width: width }" class="px-6">
    <div class="flex items-end">
      <h3 class="text-secondary-100">{{ title }}</h3>
      <span class="pl-4 text-black-50">剩餘任務數</span>
    </div>
    <div class="flex items-end">
      <h3 class="text-primary-100">{{ count }}</h3>
      <span class="pl-2">件</span>
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  title: String,
  count: Number,
  width: String,
});
</script>

<style scoped>
:deep(.el-card__body) {
  @apply flex justify-between;
}
</style>
