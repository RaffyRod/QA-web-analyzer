/**
 * @author RaffyRod (https://github.com/RaffyRod)
 * Export module for generating PDF reports
 */

/**
 * Gets selected attribute checkboxes from DOM
 */
function getSelectedAttributes() {
  return {
    checkAltText: document.getElementById('checkAltText')?.checked || false,
    checkAriaLabel: document.getElementById('checkAriaLabel')?.checked || false,
    checkAriaLabelledby: document.getElementById('checkAriaLabelledby')?.checked || false,
    checkAriaDescribedby: document.getElementById('checkAriaDescribedby')?.checked || false,
    checkAriaHidden: document.getElementById('checkAriaHidden')?.checked || false,
    checkAriaExpanded: document.getElementById('checkAriaExpanded')?.checked || false,
    checkAriaControls: document.getElementById('checkAriaControls')?.checked || false,
    checkAriaCurrent: document.getElementById('checkAriaCurrent')?.checked || false,
    checkAriaRequired: document.getElementById('checkAriaRequired')?.checked || false,
    checkAriaInvalid: document.getElementById('checkAriaInvalid')?.checked || false,
    checkTabIndex: document.getElementById('checkTabIndex')?.checked || false,
    checkLang: document.getElementById('checkLang')?.checked || false,
    checkLabels: document.getElementById('checkLabels')?.checked || false,
    checkTitle: document.getElementById('checkTitle')?.checked || false,
    checkFocusStates: document.getElementById('checkFocusStates')?.checked || false,
  };
}

/**
 * Gets current theme colors from CSS variables
 */
function getThemeColors() {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  // Helper to convert hex/rgb to RGB array
  function parseColor(colorValue) {
    if (!colorValue) return [0, 0, 0];

    // If it's already RGB format
    if (colorValue.startsWith('rgb')) {
      const matches = colorValue.match(/\d+/g);
      if (matches && matches.length >= 3) {
        return [parseInt(matches[0]), parseInt(matches[1]), parseInt(matches[2])];
      }
    }

    // If it's hex format
    if (colorValue.startsWith('#')) {
      const hex = colorValue.substring(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [r, g, b];
    }

    return [0, 0, 0];
  }

  // Get colors from CSS variables
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
  const textPrimary = parseColor(
    computedStyle.getPropertyValue('--text-primary').trim() || '#1e293b'
  );
  const textSecondary = parseColor(
    computedStyle.getPropertyValue('--text-secondary').trim() || '#64748b'
  );
  const bgColor = parseColor(computedStyle.getPropertyValue('--bg-color').trim() || '#f8fafc');
  const cardBg = parseColor(computedStyle.getPropertyValue('--card-bg').trim() || '#ffffff');
  const borderColor = parseColor(
    computedStyle.getPropertyValue('--border-color').trim() || '#e2e8f0'
  );

  return {
    primary: primaryColor,
    success: successColor,
    danger: dangerColor,
    warning: warningColor,
    textPrimary: textPrimary,
    textSecondary: textSecondary,
    bg: bgColor,
    cardBg: cardBg,
    border: borderColor,
  };
}

/**
 * Sanitizes text for PDF (removes control characters)
 */
function sanitizeText(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '')
    .trim();
}

/**
 * Gets translation for PDF based on current language
 */
function getPdfTranslation(key) {
  const currentLang = localStorage.getItem('language') || 'en';
  if (typeof t === 'function') {
    return t(`pdf${key.charAt(0).toUpperCase() + key.slice(1)}`) || key;
  }
  // Fallback translations
  const translations = {
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
      AllAttributesPresent: 'All attributes present',
      Text: 'Text',
      Alt: 'Alt',
      URL: 'URL',
      Type: 'Type',
      Role: 'Role',
      Selector: 'Selector',
      NoImage: 'No Image',
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
      AllAttributesPresent: 'Todos los atributos presentes',
      Text: 'Texto',
      Alt: 'Alt',
      URL: 'URL',
      Type: 'Tipo',
      Role: 'Rol',
      Selector: 'Selector',
      NoImage: 'Sin Imagen',
      Images: 'Imágenes',
      Links: 'Enlaces',
      Buttons: 'Botones',
      Inputs: 'Inputs',
      Roles: 'Roles',
      Date: 'Fecha',
    },
  };
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

/**
 * Exports report as interactive PDF with Vibrant Colorful Design
 * Enhanced with larger images and detailed information
 */
