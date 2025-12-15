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
        <label>
          <input
            id="checkImages"
            v-model="options.checkImages"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('images') }}</span>
        </label>
        <label>
          <input
            id="checkLinks"
            v-model="options.checkLinks"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('links') }}</span>
        </label>
        <label>
          <input
            id="checkButtons"
            v-model="options.checkButtons"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('buttons') }}</span>
        </label>
        <label>
          <input
            id="checkInputs"
            v-model="options.checkInputs"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('inputs') }}</span>
        </label>
        <label>
          <input
            id="checkRoles"
            v-model="options.checkRoles"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('elementsWithRole') }}</span>
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
      <div class="checkbox-group">
        <label>
          <input
            id="checkAltText"
            v-model="options.checkAltText"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('altText') }}</span>
        </label>
        <label>
          <input
            id="checkAriaLabel"
            v-model="options.checkAriaLabel"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaLabel') }}</span>
        </label>
        <label>
          <input
            id="checkAriaLabelledby"
            v-model="options.checkAriaLabelledby"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaLabelledby') }}</span>
        </label>
        <label>
          <input
            id="checkAriaDescribedby"
            v-model="options.checkAriaDescribedby"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaDescribedby') }}</span>
        </label>
        <label>
          <input
            id="checkAriaHidden"
            v-model="options.checkAriaHidden"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaHidden') }}</span>
        </label>
        <label>
          <input
            id="checkAriaExpanded"
            v-model="options.checkAriaExpanded"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaExpanded') }}</span>
        </label>
        <label>
          <input
            id="checkAriaControls"
            v-model="options.checkAriaControls"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaControls') }}</span>
        </label>
        <label>
          <input
            id="checkAriaCurrent"
            v-model="options.checkAriaCurrent"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaCurrent') }}</span>
        </label>
        <label>
          <input
            id="checkAriaRequired"
            v-model="options.checkAriaRequired"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaRequired') }}</span>
        </label>
        <label>
          <input
            id="checkAriaInvalid"
            v-model="options.checkAriaInvalid"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('ariaInvalid') }}</span>
        </label>
        <label>
          <input
            id="checkTabIndex"
            v-model="options.checkTabIndex"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('tabIndex') }}</span>
        </label>
        <label>
          <input
            id="checkLang"
            v-model="options.checkLang"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('lang') }}</span>
        </label>
        <label>
          <input
            id="checkLabels"
            v-model="options.checkLabels"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('labelElements') }}</span>
        </label>
        <label>
          <input
            id="checkTitle"
            v-model="options.checkTitle"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('titleAttribute') }}</span>
        </label>
        <label>
          <input
            id="checkFocusStates"
            v-model="options.checkFocusStates"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('focusStates') }}</span>
        </label>
        <label>
          <input
            id="checkHref"
            v-model="options.checkHref"
            type="checkbox"
            @change="updateOptions"
          />
          <span>{{ t('href') }}</span>
        </label>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useAnalysisStore } from '@/stores/analysis'
import { useLanguageStore } from '@/stores/language'

const analysisStore = useAnalysisStore()
const languageStore = useLanguageStore()
const { t } = languageStore

const options = computed(() => analysisStore.options)

const elementCheckboxes = computed(() => [
  'checkImages',
  'checkLinks',
  'checkButtons',
  'checkInputs',
  'checkRoles'
])

const attributeCheckboxes = computed(() => [
  'checkAltText',
  'checkAriaLabel',
  'checkAriaLabelledby',
  'checkAriaDescribedby',
  'checkAriaHidden',
  'checkAriaExpanded',
  'checkAriaControls',
  'checkAriaCurrent',
  'checkAriaRequired',
  'checkAriaInvalid',
  'checkTabIndex',
  'checkLang',
  'checkLabels',
  'checkTitle',
  'checkFocusStates',
  'checkHref'
])

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
  // Options are already reactive via v-model, no need to update
  // This function is kept for potential future side effects
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

// Watch for manual checkbox changes to update radio buttons
watch(() => options.value, () => {
  // Radio buttons will update automatically via computed properties
}, { deep: true })
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

.options-section > h2 {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: 20px;
  font-weight: 700;
}

@media (max-width: 768px) {
  .options-section .options-container {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
