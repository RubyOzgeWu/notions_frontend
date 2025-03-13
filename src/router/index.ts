import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import TestView from "../views/TestView.vue";
import CalendarView from "../views/CalendarView.vue";
import DatabaseView from "../views/DatabaseView.vue";
import TaskView from "../views/TaskView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/test",
      name: "test",
      component: TestView,
    },
    {
      path: "/database/:databaseId",
      name: "database",
      component: DatabaseView,
    },
    {
      path: "/database/:databaseId/task/:taskId",
      name: "task",
      component: TaskView,
    },
  ],
});

export default router;
