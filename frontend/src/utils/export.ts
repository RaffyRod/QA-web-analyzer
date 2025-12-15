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

  // Text content
  if (item.text) {
    const cleanText = sanitizeText(item.text);
    if (cleanText) {
      const maxLength = 200;
      const truncatedText =
        cleanText.length > maxLength ? cleanText.substring(0, maxLength) + '...' : cleanText;
      attributeRows.push({
        name: 'Text',
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

  // Add HTML/outerHTML (only if includeHTML option is enabled)
  // Note: This check will be done in the calling function based on exportOptions

  // Add HTML/outerHTML (only if includeHTML option is enabled)
  if (exportOptions?.options.includeHTML && (item.outerHTML || elem.outerHTML)) {
    const htmlText = String(item.outerHTML || elem.outerHTML || '');
    const truncatedHtml = htmlText.length > 300 ? htmlText.substring(0, 300) + '...' : htmlText;
    attributeRows.push({
      name: 'HTML',
      value: sanitizeText(truncatedHtml),
      status: 'normal',
    });
  }

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
