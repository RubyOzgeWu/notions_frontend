<template>
  <div class="p-8 py-12">
    <nav>
      <ul class="text-white leading-12 font-semibold text-lg">
        <li>
          <router-link to="/">主控板</router-link>
        </li>
        <li>
          資料庫
          <ul class="pl-8 font-normal text-lg leading-8">
            <li>
              <router-link
                :to="{
                  name: 'database',
                  params: { databaseId: dspDatabaseId },
                }"
                >DSP</router-link
              >
            </li>
            <li>
              <router-link
                :to="{
                  name: 'database',
                  params: { databaseId: sspDatabaseId },
                }"
                >SSP</router-link
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const dspDatabaseId = import.meta.env.VITE_DSP_DATABASE_ID;
const sspDatabaseId = import.meta.env.VITE_SSP_DATABASE_ID;
</script>
