<template>
  <div class="language-toggle">
    <input
      :id="inputId"
      v-model="isSpanish"
      type="checkbox"
      class="language-toggle-input"
      @change="handleChange"
    />
    <label :for="inputId" class="language-toggle-label">
      <span class="toggle-option" data-lang="en">US</span>
      <span class="toggle-separator">/</span>
      <span class="toggle-option" data-lang="es">ES</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'

const props = defineProps<{
  mobile?: boolean
}>()

const languageStore = useLanguageStore()
const inputId = props.mobile ? 'languageToggleMobile' : 'languageToggle'
const isSpanish = ref(languageStore.currentLanguage === 'es')

onMounted(() => {
  isSpanish.value = languageStore.currentLanguage === 'es'
})

function handleChange() {
  languageStore.setLanguage(isSpanish.value ? 'es' : 'en')
}
</script>


