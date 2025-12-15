<template>
  <div class="results-section">
    <h2>{{ t('summary') }}</h2>
    <div v-if="data" class="results-container">
      <!-- Results content -->
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useLanguageStore } from '@/stores/language'

const props = defineProps<{
  data: any
}>()

const languageStore = useLanguageStore()
const { t } = languageStore
</script>


