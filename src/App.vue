<template>
  <Layout>
    <template #main>
      <router-view />
    </template>
  </Layout>
</template>

<script setup>
import Layout from "./components/layout/Layout.vue";
import SideMenu from "./components/layout/SideMenu.vue";
</script>

<style lang="scss"></style>
