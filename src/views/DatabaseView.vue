<template>
  <div>目前資料庫 id: {{ databaseId }}</div>
  <router-link to="/">返回首頁</router-link>

  <h3>1. 取得 Notion 資料庫 MetaData</h3>
  <button @click="getDatabase">取得資料庫 MetaData</button>
  <pre v-if="database">{{ database }}</pre>

  <h3>2. 取得 Notion 資料庫所有文件</h3>
  <ul>
    <li v-for="item in dbPages" :key="item.id">
      <router-link
        :to="{ name: 'task', params: { databaseId, taskId: item.id } }"
        >{{ item.id }}</router-link
      >
    </li>
  </ul>

  <h3>3. 刪除 Notion 資料庫文件</h3>
  <ul>
    <li v-for="item in dbPages" :key="item.id">
      {{ item.id }} <button @click="deletePage(item.id)">刪除</button>
    </li>
  </ul>

  <h3>4. 新增 Notion 資料庫文件</h3>
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
      <el-button type="primary" @click="addPage"
        >新增資料庫</el-button
      ></el-form-item
    >
  </el-form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  apiGetDatabase,
  apiGetDatabasePages,
  apiPostDatabasePage,
  apiDeleteDatabasePage,
} from "@/api/api.js";
import { onMounted } from "vue";

const route = useRoute();
const databaseId = route.params.databaseId;

const database = ref(null);
const dbPages = ref(null);

const pageForm = reactive({
  title: "",
  due_date: "",
  status: "In progress",
});

/* 取得資料庫 MetaData */
const getDatabase = async () => {
  try {
    const response = await apiGetDatabase(databaseId);
    database.value = response.data;
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};
/* 取得資料庫所有文件 */
const getPages = async () => {
  try {
    const response = await apiGetDatabasePages(databaseId);
    dbPages.value = response.data.results;
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};

/* 新增資料庫文件 */
const addPage = async () => {
  try {
    const response = await apiPostDatabasePage(databaseId, pageForm);
    if (response.status === 200) {
      getPages();
      pageForm.title = "";
      pageForm.due_date = "";
    }
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};
/* 刪除資料庫文件 */
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
  getPages();
});
</script>
