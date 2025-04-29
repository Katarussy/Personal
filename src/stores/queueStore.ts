import { defineStore } from "pinia"
import { ref, computed } from "vue"

export interface QueueItem {
  id: string
  name: string
  ticket: string
  office: "Registrar" | "Cashier" | "DAO"
  status: "waiting" | "serving" | "completed"
  time: string
  reason?: string
  joinedAt: number // Timestamp when student joined
}

interface NewQueueItem {
  name: string
  id: string
  office: string
  reason?: string
}

type OfficeType = "Registrar" | "Cashier" | "DAO"

export const useQueueStore = defineStore("queue", () => {
  // State
  const queues = ref<Record<OfficeType, QueueItem[]>>({
    Registrar: [],
    Cashier: [],
    DAO: [],
  })

  const currentNumbers = ref({
    Registrar: "R-000",
    Cashier: "C-000",
    DAO: "D-000",
  })

  const served = ref({
    Registrar: 0,
    Cashier: 0,
    DAO: 0,
  })

  // Generate a new ticket number
  const generateTicket = (service: OfficeType) => {
    const prefix = service.charAt(0).toUpperCase()
    const current = Number.parseInt(currentNumbers.value[service].slice(2)) || 0
    const next = current + 1
    const nextTicket = `${prefix}-${String(next).padStart(3, "0")}`
    currentNumbers.value[service] = nextTicket
    return nextTicket
  }

  // Get current time
  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Add a new student to queue
  const addToQueue = (student: NewQueueItem) => {
    const service = student.office as OfficeType
    const ticket = generateTicket(service)

    const newItem: QueueItem = {
      ticket,
      name: student.name,
      id: student.id,
      office: service,
      status: "waiting",
      time: getCurrentTime(),
      reason: student.reason,
      joinedAt: Date.now(),
    }

    queues.value[service].push(newItem)
    return newItem
  }

  // Remove a student from queue
  const removeFromQueue = (service: OfficeType, ticket: string) => {
    const index = queues.value[service].findIndex((item) => item.ticket === ticket)
    if (index !== -1) {
      queues.value[service].splice(index, 1)
    }
  }

  // Mark a student as served
  const serveStudent = (service: OfficeType, ticket: string) => {
    const item = queues.value[service].find((item) => item.ticket === ticket)
    if (item) {
      item.status = "completed"
      served.value[service]++
      removeFromQueue(service, ticket)
    }
  }

  // Call next student in queue
  const callNextStudent = (service: OfficeType) => {
    if (queues.value[service].length > 0) {
      const nextStudent = queues.value[service][0]
      serveStudent(service, nextStudent.ticket)
      return nextStudent
    }
    return null
  }

  // Reset queue for a service
  const resetQueue = (service: OfficeType) => {
    queues.value[service] = []
    currentNumbers.value[service] = `${service.charAt(0).toUpperCase()}-000`
    served.value[service] = 0
  }

  // Get queue by service
  const getQueueByService = (service: OfficeType) => {
    return computed(() => queues.value[service])
  }

  // Get waiting count
  const waitingCount = (service: OfficeType) => {
    return computed(() => queues.value[service].length)
  }

  // Get served count
  const servedCount = (service: OfficeType) => {
    return computed(() => served.value[service])
  }

  // Calculate estimated wait time (5 minutes per person)
  const estimatedWaitTime = (service: OfficeType) => {
    return computed(() => {
      const count = queues.value[service].length
      if (count === 0) return "0m"
      const minutes = count * 5
      return `${minutes}m`
    })
  }

  // Get waiting time for a specific ticket
  const getWaitingTime = (service: OfficeType, ticket: string) => {
    const item = queues.value[service].find((i) => i.ticket === ticket)
    if (!item) return 0

    const waitedMinutes = Math.floor((Date.now() - item.joinedAt) / 60000)
    return waitedMinutes
  }

  return {
    queues,
    currentNumbers,
    served,
    addToQueue,
    removeFromQueue,
    serveStudent,
    callNextStudent,
    resetQueue,
    getQueueByService,
    waitingCount,
    servedCount,
    estimatedWaitTime,
    getWaitingTime,
  }
})
