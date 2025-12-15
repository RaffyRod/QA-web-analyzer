<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
<template>
  <div v-if="results && results.summary" id="results" class="results-section">
    <!-- Summary Section -->
    <div v-if="results.summary" class="summary-section">
      <h2>{{ t('summary') }}</h2>
      <div id="summaryGrid" class="summary-grid">
        <div class="summary-card">
          <div class="summary-card-label">{{ t('totalImages') }}</div>
          <div class="summary-card-value">{{ results.summary.totalImages || 0 }}</div>
        </div>
        <div
          class="summary-card"
          :class="{
            danger: (results.summary.imagesWithoutAlt || 0) > 0,
            success: (results.summary.imagesWithoutAlt || 0) === 0,
          }"
        >
          <div class="summary-card-label">{{ t('imagesWithoutAlt') }}</div>
          <div class="summary-card-value">{{ results.summary.imagesWithoutAlt || 0 }}</div>
        </div>
        <div
          v-if="results.summary.imagesWithoutFocusState !== undefined"
          class="summary-card"
          :class="{
            danger: (results.summary.imagesWithoutFocusState || 0) > 0,
            success: (results.summary.imagesWithoutFocusState || 0) === 0,
          }"
        >
          <div class="summary-card-label">{{ t('imagesWithoutFocusState') }}</div>
          <div class="summary-card-value">{{ results.summary.imagesWithoutFocusState || 0 }}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-label">{{ t('totalLinks') }}</div>
          <div class="summary-card-value">{{ results.summary.totalLinks || 0 }}</div>
        </div>
        <div
          class="summary-card"
          :class="{
            danger: (results.summary.linksWithoutAccessibility || 0) > 0,
            success: (results.summary.linksWithoutAccessibility || 0) === 0,
          }"
        >
          <div class="summary-card-label">{{ t('linksWithoutAccessibility') }}</div>
          <div class="summary-card-value">{{ results.summary.linksWithoutAccessibility || 0 }}</div>
        </div>
        <div
          v-if="results.summary.linksWithoutFocusState !== undefined"
          class="summary-card"
          :class="{
            danger: (results.summary.linksWithoutFocusState || 0) > 0,
            success: (results.summary.linksWithoutFocusState || 0) === 0,
          }"
        >
          <div class="summary-card-label">{{ t('linksWithoutFocusState') }}</div>
          <div class="summary-card-value">{{ results.summary.linksWithoutFocusState || 0 }}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-label">{{ t('totalButtons') }}</div>
          <div class="summary-card-value">{{ results.summary.totalButtons || 0 }}</div>
        </div>
        <div
          class="summary-card"
          :class="{
            danger: (results.summary.buttonsWithoutAccessibility || 0) > 0,
            success: (results.summary.buttonsWithoutAccessibility || 0) === 0,
          }"
        >
          <div class="summary-card-label">{{ t('buttonsWithoutAccessibility') }}</div>
          <div class="summary-card-value">{{ results.summary.buttonsWithoutAccessibility || 0 }}</div>
        </div>
        <div
          v-if="results.summary.buttonsWithoutFocusState !== undefined"
          class="summary-card"
          :class="{
            danger: (results.summary.buttonsWithoutFocusState || 0) > 0,
            success: (results.summary.buttonsWithoutFocusState || 0) === 0,
          }"
        >
          <div class="summary-card-label">{{ t('buttonsWithoutFocusState') }}</div>
          <div class="summary-card-value">{{ results.summary.buttonsWithoutFocusState || 0 }}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-label">{{ t('totalInputs') }}</div>
          <div class="summary-card-value">{{ results.summary.totalInputs || 0 }}</div>
        </div>
        <div
          class="summary-card"
          :class="{
            danger: (results.summary.inputsWithoutAccessibility || 0) > 0,
            success: (results.summary.inputsWithoutAccessibility || 0) === 0,
          }"
        >
          <div class="summary-card-label">{{ t('inputsWithoutAccessibility') }}</div>
          <div class="summary-card-value">{{ results.summary.inputsWithoutAccessibility || 0 }}</div>
        </div>
        <div class="summary-card">
          <div class="summary-card-label">{{ t('totalRoles') }}</div>
          <div class="summary-card-value">{{ results.summary.totalRoles || 0 }}</div>
        </div>
        <div
          class="summary-card"
          :class="{
            danger: (results.summary.rolesWithoutAccessibility || 0) > 0,
            success: (results.summary.rolesWithoutAccessibility || 0) === 0,
          }"
        >
          <div class="summary-card-label">{{ t('rolesWithoutAccessibility') }}</div>
          <div class="summary-card-value">{{ results.summary.rolesWithoutAccessibility || 0 }}</div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="filters-section">
      <h2>{{ t('filters') }}</h2>
      <div class="filter-group">
        <label>
          <input
            id="filterMissing"
            v-model="showMissing"
            type="checkbox"
            @change="applyFilters"
          />
          {{ t('showMissing') }}
        </label>
        <label>
          <input
            id="filterHasAttributes"
            v-model="showHasAttributes"
            type="checkbox"
            @change="applyFilters"
          />
          {{ t('showHasAttributes') }}
        </label>
      </div>
    </div>

    <!-- Export Section -->
    <div class="export-section">
      <div class="export-buttons">
        <button id="exportPdfBtn" class="btn-export" @click="openExportModal">
          {{ t('exportAsPDF') }}
        </button>
      </div>
    </div>

    <!-- Export Modal -->
    <ExportModal
      :is-open="exportModalOpen"
      :analysis-options="analysisStore.options"
      @close="closeExportModal"
      @export="handleExportPDF"
    />

    <!-- Section Filters -->
    <div class="section-filters">
      <h3>{{ t('showSections') }}</h3>
      <div class="section-filter-group">
        <label>
          <input
            id="showImages"
            v-model="sectionsVisible.images"
            type="checkbox"
            @change="toggleSectionVisibility"
          />
          {{ t('images') }}
        </label>
        <label>
          <input
            id="showLinks"
            v-model="sectionsVisible.links"
            type="checkbox"
            @change="toggleSectionVisibility"
          />
          {{ t('links') }}
        </label>
        <label>
          <input
            id="showButtons"
            v-model="sectionsVisible.buttons"
            type="checkbox"
            @change="toggleSectionVisibility"
          />
          {{ t('buttons') }}
        </label>
        <label>
          <input
            id="showInputs"
            v-model="sectionsVisible.inputs"
            type="checkbox"
            @change="toggleSectionVisibility"
          />
          {{ t('inputs') }}
        </label>
        <label>
          <input
            id="showRoles"
            v-model="sectionsVisible.roles"
            type="checkbox"
            @change="toggleSectionVisibility"
          />
          {{ t('elementsWithRole') }}
        </label>
      </div>
    </div>

    <!-- Images Section -->
    <div
      id="imagesSection"
      class="result-section"
      :class="{ hidden: !sectionsVisible.images }"
      data-section="images"
    >
      <h2
        class="section-header"
        data-section-toggle="images"
        @click="toggleSectionCollapse('images')"
      >
        <span class="icon">🖼️</span>
        {{ t('images') }}
        <span class="count" id="imagesCount">{{ (results.images || []).length }}</span>
        <span class="toggle-icon">▼</span>
      </h2>
      <div id="imagesList" class="results-list">
        <ResultItem
          v-for="(item, index) in filteredImages"
          :key="`image-${index}`"
          :item="item"
          :options="analysisOptions"
          :type="'image'"
          :show="shouldShowItem(item)"
        />
        <p v-if="(results.images || []).length === 0" class="no-results">
          {{ t('noImages') }}
        </p>
      </div>
    </div>

    <!-- Links Section -->
    <div
      id="linksSection"
      class="result-section"
      :class="{ hidden: !sectionsVisible.links }"
      data-section="links"
    >
      <h2
        class="section-header"
        data-section-toggle="links"
        @click="toggleSectionCollapse('links')"
      >
        <span class="icon">🔗</span>
        {{ t('links') }}
        <span class="count" id="linksCount">{{ (results.links || []).length }}</span>
        <span class="toggle-icon">▼</span>
      </h2>
      <div id="linksList" class="results-list">
        <ResultItem
          v-for="(item, index) in filteredLinks"
          :key="`link-${index}`"
          :item="item"
          :options="analysisOptions"
          :type="'link'"
          :show="shouldShowItem(item)"
        />
        <p v-if="(results.links || []).length === 0" class="no-results">
          {{ t('noLinks') }}
        </p>
      </div>
    </div>

    <!-- Buttons Section -->
    <div
      id="buttonsSection"
      class="result-section"
      :class="{ hidden: !sectionsVisible.buttons }"
      data-section="buttons"
    >
      <h2
        class="section-header"
        data-section-toggle="buttons"
        @click="toggleSectionCollapse('buttons')"
      >
        <span class="icon">🔘</span>
        {{ t('buttons') }}
        <span class="count" id="buttonsCount">{{ (results.buttons || []).length }}</span>
        <span class="toggle-icon">▼</span>
      </h2>
      <div id="buttonsList" class="results-list">
        <ResultItem
          v-for="(item, index) in filteredButtons"
          :key="`button-${index}`"
          :item="item"
          :options="analysisOptions"
          :type="'button'"
          :show="shouldShowItem(item)"
        />
        <p v-if="(results.buttons || []).length === 0" class="no-results">
          {{ t('noButtons') }}
        </p>
      </div>
    </div>

    <!-- Inputs Section -->
    <div
      id="inputsSection"
      class="result-section"
      :class="{ hidden: !sectionsVisible.inputs }"
      data-section="inputs"
    >
      <h2
        class="section-header"
        data-section-toggle="inputs"
        @click="toggleSectionCollapse('inputs')"
      >
        <span class="icon">📝</span>
        {{ t('inputs') }}
        <span class="count" id="inputsCount">{{ (results.inputs || []).length }}</span>
        <span class="toggle-icon">▼</span>
      </h2>
      <div id="inputsList" class="results-list">
        <ResultItem
          v-for="(item, index) in filteredInputs"
          :key="`input-${index}`"
          :item="item"
          :options="analysisOptions"
          :type="'input'"
          :show="shouldShowItem(item)"
        />
        <p v-if="(results.inputs || []).length === 0" class="no-results">
          {{ t('noInputs') }}
        </p>
      </div>
    </div>

    <!-- Roles Section -->
    <div
      id="rolesSection"
      class="result-section"
      :class="{ hidden: !sectionsVisible.roles }"
      data-section="roles"
    >
      <h2
        class="section-header"
        data-section-toggle="roles"
        @click="toggleSectionCollapse('roles')"
      >
        <span class="icon">🎭</span>
        {{ t('elementsWithRole') }}
        <span class="count" id="rolesCount">{{ (results.roles || []).length }}</span>
        <span class="toggle-icon">▼</span>
      </h2>
      <div id="rolesList" class="results-list">
        <ResultItem
          v-for="(item, index) in filteredRoles"
          :key="`role-${index}`"
          :item="item"
          :options="analysisOptions"
          :type="'role'"
          :show="shouldShowItem(item)"
        />
        <p v-if="(results.roles || []).length === 0" class="no-results">
          {{ t('noRoles') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAnalysisStore } from '@/stores/analysis'
import { useLanguageStore } from '@/stores/language'
import ResultItem from './ResultItem.vue'
import ExportModal from '../ExportModal.vue'

const analysisStore = useAnalysisStore()
const languageStore = useLanguageStore()
const { t } = languageStore

const results = computed(() => analysisStore.results)
const analysisOptions = computed(() => analysisStore.options)

const showMissing = ref(true)
const showHasAttributes = ref(true)

const sectionsVisible = ref({
  images: true,
  links: true,
  buttons: true,
  inputs: true,
  roles: true,
})

const sectionsCollapsed = ref({
  images: false,
  links: false,
  buttons: false,
  inputs: false,
  roles: false,
})

const exportModalOpen = ref(false)

function shouldShowItem(item: any): boolean {
  const hasAttributes = item.hasAccessibility === true || item.hasAlt === true

  if (showMissing.value && showHasAttributes.value) {
    return true
  } else if (showMissing.value && !showHasAttributes.value) {
    return !hasAttributes
  } else if (!showMissing.value && showHasAttributes.value) {
    return hasAttributes
  } else {
    return false
  }
}

const filteredImages = computed(() => {
  return (results.value?.images || []).filter((item) => shouldShowItem(item))
})

const filteredLinks = computed(() => {
  return (results.value?.links || []).filter((item) => shouldShowItem(item))
})

const filteredButtons = computed(() => {
  return (results.value?.buttons || []).filter((item) => shouldShowItem(item))
})

const filteredInputs = computed(() => {
  return (results.value?.inputs || []).filter((item) => shouldShowItem(item))
})

const filteredRoles = computed(() => {
  return (results.value?.roles || []).filter((item) => shouldShowItem(item))
})

function applyFilters() {
  // Filters are applied via computed properties
}

function toggleSectionVisibility() {
  // Visibility is controlled via v-if on sections
}

function toggleSectionCollapse(section: string) {
  sectionsCollapsed.value[section as keyof typeof sectionsCollapsed.value] =
    !sectionsCollapsed.value[section as keyof typeof sectionsCollapsed.value]
  const sectionEl = document.querySelector(`[data-section="${section}"]`)
  if (sectionEl) {
    sectionEl.classList.toggle('collapsed')
  }
}

function openExportModal() {
  exportModalOpen.value = true
}

function closeExportModal() {
  exportModalOpen.value = false
}

async function handleExportPDF(exportOptions: any) {
  if (!results.value) {
    alert(t('errorNoReport'))
    return
  }

  closeExportModal()

  const exportBtn = document.getElementById('exportPdfBtn') as HTMLButtonElement | null
  if (exportBtn) {
    exportBtn.disabled = true
    exportBtn.textContent = `⏳ ${t('exporting')}`
  }

  try {
    const { exportReportAsPDF } = await import('@/utils/export')
    const doc = await exportReportAsPDF({
      data: results.value as any,
      analysisOptions: analysisOptions.value,
      showMissing: showMissing.value,
      showHasAttributes: showHasAttributes.value,
      sectionsVisible: {
        images: exportOptions.elements.images,
        links: exportOptions.elements.links,
        buttons: exportOptions.elements.buttons,
        inputs: exportOptions.elements.inputs,
        roles: exportOptions.elements.roles,
      },
      exportOptions: exportOptions,
    })
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
    doc.save(`accessibility-report-${timestamp}.pdf`)

    if (exportBtn) {
      exportBtn.textContent = `✅ ${t('exported')}`
      setTimeout(() => {
        if (exportBtn) {
          exportBtn.textContent = t('exportAsPDF')
        }
      }, 2000)
    }
  } catch (err: any) {
    alert(t('errorExportFailed') + ': ' + err.message)
    if (exportBtn) {
      exportBtn.textContent = t('exportAsPDF')
    }
  } finally {
    if (exportBtn) {
      exportBtn.disabled = false
    }
  }
}
</script>
