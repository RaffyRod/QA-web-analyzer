/**
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
};

let currentTheme = localStorage.getItem('theme') || 'light';

/**
 * Applies a theme to the document
 */
window.applyTheme = function(themeName) {
  if (!themes[themeName]) {
    themeName = 'light';
  }
  
  currentTheme = themeName;
  localStorage.setItem('theme', themeName);
  
  const theme = themes[themeName];
  const root = document.documentElement;
  
  Object.keys(theme).forEach(key => {
    if (key !== 'name') {
      root.style.setProperty(key, theme[key]);
    }
  });
  
  document.body.setAttribute('data-theme', themeName);
  
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.value = themeName;
  }
};

/**
 * Initializes theme on page load
 */
window.initTheme = function() {
  window.applyTheme(currentTheme);
};

/**
 * Gets available themes for dropdown
 */
function getThemes() {
  return Object.keys(themes).map(key => ({
    value: key,
    label: themes[key].name
  }));
}
