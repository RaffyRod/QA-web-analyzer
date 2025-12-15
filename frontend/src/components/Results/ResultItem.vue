<!--
  @author RaffyRod (https://github.com/RaffyRod)
-->
<template>
  <div
    v-if="show"
    class="result-item"
    :class="statusClass"
    :data-has-attributes="String(hasAttributes)"
  >
    <div class="result-item-header">
      <span class="item-number">#{{ item.index }}</span>
      <span class="item-title">{{ itemTitle }}</span>
      <span v-if="statusBadge" v-html="statusBadge" class="status-badge-wrapper"></span>
    </div>
    <div v-if="item.screenshot" class="screenshot-container">
      <img :src="item.screenshot" alt="Element screenshot" class="element-screenshot" />
    </div>
    <div class="attributes-grid">
      <div v-for="(attr, index) in attributes" :key="index" :class="['attr-item', { 'full-width': attr.fullWidth }]">
        <span class="attr-name">{{ attr.name }}:</span>
        <span :class="['attr-value', attr.status]">{{ attr.value }}</span>
      </div>
    </div>
    <div class="code-section">
      <div class="code-header">
        <span>{{ t('htmlCode') }}</span>
      </div>
      <div class="code-content" v-html="codeContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { escapeHtml } from '@/utils/html'
import type { AnalysisOptions } from '@/stores/analysis'

const props = defineProps<{
  item: any
  options: AnalysisOptions
  type: 'image' | 'link' | 'button' | 'input' | 'role'
  show: boolean
}>()

const languageStore = useLanguageStore()
const { t } = languageStore

const hasAttributes = computed(() => {
  if (props.type === 'image') {
    return props.item.hasAlt === true
  }
  return props.item.hasAccessibility === true
})

const statusClass = computed(() => {
  return hasAttributes.value ? 'has-attributes' : 'missing'
})

const itemTitle = computed(() => {
  switch (props.type) {
    case 'image':
      return t('images')
    case 'link':
      return `${t('links')}: "${escapeHtml(props.item.text || t('noText'))}"`
    case 'button':
      return `${t('buttons')}: "${escapeHtml(props.item.text || t('noText'))}"`
    case 'input':
      return `${props.item.type} ${props.item.name ? `(${escapeHtml(props.item.name)})` : ''}`
    case 'role':
      return `${props.item.tag} (role: ${escapeHtml(props.item.role)})`
    default:
      return ''
  }
})

const statusBadge = computed(() => {
  if (props.type === 'image') {
    if (!props.item.hasAlt && props.options.checkAltText) {
      return `<span class="status-badge error">${t('missing')} Alt</span>`
    } else if (props.item.hasAlt) {
      return `<span class="status-badge success">✓ Alt</span>`
    }
    return ''
  }

  const missingAttrs = props.item.missingAttributes || []
  if (hasAttributes.value) {
    return `<span class="status-badge success">✓ OK</span>`
  } else {
    return `<span class="status-badge error">${missingAttrs.length} ${t('missing')}</span>`
  }
})

const attributes = computed(() => {
  const attrs: Array<{
    name: string
    value: string
    status: 'present' | 'missing' | 'warning'
    fullWidth?: boolean
  }> = []

  if (props.type === 'image') {
    if (props.options.checkAltText) {
      const hasAlt = props.item.alt !== null && props.item.alt.trim() !== ''
      const hasAriaLabel = props.item.ariaLabel !== null && props.item.ariaLabel !== undefined && String(props.item.ariaLabel).trim() !== ''
      const hasAriaLabelledby = props.item.ariaLabelledby !== null && props.item.ariaLabelledby !== undefined && String(props.item.ariaLabelledby).trim() !== ''
      const hasAlternativeText = hasAlt || hasAriaLabel || hasAriaLabelledby

      let altStatus: 'present' | 'missing' | 'warning' = 'missing'
      let altDisplay = t('none')
      
      if (!hasAlternativeText) {
        altStatus = 'missing'
        altDisplay = 'MISSING (use alt, aria-label, or aria-labelledby)'
      } else if (hasAlt) {
        if (props.item.alt?.trim() === '') {
          altStatus = 'warning'
          altDisplay = 'EMPTY (consider if decorative)'
        } else {
          altStatus = 'present'
          altDisplay = escapeHtml(props.item.alt)
        }
      } else if (hasAriaLabel) {
        altStatus = 'present'
        altDisplay = `aria-label: ${escapeHtml(String(props.item.ariaLabel))} (alt preferred)`
      } else if (hasAriaLabelledby) {
        altStatus = 'present'
        altDisplay = `aria-labelledby: ${escapeHtml(String(props.item.ariaLabelledby))} (alt preferred)`
      }
      
      attrs.push({
        name: 'Alt',
        value: altDisplay,
        status: altStatus,
      })
    }
    if (props.options.checkAriaLabel && props.type === 'image') {
      const ariaLabel = props.item.ariaLabel
      const hasAlt = props.item.alt !== null && props.item.alt !== undefined && String(props.item.alt).trim() !== ''
      // According to WCAG: if image has alt, aria-label is not required
      // Only mark as missing if there's no alt AND no aria-label
      const isMissing = !hasAlt && !ariaLabel
      attrs.push({
        name: 'aria-label',
        value: ariaLabel ? escapeHtml(String(ariaLabel)) : (hasAlt ? t('none') + ' (alt present, not required)' : t('none')),
        status: ariaLabel ? 'present' : (hasAlt ? 'normal' : 'missing'),
      })
    }
    if (props.options.checkAriaLabelledby && props.type === 'image') {
      const ariaLabelledby = props.item.ariaLabelledby
      const hasAlt = props.item.alt !== null && props.item.alt !== undefined && String(props.item.alt).trim() !== ''
      // According to WCAG: if image has alt, aria-labelledby is not required
      const isMissing = !hasAlt && !ariaLabelledby
      attrs.push({
        name: 'aria-labelledby',
        value: ariaLabelledby ? escapeHtml(String(ariaLabelledby)) : (hasAlt ? t('none') + ' (alt present, not required)' : t('none')),
        status: ariaLabelledby ? 'present' : (hasAlt ? 'normal' : 'missing'),
      })
    }
    if (props.options.checkFocusStates) {
      const hasFocusState = props.item.hasFocusState !== false
      const focusStateInMissing =
        props.item.missingAttributes && props.item.missingAttributes.includes('focus-state')
      attrs.push({
        name: 'Focus State',
        value: hasFocusState && !focusStateInMissing ? 'Present' : 'Missing',
        status: hasFocusState && !focusStateInMissing ? 'present' : 'missing',
      })
    }
    attrs.push({
      name: 'Source',
      value: props.item.src || '',
      status: 'present',
      fullWidth: true,
    })
  } else {
    // Links, Buttons, Inputs, Roles
    if (props.options.checkAriaLabel) {
      attrs.push({
        name: 'aria-label',
        value: props.item.ariaLabel ? escapeHtml(props.item.ariaLabel) : t('none'),
        status: props.item.ariaLabel ? 'present' : 'missing',
      })
    }
    if (props.options.checkAriaLabelledby) {
      attrs.push({
        name: 'aria-labelledby',
        value: props.item.ariaLabelledby ? escapeHtml(props.item.ariaLabelledby) : t('none'),
        status: props.item.ariaLabelledby ? 'present' : 'missing',
      })
    }
    if (props.type === 'input' && props.options.checkLabels) {
      attrs.push({
        name: '<label>',
        value: props.item.label ? escapeHtml(props.item.label) : t('none'),
        status: props.item.label ? 'present' : 'missing',
      })
    }
    if (props.options.checkAriaDescribedby && props.item.ariaDescribedby !== null) {
      attrs.push({
        name: 'aria-describedby',
        value: escapeHtml(props.item.ariaDescribedby),
        status: 'present',
      })
    }
    if (props.type === 'input' && props.options.checkAriaRequired && props.item.ariaRequired !== null) {
      attrs.push({
        name: 'aria-required',
        value: escapeHtml(props.item.ariaRequired),
        status: 'present',
      })
    }
    if (props.type === 'input' && props.options.checkAriaInvalid && props.item.ariaInvalid !== null) {
      attrs.push({
        name: 'aria-invalid',
        value: escapeHtml(props.item.ariaInvalid),
        status: props.item.ariaInvalid === 'true' ? 'warning' : 'present',
      })
    }
    if (props.options.checkAriaHidden && props.item.ariaHidden !== null) {
      attrs.push({
        name: 'aria-hidden',
        value: escapeHtml(props.item.ariaHidden),
        status: props.item.ariaHidden === 'true' ? 'warning' : 'present',
      })
    }
    if (props.options.checkAriaExpanded && props.item.ariaExpanded !== null) {
      attrs.push({
        name: 'aria-expanded',
        value: escapeHtml(props.item.ariaExpanded),
        status: 'present',
      })
    }
    if (props.options.checkAriaControls && props.item.ariaControls !== null) {
      attrs.push({
        name: 'aria-controls',
        value: escapeHtml(props.item.ariaControls),
        status: 'present',
      })
    }
    if (props.options.checkAriaCurrent && props.item.ariaCurrent !== null) {
      attrs.push({
        name: 'aria-current',
        value: escapeHtml(props.item.ariaCurrent),
        status: 'present',
      })
    }
    if (props.options.checkTabIndex && props.item.tabIndex !== null) {
      const tabIndexValue = parseInt(props.item.tabIndex)
      const tabIndexClass = tabIndexValue > 0 ? 'warning' : 'present'
      attrs.push({
        name: 'tabindex',
        value: `${escapeHtml(props.item.tabIndex)}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
        status: tabIndexClass,
      })
    }
    if (props.options.checkLang && props.item.lang !== null) {
      attrs.push({
        name: 'lang',
        value: escapeHtml(props.item.lang),
        status: 'present',
      })
    }
    if (props.options.checkTitle && props.type === 'link' && props.item.title !== null) {
      attrs.push({
        name: 'title',
        value: props.item.title ? escapeHtml(props.item.title) : t('none'),
        status: props.item.title ? 'present' : 'missing',
      })
    }
    if (props.options.checkFocusStates) {
      const hasFocusState = props.item.hasFocusState !== false
      const focusStateInMissing =
        props.item.missingAttributes && props.item.missingAttributes.includes('focus-state')
      attrs.push({
        name: 'Focus State',
        value: hasFocusState && !focusStateInMissing ? 'Present' : 'Missing',
        status: hasFocusState && !focusStateInMissing ? 'present' : 'missing',
      })
    }
    if (props.type === 'link' && props.options.checkHref && props.item.href) {
      attrs.push({
        name: 'Href',
        value: props.item.href,
        status: 'present',
        fullWidth: true,
      })
    }
  }

  return attrs
})

function formatCodeSnippet(html: string | null | undefined, maxLength = 200): string {
  if (!html) return '<code class="code-snippet"></code>'

  const escaped = escapeHtml(html)
  const isLong = html.length > maxLength
  const truncated = isLong ? escaped.substring(0, maxLength) + '...' : escaped
  const uniqueId = 'code-' + Math.random().toString(36).substr(2, 9)

  if (isLong) {
    const expandText = t('expand') || 'Expand'
    return (
      '<div class="code-container">' +
      `<code class="code-snippet" id="${uniqueId}-short">${truncated}</code>` +
      `<code class="code-snippet hidden" id="${uniqueId}-full">${escaped}</code>` +
      `<button class="code-toggle" onclick="window.toggleCode('${uniqueId}')" data-expanded="false">` +
      `<span class="toggle-text">${expandText}</span>` +
      '</button>' +
      '</div>'
    )
  }
  return `<code class="code-snippet">${escaped}</code>`
}

const codeContent = computed(() => {
  return formatCodeSnippet(props.item.outerHTML)
})
</script>

