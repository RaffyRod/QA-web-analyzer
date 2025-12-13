/**
 * Export module for generating PDF reports
 */

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

  // Light theme colors
  // Header gradient: #667eea to #764ba2
  const headerHeight = 40;
  doc.setFillColor(102, 126, 234); // #667eea
  doc.rect(0, 0, pageWidth, headerHeight, 'F');

  // Add gradient effect with multiple rectangles
  doc.setFillColor(118, 75, 162); // #764ba2
  doc.rect(0, 0, pageWidth, headerHeight * 0.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  const title = getPdfTranslation('Title');
  doc.text(title, pageWidth / 2, 25, { align: 'center', maxWidth: pageWidth - margin * 2 });

  yPos = headerHeight + 10;

  // Meta information with better spacing and visual hierarchy
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(100, 116, 139);

  // URL with icon-like styling
  const urlText = String(data.url || 'N/A');
  const urlLines = doc.splitTextToSize(urlText, pageWidth - margin * 2 - 20);
  doc.text(`${getPdfTranslation('URL')}:`, margin, yPos);
  doc.setTextColor(30, 30, 30);
  doc.setFont(undefined, 'bold');
  doc.text(urlLines, margin + 25, yPos);
  yPos += urlLines.length * 4 + 4;

  // Date with better formatting
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(100, 116, 139);
  const analyzedDate = data.analyzedAt
    ? new Date(data.analyzedAt).toLocaleString()
    : new Date().toLocaleString();
  doc.text(`${getPdfTranslation('Date')}:`, margin, yPos);
  doc.setTextColor(30, 30, 30);
  doc.setFont(undefined, 'bold');
  doc.text(analyzedDate, margin + 25, yPos);
  yPos += 18;

  // Summary section with better visual hierarchy
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(30, 30, 30);
  const summaryTitle = getPdfTranslation('Summary');

  // Add subtle underline for section title
  doc.text(summaryTitle, margin, yPos);
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
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

  // Create vibrant stat cards
  const statCards = [];
  const cardWidth = (pageWidth - margin * 2 - 15) / 4;
  const cardHeight = 35;
  let cardX = margin;
  const cardStartY = yPos;

  // Light theme colors: primary #3b82f6, success #10b981, danger #ef4444
  if (showImages) {
    // Primary color card (#3b82f6)
    doc.setFillColor(59, 130, 246); // #3b82f6
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(String(summary.totalImages || 0), cardX + cardWidth / 2, cardStartY + 15, {
      align: 'center',
    });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(getPdfTranslation('TotalImages'), cardX + cardWidth / 2, cardStartY + 28, {
      align: 'center',
    });
    cardX += cardWidth + 5;

    // Danger color card for issues (#ef4444)
    doc.setFillColor(239, 68, 68); // #ef4444
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(String(summary.imagesWithoutAlt || 0), cardX + cardWidth / 2, cardStartY + 15, {
      align: 'center',
    });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(getPdfTranslation('WithoutAlt'), cardX + cardWidth / 2, cardStartY + 28, {
      align: 'center',
    });
    cardX += cardWidth + 5;
  }

  if (showLinks) {
    // Primary color card (#3b82f6)
    doc.setFillColor(59, 130, 246); // #3b82f6
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(String(summary.totalLinks || 0), cardX + cardWidth / 2, cardStartY + 15, {
      align: 'center',
    });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(getPdfTranslation('TotalLinks'), cardX + cardWidth / 2, cardStartY + 28, {
      align: 'center',
    });
    cardX += cardWidth + 5;

    // Danger color card for issues (#ef4444)
    doc.setFillColor(239, 68, 68); // #ef4444
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    const linkIssues = summary.linksWithoutAccessibility || 0;
    doc.text(String(linkIssues), cardX + cardWidth / 2, cardStartY + 15, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text(getPdfTranslation('LinkIssues'), cardX + cardWidth / 2, cardStartY + 28, {
      align: 'center',
    });
  }

  yPos = cardStartY + cardHeight + 20;

  // Prepare items with detailed information
  const items = [];
  const sectionItems = { Images: [], Links: [], Buttons: [], Inputs: [], Roles: [] };

  if (showImages) {
    data.images.forEach((img) => {
      const hasMissing = img.missingAttributes && img.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && img.hasAccessibility;

      // Logic matches app.js applyFilters function
      let shouldInclude = false;
      if (filterMissing && filterHasAttributes) {
        // Both checked: show all
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        // Only missing checked: show only items with missing attributes
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        // Only hasAttributes checked: show only items with attributes
        shouldInclude = hasAttributes;
      } else {
        // Neither checked: show none (or all if you want, but app shows none)
        shouldInclude = false;
      }

      if (shouldInclude) {
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
        };
        items.push(item);
        sectionItems.Images.push(item);
      }
    });
  }

  if (showLinks) {
    data.links.forEach((link) => {
      const hasMissing = link.missingAttributes && link.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && link.hasAccessibility;

      let shouldInclude = false;
      if (filterMissing && filterHasAttributes) {
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        shouldInclude = hasAttributes;
      } else {
        shouldInclude = false;
      }

      if (shouldInclude) {
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
        };
        items.push(item);
        sectionItems.Links.push(item);
      }
    });
  }

  if (showButtons) {
    data.buttons.forEach((btn) => {
      const hasMissing = btn.missingAttributes && btn.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && btn.hasAccessibility;

      let shouldInclude = false;
      if (filterMissing && filterHasAttributes) {
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        shouldInclude = hasAttributes;
      } else {
        shouldInclude = false;
      }

      if (shouldInclude) {
        const item = {
          type: 'Button',
          screenshot: btn.screenshot || null,
          missingAttributes: btn.missingAttributes || [],
          index: btn.index,
          text: btn.text,
          hasAccessibility: btn.hasAccessibility,
          selector: btn.selector,
          outerHTML: btn.outerHTML,
        };
        items.push(item);
        sectionItems.Buttons.push(item);
      }
    });
  }

  if (showInputs) {
    data.inputs.forEach((input) => {
      const hasMissing = input.missingAttributes && input.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && input.hasAccessibility;

      let shouldInclude = false;
      if (filterMissing && filterHasAttributes) {
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        shouldInclude = hasAttributes;
      } else {
        shouldInclude = false;
      }

      if (shouldInclude) {
        const item = {
          type: 'Input',
          screenshot: input.screenshot || null,
          missingAttributes: input.missingAttributes || [],
          index: input.index,
          typeName: input.type,
          hasAccessibility: input.hasAccessibility,
          selector: input.selector,
          outerHTML: input.outerHTML,
        };
        items.push(item);
        sectionItems.Inputs.push(item);
      }
    });
  }

  if (showRoles) {
    data.roles.forEach((role) => {
      const hasMissing = role.missingAttributes && role.missingAttributes.length > 0;
      const hasAttributes = !hasMissing && role.hasAccessibility;

      let shouldInclude = false;
      if (filterMissing && filterHasAttributes) {
        shouldInclude = true;
      } else if (filterMissing && !filterHasAttributes) {
        shouldInclude = hasMissing;
      } else if (!filterMissing && filterHasAttributes) {
        shouldInclude = hasAttributes;
      } else {
        shouldInclude = false;
      }

      if (shouldInclude) {
        const item = {
          type: 'Role',
          screenshot: role.screenshot || null,
          missingAttributes: role.missingAttributes || [],
          index: role.index,
          role: role.role,
          hasAccessibility: role.hasAccessibility,
          selector: role.selector,
          outerHTML: role.outerHTML,
        };
        items.push(item);
        sectionItems.Roles.push(item);
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
      doc.setTextColor(100, 116, 139);
      doc.text(`${getPdfTranslation('Filters')}: ${filterInfo.join(' + ')}`, margin, yPos);
      yPos += 6;
    }

    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = margin;
    }

    // Light theme colors for sections
    // Primary: #3b82f6 (59, 130, 246)
    // Success: #10b981 (16, 185, 129)
    // Danger: #ef4444 (239, 68, 68)
    const sections = [
      {
        name: getPdfTranslation('Images'),
        items: sectionItems.Images,
        color: [59, 130, 246], // Primary blue
        enabled: showImages,
      },
      {
        name: getPdfTranslation('Links'),
        items: sectionItems.Links,
        color: [59, 130, 246], // Primary blue
        enabled: showLinks,
      },
      {
        name: getPdfTranslation('Buttons'),
        items: sectionItems.Buttons,
        color: [59, 130, 246], // Primary blue
        enabled: showButtons,
      },
      {
        name: getPdfTranslation('Inputs'),
        items: sectionItems.Inputs,
        color: [59, 130, 246], // Primary blue
        enabled: showInputs,
      },
      {
        name: getPdfTranslation('Roles'),
        items: sectionItems.Roles,
        color: [59, 130, 246], // Primary blue
        enabled: showRoles,
      },
    ];

    for (const section of sections) {
      // Only show section if it's enabled (checkbox checked) and has items
      if (section.enabled && section.items.length > 0) {
        // Group items by status (passed/failed)
        const passedItems = section.items.filter(
          (item) =>
            item.hasAccessibility &&
            (!item.missingAttributes || item.missingAttributes.length === 0)
        );
        const failedItems = section.items.filter(
          (item) => item.missingAttributes && item.missingAttributes.length > 0
        );

        // Render Failed items first, then Passed items
        const statusGroups = [
          { items: failedItems, status: 'Failed', color: [239, 68, 68] }, // Danger red
          { items: passedItems, status: 'Passed', color: [16, 185, 129] }, // Success green
        ];

        for (const statusGroup of statusGroups) {
          if (statusGroup.items.length === 0) continue;

          if (yPos > pageHeight - 80) {
            doc.addPage();
            yPos = margin;
          }

          // Section header with status grouping - improved design
          const sectionHeaderHeight = 14;
          doc.setFillColor(section.color[0], section.color[1], section.color[2]);
          doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 4, 4, 'F');

          // Add subtle shadow effect with darker rectangle at top
          doc.setFillColor(
            Math.max(0, section.color[0] - 15),
            Math.max(0, section.color[1] - 15),
            Math.max(0, section.color[2] - 15)
          );
          doc.roundedRect(margin, yPos, pageWidth - margin * 2, 2, 4, 4, 'F');

          doc.setTextColor(255, 255, 255);
          doc.setFontSize(13);
          doc.setFont(undefined, 'bold');
          const statusText = getPdfTranslation(statusGroup.status);
          doc.text(
            `${section.name}: ${statusText} (${statusGroup.items.length})`,
            margin + 5,
            yPos + 9
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

          for (const item of statusGroup.items) {
            // Check if we need a new page - compact
            const estimatedItemHeight = 50; // Reduced base height for compact items
            if (yPos + estimatedItemHeight > pageHeight - margin) {
              doc.addPage();
              yPos = margin;
              // Redraw section header on new page
              doc.setFillColor(section.color[0], section.color[1], section.color[2]);
              doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 4, 4, 'F');

              // Add subtle shadow effect
              doc.setFillColor(
                Math.max(0, section.color[0] - 15),
                Math.max(0, section.color[1] - 15),
                Math.max(0, section.color[2] - 15)
              );
              doc.roundedRect(margin, yPos, pageWidth - margin * 2, 2, 4, 4, 'F');

              doc.setTextColor(255, 255, 255);
              doc.setFontSize(13);
              doc.setFont(undefined, 'bold');
              const statusTextRedraw = getPdfTranslation(statusGroup.status);
              doc.text(
                `${section.name}: ${statusTextRedraw} (${statusGroup.items.length})`,
                margin + 5,
                yPos + 9
              );
              yPos += sectionHeaderHeight + 8;
            }

            const isError = item.missingAttributes && item.missingAttributes.length > 0;
            // Compact image area - smaller to save space
            const imageWidth = 35; // Reduced width for compact cards
            const maxImageHeight = 30; // Reduced height for compact cards
            const textStartX = margin + imageWidth + 8;
            const textWidth = pageWidth - margin * 2 - imageWidth - 8;

            // Calculate content height first to determine item height
            // Account for image height (max 75mm) + padding
            let contentY = yPos + 8;

            // Title height
            contentY += 7;

            // Badge height
            if (isError || item.hasAccessibility) {
              contentY += 10;
            }

            // Text content height estimation
            if (item.text) {
              const cleanText = String(item.text)
                .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '')
                .trim();
              if (cleanText) {
                const maxLength = 100;
                const truncatedText =
                  cleanText.length > maxLength
                    ? cleanText.substring(0, maxLength) + '...'
                    : cleanText;
                const textLines = doc.splitTextToSize(
                  `${getPdfTranslation('Text')}: ${truncatedText}`,
                  textWidth - 4
                );
                contentY += textLines.length * 4.5 + 2;
              }
            }

            // Type-specific information height
            if (item.type === 'Image' && item.alt !== undefined) {
              const altText =
                item.alt === null
                  ? 'MISSING'
                  : String(item.alt).trim() === ''
                    ? 'EMPTY'
                    : String(item.alt).substring(0, 80);
              const altLines = doc.splitTextToSize(
                `${getPdfTranslation('Alt')}: ${altText}`,
                textWidth - 4
              );
              contentY += altLines.length * 4.5 + 2;
            }

            if (item.type === 'Link' && item.href) {
              const hrefText = String(item.href);
              const truncatedHref =
                hrefText.length > 60 ? hrefText.substring(0, 60) + '...' : hrefText;
              const hrefLines = doc.splitTextToSize(
                `${getPdfTranslation('URL')}: ${truncatedHref}`,
                textWidth - 4
              );
              contentY += hrefLines.length * 4.5 + 2;
            }

            if (item.type === 'Input' && item.typeName) {
              contentY += 5;
            }

            if (item.type === 'Role' && item.role) {
              contentY += 5;
            }

            if (item.selector) {
              const selectorText = String(item.selector);
              const truncatedSelector =
                selectorText.length > 50 ? selectorText.substring(0, 50) + '...' : selectorText;
              const selectorLines = doc.splitTextToSize(
                `${getPdfTranslation('Selector')}: ${truncatedSelector}`,
                textWidth - 4
              );
              contentY += selectorLines.length * 3.5 + 2;
            }

            // Calculate final item height - compact
            const screenshot = item.screenshot || null;
            const hasValidScreenshot =
              screenshot &&
              (screenshot.startsWith('data:image') ||
                screenshot.startsWith('http://') ||
                screenshot.startsWith('https://') ||
                (typeof screenshot === 'string' && screenshot.length > 0));
            const imageAreaHeight = hasValidScreenshot ? maxImageHeight + 8 : 25;
            const itemHeight = Math.max(Math.max(contentY - yPos + 6, imageAreaHeight), 35);

            // Reset contentY for actual drawing - compact spacing
            contentY = yPos + 5;

            // Item background with border - Light theme colors (compact)
            doc.setFillColor(245, 247, 250); // Card bg
            doc.setDrawColor(isError ? 239 : 203, isError ? 68 : 213, isError ? 68 : 225);
            doc.setLineWidth(isError ? 1.5 : 0.8); // Thinner borders
            doc.roundedRect(margin, yPos, pageWidth - margin * 2, itemHeight, 3, 3, 'FD'); // Smaller radius

            // Left border accent - thinner
            doc.setFillColor(isError ? 239 : 16, isError ? 68 : 185, isError ? 68 : 129);
            doc.rect(margin, yPos, 3, itemHeight, 'F'); // Thinner border

            // Item title - smaller font
            doc.setFontSize(11); // Reduced from 13
            doc.setFont(undefined, 'bold');
            doc.setTextColor(30, 30, 30);
            doc.text(`#${item.index} - ${item.type}`, textStartX, contentY);
            contentY += 5; // Reduced from 7

            // Status badge - Light theme colors (compact)
            doc.setFontSize(8); // Reduced from 9
            doc.setFont(undefined, 'normal');
            if (isError) {
              // Danger color: #ef4444 with light background
              doc.setFillColor(254, 242, 242); // Light red background
              doc.setTextColor(239, 68, 68); // Danger color
              const missingAttrs = Array.isArray(item.missingAttributes)
                ? item.missingAttributes.join(', ')
                : String(item.missingAttributes || '');
              const missingText = `${getPdfTranslation('Missing')}: ${missingAttrs}`;
              const badgeWidth = Math.min(doc.getTextWidth(missingText) + 6, textWidth - 4);
              doc.roundedRect(textStartX, contentY - 1.5, badgeWidth, 5.5, 1.5, 1.5, 'F'); // Smaller badge
              doc.text(missingText, textStartX + 3, contentY + 2.5);
            } else if (item.hasAccessibility) {
              // Success color: #10b981 with light background
              doc.setFillColor(236, 253, 245); // Light green background
              doc.setTextColor(16, 185, 129); // Success color
              const successText = getPdfTranslation('AllAttributesPresent');
              const badgeWidth = Math.min(doc.getTextWidth(successText) + 6, textWidth - 4);
              doc.roundedRect(textStartX, contentY - 1.5, badgeWidth, 5.5, 1.5, 1.5, 'F'); // Smaller badge
              doc.text(successText, textStartX + 3, contentY + 2.5);
            }
            contentY += 7; // Reduced from 10

            // Detailed information - Light theme text secondary color (compact)
            doc.setFontSize(7); // Reduced from 8
            doc.setTextColor(71, 85, 105); // #475569 - text-secondary

            // Text content - clean and sanitize
            if (item.text) {
              const cleanText = String(item.text)
                .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '')
                .trim();
              if (cleanText) {
                const maxLength = 100;
                const truncatedText =
                  cleanText.length > maxLength
                    ? cleanText.substring(0, maxLength) + '...'
                    : cleanText;
                const textLines = doc.splitTextToSize(
                  `${getPdfTranslation('Text')}: ${truncatedText}`,
                  textWidth - 4
                );
                doc.text(textLines, textStartX, contentY);
                contentY += textLines.length * 3.5 + 1; // Reduced spacing
              }
            }

            // Type-specific information
            if (item.type === 'Image' && item.alt !== undefined) {
              const altText =
                item.alt === null
                  ? 'MISSING'
                  : String(item.alt).trim() === ''
                    ? 'EMPTY'
                    : String(item.alt).substring(0, 80);
              const altLines = doc.splitTextToSize(
                `${getPdfTranslation('Alt')}: ${altText}`,
                textWidth - 4
              );
              doc.text(altLines, textStartX, contentY);
              contentY += altLines.length * 3.5 + 1; // Reduced spacing
            }

            if (item.type === 'Link' && item.href) {
              const hrefText = String(item.href);
              const truncatedHref =
                hrefText.length > 60 ? hrefText.substring(0, 60) + '...' : hrefText;
              const hrefLines = doc.splitTextToSize(
                `${getPdfTranslation('URL')}: ${truncatedHref}`,
                textWidth - 4
              );
              doc.text(hrefLines, textStartX, contentY);
              contentY += hrefLines.length * 3.5 + 1; // Reduced spacing
            }

            if (item.type === 'Input' && item.typeName) {
              doc.text(
                `${getPdfTranslation('Type')}: ${String(item.typeName)}`,
                textStartX,
                contentY
              );
              contentY += 4; // Reduced from 5
            }

            if (item.type === 'Role' && item.role) {
              doc.text(`${getPdfTranslation('Role')}: ${String(item.role)}`, textStartX, contentY);
              contentY += 4; // Reduced from 5
            }

            // Selector information
            if (item.selector) {
              const selectorText = String(item.selector);
              const truncatedSelector =
                selectorText.length > 50 ? selectorText.substring(0, 50) + '...' : selectorText;
              const selectorLines = doc.splitTextToSize(
                `${getPdfTranslation('Selector')}: ${truncatedSelector}`,
                textWidth - 4
              );
              doc.setFontSize(7);
              doc.setTextColor(148, 163, 184); // Lighter text secondary
              doc.text(selectorLines, textStartX, contentY);
              contentY += selectorLines.length * 3 + 1; // Reduced spacing
            }

            // Item height already calculated above, no need to adjust

            // Image on the left - compact size and positioning
            const imageX = margin + 3;
            const imageY = yPos + 4;
            const maxImageWidth = imageWidth - 6;
            const maxImageHeightCalc = Math.min(maxImageHeight, itemHeight - 8);

            if (
              item.screenshot &&
              (item.screenshot.startsWith('data:image') || item.screenshot.startsWith('http'))
            ) {
              try {
                const img = new Image();
                img.crossOrigin = 'anonymous';

                await new Promise((resolve) => {
                  const timeout = setTimeout(() => {
                    console.warn('Image load timeout for item:', item.index);
                    // Show placeholder on timeout - compact
                    doc.setFillColor(245, 247, 250);
                    doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'F');
                    doc.setDrawColor(203, 213, 225);
                    doc.setLineWidth(0.8);
                    doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'D');
                    doc.setFontSize(6);
                    doc.setTextColor(148, 163, 184);
                    doc.text(
                      getPdfTranslation('NoImage'),
                      imageX + maxImageWidth / 2 - 5,
                      imageY + 15
                    );
                    resolve();
                  }, 8000); // Increased timeout to 8 seconds

                  img.onload = () => {
                    clearTimeout(timeout);
                    try {
                      // Calculate image dimensions maintaining aspect ratio
                      let imageWidthFinal = maxImageWidth;
                      let imageHeightFinal = maxImageHeightCalc;

                      // Use natural dimensions if available, otherwise use displayed dimensions
                      const imgWidth = img.naturalWidth || img.width || maxImageWidth;
                      const imgHeight = img.naturalHeight || img.height || maxImageHeightCalc;

                      if (imgWidth > 0 && imgHeight > 0) {
                        const aspectRatio = imgWidth / imgHeight;

                        if (aspectRatio > 1) {
                          // Landscape: fit to width
                          imageWidthFinal = maxImageWidth;
                          imageHeightFinal = maxImageWidth / aspectRatio;
                          // Don't exceed max height
                          if (imageHeightFinal > maxImageHeightCalc) {
                            imageHeightFinal = maxImageHeightCalc;
                            imageWidthFinal = maxImageHeightCalc * aspectRatio;
                          }
                        } else {
                          // Portrait or square: fit to height
                          imageHeightFinal = maxImageHeightCalc;
                          imageWidthFinal = maxImageHeightCalc * aspectRatio;
                          // Don't exceed max width
                          if (imageWidthFinal > maxImageWidth) {
                            imageWidthFinal = maxImageWidth;
                            imageHeightFinal = maxImageWidth / aspectRatio;
                          }
                        }
                      }

                      // Center image vertically in available space
                      const verticalOffset = (maxImageHeightCalc - imageHeightFinal) / 2;
                      const finalImageY = imageY + verticalOffset;

                      // Add colored border to image - Light theme colors (compact)
                      doc.setDrawColor(isError ? 239 : 59, isError ? 68 : 130, isError ? 68 : 246);
                      doc.setLineWidth(1);
                      doc.roundedRect(
                        imageX - 0.5,
                        finalImageY - 0.5,
                        imageWidthFinal + 1,
                        imageHeightFinal + 1,
                        2,
                        2,
                        'D'
                      );

                      // Add image with best quality - smaller size maintains quality better
                      doc.addImage(
                        img,
                        'PNG',
                        imageX,
                        finalImageY,
                        imageWidthFinal,
                        imageHeightFinal,
                        undefined,
                        'SLOW' // Best quality for smaller images to maintain clarity
                      );
                    } catch (e) {
                      console.warn('Error adding image to PDF:', e);
                      // Fallback placeholder - compact
                      doc.setFillColor(245, 247, 250);
                      doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'F');
                      doc.setDrawColor(203, 213, 225);
                      doc.setLineWidth(0.8);
                      doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'D');
                      doc.setFontSize(6);
                      doc.setTextColor(148, 163, 184);
                      doc.text(
                        getPdfTranslation('NoImage'),
                        imageX + maxImageWidth / 2 - 5,
                        imageY + 15
                      );
                    }
                    resolve();
                  };

                  img.onerror = (err) => {
                    clearTimeout(timeout);
                    console.warn('Image load error for item:', item.index, err);
                    // Placeholder for failed image load - compact
                    doc.setFillColor(245, 247, 250);
                    doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'F');
                    doc.setDrawColor(203, 213, 225);
                    doc.setLineWidth(0.8);
                    doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'D');
                    doc.setFontSize(6);
                    doc.setTextColor(148, 163, 184);
                    doc.text(
                      getPdfTranslation('NoImage'),
                      imageX + maxImageWidth / 2 - 5,
                      imageY + 15
                    );
                    resolve();
                  };

                  // Load image - handle different formats
                  let imageSrc = item.screenshot;

                  // If it's a base64 string without data: prefix, add it
                  if (
                    typeof imageSrc === 'string' &&
                    imageSrc.length > 0 &&
                    !imageSrc.startsWith('data:') &&
                    !imageSrc.startsWith('http')
                  ) {
                    // Check if it looks like base64
                    if (/^[A-Za-z0-9+/=]+$/.test(imageSrc.substring(0, 100))) {
                      imageSrc = `data:image/png;base64,${imageSrc}`;
                    }
                  }

                  img.src = imageSrc;
                });
              } catch (error) {
                console.warn('Error processing image:', error);
                // Placeholder for error - compact
                doc.setFillColor(245, 247, 250);
                doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'F');
                doc.setDrawColor(203, 213, 225);
                doc.setLineWidth(0.8);
                doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'D');
                doc.setFontSize(6);
                doc.setTextColor(148, 163, 184);
                doc.text(getPdfTranslation('NoImage'), imageX + maxImageWidth / 2 - 5, imageY + 15);
              }
            } else {
              // Placeholder for no image - compact
              doc.setFillColor(245, 247, 250);
              doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'F');
              doc.setDrawColor(203, 213, 225);
              doc.setLineWidth(0.8);
              doc.roundedRect(imageX, imageY, maxImageWidth, 25, 2, 2, 'D');
              doc.setFontSize(6);
              doc.setTextColor(148, 163, 184);
              doc.text(getPdfTranslation('NoImage'), imageX + maxImageWidth / 2 - 5, imageY + 15);
            }

            yPos += itemHeight + 5; // Reduced spacing between items
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
