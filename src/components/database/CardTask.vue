<template>
  <el-card :style="{ width: width }" class="px-2">
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

const props = defineProps({
  title: String,
  date: String,
  width: String,
  status: String,
  id: String,
  databaseId: String,
});

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
</script>