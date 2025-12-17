/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import jsPDF from 'jspdf';
import type { AnalysisResults, AnalysisOptions } from '@/stores/analysis';
import { useLanguageStore } from '@/stores/language';

interface ExportOptions {
  data: AnalysisResults & { url?: string; analyzedAt?: string };
  analysisOptions: AnalysisOptions;
  showMissing: boolean;
  showHasAttributes: boolean;
  sectionsVisible: {
    images: boolean;
    links: boolean;
    buttons: boolean;
    inputs: boolean;
    roles: boolean;
  };
  exportOptions?: {
    elements: {
      images: boolean;
      links: boolean;
      buttons: boolean;
      inputs: boolean;
      roles: boolean;
    };
    status: {
      passed: boolean;
      failed: boolean;
    };
    options: {
      includeSummary: boolean;
      includeScreenshots: boolean;
      includeHTML: boolean;
    };
  };
}

interface ProcessedItem {
  type: 'Image' | 'Link' | 'Button' | 'Input' | 'Role';
  screenshot: string | null;
  missingAttributes: string[];
  index: number;
  text?: string;
  href?: string;
  typeName?: string;
  role?: string;
  hasAccessibility: boolean;
  selector?: string;
  outerHTML?: string;
  originalData: any;
}

interface AttributeRow {
  name: string;
  value: string;
  status: 'normal' | 'present' | 'missing' | 'warning';
  isHeader?: boolean;
  isImage?: boolean;
}

function sanitizeText(text: string | null | undefined): string {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '')
    .trim();
}

