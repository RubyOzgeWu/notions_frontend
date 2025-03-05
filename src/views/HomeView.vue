<template>
  <div>
    <h3>Database</h3>
    <h4>1. 建立資料庫</h4>
    <button @click="addDatabase">建立 Notion 資料庫</button>

    <h4>2. 取得資料庫 MetaData</h4>
    <button @click="getDatabase">取得 Notion 資料庫</button>
    <pre v-if="database">{{ database }}</pre>

    <h3>Database Pages</h3>
    <h4>1. 取得 DSP 資料庫中所有文件</h4>
    <button @click="getDspPages">取得 DSP 資料庫所有文件</button>
    <pre v-if="DSPpages">{{ DSPpages }}</pre>

    <h4>2. 取得資料庫文件</h4>
    <button @click="getDspPage">取得 DSP 資料庫文件</button>
    <pre v-if="DSPpage">{{ DSPpage }}</pre>

    <h4>3. 新增 DSP 資料庫中文件</h4>
    <button @click="addDspPage">新增 DSP 資料庫文件</button>

    <h4>4. 刪除資料庫文件</h4>
    <button @click="deleteDspPage">刪除 DSP 資料庫文件</button>
  </div>
</template>
<script setup>
import { ref } from "vue";
import {
  apiPostDatabase,
  apiGetDatabase,
  apiGetDatabasePages,
  apiPostDatabasePage,
  apiDeleteDatabasePage,
  apiGetDatabasePage,
} from "@/api/api.js";
import { descriptionItemProps } from "element-plus";

const database = ref(null);
const DSPpages = ref(null);
const DSPpage = ref(null);

/* 新增資料庫 */
const addDatabase = async () => {
  try {
    const response = await apiPostDatabase("測試資料庫");
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};

/* 取得資料庫 */
const getDatabase = async () => {
  try {
    const response = await apiGetDatabase();
    database.value = response.data;
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};

/* 取得 DSP 資料庫所有文件 */
const getDspPages = async () => {
  try {
    const databaseId = import.meta.env.VITE_DSP_DATABASE_ID;
    const response = await apiGetDatabasePages(databaseId);
    DSPpages.value = response.data;
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};
/* 取得 DSP 資料庫文件 */
const getDspPage = async () => {
  try {
    const pageId = import.meta.env.VITE_DSP_TEST_PAGE_ID;
    const response = await apiGetDatabasePage(pageId);
    DSPpage.value = response.data;
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};

/* 新增 DSP 資料庫文件 */
const addDspPage = async () => {
  try {
    const databaseId = import.meta.env.VITE_DSP_DATABASE_ID;
    const data = {
      name: "新的任務",
      due_date: "2025-03-10",
      status: "In progress",
    };
    const response = await apiPostDatabasePage(databaseId, data);
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};

/* 新增 DSP 資料庫文件 */
const deleteDspPage = async () => {
  try {
    const pageId = import.meta.env.VITE_DSP_TEST_PAGE_ID;
    const response = await apiDeleteDatabasePage(pageId);
  } catch (error) {
    console.error("API 請求失敗:", error);
  }
};
</script>
