/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/main.css';
import { useLanguageStore } from './stores/language';

// Clear cache on app initialization (development only)
if (import.meta.env.DEV) {
  // Clear service worker cache
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }

  // Clear browser cache
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  }
}

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

// Initialize language store to set up translations
const languageStore = useLanguageStore();

// Add toggleCode function to window for code expansion
(window as any).toggleCode = function (id: string) {
  const short = document.getElementById(`${id}-short`);
  const full = document.getElementById(`${id}-full`);
  const button = short?.nextElementSibling?.nextElementSibling as HTMLButtonElement | null;
  const toggleText = button?.querySelector('.toggle-text');

  if (short && full && button) {
    const isExpanded = button.getAttribute('data-expanded') === 'true';

    if (isExpanded) {
      short.classList.remove('hidden');
      full.classList.add('hidden');
      button.setAttribute('data-expanded', 'false');
      if (toggleText) toggleText.textContent = languageStore.t('expand') || 'Expand';
    } else {
      short.classList.add('hidden');
      full.classList.remove('hidden');
      button.setAttribute('data-expanded', 'true');
      if (toggleText) toggleText.textContent = languageStore.t('collapse') || 'Collapse';
    }
  }
};

app.mount('#app');
