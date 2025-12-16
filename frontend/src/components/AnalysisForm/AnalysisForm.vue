<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
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
          v-if="!isLoading"
          class="btn-primary"
          :disabled="!url.trim()"
          @click="handleAnalyze"
        >
          {{ t('analyzeBtn') }}
        </button>
        <button
          v-else
          id="stopBtn"
          class="btn-stop"
          @click="handleStop"
        >
          {{ t('stop') }}
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
    <div v-if="error" class="error">
      <strong>Error:</strong> {{ error }}
      <details v-if="error.includes('Details:')" style="margin-top: 10px; font-size: 0.9em; opacity: 0.8;">
        <summary style="cursor: pointer; margin-top: 5px;">Ver detalles técnicos</summary>
        <pre style="margin-top: 5px; white-space: pre-wrap; word-break: break-word;">{{ error }}</pre>
      </details>
    </div>
    <div v-if="isLoading" class="loading">
      <span class="analyzing-text">
        <span class="analyzing-emoji">🔍</span>
        {{ t('analyzing').replace('🔍 ', '') }}
      </span>
    </div>
    <OptionsPanel />
    <WcagInfoModal v-model:is-open="wcagModalOpen" />
    <NotificationAlert
      v-if="showNotification"
      :key="notificationKey"
      type="info"
      :title="t('analysisCompleted')"
      :message="t('analysisCompletedMessage')"
      :duration="5000"
      :auto-close="true"
      @close="closeNotification"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAnalysisStore } from '@/stores/analysis'
import { useLanguageStore } from '@/stores/language'
import OptionsPanel from './OptionsPanel.vue'
import WcagInfoModal from '../WcagInfoModal.vue'
import NotificationAlert from '../NotificationAlert.vue'

const analysisStore = useAnalysisStore()
const languageStore = useLanguageStore()
const { t } = languageStore
const url = ref('')
const isLoading = computed(() => analysisStore.isLoading)
const error = computed(() => analysisStore.error)
const wcagModalOpen = ref(false)
const showNotification = ref(false)
const notificationKey = ref(0)

// Request notification permission on mount
onMounted(() => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
  
  // Listen for analysis completion
  window.addEventListener('analysis-completed', handleAnalysisCompleted)
})

onUnmounted(() => {
  window.removeEventListener('analysis-completed', handleAnalysisCompleted)
})

function handleAnalysisCompleted(event: Event) {
  const customEvent = event as CustomEvent
  if (customEvent.detail?.success) {
    showSystemNotification()
    showPageNotification()
  }
}

function showSystemNotification() {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(t('analysisCompleted'), {
      body: t('analysisCompletedMessage'),
      icon: '/favicon.svg',
      tag: 'analysis-completed',
      requireInteraction: false,
    })
  }
}

function showPageNotification() {
  notificationKey.value++
  showNotification.value = true
}

function closeNotification() {
  showNotification.value = false
}

function toggleWcagModal() {
  wcagModalOpen.value = !wcagModalOpen.value
}

async function handleAnalyze() {
  if (!url.value.trim()) return
  
  if (!url.value.startsWith('http://') && !url.value.startsWith('https://')) {
    alert(t('errorInvalidUrl'))
    return
  }

  await analysisStore.analyze(url.value)
}

function handleStop() {
  analysisStore.stop()
}
</script>

