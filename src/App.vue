<script setup lang="ts">
import ConversationList from './components/ConversationList.vue'
</script>

<template>
  <div class="flex items-center justify-between h-screen">
    <div class="bg-gray-200 w-[300px] h-full border-r border-gray-300">
      <ConversationList />
    </div>
    <div class="content flex-1 h-full">content</div>
  </div>
</template>
<style scoped></style>
