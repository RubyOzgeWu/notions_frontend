<template>
  <div>
    <router-link to="/test">前往測試頁</router-link>
    <p>
      <router-link
        :to="{ name: 'database', params: { databaseId: dspDatabaseId } }"
        >前往 DSP 資料庫</router-link
      >
    </p>
    <p>
      <router-link
        :to="{ name: 'database', params: { databaseId: sspDatabaseId } }"
        >前往 SSP 資料庫</router-link
      >
    </p>
  </div>
</template>

<script setup>
const dspDatabaseId = import.meta.env.VITE_DSP_DATABASE_ID;
const sspDatabaseId = import.meta.env.VITE_SSP_DATABASE_ID;
</script>
