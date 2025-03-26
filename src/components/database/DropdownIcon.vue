<template>
  <el-dropdown @command="handleFilter" trigger="click" class="items-center">
    <span class="el-dropdown-link cursor-pointer scale-[1.25]">
      <el-icon><Operation /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="option in options"
          :key="option.value"
          :command="option.value"
          :style="{ color: option.color }"
          class="p-0"
        >
          <span
            class="bg-red"
            :style="{ backgroundColor: option.color, color: '#fff' }"
          >
            {{ option.label }}
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { Operation } from "@element-plus/icons-vue";

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:filter"]);

function handleFilter(command) {
  emit("update:filter", command);
}
</script>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item) {
  span {
    @apply flex-1 rounded-[0.25rem] text-center;
    padding: 0 0.5rem;
  }
}
</style>
