<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
<template>
  <div
    id="wcagInfoSection"
    :class="['wcag-info-modal', { hidden: !isOpen }]"
    @click.self="handleClose"
  >
    <div class="wcag-modal-overlay" @click="handleClose"></div>
    <div class="wcag-modal-content">
      <div class="wcag-modal-header">
        <h4>{{ t('wcagGuidelines') }}</h4>
        <button
          id="wcagInfoClose"
          class="wcag-modal-close"
          @click="handleClose"
          :aria-label="t('close')"
        >
          ×
        </button>
      </div>
      <div class="wcag-search-container">
        <div class="search-input-wrapper">
          <svg
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            class="wcag-search-input"
            :placeholder="t('searchPlaceholder')"
            :aria-label="t('search')"
          />
          <span v-if="searchQuery.length > 0 && searchQuery.length < 3" class="search-hint">
            {{ t('typeMore') }}
          </span>
          <button
            v-if="searchQuery.length > 0"
            class="search-clear-btn"
            @click="clearSearch"
            :aria-label="t('clearSearch')"
          >
            ×
          </button>
        </div>
      </div>
      <div class="wcag-info-content">
        <div v-if="filteredItems.length === 0 && searchQuery.length >= 3" class="no-results">
          <p>{{ t('noResults') }}</p>
        </div>
        <div v-else class="wcag-info-grid">
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="wcag-item"
          >
            <strong v-html="item.title"></strong>
            <p v-html="item.description"></p>
            <p v-if="item.note" class="wcag-note" v-html="item.note"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()
const { t } = languageStore

const props = defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const isOpen = ref(props.isOpen ?? false)
const searchQuery = ref('')

