<template>
  <div class="flex w-full h-full min-h-0">
    <editor-content
      v-if="editor"
      ref="editorRef"
      :editor="editor"
      class="flex-1 h-full break-all"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const CustomDocument = Document.extend({
  content: "taskList",
});

const CustomTaskItem = TaskItem.extend({
  content: "inline*",
});

const editor = ref(null);

/* 格式轉換 */
function convertArrayToTiptapDoc(todoList = []) {
  return {
    type: "doc",
    content: [
      {
        type: "taskList",
        content: todoList.map((item) => ({
          type: "taskItem",
          attrs: { checked: !!item.checked },
          content: [
            {
              type: "text",
              text: typeof item.text === "string" ? item.text : "",
            },
          ],
        })),
      },
    ],
  };
}

function extractTodoItems(json) {
  const result = [];

  const getText = (node) => {
    let text = "";
    if (node.type === "text") text += node.text || "";
    if (Array.isArray(node.content)) {
      node.content.forEach((child) => {
        text += getText(child);
      });
    }
    return text;
  };

  const walk = (node) => {
    if (!node?.content) return;
    node.content.forEach((child) => {
      if (child.type === "taskItem") {
        result.push({
          text: getText(child),
          checked: child.attrs?.checked || false,
        });
      } else {
        walk(child);
      }
    });
  };

  walk(json);
  return result;
}

function handleFocus() {
  editorRef.value?.closest(".editor")?.classList.add("is-focused");
}

function handleBlur() {
  editorRef.value?.closest(".editor")?.classList.remove("is-focused");
}

onMounted(() => {
  const defaultHtml = `
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="false"></li>
    </ul>
  `;

  editor.value = new Editor({
    extensions: [CustomDocument, Text, TaskList, CustomTaskItem],
    content:
      props.modelValue.length === 0
        ? defaultHtml
        : convertArrayToTiptapDoc(props.modelValue), // 👈 用 JSON
    // content: convertArrayToTiptapDoc(props.modelValue),
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const todos = extractTodoItems(json);
      emit("update:modelValue", todos);
    },
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (!editor.value || editor.value.isDestroyed) return;
    const current = extractTodoItems(editor.value.getJSON());
    const isSame = JSON.stringify(current) === JSON.stringify(newVal);
    if (!isSame) {
      editor.value.commands.setContent(convertArrayToTiptapDoc(newVal), false);
    }
  },
  { deep: true }
);
</script>

<style>
ul[data-type="taskList"] {
  list-style: none;
  padding: 1rem;
}

ul[data-type="taskList"] li {
  display: flex;
  gap: 0.5rem;
}
.ProseMirror {
  height: 100%;
  border: 1px solid var(--el-border-color);
  border-radius: 0.5rem;
  overflow: scroll;
}

.ProseMirror:focus {
  outline: none;
  border: 1px solid var(--el-color-primary);
  border-radius: 0.5rem;
}
</style>
