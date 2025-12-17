<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ t('exportReport') }}</h2>
        <button class="close-btn" @click="close" aria-label="Close">×</button>
      </div>

      <div class="section">
        <div class="section-title">{{ t('reportFormat') }}</div>
        <div class="format-group">
          <div class="format-item">
            <input
              type="checkbox"
              id="exportPDF"
              v-model="exportOptions.formats.pdf"
            />
            <label for="exportPDF">
              <span class="format-icon">📄</span>
              {{ t('pdfFormat') }}
            </label>
          </div>
          <div class="format-item">
            <input
              type="checkbox"
              id="exportHTML"
              v-model="exportOptions.formats.html"
            />
            <label for="exportHTML">
              <span class="format-icon">🌐</span>
              {{ t('htmlFormat') }}
            </label>
          </div>
        </div>
        <div class="info-text">
          {{ t('exportFormatInfo') }}
        </div>
      </div>

      <div class="section">
        <div class="section-title">{{ t('elementsToInclude') }}</div>
        <div class="checkbox-group">
          <div class="checkbox-item">
            <input
              type="checkbox"
              id="exportImages"
              v-model="exportOptions.elements.images"
            />
            <label for="exportImages">{{ t('images') }}</label>
          </div>
          <div class="checkbox-item">
            <input
              type="checkbox"
              id="exportLinks"
              v-model="exportOptions.elements.links"
            />
            <label for="exportLinks">{{ t('links') }}</label>
          </div>
          <div class="checkbox-item">
            <input
              type="checkbox"
              id="exportButtons"
              v-model="exportOptions.elements.buttons"
            />
            <label for="exportButtons">{{ t('buttons') }}</label>
          </div>
          <div class="checkbox-item">
            <input
              type="checkbox"
              id="exportInputs"
              v-model="exportOptions.elements.inputs"
            />
            <label for="exportInputs">{{ t('inputs') }}</label>
          </div>
          <div class="checkbox-item">
            <input
              type="checkbox"
              id="exportRoles"
              v-model="exportOptions.elements.roles"
            />
            <label for="exportRoles">{{ t('elementsWithRole') }}</label>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">{{ t('resultsStatus') }}</div>
        <div class="status-group">
          <div class="status-item passed">
            <input
              type="checkbox"
              id="exportPassed"
              v-model="exportOptions.status.passed"
            />
            <label for="exportPassed">
              <span class="status-badge passed">✓</span>
              {{ t('passed') }}
            </label>
          </div>
          <div class="status-item failed">
            <input
              type="checkbox"
              id="exportFailed"
              v-model="exportOptions.status.failed"
            />
            <label for="exportFailed">
              <span class="status-badge failed">✗</span>
              {{ t('failed') }}
            </label>
          </div>
        </div>
        <div class="info-text">
          {{ t('exportStatusInfo') }}
        </div>
      </div>

      <div class="section">
        <div class="section-title">{{ t('additionalOptions') }}</div>
        <div class="checkbox-group">
          <div class="checkbox-item">
            <input
              type="checkbox"
              id="includeSummary"
              v-model="exportOptions.options.includeSummary"
            />
            <label for="includeSummary">{{ t('includeSummary') }}</label>
          </div>
          <div class="checkbox-item">
            <input
              type="checkbox"
              id="includeScreenshots"
              v-model="exportOptions.options.includeScreenshots"
            />
            <label for="includeScreenshots">{{ t('includeScreenshots') }}</label>
          </div>
          <div class="checkbox-item">
            <input
              type="checkbox"
              id="includeHTML"
              v-model="exportOptions.options.includeHTML"
            />
            <label for="includeHTML">{{ t('includeHTML') }}</label>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn btn-cancel" @click="close">{{ t('cancel') }}</button>
        <button
          class="btn btn-export"
          :disabled="!canExport"
          @click="handleExport"
        >
          {{ t('exportReport') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLanguageStore } from '@/stores/language'

const props = defineProps<{
  isOpen: boolean
  analysisOptions?: {
    checkImages?: boolean
    checkLinks?: boolean
    checkButtons?: boolean
    checkInputs?: boolean
    checkRoles?: boolean
  }
}>()

const emit = defineEmits<{
  close: []
  export: [options: ExportOptions]
}>()

const languageStore = useLanguageStore()
const { t } = languageStore

const exportOptions = ref({
  formats: {
    pdf: true,
    html: false,
  },
  elements: {
    images: true,
    links: true,
    buttons: true,
    inputs: true,
    roles: true,
  },
  status: {
    passed: true,
    failed: true,
  },
  options: {
    includeSummary: true,
    includeScreenshots: true,
    includeHTML: true,
  },
})

// Pre-select elements based on analysis options
watch(
  () => [props.isOpen, props.analysisOptions],
  ([isOpen, analysisOptions]) => {
    if (isOpen && analysisOptions) {
      const opts = analysisOptions
      exportOptions.value.elements.images = opts.checkImages ?? false
      exportOptions.value.elements.links = opts.checkLinks ?? false
      exportOptions.value.elements.buttons = opts.checkButtons ?? false
      exportOptions.value.elements.inputs = opts.checkInputs ?? false
      exportOptions.value.elements.roles = opts.checkRoles ?? false
    }
  },
  { immediate: true }
)

interface ExportOptions {
  formats: {
    pdf: boolean
    html: boolean
  }
  elements: {
    images: boolean
    links: boolean
    buttons: boolean
    inputs: boolean
    roles: boolean
  }
  status: {
    passed: boolean
    failed: boolean
  }
  options: {
    includeSummary: boolean
    includeScreenshots: boolean
    includeHTML: boolean
  }
}

const canExport = computed(() => {
  const hasFormat = exportOptions.value.formats.pdf || exportOptions.value.formats.html
  const hasElements =
    exportOptions.value.elements.images ||
    exportOptions.value.elements.links ||
    exportOptions.value.elements.buttons ||
    exportOptions.value.elements.inputs ||
    exportOptions.value.elements.roles
  const hasStatus = exportOptions.value.status.passed || exportOptions.value.status.failed
  return hasFormat && hasElements && hasStatus
})

function close() {
  emit('close')
}

function handleExport() {
  if (canExport.value) {
    emit('export', exportOptions.value)
  }
}

// Close on Escape key
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  -webkit-display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* Design 10: Dark Mode Style - Adapted to current theme */
.modal-content {
  background: var(--card-bg, #1e293b);
  color: var(--text-primary, #f1f5f9);
  border-radius: 16px;
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color, #334155);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--border-color, #334155);
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary, #f1f5f9);
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: var(--text-secondary, #94a3b8);
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: var(--bg-color, #334155);
  color: var(--text-primary, #f1f5f9);
}

.section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary, #f1f5f9);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 20px;
  background: var(--primary-color, #3b82f6);
  border-radius: 2px;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  background: var(--bg-color, #334155);
  color: var(--text-primary, #f1f5f9);
  transition: all 0.2s;
  cursor: pointer;
}

.checkbox-item:hover {
  background: var(--border-color, #475569);
}

.checkbox-item input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary-color, #3b82f6);
}

.checkbox-item label {
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-primary, #f1f5f9);
  font-weight: 500;
  flex: 1;
}

.format-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.format-item {
  flex: 1;
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: var(--bg-color, #334155);
  transition: all 0.2s;
  cursor: pointer;
}

.format-item:hover {
  background: var(--border-color, #475569);
}

.format-item input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary-color, #3b82f6);
}

.format-item label {
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-primary, #f1f5f9);
  font-weight: 500;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.format-icon {
  font-size: 1.2rem;
}

.status-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.status-item {
  flex: 1;
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: var(--bg-color, #334155);
  transition: all 0.2s;
  cursor: pointer;
}

.status-item:hover {
  background: var(--border-color, #475569);
}

.status-item.passed {
  border-left: 4px solid var(--success-color, #10b981);
}

.status-item.failed {
  border-left: 4px solid var(--danger-color, #ef4444);
}

.status-item input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary-color, #3b82f6);
}

.status-item label {
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-primary, #f1f5f9);
  font-weight: 500;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-badge.passed {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.failed {
  background: #fee2e2;
  color: #991b1b;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 2px solid var(--border-color, #334155);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: var(--bg-color, #334155);
  color: var(--text-primary, #f1f5f9);
}

.btn-cancel:hover {
  background: var(--border-color, #475569);
}

.btn-export {
  background: var(--primary-color, #3b82f6);
  color: var(--button-text-color, #ffffff);
}

.btn-export:hover {
  opacity: 0.9;
}

.btn-export:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.info-text {
  font-size: 0.85rem;
  color: var(--text-secondary, #94a3b8);
  margin-top: 8px;
  font-style: italic;
}
</style>

