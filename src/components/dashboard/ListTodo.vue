<template>
  <div class="flex flex-col">
    <Checkbox
      v-for="(item, index) in data"
      v-model="checkedItems[index]"
      :label="item.properties.Name.title[0].plain_text"
      @change="() => emit('update-status', item, checkedItems[index])"
    ></Checkbox>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  data: Array,
});

const checkedItems = ref(props.data.map(() => false));
const emit = defineEmits(["update-status"]);

watch(
  () => props.data,
  (newData) => {
    checkedItems.value = newData.map(() => false);
  },
  { immediate: true }
);
</script>
