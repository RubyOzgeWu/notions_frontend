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

export function apiPutDatabase(data) {
  return dev.put("/database", data);
}

export function apiDeleteDatabase(id) {
  return dev.delete("/database", { data: { id } });
}

/* DbPages 相關 API */
export function apiPostDatabasePage(databaseId, data) {
  return dev.post(`/database/page`, data, {
    headers: {
      Authorization: `Bearer ${databaseId}`,
    },
    withCredentials: true,
  });
}

export function apiGetDatabasePages(databaseId) {
  return dev.get(`/database/page`, {
    headers: {
      Authorization: `Bearer ${databaseId}`,
    },
    withCredentials: true,
  });
}

// export function apiGetDatabasePage() {
//   return dev.get("/read-task");
// }

// export function apiPutDatabasePage(data) {
//   return dev.put("/update-task", data);
// }

// export function apiDeleteDatabasePage(id) {
//   return dev.delete("/delete-task", { data: { id } });
// }
