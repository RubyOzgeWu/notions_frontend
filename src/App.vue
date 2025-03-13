<template>
  <div class="layout flex h-screen">
    <SideMenu class="w-[250px] side-menu bg-primary"></SideMenu>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import SideMenu from "./components/layout/SideMenu.vue";
</script>

<style lang="scss"></style>
