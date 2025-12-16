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
            <span class="category-title">ARIA Labels & Names</span>
            <span class="category-toggle">{{ expandedCategories.ariaLabels ? '−' : '+' }}</span>
          </button>
          <div v-show="expandedCategories.ariaLabels || !isMobile" class="category-content">
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
        </div>

        <!-- ARIA States -->
        <div v-if="shouldShowCategory('ariaStates')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.ariaStates }"
            @click="toggleCategory('ariaStates')"
            :aria-expanded="expandedCategories.ariaStates"
          >
            <span class="category-title">ARIA States</span>
            <span class="category-toggle">{{ expandedCategories.ariaStates ? '−' : '+' }}</span>
          </button>
          <div v-show="expandedCategories.ariaStates || !isMobile" class="category-content">
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
        </div>

        <!-- ARIA Relationships -->
        <div v-if="shouldShowCategory('ariaRelationships')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.ariaRelationships }"
            @click="toggleCategory('ariaRelationships')"
            :aria-expanded="expandedCategories.ariaRelationships"
          >
            <span class="category-title">ARIA Relationships</span>
            <span class="category-toggle">{{ expandedCategories.ariaRelationships ? '−' : '+' }}</span>
          </button>
          <div v-show="expandedCategories.ariaRelationships || !isMobile" class="category-content">
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
        </div>

        <!-- ARIA Live Regions -->
        <div v-if="shouldShowCategory('ariaLiveRegions')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.ariaLiveRegions }"
            @click="toggleCategory('ariaLiveRegions')"
            :aria-expanded="expandedCategories.ariaLiveRegions"
          >
            <span class="category-title">ARIA Live Regions</span>
            <span class="category-toggle">{{ expandedCategories.ariaLiveRegions ? '−' : '+' }}</span>
          </button>
          <div v-show="expandedCategories.ariaLiveRegions || !isMobile" class="category-content">
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
        </div>

        <!-- Form Attributes -->
        <div v-if="shouldShowCategory('formAttributes')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.formAttributes }"
            @click="toggleCategory('formAttributes')"
            :aria-expanded="expandedCategories.formAttributes"
          >
            <span class="category-title">Form Attributes</span>
            <span class="category-toggle">{{ expandedCategories.formAttributes ? '−' : '+' }}</span>
          </button>
          <div v-show="expandedCategories.formAttributes || !isMobile" class="category-content">
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
        </div>

        <!-- Other Attributes -->
        <div v-if="shouldShowCategory('otherAttributes')" class="attribute-category">
          <button
            class="category-header"
            :class="{ expanded: expandedCategories.otherAttributes }"
            @click="toggleCategory('otherAttributes')"
            :aria-expanded="expandedCategories.otherAttributes"
          >
            <span class="category-title">Other Attributes</span>
            <span class="category-toggle">{{ expandedCategories.otherAttributes ? '−' : '+' }}</span>
          </button>
          <div v-show="expandedCategories.otherAttributes || !isMobile" class="category-content">
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
        </div>

        <!-- Show More/Less Button -->
        <button
          v-if="totalAttributesCount > 10"
          class="show-more-btn"
          @click="showMoreAttributes = !showMoreAttributes"
        >
          {{ showMoreAttributes ? t('showLess') : t('showMore') }}
          ({{ totalAttributesCount - 10 }} {{ showMoreAttributes ? 'less' : 'more' }})
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
const showMoreAttributes = ref(false)
const isMobile = ref(false)

const expandedCategories = ref({
  ariaLabels: false,
  ariaStates: false,
  ariaRelationships: false,
  ariaLiveRegions: false,
  formAttributes: false,
  otherAttributes: false,
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
  // On mobile, expand first category by default
  if (isMobile.value) {
    expandedCategories.value.ariaLabels = true
  }
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
}

function deselectAllAttributes() {
  const newOptions: any = {}
  attributeCheckboxes.value.forEach(key => {
    newOptions[key] = false
  })
  analysisStore.updateOptions(newOptions)
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
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.attribute-category {
  margin-top: 16px;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  overflow: hidden;
  background: var(--card-bg, #ffffff);
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
  background: var(--bg-color, #f8fafc);
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
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
  color: var(--text-secondary, #64748b);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
}

.category-toggle {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-secondary, #64748b);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: var(--card-bg, #ffffff);
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
}

.category-header.expanded .category-toggle {
  color: var(--primary-color, #2563eb);
  background: white;
}

.category-content {
  padding: 12px 16px;
  animation: slideDown 0.2s ease;
  -webkit-animation: slideDown 0.2s ease;
  -moz-animation: slideDown 0.2s ease;
  -o-animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
  }
}

.show-more-btn {
  margin-top: 20px;
  padding: 10px 20px;
  width: 100%;
  background: var(--primary-color, #2563eb);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.show-more-btn:hover {
  background: var(--primary-hover, #1d4ed8);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.show-more-btn:active {
  transform: translateY(0);
}

.options-section > h2 {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 20px;
  font-weight: 700;
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .options-section .options-container {
    flex-direction: column;
    gap: 16px;
  }

  .options-section > h2 {
    font-size: 1.1rem;
    margin-bottom: 16px;
  }

  .option-group-header h3 {
    font-size: 0.95rem;
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
    margin-top: 16px;
    padding: 12px 20px;
    font-size: 0.95rem;
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
    font-size: 1rem;
  }

  .option-group-header {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }

  .radio-group {
    width: 100%;
    display: flex;
    gap: 12px;
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
