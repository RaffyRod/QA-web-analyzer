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
      <div class="wcag-info-content">
        <div class="wcag-info-grid">
          <div class="wcag-item">
            <strong>Alt Text</strong>
            <p>All images must have descriptive <strong>alt</strong> attributes. Decorative images should use <strong>alt=""</strong>.</p>
            <p class="wcag-note"><strong>For Images:</strong> According to WCAG 2.2 AA, images must have alternative text via <strong>alt</strong> (preferred), <strong>aria-label</strong>, or <strong>aria-labelledby</strong>. If an image has <strong>alt</strong>, <strong>aria-label</strong> is not required. If no <strong>alt</strong> is present, the image must have either <strong>aria-label</strong> or <strong>aria-labelledby</strong>.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-label</strong>
            <p>Provides an accessible name for elements that don't have visible text labels.</p>
            <p class="wcag-note"><strong>For Images:</strong> <strong>aria-label</strong> can be used as alternative text for images, but <strong>alt</strong> is the preferred method. If an image has <strong>alt</strong>, <strong>aria-label</strong> is not required. Only mark as missing if the image has no <strong>alt</strong> and no <strong>aria-label</strong>.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-labelledby</strong>
            <p>References another element that provides the accessible name.</p>
            <p class="wcag-note"><strong>For Images:</strong> <strong>aria-labelledby</strong> can be used as alternative text for images, but <strong>alt</strong> is the preferred method. If an image has <strong>alt</strong>, <strong>aria-labelledby</strong> is not required.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-describedby</strong>
            <p>References elements that provide additional descriptive information.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-hidden</strong>
            <p>Should be used carefully. Hides decorative elements from screen readers.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-expanded</strong>
            <p>Indicates whether collapsible elements are expanded or collapsed.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-controls</strong>
            <p>Identifies elements controlled by the current element.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-current</strong>
            <p>Indicates the current item in a set of related elements.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-required</strong>
            <p>Indicates that user input is required for form controls.</p>
          </div>
          <div class="wcag-item">
            <strong>aria-invalid</strong>
            <p>Indicates that the value entered is invalid.</p>
          </div>
          <div class="wcag-item">
            <strong>tabindex</strong>
            <p>Controls keyboard navigation. Use <strong>tabindex="0"</strong> for focusable elements, avoid positive values.</p>
          </div>
          <div class="wcag-item">
            <strong>lang</strong>
            <p>Specifies the language of the element's content for screen readers.</p>
          </div>
          <div class="wcag-item">
            <strong>&lt;label&gt; elements</strong>
            <p>All form inputs should have associated <strong>&lt;label&gt;</strong> elements.</p>
          </div>
          <div class="wcag-item">
            <strong>title attribute</strong>
            <p>Provides additional tooltip information, but should not be the only way to convey important information.</p>
          </div>
          <div class="wcag-item">
            <strong>Focus States</strong>
            <p>All interactive elements must have visible focus indicators that meet WCAG 2.2 AA contrast requirements.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const isOpen = ref(props.isOpen ?? false)

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

