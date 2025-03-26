<template>
  <el-dropdown @command="handleSelect">
    <div
      class="cursor-pointer flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100"
    >
      <span
        class="w-2 h-2 rounded-full"
        :style="{ backgroundColor: selected?.color || '#ccc' }"
      ></span>
      <span>{{ selected?.label || props.default }}</span>
      <el-icon class="ml-1"><ArrowDown /></el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in options"
          :key="item.value"
          :command="item.value"
          class="flex items-center gap-2"
        >
          <span
            class="w-2 h-2 rounded-full"
            :style="{ backgroundColor: item.color }"
          ></span>
          <span>{{ item.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { computed } from "vue";
import { ArrowDown } from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: String,
  options: {
    type: Array,
    default: () => [],
  },
  default: {
    type: String,
  },
});

const emit = defineEmits(["update:modelValue"]);

const selected = computed(() =>
  props.options.find((opt) => opt.value === props.modelValue)
);

function handleSelect(value) {
  emit("update:modelValue", value);
}
</script>

<!-- <style scoped>
.el-dropdown-item:hover {
  background-color: #f5f7fa !important;
}
</style> -->
