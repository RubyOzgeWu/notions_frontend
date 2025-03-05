import axios from "axios";

const dev = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default dev;

/* Database 相關 API */
export function apiPostDatabase(name) {
  return dev.post("/database", { name });
}

export function apiGetDatabase() {
  return dev.get("/database");
}

// export function apiPutDatabase(data) {
//   return dev.put("/database", data);
// }

// export function apiDeleteDatabase(id) {
//   return dev.delete("/database", { data: { id } });
// }

/* DbPages 相關 API */
// 新增文件
export function apiPostDatabasePage(databaseId, data) {
  return dev.post(`/database/${databaseId}/page`, data);
}
// 取得所有文件
export function apiGetDatabasePages(databaseId) {
  return dev.get(`/database/${databaseId}/page`);
}
// 取得文件
export function apiGetDatabasePage(pageId) {
  return dev.get(`/database/page/${pageId}`);
}

// export function apiPutDatabasePage(data) {
//   return dev.put("/update-task", data);
// }

export function apiDeleteDatabasePage(pageId) {
  return dev.delete(`/database/page/${pageId}`);
}
