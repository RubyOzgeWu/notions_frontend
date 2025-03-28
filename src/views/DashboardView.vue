<template>
  <Layout>
    <Title class="text-primary">我的主控板</Title>
    <div class="content flex-1 flex md:gap-20 lg:gap-32 overflow-hidden w-full">
      <!-- overview -->
      <div class="flex flex-1 overflow-scroll flex-col gap-12">
        <!-- 任務數量 -->
        <div class="flex flex-col w-full gap-6">
          <router-link
            :to="{
              name: 'database',
              params: { databaseId: dspDatabaseId },
            }"
          >
            <CardCount
              :title="'DSP'"
              :count="countPages(dspDatabase)"
            ></CardCount>
          </router-link>

          <router-link
            :to="{
              name: 'database',
              params: { databaseId: sspDatabaseId },
            }"
          >
            <CardCount
              :title="'SSP'"
              :count="countPages(sspDatabase)"
            ></CardCount>
          </router-link>
        </div>
        <!-- 待辦事項 -->
        <div class="flex-1 w-full max-h-[60vh]">
          <ListTodo
            :data="allDatabase"
            @update-status="handleStatusUpdate"
          ></ListTodo>
        </div>
      </div>

      <!-- calendar -->
      <Calendar class="flex-2"></Calendar>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElLoading } from "element-plus";

import { apiGetDatabasePages, apiPatchDatabasePage } from "@/api/api.js";

const dspDatabaseId = import.meta.env.VITE_DSP_DATABASE_ID;
const sspDatabaseId = import.meta.env.VITE_SSP_DATABASE_ID;

const dspDatabase = ref([]);
const sspDatabase = ref([]);

const allDatabase = ref([]);

/* Functions */
// 取得資料庫所有文件
const getDatabase = async (databaseId, database) => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: "資料載入中...",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    const response = await apiGetDatabasePages(databaseId);
    const filtered = response.data.results.filter(
      (item) => item.properties.Status?.status?.name !== "Done"
    );

    database.value = filtered;
    allDatabase.value = [...allDatabase.value, ...database.value];
    allDatabase.value.sort((a, b) => {
      const dateA = a.properties["Due Date"]?.date?.start;
      const dateB = b.properties["Due Date"]?.date?.start;

      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      return new Date(dateA) - new Date(dateB);
    });
  } catch (error) {
    console.error("API 請求失敗:", error);
  } finally {
    loadingInstance.close();
  }
};

// 計算資料庫文件數量
const countPages = (database) => {
  if (database) {
    return database.length;
  }
  return 0;
};

// 更新任務狀態
const handleStatusUpdate = async (item, isChecked) => {
  const statusValue = isChecked ? "Done" : "Not started";
  const data = {
    status: statusValue,
  };

  try {
    const databaseId = item.parent.database_id;
    await apiPatchDatabasePage(databaseId, item.id, data);
  } catch (error) {
    console.error("更新失敗：", error);
  }
};

onMounted(() => {
  getDatabase(dspDatabaseId, dspDatabase);
  getDatabase(sspDatabaseId, sspDatabase);
});
</script>
