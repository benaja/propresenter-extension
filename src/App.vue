<template>
  <h1 class="text-blue-500">💖 Hello World!</h1>
  <p>Welcome to your Electron application.</p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const test = window.settings.getSettings("dfasdf");
  console.log(test, test.key);
});

console.log('👋 This message is being logged by "App.vue", included via Vite');
</script>
