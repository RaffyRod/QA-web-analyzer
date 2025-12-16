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
        <h4>WCAG 2.2 AA Accessibility Guidelines</h4>
        <button
          id="wcagInfoClose"
          class="wcag-modal-close"
          @click="handleClose"
          aria-label="Close"
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

// WCAG items data
const wcagItems = computed(() => [
  {
    id: 'alt-text',
    title: 'Alt Text',
    description: 'All images must have descriptive <strong>alt</strong> attributes. Decorative images should use <strong>alt=""</strong>.',
    note: '<strong>For Images:</strong> According to WCAG 2.2 AA, images must have alternative text via <strong>alt</strong> (preferred), <strong>aria-label</strong>, or <strong>aria-labelledby</strong>. If an image has <strong>alt</strong>, <strong>aria-label</strong> is not required. If no <strong>alt</strong> is present, the image must have either <strong>aria-label</strong> or <strong>aria-labelledby</strong>.',
    keywords: ['alt', 'text', 'image', 'decorative', 'descriptive', 'alternative']
  },
  {
    id: 'aria-label',
    title: 'aria-label',
    description: 'Provides an accessible name for elements that don\'t have visible text labels.',
    note: '<strong>For Images:</strong> <strong>aria-label</strong> can be used as alternative text for images, but <strong>alt</strong> is the preferred method. If an image has <strong>alt</strong>, <strong>aria-label</strong> is not required. Only mark as missing if the image has no <strong>alt</strong> and no <strong>aria-label</strong>.',
    keywords: ['aria', 'label', 'accessible', 'name', 'element']
  },
  {
    id: 'aria-labelledby',
    title: 'aria-labelledby',
    description: 'References another element that provides the accessible name.',
    note: '<strong>For Images:</strong> <strong>aria-labelledby</strong> can be used as alternative text for images, but <strong>alt</strong> is the preferred method. If an image has <strong>alt</strong>, <strong>aria-labelledby</strong> is not required.',
    keywords: ['aria', 'labelledby', 'reference', 'element', 'name']
  },
  {
    id: 'aria-describedby',
    title: 'aria-describedby',
    description: 'References elements that provide additional descriptive information.',
    keywords: ['aria', 'describedby', 'description', 'additional', 'information']
  },
  {
    id: 'aria-hidden',
    title: 'aria-hidden',
    description: 'Should be used carefully. Hides decorative elements from screen readers.',
    keywords: ['aria', 'hidden', 'decorative', 'screen', 'reader', 'hide']
  },
  {
    id: 'aria-expanded',
    title: 'aria-expanded',
    description: 'Indicates whether collapsible elements are expanded or collapsed.',
    keywords: ['aria', 'expanded', 'collapsible', 'collapsed', 'toggle']
  },
  {
    id: 'aria-controls',
    title: 'aria-controls',
    description: 'Identifies elements controlled by the current element.',
    keywords: ['aria', 'controls', 'controlled', 'element', 'relationship']
  },
  {
    id: 'aria-current',
    title: 'aria-current',
    description: 'Indicates the current item in a set of related elements.',
    keywords: ['aria', 'current', 'item', 'set', 'related']
  },
  {
    id: 'aria-required',
    title: 'aria-required',
    description: 'Indicates that user input is required for form controls.',
    keywords: ['aria', 'required', 'input', 'form', 'control', 'mandatory']
  },
  {
    id: 'aria-invalid',
    title: 'aria-invalid',
    description: 'Indicates that the value entered is invalid.',
    keywords: ['aria', 'invalid', 'value', 'error', 'validation']
  },
  {
    id: 'tabindex',
    title: 'tabindex',
    description: 'Controls keyboard navigation. Use <strong>tabindex="0"</strong> for focusable elements, avoid positive values.',
    keywords: ['tabindex', 'keyboard', 'navigation', 'focusable', 'tab', 'order']
  },
  {
    id: 'lang',
    title: 'lang',
    description: 'Specifies the language of the element\'s content for screen readers.',
    keywords: ['lang', 'language', 'screen', 'reader', 'content', 'locale']
  },
  {
    id: 'label-elements',
    title: '<label> elements',
    description: 'All form inputs should have associated <strong>&lt;label&gt;</strong> elements.',
    keywords: ['label', 'form', 'input', 'associated', 'element']
  },
  {
    id: 'title-attribute',
    title: 'title attribute',
    description: 'Provides additional tooltip information, but should not be the only way to convey important information.',
    keywords: ['title', 'tooltip', 'information', 'additional', 'attribute']
  },
  {
    id: 'focus-states',
    title: 'Focus States',
    description: 'All interactive elements must have visible focus indicators that meet WCAG 2.2 AA contrast requirements.',
    keywords: ['focus', 'state', 'interactive', 'indicator', 'contrast', 'visible']
  },
  {
    id: 'aria-checked',
    title: 'aria-checked',
    description: 'Indicates the checked state of checkboxes, radio buttons, and other toggleable elements. Required for custom controls.',
    keywords: ['aria', 'checked', 'checkbox', 'radio', 'button', 'toggle', 'state']
  },
  {
    id: 'aria-disabled',
    title: 'aria-disabled',
    description: 'Indicates that an element is disabled but still visible. Use with interactive elements that cannot be activated.',
    keywords: ['aria', 'disabled', 'element', 'visible', 'interactive', 'activate']
  },
  {
    id: 'aria-pressed',
    title: 'aria-pressed',
    description: 'Indicates the pressed state of toggle buttons. Use for buttons that can be toggled on/off.',
    keywords: ['aria', 'pressed', 'toggle', 'button', 'state', 'on', 'off']
  },
  {
    id: 'aria-busy',
    title: 'aria-busy',
    description: 'Indicates that an element is being modified and assistive technologies may need to wait before presenting updates.',
    keywords: ['aria', 'busy', 'modified', 'loading', 'assistive', 'technology', 'wait']
  },
  {
    id: 'aria-live',
    title: 'aria-live',
    description: 'Indicates that an element will be updated and describes the types of updates. Use for dynamic content regions.',
    note: '<strong>Values:</strong> <strong>off</strong> (default), <strong>polite</strong> (announce when idle), <strong>assertive</strong> (announce immediately).',
    keywords: ['aria', 'live', 'updated', 'dynamic', 'content', 'region', 'announce']
  },
  {
    id: 'autocomplete',
    title: 'autocomplete',
    description: 'Helps users fill out forms faster and more accurately. Required for certain input types per WCAG 2.2 AA.',
    note: '<strong>Common values:</strong> name, email, tel, url, address-line1, country, etc.',
    keywords: ['autocomplete', 'form', 'input', 'fill', 'accurate', 'faster']
  },
  {
    id: 'required',
    title: 'required',
    description: 'Indicates that a form field must be filled out before submission. Provides visual and programmatic indication.',
    keywords: ['required', 'form', 'field', 'submission', 'mandatory', 'fill']
  },
  {
    id: 'headings',
    title: 'Headings (h1-h6)',
    description: 'Provide semantic structure to content. Must have proper hierarchy (one h1 per page, no skipped levels).',
    note: '<strong>Best Practice:</strong> Use headings to organize content logically. Screen readers use them for navigation.',
    keywords: ['heading', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'semantic', 'structure', 'hierarchy']
  },
  {
    id: 'tables',
    title: 'Tables',
    description: 'Data tables must have proper headers (th elements) with scope attributes, and optionally caption or summary.',
    note: '<strong>Requirements:</strong> Use <strong>scope</strong> on th elements (col, row, colgroup, rowgroup). Complex tables may need <strong>headers</strong> attribute on td.',
    keywords: ['table', 'data', 'header', 'th', 'scope', 'caption', 'summary', 'td']
  },
  {
    id: 'form-elements',
    title: 'Form Elements (select, textarea)',
    description: 'Form controls must have associated labels and proper accessibility attributes. Select elements need accessible options.',
    note: '<strong>Requirements:</strong> All form elements should have <strong>label</strong> elements or <strong>aria-label</strong>/<strong>aria-labelledby</strong>.',
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

