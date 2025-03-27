# Notions API & Projects Management

這是一個使用 **Vue 3 + Vite** 開發的前端專案，串接 **Notion API**，實現對特定資料庫的 CRUD 操作，目的是打造一個簡潔、直觀的專案管理介面，以提升日常工作效率和資訊整理品質。

---

## ✨ 專案特色

- ✅ 串接 Notion API，自動同步資料庫內容
- ✅ 建立 / 編輯 / 刪除任務與項目
- ✅ 使用 Vue Composition API 撰寫邏輯清晰模組
- ✅ 元件化 UI，支援彈性延伸

---

## 🧱 技術棧

| 技術                                         | 說明                   |
| -------------------------------------------- | ---------------------- |
| [Vue 3](https://vuejs.org/)                  | JavaScript 前端框架    |
| [Vite](https://vitejs.dev/)                  | 快速打包與開發環境工具 |
| [Element Plus](https://element-plus.org/)    | UI 元件庫              |
| [Axios](https://axios-http.com/)             | HTTP 請求工具          |
| [Notion API](https://developers.notion.com/) | Notion 官方資料庫 API  |

---

## ⚙️ 安裝與啟動

### 初始化安裝
npm install

### 啟動本地開發伺服器
npm run dev

---

## 🔐 環境變數設定

請建立 `.env` 檔案，並加入下列內容：

\`\`\`env
VITE_NOTION_API_KEY=your_secret_integration_token
VITE_NOTION_DATABASE_ID=your_notion_database_id
\`\`\`

> 📌 請至 [Notion Developers](https://www.notion.so/my-integrations) 建立 Integration 並複製金鑰。

---

## 📄 License

MIT © 2025

---

## 🙌 開發者

Develop by Ruby Oz
