<template>
  <div class="app">
    <Sidebar />
    <div class="main">
      <TopBar />
      <EventManage />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'
import EventManage from './views/EventManage.vue'
</script>
