/**
 * @author RaffyRod (https://github.com/RaffyRod)
 * Theme management module
 */

const themes = {
  light: {
    name: 'Light Mode',
    '--bg-color': '#e0e5ec',
    '--card-bg': '#f5f7fa',
    '--text-primary': '#1e293b',
    '--text-secondary': '#475569',
    '--border-color': '#cbd5e1',
    '--primary-color': '#3b82f6',
    '--primary-hover': '#2563eb',
    '--success-color': '#10b981',
    '--warning-color': '#f59e0b',
    '--danger-color': '#ef4444',
    '--shadow': '8px 8px 16px #b8bec4, -8px -8px 16px #ffffff',
    '--shadow-inset': 'inset 4px 4px 8px #b8bec4, inset -4px -4px 8px #ffffff',
    '--shadow-lg': '12px 12px 24px #b8bec4, -12px -12px 24px #ffffff',
    '--header-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.15)',
  },
  dark: {
    name: 'Dark Mode',
    '--bg-color': '#1a1d24',
    '--card-bg': '#252932',
    '--text-primary': '#f1f5f9',
    '--text-secondary': '#cbd5e1',
    '--border-color': '#334155',
    '--primary-color': '#3b82f6',
    '--primary-hover': '#60a5fa',
    '--success-color': '#10b981',
    '--warning-color': '#f59e0b',
    '--danger-color': '#ef4444',
    '--shadow': '8px 8px 16px #0f1115, -8px -8px 16px #252932',
    '--shadow-inset': 'inset 4px 4px 8px #0f1115, inset -4px -4px 8px #252932',
    '--shadow-lg': '12px 12px 24px #0f1115, -12px -12px 24px #252932',
    '--header-bg': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    '--header-text': '#f1f5f9',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.1)',
  },
  flat: {
    name: 'Flat Design',
    '--bg-color': '#f5f5f5',
    '--card-bg': '#ffffff',
    '--text-primary': '#212121',
    '--text-secondary': '#757575',
    '--border-color': '#e0e0e0',
    '--primary-color': '#2196f3',
    '--primary-hover': '#1976d2',
    '--success-color': '#4caf50',
    '--warning-color': '#ff9800',
    '--danger-color': '#f44336',
    '--shadow': 'none',
    '--shadow-inset': 'none',
    '--shadow-lg': '0 2px 4px rgba(0,0,0,0.1)',
    '--header-bg': '#2196f3',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  material: {
    name: 'Material Design',
    '--bg-color': '#fafafa',
    '--card-bg': '#ffffff',
    '--text-primary': '#212121',
    '--text-secondary': '#757575',
    '--border-color': '#e0e0e0',
    '--primary-color': '#6200ea',
    '--primary-hover': '#3700b3',
    '--success-color': '#00c853',
    '--warning-color': '#ff6d00',
    '--danger-color': '#d50000',
    '--shadow': '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)',
    '--shadow-inset': 'inset 0 1px 2px rgba(0,0,0,0.1)',
    '--shadow-lg': '0 8px 16px rgba(0,0,0,0.15), 0 16px 32px rgba(0,0,0,0.1)',
    '--header-bg': 'linear-gradient(135deg, #6200ea 0%, #3700b3 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  glassmorphism: {
    name: 'Glassmorphism',
    '--bg-color': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '--card-bg': 'rgba(255, 255, 255, 0.1)',
    '--text-primary': '#ffffff',
    '--text-secondary': 'rgba(255, 255, 255, 0.8)',
    '--border-color': 'rgba(255, 255, 255, 0.2)',
    '--primary-color': '#ffffff',
    '--primary-hover': 'rgba(255, 255, 255, 0.9)',
    '--success-color': '#4ade80',
    '--warning-color': '#fbbf24',
    '--danger-color': '#f87171',
    '--shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
    '--shadow-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    '--shadow-lg': '0 8px 32px rgba(0, 0, 0, 0.2)',
    '--header-bg': 'rgba(255, 255, 255, 0.15)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  cyberpunk: {
    name: 'Cyberpunk',
    '--bg-color': '#0a0e27',
    '--card-bg': '#1a1f3a',
    '--text-primary': '#00ff88',
    '--text-secondary': '#00d9ff',
    '--border-color': '#ff0080',
    '--primary-color': '#00ff88',
    '--primary-hover': '#00d9ff',
    '--success-color': '#00ff88',
    '--warning-color': '#ffaa00',
    '--danger-color': '#ff0080',
    '--shadow': '0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 217, 255, 0.2)',
    '--shadow-inset': 'inset 0 0 10px rgba(0, 255, 136, 0.2)',
    '--shadow-lg': '0 0 30px rgba(0, 255, 136, 0.4), 0 0 60px rgba(0, 217, 255, 0.3)',
    '--header-bg': 'linear-gradient(135deg, #ff0080 0%, #00d9ff 100%)',
    '--header-text': '#0a0e27',
    '--header-controls-bg': 'rgba(0, 255, 136, 0.2)',
  },
  minimal: {
    name: 'Minimal',
    '--bg-color': '#ffffff',
    '--card-bg': '#fafafa',
    '--text-primary': '#000000',
    '--text-secondary': '#666666',
    '--border-color': '#e5e5e5',
    '--primary-color': '#000000',
    '--primary-hover': '#333333',
    '--success-color': '#000000',
    '--warning-color': '#666666',
    '--danger-color': '#000000',
    '--shadow': 'none',
    '--shadow-inset': 'none',
    '--shadow-lg': '0 1px 3px rgba(0,0,0,0.05)',
    '--header-bg': '#000000',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.1)',
  },
  ocean: {
    name: 'Ocean',
    '--bg-color': '#e0f2fe',
    '--card-bg': '#f0f9ff',
    '--text-primary': '#0c4a6e',
    '--text-secondary': '#075985',
    '--border-color': '#7dd3fc',
    '--primary-color': '#0284c7',
    '--primary-hover': '#0369a1',
    '--success-color': '#06b6d4',
    '--warning-color': '#f59e0b',
    '--danger-color': '#ef4444',
    '--shadow': '8px 8px 16px #b3d9f0, -8px -8px 16px #ffffff',
    '--shadow-inset': 'inset 4px 4px 8px #b3d9f0, inset -4px -4px 8px #ffffff',
    '--shadow-lg': '12px 12px 24px #b3d9f0, -12px -12px 24px #ffffff',
    '--header-bg': 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  sunset: {
    name: 'Sunset',
    '--bg-color': '#fff5e6',
    '--card-bg': '#fffaf0',
    '--text-primary': '#7c2d12',
    '--text-secondary': '#9a3412',
    '--border-color': '#fdba74',
    '--primary-color': '#ea580c',
    '--primary-hover': '#c2410c',
    '--success-color': '#f59e0b',
    '--warning-color': '#f97316',
    '--danger-color': '#dc2626',
    '--shadow': '8px 8px 16px #ffe0b3, -8px -8px 16px #ffffff',
    '--shadow-inset': 'inset 4px 4px 8px #ffe0b3, inset -4px -4px 8px #ffffff',
    '--shadow-lg': '12px 12px 24px #ffe0b3, -12px -12px 24px #ffffff',
    '--header-bg': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  forest: {
    name: 'Forest',
    '--bg-color': '#f0fdf4',
    '--card-bg': '#f7fef9',
    '--text-primary': '#14532d',
    '--text-secondary': '#166534',
    '--border-color': '#86efac',
    '--primary-color': '#16a34a',
    '--primary-hover': '#15803d',
    '--success-color': '#22c55e',
    '--warning-color': '#eab308',
    '--danger-color': '#dc2626',
    '--shadow': '8px 8px 16px #c8e6d1, -8px -8px 16px #ffffff',
    '--shadow-inset': 'inset 4px 4px 8px #c8e6d1, inset -4px -4px 8px #ffffff',
    '--shadow-lg': '12px 12px 24px #c8e6d1, -12px -12px 24px #ffffff',
    '--header-bg': 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  monochrome: {
    name: 'Monochrome',
    '--bg-color': '#f5f5f5',
    '--card-bg': '#ffffff',
    '--text-primary': '#1a1a1a',
    '--text-secondary': '#666666',
    '--border-color': '#cccccc',
    '--primary-color': '#1a1a1a',
    '--primary-hover': '#333333',
    '--success-color': '#4a4a4a',
    '--warning-color': '#808080',
    '--danger-color': '#1a1a1a',
    '--shadow': '0 2px 8px rgba(0,0,0,0.1)',
    '--shadow-inset': 'inset 0 1px 2px rgba(0,0,0,0.1)',
    '--shadow-lg': '0 4px 16px rgba(0,0,0,0.15)',
    '--header-bg': '#1a1a1a',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.1)',
  },
  highContrast: {
    name: 'High Contrast',
    '--bg-color': '#ffffff',
    '--card-bg': '#ffffff',
    '--text-primary': '#000000',
    '--text-secondary': '#000000',
    '--border-color': '#000000',
    '--primary-color': '#0000ff',
    '--primary-hover': '#0000cc',
    '--success-color': '#008000',
    '--warning-color': '#ff8c00',
    '--danger-color': '#ff0000',
    '--shadow': '0 0 0 2px #000000',
    '--shadow-inset': 'inset 0 0 0 2px #000000',
    '--shadow-lg': '0 0 0 3px #000000',
    '--header-bg': '#000000',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  blue: {
    name: 'Blue Theme',
    '--bg-color': '#d4e4f7',
    '--card-bg': '#e8f2fc',
    '--text-primary': '#0c2440',
    '--text-secondary': '#1e3a8a',
    '--border-color': '#93c5fd',
    '--primary-color': '#2563eb',
    '--primary-hover': '#1d4ed8',
    '--success-color': '#10b981',
    '--warning-color': '#f59e0b',
    '--danger-color': '#ef4444',
    '--shadow': '8px 8px 16px #b8c9e0, -8px -8px 16px #f0f8ff',
    '--shadow-inset': 'inset 4px 4px 8px #b8c9e0, inset -4px -4px 8px #f0f8ff',
    '--shadow-lg': '12px 12px 24px #b8c9e0, -12px -12px 24px #f0f8ff',
    '--header-bg': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  green: {
    name: 'Green Theme',
    '--bg-color': '#d4f4e0',
    '--card-bg': '#e8faf0',
    '--text-primary': '#052e16',
    '--text-secondary': '#14532d',
    '--border-color': '#86efac',
    '--primary-color': '#22c55e',
    '--primary-hover': '#16a34a',
    '--success-color': '#10b981',
    '--warning-color': '#f59e0b',
    '--danger-color': '#ef4444',
    '--shadow': '8px 8px 16px #b8e0c8, -8px -8px 16px #f0fff8',
    '--shadow-inset': 'inset 4px 4px 8px #b8e0c8, inset -4px -4px 8px #f0fff8',
    '--shadow-lg': '12px 12px 24px #b8e0c8, -12px -12px 24px #f0fff8',
    '--header-bg': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  purple: {
    name: 'Purple Theme',
    '--bg-color': '#ede9fe',
    '--card-bg': '#f5f3ff',
    '--text-primary': '#3b0764',
    '--text-secondary': '#581c87',
    '--border-color': '#c084fc',
    '--primary-color': '#a855f7',
    '--primary-hover': '#9333ea',
    '--success-color': '#10b981',
    '--warning-color': '#f59e0b',
    '--danger-color': '#ef4444',
    '--shadow': '8px 8px 16px #d1c5e8, -8px -8px 16px #ffffff',
    '--shadow-inset': 'inset 4px 4px 8px #d1c5e8, inset -4px -4px 8px #ffffff',
    '--shadow-lg': '12px 12px 24px #d1c5e8, -12px -12px 24px #ffffff',
    '--header-bg': 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  rose: {
    name: 'Rose',
    '--bg-color': '#fff1f2',
    '--card-bg': '#fff5f7',
    '--text-primary': '#881337',
    '--text-secondary': '#9f1239',
    '--border-color': '#fda4af',
    '--primary-color': '#e11d48',
    '--primary-hover': '#be123c',
    '--success-color': '#10b981',
    '--warning-color': '#f59e0b',
    '--danger-color': '#dc2626',
    '--shadow': '8px 8px 16px #ffe0e6, -8px -8px 16px #ffffff',
    '--shadow-inset': 'inset 4px 4px 8px #ffe0e6, inset -4px -4px 8px #ffffff',
    '--shadow-lg': '12px 12px 24px #ffe0e6, -12px -12px 24px #ffffff',
    '--header-bg': 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  amber: {
    name: 'Amber',
    '--bg-color': '#fffbeb',
    '--card-bg': '#fefce8',
    '--text-primary': '#78350f',
    '--text-secondary': '#92400e',
    '--border-color': '#fde68a',
    '--primary-color': '#f59e0b',
    '--primary-hover': '#d97706',
    '--success-color': '#10b981',
    '--warning-color': '#f59e0b',
    '--danger-color': '#ef4444',
    '--shadow': '8px 8px 16px #ffe4b3, -8px -8px 16px #ffffff',
    '--shadow-inset': 'inset 4px 4px 8px #ffe4b3, inset -4px -4px 8px #ffffff',
    '--shadow-lg': '12px 12px 24px #ffe4b3, -12px -12px 24px #ffffff',
    '--header-bg': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
  teal: {
    name: 'Teal',
    '--bg-color': '#f0fdfa',
    '--card-bg': '#f5fffe',
    '--text-primary': '#134e4a',
    '--text-secondary': '#0f766e',
    '--border-color': '#5eead4',
    '--primary-color': '#14b8a6',
    '--primary-hover': '#0d9488',
    '--success-color': '#10b981',
    '--warning-color': '#f59e0b',
    '--danger-color': '#ef4444',
    '--shadow': '8px 8px 16px #c8f0ea, -8px -8px 16px #ffffff',
    '--shadow-inset': 'inset 4px 4px 8px #c8f0ea, inset -4px -4px 8px #ffffff',
    '--shadow-lg': '12px 12px 24px #c8f0ea, -12px -12px 24px #ffffff',
    '--header-bg': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    '--header-text': '#ffffff',
    '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
  },
};

let currentTheme = localStorage.getItem('theme') || 'light';

/**
 * Applies a theme to the document
 */
/**
 * Helper function to check if a color is light (needs dark text)
 * Made global so it can be used throughout the application
 */
window.isLightColorValue = function (color) {
  if (!color) return false;

  // Check for white or very light colors
  if (color === '#ffffff' || color === 'white' || color === 'rgb(255, 255, 255)') {
    return true;
  }

  // Check for rgba with high alpha and white values
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1]);
    const g = parseInt(rgbaMatch[2]);
    const b = parseInt(rgbaMatch[3]);
    // If all RGB values are above 240, it's very light
    if (r > 240 && g > 240 && b > 240) {
      return true;
    }
  }

  // Check hex colors
  const hex = color.replace('#', '');
  if (hex.length === 3) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    // If average is above 240, it's light
    return (r + g + b) / 3 > 240;
  }
  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    // If average is above 240, it's light
    return (r + g + b) / 3 > 240;
  }

  return false;
};

window.applyTheme = function (themeName) {
  if (!themes[themeName]) {
    themeName = 'light';
  }

  currentTheme = themeName;
  localStorage.setItem('theme', themeName);

  const theme = themes[themeName];
  const root = document.documentElement;

  Object.keys(theme).forEach((key) => {
    if (key !== 'name') {
      root.style.setProperty(key, theme[key]);
    }
  });

  document.body.setAttribute('data-theme', themeName);

  // Update theme button text if needed
  updateThemeButton();

  // Update dropdown styles to match new theme immediately
  if (typeof updateThemeDropdownStyles === 'function') {
    updateThemeDropdownStyles();
    // Also update after a short delay to ensure CSS variables are applied
    setTimeout(updateThemeDropdownStyles, 100);
  }
};

/**
 * Updates theme button and dropdown styles to match current theme
 */
window.updateThemeDropdownStyles = function () {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const headerText = computedStyle.getPropertyValue('--header-text').trim() || '#ffffff';
  const borderColor =
    computedStyle.getPropertyValue('--border-color').trim() || 'rgba(255, 255, 255, 0.25)';
  const headerControlsBg =
    computedStyle.getPropertyValue('--header-controls-bg').trim() || 'rgba(255, 255, 255, 0.15)';
  const textColor = computedStyle.getPropertyValue('--text-primary').trim() || '#1e293b';
  const bgColor = computedStyle.getPropertyValue('--card-bg').trim() || '#ffffff';
  const borderColorDropdown = computedStyle.getPropertyValue('--border-color').trim() || '#cbd5e1';

  // Update theme button styles
  const themeButton = document.getElementById('themeButton');
  if (themeButton) {
    themeButton.style.color = headerText;
    themeButton.style.borderColor = borderColor;
    themeButton.style.backgroundColor = headerControlsBg;
  }

  // Helper function to check if a color is dark
  function isDarkColor(color) {
    if (!color) return false;
    const hex = color.replace('#', '');
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return (r + g + b) / 3 < 128;
    }
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return (r + g + b) / 3 < 128;
    }
    // Check for dark RGB values
    if (color.includes('rgb')) {
      const matches = color.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]);
        const g = parseInt(matches[1]);
        const b = parseInt(matches[2]);
        return (r + g + b) / 3 < 128;
      }
    }
    // Fallback: check for common dark color patterns
    return (
      color.includes('#1') ||
      color.includes('#2') ||
      color.includes('#0') ||
      color.includes('rgb(26') ||
      color.includes('rgb(37') ||
      color.includes('rgb(15')
    );
  }

  // Update dropdown styles - always use light background for readability
  const themeDropdown = document.getElementById('themeDropdown');
  if (themeDropdown) {
    // Always use white or very light background for dropdown
    themeDropdown.style.backgroundColor = '#ffffff';
    themeDropdown.style.borderColor = '#e2e8f0';
  }

  // Update dropdown option styles - ensure readable text colors (both desktop and mobile)
  const themeOptions = document.querySelectorAll('.theme-option');
  themeOptions.forEach((option) => {
    // Reset all options first - always use dark text on white background
    option.style.setProperty('background', 'transparent', 'important');
    option.style.setProperty('color', '#1e293b', 'important');
    option.removeAttribute('data-selected');

    // Highlight current theme
    if (option.dataset.theme === currentTheme) {
      const primaryColor = computedStyle.getPropertyValue('--primary-color').trim() || '#3b82f6';
      const isPrimaryLight = window.isLightColorValue(primaryColor);
      const optionTextColor = isPrimaryLight ? '#1e293b' : '#ffffff';
      option.style.setProperty('background', primaryColor, 'important');
      option.style.setProperty('color', optionTextColor, 'important');
      option.setAttribute('data-selected', 'true');
    }
  });

  // Also update mobile dropdown background
  const themeDropdownMobile = document.getElementById('themeDropdownMobile');
  if (themeDropdownMobile) {
    themeDropdownMobile.style.backgroundColor = '#ffffff';
    themeDropdownMobile.style.borderColor = '#e2e8f0';
  }

  // Update language toggle styles
  const languageToggleLabel = document.querySelector('.language-toggle-label');
  if (languageToggleLabel) {
    languageToggleLabel.style.color = headerText || '#ffffff';
    languageToggleLabel.style.borderColor = borderColor;
    if (!headerText || headerText === '') {
      languageToggleLabel.style.color = '#ffffff';
    }
  }

  // Ensure buttons text is always visible - detect if primary color is light or dark
  const analyzeBtn = document.getElementById('analyzeBtn');
  const infoBtn = document.getElementById('wcagInfoToggle');

  // Get primary color and determine if it's light (needs dark text) or dark (needs light text)
  const primaryColor = computedStyle.getPropertyValue('--primary-color').trim() || '#3b82f6';
  const isLightColor = window.isLightColorValue(primaryColor);
  const buttonTextColor = isLightColor ? '#1e293b' : '#ffffff';
  const buttonBgColor = primaryColor;

  // Set CSS variable for button text color so CSS can use it
  root.style.setProperty('--button-text-color', buttonTextColor);

  // Set CSS variables for modal header text color (same logic as buttons)
  root.style.setProperty('--modal-header-text-color', buttonTextColor);
  root.style.setProperty(
    '--modal-close-bg',
    isLightColor ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'
  );
  root.style.setProperty(
    '--modal-close-bg-hover',
    isLightColor ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.3)'
  );

  // Evaluate and set text colors for all color-based elements
  const successColor = computedStyle.getPropertyValue('--success-color').trim() || '#10b981';
  const dangerColor = computedStyle.getPropertyValue('--danger-color').trim() || '#ef4444';
  const warningColor = computedStyle.getPropertyValue('--warning-color').trim() || '#f59e0b';

  const isSuccessLight = window.isLightColorValue(successColor);
  const isDangerLight = window.isLightColorValue(dangerColor);
  const isWarningLight = window.isLightColorValue(warningColor);

  root.style.setProperty('--success-text-color', isSuccessLight ? '#1e293b' : '#ffffff');
  root.style.setProperty('--danger-text-color', isDangerLight ? '#1e293b' : '#ffffff');
  root.style.setProperty('--warning-text-color', isWarningLight ? '#1e293b' : '#ffffff');

  if (analyzeBtn) {
    // Set appropriate text color based on background
    analyzeBtn.style.setProperty('color', buttonTextColor, 'important');
    analyzeBtn.style.color = buttonTextColor;
    analyzeBtn.style.setProperty('background-color', buttonBgColor, 'important');
    analyzeBtn.style.backgroundColor = buttonBgColor;

    // Ensure all child elements have correct color
    const analyzeBtnChildren = analyzeBtn.querySelectorAll('*');
    analyzeBtnChildren.forEach((child) => {
      child.style.setProperty('color', buttonTextColor, 'important');
      child.style.color = buttonTextColor;
    });
  }

  if (infoBtn) {
    // Set appropriate text color based on background
    infoBtn.style.setProperty('color', buttonTextColor, 'important');
    infoBtn.style.color = buttonTextColor;
    infoBtn.style.setProperty('background-color', buttonBgColor, 'important');
    infoBtn.style.backgroundColor = buttonBgColor;

    // Ensure SVG stroke has correct color
    const svg = infoBtn.querySelector('svg');
    if (svg) {
      svg.style.setProperty('stroke', buttonTextColor, 'important');
      svg.style.stroke = buttonTextColor;
      svg.setAttribute('stroke', buttonTextColor);
      svg.style.setProperty('fill', 'none', 'important');
      svg.style.fill = 'none';
    }

    // Force all child elements to have correct color
    const infoBtnChildren = infoBtn.querySelectorAll('*');
    infoBtnChildren.forEach((child) => {
      child.style.setProperty('color', buttonTextColor, 'important');
      child.style.color = buttonTextColor;
    });
  }

  // Update mobile menu elements - always use dark colors (menu has white background)
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    const mobileLanguageToggle = mobileMenu.querySelector('.language-toggle-label');
    const mobileThemeButton = mobileMenu.querySelector('.theme-button');
    const mobileThemeIcon = mobileMenu.querySelector('.theme-button-icon');

    if (mobileLanguageToggle) {
      mobileLanguageToggle.style.setProperty('background', '#f1f5f9', 'important');
      mobileLanguageToggle.style.setProperty('border-color', '#cbd5e1', 'important');
      mobileLanguageToggle.style.setProperty('color', '#1e293b', 'important');

      // Update toggle options and separator
      const toggleOptions = mobileLanguageToggle.querySelectorAll(
        '.toggle-option, .toggle-separator'
      );
      toggleOptions.forEach((option) => {
        option.style.setProperty('color', '#1e293b', 'important');
      });
    }

    if (mobileThemeButton) {
      mobileThemeButton.style.setProperty('background', '#f1f5f9', 'important');
      mobileThemeButton.style.setProperty('border-color', '#cbd5e1', 'important');
      mobileThemeButton.style.setProperty('color', '#1e293b', 'important');
    }

    if (mobileThemeIcon) {
      mobileThemeIcon.style.setProperty('color', '#1e293b', 'important');
      mobileThemeIcon.style.setProperty('stroke', '#1e293b', 'important');
      mobileThemeIcon.setAttribute('stroke', '#1e293b');
    }
  }
};

