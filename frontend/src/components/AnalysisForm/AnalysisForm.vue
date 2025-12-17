<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
<template>
  <div class="input-section">
    <div class="input-group">
      <div class="url-input-wrapper">
        <input
          v-model="url"
          type="text"
          class="url-input-compact"
          :placeholder="t('urlPlaceholder')"
          @keyup.enter="handleAnalyze"
        />
        <label v-if="url.trim() && canSaveUrl" class="save-url-checkbox">
          <input
            type="checkbox"
            :checked="isUrlSaved(url)"
            @change="handleSaveUrlToggle"
          />
          <span>{{ t('saveUrl') }}</span>
        </label>
      </div>
      <div class="saved-urls-selector" v-if="savedUrls.length > 0">
        <button
          class="btn-saved-urls"
          @click="toggleSavedUrlsDropdown"
          :aria-expanded="showSavedUrlsDropdown"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M3 3h18v18H3zM8 8h8M8 12h8M8 16h5"/>
          </svg>
          {{ t('savedUrls') }}
          <span class="url-count">({{ savedUrls.length }})</span>
        </button>
        <div v-if="showSavedUrlsDropdown" class="saved-urls-dropdown">
          <div class="dropdown-header">{{ t('selectSavedUrl') }}</div>
          <div class="dropdown-list">
            <div
              v-for="(savedUrl, index) in savedUrls"
              :key="index"
              class="saved-url-item"
            >
              <button
                class="url-select-btn"
                @click="selectSavedUrl(savedUrl)"
              >
                {{ savedUrl }}
              </button>
              <button
                class="url-remove-btn"
                @click="removeSavedUrl(savedUrl)"
                :aria-label="t('removeUrl')"
                :title="t('removeUrl')"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="button-group">
        <button
          v-if="!isLoading"
          class="btn-primary"
          :disabled="!url.trim()"
          :title="!url.trim() ? t('hintUrlRequired') : ''"
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
    <NotificationAlert
      v-if="showValidationError"
      :key="validationErrorKey"
      type="error"
      :title="validationErrorTitle"
      :message="validationErrorMessage"
      :duration="8000"
      :auto-close="true"
      @close="closeValidationError"
    />
    <NotificationAlert
      v-if="showUrlNotification"
      :key="urlNotificationKey"
      type="success"
      :title="urlNotificationMessage"
      :duration="3000"
      :auto-close="true"
      @close="closeUrlNotification"
    />
    <NotificationAlert
      v-if="showCancelledNotification"
      :key="cancelledNotificationKey"
      type="success"
      :title="t('analysisCancelled')"
      :duration="3000"
      :auto-close="true"
      @close="closeCancelledNotification"
    />
    
          <!-- Cancel Confirmation Modal -->
          <div v-if="showCancelModal" class="modal-overlay" @click.self="closeCancelModal">
            <div class="cancel-confirm-modal">
              <div class="cancel-confirm-header">
                <h3>{{ t('confirmCancelTitle') }}</h3>
              </div>
              <div class="cancel-confirm-body">
                <p>{{ t('confirmCancelMessage') }}</p>
              </div>
              <div class="cancel-confirm-actions">
                <button class="btn-cancel-confirm" @click="confirmCancel">
                  {{ t('confirmCancel') }}
                </button>
                <button class="btn-keep-analyzing" @click="closeCancelModal">
                  {{ t('keepAnalyzing') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Max URLs Modal -->
          <div v-if="showMaxUrlsModal" class="modal-overlay" @click.self="closeMaxUrlsModal">
            <div class="max-urls-modal">
              <div class="max-urls-header">
                <h3>{{ t('maxUrlsReachedTitle') }}</h3>
              </div>
              <div class="max-urls-body">
                <p>{{ t('maxUrlsReachedMessage') }}</p>
                <p class="select-url-label">{{ t('selectUrlToRemove') }}</p>
                <div class="max-urls-list">
                  <div
                    v-for="(savedUrl, index) in savedUrls"
                    :key="index"
                    class="max-url-item"
                  >
                    <button
                      class="max-url-remove-btn"
                      @click="removeUrlAndSave(savedUrl)"
                    >
                      <span class="url-text">{{ savedUrl }}</span>
                      <span class="remove-icon">×</span>
                    </button>
                  </div>
                </div>
              </div>
              <div class="max-urls-actions">
                <button class="btn-cancel-modal" @click="closeMaxUrlsModal">
                  {{ t('cancel') }}
                </button>
              </div>
            </div>
          </div>
        </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useAnalysisStore } from '@/stores/analysis'
import { useLanguageStore } from '@/stores/language'
import { useSavedUrlsStore } from '@/stores/savedUrls'
import OptionsPanel from './OptionsPanel.vue'
import WcagInfoModal from '../WcagInfoModal.vue'
import NotificationAlert from '../NotificationAlert.vue'

const analysisStore = useAnalysisStore()
const languageStore = useLanguageStore()
const savedUrlsStore = useSavedUrlsStore()
const { t } = languageStore
const url = ref('')
const isLoading = computed(() => analysisStore.isLoading)
const error = computed(() => analysisStore.error)
const wcagModalOpen = ref(false)
const showNotification = ref(false)
const notificationKey = ref(0)
const showValidationError = ref(false)
const validationErrorKey = ref(0)
const validationErrorTitle = ref('')
const validationErrorMessage = ref('')
const showUrlNotification = ref(false)
const urlNotificationKey = ref(0)
const urlNotificationMessage = ref('')
const showCancelledNotification = ref(false)
const cancelledNotificationKey = ref(0)
const showCancelModal = ref(false)
const wasCancelled = ref(false)
const showSavedUrlsDropdown = ref(false)
const showMaxUrlsModal = ref(false)
const urlToSave = ref('')
const savedUrls = computed(() => savedUrlsStore.savedUrls)
const canSaveUrl = computed(() => savedUrlsStore.canSaveMore || savedUrlsStore.isUrlSaved(url.value))

// Request notification permission on mount
onMounted(() => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
  
  // Listen for analysis completion
  window.addEventListener('analysis-completed', handleAnalysisCompleted)
  
  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.saved-urls-selector')) {
      showSavedUrlsDropdown.value = false
    }
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('analysis-completed', handleAnalysisCompleted)
  
  // Remove click outside listener
  if (handleClickOutside) {
    document.removeEventListener('click', handleClickOutside)
  }
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

function showUrlSavedNotification(message: string) {
  urlNotificationKey.value++
  urlNotificationMessage.value = message
  showUrlNotification.value = true
}

function closeNotification() {
  showNotification.value = false
}

function closeUrlNotification() {
  showUrlNotification.value = false
}

function closeValidationError() {
  showValidationError.value = false
}

function validateAnalysisOptions(): boolean {
  const options = analysisStore.options
  
  // Elements to check
  const elementKeys = [
    'checkButtons',
    'checkFormElements',
    'checkHeadings',
    'checkImages',
    'checkInputs',
    'checkLinks',
    'checkRoles',
    'checkTables',
  ]
  
  // Attributes to check
  const attributeKeys = [
    'checkAltText',
    'checkAriaDescribedby',
    'checkAriaLabel',
    'checkAriaLabelledby',
    'checkAriaChecked',
    'checkAriaDisabled',
    'checkAriaExpanded',
    'checkAriaHidden',
    'checkAriaInvalid',
    'checkAriaPressed',
    'checkAriaRequired',
    'checkAriaControls',
    'checkAriaCurrent',
    'checkAriaBusy',
    'checkAriaLive',
    'checkAutocomplete',
    'checkLabels',
    'checkRequired',
    'checkFocusStates',
    'checkHref',
    'checkLang',
    'checkTabIndex',
    'checkTitle',
  ]
  
  const hasElement = elementKeys.some(key => options[key as keyof typeof options])
  const hasAttribute = attributeKeys.some(key => options[key as keyof typeof options])
  
  if (!hasElement && !hasAttribute) {
    validationErrorTitle.value = t('errorNoElementsOrAttributesSelected')
    validationErrorMessage.value = ''
    validationErrorKey.value++
    showValidationError.value = true
    return false
  }
  
  if (!hasElement) {
    validationErrorTitle.value = t('errorNoElementsSelected')
    validationErrorMessage.value = ''
    validationErrorKey.value++
    showValidationError.value = true
    return false
  }
  
  if (!hasAttribute) {
    validationErrorTitle.value = t('errorNoAttributesSelected')
    validationErrorMessage.value = ''
    validationErrorKey.value++
    showValidationError.value = true
    return false
  }
  
  return true
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

  // Validate that at least one element and one attribute are selected
  if (!validateAnalysisOptions()) {
    return
  }

  await analysisStore.analyze(url.value)
}

function handleStop() {
  showCancelModal.value = true
}

function closeCancelModal() {
  showCancelModal.value = false
}

function confirmCancel() {
  wasCancelled.value = true
  analysisStore.stop()
  showCancelModal.value = false
  // Show notification after a short delay to ensure cancellation is processed
  setTimeout(() => {
    if (wasCancelled.value && !isLoading.value) {
      cancelledNotificationKey.value++
      showCancelledNotification.value = true
      wasCancelled.value = false
    }
  }, 100)
}

function closeCancelledNotification() {
  showCancelledNotification.value = false
}

// Watch for when analysis stops after cancellation
watch(isLoading, (newValue, oldValue) => {
  if (oldValue === true && newValue === false && wasCancelled.value) {
    // Analysis was cancelled and has now stopped
    cancelledNotificationKey.value++
    showCancelledNotification.value = true
    wasCancelled.value = false
  }
})

// Close modal on Escape key
watch(showCancelModal, (isOpen) => {
  if (isOpen) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCancelModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }
})

