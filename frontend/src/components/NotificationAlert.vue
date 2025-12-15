<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
<template>
  <Transition name="notification">
    <div v-if="visible" class="notification-alert" :class="type">
      <div class="notification-content">
        <span class="notification-icon">{{ icon }}</span>
        <div class="notification-text">
          <strong class="notification-title">{{ title }}</strong>
          <p class="notification-message" v-if="message">{{ message }}</p>
        </div>
        <button class="notification-close" @click="close" aria-label="Close notification">
          ×
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  type?: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
  duration?: number
  autoClose?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 5000,
  autoClose: true,
})

const visible = ref(false)
// Use only one emoji for all notifications (informative)
const icon = ref('ℹ️')

onMounted(() => {
  visible.value = true
  
  if (props.autoClose && props.duration > 0) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})

function close() {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300) // Wait for transition
}

const emit = defineEmits<{
  close: []
}>()

defineExpose({
  close,
})
</script>

<style scoped>
.notification-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  min-width: 320px;
  max-width: 500px;
  background: var(--card-bg, #ffffff);
  border-radius: 12px;
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.15),
    0 4px 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid var(--primary-color, #2563eb);
  animation: slideIn 0.3s ease-out;
  overflow: hidden;
  /* Ensure text is always readable - use theme colors */
  color: var(--text-primary, #1e293b);
  border: 1px solid var(--border-color, #e2e8f0);
  /* For glassmorphism and light themes, ensure contrast */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Use theme colors for all notification types */
.notification-alert.info {
  border-left-color: var(--primary-color, #2563eb);
  background: var(--card-bg, #ffffff);
  /* Ensure background has enough opacity for text readability */
  background-color: var(--card-bg, #ffffff);
}

.notification-alert.success {
  border-left-color: var(--success-color, #10b981);
  background: var(--card-bg, #ffffff);
  background-color: var(--card-bg, #ffffff);
}

.notification-alert.warning {
  border-left-color: var(--warning-color, #f59e0b);
  background: var(--card-bg, #ffffff);
  background-color: var(--card-bg, #ffffff);
}

.notification-alert.error {
  border-left-color: var(--danger-color, #ef4444);
  background: var(--card-bg, #ffffff);
  background-color: var(--card-bg, #ffffff);
}

.notification-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
}

.notification-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  line-height: 1;
}

.notification-text {
  flex: 1;
  min-width: 0;
}

.notification-title {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary, #1e293b) !important;
  margin-bottom: 4px;
  /* Ensure readability in all themes, especially glassmorphism */
  /* Use stronger text shadow for light backgrounds */
  text-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 0 1px rgba(255, 255, 255, 0.8);
}

.notification-message {
  font-size: 0.875rem;
  color: var(--text-secondary, #64748b) !important;
  margin: 0;
  line-height: 1.4;
  /* Ensure readability in all themes */
  text-shadow: 
    0 1px 1px rgba(0, 0, 0, 0.15),
    0 0 1px rgba(255, 255, 255, 0.6);
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-secondary, #64748b) !important;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  line-height: 1;
  font-weight: bold;
}

.notification-close:hover {
  background: var(--border-color, rgba(0, 0, 0, 0.1));
  color: var(--text-primary, #1e293b) !important;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .notification-alert {
    top: 10px;
    right: 10px;
    left: 10px;
    min-width: auto;
    max-width: none;
  }
}
</style>

