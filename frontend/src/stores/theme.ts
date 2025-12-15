/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { themes, isLightColorValue } from '@/utils/themes';

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref<string>(localStorage.getItem('theme') || 'light');

  function applyTheme(themeName: string) {
    if (!themes[themeName]) {
      themeName = 'light';
    }

    currentTheme.value = themeName;
    localStorage.setItem('theme', themeName);

    const theme = themes[themeName];
    const root = document.documentElement;

    Object.keys(theme).forEach((key) => {
      if (key !== 'name') {
        root.style.setProperty(key, theme[key]);
      }
    });

    document.body.setAttribute('data-theme', themeName);

    // Update button text colors based on primary color
    const primaryColor = theme['--primary-color'] || '#3b82f6';
    const isLightColor = isLightColorValue(primaryColor);
    const buttonTextColor = isLightColor ? '#1e293b' : '#ffffff';
    root.style.setProperty('--button-text-color', buttonTextColor);

    // Update modal header colors
    const modalHeaderTextColor = isLightColor ? '#1e293b' : '#ffffff';
    root.style.setProperty('--modal-header-text-color', modalHeaderTextColor);
    root.style.setProperty(
      '--modal-close-bg',
      isLightColor ? 'rgba(30, 41, 59, 0.2)' : 'rgba(255, 255, 255, 0.2)'
    );
    root.style.setProperty(
      '--modal-close-bg-hover',
      isLightColor ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.3)'
    );

    // Update theme dropdown selected option colors
    updateThemeDropdownStyles(themeName, primaryColor, isLightColor);
  }

  function updateThemeDropdownStyles(
    themeName: string,
    primaryColor: string,
    isLightColor: boolean
  ) {
    // Update selected theme option in dropdown
    const allThemeOptions = document.querySelectorAll('.theme-option[data-selected="true"]');
    allThemeOptions.forEach((option) => {
      const optionElement = option as HTMLElement;
      if (optionElement.dataset.theme === themeName) {
        optionElement.style.setProperty('background', primaryColor, 'important');
        const textColor = isLightColor ? '#1e293b' : '#ffffff';
        optionElement.style.setProperty('color', textColor, 'important');
      }
    });
  }

  // Initialize theme on store creation
  applyTheme(currentTheme.value);

  // Watch for theme changes
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme);
  });

  return {
    currentTheme,
    themes,
    applyTheme,
  };
});
