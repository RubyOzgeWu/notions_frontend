<template>
  <section>
    <router-link :to="{ name: 'database', params: { databaseId } }"
      >返回資料庫</router-link
    >
    <h3>更新資料庫文件</h3>
    <el-form :model="pageForm">
      <el-form-item label="標題">
        <el-input v-model="pageForm.title" />
        <el-date-picker
          v-model="pageForm.due_date"
          type="date"
          placeholder="Pick a day"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="updatePage(databaseId, pageId, pageForm)"
          >更新資料庫</el-button
        ></el-form-item
      >
    </el-form>
    <h3>取得 Notion 資料庫文件</h3>
    <pre v-if="dbPage">{{ dbPage }}</pre>
  </section>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { apiGetDatabasePage, apiPatchDatabasePage } from "@/api/api.js";
import { onMounted } from "vue";

const route = useRoute();

const databaseId = route.params.databaseId;
const pageId = route.params.taskId;

const dbPage = ref(null);
const pageForm = reactive({
  title: "",
  due_date: "",
  status: "In progress",
});

/* 取得資料庫文件 */
const getPage = async () => {
  try {
    const response = await apiGetDatabasePage(pageId);
    dbPage.value = response.data;
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};
/* 更新資料庫文件 */
const updatePage = async () => {
  try {
    const response = await apiPatchDatabasePage(databaseId, pageId, pageForm);
    if (response.status === 200) {
      getPage();
      pageForm.title = "";
      pageForm.due_date = "";
    }
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};

onMounted(() => {
  getPage();
});
</script>
