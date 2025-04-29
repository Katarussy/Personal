<script setup lang="ts">
import { computed } from 'vue';
import TheNavbar from '../components/TheNavbar.vue';
import ServiceCard from '../components/ServiceCard.vue';
import QueueForm from '../components/QueueForm.vue';
import QueueStatistics from '../components/QueueStatistics.vue';
import { useQueueStore } from '../stores/queueStore';

const queueStore = useQueueStore();

const services = computed(() => [
  {
    type: 'Registrar',
    code: queueStore.currentNumbers.Registrar,
    color: 'text-primary-600',
    bgColor: 'bg-primary-600',
    textColor: 'text-primary-800',
    icon: 'R',
    currentNumber: queueStore.currentNumbers.Registrar,
    waiting: queueStore.waitingCount('Registrar').value,
  },
  {
    type: 'Cashier',
    code: queueStore.currentNumbers.Cashier,
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-600',
    textColor: 'text-secondary-800',
    icon: 'C',
    currentNumber: queueStore.currentNumbers.Cashier,
    waiting: queueStore.waitingCount('Cashier').value,
  },
  {
    type: 'DAO',
    code: queueStore.currentNumbers.DAO,
    color: 'text-accent-600',
    bgColor: 'bg-accent-600',
    textColor: 'text-accent-800',
    icon: 'D',
    currentNumber: queueStore.currentNumbers.DAO,
    waiting: queueStore.waitingCount('DAO').value,
  },
]);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
    <TheNavbar />
    
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Service Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <ServiceCard 
          v-for="service in services" 
          :key="service.type" 
          :service="service" 
        />
      </div>
      
      <!-- Queue Form and Statistics -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <QueueForm />
        <QueueStatistics />
      </div>
    </main>
  </div>
</template>