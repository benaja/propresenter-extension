<template>
  <button
    class="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
    :disabled="loading"
    @click="syncProPresenterSongs"
  >
    ProPresenter Lieder Synchronisieren
  </button>
  <p v-if="syncError">
    <span class="text-red-500">Fehler:</span> {{ syncError }}
  </p>
  <p v-if="success" class="text-green-500">Synchronisation erfolgreich</p>
</template>

<script setup lang="ts">
import { ref } from "vue";

const syncError = ref<string | null>(null);
const loading = ref(false);
const success = ref(false);
function syncProPresenterSongs() {
  loading.value = true;
  success.value = false;
  window.actions
    .syncProPresenterSongs()
    .then(() => {
      success.value = true;
      setTimeout(() => {
        success.value = false;
      }, 3000);
      syncError.value = null;
    })
    .catch((error: Error) => {
      syncError.value = error.message;
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
