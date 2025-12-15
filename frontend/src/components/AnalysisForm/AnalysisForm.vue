<template>
  <div class="input-section">
    <div class="input-group">
      <input
        v-model="url"
        type="text"
        class="url-input-compact"
        :placeholder="t('urlPlaceholder')"
        @keyup.enter="handleAnalyze"
      />
      <div class="button-group">
        <button
          class="btn-primary"
          :disabled="isLoading || !url.trim()"
          @click="handleAnalyze"
        >
          {{ isLoading ? t('analyzing') : t('analyzeBtn') }}
        </button>
        <button
          id="wcagInfoToggle"
          class="btn-info"
          :aria-expanded="wcagModalOpen"
          title="WCAG Information"
          @click="toggleWcagModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </button>
      </div>
    </div>
    <OptionsPanel />
    <WcagInfoModal />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAnalysisStore } from '@/stores/analysis'
import { useLanguageStore } from '@/stores/language'
import OptionsPanel from './OptionsPanel.vue'
import WcagInfoModal from '../WcagInfoModal.vue'

const analysisStore = useAnalysisStore()
const languageStore = useLanguageStore()
const { t } = languageStore
const url = ref('')
const isLoading = computed(() => analysisStore.isLoading)
const wcagModalOpen = ref(false)

function toggleWcagModal() {
  wcagModalOpen.value = !wcagModalOpen.value
  if ((window as any).openWcagModal && wcagModalOpen.value) {
    (window as any).openWcagModal()
  } else if ((window as any).closeWcagModal && !wcagModalOpen.value) {
    (window as any).closeWcagModal()
  }
}

async function handleAnalyze() {
  if (!url.value.trim()) return
  
  if (!url.value.startsWith('http://') && !url.value.startsWith('https://')) {
    alert(t('errorInvalidUrl'))
    return
  }

  await analysisStore.analyze(url.value)
}
</script>

