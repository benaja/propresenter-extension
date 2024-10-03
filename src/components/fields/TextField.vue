<template>
  <div>
    <label v-if="label" :name="name" class="text-gray-700">{{ label }}</label>
    <input
      v-model="model"
      type="text"
      :name="name"
      class="border border-gray-300 p-1 w-full rounded focus-visible:outline-blue-500"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>({ required: true });

const props = defineProps<{
  name?: string;
  label?: string;
}>();
</script>
