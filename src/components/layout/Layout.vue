<template>
  <section class="flex">
    <!-- 側邊欄 -->
    <SideMenu
      class="w-[15.625rem] fixed h-screen top-0 bg-primary rounded-r-[1.25rem] shadow-light"
    ></SideMenu>

    <!-- 主要內容 -->
    <main class="pl-[15.625rem] w-screen flex items-center">
      <slot name="main"></slot>
    </main>
  </section>
</template>
