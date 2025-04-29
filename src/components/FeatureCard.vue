<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}>();
</script>

<template>
  <div class="card p-6 h-full flex flex-col items-center text-center animate-slide-up">
    <div :class="`w-16 h-16 mb-4 rounded-full flex items-center justify-center ${iconBg}`">
      <div class="text-white text-2xl" v-html="icon"></div>
    </div>
    <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
    <p class="text-gray-600">{{ description }}</p>
  </div>
</template>