<template>
  <el-card :style="{ width: width }" class="px-2 relative">
    <button
      class="absolute top-2 right-2 text-gray-400 hover:text-secondary hover:cursor-pointer"
      @click="handleDelete"
    >
      <el-icon>
        <Close />
      </el-icon>
    </button>

    <div class="flex justify-between gap-4">
      <div class="flex flex-1 flex-col gap-2">
        <router-link
          class="text-[1rem] font-bold text-primary-100"
          :to="{ name: 'task', params: { databaseId, taskId: id } }"
          >{{ title }}</router-link
        >
        <span class="text-black-50">{{ date }}</span>
      </div>

      <!-- 任務狀態 -->
      <div>
        <p class="flex justify-end">
          <span
            class="rounded-full py-2 px-2.5 text-white leading-1.5 text-[0.875rem]"
            :class="statusBg"
            >{{ status }}</span
          >
        </p>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from "vue";
import { Close } from "@element-plus/icons-vue";

const props = defineProps({
  title: String,
  date: String,
  width: String,
  status: String,
  id: String,
  databaseId: String,
});

const emit = defineEmits(["delete"]);

const statusBg = computed(() => {
  switch (props.status) {
    case "Done":
      return "bg-success";
    case "In progress":
      return "bg-primary";
    case "Not started":
      return "bg-white-60";
  }
});

const handleDelete = () => {
  emit("delete", props.id);
};
</script>