// Close max URLs modal on Escape key
watch(showMaxUrlsModal, (isOpen) => {
  if (isOpen) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMaxUrlsModal()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }
})

// Saved URLs functions
function isUrlSaved(urlToCheck: string): boolean {
  return savedUrlsStore.isUrlSaved(urlToCheck)
}

function handleSaveUrlToggle(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    if (savedUrlsStore.canSaveMore || savedUrlsStore.isUrlSaved(url.value)) {
      savedUrlsStore.addUrl(url.value)
      showUrlSavedNotification(t('urlSaved'))
    } else {
      target.checked = false
      // Show modal to remove a URL
      urlToSave.value = url.value
      showMaxUrlsModal.value = true
    }
  } else {
    savedUrlsStore.removeUrl(url.value)
    showUrlSavedNotification(t('urlRemoved'))
  }
}

function closeMaxUrlsModal() {
  showMaxUrlsModal.value = false
  urlToSave.value = ''
}

function removeUrlAndSave(urlToRemove: string) {
  savedUrlsStore.removeUrl(urlToRemove)
  if (urlToSave.value) {
    savedUrlsStore.addUrl(urlToSave.value)
    showUrlSavedNotification(t('urlSaved'))
  }
  closeMaxUrlsModal()
}

function toggleSavedUrlsDropdown() {
  showSavedUrlsDropdown.value = !showSavedUrlsDropdown.value
}

