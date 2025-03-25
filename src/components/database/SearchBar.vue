<template>
  <Input
    v-model="input"
    placeholder="搜尋標題..."
    clearable
    @keyup.enter="emitSearch"
    @clear="emitSearch"
  />
  <Button @click="emitSearch">搜尋</Button>
</template>

<script setup>
import { ref } from "vue";

import Input from "../basic/Input.vue";
import Button from "../basic/Button.vue";

const input = ref("");
const emit = defineEmits(["search"]);

function emitSearch() {
  emit('search', input.value.trim())
}
</script>
