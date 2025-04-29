<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const currentPath = router.currentRoute.value.path;

// Method to navigate to different views
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">Student Queue System</span>
          </router-link>
        </div>

        <div class="flex items-center space-x-2">
          <button
            @click="navigateTo('/student')"
            :class="[
              'px-4 py-2 rounded-md transition-colors',
              currentPath === '/student'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Student View
          </button>
          <button
            @click="navigateTo('/admin')"
            :class="[
              'px-4 py-2 rounded-md transition-colors',
              currentPath === '/admin'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            Admin View
          </button>
        </div>
      </div>
    </div>
  </header>
</template>