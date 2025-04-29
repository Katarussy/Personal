<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useQueueStore } from "../stores/queueStore"

const props = defineProps<{
  service: "Registrar" | "Cashier" | "DAO"
}>()

const emit = defineEmits(["callNext", "resetQueue"])

const queueStore = useQueueStore()
const showResetNotification = ref(false)
const showServeNotification = ref(false)
const servedTicket = ref("")
// Create a reactive trigger to force updates
const updateTrigger = ref(0)

// Include the trigger in the computed property to make it reactive to changes
const queue = computed(() => {
  // The updateTrigger is used only to trigger reactivity
  updateTrigger.value
  return queueStore.getQueueByService(props.service).value
})
const totalInQueue = computed(() => queue.value.length)

const handleServe = (ticket: string) => {
  queueStore.serveStudent(props.service, ticket)
  servedTicket.value = ticket
  showServeNotification.value = true
  setTimeout(() => {
    showServeNotification.value = false
  }, 3000)
}

const handleRemove = (ticket: string) => {
  queueStore.removeFromQueue(props.service, ticket)
}

const callNext = () => {
  const nextStudent = queueStore.callNextStudent(props.service)
  if (nextStudent) {
    servedTicket.value = nextStudent.ticket
    showServeNotification.value = true
    setTimeout(() => {
      showServeNotification.value = false
    }, 3000)
  }
  emit("callNext")
}

const resetQueue = () => {
  queueStore.resetQueue(props.service)
  showResetNotification.value = true
  setTimeout(() => {
    showResetNotification.value = false
  }, 3000)
  emit("resetQueue")
}

// Update waiting times every minute
let updateInterval: number

onMounted(() => {
  updateInterval = window.setInterval(() => {
    // Increment the trigger to force a component update
    updateTrigger.value++
  }, 60000)
})

onUnmounted(() => {
  clearInterval(updateInterval)
})

const getWaitingTime = (ticket: string) => {
  return queueStore.getWaitingTime(props.service, ticket)
}
</script>

<template>
  <div class="admin-queue-table">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">{{ service }} Queue</h2>
      <div class="flex space-x-2">
        <button 
          @click="callNext" 
          class="btn btn-primary"
          :disabled="totalInQueue === 0"
        >
          Call Next
        </button>
        <button 
          @click="resetQueue" 
          class="btn btn-danger"
          :disabled="totalInQueue === 0"
        >
          Reset Queue
        </button>
      </div>
    </div>

    <div v-if="showServeNotification" class="alert alert-success mb-4">
      Now serving ticket: {{ servedTicket }}
    </div>

    <div v-if="showResetNotification" class="alert alert-warning mb-4">
      Queue has been reset
    </div>

    <div v-if="totalInQueue === 0" class="text-center py-8 text-gray-500">
      No students in queue
    </div>

    <table v-else class="table-auto w-full">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 py-2 text-left">Ticket</th>
          <th class="px-4 py-2 text-left">Name</th>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Waiting Time</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in queue" :key="item.ticket" class="border-b">
          <td class="px-4 py-2">{{ item.ticket }}</td>
          <td class="px-4 py-2">{{ item.name }}</td>
          <td class="px-4 py-2">{{ item.id }}</td>
          <td class="px-4 py-2">{{ getWaitingTime(item.ticket) }} min</td>
          <td class="px-4 py-2">
            <button 
              @click="handleServe(item.ticket)" 
              class="btn btn-sm btn-success mr-2"
            >
              Serve
            </button>
            <button 
              @click="handleRemove(item.ticket)" 
              class="btn btn-sm btn-danger"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.alert {
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.btn {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #4299e1;
  color: white;
  border: 1px solid #3182ce;
}

.btn-primary:hover {
  background-color: #3182ce;
}

.btn-primary:disabled {
  background-color: #a0aec0;
  border-color: #a0aec0;
  cursor: not-allowed;
}

.btn-success {
  background-color: #48bb78;
  color: white;
  border: 1px solid #38a169;
}

.btn-success:hover {
  background-color: #38a169;
}

.btn-danger {
  background-color: #f56565;
  color: white;
  border: 1px solid #e53e3e;
}

.btn-danger:hover {
  background-color: #e53e3e;
}

.btn-danger:disabled {
  background-color: #fc8181;
  border-color: #fc8181;
  cursor: not-allowed;
}
</style>
