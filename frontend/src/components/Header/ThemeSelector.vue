<template>
  <div class="theme-selector">
    <button
      :id="buttonId"
      class="theme-button"
      :aria-expanded="dropdownOpen"
      aria-haspopup="true"
      title="Theme"
      @click.stop="toggleDropdown"
    >
      <svg class="theme-button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <rect x="3" y="3" width="7" height="7" fill="#ef4444"/>
        <rect x="14" y="3" width="7" height="7" fill="#3b82f6"/>
        <rect x="3" y="14" width="7" height="7" fill="#10b981"/>
        <rect x="14" y="14" width="7" height="7" fill="#f59e0b"/>
      </svg>
    </button>
    <div :id="dropdownId" :class="['theme-dropdown', { hidden: !dropdownOpen }]">
      <button
        v-for="(theme, key) in themes"
        :key="key"
        class="theme-option"
        :data-theme="key"
        :data-selected="key === currentTheme"
        :style="getThemeOptionStyle(key, theme)"
        @click.stop="selectTheme(key, $event)"
      >
        {{ theme.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { isLightColorValue } from '@/utils/themes'

const props = defineProps<{
  mobile?: boolean
}>()

const themeStore = useThemeStore()
const buttonId = props.mobile ? 'themeButtonMobile' : 'themeButton'
const dropdownId = props.mobile ? 'themeDropdownMobile' : 'themeDropdown'
const dropdownOpen = ref(false)
const themes = computed(() => themeStore.themes)
const currentTheme = computed(() => themeStore.currentTheme)

function toggleDropdown(event?: Event) {
  if (event) {
    event.stopPropagation()
  }
  dropdownOpen.value = !dropdownOpen.value
}

function selectTheme(themeName: string, event?: Event) {
  if (event) {
    event.stopPropagation()
  }
  themeStore.applyTheme(themeName)
  dropdownOpen.value = false
}

function getThemeOptionStyle(key: string, theme: any) {
  if (key === currentTheme.value) {
    const primaryColor = theme['--primary-color'] || '#3b82f6'
    const isLightColor = isLightColorValue(primaryColor)
    return {
      background: `${primaryColor} !important`,
      color: `${isLightColor ? '#1e293b' : '#ffffff'} !important`
    }
  }
  return {}
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  const button = document.getElementById(buttonId)
  const dropdown = document.getElementById(dropdownId)
  const mobileMenu = document.getElementById('mobileMenu')
  
  // Don't close if clicking inside mobile menu (unless clicking outside dropdown)
  if (mobileMenu && mobileMenu.contains(target)) {
    if (button && dropdown && !button.contains(target) && !dropdown.contains(target)) {
      dropdownOpen.value = false
    }
    return
  }
  
  if (button && dropdown && !button.contains(target) && !dropdown.contains(target)) {
    dropdownOpen.value = false
  }
}

watch([currentTheme, dropdownOpen], () => {
  // Force update of dropdown styles when theme changes or dropdown opens
  if (dropdownOpen.value) {
    setTimeout(() => {
      const allOptions = document.querySelectorAll('.theme-option')
      allOptions.forEach((option) => {
        const opt = option as HTMLElement
        const themeKey = opt.dataset.theme
        if (themeKey && themes.value[themeKey]) {
          const theme = themes.value[themeKey]
          if (themeKey === currentTheme.value) {
            const primaryColor = theme['--primary-color'] || '#3b82f6'
            const isLightColor = isLightColorValue(primaryColor)
            opt.style.setProperty('background', primaryColor, 'important')
            opt.style.setProperty('color', isLightColor ? '#1e293b' : '#ffffff', 'important')
          } else {
            opt.style.removeProperty('background')
            opt.style.removeProperty('color')
          }
        }
      })
    }, 50)
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