function getThemeColors() {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  function parseColor(colorValue: string): [number, number, number] {
    if (!colorValue) return [0, 0, 0];

    if (colorValue.startsWith('rgb')) {
      const matches = colorValue.match(/\d+/g);
      if (matches && matches.length >= 3) {
        return [parseInt(matches[0]), parseInt(matches[1]), parseInt(matches[2])];
      }
    }

    if (colorValue.startsWith('#')) {
      const hex = colorValue.substring(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [r, g, b];
    }

    return [0, 0, 0];
  }

  const primaryColor = parseColor(
    computedStyle.getPropertyValue('--primary-color').trim() || '#3b82f6'
  );
  const successColor = parseColor(
    computedStyle.getPropertyValue('--success-color').trim() || '#10b981'
  );
  const dangerColor = parseColor(
    computedStyle.getPropertyValue('--danger-color').trim() || '#ef4444'
  );
  const warningColor = parseColor(
    computedStyle.getPropertyValue('--warning-color').trim() || '#f59e0b'
  );

  return {
    primary: primaryColor,
    success: successColor,
    danger: dangerColor,
    warning: warningColor,
  };
}

function getPdfTranslation(key: string, t: (key: string) => string): string {
  const translations: Record<string, Record<string, string>> = {
    en: {
      Title: 'QA-web-analyzer Accessibility Report',
      Summary: 'Summary',
      TotalImages: 'Total Images',
      WithoutAlt: 'Without Alt',
      TotalLinks: 'Total Links',
      LinkIssues: 'Link Issues',
      IssuesFound: 'Issues Found',
      ElementsWithAccessibility: 'Elements with Accessibility',
      AllElements: 'All Elements',
      Filters: 'Filters',
      MissingAttributes: 'Missing Attributes',
      WithAttributes: 'With Attributes',
      Missing: 'Missing',
      Passed: 'Passed',
      Failed: 'Failed',
      Text: 'Text',
      Alt: 'Alt',
      URL: 'URL',
      Type: 'Type',
      Role: 'Role',
      Selector: 'Selector',
      Images: 'Images',
      Links: 'Links',
      Buttons: 'Buttons',
      Inputs: 'Inputs',
      Roles: 'Roles',
      Date: 'Date',
    },
    es: {
      Title: 'Reporte de Accesibilidad QA-web-analyzer',
      Summary: 'Resumen',
      TotalImages: 'Total de Imágenes',
      WithoutAlt: 'Sin Alt',
      TotalLinks: 'Total de Enlaces',
      LinkIssues: 'Problemas de Enlaces',
      IssuesFound: 'Problemas Encontrados',
      ElementsWithAccessibility: 'Elementos con Accesibilidad',
      AllElements: 'Todos los Elementos',
      Filters: 'Filtros',
      MissingAttributes: 'Atributos Faltantes',
      WithAttributes: 'Con Atributos',
      Missing: 'Falta',
      Passed: 'Aprobado',
      Failed: 'Fallido',
      Text: 'Texto',
      Alt: 'Alt',
      URL: 'URL',
      Type: 'Tipo',
      Role: 'Rol',
      Selector: 'Selector',
      Images: 'Imágenes',
      Links: 'Enlaces',
      Buttons: 'Botones',
      Inputs: 'Inputs',
      Roles: 'Roles',
      Date: 'Fecha',
    },
  };

  const currentLang = localStorage.getItem('language') || 'en';
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

function processItems(
  data: AnalysisResults,
  analysisOptions: AnalysisOptions,
  showMissing: boolean,
  showHasAttributes: boolean,
  sectionsVisible: ExportOptions['sectionsVisible']
): {
  items: ProcessedItem[];
  sectionItems: {
    Images: ProcessedItem[];
    Links: ProcessedItem[];
    Buttons: ProcessedItem[];
    Inputs: ProcessedItem[];
    Roles: ProcessedItem[];
  };
} {
  const items: ProcessedItem[] = [];
  const sectionItems = {
    Images: [] as ProcessedItem[],
    Links: [] as ProcessedItem[],
    Buttons: [] as ProcessedItem[],
    Inputs: [] as ProcessedItem[],
    Roles: [] as ProcessedItem[],
  };
  const processedItems = new Map<string, ProcessedItem>();

  function shouldInclude(hasMissing: boolean, hasAttributes: boolean): boolean {
    if (!showMissing && !showHasAttributes) {
      return true;
    } else if (showMissing && showHasAttributes) {
      return true;
    } else if (showMissing && !showHasAttributes) {
      return hasMissing;
    } else if (!showMissing && showHasAttributes) {
      return hasAttributes;
    }
    return false;
  }

  if (sectionsVisible.images && data.images) {
    data.images.forEach((img: any) => {
      const hasMissing = img.missingAttributes && img.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && img.hasAccessibility;

      if (shouldInclude(hasMissing, hasAttributes)) {
        const uniqueKey = `Image-${img.src || ''}-${img.alt || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          const item: ProcessedItem = {
            type: 'Image',
            screenshot: img.screenshot || null,
            missingAttributes: img.missingAttributes || [],
            index: img.index,
            hasAccessibility: img.hasAccessibility,
            selector: img.selector,
            outerHTML: img.outerHTML,
            originalData: img,
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Images.push(item);
        } else if (
          hasMissing &&
          (!existingItem.missingAttributes ||
            existingItem.missingAttributes.length < img.missingAttributes.length)
        ) {
          existingItem.missingAttributes = img.missingAttributes || [];
          existingItem.hasAccessibility = img.hasAccessibility;
          existingItem.originalData = img;
        }
      }
    });
  }

  if (sectionsVisible.links && data.links) {
    data.links.forEach((link: any) => {
      const hasMissing = link.missingAttributes && link.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && link.hasAccessibility;

      if (shouldInclude(hasMissing, hasAttributes)) {
        const uniqueKey = `Link-${link.href || ''}-${link.text || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          const item: ProcessedItem = {
            type: 'Link',
            screenshot: link.screenshot || null,
            missingAttributes: link.missingAttributes || [],
            index: link.index,
            text: link.text,
            href: link.href,
            hasAccessibility: link.hasAccessibility,
            selector: link.selector,
            outerHTML: link.outerHTML,
            originalData: link,
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Links.push(item);
        } else if (
          hasMissing &&
          (!existingItem.missingAttributes ||
            existingItem.missingAttributes.length < link.missingAttributes.length)
        ) {
          existingItem.missingAttributes = link.missingAttributes || [];
          existingItem.hasAccessibility = link.hasAccessibility;
          existingItem.originalData = link;
        }
      }
    });
  }

  if (sectionsVisible.buttons && data.buttons) {
    data.buttons.forEach((btn: any) => {
      const hasMissing = btn.missingAttributes && btn.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && btn.hasAccessibility;

      if (shouldInclude(hasMissing, hasAttributes)) {
        const uniqueKey = `Button-${btn.text || ''}-${btn.ariaLabel || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          const item: ProcessedItem = {
            type: 'Button',
            screenshot: btn.screenshot || null,
            missingAttributes: btn.missingAttributes || [],
            index: btn.index,
            text: btn.text,
            hasAccessibility: btn.hasAccessibility,
            selector: btn.selector,
            outerHTML: btn.outerHTML,
            originalData: btn,
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Buttons.push(item);
        } else if (
          hasMissing &&
          (!existingItem.missingAttributes ||
            existingItem.missingAttributes.length < btn.missingAttributes.length)
        ) {
          existingItem.missingAttributes = btn.missingAttributes || [];
          existingItem.hasAccessibility = btn.hasAccessibility;
          existingItem.originalData = btn;
        }
      }
    });
  }

  if (sectionsVisible.inputs && data.inputs) {
    data.inputs.forEach((input: any) => {
      const hasMissing = input.missingAttributes && input.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && input.hasAccessibility;

      if (shouldInclude(hasMissing, hasAttributes)) {
        const uniqueKey = `Input-${input.type || ''}-${input.name || ''}-${input.label || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          const item: ProcessedItem = {
            type: 'Input',
            screenshot: input.screenshot || null,
            missingAttributes: input.missingAttributes || [],
            index: input.index,
            typeName: input.type,
            hasAccessibility: input.hasAccessibility,
            selector: input.selector,
            outerHTML: input.outerHTML,
            originalData: input,
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Inputs.push(item);
        } else if (
          hasMissing &&
          (!existingItem.missingAttributes ||
            existingItem.missingAttributes.length < input.missingAttributes.length)
        ) {
          existingItem.missingAttributes = input.missingAttributes || [];
          existingItem.hasAccessibility = input.hasAccessibility;
          existingItem.originalData = input;
        }
      }
    });
  }

  if (sectionsVisible.roles && data.roles) {
    data.roles.forEach((role: any) => {
      const hasMissing = role.missingAttributes && role.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && role.hasAccessibility;

      if (shouldInclude(hasMissing, hasAttributes)) {
        const uniqueKey = `Role-${role.role || ''}-${role.tag || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          const item: ProcessedItem = {
            type: 'Role',
            screenshot: role.screenshot || null,
            missingAttributes: role.missingAttributes || [],
            index: role.index,
            role: role.role,
            hasAccessibility: role.hasAccessibility,
            selector: role.selector,
            outerHTML: role.outerHTML,
            originalData: role,
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Roles.push(item);
        } else if (
          hasMissing &&
          (!existingItem.missingAttributes ||
            existingItem.missingAttributes.length < role.missingAttributes.length)
        ) {
          existingItem.missingAttributes = role.missingAttributes || [];
          existingItem.hasAccessibility = role.hasAccessibility;
          existingItem.originalData = role;
        }
      }
    });
  }

  return { items, sectionItems };
}

function buildAttributeRows(
  item: ProcessedItem,
  analysisOptions: AnalysisOptions,
  exportOptions?: ExportOptions['exportOptions']
): AttributeRow[] {
  const attributeRows: AttributeRow[] = [];
  const elem = item.originalData;
  const isError = item.missingAttributes && item.missingAttributes.length > 0;

  // Header row
  const titleText = item.type;
  let headerValue = titleText;
  if (item.type === 'Link' || item.type === 'Button') {
    const cleanText = String(item.text || '')
      .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '')
      .trim();
    const displayText = cleanText
      ? ` "${cleanText.substring(0, 40)}${cleanText.length > 40 ? '...' : ''}"`
      : '';
    headerValue = `${titleText}${displayText}`;
  }
  attributeRows.push({
    name: `#${item.index}`,
    value: headerValue,
    status: 'normal',
    isHeader: true,
  });

  // Image row
  const screenshot = item.screenshot || null;
  const hasValidScreenshot =
    screenshot &&
    (screenshot.startsWith('data:image') ||
      screenshot.startsWith('http://') ||
      screenshot.startsWith('https://') ||
      (typeof screenshot === 'string' && screenshot.length > 0));

  if (hasValidScreenshot) {
    attributeRows.push({
      name: 'Image',
      value: '',
      status: 'normal',
      isImage: true,
    });
  }

  // Missing attributes
  if (isError && item.missingAttributes && item.missingAttributes.length > 0) {
    const missingAttrs = Array.isArray(item.missingAttributes)
      ? item.missingAttributes
      : [String(item.missingAttributes || '')];
    missingAttrs.forEach((missingAttr) => {
      attributeRows.push({
        name: 'Missing',
        value: String(missingAttr),
        status: 'missing',
      });
    });
  }

  // Text content - label with context based on element type
  if (item.text) {
    const cleanText = sanitizeText(item.text);
    if (cleanText) {
      const maxLength = 200;
      const truncatedText =
        cleanText.length > maxLength ? cleanText.substring(0, maxLength) + '...' : cleanText;

      // Determine text type label based on element type
      let textLabel = 'Text';
      if (item.type === 'Link') {
        textLabel = 'Link Text (visible text)';
      } else if (item.type === 'Button') {
        textLabel = 'Button Text (visible text)';
      } else if (item.type === 'Input') {
        textLabel = 'Input Text (visible/label text)';
      } else if (item.type === 'Role') {
        textLabel = 'Element Text (visible text)';
      }
      // For Images, we don't show text content as it's not relevant

      attributeRows.push({
        name: textLabel,
        value: truncatedText,
        status: 'normal',
      });
    }
  }

  // Type-specific attributes
  if (item.type === 'Image') {
    if (analysisOptions.checkAltText) {
      const hasAlt = elem.alt !== null && String(elem.alt || '').trim() !== '';
      const hasAriaLabel =
        elem.ariaLabel !== null &&
        elem.ariaLabel !== undefined &&
        String(elem.ariaLabel || '').trim() !== '';
      const hasAriaLabelledby =
        elem.ariaLabelledby !== null &&
        elem.ariaLabelledby !== undefined &&
        String(elem.ariaLabelledby || '').trim() !== '';
      const hasAlternativeText = hasAlt || hasAriaLabel || hasAriaLabelledby;

      let altValue = 'MISSING';
      let altStatus: 'missing' | 'present' | 'warning' = 'missing';

      if (!hasAlternativeText) {
        altValue = 'MISSING (use alt, aria-label, or aria-labelledby)';
        altStatus = 'missing';
      } else if (hasAlt) {
        if (String(elem.alt || '').trim() === '') {
          altValue = 'EMPTY (consider if decorative)';
          altStatus = 'warning';
        } else {
          altValue = sanitizeText(String(elem.alt || ''));
          altStatus = 'present';
        }
      } else if (hasAriaLabel) {
        altValue = `aria-label: ${sanitizeText(String(elem.ariaLabel || ''))} (alt preferred)`;
        altStatus = 'present';
      } else if (hasAriaLabelledby) {
        altValue = `aria-labelledby: ${sanitizeText(String(elem.ariaLabelledby || ''))} (alt preferred)`;
        altStatus = 'present';
      }

      attributeRows.push({
        name: 'Alt',
        value: altValue,
        status: altStatus,
      });
    }
    if (analysisOptions.checkAriaLabel) {
      const ariaLabel = elem.ariaLabel;
      attributeRows.push({
        name: 'aria-label',
        value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
        status: ariaLabel ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaLabelledby) {
      const ariaLabelledby = elem.ariaLabelledby;
      attributeRows.push({
        name: 'aria-labelledby',
        value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
        status: ariaLabelledby ? 'present' : 'missing',
      });
    }
    if (elem.src) {
      const srcText = String(elem.src);
      const truncatedSrc = srcText.length > 200 ? srcText.substring(0, 200) + '...' : srcText;
      attributeRows.push({
        name: 'Source',
        value: truncatedSrc,
        status: 'normal',
      });
    }
    if (analysisOptions.checkFocusStates) {
      const hasFocusState = elem.hasFocusState !== false;
      const focusStateInMissing =
        elem.missingAttributes && elem.missingAttributes.includes('focus-state');
      attributeRows.push({
        name: 'Focus State',
        value: hasFocusState && !focusStateInMissing ? 'Present' : 'Missing',
        status: hasFocusState && !focusStateInMissing ? 'present' : 'missing',
      });
    }
  }

  if (item.type === 'Link') {
    if (analysisOptions.checkAriaLabel) {
      const ariaLabel = elem.ariaLabel;
      attributeRows.push({
        name: 'aria-label',
        value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
        status: ariaLabel ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaLabelledby) {
      const ariaLabelledby = elem.ariaLabelledby;
      attributeRows.push({
        name: 'aria-labelledby',
        value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
        status: ariaLabelledby ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkTitle) {
      const title = elem.title;
      attributeRows.push({
        name: 'title',
        value: title ? sanitizeText(String(title)) : 'MISSING',
        status: title ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaHidden && elem.ariaHidden !== null) {
      const ariaHidden = elem.ariaHidden;
      attributeRows.push({
        name: 'aria-hidden',
        value: String(ariaHidden),
        status: ariaHidden === 'true' ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkAriaExpanded && elem.ariaExpanded !== null) {
      attributeRows.push({
        name: 'aria-expanded',
        value: String(elem.ariaExpanded),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaControls && elem.ariaControls !== null) {
      attributeRows.push({
        name: 'aria-controls',
        value: String(elem.ariaControls),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaCurrent && elem.ariaCurrent !== null) {
      attributeRows.push({
        name: 'aria-current',
        value: String(elem.ariaCurrent),
        status: 'normal',
      });
    }
    if (analysisOptions.checkTabIndex && elem.tabIndex !== null) {
      const tabIndexValue = parseInt(elem.tabIndex);
      attributeRows.push({
        name: 'tabindex',
        value: `${elem.tabIndex}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
        status: tabIndexValue > 0 ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkLang && elem.lang !== null) {
      attributeRows.push({
        name: 'lang',
        value: String(elem.lang),
        status: 'normal',
      });
    }
    if (analysisOptions.checkFocusStates) {
      const hasFocusState = elem.hasFocusState !== false;
      const focusStateInMissing =
        elem.missingAttributes && elem.missingAttributes.includes('focus-state');
      attributeRows.push({
        name: 'Focus State',
        value: hasFocusState && !focusStateInMissing ? 'Present' : 'Missing',
        status: hasFocusState && !focusStateInMissing ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkHref && elem.href) {
      const hrefText = String(elem.href);
      const truncatedHref = hrefText.length > 200 ? hrefText.substring(0, 200) + '...' : hrefText;
      attributeRows.push({
        name: 'Href',
        value: truncatedHref,
        status: 'normal',
      });
    }
  }

  if (item.type === 'Button') {
    if (analysisOptions.checkAriaLabel) {
      const ariaLabel = elem.ariaLabel;
      attributeRows.push({
        name: 'aria-label',
        value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
        status: ariaLabel ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaLabelledby) {
      const ariaLabelledby = elem.ariaLabelledby;
      attributeRows.push({
        name: 'aria-labelledby',
        value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
        status: ariaLabelledby ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaDescribedby && elem.ariaDescribedby !== null) {
      attributeRows.push({
        name: 'aria-describedby',
        value: sanitizeText(String(elem.ariaDescribedby)),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaHidden && elem.ariaHidden !== null) {
      const ariaHidden = elem.ariaHidden;
      attributeRows.push({
        name: 'aria-hidden',
        value: String(ariaHidden),
        status: ariaHidden === 'true' ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkAriaExpanded && elem.ariaExpanded !== null) {
      attributeRows.push({
        name: 'aria-expanded',
        value: String(elem.ariaExpanded),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaControls && elem.ariaControls !== null) {
      attributeRows.push({
        name: 'aria-controls',
        value: String(elem.ariaControls),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaCurrent && elem.ariaCurrent !== null) {
      attributeRows.push({
        name: 'aria-current',
        value: String(elem.ariaCurrent),
        status: 'normal',
      });
    }
    if (analysisOptions.checkTabIndex && elem.tabIndex !== null) {
      const tabIndexValue = parseInt(elem.tabIndex);
      attributeRows.push({
        name: 'tabindex',
        value: `${elem.tabIndex}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
        status: tabIndexValue > 0 ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkLang && elem.lang !== null) {
      attributeRows.push({
        name: 'lang',
        value: String(elem.lang),
        status: 'normal',
      });
    }
    if (analysisOptions.checkFocusStates) {
      const hasFocusState = elem.hasFocusState !== false;
      const focusStateInMissing =
        elem.missingAttributes && elem.missingAttributes.includes('focus-state');
      attributeRows.push({
        name: 'Focus State',
        value: hasFocusState && !focusStateInMissing ? 'Present' : 'Missing',
        status: hasFocusState && !focusStateInMissing ? 'present' : 'missing',
      });
    }
  }

  if (item.type === 'Input') {
    if (analysisOptions.checkAriaLabel) {
      const ariaLabel = elem.ariaLabel;
      attributeRows.push({
        name: 'aria-label',
        value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
        status: ariaLabel ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaLabelledby) {
      const ariaLabelledby = elem.ariaLabelledby;
      attributeRows.push({
        name: 'aria-labelledby',
        value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
        status: ariaLabelledby ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkLabels) {
      const label = elem.label;
      attributeRows.push({
        name: '<label>',
        value: label ? sanitizeText(String(label)) : 'MISSING',
        status: label ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaDescribedby && elem.ariaDescribedby !== null) {
      attributeRows.push({
        name: 'aria-describedby',
        value: sanitizeText(String(elem.ariaDescribedby)),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaRequired && elem.ariaRequired !== null) {
      attributeRows.push({
        name: 'aria-required',
        value: String(elem.ariaRequired),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaInvalid && elem.ariaInvalid !== null) {
      const ariaInvalid = elem.ariaInvalid;
      attributeRows.push({
        name: 'aria-invalid',
        value: String(ariaInvalid),
        status: ariaInvalid === 'true' ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkAriaHidden && elem.ariaHidden !== null) {
      const ariaHidden = elem.ariaHidden;
      attributeRows.push({
        name: 'aria-hidden',
        value: `${String(ariaHidden)} (should not be true for inputs)`,
        status: ariaHidden === 'true' ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkTabIndex && elem.tabIndex !== null) {
      const tabIndexValue = parseInt(elem.tabIndex);
      attributeRows.push({
        name: 'tabindex',
        value: `${elem.tabIndex}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
        status: tabIndexValue > 0 ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkLang && elem.lang !== null) {
      attributeRows.push({
        name: 'lang',
        value: String(elem.lang),
        status: 'normal',
      });
    }
    if (analysisOptions.checkFocusStates) {
      const focusStateInMissing =
        elem.missingAttributes && elem.missingAttributes.includes('focus-state');
      attributeRows.push({
        name: 'Focus State',
        value: !focusStateInMissing ? 'Present' : 'Missing',
        status: !focusStateInMissing ? 'present' : 'missing',
      });
    }
    if (item.typeName) {
      attributeRows.push({
        name: 'Type',
        value: String(item.typeName),
        status: 'normal',
      });
    }
  }

  if (item.type === 'Role') {
    if (analysisOptions.checkAriaLabel) {
      const ariaLabel = elem.ariaLabel;
      attributeRows.push({
        name: 'aria-label',
        value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
        status: ariaLabel ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaLabelledby) {
      const ariaLabelledby = elem.ariaLabelledby;
      attributeRows.push({
        name: 'aria-labelledby',
        value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
        status: ariaLabelledby ? 'present' : 'missing',
      });
    }
    if (analysisOptions.checkAriaDescribedby && elem.ariaDescribedby !== null) {
      attributeRows.push({
        name: 'aria-describedby',
        value: sanitizeText(String(elem.ariaDescribedby)),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaHidden && elem.ariaHidden !== null) {
      const ariaHidden = elem.ariaHidden;
      attributeRows.push({
        name: 'aria-hidden',
        value: String(ariaHidden),
        status: ariaHidden === 'true' ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkAriaExpanded && elem.ariaExpanded !== null) {
      attributeRows.push({
        name: 'aria-expanded',
        value: String(elem.ariaExpanded),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaControls && elem.ariaControls !== null) {
      attributeRows.push({
        name: 'aria-controls',
        value: String(elem.ariaControls),
        status: 'normal',
      });
    }
    if (analysisOptions.checkAriaCurrent && elem.ariaCurrent !== null) {
      attributeRows.push({
        name: 'aria-current',
        value: String(elem.ariaCurrent),
        status: 'normal',
      });
    }
    if (analysisOptions.checkTabIndex && elem.tabIndex !== null) {
      const tabIndexValue = parseInt(elem.tabIndex);
      attributeRows.push({
        name: 'tabindex',
        value: `${elem.tabIndex}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
        status: tabIndexValue > 0 ? 'warning' : 'normal',
      });
    }
    if (analysisOptions.checkLang && elem.lang !== null) {
      attributeRows.push({
        name: 'lang',
        value: String(elem.lang),
        status: 'normal',
      });
    }
    if (item.role) {
      attributeRows.push({
        name: 'Role',
        value: String(item.role),
        status: 'normal',
      });
    }
  }

  // Note: HTML/outerHTML is NOT added here for HTML export
  // It's shown in a separate "HTML Code" section below to avoid redundancy
  // For PDF export, HTML can be added if needed (but currently not included in attributes)

  // Add selector
  if (item.selector && String(item.selector).trim().length > 0) {
    const selectorText = String(item.selector).trim();
    const truncatedSelector =
      selectorText.length > 200 ? selectorText.substring(0, 200) + '...' : selectorText;
    attributeRows.push({
      name: 'Selector',
      value: truncatedSelector,
      status: 'normal',
    });
  }

  return attributeRows;
}

async function renderItemTable(
  doc: jsPDF,
  item: ProcessedItem,
  attributeRows: AttributeRow[],
  pageWidth: number,
  margin: number,
  contentY: number,
  t: (key: string) => string,
  exportOptions?: ExportOptions['exportOptions']
): Promise<number> {
  const textWidth = pageWidth - margin * 2;
  const contentStartX = margin + 8;
  const tableStartX = contentStartX;
  const tableWidth = textWidth - 16;
  const col1Width = 45;
  const col2Width = tableWidth - col1Width - 3;
  let currentRowY = contentY;
  const rowHeight = 5;
  const cellPadding = 2;
  const attributesStartY = contentY;

  doc.setFontSize(7.5);
  let rowIndex = 0;
  let imageData: { src: string; maxWidth: number; maxHeight: number } | null = null;

  for (const row of attributeRows) {
    // Header row
    if (row.isHeader) {
      const headerRowHeight = 6;
      doc.setFillColor(30, 30, 30);
      doc.rect(tableStartX, currentRowY, tableWidth, headerRowHeight, 'F');

      doc.setFont(undefined, 'bold');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text(row.name, tableStartX + cellPadding, currentRowY + 4);
      doc.text(String(row.value), tableStartX + col1Width + cellPadding, currentRowY + 4);

      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.4);
      doc.line(
        tableStartX + col1Width,
        currentRowY,
        tableStartX + col1Width,
        currentRowY + headerRowHeight
      );

      currentRowY += headerRowHeight + 0.3;
      rowIndex++;
      continue;
    }

    // Image row
    if (row.isImage && item.screenshot && exportOptions?.options.includeScreenshots !== false) {
      const imageRowHeight = 22;
      const isEvenRow = (rowIndex - 1) % 2 === 0;
      const rowBgColor = isEvenRow ? [255, 255, 255] : [248, 249, 250];

      doc.setFillColor(rowBgColor[0], rowBgColor[1], rowBgColor[2]);
      doc.rect(tableStartX, currentRowY, tableWidth, imageRowHeight, 'F');

      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        await new Promise<void>((resolve) => {
          const timeout = setTimeout(() => {
            console.warn('Image load timeout for item:', item.index);
            resolve();
          }, 8000);

          img.onload = () => {
            clearTimeout(timeout);
            try {
              const imgWidth = img.naturalWidth || img.width || 20;
              const imgHeight = img.naturalHeight || img.height || 20;
              let imageWidthFinal = 20;
              let imageHeightFinal = 20;

              if (imgWidth > 0 && imgHeight > 0) {
                const aspectRatio = imgWidth / imgHeight;
                if (aspectRatio > 1) {
                  imageWidthFinal = Math.min(20, 20 * aspectRatio);
                  imageHeightFinal = imageWidthFinal / aspectRatio;
                } else {
                  imageHeightFinal = Math.min(20, 20 / aspectRatio);
                  imageWidthFinal = imageHeightFinal * aspectRatio;
                }
              }

              const imageX = tableStartX + col1Width + cellPadding;
              const imageY = currentRowY + 1;

              doc.addImage(
                img,
                'PNG',
                imageX,
                imageY,
                imageWidthFinal,
                imageHeightFinal,
                undefined,
                'SLOW'
              );
            } catch (e) {
              console.warn('Error adding image to PDF:', e);
            }
            resolve();
          };

          img.onerror = () => {
            clearTimeout(timeout);
            resolve();
          };

          let imageSrc = item.screenshot;
          if (
            typeof imageSrc === 'string' &&
            imageSrc.length > 0 &&
            !imageSrc.startsWith('data:') &&
            !imageSrc.startsWith('http')
          ) {
            if (/^[A-Za-z0-9+/=]+$/.test(imageSrc.substring(0, 100))) {
              imageSrc = `data:image/png;base64,${imageSrc}`;
            }
          }

          img.src = imageSrc;
        });
      } catch (error) {
        console.warn('Error processing image:', error);
      }

      doc.setFont(undefined, 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(40, 40, 40);
      doc.text('Image', tableStartX + cellPadding, currentRowY + 11);

      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.3);
      doc.line(
        tableStartX + col1Width,
        currentRowY,
        tableStartX + col1Width,
        currentRowY + imageRowHeight
      );

      currentRowY += imageRowHeight;
      rowIndex++;
      continue;
    }

    // Regular attribute rows - Design 12: Highlight Rows + Design 13: Icon Badges
    const nameLines = doc.splitTextToSize(row.name, col1Width - cellPadding * 2);
    const valueLines = doc.splitTextToSize(String(row.value), col2Width - cellPadding * 2);
    const maxLines = Math.max(nameLines.length, valueLines.length);
    const actualRowHeight = Math.max(rowHeight, maxLines * 3 + 1.5);

    // Design 12: Highlight Rows - Background color based on status
    let rowBgColor: [number, number, number] = [255, 255, 255];
    let borderLeftColor: [number, number, number] | null = null;
    let borderLeftWidth = 0;

    if (row.status === 'missing' || row.status === 'failed') {
      // Failed row: light red background with red left border
      rowBgColor = [254, 242, 242]; // #fef2f2
      borderLeftColor = [239, 68, 68]; // #ef4444
      borderLeftWidth = 4;
    } else if (row.status === 'present' || row.status === 'passed') {
      // Passed row: light green background with green left border
      rowBgColor = [240, 253, 244]; // #f0fdf4
      borderLeftColor = [16, 185, 129]; // #10b981
      borderLeftWidth = 4;
    } else if (row.status === 'warning') {
      // Warning row: light yellow background with orange left border
      rowBgColor = [255, 251, 235]; // #fffbeb
      borderLeftColor = [217, 119, 6]; // #d97706
      borderLeftWidth = 4;
    }

    // Draw row background
    doc.setFillColor(rowBgColor[0], rowBgColor[1], rowBgColor[2]);
    doc.rect(tableStartX, currentRowY, tableWidth, actualRowHeight, 'F');

    // Draw left border if status-based
    if (borderLeftColor && borderLeftWidth > 0) {
      doc.setFillColor(borderLeftColor[0], borderLeftColor[1], borderLeftColor[2]);
      doc.rect(tableStartX, currentRowY, borderLeftWidth, actualRowHeight, 'F');
    }

    if (rowIndex < attributeRows.length - 1) {
      doc.setDrawColor(230, 230, 230);
      doc.setLineWidth(0.3);
      doc.line(
        tableStartX + 1,
        currentRowY + actualRowHeight,
        tableStartX + tableWidth - 1,
        currentRowY + actualRowHeight
      );
    }

    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(
      tableStartX + col1Width,
      currentRowY,
      tableStartX + col1Width,
      currentRowY + actualRowHeight
    );

    doc.setFont(undefined, 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(40, 40, 40);
    doc.text(
      nameLines,
      tableStartX + cellPadding + (borderLeftWidth > 0 ? borderLeftWidth : 0),
      currentRowY + 3
    );

    // Design 13: Icon Badges - Status with icons
    doc.setFont(undefined, 'normal');
    let valueText = String(row.value);
    let valueColor: [number, number, number] = [30, 30, 30];
    let badgeBgColor: [number, number, number] | null = null;

    if (row.status === 'missing' || row.status === 'failed') {
      // Failed badge: red background with white text
      valueText = `✗ ${valueText}`;
      valueColor = [153, 27, 27]; // #991b1b (dark red text)
      badgeBgColor = [254, 226, 226]; // #fee2e2 (light red background)
    } else if (row.status === 'present' || row.status === 'passed') {
      // Passed badge: green background with white text
      valueText = `✓ ${valueText}`;
      valueColor = [5, 95, 70]; // #065f46 (dark green text)
      badgeBgColor = [209, 250, 229]; // #d1fae5 (light green background)
    } else if (row.status === 'warning') {
      // Warning badge: orange background
      valueText = `⚠ ${valueText}`;
      valueColor = [154, 52, 18]; // #9a3412 (dark orange text)
      badgeBgColor = [254, 243, 199]; // #fef3c7 (light yellow background)
    }

    // Draw badge background if status-based
    if (badgeBgColor) {
      const badgePadding = 2;
      const badgeX = tableStartX + col1Width + cellPadding;
      const badgeY = currentRowY + 1;
      const badgeWidth = Math.min(
        doc.getTextWidth(valueText) + badgePadding * 2,
        col2Width - cellPadding * 2
      );
      const badgeHeight = actualRowHeight - 2;

      doc.setFillColor(badgeBgColor[0], badgeBgColor[1], badgeBgColor[2]);
      doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 2, 2, 'F');
    }

    doc.setTextColor(valueColor[0], valueColor[1], valueColor[2]);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(7.5);
    doc.text(
      valueLines,
      tableStartX + col1Width + cellPadding + (borderLeftWidth > 0 ? 0 : 0),
      currentRowY + 3
    );

    currentRowY += actualRowHeight;
    rowIndex++;
  }

  // Neomorphism effect
  const tableHeight = Math.max(0.1, Math.abs(currentRowY - attributesStartY));
  const validTableWidth = Math.max(0.1, Math.abs(tableWidth));
  const validTableStartX = isNaN(tableStartX) ? margin + 8 : tableStartX;
  const validAttributesStartY = isNaN(attributesStartY) ? contentY : attributesStartY;

  const isError = item.missingAttributes && item.missingAttributes.length > 0;
  const shadowColor = isError ? [220, 38, 38, 0.15] : [34, 197, 94, 0.15];
  const shadowLayers = 4;
  const shadowOffset = 0.3;
  const shadowBlur = 0.5;

  for (let i = shadowLayers; i > 0; i--) {
    const layerOffset = i * shadowOffset;
    const layerOpacity = (shadowColor[3] * (shadowLayers - i + 1)) / shadowLayers;

    doc.setDrawColor(
      Math.min(255, shadowColor[0] + (255 - shadowColor[0]) * (1 - layerOpacity)),
      Math.min(255, shadowColor[1] + (255 - shadowColor[1]) * (1 - layerOpacity)),
      Math.min(255, shadowColor[2] + (255 - shadowColor[2]) * (1 - layerOpacity))
    );
    doc.setLineWidth(shadowBlur * (shadowLayers - i + 1));
    doc.roundedRect(
      validTableStartX - layerOffset,
      validAttributesStartY - layerOffset,
      validTableWidth + layerOffset * 2,
      tableHeight + layerOffset * 2,
      4,
      4,
      'D'
    );
  }

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.roundedRect(validTableStartX, validAttributesStartY, validTableWidth, tableHeight, 4, 4, 'D');

  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.2);
  doc.roundedRect(
    validTableStartX + 0.3,
    validAttributesStartY + 0.3,
    validTableWidth - 0.6,
    tableHeight - 0.6,
    3.5,
    3.5,
    'D'
  );

  return currentRowY + 2;
}

export async function exportReportAsPDF(options: ExportOptions): Promise<jsPDF> {
  const { data, analysisOptions, showMissing, showHasAttributes, sectionsVisible } = options;
  const languageStore = useLanguageStore();
  const t = languageStore.t;

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  const bookmarks: Array<{ title: string; page: number; y: number }> = [];
  const themeColors = getThemeColors();

  // Header
  const headerHeight = 40;
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, pageWidth, headerHeight, 'F');
  doc.setFillColor(20, 20, 20);
  doc.rect(0, 0, pageWidth, headerHeight * 0.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  const title = getPdfTranslation('Title', t);
  doc.text(title, pageWidth / 2, 25, { align: 'center', maxWidth: pageWidth - margin * 2 });

  yPos = headerHeight + 10;

  // Meta information
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);

  const urlText = String(data.url || 'N/A');
  const urlLines = doc.splitTextToSize(urlText, pageWidth - margin * 2 - 20);
  doc.text(`${getPdfTranslation('URL', t)}:`, margin, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text(urlLines, margin + 25, yPos);
  yPos += urlLines.length * 4 + 4;

  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);
  const analyzedDate = data.analyzedAt
    ? new Date(data.analyzedAt).toLocaleString()
    : new Date().toLocaleString();
  doc.text(`${getPdfTranslation('Date', t)}:`, margin, yPos);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text(analyzedDate, margin + 25, yPos);
  yPos += 18;

  // Summary section (only if includeSummary option is enabled)
  if (options.exportOptions?.options.includeSummary !== false) {
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    const summaryTitle = getPdfTranslation('Summary', t);
    doc.text(summaryTitle, margin, yPos);
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 0);
    doc.line(margin, yPos + 2, margin + 40, yPos + 2);

    bookmarks.push({
      title: summaryTitle,
      page: doc.internal.getCurrentPageInfo().pageNumber,
      y: yPos,
    });
    yPos += 12;

    const summary = data.summary;
    if (summary) {
      const cardWidth = (pageWidth - margin * 2 - 15) / 4;
      const cardHeight = 25;
      let cardX = margin;
      const cardStartY = yPos;

      if (sectionsVisible.images) {
        doc.setFillColor(0, 0, 0);
        doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 8, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text(String(summary.totalImages || 0), cardX + cardWidth / 2, cardStartY + 11, {
          align: 'center',
        });
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(getPdfTranslation('TotalImages', t), cardX + cardWidth / 2, cardStartY + 20, {
          align: 'center',
        });
        cardX += cardWidth + 5;

        doc.setFillColor(220, 38, 38);
        doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 8, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text(String(summary.imagesWithoutAlt || 0), cardX + cardWidth / 2, cardStartY + 11, {
          align: 'center',
        });
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(getPdfTranslation('WithoutAlt', t), cardX + cardWidth / 2, cardStartY + 20, {
          align: 'center',
        });
        cardX += cardWidth + 5;
      }

      if (sectionsVisible.links) {
        doc.setFillColor(0, 0, 0);
        doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 8, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text(String(summary.totalLinks || 0), cardX + cardWidth / 2, cardStartY + 11, {
          align: 'center',
        });
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(getPdfTranslation('TotalLinks', t), cardX + cardWidth / 2, cardStartY + 20, {
          align: 'center',
        });
        cardX += cardWidth + 5;

        doc.setFillColor(220, 38, 38);
        doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 8, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        const linkIssues = summary.linksWithoutAccessibility || 0;
        doc.text(String(linkIssues), cardX + cardWidth / 2, cardStartY + 11, { align: 'center' });
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.text(getPdfTranslation('LinkIssues', t), cardX + cardWidth / 2, cardStartY + 20, {
          align: 'center',
        });
      }

      yPos = cardStartY + cardHeight + 20;
    }
  }

  // Process items
  const { items, sectionItems } = processItems(
    data,
    analysisOptions,
    showMissing,
    showHasAttributes,
    sectionsVisible
  );

  if (items.length > 0) {
    // Add filter info
    if (showMissing || showHasAttributes) {
      const filterInfo: string[] = [];
      if (showMissing) filterInfo.push(getPdfTranslation('MissingAttributes', t));
      if (showHasAttributes) filterInfo.push(getPdfTranslation('WithAttributes', t));
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`${getPdfTranslation('Filters', t)}: ${filterInfo.join(' + ')}`, margin, yPos);
      yPos += 6;
    }

    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = margin;
    }

    const sections = [
      {
        name: getPdfTranslation('Images', t),
        items: sectionItems.Images,
        enabled: sectionsVisible.images,
      },
      {
        name: getPdfTranslation('Links', t),
        items: sectionItems.Links,
        enabled: sectionsVisible.links,
      },
      {
        name: getPdfTranslation('Buttons', t),
        items: sectionItems.Buttons,
        enabled: sectionsVisible.buttons,
      },
      {
        name: getPdfTranslation('Inputs', t),
        items: sectionItems.Inputs,
        enabled: sectionsVisible.inputs,
      },
      {
        name: getPdfTranslation('Roles', t),
        items: sectionItems.Roles,
        enabled: sectionsVisible.roles,
      },
    ];

    for (const section of sections) {
      if (section.enabled && section.items.length > 0) {
        const failedItems = section.items.filter(
          (item) => item.missingAttributes && item.missingAttributes.length > 0
        );
        const passedItems = section.items.filter(
          (item) => !item.missingAttributes || item.missingAttributes.length === 0
        );

        const statusGroups = [
          { items: passedItems, status: 'Passed' },
          { items: failedItems, status: 'Failed' },
        ];

        for (const statusGroup of statusGroups) {
          // Filter by export options
          if (options.exportOptions) {
            if (statusGroup.status === 'Passed' && !options.exportOptions.status.passed) {
              continue;
            }
            if (statusGroup.status === 'Failed' && !options.exportOptions.status.failed) {
              continue;
            }
          }

          if (statusGroup.items.length === 0) continue;

          if (yPos > pageHeight - 80) {
            doc.addPage();
            yPos = margin;
          }

          const sectionHeaderHeight = 10;
          const headerBgColor = statusGroup.status === 'Failed' ? [0, 0, 0] : [34, 197, 94];
          doc.setFillColor(headerBgColor[0], headerBgColor[1], headerBgColor[2]);
          doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 2, 2, 'F');

          doc.setTextColor(255, 255, 255);
          doc.setFontSize(10);
          doc.setFont(undefined, 'bold');
          const statusText = getPdfTranslation(statusGroup.status, t);
          doc.text(
            `${section.name}: ${statusText} (${statusGroup.items.length})`,
            margin + 3,
            yPos + 6.5
          );

          const sectionY = yPos;
          const sectionPage = doc.internal.getCurrentPageInfo().pageNumber;
          bookmarks.push({
            title: `${section.name} - ${statusText}`,
            page: sectionPage,
            y: sectionY,
          });
          yPos += sectionHeaderHeight + 8;

          let itemsOnCurrentPage = 0;
          const maxItemsPerPage = 3;

          for (const item of statusGroup.items) {
            if (itemsOnCurrentPage >= maxItemsPerPage) {
              doc.addPage();
              yPos = margin;
              itemsOnCurrentPage = 0;

              const headerBgColorRedraw =
                statusGroup.status === 'Failed' ? [0, 0, 0] : [34, 197, 94];
              doc.setFillColor(
                headerBgColorRedraw[0],
                headerBgColorRedraw[1],
                headerBgColorRedraw[2]
              );
              doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 2, 2, 'F');
              doc.setTextColor(255, 255, 255);
              doc.setFontSize(10);
              doc.setFont(undefined, 'bold');
              const statusTextRedraw = getPdfTranslation(statusGroup.status, t);
              doc.text(
                `${section.name}: ${statusTextRedraw} (${statusGroup.items.length})`,
                margin + 3,
                yPos + 6.5
              );
              yPos += sectionHeaderHeight + 8;
            }

            const isError = item.missingAttributes && item.missingAttributes.length > 0;
            const textWidth = pageWidth - margin * 2;
            const contentStartX = margin + 8;

            // Calculate item height
            let calculatedHeight = 3;
            const screenshot = item.screenshot || null;
            const hasValidScreenshot =
              screenshot &&
              (screenshot.startsWith('data:image') ||
                screenshot.startsWith('http://') ||
                screenshot.startsWith('https://') ||
                (typeof screenshot === 'string' && screenshot.length > 0));
            const imageAreaHeight = hasValidScreenshot ? 22 : 0;

            calculatedHeight += 5.8;
            calculatedHeight += imageAreaHeight;

            if (isError && item.missingAttributes && item.missingAttributes.length > 0) {
              const missingCount = Array.isArray(item.missingAttributes)
                ? item.missingAttributes.length
                : 1;
              calculatedHeight += missingCount * 5;
            }

            const attributeRows = buildAttributeRows(item, analysisOptions, options.exportOptions);
            let attributesHeight = 0;

            for (const row of attributeRows) {
              if (row.isHeader || row.isImage) continue;
              attributesHeight += 2.5;
            }

            calculatedHeight += attributesHeight + 2;

            if (item.selector) {
              const selectorText = String(item.selector);
              const truncatedSelector =
                selectorText.length > 80 ? selectorText.substring(0, 80) + '...' : selectorText;
              const selectorLines = doc.splitTextToSize(
                `${getPdfTranslation('Selector', t)}: ${truncatedSelector}`,
                textWidth - 16
              );
              calculatedHeight += selectorLines.length * 3 + 4;
            }

            calculatedHeight += 3;
            const itemHeight = Math.max(calculatedHeight, 30);

            if (yPos + itemHeight > pageHeight - margin) {
              doc.addPage();
              yPos = margin;

              const headerBgColorRedraw =
                statusGroup.status === 'Failed' ? [0, 0, 0] : [34, 197, 94];
              doc.setFillColor(
                headerBgColorRedraw[0],
                headerBgColorRedraw[1],
                headerBgColorRedraw[2]
              );
              doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 2, 2, 'F');
              doc.setTextColor(255, 255, 255);
              doc.setFontSize(10);
              doc.setFont(undefined, 'bold');
              const statusTextRedraw = getPdfTranslation(statusGroup.status, t);
              doc.text(
                `${section.name}: ${statusTextRedraw} (${statusGroup.items.length})`,
                margin + 3,
                yPos + 6.5
              );
              yPos += sectionHeaderHeight + 3;
            }

            let contentY = yPos;
            const attributeRowsForTable = buildAttributeRows(
              item,
              analysisOptions,
              options.exportOptions
            );

            if (attributeRowsForTable.length > 0) {
              contentY = await renderItemTable(
                doc,
                item,
                attributeRowsForTable,
                pageWidth,
                margin,
                contentY,
                t,
                options.exportOptions
              );
            } else {
              contentY += 2;
            }

            yPos += itemHeight + 15;
            itemsOnCurrentPage++;
          }
        }
      }
    }
  }

  // Add bookmarks
  if (bookmarks.length > 0 && doc.outline) {
    try {
      const outline = doc.outline;
      outline.add(null, bookmarks[0].title, { page: bookmarks[0].page });
      for (let i = 1; i < bookmarks.length; i++) {
        const bookmark = bookmarks[i];
        outline.add(null, bookmark.title, { page: bookmark.page });
      }
    } catch (e) {
      console.warn('Could not add bookmarks to PDF:', e);
    }
  }

  return doc;
}

export async function exportReportAsHTML(options: ExportOptions, timestamp: string): Promise<void> {
  const { data, analysisOptions, showMissing, showHasAttributes, sectionsVisible } = options;
  const languageStore = useLanguageStore();
  const t = languageStore.t;
  const currentLang = languageStore.currentLanguage;

  const { items, sectionItems } = processItems(
    data,
    analysisOptions,
    showMissing,
    showHasAttributes,
    sectionsVisible
  );

  function escapeHtml(text: string | null | undefined): string {
    if (text === null || text === undefined) return '';
    const div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
  }

  function highlightAttributeInHTML(html: string, attributeName: string): string {
    if (!attributeName || !html) return escapeHtml(html);

    // Escape HTML first to prevent XSS
    const escapedHtml = escapeHtml(html);

    // Pattern to match the attribute in the HTML
    // Match: attributeName="value" or attributeName='value' or attributeName=value
    // Also handle case-insensitive matching
    const escapedAttrName = escapeHtml(attributeName);
    const patterns = [
      new RegExp(`(${escapedAttrName}\\s*=\\s*["'][^"']*["'])`, 'gi'),
      new RegExp(`(${escapedAttrName}\\s*=\\s*[^\\s>]+)`, 'gi'),
    ];

    let highlighted = escapedHtml;
    for (const pattern of patterns) {
      highlighted = highlighted.replace(pattern, (match) => {
        return `<span class="highlighted-attribute" title="${escapeHtml(t('attributeHighlighted'))}">${match}</span>`;
      });
    }

    return highlighted;
  }

  function formatHTML(html: string): string {
    if (!html) return '';

    // Simple HTML formatter - adds indentation and line breaks
    let formatted = '';
    let indent = 0;
    const indentSize = 2;

    // Remove existing whitespace and normalize
    const cleanHtml = html.replace(/>\s+</g, '><').trim();

    // Split by tags
    const parts = cleanHtml.split(/(<[^>]+>)/);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i].trim();
      if (!part) continue;

      if (part.startsWith('</')) {
        // Closing tag
        indent = Math.max(0, indent - indentSize);
        formatted += ' '.repeat(indent) + part + '\n';
      } else if (part.startsWith('<')) {
        // Opening or self-closing tag
        const isSelfClosing =
          part.endsWith('/>') ||
          part.match(
            /<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr|button|script|style)/i
          );
        formatted += ' '.repeat(indent) + part + '\n';
        if (!isSelfClosing && !part.startsWith('</')) {
          indent += indentSize;
        }
      } else {
        // Text content
        if (part.length > 0) {
          formatted += ' '.repeat(indent) + part + '\n';
        }
      }
    }

    return formatted.trim();
  }

  function getAttributeStatus(
    item: ProcessedItem,
    analysisOptions: AnalysisOptions,
    itemType: 'image' | 'link' | 'button' | 'input' | 'role'
  ): {
    status: string;
    passed: boolean;
    details: string;
    passedAttribute: string;
    explanation: string;
    attributeToHighlight: string;
  } {
    const elem = item.originalData;
    const missingAttrs = item.missingAttributes || [];

    // Determine if element passes validation and which attribute made it pass
    let passed = false;
    let passedAttribute = '';

    if (itemType === 'image') {
      passed = elem.hasAlt === true;
      if (passed) {
        const hasAlt = elem.alt !== null && String(elem.alt || '').trim() !== '';
        const hasAriaLabel = elem.ariaLabel !== null && String(elem.ariaLabel || '').trim() !== '';
        const hasAriaLabelledby =
          elem.ariaLabelledby !== null && String(elem.ariaLabelledby || '').trim() !== '';
        if (hasAlt) {
          passedAttribute = `Alt: "${escapeHtml(String(elem.alt))}"`;
        } else if (hasAriaLabel) {
          passedAttribute = `aria-label: "${escapeHtml(String(elem.ariaLabel))}"`;
        } else if (hasAriaLabelledby) {
          passedAttribute = `aria-labelledby: "${escapeHtml(String(elem.ariaLabelledby))}"`;
        }
      }
    } else {
      passed = item.hasAccessibility === true;
      if (passed) {
        // Find which attribute made it pass
        if (
          analysisOptions.checkAriaLabel &&
          elem.ariaLabel !== null &&
          String(elem.ariaLabel || '').trim() !== ''
        ) {
          passedAttribute = `aria-label: "${escapeHtml(String(elem.ariaLabel))}"`;
        } else if (
          analysisOptions.checkAriaLabelledby &&
          elem.ariaLabelledby !== null &&
          String(elem.ariaLabelledby || '').trim() !== ''
        ) {
          passedAttribute = `aria-labelledby: "${escapeHtml(String(elem.ariaLabelledby))}"`;
        } else if (itemType === 'input' && analysisOptions.checkLabels && elem.label) {
          passedAttribute = `<label>: "${escapeHtml(String(elem.label))}"`;
        } else if (itemType === 'link' && analysisOptions.checkTitle && elem.title) {
          passedAttribute = `title: "${escapeHtml(String(elem.title))}"`;
        } else {
          passedAttribute = 'Accessibility attributes present';
        }
      }
    }

    const statusText = passed ? '✓ PASSED' : '✗ FAILED';

    // Determine which attribute to highlight in HTML code
    let attributeToHighlight = '';
    if (passed && passedAttribute) {
      if (passedAttribute.includes('Alt:')) {
        attributeToHighlight = 'alt';
      } else if (passedAttribute.includes('aria-label:')) {
        attributeToHighlight = 'aria-label';
      } else if (passedAttribute.includes('aria-labelledby:')) {
        attributeToHighlight = 'aria-labelledby';
      } else if (passedAttribute.includes('<label>:')) {
        attributeToHighlight = 'label';
      } else if (passedAttribute.includes('title:')) {
        attributeToHighlight = 'title';
      }
    } else {
      // For failed, highlight the first missing required attribute
      if (itemType === 'image' && analysisOptions.checkAltText) {
        attributeToHighlight = 'alt';
      } else if (analysisOptions.checkAriaLabel) {
        attributeToHighlight = 'aria-label';
      } else if (analysisOptions.checkAriaLabelledby) {
        attributeToHighlight = 'aria-labelledby';
      } else if (itemType === 'input' && analysisOptions.checkLabels) {
        attributeToHighlight = 'label';
      } else if (itemType === 'link' && analysisOptions.checkTitle) {
        attributeToHighlight = 'title';
      }
    }

    // Build explanation based on item type and status
    let explanation = '';
    if (passed) {
      switch (itemType) {
        case 'image':
          explanation = t('validationPassedReasonImage');
          break;
        case 'link':
          explanation = t('validationPassedReasonLink');
          break;
        case 'button':
          explanation = t('validationPassedReasonButton');
          break;
        case 'input':
          explanation = t('validationPassedReasonInput');
          break;
        case 'role':
          explanation = t('validationPassedReasonRole');
          break;
        default:
          explanation = t('validationPassedReason');
      }
    } else {
      switch (itemType) {
        case 'image':
          explanation = t('validationFailedReasonImage');
          break;
        case 'link':
          explanation = t('validationFailedReasonLink');
          break;
        case 'button':
          explanation = t('validationFailedReasonButton');
          break;
        case 'input':
          explanation = t('validationFailedReasonInput');
          break;
        case 'role':
          explanation = t('validationFailedReasonRole');
          break;
        default:
          explanation = t('validationFailedReason');
      }
    }

    // Build details
    const details: string[] = [];

    if (passed && passedAttribute) {
      details.push(`Found: ${passedAttribute}`);
    }

    if (itemType === 'image') {
      if (analysisOptions.checkAltText) {
        const hasAlt = elem.alt !== null && String(elem.alt || '').trim() !== '';
        const hasAriaLabel = elem.ariaLabel !== null && String(elem.ariaLabel || '').trim() !== '';
        const hasAriaLabelledby =
          elem.ariaLabelledby !== null && String(elem.ariaLabelledby || '').trim() !== '';
        if (hasAlt || hasAriaLabel || hasAriaLabelledby) {
          if (!passedAttribute) {
            details.push(
              `Alt: ${hasAlt ? '✓ Present' : '✗ Missing (using aria-label/aria-labelledby)'}`
            );
          }
        } else {
          details.push('Alt: ✗ MISSING');
        }
      }
    } else {
      if (analysisOptions.checkAriaLabel) {
        const hasAriaLabel = elem.ariaLabel !== null && String(elem.ariaLabel || '').trim() !== '';
        if (!passedAttribute || !passedAttribute.includes('aria-label')) {
          details.push(`aria-label: ${hasAriaLabel ? '✓ Present' : '✗ Missing'}`);
        }
      }
      if (analysisOptions.checkAriaLabelledby) {
        const hasAriaLabelledby =
          elem.ariaLabelledby !== null && String(elem.ariaLabelledby || '').trim() !== '';
        if (!passedAttribute || !passedAttribute.includes('aria-labelledby')) {
          details.push(`aria-labelledby: ${hasAriaLabelledby ? '✓ Present' : '✗ Missing'}`);
        }
      }
    }

    if (missingAttrs.length > 0) {
      details.push(`Missing: ${missingAttrs.join(', ')}`);
    }

    return {
      status: statusText,
      passed: passed,
      details:
        details.length > 0
          ? details.join(' | ')
          : passed
            ? 'All required attributes present'
            : 'Validation failed',
      passedAttribute: passedAttribute,
      explanation: explanation,
      attributeToHighlight: attributeToHighlight,
    };
  }

  function formatItem(
    item: ProcessedItem,
    itemType: 'image' | 'link' | 'button' | 'input' | 'role'
  ): string {
    const elem = item.originalData;
    const hasAttributes =
      itemType === 'image' ? elem.hasAlt === true : item.hasAccessibility === true;
    const statusClass = hasAttributes ? 'has-attributes' : 'missing';

    // Determine item title based on type
    let itemTitle = '';
    switch (itemType) {
      case 'image':
        itemTitle = t('images');
        break;
      case 'link':
        itemTitle = `${t('links')}: "${escapeHtml(String(item.text || t('noText')))}"`;
        break;
      case 'button':
        itemTitle = `${t('buttons')}: "${escapeHtml(String(item.text || t('noText')))}"`;
        break;
      case 'input':
        itemTitle = `${elem.type || ''} ${elem.name ? `(${escapeHtml(String(elem.name))})` : ''}`;
        break;
      case 'role':
        itemTitle = `${elem.tag || ''} (role: ${escapeHtml(String(item.role || ''))})`;
        break;
    }

    // Status badge
    let statusBadge = '';
    if (itemType === 'image') {
      if (!elem.hasAlt && analysisOptions.checkAltText) {
        statusBadge = `<span class="status-badge error">${t('missing')} Alt</span>`;
      } else if (elem.hasAlt) {
        statusBadge = `<span class="status-badge success">✓ Alt</span>`;
      }
    } else {
      const missingAttrs = item.missingAttributes || [];
      if (hasAttributes) {
        statusBadge = `<span class="status-badge success">✓ OK</span>`;
      } else {
        statusBadge = `<span class="status-badge error">${missingAttrs.length} ${t('missing')}</span>`;
      }
    }

    // Build attributes using the same logic as ResultItem
    const attributeRows = buildAttributeRows(item, analysisOptions, options.exportOptions);

    let html = `<div class="result-item ${statusClass}">`;

    // Header
    html += `<div class="result-item-header">`;
    html += `<span class="item-number">#${item.index}</span>`;
    html += `<span class="item-title">${itemTitle}</span>`;
    if (statusBadge) {
      html += `<span class="status-badge-wrapper">${statusBadge}</span>`;
    }
    html += `</div>`;

    // Screenshot - Always show if available (like in the app)
    if (item.screenshot) {
      html += `<div class="screenshot-container">`;
      html += `<img src="${escapeHtml(String(item.screenshot))}" alt="Element screenshot" class="element-screenshot" />`;
      html += `</div>`;
    }

    // Attributes grid
    html += `<div class="attributes-grid">`;
    for (const row of attributeRows) {
      if (row.isHeader || row.isImage) continue; // Skip header and image rows
      // Skip HTML and Selector rows for HTML export - not needed in attributes section
      if (row.name === 'HTML' || row.name === 'Selector') continue;
      const attrValueClass =
        row.status === 'present'
          ? 'present'
          : row.status === 'missing'
            ? 'missing'
            : row.status === 'warning'
              ? 'warning'
              : '';
      const fullWidthClass = row.name === 'Source' || row.name === 'Href' ? 'full-width' : '';
      html += `<div class="attr-item ${fullWidthClass}">`;
      html += `<span class="attr-name">${escapeHtml(row.name)}:</span>`;
      html += `<span class="attr-value ${attrValueClass}">${escapeHtml(row.value)}</span>`;
      html += `</div>`;
    }
    html += `</div>`;

    // Code section
    if (options.exportOptions?.options.includeHTML && item.outerHTML) {
      const formattedHTML = formatHTML(String(item.outerHTML));
      const validation = getAttributeStatus(item, analysisOptions, itemType);
      const uniqueId = 'code-' + Math.random().toString(36).substr(2, 9);
      const isLong = formattedHTML.length > 200;

      // Highlight the attribute in the HTML code
      const highlightedHTML = validation.attributeToHighlight
        ? highlightAttributeInHTML(formattedHTML, validation.attributeToHighlight)
        : escapeHtml(formattedHTML);
      const truncated = isLong
        ? validation.attributeToHighlight
          ? highlightAttributeInHTML(
              formattedHTML.substring(0, 200) + '...',
              validation.attributeToHighlight
            )
          : escapeHtml(formattedHTML.substring(0, 200) + '...')
        : highlightedHTML;

      html += `<div class="code-section">`;
      html += `<div class="code-header">`;
      html += `<span>${t('htmlCode')}</span>`;
      html += `<div class="validation-status">`;
      html += `<span class="validation-badge ${validation.passed ? 'validation-passed' : 'validation-failed'}">${escapeHtml(validation.status)}</span>`;
      if (validation.passed && validation.passedAttribute) {
        html += `<span class="passed-attribute">${escapeHtml(validation.passedAttribute)}</span>`;
      }
      html += `<span class="attribute-status">${escapeHtml(validation.details)}</span>`;
      html += `</div>`;
      html += `</div>`;
      html += `<div class="validation-explanation ${validation.passed ? 'passed' : 'failed'}">`;
      html += `<p class="explanation-text ${validation.passed ? 'passed' : 'failed'}">${escapeHtml(validation.explanation)}</p>`;
      html += `</div>`;
      html += `<div class="code-content">`;

      if (isLong) {
        html += `<div class="code-container">`;
        html += `<code class="code-snippet" id="${uniqueId}-short">${truncated}</code>`;
        html += `<code class="code-snippet hidden" id="${uniqueId}-full">${highlightedHTML}</code>`;
        html += `<button class="code-toggle" onclick="toggleCode('${uniqueId}')" data-expanded="false">`;
        html += `<span class="toggle-text">${t('expand') || 'Expand'}</span>`;
        html += `</button>`;
        html += `</div>`;
      } else {
        html += `<code class="code-snippet">${highlightedHTML}</code>`;
      }

      html += `</div>`;
      html += `</div>`;
    }

    html += '</div>';
    return html;
  }

  let htmlContent = `<!DOCTYPE html>
<html lang="${currentLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t('exportReport')} - ${t('title')}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: #e0e5ec;
      padding: 20px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #0f172a; margin-bottom: 20px; font-size: 2rem; text-align: center; }
    
    /* Summary Section */
    .summary-section {
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 2px solid #cbd5e1;
    }
    .summary-section h2 {
      margin-bottom: 20px;
      color: #1e293b;
      font-weight: 700;
      font-size: 1.8rem;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
    }
    .summary-card {
      background: #f5f7fa;
      padding: 12px 16px;
      border-radius: 12px;
      border: none;
      box-shadow: 4px 4px 8px #b8bec4, -4px -4px 8px #ffffff;
      position: relative;
    }
    .summary-card::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #3b82f6;
      border-radius: 12px 0 0 12px;
    }
    .summary-card.danger::before { background: #ef4444; }
    .summary-card.success::before { background: #10b981; }
    .summary-card-label {
      font-size: 0.75rem;
      color: #1e293b;
      margin-bottom: 4px;
      font-weight: 600;
      opacity: 0.8;
    }
    .summary-card-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
    }
    
    /* Filters Section */
    .filters-section {
      margin-bottom: 30px;
      padding-bottom: 30px;
      border-bottom: 2px solid #cbd5e1;
    }
    .filters-section h2 {
      margin-bottom: 15px;
      color: #1e293b;
      font-weight: 700;
      font-size: 1.8rem;
    }
    .filter-group {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
    }
    .filter-group label {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #64748b;
    }
    
    /* Result Sections */
    .result-section {
      background: #f5f7fa;
      padding: 25px;
      border-radius: 20px;
      box-shadow: 6px 6px 12px #b8bec4, -6px -6px 12px #ffffff;
      margin-bottom: 24px;
    }
    .result-section h2 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      color: #1e293b;
      font-size: 1.5rem;
      font-weight: 700;
    }
    .section-header .icon { font-size: 1.8rem; }
    .section-header .count {
      margin-left: auto;
      background: #3b82f6;
      color: #ffffff;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
    }
    .results-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    /* Result Items */
    .result-item {
      background: #f5f7fa;
      padding: 16px;
      border-radius: 16px;
      border: none;
      box-shadow: 4px 4px 8px #b8bec4, -4px -4px 8px #ffffff;
      margin-bottom: 12px;
      position: relative;
    }
    .result-item.missing::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #ef4444;
      border-radius: 16px 0 0 16px;
    }
    .result-item.has-attributes::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #10b981;
      border-radius: 16px 0 0 16px;
    }
    .result-item-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }
    .item-number {
      background: #e0e5ec;
      color: #64748b;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .item-title {
      flex: 1;
      font-weight: 600;
      color: #1e293b;
      font-size: 1rem;
    }
    .status-badge {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .status-badge.success {
      background: #d1fae5;
      color: #065f46;
    }
    .status-badge.error {
      background: #fee2e2;
      color: #991b1b;
    }
    .screenshot-container {
      margin-bottom: 12px;
      border-radius: 6px;
      overflow: hidden;
    }
    .element-screenshot {
      max-width: 100%;
      max-height: 400px;
      height: auto;
      display: block;
      border: 2px solid #cbd5e1;
      border-radius: 8px;
      margin-top: 8px;
      box-shadow: 4px 4px 8px #b8bec4, -4px -4px 8px #ffffff;
    }
    .attributes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      margin-bottom: 12px;
      padding: 12px;
      background: #e0e5ec;
      border-radius: 12px;
      box-shadow: inset 2px 2px 4px #b8bec4, inset -2px -2px 4px #ffffff;
    }
    .attr-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .attr-item.full-width {
      grid-column: 1 / -1;
    }
    .attr-name {
      font-size: 0.8rem;
      color: #64748b;
      font-weight: 500;
    }
    .attr-value {
      font-size: 0.9rem;
      color: #1e293b;
      word-break: break-word;
    }
    .attr-value.present {
      color: #10b981;
      font-weight: 500;
    }
    .attr-value.missing {
      color: #ef4444;
      font-weight: 600;
    }
    .attr-value.warning {
      color: #f59e0b;
      font-weight: 600;
    }
    .code-section {
      margin-top: 12px;
      border-top: 1px solid #cbd5e1;
      padding-top: 12px;
    }
    .code-header {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 600;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .validation-status {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .validation-badge {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .validation-badge.validation-passed {
      background: #d1fae5;
      color: #065f46;
    }
    .validation-badge.validation-failed {
      background: #fee2e2;
      color: #991b1b;
    }
    .passed-attribute {
      font-size: 0.8rem;
      color: #065f46;
      font-weight: 600;
      background: #d1fae5;
      padding: 4px 8px;
      border-radius: 6px;
    }
    .attribute-status {
      font-size: 0.75rem;
      color: #64748b;
      font-weight: 400;
      font-style: italic;
    }
    .code-content {
      margin-top: 4px;
    }
    .code-container {
      position: relative;
    }
    .code-snippet {
      display: block;
      background: #1e293b !important;
      color: #f1f5f9 !important;
      padding: 12px;
      border-radius: 6px;
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      margin-top: 8px;
      white-space: pre;
      word-break: normal;
      text-align: left;
      line-height: 1.5;
    }
    .code-snippet.hidden {
      display: none;
    }
    .code-toggle {
      margin-top: 8px;
      padding: 6px 12px;
      background: #3b82f6;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    .code-toggle:hover {
      background: #2563eb;
    }
    .highlighted-attribute {
      background: #fef3c7;
      color: #92400e;
      padding: 2px 4px;
      border-radius: 3px;
      font-weight: 700;
      box-shadow: 0 0 0 2px #fbbf24;
    }
    .validation-explanation {
      margin-top: 8px;
      margin-bottom: 8px;
      padding: 10px;
      border-radius: 4px;
    }
    .validation-explanation.passed {
      background: #d1fae5;
      border-left: 3px solid #10b981;
    }
    .validation-explanation.failed {
      background: #fee2e2;
      border-left: 3px solid #ef4444;
    }
    .explanation-text {
      font-size: 0.85rem;
      margin: 0;
      line-height: 1.5;
    }
    .explanation-text.passed {
      color: #065f46;
    }
    .explanation-text.failed {
      color: #991b1b;
    }
    .no-results {
      text-align: center;
      color: #64748b;
      padding: 20px;
      font-style: italic;
    }
    .result-item.filter-hidden {
      display: none;
    }
    @media print {
      body { background: white; padding: 0; }
      .result-section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${t('exportReport')} - ${t('title')}</h1>
    
    <div style="background: #e2e8f0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
      <p style="margin: 5px 0;"><strong>${t('url')}:</strong> ${escapeHtml(String(data.url || 'N/A'))}</p>
      <p style="margin: 5px 0;"><strong>${t('date')}:</strong> ${data.analyzedAt ? new Date(data.analyzedAt).toLocaleString() : new Date().toLocaleString()}</p>
    </div>`;

  if (options.exportOptions?.options.includeSummary !== false && data.summary) {
    htmlContent += `
    <div class="summary-section">
      <h2>${t('summary')}</h2>
      <div class="summary-grid">`;

    if (sectionsVisible.images) {
      htmlContent += `
        <div class="summary-card">
          <div class="summary-card-label">${t('totalImages')}</div>
          <div class="summary-card-value">${data.summary.totalImages || 0}</div>
        </div>
        <div class="summary-card ${(data.summary.imagesWithoutAlt || 0) > 0 ? 'danger' : 'success'}">
          <div class="summary-card-label">${t('imagesWithoutAlt')}</div>
          <div class="summary-card-value">${data.summary.imagesWithoutAlt || 0}</div>
        </div>`;
      if (data.summary.imagesWithoutFocusState !== undefined) {
        htmlContent += `
        <div class="summary-card ${(data.summary.imagesWithoutFocusState || 0) > 0 ? 'danger' : 'success'}">
          <div class="summary-card-label">${t('imagesWithoutFocusState')}</div>
          <div class="summary-card-value">${data.summary.imagesWithoutFocusState || 0}</div>
        </div>`;
      }
    }

    if (sectionsVisible.links) {
      htmlContent += `
        <div class="summary-card">
          <div class="summary-card-label">${t('totalLinks')}</div>
          <div class="summary-card-value">${data.summary.totalLinks || 0}</div>
        </div>
        <div class="summary-card ${(data.summary.linksWithoutAccessibility || 0) > 0 ? 'danger' : 'success'}">
          <div class="summary-card-label">${t('linksWithoutAccessibility')}</div>
          <div class="summary-card-value">${data.summary.linksWithoutAccessibility || 0}</div>
        </div>`;
      if (data.summary.linksWithoutFocusState !== undefined) {
        htmlContent += `
        <div class="summary-card ${(data.summary.linksWithoutFocusState || 0) > 0 ? 'danger' : 'success'}">
          <div class="summary-card-label">${t('linksWithoutFocusState')}</div>
          <div class="summary-card-value">${data.summary.linksWithoutFocusState || 0}</div>
        </div>`;
      }
    }

    if (sectionsVisible.buttons) {
      htmlContent += `
        <div class="summary-card">
          <div class="summary-card-label">${t('totalButtons')}</div>
          <div class="summary-card-value">${data.summary.totalButtons || 0}</div>
        </div>
        <div class="summary-card ${(data.summary.buttonsWithoutAccessibility || 0) > 0 ? 'danger' : 'success'}">
          <div class="summary-card-label">${t('buttonsWithoutAccessibility')}</div>
          <div class="summary-card-value">${data.summary.buttonsWithoutAccessibility || 0}</div>
        </div>`;
      if (data.summary.buttonsWithoutFocusState !== undefined) {
        htmlContent += `
        <div class="summary-card ${(data.summary.buttonsWithoutFocusState || 0) > 0 ? 'danger' : 'success'}">
          <div class="summary-card-label">${t('buttonsWithoutFocusState')}</div>
          <div class="summary-card-value">${data.summary.buttonsWithoutFocusState || 0}</div>
        </div>`;
      }
    }

    if (sectionsVisible.inputs) {
      htmlContent += `
        <div class="summary-card">
          <div class="summary-card-label">${t('totalInputs')}</div>
          <div class="summary-card-value">${data.summary.totalInputs || 0}</div>
        </div>
        <div class="summary-card ${(data.summary.inputsWithoutAccessibility || 0) > 0 ? 'danger' : 'success'}">
          <div class="summary-card-label">${t('inputsWithoutAccessibility')}</div>
          <div class="summary-card-value">${data.summary.inputsWithoutAccessibility || 0}</div>
        </div>`;
    }

    if (sectionsVisible.roles) {
      htmlContent += `
        <div class="summary-card">
          <div class="summary-card-label">${t('totalRoles')}</div>
          <div class="summary-card-value">${data.summary.totalRoles || 0}</div>
        </div>
        <div class="summary-card ${(data.summary.rolesWithoutAccessibility || 0) > 0 ? 'danger' : 'success'}">
          <div class="summary-card-label">${t('rolesWithoutAccessibility')}</div>
          <div class="summary-card-value">${data.summary.rolesWithoutAccessibility || 0}</div>
        </div>`;
    }

    htmlContent += `</div></div>`;
  }

  htmlContent += `
    <div class="filters-section">
      <h2>${t('filters')}</h2>
      <div class="filter-group">
        <label>
          <input type="checkbox" id="filter-show-missing" ${showMissing ? 'checked' : ''} onchange="applyFilters()">
          ${t('showMissing')}
        </label>
        <label>
          <input type="checkbox" id="filter-show-has-attributes" ${showHasAttributes ? 'checked' : ''} onchange="applyFilters()">
          ${t('showHasAttributes')}
        </label>
      </div>
    </div>
    <script>
      function applyFilters() {
        const showMissing = document.getElementById('filter-show-missing').checked;
        const showHasAttributes = document.getElementById('filter-show-has-attributes').checked;
        const items = document.querySelectorAll('.result-item');
        
        items.forEach(item => {
          const isMissing = item.classList.contains('missing');
          const hasAttributes = item.classList.contains('has-attributes');
          
          let shouldShow = false;
          if (showMissing && showHasAttributes) {
            shouldShow = true; // Show all
          } else if (showMissing && isMissing) {
            shouldShow = true; // Show only missing
          } else if (showHasAttributes && hasAttributes) {
            shouldShow = true; // Show only has attributes
          } else if (!showMissing && !showHasAttributes) {
            shouldShow = false; // Hide all
          }
          
          if (shouldShow) {
            item.classList.remove('filter-hidden');
          } else {
            item.classList.add('filter-hidden');
          }
        });
      }
      
      // Apply filters on page load
      document.addEventListener('DOMContentLoaded', function() {
        applyFilters();
      });
    </script>`;

  const sections = [
    {
      name: t('images'),
      icon: '🖼️',
      items: sectionItems.Images,
      enabled: sectionsVisible.images,
      type: 'image' as const,
    },
    {
      name: t('links'),
      icon: '🔗',
      items: sectionItems.Links,
      enabled: sectionsVisible.links,
      type: 'link' as const,
    },
    {
      name: t('buttons'),
      icon: '🔘',
      items: sectionItems.Buttons,
      enabled: sectionsVisible.buttons,
      type: 'button' as const,
    },
    {
      name: t('inputs'),
      icon: '📝',
      items: sectionItems.Inputs,
      enabled: sectionsVisible.inputs,
      type: 'input' as const,
    },
    {
      name: t('elementsWithRole'),
      icon: '🎭',
      items: sectionItems.Roles,
      enabled: sectionsVisible.roles,
      type: 'role' as const,
    },
  ];

  for (const section of sections) {
    if (section.enabled && section.items.length > 0) {
      const filteredItems = section.items.filter((item) => {
        if (options.exportOptions) {
          const hasMissing = item.missingAttributes && item.missingAttributes.length > 0;
          if (hasMissing && !options.exportOptions.status.failed) return false;
          if (!hasMissing && !options.exportOptions.status.passed) return false;
        }
        return true;
      });

      if (filteredItems.length > 0) {
        htmlContent += `
    <div class="result-section">
      <h2 class="section-header">
        <span class="icon">${section.icon}</span>
        ${section.name}
        <span class="count">${filteredItems.length}</span>
      </h2>
      <div class="results-list">`;

        for (const item of filteredItems) {
          htmlContent += formatItem(item, section.type);
        }

        htmlContent += `</div></div>`;
      }
    } else if (section.enabled) {
      const noResultsKey =
        section.type === 'image'
          ? 'noImages'
          : section.type === 'link'
            ? 'noLinks'
            : section.type === 'button'
              ? 'noButtons'
              : section.type === 'input'
                ? 'noInputs'
                : 'noRoles';
      htmlContent += `
    <div class="result-section">
      <h2 class="section-header">
        <span class="icon">${section.icon}</span>
        ${section.name}
        <span class="count">0</span>
      </h2>
      <div class="results-list">
        <p class="no-results">${t(noResultsKey)}</p>
      </div>
    </div>`;
    }
  }

  htmlContent += `
  </div>
  <script>
    function toggleCode(id) {
      const shortEl = document.getElementById(id + '-short');
      const fullEl = document.getElementById(id + '-full');
      const button = shortEl ? shortEl.nextElementSibling : null;
      
      if (!shortEl || !fullEl) return;
      
      const isExpanded = button && button.getAttribute('data-expanded') === 'true';
      
      if (isExpanded) {
        shortEl.classList.remove('hidden');
        fullEl.classList.add('hidden');
        if (button) {
          button.setAttribute('data-expanded', 'false');
          const toggleText = button.querySelector('.toggle-text');
          if (toggleText) toggleText.textContent = '${t('expand') || 'Expand'}';
        }
      } else {
        shortEl.classList.add('hidden');
        fullEl.classList.remove('hidden');
        if (button) {
          button.setAttribute('data-expanded', 'true');
          const toggleText = button.querySelector('.toggle-text');
          if (toggleText) toggleText.textContent = '${t('collapse') || 'Collapse'}';
        }
      }
    }
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `accessibility-report-${timestamp}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
