<template>
  <el-form :model="form" class="flex flex-col">
    <el-form-item label="標題" class="flex flex-col items-start">
      <Input v-model="form.title" />
    </el-form-item>

    <div class="flex gap-8">
      <el-form-item label="日期" class="flex flex-col items-start">
        <DatePicker v-model="form.due_date" />
      </el-form-item>

      <el-form-item label="優先級" class="flex flex-col items-start">
        <DropdownSelect
          class="flex-3"
          v-model="form.priority"
          :options="priorityOptions"
          size="default"
          :default="'Please select'"
        >
        </DropdownSelect>
      </el-form-item>
    </div>

    <el-form-item label="任務單" class="flex flex-col items-start">
      <Input v-model="form.ticket" />
    </el-form-item>

    <el-form-item label="描述" class="flex flex-col items-start">
      <Textarea v-model="form.description"></Textarea>
    </el-form-item>

    <el-form-item label="待辦事項" class="flex flex-col items-start grow-1">
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
// import Input from "../basic/Input.vue";
// import Textarea from "../basic/Textarea.vue";
// import DatePicker from "../basic/DatePicker.vue";
// import Button from "../basic/Button.vue";

const props = defineProps({
  modelValue: Object,
});
const emit = defineEmits(["update:modelValue", "submit"]);

const priorityOptions = [
  { label: "P1", value: "P1", color: "#ff4d4f" },
  { label: "P2", value: "P2", color: "#4e75af" },
  { label: "P3", value: "P3", color: "#4dc58b" },
];

const form = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<style>
.el-form-item__content {
  @apply w-full;
}
</style>
