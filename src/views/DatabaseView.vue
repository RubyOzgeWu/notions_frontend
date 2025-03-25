<template>
  <Layout>
    <Title class="text-primary">{{ database?.title[0]?.text?.content }}</Title>
    <div class="content flex-1 flex md:gap-20 lg:gap-32 overflow-hidden w-full">
      <!-- 任務清單 -->
      <div class="flex basis-[35%] flex-col">
        <h4 class="text-black-50 mb-6">任務清單</h4>
        <div class="flex gap-2 mb-4">
          <SearchBar @search="handleSearch" />
        </div>
        <div class="overflow-y-scroll">
          <div class="flex flex-col gap-6">
            <CardTask
              v-for="item in filteredPages"
              :key="item.id"
              :id="item.id"
              :database-id="item.parent.database_id"
              :title="item.properties.Name.title[0]?.plain_text"
              :date="item.properties['Due Date']?.date?.start"
              :status="item.properties.Status.status?.name"
            ></CardTask>
          </div>
        </div>
      </div>

      <!-- 新增任務 -->
      <div class="flex basis-[65%] flex-col">
        <h4 class="text-black-50 mb-4">新增任務</h4>
        <div class="h-full">
          <FormAdd
            v-model="pageForm"
            @submit="addPage"
            class="h-full overflow-y-scroll"
          ></FormAdd>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import { ElLoading } from "element-plus";

import {
  apiGetDatabase,
  apiGetDatabasePages,
  apiPostDatabasePage,
  apiDeleteDatabasePage,
} from "@/api/api.js";

const route = useRoute();
const databaseId = computed(() => route.params.databaseId);

const database = ref(null);
const dbPages = ref(null);

const pageForm = reactive({
  title: "",
  due_date: "",
  ticket: "",
  description: "",
  todo_list: [],
});

const searchKeyword = ref("");

const filteredPages = computed(() => {
  if (!searchKeyword.value) return dbPages.value;

  return dbPages.value.filter((item) => {
    const title = item.properties.Name.title[0]?.plain_text || "";
    return title.toLowerCase().includes(searchKeyword.value.toLowerCase());
  });
});

/* Functions */
// 搜尋
const handleSearch = (keyword) => {
  searchKeyword.value = keyword;
};

// 取得資料庫 MetaData
const getDatabase = async () => {
  try {
    const response = await apiGetDatabase(databaseId.value);
    database.value = response.data;
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};
// 取得資料庫所有文件
const getPages = async () => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: "資料載入中...",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    const response = await apiGetDatabasePages(databaseId.value);
    dbPages.value = response.data.results.slice().sort((a, b) => {
      const dateA = a.properties["Due Date"]?.date?.start;
      const dateB = b.properties["Due Date"]?.date?.start;

      if (!dateA && dateB) return 1;
      if (dateA && !dateB) return -1;
      if (!dateA && !dateB) return 0;

      return new Date(dateA).getTime() - new Date(dateB).getTime();
    });
  } catch (error) {
    console.error("API 請求失敗:", error);
  } finally {
    loadingInstance.close();
  }
};

// 新增資料庫文件
const addPage = async () => {
  try {
    const response = await apiPostDatabasePage(databaseId.value, pageForm);
    if (response.status === 200) {
      getPages();
      pageForm.title = "";
      pageForm.due_date = "";
    }
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};

// 刪除資料庫文件
const deletePage = async (pageId) => {
  try {
    const response = await apiDeleteDatabasePage(pageId);
    if (response.status === 200) {
      getPages();
    }
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};

onMounted(() => {
  getDatabase();
  getPages();
});

watch(
  () => route.params.databaseId,
  () => {
    getDatabase();
    getPages();
  }
);
</script>
