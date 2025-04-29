<script setup lang="ts">
import { computed } from 'vue';
import { useQueueStore } from '../stores/queueStore';

const queueStore = useQueueStore();

const registrarStats = computed(() => ({
  served: queueStore.servedCount('Registrar'),
  waiting: queueStore.waitingCount('Registrar'),
  waitTime: queueStore.estimatedWaitTime('Registrar'),
}));

const cashierStats = computed(() => ({
  served: queueStore.servedCount('Cashier'),
  waiting: queueStore.waitingCount('Cashier'),
  waitTime: queueStore.estimatedWaitTime('Cashier'),
}));

const daoStats = computed(() => ({
  served: queueStore.servedCount('DAO'),
  waiting: queueStore.waitingCount('DAO'),
  waitTime: queueStore.estimatedWaitTime('DAO'),
}));
</script>

<template>
  <div class="card p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Queue Statistics</h2>
    
    <div class="space-y-6">
      <!-- Served Stats -->
      <div>
        <h3 class="text-sm font-medium text-gray-500 mb-2">Students Served</h3>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-gray-600">Registrar Served</p>
            <p class="text-2xl font-bold">{{ registrarStats.served }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Cashier Served</p>
            <p class="text-2xl font-bold">{{ cashierStats.served }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">DAO Served</p>
            <p class="text-2xl font-bold">{{ daoStats.served }}</p>
          </div>
        </div>
      </div>
      
      <!-- Wait Times -->
      <div>
        <h3 class="text-sm font-medium text-gray-500 mb-2">Estimated Wait Times</h3>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-sm text-gray-600">Registrar Wait</p>
            <p class="text-2xl font-bold">{{ registrarStats.waitTime }}</p>
            <p class="text-xs text-gray-500">{{ registrarStats.waiting }} in queue × 5m each</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">Cashier Wait</p>
            <p class="text-2xl font-bold">{{ cashierStats.waitTime }}</p>
            <p class="text-xs text-gray-500">{{ cashierStats.waiting }} in queue × 5m each</p>
          </div>
          <div>
            <p class="text-sm text-gray-600">DAO Wait</p>
            <p class="text-2xl font-bold">{{ daoStats.waitTime }}</p>
            <p class="text-xs text-gray-500">{{ daoStats.waiting }} in queue × 5m each</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>