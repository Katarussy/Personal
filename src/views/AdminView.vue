<script setup lang="ts">
import { ref } from 'vue';
import TheNavbar from '../components/TheNavbar.vue';
import AdminTabs from '../components/AdminTabs.vue';
import AdminQueueTable from '../components/AdminQueueTable.vue';

const currentTab = ref('Registrar');

const tabs = [
  { id: 'Registrar', label: 'Registrar' },
  { id: 'Cashier', label: 'Cashier' },
  { id: 'Dao', label: 'DAO' },
];

const handleTabChange = (tabId: string) => {
  currentTab.value = tabId;
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
    <TheNavbar />
    
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="card mb-10">
        <div class="p-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Admin Control Panel</h1>
          
          <AdminTabs 
            :tabs="tabs" 
            @change="handleTabChange" 
          />
          
          <div class="mt-6">
            <AdminQueueTable 
              v-if="currentTab === 'Registrar'" 
              service="Registrar" 
            />
            <AdminQueueTable 
              v-else-if="currentTab === 'Cashier'" 
              service="Cashier" 
            />
            <AdminQueueTable 
              v-else-if="currentTab === 'Dao'" 
              service="DAO" 
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>