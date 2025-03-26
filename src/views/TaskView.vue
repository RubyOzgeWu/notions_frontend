<template>
  <Layout customClass="max-w-[1024px]">
    <Title class="text-primary">{{ contentMap.title }}</Title>
    <div
      class="content flex-1 flex md:gap-12 lg:gap-20 w-full h-full overflow-hidden"
    >
      <!-- content -->
      <div class="flex-2 flex flex-col gap-8">
        <!-- 描述 -->
        <div class="flex-1 flex flex-col">
          <h4 class="text-black-50 mb-2">描述</h4>
          <Textarea v-model="contentMap.description" class="flex-1"></Textarea>
        </div>

        <!-- 待辦清單 -->
        <div class="flex-3 flex flex-col overflow-hidden">
          <h4 class="text-black-50 mb-2">待辦事項</h4>
          <TaskEditor v-model="contentMap.todo_list" />
        </div>
      </div>

      <!-- info -->
      <div
        v-if="dbPage?.meta"
        class="flex-1 flex flex-col bg-white-20 rounded-[0.5rem] px-6 py-10 justify-between"
      >
        <div class="flex flex-col gap-4">
          <!-- ticket -->
          <div class="flex gap-4 items-start">
            <p class="flex-1 text-white-60">ticket</p>
            <p
              class="flex-3 text-secondary-70 hover:text-secondary-100 break-all"
            >
              <a :href="contentMap.ticket">{{ contentMap.ticket }}</a>
            </p>
          </div>

          <!-- due date -->
          <div class="flex gap-4 items-center">
            <p class="flex-1 text-white-60">Date</p>
            <p class="flex-3 text-black-60">
              {{ dbPage.meta?.properties["Due Date"].date.start }}
            </p>
          </div>

          <!-- status -->
          <div class="flex gap-4 items-center">
            <p class="flex-1 text-white-60">Status</p>
            <Dropdown
              class="flex-3"
              v-model="contentMap.status"
              :options="statusOptions"
              size="default"
            >
            </Dropdown>
          </div>

          <!-- priority -->
          <div class="flex gap-4 items-center">
            <p class="flex-1 text-white-60">Priority</p>
            <Dropdown
              class="flex-3"
              v-model="contentMap.priority"
              :options="priorityOptions"
              size="default"
            >
            </Dropdown>
          </div>
        </div>

        <Button @click="updatePage">儲存更新</Button>
      </div>
    </div>
    <!-- <pre v-if="dbPage">{{ dbPage.meta.properties }}</pre> -->
  </Layout>

  <!-- <section>
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
  </section> -->
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { apiGetDatabasePage, apiPatchDatabasePage } from "@/api/api.js";
import { onMounted } from "vue";

import { ElLoading } from "element-plus";
import TaskEditor from "../components/editor/TaskLists.vue";

const route = useRoute();

const databaseId = route.params.databaseId;
const pageId = route.params.taskId;

const dbPage = ref(null);

const contentMap = reactive({
  title: "",
  due_date: "",
  description: "",
  ticket: "",
  status: "Not started",
  priority: "",
  todo_list: [],
});

const statusOptions = [
  { label: "Not started", value: "Not started", color: "#999999" },
  { label: "In progress", value: "In progress", color: "#94abd4" },
  { label: "Done", value: "Done", color: "#4dc58b" },
];

const priorityOptions = [
  { label: "P1", value: "P1", color: "#ff4d4f" },
  { label: "P2", value: "P2", color: "#94abd4" },
  { label: "P3", value: "P3", color: "#4dc58b" },
];

/* Functions */
/* 取得資料庫文件 */
const getPage = async () => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: "資料載入中...",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    const response = await apiGetDatabasePage(pageId);
    dbPage.value = response.data;

    const contentBlocks = dbPage.value.content?.results || [];

    // description, ticket 存值
    const keys = ["description", "ticket"];

    for (const key of keys) {
      const toggleBlock = contentBlocks.find(
        (block) =>
          block.type === "toggle" &&
          block.toggle?.rich_text?.[0]?.text?.content === key
      );

      if (toggleBlock) {
        const blockId = toggleBlock.id;
        const childRes = await apiGetDatabasePage(blockId);
        const childBlocks = childRes.data?.content?.results || [];

        const paragraphBlock = childBlocks.find(
          (block) => block.type === "paragraph"
        );

        contentMap[key] =
          paragraphBlock?.paragraph?.rich_text?.[0]?.text?.content ?? "";
      }
    }

    // title
    contentMap.title =
      dbPage.value.meta?.properties.Name.title[0]?.text?.content ?? "Task";

    // status 存值
    contentMap.status =
      dbPage.value.meta?.properties?.Status?.status?.name ?? "Not started";

    // priority 存值
    contentMap.priority =
      dbPage.value.meta?.properties?.Priority?.select?.name ?? "Please select";

    // todo_list 存值
    contentMap.todo_list = contentBlocks
      .filter((block) => block.type === "to_do")
      .map((block) => ({
        text: block.to_do.rich_text?.[0]?.text?.content ?? "",
        checked: block.to_do.checked ?? false,
      }));
  } catch (error) {
    console.error("API 請求失敗:", error);
  } finally {
    loadingInstance.close();
  }
};

/* 更新資料庫文件 */
const updatePage = async () => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: "資料載入中...",
    background: "rgba(0, 0, 0, 0.7)",
  });

  try {
    const response = await apiPatchDatabasePage(databaseId, pageId, contentMap);
    if (response.status === 200) {
      getPage();
    }
  } catch (error) {
    console.error("API 請求失敗:", error);
  } finally {
    loadingInstance.close();
  }
};
// const getPage = async () => {
//   const loadingInstance = ElLoading.service({
//     lock: true,
//     text: "資料載入中...",
//     background: "rgba(0, 0, 0, 0.7)",
//   });

//   try {
//     const response = await apiGetDatabasePage(pageId);
//     dbPage.value = response.data;
//   } catch (error) {
//     console.error("API 請求失敗:", error);
//   } finally {
//     loadingInstance.close();
//   }
// };

onMounted(() => {
  getPage();
});
</script>

<style scoped lang="scss">
.el-mention {
  @apply flex-1;
}

:deep(.el-textarea) {
  @apply h-full;

  .el-textarea__inner {
    @apply h-full;
  }
}
</style>
