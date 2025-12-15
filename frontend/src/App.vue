<template>
  <div class="container">
    <Header />
    <AnalysisForm />
    <Suspense v-if="hasResults">
      <template #default>
        <Results :data="resultsData" />
      </template>
      <template #fallback>
        <div class="loading">Loading results...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Suspense, defineAsyncComponent } from 'vue'
import Header from './components/Header/Header.vue'
import AnalysisForm from './components/AnalysisForm/AnalysisForm.vue'
import { useAnalysisStore } from './stores/analysis'

// Lazy load Results component
const Results = defineAsyncComponent(() => import('./components/Results/Results.vue'))

const analysisStore = useAnalysisStore()
const hasResults = computed(() => !!analysisStore.results)
const resultsData = computed(() => analysisStore.results)
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--card-bg, #f5f7fa);
  border-radius: 24px;
  padding: 30px;
  box-shadow: var(--shadow-lg, 12px 12px 24px #b8bec4, -12px -12px 24px #ffffff);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>