function selectSavedUrl(selectedUrl: string) {
  url.value = selectedUrl
  showSavedUrlsDropdown.value = false
}

function removeSavedUrl(urlToRemove: string) {
  savedUrlsStore.removeUrl(urlToRemove)
  if (url.value === urlToRemove) {
    url.value = ''
  }
  showUrlSavedNotification(t('urlRemoved'))
}
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
}

.url-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.url-input-compact {
  flex: 1;
  min-width: 0;
}

.saved-urls-selector {
  flex-shrink: 0;
}

.button-group {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.wcag-mode-toggle {
  margin-top: 12px;
  display: flex;
  align-items: center;
  width: 100%;
}

.wcag-mode-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  font-size: 0.9rem;
  margin: 0;
  padding: 10px 16px;
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  box-shadow: var(--shadow, 0 1px 3px rgba(0, 0, 0, 0.05));
  transition: all 0.3s ease;
  height: 44px;
  white-space: nowrap;
}

.wcag-mode-label:hover {
  border-color: var(--primary-color, #3b82f6);
  box-shadow: var(--shadow-lg, 0 2px 6px rgba(0, 0, 0, 0.1));
  transform: translateY(-1px);
}

.wcag-mode-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--primary-color, #3b82f6);
  flex-shrink: 0;
  margin: 0;
}