/**
 * Updates theme button appearance
 */
function updateThemeButton() {
  const themeButton = document.getElementById('themeButton');
  if (themeButton && themes[currentTheme]) {
    // Button text remains as icon, but we could show theme name if needed
  }
}

/**
 * Initializes theme on page load
 */
window.initTheme = function () {
  window.applyTheme(currentTheme);
  // Update dropdown styles after theme is applied
  setTimeout(updateThemeDropdownStyles, 100);

  // Initialize theme button and dropdown
  initThemeDropdown();
};

/**
 * Initializes theme dropdown functionality
 */
function initThemeDropdown() {
  const themeButton = document.getElementById('themeButton');
  const themeDropdown = document.getElementById('themeDropdown');
  const themeOptions = document.querySelectorAll('.theme-option');

  if (!themeButton || !themeDropdown) return;

  // Toggle dropdown on button click
  themeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = themeButton.getAttribute('aria-expanded') === 'true';
    themeButton.setAttribute('aria-expanded', !isExpanded);
    if (isExpanded) {
      themeDropdown.classList.add('hidden');
    } else {
      themeDropdown.classList.remove('hidden');
    }
  });

  // Handle theme selection
  themeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const themeName = option.dataset.theme;
      if (themeName) {
        window.applyTheme(themeName);
        // Update dropdown styles after theme change with delay to ensure CSS variables are applied
        setTimeout(() => {
          updateThemeDropdownStyles();
        }, 150);
        themeDropdown.classList.add('hidden');
        themeButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close dropdown when clicking outside (cross-platform compatible)
  document.addEventListener('click', (e) => {
    const target = e.target || e.srcElement; // Fallback for older browsers
    if (target && !themeButton.contains(target) && !themeDropdown.contains(target)) {
      themeDropdown.classList.add('hidden');
      themeButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Close dropdown on Escape key (accessibility)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      themeDropdown.classList.add('hidden');
      themeButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Mark current theme in dropdown
  updateThemeDropdownStyles();

  // Initialize mobile theme dropdown if it exists
  const themeButtonMobile = document.getElementById('themeButtonMobile');
  const themeDropdownMobile = document.getElementById('themeDropdownMobile');
  const themeOptionsMobile = themeDropdownMobile?.querySelectorAll('.theme-option');

  if (themeButtonMobile && themeDropdownMobile) {
    // Helper function to toggle button visibility
    const toggleMobileButton = (show) => {
      if (show) {
        themeButtonMobile.style.opacity = '1';
        themeButtonMobile.style.visibility = 'visible';
        themeButtonMobile.style.height = 'auto';
        themeButtonMobile.style.minHeight = '28px';
        themeButtonMobile.style.padding = '4px 8px';
        themeButtonMobile.style.margin = '0';
        themeButtonMobile.style.border = '';
        themeButtonMobile.style.overflow = '';
      } else {
        themeButtonMobile.style.opacity = '0';
        themeButtonMobile.style.visibility = 'hidden';
        themeButtonMobile.style.height = '0';
        themeButtonMobile.style.minHeight = '0';
        themeButtonMobile.style.padding = '0';
        themeButtonMobile.style.margin = '0';
        themeButtonMobile.style.border = 'none';
        themeButtonMobile.style.overflow = 'hidden';
      }
    };

    // Initialize button visibility (should be visible by default)
    toggleMobileButton(true);

    // Toggle dropdown on button click
    themeButtonMobile.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = themeButtonMobile.getAttribute('aria-expanded') === 'true';
      themeButtonMobile.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        themeDropdownMobile.classList.add('hidden');
        toggleMobileButton(true); // Show button when closing
      } else {
        themeDropdownMobile.classList.remove('hidden');
        toggleMobileButton(false); // Hide button when opening
      }
    });

    // Handle theme selection
    if (themeOptionsMobile) {
      themeOptionsMobile.forEach((option) => {
        option.addEventListener('click', () => {
          const themeName = option.dataset.theme;
          if (themeName) {
            window.applyTheme(themeName);
            // Update dropdown styles after theme change
            setTimeout(() => {
              updateThemeDropdownStyles();
            }, 150);
            themeDropdownMobile.classList.add('hidden');
            themeButtonMobile.setAttribute('aria-expanded', 'false');
            // Show button again when closing dropdown
            themeButtonMobile.style.opacity = '1';
            themeButtonMobile.style.visibility = 'visible';
            themeButtonMobile.style.height = 'auto';
            themeButtonMobile.style.minHeight = '28px';
            themeButtonMobile.style.padding = '4px 8px';
            themeButtonMobile.style.margin = '0';
            themeButtonMobile.style.border = '';
            themeButtonMobile.style.overflow = '';
            // Close mobile menu after theme selection
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            if (mobileMenu) {
              mobileMenu.classList.add('hidden');
              if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
              }
            }
          }
        });
      });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target || e.srcElement;
      if (target && !themeButtonMobile.contains(target) && !themeDropdownMobile.contains(target)) {
        themeDropdownMobile.classList.add('hidden');
        themeButtonMobile.setAttribute('aria-expanded', 'false');
        // Show button again when closing dropdown
        themeButtonMobile.style.opacity = '1';
        themeButtonMobile.style.visibility = 'visible';
        themeButtonMobile.style.height = 'auto';
        themeButtonMobile.style.minHeight = '28px';
        themeButtonMobile.style.padding = '4px 8px';
        themeButtonMobile.style.margin = '0';
        themeButtonMobile.style.border = '';
        themeButtonMobile.style.overflow = '';
      }
    });

    // Close dropdown on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        if (!themeDropdownMobile.classList.contains('hidden')) {
          themeDropdownMobile.classList.add('hidden');
          themeButtonMobile.setAttribute('aria-expanded', 'false');
          // Show button again when closing dropdown
          themeButtonMobile.style.opacity = '1';
          themeButtonMobile.style.visibility = 'visible';
          themeButtonMobile.style.height = 'auto';
          themeButtonMobile.style.minHeight = '28px';
          themeButtonMobile.style.padding = '4px 8px';
          themeButtonMobile.style.margin = '0';
          themeButtonMobile.style.border = '';
          themeButtonMobile.style.overflow = '';
        }
      }
    });
  }
}

/**
 * Gets available themes for dropdown
 */
function getThemes() {
  return Object.keys(themes).map((key) => ({
    value: key,
    label: themes[key].name,
  }));
}
