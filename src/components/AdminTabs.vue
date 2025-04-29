<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  tabs: Array<{
    id: string;
    label: string;
  }>;
}>();

const emit = defineEmits(['change']);

const activeTab = ref(props.tabs[0]?.id || '');

const changeTab = (tabId: string) => {
  activeTab.value = tabId;
  emit('change', tabId);
};
</script>

<template>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="changeTab(tab.id)"
        :class="[
          activeTab === tab.id
            ? 'border-primary-600 text-primary-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors'
        ]"
      >
        {{ tab.label }}
      </button>
    </nav>
  </div>
</template>