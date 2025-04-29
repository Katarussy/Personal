<script setup lang="ts">
import { ref } from 'vue';
import { useQueueStore } from '../stores/queueStore';

const queueStore = useQueueStore();

const studentName = ref('');
const studentId = ref('');
const selectedOffice = ref('Registrar');
const reason = ref('');
const showNotification = ref(false);
const ticketNumber = ref('');

const officeOptions = ['Registrar', 'Cashier', 'DAO'];

const joinQueue = () => {
  if (!studentName.value || !studentId.value || !selectedOffice.value) {
    return;
  }

  const ticket = queueStore.addToQueue({
    name: studentName.value,
    id: studentId.value,
    office: selectedOffice.value,
    reason: reason.value,
  });

  // Show notification with ticket number
  ticketNumber.value = ticket.ticket;
  showNotification.value = true;

  // Reset form
  studentName.value = '';
  studentId.value = '';
  reason.value = '';

  // Hide notification after 5 seconds
  setTimeout(() => {
    showNotification.value = false;
  }, 5000);
};
</script>

<template>
  <div class="card p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">Join a Queue</h2>
    
    <div class="space-y-4">
      <div class="space-y-2">
        <label for="studentName" class="block text-sm font-medium text-gray-700">Student Name</label>
        <input
          id="studentName"
          v-model="studentName"
          type="text"
          placeholder="Enter your name"
          class="input"
          required
        />
      </div>
      
      <div class="space-y-2">
        <label for="studentId" class="block text-sm font-medium text-gray-700">Student ID</label>
        <input
          id="studentId"
          v-model="studentId"
          type="text"
          placeholder="Enter your student ID"
          class="input"
          required
        />
      </div>
      
      <div class="space-y-2">
        <label for="office" class="block text-sm font-medium text-gray-700">Select Office</label>
        <select
          id="office"
          v-model="selectedOffice"
          class="input"
          required
        >
          <option v-for="option in officeOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      
      <div class="space-y-2">
        <label for="reason" class="block text-sm font-medium text-gray-700">Reason</label>
        <input
          id="reason"
          v-model="reason"
          type="text"
          placeholder="Enter your reason"
          class="input"
        />
      </div>
      
      <button @click="joinQueue" class="btn-primary w-full flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Join Queue
      </button>
    </div>

    <!-- Notification -->
    <div v-if="showNotification" class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-fade-in">
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div>
          <p class="font-medium text-gray-900">Successfully joined queue!</p>
          <p class="text-sm text-gray-600">Your ticket number is: {{ ticketNumber }}</p>
        </div>
      </div>
    </div>
  </div>
</template>