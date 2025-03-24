<template>
  <Layout>
    <template #title>我的主控板</template>
    <template #main>
      <div class="flex md:gap-12 lg:gap-20 ">
        <div class="flex-1 flex-col">
          <!-- tasks count -->
          <div class="flex flex-col gap-6">
            <CardCount
              :title="'DSP'"
              :count="countPages(dspDatabase)"
            ></CardCount>
            <CardCount
              :title="'SSP'"
              :count="countPages(sspDatabase)"
            ></CardCount>
          </div>
          <!-- tasks list -->
          <div>
            <ListTodo :data="allDatabase"></ListTodo>
          </div>
        </div>

        <Calendar class="flex-2"></Calendar>
      </div>
    </template>
  </Layout>
</template>