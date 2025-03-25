<template>
  <editor-content
    v-if="editor"
    :editor="editor"
    class="w-full h-full"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const editor = ref(null);

function handleFocus() {
  editorRef.value?.closest(".editor")?.classList.add("is-focused");
}

function handleBlur() {
  editorRef.value?.closest(".editor")?.classList.remove("is-focused");
}

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit, TaskList, TaskItem.configure({ nested: true })],
    content: ` <ul data-type="taskList">
        <li data-type="taskItem" data-checked="false"></li>
      </ul>
    `,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const todoList = extractTodoItems(json);
      emit("update:modelValue", todoList);
    },
  });

  editor.value.on("focus", () => {
    const wrapper = document.querySelector(".editor");
    wrapper?.classList.add("is-focused");
  });

  editor.value.on("blur", () => {
    const wrapper = document.querySelector(".editor");
    wrapper?.classList.remove("is-focused");
  });
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});

/* 轉換為 JSON 格式 */
function getPlainTextFromNode(node) {
  let text = "";

  if (node.type === "text") {
    text += node.text || "";
  }

  if (Array.isArray(node.content)) {
    node.content.forEach((child) => {
      text += getPlainTextFromNode(child);
    });
  }

  return text;
}

function extractTodoItems(json) {
  const result = [];

  const findTasks = (node) => {
    if (!node || !node.content) return;

    node.content.forEach((child) => {
      if (child.type === "taskItem") {
        const text = getPlainTextFromNode(child);
        result.push({
          text,
          checked: child.attrs?.checked || false,
        });
      } else {
        findTasks(child); 
      }
    });
  };

  findTasks(json);
  return result;
}
</script>

<style>
ul[data-type="taskList"] {
  list-style: none;
  padding: 1rem;
}

ul[data-type="taskList"] li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.ProseMirror {
  height: 100%;
}

.ProseMirror:focus {
  outline: none;
  border: none;
}
</style>