.wcag-mode-text {
  user-select: none;
  color: var(--text-primary, #1e293b);
}

.wcag-mode-hint-icon {
  font-size: 0.85rem;
  opacity: 0.6;
  cursor: help;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
  margin-left: 2px;
}

.wcag-mode-hint-icon:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .wcag-mode-label {
    font-size: 0.85rem;
    padding: 8px 12px;
    height: 40px;
    gap: 6px;
  }
  
  .wcag-mode-label input[type="checkbox"] {
    width: 14px;
    height: 14px;
  }
  
  .wcag-mode-hint-icon {
    font-size: 0.75rem;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.cancel-confirm-modal {
  background: var(--card-bg, #ffffff);
  border-radius: 16px;
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  max-width: 90vw;
  width: 400px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 2px solid var(--border-color, #e2e8f0);
  overflow: hidden;
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -o-animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    transform: translateY(20px) scale(0.95);
    -webkit-transform: translateY(20px) scale(0.95);
    -moz-transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    -webkit-transform: translateY(0) scale(1);
    -moz-transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Fix for glassmorphism theme */
body[data-theme="glassmorphism"] .cancel-confirm-modal {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.cancel-confirm-header {
  padding: 20px 24px;
  border-bottom: 2px solid var(--border-color, #e2e8f0);
  background: var(--primary-color, #2563eb);
  color: var(--modal-header-text-color, #ffffff);
}

.cancel-confirm-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--modal-header-text-color, #ffffff);
}

.cancel-confirm-body {
  padding: 24px;
}

.cancel-confirm-body p {
  margin: 0;
  color: var(--text-primary, #1e293b);
  font-size: 1rem;
  line-height: 1.5;
}

/* Fix for glassmorphism theme text */
body[data-theme="glassmorphism"] .cancel-confirm-body p {
  color: #1e293b;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  -webkit-text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.cancel-confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px;
  border-top: 2px solid var(--border-color, #e2e8f0);
  background: var(--bg-color, #f8fafc);
}

/* Fix for glassmorphism theme actions background */
body[data-theme="glassmorphism"] .cancel-confirm-actions {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.btn-cancel-confirm,
.btn-keep-analyzing {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
}

.btn-cancel-confirm {
  background: var(--danger-color, #ef4444);
  color: #ffffff;
}

.btn-cancel-confirm:hover {
  background: #dc2626;
  transform: translateY(-1px);
  -webkit-transform: translateY(-1px);
  -moz-transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  -webkit-box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
  -moz-box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.btn-keep-analyzing {
  background: var(--primary-color, #2563eb);
  color: var(--button-text-color, #ffffff);
}

.btn-keep-analyzing:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  -webkit-transform: translateY(-1px);
  -moz-transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  -webkit-box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  -moz-box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
}

/* Mobile responsive */
@media (max-width: 480px) {
  .cancel-confirm-modal {
    width: calc(100vw - 32px);
    margin: 16px;
  }

  .cancel-confirm-header {
    padding: 16px 20px;
  }

  .cancel-confirm-header h3 {
    font-size: 1.1rem;
  }

  .cancel-confirm-body {
    padding: 20px;
  }

  .cancel-confirm-body p {
    font-size: 0.95rem;
  }

  .cancel-confirm-actions {
    padding: 16px 20px;
    flex-direction: column;
  }

  .btn-cancel-confirm,
  .btn-keep-analyzing {
    width: 100%;
    padding: 14px 24px;
  }
}

/* Saved URLs Styles */
.url-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.save-url-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text-secondary, #64748b);
  white-space: nowrap;
  flex-shrink: 0;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.save-url-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--primary-color, #2563eb);
  margin: 0;
  flex-shrink: 0;
}

.save-url-checkbox:hover {
  color: var(--text-primary, #1e293b);
}

.save-url-checkbox:has(input[type="checkbox"]:checked) {
  color: var(--primary-color, #2563eb);
  font-weight: 600;
}

.saved-urls-selector {
  position: relative;
  flex-shrink: 0;
}

.btn-saved-urls {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  color: var(--text-primary, #1e293b);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-saved-urls:hover {
  background: var(--card-hover-bg, rgba(0, 0, 0, 0.02));
  border-color: var(--primary-color, #2563eb);
  color: var(--primary-color, #2563eb);
}

.btn-saved-urls svg {
  flex-shrink: 0;
}

.url-count {
  font-size: 0.8rem;
  opacity: 0.7;
}

.saved-urls-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--card-bg, #ffffff);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  z-index: 1000;
  animation: slideDown 0.2s ease-out;
  -webkit-animation: slideDown 0.2s ease-out;
  -moz-animation: slideDown 0.2s ease-out;
  -o-animation: slideDown 0.2s ease-out;
  overflow: hidden;
}

/* Ensure text visibility in all themes - use solid background for dropdown */
.saved-urls-dropdown {
  background: #ffffff !important;
  color: #1e293b !important;
}

/* Dark themes override */
body[data-theme="dark"] .saved-urls-dropdown,
body[data-theme="cyberpunk"] .saved-urls-dropdown {
  background: #252932 !important;
  color: #f1f5f9 !important;
}

/* Glassmorphism theme override */
body[data-theme="glassmorphism"] .saved-urls-dropdown {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #1e293b !important;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
    -webkit-transform: translateY(-10px);
    -moz-transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
  }
}

.dropdown-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b !important;
  background: #f8fafc !important;
}

/* Dark themes override */
body[data-theme="dark"] .dropdown-header,
body[data-theme="cyberpunk"] .dropdown-header {
  color: #f1f5f9 !important;
  background: #1a1d24 !important;
}

/* Glassmorphism theme override */
body[data-theme="glassmorphism"] .dropdown-header {
  color: #1e293b !important;
  background: rgba(248, 250, 252, 0.9) !important;
}

.dropdown-list {
  max-height: 300px;
  overflow-y: auto;
  padding: 8px;
}

.saved-url-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  transition: background 0.2s ease;
  -webkit-transition: background 0.2s ease;
  -moz-transition: background 0.2s ease;
  -o-transition: background 0.2s ease;
}

.saved-url-item:hover {
  background: var(--card-hover-bg, rgba(0, 0, 0, 0.02));
}

.url-select-btn {
  flex: 1;
  text-align: left;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  color: #1e293b !important;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

/* Dark themes override */
body[data-theme="dark"] .url-select-btn,
body[data-theme="cyberpunk"] .url-select-btn {
  color: #f1f5f9 !important;
}

/* Glassmorphism theme override */
body[data-theme="glassmorphism"] .url-select-btn {
  color: #1e293b !important;
}

.url-select-btn:hover {
  background: var(--primary-color, #2563eb);
  color: var(--button-text-color, #ffffff);
}

.url-remove-btn {
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  color: #64748b !important;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  flex-shrink: 0;
}

/* Dark themes override */
body[data-theme="dark"] .url-remove-btn,
body[data-theme="cyberpunk"] .url-remove-btn {
  color: #cbd5e1 !important;
}

/* Glassmorphism theme override */
body[data-theme="glassmorphism"] .url-remove-btn {
  color: #64748b !important;
}

.url-remove-btn:hover {
  background: var(--danger-color, #ef4444);
  color: #ffffff;
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
}

/* Mobile responsive for saved URLs */
@media (max-width: 768px) {
  .url-input-wrapper {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .save-url-checkbox {
    align-self: flex-start;
  }

  .saved-urls-selector {
    width: 100%;
  }

  .btn-saved-urls {
    width: 100%;
    justify-content: center;
  }

  .saved-urls-dropdown {
    right: auto;
    left: 0;
    width: 100%;
    min-width: auto;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .url-input-wrapper {
    gap: 6px;
  }

  .save-url-checkbox {
    font-size: 0.8rem;
  }

  .btn-saved-urls {
    padding: 8px 12px;
    font-size: 0.8rem;
  }

  .saved-urls-dropdown {
    min-width: auto;
    max-width: none;
  }

  .dropdown-header {
    padding: 10px 12px;
    font-size: 0.8rem;
  }

  .saved-url-item {
    padding: 6px;
  }

         .url-select-btn {
           font-size: 0.8rem;
           padding: 6px 10px;
         }
       }

       /* Max URLs Modal Styles */
       .max-urls-modal {
         background: var(--card-bg, #ffffff);
         border-radius: 16px;
         -webkit-border-radius: 16px;
         -moz-border-radius: 16px;
         max-width: 90vw;
         width: 500px;
         box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
         -webkit-box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
         -moz-box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
         border: 2px solid var(--border-color, #e2e8f0);
         overflow: hidden;
         animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
         -webkit-animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
         -moz-animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
         -o-animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
       }

       /* Fix for glassmorphism theme */
       body[data-theme="glassmorphism"] .max-urls-modal {
         background: rgba(255, 255, 255, 0.95);
         backdrop-filter: blur(20px);
         -webkit-backdrop-filter: blur(20px);
         border: 1px solid rgba(255, 255, 255, 0.3);
       }

       .max-urls-header {
         padding: 20px 24px;
         border-bottom: 2px solid var(--border-color, #e2e8f0);
         background: var(--warning-color, #f59e0b);
         color: var(--modal-header-text-color, #ffffff);
       }

       .max-urls-header h3 {
         margin: 0;
         font-size: 1.2rem;
         font-weight: 600;
         color: var(--modal-header-text-color, #ffffff);
       }

       .max-urls-body {
         padding: 24px;
       }

       .max-urls-body p {
         margin: 0 0 16px 0;
         color: var(--text-primary, #1e293b);
         font-size: 1rem;
         line-height: 1.5;
       }

       .select-url-label {
         font-weight: 600;
         margin-bottom: 12px !important;
       }

       /* Fix for glassmorphism theme text */
       body[data-theme="glassmorphism"] .max-urls-body p {
         color: #1e293b;
         text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
         -webkit-text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
       }

       .max-urls-list {
         max-height: 300px;
         overflow-y: auto;
         padding: 8px;
         background: var(--bg-color, #f8fafc);
         border-radius: 8px;
         -webkit-border-radius: 8px;
         -moz-border-radius: 8px;
       }

       /* Fix for glassmorphism theme list background */
       body[data-theme="glassmorphism"] .max-urls-list {
         background: rgba(248, 250, 252, 0.5);
         backdrop-filter: blur(10px);
         -webkit-backdrop-filter: blur(10px);
       }

       .max-url-item {
         margin-bottom: 8px;
       }

       .max-url-item:last-child {
         margin-bottom: 0;
       }

       .max-url-remove-btn {
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         padding: 12px 16px;
         background: var(--card-bg, #ffffff);
         border: 1px solid var(--border-color, #e2e8f0);
         border-radius: 8px;
         -webkit-border-radius: 8px;
         -moz-border-radius: 8px;
         color: var(--text-primary, #1e293b);
         font-size: 0.875rem;
         cursor: pointer;
         transition: all 0.2s ease;
         -webkit-transition: all 0.2s ease;
         -moz-transition: all 0.2s ease;
         -o-transition: all 0.2s ease;
         text-align: left;
       }

       .max-url-remove-btn:hover {
         background: var(--danger-color, #ef4444);
         color: #ffffff;
         border-color: var(--danger-color, #ef4444);
         transform: translateY(-1px);
         -webkit-transform: translateY(-1px);
         -moz-transform: translateY(-1px);
         box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
         -webkit-box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
         -moz-box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
       }

       .url-text {
         flex: 1;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
         min-width: 0;
       }

       .remove-icon {
         font-size: 1.5rem;
         font-weight: bold;
         margin-left: 12px;
         flex-shrink: 0;
       }

       .max-urls-actions {
         display: flex;
         gap: 12px;
         justify-content: flex-end;
         padding: 20px 24px;
         border-top: 2px solid var(--border-color, #e2e8f0);
         background: var(--bg-color, #f8fafc);
       }

       /* Fix for glassmorphism theme actions background */
       body[data-theme="glassmorphism"] .max-urls-actions {
         background: rgba(255, 255, 255, 0.5);
         backdrop-filter: blur(10px);
         -webkit-backdrop-filter: blur(10px);
       }

       .btn-cancel-modal {
         padding: 12px 24px;
         border: none;
         border-radius: 8px;
         -webkit-border-radius: 8px;
         -moz-border-radius: 8px;
         font-size: 0.95rem;
         font-weight: 600;
         cursor: pointer;
         transition: all 0.2s ease;
         -webkit-transition: all 0.2s ease;
         -moz-transition: all 0.2s ease;
         -o-transition: all 0.2s ease;
         background: var(--text-secondary, #64748b);
         color: #ffffff;
       }

       .btn-cancel-modal:hover {
         background: var(--text-primary, #1e293b);
         transform: translateY(-1px);
         -webkit-transform: translateY(-1px);
         -moz-transform: translateY(-1px);
         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
         -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
         -moz-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
       }

       /* Mobile responsive for max URLs modal */
       @media (max-width: 480px) {
         .max-urls-modal {
           width: calc(100vw - 32px);
           margin: 16px;
         }

         .max-urls-header {
           padding: 16px 20px;
         }

         .max-urls-header h3 {
           font-size: 1.1rem;
         }

         .max-urls-body {
           padding: 20px;
         }

         .max-urls-body p {
           font-size: 0.95rem;
         }

         .max-urls-actions {
           padding: 16px 20px;
         }

         .btn-cancel-modal {
           width: 100%;
           padding: 14px 24px;
         }
       }
       </style>

