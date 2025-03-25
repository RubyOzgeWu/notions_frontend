<template>
  <section class="w-full flex justify-center">
    <div
      class="flex flex-col w-full h-screen py-12 px-20 gap-8"
      :class="customClass"
    >
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  customClass: {
    type: [String, Array, Object],
    default: "max-w-[1440px]",
  },
});
</script>