// WCAG items data - dynamically translated based on current language
const wcagItems = computed(() => [
  {
    id: 'alt-text',
    title: t('wcagAltText'),
    description: t('wcagAltTextDesc'),
    note: t('wcagAltTextNote'),
    keywords: ['alt', 'text', 'image', 'decorative', 'descriptive', 'alternative']
  },
  {
    id: 'aria-label',
    title: t('wcagAriaLabel'),
    description: t('wcagAriaLabelDesc'),
    note: t('wcagAriaLabelNote'),
    keywords: ['aria', 'label', 'accessible', 'name', 'element']
  },
  {
    id: 'aria-labelledby',
    title: t('wcagAriaLabelledby'),
    description: t('wcagAriaLabelledbyDesc'),
    note: t('wcagAriaLabelledbyNote'),
    keywords: ['aria', 'labelledby', 'reference', 'element', 'name']
  },
  {
    id: 'aria-describedby',
    title: t('wcagAriaDescribedby'),
    description: t('wcagAriaDescribedbyDesc'),
    keywords: ['aria', 'describedby', 'description', 'additional', 'information']
  },
  {
    id: 'aria-hidden',
    title: t('wcagAriaHidden'),
    description: t('wcagAriaHiddenDesc'),
    keywords: ['aria', 'hidden', 'decorative', 'screen', 'reader', 'hide']
  },
  {
    id: 'aria-expanded',
    title: t('wcagAriaExpanded'),
    description: t('wcagAriaExpandedDesc'),
    keywords: ['aria', 'expanded', 'collapsible', 'collapsed', 'toggle']
  },
  {
    id: 'aria-controls',
    title: t('wcagAriaControls'),
    description: t('wcagAriaControlsDesc'),
    keywords: ['aria', 'controls', 'controlled', 'element', 'relationship']
  },
  {
    id: 'aria-current',
    title: t('wcagAriaCurrent'),
    description: t('wcagAriaCurrentDesc'),
    keywords: ['aria', 'current', 'item', 'set', 'related']
  },
  {
    id: 'aria-required',
    title: t('wcagAriaRequired'),
    description: t('wcagAriaRequiredDesc'),
    keywords: ['aria', 'required', 'input', 'form', 'control', 'mandatory']
  },
  {
    id: 'aria-invalid',
    title: t('wcagAriaInvalid'),
    description: t('wcagAriaInvalidDesc'),
    keywords: ['aria', 'invalid', 'value', 'error', 'validation']
  },
  {
    id: 'tabindex',
    title: t('wcagTabIndex'),
    description: t('wcagTabIndexDesc'),
    keywords: ['tabindex', 'keyboard', 'navigation', 'focusable', 'tab', 'order']
  },
  {
    id: 'lang',
    title: t('wcagLang'),
    description: t('wcagLangDesc'),
    keywords: ['lang', 'language', 'screen', 'reader', 'content', 'locale']
  },
  {
    id: 'label-elements',
    title: t('wcagLabelElements'),
    description: t('wcagLabelElementsDesc'),
    keywords: ['label', 'form', 'input', 'associated', 'element']
  },
  {
    id: 'title-attribute',
    title: t('wcagTitleAttribute'),
    description: t('wcagTitleAttributeDesc'),
    keywords: ['title', 'tooltip', 'information', 'additional', 'attribute']
  },
  {
    id: 'focus-states',
    title: t('wcagFocusStates'),
    description: t('wcagFocusStatesDesc'),
    keywords: ['focus', 'state', 'interactive', 'indicator', 'contrast', 'visible']
  },
  {
    id: 'aria-checked',
    title: t('wcagAriaChecked'),
    description: t('wcagAriaCheckedDesc'),
    keywords: ['aria', 'checked', 'checkbox', 'radio', 'button', 'toggle', 'state']
  },
  {
    id: 'aria-disabled',
    title: t('wcagAriaDisabled'),
    description: t('wcagAriaDisabledDesc'),
    keywords: ['aria', 'disabled', 'element', 'visible', 'interactive', 'activate']
  },
  {
    id: 'aria-pressed',
    title: t('wcagAriaPressed'),
    description: t('wcagAriaPressedDesc'),
    keywords: ['aria', 'pressed', 'toggle', 'button', 'state', 'on', 'off']
  },
  {
    id: 'aria-busy',
    title: t('wcagAriaBusy'),
    description: t('wcagAriaBusyDesc'),
    keywords: ['aria', 'busy', 'modified', 'loading', 'assistive', 'technology', 'wait']
  },
  {
    id: 'aria-live',
    title: t('wcagAriaLive'),
    description: t('wcagAriaLiveDesc'),
    note: t('wcagAriaLiveNote'),
    keywords: ['aria', 'live', 'updated', 'dynamic', 'content', 'region', 'announce']
  },
  {
    id: 'autocomplete',
    title: t('wcagAutocomplete'),
    description: t('wcagAutocompleteDesc'),
    note: t('wcagAutocompleteNote'),
    keywords: ['autocomplete', 'form', 'input', 'fill', 'accurate', 'faster']
  },
  {
    id: 'required',
    title: t('wcagRequired'),
    description: t('wcagRequiredDesc'),
    keywords: ['required', 'form', 'field', 'submission', 'mandatory', 'fill']
  },
  {
    id: 'headings',
    title: t('wcagHeadings'),
    description: t('wcagHeadingsDesc'),
    note: t('wcagHeadingsNote'),
    keywords: ['heading', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'semantic', 'structure', 'hierarchy']
  },
  {
    id: 'tables',
    title: t('wcagTables'),
    description: t('wcagTablesDesc'),
    note: t('wcagTablesNote'),
    keywords: ['table', 'data', 'header', 'th', 'scope', 'caption', 'summary', 'td']
  },
  {
    id: 'form-elements',
    title: t('wcagFormElements'),
    description: t('wcagFormElementsDesc'),
    note: t('wcagFormElementsNote'),
    keywords: ['form', 'element', 'select', 'textarea', 'control', 'label', 'accessible', 'option']
  },
])

// Filter items based on search query (minimum 3 characters)
// Only searches in titles
const filteredItems = computed(() => {
  if (searchQuery.value.length < 3) {
    return wcagItems.value
  }
  
  const query = searchQuery.value.toLowerCase().trim()
  return wcagItems.value.filter(item => {
    // Search only in title
    return item.title.toLowerCase().includes(query)
  })
})

function clearSearch() {
  searchQuery.value = ''
}

// Watch prop changes
watch(() => props.isOpen, (newValue) => {
  if (newValue !== undefined) {
    isOpen.value = newValue
    updateBodyOverflow(newValue)
  }
})

// Watch internal state changes
watch(isOpen, (newValue) => {
  emit('update:isOpen', newValue)
  updateBodyOverflow(newValue)
  // Clear search when modal closes
  if (!newValue) {
    searchQuery.value = ''
  }
})

function updateBodyOverflow(open: boolean) {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

function handleClose() {
  isOpen.value = false
  // Clear search when closing modal
  searchQuery.value = ''
}

function handleEscape(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    handleClose()
  }
}

// Keep window methods for backward compatibility with legacy code
function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  // Initialize from prop
  if (props.isOpen !== undefined) {
    isOpen.value = props.isOpen
    updateBodyOverflow(props.isOpen)
  }
  // Keep for backward compatibility
  ;(window as any).openWcagModal = openModal
  ;(window as any).closeWcagModal = closeModal
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
  delete (window as any).openWcagModal
  delete (window as any).closeWcagModal
})
</script>

