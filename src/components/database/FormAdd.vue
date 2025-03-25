<template>
  <el-form :model="form" class="flex flex-col">
    <el-form-item label="標題" class="flex flex-col items-start">
      <Input v-model="form.title" />
    </el-form-item>

    <el-form-item label="日期" class="flex flex-col items-start">
      <DatePicker v-model="form.due_date" />
    </el-form-item>

    <el-form-item label="任務單" class="flex flex-col items-start">
      <Input v-model="form.ticket" />
    </el-form-item>

    <el-form-item label="描述" class="flex flex-col items-start">
      <Textarea v-model="form.description" />
    </el-form-item>

    <el-form-item
      label="待辦事項"
      class="editor flex flex-col items-start grow-1"
    >
      <TaskEditor v-model="form.todo_list" />
    </el-form-item>

    <el-form-item>
      <Button @click="$emit('submit')">新增任務</Button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { computed } from "vue";

import TaskEditor from "../editor/TaskLists.vue";
import Input from "../basic/Input.vue";
import Textarea from "../basic/Textarea.vue";
import DatePicker from "../basic/DatePicker.vue";
import Button from "../basic/Button.vue";

const props = defineProps({
  modelValue: Object,
});
const emit = defineEmits(["update:modelValue", "submit"]);

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<style>
.el-form-item__content {
  @apply w-full;
}
.editor .el-form-item__content {
  @apply flex-col;
  border: 1px solid var(--el-border-color);
  border-radius: 0.5rem;
}

.editor.is-focused .el-form-item__content {
  border-color: var(--el-color-primary);
}
</style>
