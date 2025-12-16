/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const MAX_SAVED_URLS = 5;
const STORAGE_KEY = 'qa-web-analyzer-saved-urls';

export const useSavedUrlsStore = defineStore('savedUrls', () => {
  const savedUrls = ref<string[]>([]);

  // Load saved URLs from localStorage on initialization
  function loadSavedUrls() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          savedUrls.value = parsed.slice(0, MAX_SAVED_URLS);
        }
      }
    } catch (error) {
      console.error('Error loading saved URLs:', error);
      savedUrls.value = [];
    }
  }

  // Save URLs to localStorage
  function saveUrlsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedUrls.value));
    } catch (error) {
      console.error('Error saving URLs:', error);
    }
  }

  // Add a new URL (if not already exists and not at max capacity)
  function addUrl(url: string): boolean {
    if (!url || !url.trim()) {
      return false;
    }

    const trimmedUrl = url.trim();

    // Check if URL already exists
    if (savedUrls.value.includes(trimmedUrl)) {
      return false;
    }

    // If at max capacity, remove the oldest (first) URL
    if (savedUrls.value.length >= MAX_SAVED_URLS) {
      savedUrls.value.shift();
    }

    // Add new URL at the end (most recent)
    savedUrls.value.push(trimmedUrl);
    saveUrlsToStorage();
    return true;
  }

  // Remove a URL
  function removeUrl(url: string) {
    const index = savedUrls.value.indexOf(url);
    if (index > -1) {
      savedUrls.value.splice(index, 1);
      saveUrlsToStorage();
    }
  }

  // Check if URL is already saved
  const isUrlSaved = computed(() => {
    return (url: string) => {
      if (!url || !url.trim()) {
        return false;
      }
      return savedUrls.value.includes(url.trim());
    };
  });

  // Check if can save more URLs
  const canSaveMore = computed(() => {
    return savedUrls.value.length < MAX_SAVED_URLS;
  });

  // Initialize on store creation
  loadSavedUrls();

  return {
    savedUrls,
    addUrl,
    removeUrl,
    isUrlSaved,
    canSaveMore,
    loadSavedUrls,
  };
});
