import axios from "axios";

const dev = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default dev;

/* Database 相關 API */
// 新增資料庫
export function apiPostDatabase(name) {
  return dev.post("/database", { name });
}
// 取得資料庫 MetaData
export function apiGetDatabase(databaseId) {
  return dev.get(`/database/${databaseId}`);
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
// 更新文件
export function apiPatchDatabasePage(databaseId, pageId, data) {
  return dev.patch(`/database/${databaseId}/page/${pageId}`, data);
}
// 取得所有文件
export function apiGetDatabasePages(databaseId) {
  return dev.post(`/database/${databaseId}/pages`);
}
// 取得文件
export function apiGetDatabasePage(pageId) {
  return dev.get(`/database/page/${pageId}`);
}
// 刪除文件
export function apiDeleteDatabasePage(pageId) {
  return dev.delete(`/database/page/${pageId}`);
}
