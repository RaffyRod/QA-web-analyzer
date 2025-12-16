<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
<template>
  <div class="options-section">
    <h2>{{ t('analysisOptions') }}</h2>
    <div class="options-container">
      <!-- Elements to Check -->
      <div class="option-group">
        <div class="option-group-header">
          <h3>{{ t('elementsToCheck') }}</h3>
          <div class="radio-group">
            <label>
              <input
                type="radio"
                name="elements"
                :checked="elementsAllSelected"
                @change="selectAllElements"
              />
              {{ t('selectAll') }}
            </label>
            <label>
              <input
                type="radio"
                name="elements"
                :checked="elementsNoneSelected"
                @change="deselectAllElements"
              />
              {{ t('deselectAll') }}
            </label>
          </div>
        </div>
        <div class="checkbox-group">
          <label
            v-for="element in sortedElements"
            :key="element.key"
          >
            <input
              :id="element.key"
              v-model="options[element.key]"
              type="checkbox"
              @change="updateOptions"
            />
            <span>{{ t(element.label) }}</span>
          </label>
        </div>
      </div>

      <!-- Attributes to Check -->
      <div class="option-group attributes-group">
        <div class="option-group-header">
          <h3>{{ t('attributesToCheck') }}</h3>
          <div class="radio-group">
            <label>
              <input
                type="radio"
                name="attributes"
                :checked="attributesAllSelected"
                @change="selectAllAttributes"
              />
              {{ t('selectAll') }}
            </label>
            <label>
              <input
                type="radio"
                name="attributes"
                :checked="attributesNoneSelected"
                @change="deselectAllAttributes"
              />
              {{ t('deselectAll') }}
            </label>
          </div>
        </div>
        
        <!-- ARIA Labels & Names -->
        <div v-if="shouldShowCategory('ariaLabels')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.ariaLabels }"
            @click="toggleCategory('ariaLabels')"
            :aria-expanded="expandedCategories.ariaLabels"
          >
            <span class="category-title">{{ t('categoryAriaLabels') }}</span>
            <span class="category-toggle">🏷️</span>
          </button>
          <transition name="slide-fade">
            <div v-if="expandedCategories.ariaLabels" class="category-content">
            <div class="checkbox-group">
              <label
                v-for="attr in getVisibleAttrsForCategory(ariaLabels)"
                :key="attr.key"
              >
                <input
                  :id="attr.key"
                  v-model="options[attr.key]"
                  type="checkbox"
                  @change="updateOptions"
                />
                <span>{{ t(attr.label) }}</span>
              </label>
            </div>
          </div>
          </transition>
        </div>

        <!-- ARIA States -->
        <div v-if="shouldShowCategory('ariaStates')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.ariaStates }"
            @click="toggleCategory('ariaStates')"
            :aria-expanded="expandedCategories.ariaStates"
          >
            <span class="category-title">{{ t('categoryAriaStates') }}</span>
            <span class="category-toggle">🔄</span>
          </button>
          <transition name="slide-fade">
            <div v-if="expandedCategories.ariaStates" class="category-content">
            <div class="checkbox-group">
              <label
                v-for="attr in getVisibleAttrsForCategory(ariaStates)"
                :key="attr.key"
              >
                <input
                  :id="attr.key"
                  v-model="options[attr.key]"
                  type="checkbox"
                  @change="updateOptions"
                />
                <span>{{ t(attr.label) }}</span>
              </label>
            </div>
          </div>
          </transition>
        </div>

        <!-- ARIA Relationships -->
        <div v-if="shouldShowCategory('ariaRelationships')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.ariaRelationships }"
            @click="toggleCategory('ariaRelationships')"
            :aria-expanded="expandedCategories.ariaRelationships"
          >
            <span class="category-title">{{ t('categoryAriaRelationships') }}</span>
            <span class="category-toggle">🔗</span>
          </button>
          <transition name="slide-fade">
            <div v-if="expandedCategories.ariaRelationships" class="category-content">
            <div class="checkbox-group">
              <label
                v-for="attr in getVisibleAttrsForCategory(ariaRelationships)"
                :key="attr.key"
              >
                <input
                  :id="attr.key"
                  v-model="options[attr.key]"
                  type="checkbox"
                  @change="updateOptions"
                />
                <span>{{ t(attr.label) }}</span>
              </label>
            </div>
          </div>
          </transition>
        </div>

        <!-- ARIA Live Regions -->
        <div v-if="shouldShowCategory('ariaLiveRegions')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.ariaLiveRegions }"
            @click="toggleCategory('ariaLiveRegions')"
            :aria-expanded="expandedCategories.ariaLiveRegions"
          >
            <span class="category-title">{{ t('categoryAriaLiveRegions') }}</span>
            <span class="category-toggle">📢</span>
          </button>
          <transition name="slide-fade">
            <div v-if="expandedCategories.ariaLiveRegions" class="category-content">
            <div class="checkbox-group">
              <label
                v-for="attr in getVisibleAttrsForCategory(ariaLiveRegions)"
                :key="attr.key"
              >
                <input
                  :id="attr.key"
                  v-model="options[attr.key]"
                  type="checkbox"
                  @change="updateOptions"
                />
                <span>{{ t(attr.label) }}</span>
              </label>
            </div>
          </div>
          </transition>
        </div>

        <!-- Form Attributes -->
        <div v-if="shouldShowCategory('formAttributes')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.formAttributes }"
            @click="toggleCategory('formAttributes')"
            :aria-expanded="expandedCategories.formAttributes"
          >
            <span class="category-title">{{ t('categoryFormAttributes') }}</span>
            <span class="category-toggle">📝</span>
          </button>
          <transition name="slide-fade">
            <div v-if="expandedCategories.formAttributes" class="category-content">
            <div class="checkbox-group">
              <label
                v-for="attr in getVisibleAttrsForCategory(formAttributes)"
                :key="attr.key"
              >
                <input
                  :id="attr.key"
                  v-model="options[attr.key]"
                  type="checkbox"
                  @change="updateOptions"
                />
                <span>{{ t(attr.label) }}</span>
              </label>
            </div>
          </div>
          </transition>
        </div>

        <!-- Other Attributes -->
        <div v-if="shouldShowCategory('otherAttributes')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.otherAttributes }"
            @click="toggleCategory('otherAttributes')"
            :aria-expanded="expandedCategories.otherAttributes"
          >
            <span class="category-title">{{ t('categoryOtherAttributes') }}</span>
            <span class="category-toggle">⚙️</span>
          </button>
          <transition name="slide-fade">
            <div v-if="expandedCategories.otherAttributes" class="category-content">
            <div class="checkbox-group">
              <label
                v-for="attr in getVisibleAttrsForCategory(otherAttributes)"
                :key="attr.key"
              >
                <input
                  :id="attr.key"
                  v-model="options[attr.key]"
                  type="checkbox"
                  @change="updateOptions"
                />
                <span>{{ t(attr.label) }}</span>
              </label>
            </div>
          </div>
          </transition>
        </div>

        <!-- Show More/Less Button -->
        <button
          v-if="totalAttributesCount > 10"
          class="show-more-btn"
          @click="showMoreAttributes = !showMoreAttributes"
        >
          {{ showMoreAttributes ? t('showLess') : t('showMore') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useAnalysisStore } from '@/stores/analysis'
import { useLanguageStore } from '@/stores/language'

const analysisStore = useAnalysisStore()
const languageStore = useLanguageStore()
const { t } = languageStore

const options = computed(() => analysisStore.options)
const showMoreAttributes = ref(true)
const isMobile = ref(false)

const expandedCategories = ref({
  ariaLabels: true,
  ariaStates: true,
  ariaRelationships: true,
  ariaLiveRegions: true,
  formAttributes: true,
  otherAttributes: true,
})

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

function toggleCategory(category: keyof typeof expandedCategories.value) {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  // Always expand all categories by default on app load/reload
  expandedCategories.value.ariaLabels = true
  expandedCategories.value.ariaStates = true
  expandedCategories.value.ariaRelationships = true
  expandedCategories.value.ariaLiveRegions = true
  expandedCategories.value.formAttributes = true
  expandedCategories.value.otherAttributes = true
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Elements organized alphabetically
const elements = [
  { key: 'checkButtons', label: 'buttons' },
  { key: 'checkFormElements', label: 'formElements' },
  { key: 'checkHeadings', label: 'headings' },
  { key: 'checkImages', label: 'images' },
  { key: 'checkInputs', label: 'inputs' },
  { key: 'checkLinks', label: 'links' },
  { key: 'checkRoles', label: 'elementsWithRole' },
  { key: 'checkTables', label: 'tables' },
]

// Attributes organized by type and alphabetically
const ariaLabels = [
  { key: 'checkAltText', label: 'altText' },
  { key: 'checkAriaDescribedby', label: 'ariaDescribedby' },
  { key: 'checkAriaLabel', label: 'ariaLabel' },
  { key: 'checkAriaLabelledby', label: 'ariaLabelledby' },
]

const ariaStates = [
  { key: 'checkAriaChecked', label: 'ariaChecked' },
  { key: 'checkAriaDisabled', label: 'ariaDisabled' },
  { key: 'checkAriaExpanded', label: 'ariaExpanded' },
  { key: 'checkAriaHidden', label: 'ariaHidden' },
  { key: 'checkAriaInvalid', label: 'ariaInvalid' },
  { key: 'checkAriaPressed', label: 'ariaPressed' },
  { key: 'checkAriaRequired', label: 'ariaRequired' },
]

const ariaRelationships = [
  { key: 'checkAriaControls', label: 'ariaControls' },
  { key: 'checkAriaCurrent', label: 'ariaCurrent' },
]

const ariaLiveRegions = [
  { key: 'checkAriaBusy', label: 'ariaBusy' },
  { key: 'checkAriaLive', label: 'ariaLive' },
]

const formAttributes = [
  { key: 'checkAutocomplete', label: 'autocomplete' },
  { key: 'checkLabels', label: 'labelElements' },
  { key: 'checkRequired', label: 'required' },
]

const otherAttributes = [
  { key: 'checkFocusStates', label: 'focusStates' },
  { key: 'checkHref', label: 'href' },
  { key: 'checkLang', label: 'lang' },
  { key: 'checkTabIndex', label: 'tabIndex' },
  { key: 'checkTitle', label: 'titleAttribute' },
]

const sortedElements = computed(() => elements)

const allAttributes = computed(() => [
  ...ariaLabels,
  ...ariaStates,
  ...ariaRelationships,
  ...ariaLiveRegions,
  ...formAttributes,
  ...otherAttributes,
])

const totalAttributesCount = computed(() => allAttributes.value.length)

const visibleAttributes = computed(() => {
  if (showMoreAttributes.value) {
    return allAttributes.value
  }
  return allAttributes.value.slice(0, 10)
})

const visibleAttributeKeys = computed(() => {
  return new Set(visibleAttributes.value.map(attr => attr.key))
})

function getVisibleAttrsForCategory(category: typeof ariaLabels) {
  if (showMoreAttributes.value) {
    return category
  }
  return category.filter(attr => visibleAttributeKeys.value.has(attr.key))
}

function shouldShowCategory(categoryName: string) {
  if (showMoreAttributes.value) {
    return true
  }
  const categoryMap: Record<string, typeof ariaLabels> = {
    ariaLabels,
    ariaStates,
    ariaRelationships,
    ariaLiveRegions,
    formAttributes,
    otherAttributes,
  }
  const category = categoryMap[categoryName]
  return category.some(attr => visibleAttributeKeys.value.has(attr.key))
}

const elementCheckboxes = computed(() => elements.map(e => e.key))

const attributeCheckboxes = computed(() => allAttributes.value.map(a => a.key))

const elementsAllSelected = computed(() => {
  return elementCheckboxes.value.every(key => options.value[key as keyof typeof options.value])
})

const elementsNoneSelected = computed(() => {
  return elementCheckboxes.value.every(key => !options.value[key as keyof typeof options.value])
})

const attributesAllSelected = computed(() => {
  return attributeCheckboxes.value.every(key => options.value[key as keyof typeof options.value])
})

const attributesNoneSelected = computed(() => {
  return attributeCheckboxes.value.every(key => !options.value[key as keyof typeof options.value])
})

function updateOptions() {
  // Options are already reactive via v-model
}

function selectAllElements() {
  const newOptions: any = {}
  elementCheckboxes.value.forEach(key => {
    newOptions[key] = true
  })
  analysisStore.updateOptions(newOptions)
}

function deselectAllElements() {
  const newOptions: any = {}
  elementCheckboxes.value.forEach(key => {
    newOptions[key] = false
  })
  analysisStore.updateOptions(newOptions)
}

function selectAllAttributes() {
  const newOptions: any = {}
  attributeCheckboxes.value.forEach(key => {
    newOptions[key] = true
  })
  analysisStore.updateOptions(newOptions)
  
  // Expand all categories and show all attributes
  expandedCategories.value.ariaLabels = true
  expandedCategories.value.ariaStates = true
  expandedCategories.value.ariaRelationships = true
  expandedCategories.value.ariaLiveRegions = true
  expandedCategories.value.formAttributes = true
  expandedCategories.value.otherAttributes = true
  showMoreAttributes.value = true
}

function deselectAllAttributes() {
  const newOptions: any = {}
  attributeCheckboxes.value.forEach(key => {
    newOptions[key] = false
  })
  analysisStore.updateOptions(newOptions)
  
  // Collapse all categories when deselecting all
  expandedCategories.value.ariaLabels = false
  expandedCategories.value.ariaStates = false
  expandedCategories.value.ariaRelationships = false
  expandedCategories.value.ariaLiveRegions = false
  expandedCategories.value.formAttributes = false
  expandedCategories.value.otherAttributes = false
}
</script>

<style scoped>
.options-section .options-container {
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: flex-start;
}

.option-group {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.option-group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
}

.option-group-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.option-group-header h3::before {
  content: '';
  width: 4px;
  height: 20px;
  background: var(--primary-color, #2563eb);
  border-radius: 2px;
  display: inline-block;
}

.radio-group {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-left: auto;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text-secondary, #64748b);
  font-weight: 500;
  transition: color 0.2s ease;
  -webkit-transition: color 0.2s ease;
  -moz-transition: color 0.2s ease;
  -o-transition: color 0.2s ease;
  white-space: nowrap;
}

.radio-group label:hover {
  color: var(--text-primary, #1e293b);
}

.radio-group input[type='radio'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--primary-color, #2563eb);
  margin: 0;
  flex-shrink: 0;
}

.radio-group label:has(input[type='radio']:checked) {
  color: var(--primary-color, #2563eb);
  font-weight: 600;
}

.option-group.attributes-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: stretch;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.checkbox-group label {
  color: var(--text-primary, #1e293b);
}

.checkbox-group label span {
  color: var(--text-primary, #1e293b);
}

.checkbox-group label:has(input[type="checkbox"]:checked) {
  color: var(--primary-color, #2563eb);
  font-weight: 600;
}

.checkbox-group label:has(input[type="checkbox"]:checked) span {
  color: var(--primary-color, #2563eb);
}

.checkbox-group input[type="checkbox"]:checked {
  accent-color: var(--primary-color, #2563eb);
}

.attribute-category {
  margin-top: 12px;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  overflow: hidden;
  background: var(--card-bg, #ffffff);
  width: 100%;
  transition: margin 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: margin 0.25s cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: margin 0.25s cubic-bezier(0.4, 0, 0.2, 1), -moz-transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: margin 0.25s cubic-bezier(0.4, 0, 0.2, 1), -o-transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: margin, transform;
  -webkit-will-change: margin, transform;
}

.attribute-category:first-of-type {
  margin-top: 12px;
}

.category-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--card-bg, #ffffff);
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.category-header:hover {
  background: var(--card-hover-bg, rgba(0, 0, 0, 0.02));
}

.category-header.expanded {
  background: var(--primary-color, #2563eb);
  color: white;
}

.category-header.expanded .category-title {
  color: white;
}

.category-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary, #1e293b);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 2px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6);
  -webkit-text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 2px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6);
}

.category-toggle {
  font-size: 1.1rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: var(--card-bg, #ffffff);
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  flex-shrink: 0;
}

.category-header.expanded .category-toggle {
  background: rgba(255, 255, 255, 0.2);
}

.category-content {
  padding: 12px 16px;
  overflow: hidden;
  background: var(--card-bg, #ffffff);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.category-content .checkbox-group label {
  color: var(--text-primary, #1e293b) !important;
}

.category-content .checkbox-group label span {
  color: var(--text-primary, #1e293b) !important;
}

.category-content .checkbox-group label:has(input[type="checkbox"]:checked) {
  color: var(--primary-color, #2563eb) !important;
}

.category-content .checkbox-group label:has(input[type="checkbox"]:checked) span {
  color: var(--primary-color, #2563eb) !important;
}

/* Smooth slide-fade transition */
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  transform: translateY(-10px);
  -webkit-transform: translateY(-10px);
  -moz-transform: translateY(-10px);
  -ms-transform: translateY(-10px);
}

.slide-fade-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  transform: translateY(-10px);
  -webkit-transform: translateY(-10px);
  -moz-transform: translateY(-10px);
  -ms-transform: translateY(-10px);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  max-height: 1000px;
  transform: translateY(0);
  -webkit-transform: translateY(0);
  -moz-transform: translateY(0);
  -ms-transform: translateY(0);
}

.show-more-btn {
  margin-top: 16px;
  padding: 6px 12px;
  width: auto;
  align-self: flex-start;
  background: transparent;
  color: var(--text-secondary, #64748b);
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
}

.show-more-btn:hover {
  background: var(--bg-color, #f8fafc);
  color: var(--text-primary, #1e293b);
  border-color: var(--primary-color, #2563eb);
}

.show-more-btn:active {
  background: var(--card-hover-bg, rgba(0, 0, 0, 0.02));
}

.options-section > h2 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  position: relative;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color, #e2e8f0);
}

.options-section > h2::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 60px;
  height: 2px;
  background: var(--primary-color, #2563eb);
  border-radius: 2px;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .options-section .options-container {
    flex-direction: column;
    gap: 16px;
  }

  .options-section > h2 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }

  .options-section > h2::after {
    width: 40px;
  }

  .option-group-header {
    flex-direction: row;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    flex-wrap: wrap;
  }

  .option-group-header h3 {
    font-size: 1rem;
    flex: 1;
    min-width: 200px;
  }

  .option-group-header h3::before {
    height: 18px;
  }

  .radio-group {
    flex-shrink: 0;
    margin-left: auto;
    justify-content: flex-end;
  }

  .checkbox-group {
    gap: 8px;
    margin-top: 8px;
  }

  .checkbox-group label {
    padding: 8px;
    font-size: 0.9rem;
    border-radius: 6px;
    background: var(--bg-color, #f8fafc);
    transition: background 0.2s ease;
    -webkit-transition: background 0.2s ease;
    -moz-transition: background 0.2s ease;
    -o-transition: background 0.2s ease;
  }

  .checkbox-group label:active {
    background: var(--card-hover-bg, rgba(0, 0, 0, 0.05));
  }

  .attribute-category {
    margin-top: 12px;
    border-radius: 8px;
  }

  .category-header {
    padding: 14px 16px;
  }

  .category-title {
    font-size: 0.8rem;
  }

  .category-content {
    padding: 10px 16px;
  }

  .show-more-btn {
    margin-top: 12px;
    padding: 8px 14px;
    font-size: 0.85rem;
  }

  /* Touch-friendly checkboxes */
  .checkbox-group input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
}

/* Very small screens */
@media (max-width: 480px) {
  .options-section > h2 {
    font-size: 1.1rem;
    margin-bottom: 16px;
    padding-bottom: 8px;
  }

  .options-section > h2::after {
    width: 35px;
  }

  .option-group-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 10px;
    padding-bottom: 8px;
  }

  .option-group-header h3 {
    font-size: 0.95rem;
    width: 100%;
  }

  .option-group-header h3::before {
    height: 16px;
    width: 3px;
  }

  .radio-group {
    width: 100%;
    display: flex;
    gap: 12px;
    margin-left: 0;
    justify-content: flex-start;
  }

  .category-header {
    padding: 12px;
  }

  .category-content {
    padding: 8px 12px;
  }

  .checkbox-group label {
    padding: 10px;
    font-size: 0.85rem;
  }
}
</style>
