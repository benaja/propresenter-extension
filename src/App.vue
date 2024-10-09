<template>
  <div class="p-10">
    <h1 class="text-blue-500 font-bold text-lg">Aktionen</h1>
    <SyncProPresenterSongs />

    <h1 class="text-blue-500 font-bold text-lg">Einstellungen</h1>
    <div class="space-y-4">
      <TextField v-model="settings.port" label="ProPresenter Port" />
      <TextField
        v-model="settings.songLibraryName"
        label="Songs Library Name"
      />
      <TextField
        v-model="settings.songMacroName"
        label="Liederansicht Makro Name"
      />
      <TextField
        v-model="settings.defaultMacroName"
        label="Standard Makro Name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import TextField from "./components/fields/TextField.vue";
import SyncProPresenterSongs from "./components/SyncProPresenterSongs.vue";

const settings = ref(window.settings.getSettings());
onMounted(() => {
  console.log("Settings:", settings.value);
});

console.log(settings.value);

console.log('👋 This message is being logged by "App.vue", included via Vite');

watchEffect(() => {
  window.settings.setSettings({ ...settings.value });
});
</script>