window.exportReportAsPDF = async function () {
  if (!window.currentData) {
    throw new Error('No report data available');
  }

  if (typeof window.jspdf === 'undefined' && typeof window.jsPDF === 'undefined') {
    throw new Error('jsPDF library not loaded');
  }

  const jsPDF = window.jspdf?.jsPDF || window.jsPDF;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  const bookmarks = [];
  const data = window.currentData;

  // Get theme colors
  const themeColors = getThemeColors();

  // Header gradient - Black/Red/Green theme
  const headerHeight = 40;
  // Use black background for header
  doc.setFillColor(0, 0, 0); // Black
  doc.rect(0, 0, pageWidth, headerHeight, 'F');

  // Add subtle gradient effect with dark gray
  doc.setFillColor(20, 20, 20); // Very dark gray
  doc.rect(0, 0, pageWidth, headerHeight * 0.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  const title = getPdfTranslation('Title');
  doc.text(title, pageWidth / 2, 25, { align: 'center', maxWidth: pageWidth - margin * 2 });

  yPos = headerHeight + 10;

  // Meta information with better spacing and visual hierarchy - Black/Red/Green theme
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0); // Black text

  // URL with icon-like styling
  const urlText = String(data.url || 'N/A');
  const urlLines = doc.splitTextToSize(urlText, pageWidth - margin * 2 - 20);
  doc.text(`${getPdfTranslation('URL')}:`, margin, yPos);
  doc.setTextColor(0, 0, 0); // Black
  doc.setFont(undefined, 'bold');
  doc.text(urlLines, margin + 25, yPos);
  yPos += urlLines.length * 4 + 4;

  // Date with better formatting
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0); // Black
  const analyzedDate = data.analyzedAt
    ? new Date(data.analyzedAt).toLocaleString()
    : new Date().toLocaleString();
  doc.text(`${getPdfTranslation('Date')}:`, margin, yPos);
  doc.setTextColor(0, 0, 0); // Black
  doc.setFont(undefined, 'bold');
  doc.text(analyzedDate, margin + 25, yPos);
  yPos += 18;

  // Summary section with better visual hierarchy
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(0, 0, 0); // Black
  const summaryTitle = getPdfTranslation('Summary');

  // Add subtle underline for section title - Black line
  doc.text(summaryTitle, margin, yPos);
  doc.setLineWidth(1);
  doc.setDrawColor(0, 0, 0); // Black
  doc.line(margin, yPos + 2, margin + 40, yPos + 2);

  bookmarks.push({
    title: summaryTitle,
    page: doc.internal.getCurrentPageInfo().pageNumber,
    y: yPos,
  });
  yPos += 12;

  const summary = data.summary;
  // Respect the "Show Sections" checkboxes - only include sections that are checked
  const showImages = document.getElementById('showImages')?.checked ?? true;
  const showLinks = document.getElementById('showLinks')?.checked ?? true;
  const showButtons = document.getElementById('showButtons')?.checked ?? true;
  const showInputs = document.getElementById('showInputs')?.checked ?? true;
  const showRoles = document.getElementById('showRoles')?.checked ?? true;

  const filterMissing = document.getElementById('filterMissing')?.checked || false;
  const filterHasAttributes = document.getElementById('filterHasAttributes')?.checked || false;

  // Create vibrant stat cards - Compact size
  const statCards = [];
  const cardWidth = (pageWidth - margin * 2 - 15) / 4;
  const cardHeight = 25; // Reduced from 35 to 25
  let cardX = margin;
  const cardStartY = yPos;

  // Summary cards - Black/Red/Green theme
  if (showImages) {
    // Black card for totals
    doc.setFillColor(0, 0, 0); // Black
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 8, 8, 'F');
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(16); // Reduced from 20 to 16
    doc.setFont(undefined, 'bold');
    doc.text(String(summary.totalImages || 0), cardX + cardWidth / 2, cardStartY + 11, {
      align: 'center',
    });
    doc.setFontSize(8); // Reduced from 9 to 8
    doc.setFont(undefined, 'normal');
    doc.text(getPdfTranslation('TotalImages'), cardX + cardWidth / 2, cardStartY + 20, {
      align: 'center',
    });
    cardX += cardWidth + 5;

    // Red card for issues
    doc.setFillColor(220, 38, 38); // Red (#dc2626)
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 8, 8, 'F');
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(16); // Reduced from 20 to 16
    doc.setFont(undefined, 'bold');
    doc.text(String(summary.imagesWithoutAlt || 0), cardX + cardWidth / 2, cardStartY + 11, {
      align: 'center',
    });
    doc.setFontSize(8); // Reduced from 9 to 8
    doc.setFont(undefined, 'normal');
    doc.text(getPdfTranslation('WithoutAlt'), cardX + cardWidth / 2, cardStartY + 20, {
      align: 'center',
    });
    cardX += cardWidth + 5;
  }

  if (showLinks) {
    // Black card for totals
    doc.setFillColor(0, 0, 0); // Black
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 8, 8, 'F');
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(16); // Reduced from 20 to 16
    doc.setFont(undefined, 'bold');
    doc.text(String(summary.totalLinks || 0), cardX + cardWidth / 2, cardStartY + 11, {
      align: 'center',
    });
    doc.setFontSize(8); // Reduced from 9 to 8
    doc.setFont(undefined, 'normal');
    doc.text(getPdfTranslation('TotalLinks'), cardX + cardWidth / 2, cardStartY + 20, {
      align: 'center',
    });
    cardX += cardWidth + 5;

    // Red card for issues
    doc.setFillColor(220, 38, 38); // Red (#dc2626)
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 8, 8, 'F');
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(16); // Reduced from 20 to 16
    doc.setFont(undefined, 'bold');
    const linkIssues = summary.linksWithoutAccessibility || 0;
    doc.text(String(linkIssues), cardX + cardWidth / 2, cardStartY + 11, { align: 'center' });
    doc.setFontSize(8); // Reduced from 9 to 8
    doc.setFont(undefined, 'normal');
    doc.text(getPdfTranslation('LinkIssues'), cardX + cardWidth / 2, cardStartY + 20, {
      align: 'center',
    });
  }

  yPos = cardStartY + cardHeight + 20;

  // Prepare items with detailed information
  const items = [];
  const sectionItems = { Images: [], Links: [], Buttons: [], Inputs: [], Roles: [] };
  // Track processed items to avoid duplicates - use Map to store unique identifiers
  const processedItems = new Map();

  if (showImages) {
    data.images.forEach((img) => {
      const hasMissing = img.missingAttributes && img.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && img.hasAccessibility;

      // Logic matches app.js applyFilters function
      // If no filters are selected, show all items
      let shouldInclude = false;
      if (!filterMissing && !filterHasAttributes) {
        // Neither checked: show all (default behavior)
        shouldInclude = true;
      } else if (filterMissing && filterHasAttributes) {
        // Both checked: show all
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        // Only missing checked: show only items with missing attributes
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        // Only hasAttributes checked: show only items with attributes
        shouldInclude = hasAttributes;
      }

      if (shouldInclude) {
        // Use src + alt as unique identifier to avoid duplicates (desktop/mobile variants)
        const uniqueKey = `Image-${img.src || ''}-${img.alt || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          // First occurrence - create new item
          const item = {
            type: 'Image',
            screenshot: img.screenshot || null,
            missingAttributes: img.missingAttributes || [],
            index: img.index,
            hasAccessibility: img.hasAccessibility,
            alt: img.alt,
            src: img.src,
            selector: img.selector,
            outerHTML: img.outerHTML,
            originalData: img, // Store full original data
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Images.push(item);
        } else {
          // Duplicate found - merge missing attributes if this one has more issues
          if (
            hasMissing &&
            (!existingItem.missingAttributes ||
              existingItem.missingAttributes.length < img.missingAttributes.length)
          ) {
            existingItem.missingAttributes = img.missingAttributes || [];
            existingItem.hasAccessibility = img.hasAccessibility;
            existingItem.originalData = img; // Update with latest data
          }
        }
      }
    });
  }

  if (showLinks) {
    data.links.forEach((link) => {
      const hasMissing = link.missingAttributes && link.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && link.hasAccessibility;

      // Logic matches app.js applyFilters function
      // If no filters are selected, show all items
      let shouldInclude = false;
      if (!filterMissing && !filterHasAttributes) {
        // Neither checked: show all (default behavior)
        shouldInclude = true;
      } else if (filterMissing && filterHasAttributes) {
        // Both checked: show all
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        // Only missing checked: show only items with missing attributes
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        // Only hasAttributes checked: show only items with attributes
        shouldInclude = hasAttributes;
      }

      if (shouldInclude) {
        // Use href + text as unique identifier to avoid duplicates
        const uniqueKey = `Link-${link.href || ''}-${link.text || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          // First occurrence - create new item
          const item = {
            type: 'Link',
            screenshot: link.screenshot || null,
            missingAttributes: link.missingAttributes || [],
            index: link.index,
            text: link.text,
            href: link.href,
            hasAccessibility: link.hasAccessibility,
            selector: link.selector,
            outerHTML: link.outerHTML,
            originalData: link, // Store full original data
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Links.push(item);
        } else {
          // Duplicate found - merge missing attributes if this one has more issues
          if (
            hasMissing &&
            (!existingItem.missingAttributes ||
              existingItem.missingAttributes.length < link.missingAttributes.length)
          ) {
            existingItem.missingAttributes = link.missingAttributes || [];
            existingItem.hasAccessibility = link.hasAccessibility;
            existingItem.originalData = link; // Update with latest data
          }
        }
      }
    });
  }

  if (showButtons) {
    data.buttons.forEach((btn) => {
      const hasMissing = btn.missingAttributes && btn.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && btn.hasAccessibility;

      // Logic matches app.js applyFilters function
      // If no filters are selected, show all items
      let shouldInclude = false;
      if (!filterMissing && !filterHasAttributes) {
        // Neither checked: show all (default behavior)
        shouldInclude = true;
      } else if (filterMissing && filterHasAttributes) {
        // Both checked: show all
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        // Only missing checked: show only items with missing attributes
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        // Only hasAttributes checked: show only items with attributes
        shouldInclude = hasAttributes;
      }

      if (shouldInclude) {
        // Use text + aria-label as unique identifier to avoid duplicates
        const uniqueKey = `Button-${btn.text || ''}-${btn.ariaLabel || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          // First occurrence - create new item
          const item = {
            type: 'Button',
            screenshot: btn.screenshot || null,
            missingAttributes: btn.missingAttributes || [],
            index: btn.index,
            text: btn.text,
            hasAccessibility: btn.hasAccessibility,
            selector: btn.selector,
            outerHTML: btn.outerHTML,
            originalData: btn, // Store full original data
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Buttons.push(item);
        } else {
          // Duplicate found - merge missing attributes if this one has more issues
          if (
            hasMissing &&
            (!existingItem.missingAttributes ||
              existingItem.missingAttributes.length < btn.missingAttributes.length)
          ) {
            existingItem.missingAttributes = btn.missingAttributes || [];
            existingItem.hasAccessibility = btn.hasAccessibility;
            existingItem.originalData = btn; // Update with latest data
          }
        }
      }
    });
  }

  if (showInputs) {
    data.inputs.forEach((input) => {
      const hasMissing = input.missingAttributes && input.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && input.hasAccessibility;

      // Logic matches app.js applyFilters function
      // If no filters are selected, show all items
      let shouldInclude = false;
      if (!filterMissing && !filterHasAttributes) {
        // Neither checked: show all (default behavior)
        shouldInclude = true;
      } else if (filterMissing && filterHasAttributes) {
        // Both checked: show all
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        // Only missing checked: show only items with missing attributes
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        // Only hasAttributes checked: show only items with attributes
        shouldInclude = hasAttributes;
      }

      if (shouldInclude) {
        // Use type + name + label as unique identifier to avoid duplicates
        const uniqueKey = `Input-${input.type || ''}-${input.name || ''}-${input.label || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          // First occurrence - create new item
          const item = {
            type: 'Input',
            screenshot: input.screenshot || null,
            missingAttributes: input.missingAttributes || [],
            index: input.index,
            typeName: input.type,
            hasAccessibility: input.hasAccessibility,
            selector: input.selector,
            outerHTML: input.outerHTML,
            originalData: input, // Store full original data
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Inputs.push(item);
        } else {
          // Duplicate found - merge missing attributes if this one has more issues
          if (
            hasMissing &&
            (!existingItem.missingAttributes ||
              existingItem.missingAttributes.length < input.missingAttributes.length)
          ) {
            existingItem.missingAttributes = input.missingAttributes || [];
            existingItem.hasAccessibility = input.hasAccessibility;
            existingItem.originalData = input; // Update with latest data
          }
        }
      }
    });
  }

  if (showRoles) {
    data.roles.forEach((role) => {
      const hasMissing = role.missingAttributes && role.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && role.hasAccessibility;

      // Logic matches app.js applyFilters function
      // If no filters are selected, show all items
      let shouldInclude = false;
      if (!filterMissing && !filterHasAttributes) {
        // Neither checked: show all (default behavior)
        shouldInclude = true;
      } else if (filterMissing && filterHasAttributes) {
        // Both checked: show all
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        // Only missing checked: show only items with missing attributes
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        // Only hasAttributes checked: show only items with attributes
        shouldInclude = hasAttributes;
      }

      if (shouldInclude) {
        // Use role + tag as unique identifier to avoid duplicates
        const uniqueKey = `Role-${role.role || ''}-${role.tag || ''}`;
        const existingItem = processedItems.get(uniqueKey);

        if (!existingItem) {
          // First occurrence - create new item
          const item = {
            type: 'Role',
            screenshot: role.screenshot || null,
            missingAttributes: role.missingAttributes || [],
            index: role.index,
            role: role.role,
            hasAccessibility: role.hasAccessibility,
            selector: role.selector,
            outerHTML: role.outerHTML,
            originalData: role, // Store full original data
          };
          processedItems.set(uniqueKey, item);
          items.push(item);
          sectionItems.Roles.push(item);
        } else {
          // Duplicate found - merge missing attributes if this one has more issues
          if (
            hasMissing &&
            (!existingItem.missingAttributes ||
              existingItem.missingAttributes.length < role.missingAttributes.length)
          ) {
            existingItem.missingAttributes = role.missingAttributes || [];
            existingItem.hasAccessibility = role.hasAccessibility;
            existingItem.originalData = role; // Update with latest data
          }
        }
      }
    });
  }

  if (items.length > 0) {
    // Determine section title based on active filters
    let sectionTitle = getPdfTranslation('AllElements');
    if (filterMissing && !filterHasAttributes) {
      sectionTitle = getPdfTranslation('IssuesFound');
    } else if (!filterMissing && filterHasAttributes) {
      sectionTitle = getPdfTranslation('ElementsWithAccessibility');
    } else if (filterMissing && filterHasAttributes) {
      sectionTitle = getPdfTranslation('AllElements');
    }

    // Add filter info to header
    if (filterMissing || filterHasAttributes) {
      const filterInfo = [];
      if (filterMissing) filterInfo.push(getPdfTranslation('MissingAttributes'));
      if (filterHasAttributes) filterInfo.push(getPdfTranslation('WithAttributes'));
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0); // Black
      doc.text(`${getPdfTranslation('Filters')}: ${filterInfo.join(' + ')}`, margin, yPos);
      yPos += 6;
    }

    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = margin;
    }

    // Use theme colors for sections
    const sections = [
      {
        name: getPdfTranslation('Images'),
        items: sectionItems.Images,
        color: themeColors.primary,
        enabled: showImages,
      },
      {
        name: getPdfTranslation('Links'),
        items: sectionItems.Links,
        color: themeColors.primary,
        enabled: showLinks,
      },
      {
        name: getPdfTranslation('Buttons'),
        items: sectionItems.Buttons,
        color: themeColors.primary,
        enabled: showButtons,
      },
      {
        name: getPdfTranslation('Inputs'),
        items: sectionItems.Inputs,
        color: themeColors.primary,
        enabled: showInputs,
      },
      {
        name: getPdfTranslation('Roles'),
        items: sectionItems.Roles,
        color: themeColors.primary,
        enabled: showRoles,
      },
    ];

    for (const section of sections) {
      // Only show section if it's enabled (checkbox checked) and has items
      if (section.enabled && section.items.length > 0) {
        // Group items by status (passed/failed)
        // An item is "Failed" if it has any missing attributes according to WCAG
        // An item is "Passed" only if it has NO missing attributes
        const failedItems = section.items.filter(
          (item) => item.missingAttributes && item.missingAttributes.length > 0
        );
        const passedItems = section.items.filter(
          (item) => !item.missingAttributes || item.missingAttributes.length === 0
        );

        // Render Passed items first, then Failed items
        const statusGroups = [
          { items: passedItems, status: 'Passed', color: themeColors.success },
          { items: failedItems, status: 'Failed', color: themeColors.danger },
        ];

        for (const statusGroup of statusGroups) {
          if (statusGroup.items.length === 0) continue;

          if (yPos > pageHeight - 80) {
            doc.addPage();
            yPos = margin;
          }

          // Section header - Design 5: Compact Professional with Black/Red/Green theme
          const sectionHeaderHeight = 10;
          // Use black background for failed, green for passed
          const headerBgColor =
            statusGroup.status === 'Failed'
              ? [0, 0, 0] // Black for failed
              : [34, 197, 94]; // Green (#22c55e) for passed
          doc.setFillColor(headerBgColor[0], headerBgColor[1], headerBgColor[2]);
          doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 2, 2, 'F');

          doc.setTextColor(255, 255, 255); // White text
          doc.setFontSize(10);
          doc.setFont(undefined, 'bold');
          const statusText = getPdfTranslation(statusGroup.status);
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
            parent: section.name,
          });
          yPos += sectionHeaderHeight + 8;

          // Track items per page - maximum 3 tables per page
          let itemsOnCurrentPage = 0;
          const maxItemsPerPage = 3;

          for (const item of statusGroup.items) {
            // Check if we need a new page (max 3 items per page)
            if (itemsOnCurrentPage >= maxItemsPerPage) {
              doc.addPage();
              yPos = margin;
              itemsOnCurrentPage = 0;
              // Redraw section header on new page
              const headerBgColorRedraw =
                statusGroup.status === 'Failed'
                  ? [0, 0, 0] // Black for failed
                  : [34, 197, 94]; // Green for passed
              doc.setFillColor(
                headerBgColorRedraw[0],
                headerBgColorRedraw[1],
                headerBgColorRedraw[2]
              );
              doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 2, 2, 'F');
              doc.setTextColor(255, 255, 255); // White text
              doc.setFontSize(10);
              doc.setFont(undefined, 'bold');
              const statusTextRedraw = getPdfTranslation(statusGroup.status);
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

            // Calculate item height - everything is now in one unified table
            let itemStartY = yPos;
            let calculatedHeight = 3; // Compact: top padding 3mm

            // Image area height (if exists) - now inside table
            const screenshot = item.screenshot || null;
            const hasValidScreenshot =
              screenshot &&
              (screenshot.startsWith('data:image') ||
                screenshot.startsWith('http://') ||
                screenshot.startsWith('https://') ||
                (typeof screenshot === 'string' && screenshot.length > 0));
            const imageAreaHeight = hasValidScreenshot ? 22 : 0; // Image row height in table

            // Table header height
            calculatedHeight += 5.8; // Table header (5.5mm) + spacing

            // Image row height (if exists) - now inside table
            calculatedHeight += imageAreaHeight;

            // Get selected attributes and original element data (used for both height calculation and rendering)
            const options = getSelectedAttributes();
            const elem = item.originalData;

            // Missing attributes rows (will be added to table)
            if (isError && item.missingAttributes && item.missingAttributes.length > 0) {
              const missingCount = Array.isArray(item.missingAttributes)
                ? item.missingAttributes.length
                : 1;
              calculatedHeight += missingCount * 5; // Each missing attribute row
            }

            // Attributes height estimation - calculate based on selected checkboxes
            let attributesHeight = 0;

            if (item.text) {
              const cleanText = sanitizeText(item.text);
              if (cleanText) {
                const maxLength = 120;
                const truncatedText =
                  cleanText.length > maxLength
                    ? cleanText.substring(0, maxLength) + '...'
                    : cleanText;
                const textLines = doc.splitTextToSize(
                  `${getPdfTranslation('Text')}: ${truncatedText}`,
                  textWidth - 16
                );
                attributesHeight += textLines.length * 3 + 1; // Increased line height
              }
            }

            // Estimate height for all attributes based on checkboxes
            if (item.type === 'Image') {
              if (options.checkAltText) {
                const altText =
                  elem.alt === null
                    ? 'MISSING'
                    : String(elem.alt || '').trim() === ''
                      ? 'EMPTY'
                      : sanitizeText(elem.alt).substring(0, 100);
                const altLines = doc.splitTextToSize(`Alt: ${altText}`, textWidth - 16);
                attributesHeight += altLines.length * 3 + 1; // Increased line height
              }
              if (elem.src) {
                const srcText = String(elem.src);
                const truncatedSrc =
                  srcText.length > 80 ? srcText.substring(0, 80) + '...' : srcText;
                const srcLines = doc.splitTextToSize(`Source: ${truncatedSrc}`, textWidth - 16);
                attributesHeight += srcLines.length * 3 + 1; // Increased line height
              }
            }

            if (item.type === 'Link') {
              if (options.checkAriaLabel) attributesHeight += 2.5; // Compact: 2.5mm per attribute
              if (options.checkAriaLabelledby) attributesHeight += 2.5;
              if (options.checkTitle) attributesHeight += 2.5;
              if (options.checkAriaHidden && elem.ariaHidden !== null) attributesHeight += 2.5;
              if (options.checkAriaExpanded && elem.ariaExpanded !== null) attributesHeight += 2.5;
              if (options.checkAriaControls && elem.ariaControls !== null) attributesHeight += 2.5;
              if (options.checkAriaCurrent && elem.ariaCurrent !== null) attributesHeight += 2.5;
              if (options.checkTabIndex && elem.tabIndex !== null) attributesHeight += 2.5;
              if (options.checkLang && elem.lang !== null) attributesHeight += 2.5;
              if (options.checkFocusStates) attributesHeight += 2.5;
              if (elem.href) {
                const hrefText = String(elem.href);
                const truncatedHref =
                  hrefText.length > 80 ? hrefText.substring(0, 80) + '...' : hrefText;
                const hrefLines = doc.splitTextToSize(`Href: ${truncatedHref}`, textWidth - 16);
                attributesHeight += hrefLines.length * 3 + 1; // Increased line height
              }
            }

            if (item.type === 'Button') {
              if (options.checkAriaLabel) attributesHeight += 2.5; // Compact: 2.5mm per attribute
              if (options.checkAriaLabelledby) attributesHeight += 2.5;
              if (options.checkAriaDescribedby && elem.ariaDescribedby !== null)
                attributesHeight += 2.5;
              if (options.checkAriaHidden && elem.ariaHidden !== null) attributesHeight += 2.5;
              if (options.checkAriaExpanded && elem.ariaExpanded !== null) attributesHeight += 2.5;
              if (options.checkAriaControls && elem.ariaControls !== null) attributesHeight += 2.5;
              if (options.checkAriaCurrent && elem.ariaCurrent !== null) attributesHeight += 2.5;
              if (options.checkTabIndex && elem.tabIndex !== null) attributesHeight += 2.5;
              if (options.checkLang && elem.lang !== null) attributesHeight += 2.5;
              if (options.checkFocusStates) attributesHeight += 2.5;
            }

            if (item.type === 'Input') {
              if (options.checkAriaLabel) attributesHeight += 2.5; // Compact: 2.5mm per attribute
              if (options.checkAriaLabelledby) attributesHeight += 2.5;
              if (options.checkLabels) attributesHeight += 2.5;
              if (options.checkAriaDescribedby && elem.ariaDescribedby !== null)
                attributesHeight += 2.5;
              if (options.checkAriaRequired && elem.ariaRequired !== null) attributesHeight += 2.5;
              if (options.checkAriaInvalid && elem.ariaInvalid !== null) attributesHeight += 2.5;
              if (options.checkAriaHidden && elem.ariaHidden !== null) attributesHeight += 2.5;
              if (options.checkTabIndex && elem.tabIndex !== null) attributesHeight += 2.5;
              if (options.checkLang && elem.lang !== null) attributesHeight += 2.5;
              if (options.checkFocusStates) attributesHeight += 2.5;
              if (item.typeName) attributesHeight += 2.5; // Compact
            }

            if (item.type === 'Role') {
              if (options.checkAriaLabel) attributesHeight += 2.5; // Compact: 2.5mm per attribute
              if (options.checkAriaLabelledby) attributesHeight += 2.5;
              if (options.checkAriaDescribedby && elem.ariaDescribedby !== null)
                attributesHeight += 2.5;
              if (options.checkAriaHidden && elem.ariaHidden !== null) attributesHeight += 2.5;
              if (options.checkAriaExpanded && elem.ariaExpanded !== null) attributesHeight += 2.5;
              if (options.checkAriaControls && elem.ariaControls !== null) attributesHeight += 2.5;
              if (options.checkAriaCurrent && elem.ariaCurrent !== null) attributesHeight += 2.5;
              if (options.checkTabIndex && elem.tabIndex !== null) attributesHeight += 2.5;
              if (options.checkLang && elem.lang !== null) attributesHeight += 2.5;
              if (item.role) attributesHeight += 2.5; // Compact
            }

            calculatedHeight += attributesHeight + 2; // Compact: attributes padding 2mm

            // Selector height
            if (item.selector) {
              const selectorText = String(item.selector);
              const truncatedSelector =
                selectorText.length > 80 ? selectorText.substring(0, 80) + '...' : selectorText;
              const selectorLines = doc.splitTextToSize(
                `${getPdfTranslation('Selector')}: ${truncatedSelector}`,
                textWidth - 16
              );
              calculatedHeight += selectorLines.length * 3 + 4; // Increased line height: selector + padding
            }

            calculatedHeight += 3; // Compact: bottom padding 3mm
            const itemHeight = Math.max(calculatedHeight, 30); // Compact: minimum height 30mm

            // Check if we need a new page
            if (yPos + itemHeight > pageHeight - margin) {
              doc.addPage();
              yPos = margin;
              // Redraw section header on new page - Design 5: Compact Professional with Black/Red/Green theme
              const headerBgColorRedraw =
                statusGroup.status === 'Failed'
                  ? [0, 0, 0] // Black for failed
                  : [34, 197, 94]; // Green for passed
              doc.setFillColor(
                headerBgColorRedraw[0],
                headerBgColorRedraw[1],
                headerBgColorRedraw[2]
              );
              doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 2, 2, 'F');

              doc.setTextColor(255, 255, 255); // White text
              doc.setFontSize(10);
              doc.setFont(undefined, 'bold');
              const statusTextRedraw = getPdfTranslation(statusGroup.status);
              doc.text(
                `${section.name}: ${statusTextRedraw} (${statusGroup.items.length})`,
                margin + 3,
                yPos + 6.5
              );
              yPos += sectionHeaderHeight + 3;
            }

            // No badges/containers - tables stand alone with neomorphism
            let contentY = yPos; // Start directly at yPos

            // UNIFIED TABLE - Everything in one table: header, image, missing attributes, and all other attributes
            const attributeRows = [];

            // 1. Header row: #Number and Type
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

            // 2. Image row placeholder (will be rendered specially)
            if (hasValidScreenshot) {
              attributeRows.push({
                name: 'Image',
                value: '',
                status: 'normal',
                isImage: true,
              });
            }

            // 3. Missing attributes (in red) - show immediately after image
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

            // 4. Text content
            if (item.text) {
              const cleanText = sanitizeText(item.text);
              if (cleanText) {
                const maxLength = 200;
                const truncatedText =
                  cleanText.length > maxLength
                    ? cleanText.substring(0, maxLength) + '...'
                    : cleanText;
                attributeRows.push({
                  name: 'Text',
                  value: truncatedText,
                  status: 'normal',
                });
              }
            }

            // Type-specific attributes based on checkboxes - collect in table format
            if (item.type === 'Image') {
              if (options.checkAltText) {
                // Always show the actual value, even if missing
                const altValue =
                  elem.alt === null
                    ? 'MISSING'
                    : String(elem.alt || '').trim() === ''
                      ? 'EMPTY'
                      : sanitizeText(String(elem.alt || ''));
                const altStatus =
                  elem.alt === null || String(elem.alt || '').trim() === '' ? 'missing' : 'present';
                attributeRows.push({
                  name: 'Alt',
                  value: altValue,
                  status: altStatus,
                });
              }
              if (elem.src) {
                const srcText = String(elem.src);
                const truncatedSrc =
                  srcText.length > 200 ? srcText.substring(0, 200) + '...' : srcText;
                attributeRows.push({
                  name: 'Source',
                  value: truncatedSrc,
                  status: 'normal',
                });
              }
            }

            if (item.type === 'Link') {
              if (options.checkAriaLabel) {
                // Always show the actual value
                const ariaLabel = elem.ariaLabel;
                const status = ariaLabel ? 'present' : 'missing';
                attributeRows.push({
                  name: 'aria-label',
                  value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkAriaLabelledby) {
                const ariaLabelledby = elem.ariaLabelledby;
                const status = ariaLabelledby ? 'present' : 'missing';
                attributeRows.push({
                  name: 'aria-labelledby',
                  value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkTitle) {
                const title = elem.title;
                const status = title ? 'present' : 'missing';
                attributeRows.push({
                  name: 'title',
                  value: title ? sanitizeText(String(title)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkAriaHidden && elem.ariaHidden !== null) {
                const ariaHidden = elem.ariaHidden;
                const status = ariaHidden === 'true' ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'aria-hidden',
                  value: String(ariaHidden),
                  status: status,
                });
              }
              if (options.checkAriaExpanded && elem.ariaExpanded !== null) {
                attributeRows.push({
                  name: 'aria-expanded',
                  value: String(elem.ariaExpanded),
                  status: 'normal',
                });
              }
              if (options.checkAriaControls && elem.ariaControls !== null) {
                attributeRows.push({
                  name: 'aria-controls',
                  value: String(elem.ariaControls),
                  status: 'normal',
                });
              }
              if (options.checkAriaCurrent && elem.ariaCurrent !== null) {
                attributeRows.push({
                  name: 'aria-current',
                  value: String(elem.ariaCurrent),
                  status: 'normal',
                });
              }
              if (options.checkTabIndex && elem.tabIndex !== null) {
                const tabIndexValue = parseInt(elem.tabIndex);
                const status = tabIndexValue > 0 ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'tabindex',
                  value: `${elem.tabIndex}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
                  status: status,
                });
              }
              if (options.checkLang && elem.lang !== null) {
                attributeRows.push({
                  name: 'lang',
                  value: String(elem.lang),
                  status: 'normal',
                });
              }
              if (options.checkFocusStates) {
                const hasFocusState = elem.hasFocusState !== false;
                const focusStateInMissing =
                  elem.missingAttributes && elem.missingAttributes.includes('focus-state');
                const status = hasFocusState && !focusStateInMissing ? 'present' : 'missing';
                attributeRows.push({
                  name: 'Focus State',
                  value: hasFocusState && !focusStateInMissing ? 'Present' : 'Missing',
                  status: status,
                });
              }
              if (elem.href) {
                const hrefText = String(elem.href);
                const truncatedHref =
                  hrefText.length > 200 ? hrefText.substring(0, 200) + '...' : hrefText;
                attributeRows.push({
                  name: 'Href',
                  value: truncatedHref,
                  status: 'normal',
                });
              }
            }

            if (item.type === 'Button') {
              if (options.checkAriaLabel) {
                const ariaLabel = elem.ariaLabel;
                const status = ariaLabel ? 'present' : 'missing';
                attributeRows.push({
                  name: 'aria-label',
                  value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkAriaLabelledby) {
                const ariaLabelledby = elem.ariaLabelledby;
                const status = ariaLabelledby ? 'present' : 'missing';
                attributeRows.push({
                  name: 'aria-labelledby',
                  value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkAriaDescribedby && elem.ariaDescribedby !== null) {
                attributeRows.push({
                  name: 'aria-describedby',
                  value: sanitizeText(String(elem.ariaDescribedby)),
                  status: 'normal',
                });
              }
              if (options.checkAriaHidden && elem.ariaHidden !== null) {
                const ariaHidden = elem.ariaHidden;
                const status = ariaHidden === 'true' ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'aria-hidden',
                  value: String(ariaHidden),
                  status: status,
                });
              }
              if (options.checkAriaExpanded && elem.ariaExpanded !== null) {
                attributeRows.push({
                  name: 'aria-expanded',
                  value: String(elem.ariaExpanded),
                  status: 'normal',
                });
              }
              if (options.checkAriaControls && elem.ariaControls !== null) {
                attributeRows.push({
                  name: 'aria-controls',
                  value: String(elem.ariaControls),
                  status: 'normal',
                });
              }
              if (options.checkAriaCurrent && elem.ariaCurrent !== null) {
                attributeRows.push({
                  name: 'aria-current',
                  value: String(elem.ariaCurrent),
                  status: 'normal',
                });
              }
              if (options.checkTabIndex && elem.tabIndex !== null) {
                const tabIndexValue = parseInt(elem.tabIndex);
                const status = tabIndexValue > 0 ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'tabindex',
                  value: `${elem.tabIndex}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
                  status: status,
                });
              }
              if (options.checkLang && elem.lang !== null) {
                attributeRows.push({
                  name: 'lang',
                  value: String(elem.lang),
                  status: 'normal',
                });
              }
              if (options.checkFocusStates) {
                const hasFocusState = elem.hasFocusState !== false;
                const focusStateInMissing =
                  elem.missingAttributes && elem.missingAttributes.includes('focus-state');
                const status = hasFocusState && !focusStateInMissing ? 'present' : 'missing';
                attributeRows.push({
                  name: 'Focus State',
                  value: hasFocusState && !focusStateInMissing ? 'Present' : 'Missing',
                  status: status,
                });
              }
            }

            if (item.type === 'Input') {
              if (options.checkAriaLabel) {
                const ariaLabel = elem.ariaLabel;
                const status = ariaLabel ? 'present' : 'missing';
                attributeRows.push({
                  name: 'aria-label',
                  value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkAriaLabelledby) {
                const ariaLabelledby = elem.ariaLabelledby;
                const status = ariaLabelledby ? 'present' : 'missing';
                attributeRows.push({
                  name: 'aria-labelledby',
                  value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkLabels) {
                const label = elem.label;
                const status = label ? 'present' : 'missing';
                attributeRows.push({
                  name: '<label>',
                  value: label ? sanitizeText(String(label)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkAriaDescribedby && elem.ariaDescribedby !== null) {
                attributeRows.push({
                  name: 'aria-describedby',
                  value: sanitizeText(String(elem.ariaDescribedby)),
                  status: 'normal',
                });
              }
              if (options.checkAriaRequired && elem.ariaRequired !== null) {
                attributeRows.push({
                  name: 'aria-required',
                  value: String(elem.ariaRequired),
                  status: 'normal',
                });
              }
              if (options.checkAriaInvalid && elem.ariaInvalid !== null) {
                const ariaInvalid = elem.ariaInvalid;
                const status = ariaInvalid === 'true' ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'aria-invalid',
                  value: String(ariaInvalid),
                  status: status,
                });
              }
              if (options.checkAriaHidden && elem.ariaHidden !== null) {
                const ariaHidden = elem.ariaHidden;
                const status = ariaHidden === 'true' ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'aria-hidden',
                  value: `${String(ariaHidden)} (should not be true for inputs)`,
                  status: status,
                });
              }
              if (options.checkTabIndex && elem.tabIndex !== null) {
                const tabIndexValue = parseInt(elem.tabIndex);
                const status = tabIndexValue > 0 ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'tabindex',
                  value: `${elem.tabIndex}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
                  status: status,
                });
              }
              if (options.checkLang && elem.lang !== null) {
                attributeRows.push({
                  name: 'lang',
                  value: String(elem.lang),
                  status: 'normal',
                });
              }
              if (options.checkFocusStates) {
                const focusStateInMissing =
                  elem.missingAttributes && elem.missingAttributes.includes('focus-state');
                const status = !focusStateInMissing ? 'present' : 'missing';
                attributeRows.push({
                  name: 'Focus State',
                  value: !focusStateInMissing ? 'Present' : 'Missing',
                  status: status,
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
              if (options.checkAriaLabel) {
                const ariaLabel = elem.ariaLabel;
                const status = ariaLabel ? 'present' : 'missing';
                attributeRows.push({
                  name: 'aria-label',
                  value: ariaLabel ? sanitizeText(String(ariaLabel)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkAriaLabelledby) {
                const ariaLabelledby = elem.ariaLabelledby;
                const status = ariaLabelledby ? 'present' : 'missing';
                attributeRows.push({
                  name: 'aria-labelledby',
                  value: ariaLabelledby ? sanitizeText(String(ariaLabelledby)) : 'MISSING',
                  status: status,
                });
              }
              if (options.checkAriaDescribedby && elem.ariaDescribedby !== null) {
                attributeRows.push({
                  name: 'aria-describedby',
                  value: sanitizeText(String(elem.ariaDescribedby)),
                  status: 'normal',
                });
              }
              if (options.checkAriaHidden && elem.ariaHidden !== null) {
                const ariaHidden = elem.ariaHidden;
                const status = ariaHidden === 'true' ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'aria-hidden',
                  value: String(ariaHidden),
                  status: status,
                });
              }
              if (options.checkAriaExpanded && elem.ariaExpanded !== null) {
                attributeRows.push({
                  name: 'aria-expanded',
                  value: String(elem.ariaExpanded),
                  status: 'normal',
                });
              }
              if (options.checkAriaControls && elem.ariaControls !== null) {
                attributeRows.push({
                  name: 'aria-controls',
                  value: String(elem.ariaControls),
                  status: 'normal',
                });
              }
              if (options.checkAriaCurrent && elem.ariaCurrent !== null) {
                attributeRows.push({
                  name: 'aria-current',
                  value: String(elem.ariaCurrent),
                  status: 'normal',
                });
              }
              if (options.checkTabIndex && elem.tabIndex !== null) {
                const tabIndexValue = parseInt(elem.tabIndex);
                const status = tabIndexValue > 0 ? 'warning' : 'normal';
                attributeRows.push({
                  name: 'tabindex',
                  value: `${elem.tabIndex}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}`,
                  status: status,
                });
              }
              if (options.checkLang && elem.lang !== null) {
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

            // Add HTML/outerHTML to table if available
            if (item.outerHTML || elem.outerHTML) {
              const htmlText = String(item.outerHTML || elem.outerHTML || '');
              const truncatedHtml =
                htmlText.length > 300 ? htmlText.substring(0, 300) + '...' : htmlText;
              attributeRows.push({
                name: 'HTML',
                value: sanitizeText(truncatedHtml),
                status: 'normal',
              });
            }

            // Add selector to table if available
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

            // Only render table if there are attributes to display
            if (attributeRows.length > 0) {
              // Store image data for rendering inside table
              let imageData = null;
              if (hasValidScreenshot) {
                imageData = {
                  src: item.screenshot,
                  maxWidth: textWidth - 16 - 45 - 3, // col2Width
                  maxHeight: 20, // Smaller image in table
                };
              }
              const attributesStartY = contentY;
              const tableStartX = contentStartX;
              const tableWidth = textWidth - 16;
              const col1Width = 45; // Attribute name column (wider for better readability)
              const col2Width = tableWidth - col1Width - 3; // Value column (with separator space)
              let currentRowY = contentY;
              const rowHeight = 5; // Base row height in mm (increased for better readability)
              const cellPadding = 2; // Padding inside cells (increased for better spacing)

              // Render all table rows with elegant zebra striping
              // Note: Header row (#Number + Type) is the first row, followed by image (if exists), then attributes
              doc.setFontSize(7.5); // Slightly larger for better readability
              let rowIndex = 0;

              for (const row of attributeRows) {
                // Special handling for header row
                if (row.isHeader) {
                  const headerRowHeight = 6;
                  doc.setFillColor(30, 30, 30); // Dark gray header
                  doc.rect(tableStartX, currentRowY, tableWidth, headerRowHeight, 'F');

                  doc.setFont(undefined, 'bold');
                  doc.setFontSize(9);
                  doc.setTextColor(255, 255, 255); // White text
                  doc.text(row.name, tableStartX + cellPadding, currentRowY + 4);
                  doc.text(
                    String(row.value),
                    tableStartX + col1Width + cellPadding,
                    currentRowY + 4
                  );

                  // Draw vertical separator in header
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

                // Special handling for image row
                if (row.isImage && imageData) {
                  const imageRowHeight = 22; // Space for image
                  const isEvenRow = (rowIndex - 1) % 2 === 0;
                  const rowBgColor = isEvenRow ? [255, 255, 255] : [248, 249, 250];

                  doc.setFillColor(rowBgColor[0], rowBgColor[1], rowBgColor[2]);
                  doc.rect(tableStartX, currentRowY, tableWidth, imageRowHeight, 'F');

                  // Render image in the value column
                  try {
                    const img = new Image();
                    img.crossOrigin = 'anonymous';

                    await new Promise((resolve) => {
                      const timeout = setTimeout(() => {
                        console.warn('Image load timeout for item:', item.index);
                        resolve();
                      }, 8000);

                      img.onload = () => {
                        clearTimeout(timeout);
                        try {
                          const imgWidth = img.naturalWidth || img.width || imageData.maxWidth;
                          const imgHeight = img.naturalHeight || img.height || imageData.maxHeight;

                          let imageWidthFinal = imageData.maxWidth;
                          let imageHeightFinal = imageData.maxHeight;

                          if (imgWidth > 0 && imgHeight > 0) {
                            const aspectRatio = imgWidth / imgHeight;
                            if (aspectRatio > 1) {
                              imageWidthFinal = Math.min(
                                imageData.maxWidth,
                                imageData.maxHeight * aspectRatio
                              );
                              imageHeightFinal = imageWidthFinal / aspectRatio;
                            } else {
                              imageHeightFinal = Math.min(
                                imageData.maxHeight,
                                imageData.maxWidth / aspectRatio
                              );
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

                      let imageSrc = imageData.src;
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

                  // Label for image
                  doc.setFont(undefined, 'bold');
                  doc.setFontSize(7.5);
                  doc.setTextColor(40, 40, 40);
                  doc.text('Image', tableStartX + cellPadding, currentRowY + 11);

                  // Vertical separator
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

                // Regular attribute rows
                const isEvenRow = (rowIndex - 1) % 2 === 0;
                const rowBgColor = isEvenRow
                  ? [255, 255, 255] // White for even rows
                  : [248, 249, 250]; // Very light gray (#f8f9fa) for odd rows - more subtle

                // Calculate actual row height based on content
                const nameLines = doc.splitTextToSize(row.name, col1Width - cellPadding * 2);
                const valueLines = doc.splitTextToSize(
                  String(row.value),
                  col2Width - cellPadding * 2
                );
                const maxLines = Math.max(nameLines.length, valueLines.length);
                const actualRowHeight = Math.max(rowHeight, maxLines * 3 + 1.5); // Better line spacing

                // Row background - use rect for all rows (rounded corners handled by table border)
                doc.setFillColor(rowBgColor[0], rowBgColor[1], rowBgColor[2]);
                doc.rect(tableStartX, currentRowY, tableWidth, actualRowHeight, 'F');

                // Subtle horizontal separator between rows (except for last row)
                if (rowIndex < attributeRows.length - 1) {
                  doc.setDrawColor(230, 230, 230); // Light gray separator
                  doc.setLineWidth(0.3);
                  doc.line(
                    tableStartX + 1,
                    currentRowY + actualRowHeight,
                    tableStartX + tableWidth - 1,
                    currentRowY + actualRowHeight
                  );
                }

                // Vertical separator - subtle gray line
                doc.setDrawColor(220, 220, 220); // Light gray separator
                doc.setLineWidth(0.3);
                doc.line(
                  tableStartX + col1Width,
                  currentRowY,
                  tableStartX + col1Width,
                  currentRowY + actualRowHeight
                );

                // Attribute name column - Bold, left-aligned
                doc.setFont(undefined, 'bold');
                doc.setFontSize(7.5);
                doc.setTextColor(40, 40, 40); // Dark gray for better readability
                doc.text(nameLines, tableStartX + cellPadding, currentRowY + 3);

                // Value column with semantic color coding
                doc.setFont(undefined, 'normal');
                let valueColor = [30, 30, 30]; // Dark gray default (better than pure black)

                if (row.status === 'missing') {
                  valueColor = [220, 38, 38]; // Red (#dc2626) for missing
                } else if (row.status === 'present') {
                  valueColor = [22, 163, 74]; // Green (#16a34a) for present - slightly darker for better contrast
                } else if (row.status === 'warning') {
                  valueColor = [217, 119, 6]; // Orange (#d97706) for warnings - darker for better readability
                }

                doc.setTextColor(valueColor[0], valueColor[1], valueColor[2]);
                doc.text(valueLines, tableStartX + col1Width + cellPadding, currentRowY + 3);

                currentRowY += actualRowHeight;
                rowIndex++;
              }

              // Neomorphism effect with colored glow shadows
              const tableHeight = Math.max(0.1, Math.abs(currentRowY - attributesStartY)); // Ensure positive height
              const validTableWidth = Math.max(0.1, Math.abs(tableWidth)); // Ensure positive width
              const validTableStartX = isNaN(tableStartX) ? margin + 8 : tableStartX; // Ensure valid X position
              const validAttributesStartY = isNaN(attributesStartY) ? contentY : attributesStartY; // Ensure valid Y position

              // Neomorphism: Multiple layered shadows for depth and colored glow
              const shadowLayers = 4; // Number of shadow layers for smooth neomorphism
              const shadowOffset = 0.3; // Offset for each shadow layer
              const shadowBlur = 0.5; // Blur effect

              // Determine shadow color based on status (passed = green, failed = red)
              const shadowColor = isError
                ? [220, 38, 38, 0.15] // Red glow for failed (with opacity)
                : [34, 197, 94, 0.15]; // Green glow for passed (with opacity)

              // Draw multiple shadow layers for neomorphism effect
              for (let i = shadowLayers; i > 0; i--) {
                const layerOffset = i * shadowOffset;
                const layerOpacity = (shadowColor[3] * (shadowLayers - i + 1)) / shadowLayers;

                // Outer glow shadow
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

              // Main table border - subtle but defined
              doc.setDrawColor(200, 200, 200); // Light gray border
              doc.setLineWidth(0.5);
              doc.roundedRect(
                validTableStartX,
                validAttributesStartY,
                validTableWidth,
                tableHeight,
                4,
                4,
                'D'
              );

              // Inner highlight for neomorphism (light side)
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

              contentY = currentRowY + 2;
            } else {
              // If no attributes, add some spacing
              contentY += 2;
            }

            // Increased spacing between tables for better separation (15mm)
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
      outline.add(null, 'Summary', { page: bookmarks[0].page });
      for (let i = 1; i < bookmarks.length; i++) {
        const bookmark = bookmarks[i];
        outline.add(null, bookmark.title, { page: bookmark.page });
      }
    } catch (e) {
      console.warn('Could not add bookmarks to PDF:', e);
    }
  }

  return doc;
};
