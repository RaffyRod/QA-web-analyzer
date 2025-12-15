<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
<template>
  <header>
    <div class="header-top">
      <div class="header-controls desktop-controls">
        <LanguageToggle />
        <ThemeSelector />
      </div>
      <button
        id="mobileMenuToggle"
        class="mobile-menu-toggle"
        :aria-expanded="mobileMenuOpen"
        aria-label="Menu"
        @click="toggleMobileMenu"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <div v-if="mobileMenuOpen" id="mobileMenu" class="mobile-menu">
        <div class="mobile-menu-content">
          <LanguageToggle :mobile="true" />
          <ThemeSelector :mobile="true" />
        </div>
      </div>
    </div>
    <div class="header-title-group">
      <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 11l3 3L22 4"></path>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
      </svg>
      <h1>{{ t('title') }}</h1>
    </div>
    <p class="subtitle">{{ t('subtitle') }}</p>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LanguageToggle from './LanguageToggle.vue'
import ThemeSelector from './ThemeSelector.vue'
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()
const { t } = languageStore
const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>


