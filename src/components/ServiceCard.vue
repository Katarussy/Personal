<script setup lang="ts">
defineProps<{
  service: {
    type: string;
    code: string;
    color: string;
    bgColor: string;
    textColor: string;
    icon: string;
    currentNumber: string;
    waiting: number;
  };
}>();
</script>

<template>
  <div class="card w-full h-full p-6 animate-fade-in">
    <div class="flex flex-col">
      <h3 class="text-lg font-medium text-gray-800 mb-2">{{ service.type }}</h3>
      
      <div class="flex items-center mb-4">
        <div :class="`w-12 h-12 rounded-full flex items-center justify-center text-white ${service.bgColor}`">
          <span>{{ service.icon }}</span>
        </div>
        
        <div class="ml-4">
          <div class="text-2xl font-bold">{{ service.code }}</div>
          <div class="text-sm text-gray-500">Now Serving</div>
        </div>
      </div>
      
      <div class="flex items-center text-sm text-gray-600">
        <span>Waiting: {{ service.waiting }}</span>
      </div>
    </div>
  </div>
</template>