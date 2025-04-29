<script setup lang="ts">
import { useRouter } from 'vue-router';
import FeatureCard from '../components/FeatureCard.vue';

const router = useRouter();

const navigateToStudent = () => {
  router.push('/student');
};

const features = [
  {
    title: 'Real-time Updates',
    description: 'Get instant updates on queue status and waiting times',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    iconBg: 'bg-primary-600',
  },
  {
    title: 'Multiple Services',
    description: 'Access Registrar, Cashier, and DAO services in one place',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
    iconBg: 'bg-secondary-600',
  },
  {
    title: 'Easy to Use',
    description: 'Simple interface for both students and administrators',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>',
    iconBg: 'bg-accent-600',
  },
];
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
    <div class="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Welcome to Student Queue System
        </h1>
        <p class="mt-4 max-w-xl mx-auto text-xl text-gray-500">
          An efficient way to manage student services queues
        </p>
        <div class="mt-8">
          <button @click="navigateToStudent" class="btn-primary animate-pulse-slow inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
            </svg>
            Start Queueing
          </button>
        </div>
      </div>

      <div class="mt-24">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard 
            v-for="(feature, index) in features" 
            :key="index"
            :title="feature.title"
            :description="feature.description"
            :icon="feature.icon"
            :iconBg="feature.iconBg"
          />
        </div>
      </div>
    </div>
  </div>
</template>