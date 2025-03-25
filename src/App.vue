<template>
  <MainLayout>
    <template #main>
      <router-view />
    </template>
  </MainLayout>
</template>

<script setup>
import MainLayout from "./components/layout/MainLayout.vue";
import SideMenu from "./components/layout/SideMenu.vue";
</script>

<style lang="scss"></style>
