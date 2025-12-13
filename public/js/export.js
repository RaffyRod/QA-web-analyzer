/**
 * Export module for generating PDF reports
 */

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

  // Vibrant Colorful Design - Header with gradient background
  const headerHeight = 40;
  doc.setFillColor(102, 126, 234); // Purple gradient start
  doc.rect(0, 0, pageWidth, headerHeight, 'F');

  // Add gradient effect with multiple rectangles
  doc.setFillColor(118, 75, 162); // Purple gradient end
  doc.rect(0, 0, pageWidth, headerHeight * 0.5, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont(undefined, 'bold');
  doc.text('QA-web-analyzer Accessibility Report', pageWidth / 2, 25, { align: 'center' });

  yPos = headerHeight + 10;

  // Meta information
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(30, 30, 30);
  doc.text(`🌐 ${data.url}`, margin, yPos);
  yPos += 6;
  doc.text(`📅 ${new Date(data.analyzedAt).toLocaleString()}`, margin, yPos);
  yPos += 15;

  // Summary section with vibrant cards
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('📊 Summary', margin, yPos);
  bookmarks.push({ title: 'Summary', page: doc.internal.getCurrentPageInfo().pageNumber, y: yPos });
  yPos += 10;

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

  if (showImages) {
    // Purple gradient card
    doc.setFillColor(102, 126, 234);
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('🖼️', cardX + cardWidth / 2, cardStartY + 8, { align: 'center' });
    doc.setFontSize(20);
    doc.text(String(summary.totalImages), cardX + cardWidth / 2, cardStartY + 18, {
      align: 'center',
    });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text('Total Images', cardX + cardWidth / 2, cardStartY + 28, { align: 'center' });
    cardX += cardWidth + 5;

    // Pink gradient card for issues
    doc.setFillColor(240, 147, 251);
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('⚠️', cardX + cardWidth / 2, cardStartY + 8, { align: 'center' });
    doc.setFontSize(20);
    doc.text(String(summary.imagesWithoutAlt), cardX + cardWidth / 2, cardStartY + 18, {
      align: 'center',
    });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text('Without Alt', cardX + cardWidth / 2, cardStartY + 28, { align: 'center' });
    cardX += cardWidth + 5;
  }

  if (showLinks) {
    // Cyan gradient card
    doc.setFillColor(79, 172, 254);
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('🔗', cardX + cardWidth / 2, cardStartY + 8, { align: 'center' });
    doc.setFontSize(20);
    doc.text(String(summary.totalLinks), cardX + cardWidth / 2, cardStartY + 18, {
      align: 'center',
    });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text('Total Links', cardX + cardWidth / 2, cardStartY + 28, { align: 'center' });
    cardX += cardWidth + 5;

    // Green gradient card
    doc.setFillColor(67, 233, 123);
    doc.roundedRect(cardX, cardStartY, cardWidth, cardHeight, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('✅', cardX + cardWidth / 2, cardStartY + 8, { align: 'center' });
    doc.setFontSize(20);
    const linkIssues = summary.linksWithoutAccessibility || 0;
    doc.text(String(linkIssues), cardX + cardWidth / 2, cardStartY + 18, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.text('Link Issues', cardX + cardWidth / 2, cardStartY + 28, { align: 'center' });
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
    let sectionTitle = 'All Elements';
    if (filterMissing && !filterHasAttributes) {
      sectionTitle = 'Issues Found';
    } else if (!filterMissing && filterHasAttributes) {
      sectionTitle = 'Elements with Accessibility';
    } else if (filterMissing && filterHasAttributes) {
      sectionTitle = 'All Elements';
    }

    // Add filter info to header
    if (filterMissing || filterHasAttributes) {
      const filterInfo = [];
      if (filterMissing) filterInfo.push('Missing Attributes');
      if (filterHasAttributes) filterInfo.push('With Attributes');
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`Filters: ${filterInfo.join(' + ')}`, margin, yPos);
      yPos += 6;
    }

    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = margin;
    }

    const sections = [
      {
        name: 'Images',
        items: sectionItems.Images,
        icon: '🖼️',
        gradient: [250, 112, 154, 254, 225, 64],
        enabled: showImages,
      },
      {
        name: 'Links',
        items: sectionItems.Links,
        icon: '🔗',
        gradient: [79, 172, 254, 0, 242, 254],
        enabled: showLinks,
      },
      {
        name: 'Buttons',
        items: sectionItems.Buttons,
        icon: '🔘',
        gradient: [102, 126, 234, 118, 75, 162],
        enabled: showButtons,
      },
      {
        name: 'Inputs',
        items: sectionItems.Inputs,
        icon: '📝',
        gradient: [67, 233, 123, 56, 249, 215],
        enabled: showInputs,
      },
      {
        name: 'Roles',
        items: sectionItems.Roles,
        icon: '🎭',
        gradient: [240, 147, 251, 245, 87, 108],
        enabled: showRoles,
      },
    ];

    for (const section of sections) {
      // Only show section if it's enabled (checkbox checked) and has items
      if (section.enabled && section.items.length > 0) {
        if (yPos > pageHeight - 80) {
          doc.addPage();
          yPos = margin;
        }

        // Section header with vibrant gradient
        const sectionHeaderHeight = 12;
        doc.setFillColor(section.gradient[0], section.gradient[1], section.gradient[2]);
        doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 3, 3, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`${section.icon} ${section.name} (${section.items.length})`, margin + 3, yPos + 8);

        const sectionY = yPos;
        const sectionPage = doc.internal.getCurrentPageInfo().pageNumber;
        bookmarks.push({
          title: section.name,
          page: sectionPage,
          y: sectionY,
          parent: sectionTitle,
        });
        yPos += sectionHeaderHeight + 8;

        for (const item of section.items) {
          // Check if we need a new page
          const estimatedItemHeight = 70; // Base height for item with large image
          if (yPos + estimatedItemHeight > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
            // Redraw section header on new page
            doc.setFillColor(section.gradient[0], section.gradient[1], section.gradient[2]);
            doc.roundedRect(margin, yPos, pageWidth - margin * 2, sectionHeaderHeight, 3, 3, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(14);
            doc.setFont(undefined, 'bold');
            doc.text(
              `${section.icon} ${section.name} (${section.items.length})`,
              margin + 3,
              yPos + 8
            );
            yPos += sectionHeaderHeight + 8;
          }

          const isError = item.missingAttributes && item.missingAttributes.length > 0;
          const imageWidth = 50; // Larger image width
          const textStartX = margin + imageWidth + 12;
          const textWidth = pageWidth - margin * 2 - imageWidth - 12;

          // Calculate item height based on content
          let itemHeight = 60; // Base height
          let contentY = yPos + 8;

          // Item background with border
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(isError ? 245 : 67, isError ? 87 : 233, isError ? 108 : 123);
          doc.setLineWidth(isError ? 2 : 1.5);
          doc.roundedRect(margin, yPos, pageWidth - margin * 2, itemHeight, 4, 4, 'FD');

          // Left border accent
          doc.setFillColor(isError ? 245 : 67, isError ? 87 : 233, isError ? 108 : 123);
          doc.rect(margin, yPos, 4, itemHeight, 'F');

          // Item title
          doc.setFontSize(13);
          doc.setFont(undefined, 'bold');
          doc.setTextColor(30, 30, 30);
          doc.text(`#${item.index} - ${item.type}`, textStartX, contentY);
          contentY += 7;

          // Status badge
          doc.setFontSize(9);
          doc.setFont(undefined, 'normal');
          if (isError) {
            doc.setFillColor(254, 226, 226);
            doc.setTextColor(220, 38, 38);
            const missingText = `❌ Missing: ${item.missingAttributes.join(', ')}`;
            const badgeWidth = Math.min(doc.getTextWidth(missingText) + 8, textWidth - 4);
            doc.roundedRect(textStartX, contentY - 2, badgeWidth, 7, 2, 2, 'F');
            doc.text(missingText, textStartX + 4, contentY + 3);
          } else if (item.hasAccessibility) {
            doc.setFillColor(209, 250, 229);
            doc.setTextColor(5, 150, 105);
            const badgeWidth = Math.min(
              doc.getTextWidth('✅ All attributes present') + 8,
              textWidth - 4
            );
            doc.roundedRect(textStartX, contentY - 2, badgeWidth, 7, 2, 2, 'F');
            doc.text('✅ All attributes present', textStartX + 4, contentY + 3);
          }
          contentY += 10;

          // Detailed information
          doc.setFontSize(8);
          doc.setTextColor(100, 116, 139);

          // Text content
          if (item.text) {
            const cleanText = item.text.replace(/[^\x20-\x7E]/g, '').trim();
            if (cleanText) {
              const textLines = doc.splitTextToSize(
                `📝 Text: ${cleanText.substring(0, 80)}`,
                textWidth - 4
              );
              doc.text(textLines, textStartX, contentY);
              contentY += textLines.length * 4 + 2;
            }
          }

          // Type-specific information
          if (item.type === 'Image' && item.alt !== undefined) {
            const altText =
              item.alt === null ? 'MISSING' : item.alt.trim() === '' ? 'EMPTY' : item.alt;
            const altLines = doc.splitTextToSize(
              `🖼️ Alt: ${altText.substring(0, 60)}`,
              textWidth - 4
            );
            doc.text(altLines, textStartX, contentY);
            contentY += altLines.length * 4 + 2;
          }

          if (item.type === 'Link' && item.href) {
            const hrefText = item.href.length > 50 ? item.href.substring(0, 50) + '...' : item.href;
            doc.text(`🔗 URL: ${hrefText}`, textStartX, contentY);
            contentY += 5;
          }

          if (item.type === 'Input' && item.typeName) {
            doc.text(`📝 Type: ${item.typeName}`, textStartX, contentY);
            contentY += 5;
          }

          if (item.type === 'Role' && item.role) {
            doc.text(`🎭 Role: ${item.role}`, textStartX, contentY);
            contentY += 5;
          }

          // Selector information
          if (item.selector) {
            const selectorText =
              item.selector.length > 40 ? item.selector.substring(0, 40) + '...' : item.selector;
            doc.setFontSize(7);
            doc.setTextColor(148, 163, 184);
            doc.text(`📍 ${selectorText}`, textStartX, contentY);
          }

          // Adjust item height based on content
          const actualContentHeight = contentY - yPos + 8;
          if (actualContentHeight > itemHeight) {
            itemHeight = actualContentHeight;
            // Redraw border with correct height
            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(isError ? 245 : 67, isError ? 87 : 233, isError ? 108 : 123);
            doc.setLineWidth(isError ? 2 : 1.5);
            doc.roundedRect(margin, yPos, pageWidth - margin * 2, itemHeight, 4, 4, 'FD');
            doc.setFillColor(isError ? 245 : 67, isError ? 87 : 233, isError ? 108 : 123);
            doc.rect(margin, yPos, 4, itemHeight, 'F');
          }

          // Large image on the left
          if (
            item.screenshot &&
            (item.screenshot.startsWith('data:image') || item.screenshot.startsWith('http'))
          ) {
            try {
              const img = new Image();
              img.crossOrigin = 'anonymous';

              await new Promise((resolve) => {
                img.onload = () => {
                  const maxImageHeight = itemHeight - 8;
                  const maxImageWidth = imageWidth - 4;
                  let imageHeight = maxImageHeight;
                  let imageWidthFinal = maxImageWidth;

                  if (img.naturalWidth && img.naturalHeight) {
                    const aspectRatio = img.naturalWidth / img.naturalHeight;
                    if (aspectRatio > 1) {
                      imageWidthFinal = Math.min(maxImageWidth, maxImageHeight * aspectRatio);
                      imageHeight = imageWidthFinal / aspectRatio;
                    } else {
                      imageHeight = Math.min(maxImageHeight, maxImageWidth / aspectRatio);
                      imageWidthFinal = imageHeight * aspectRatio;
                    }
                  } else if (img.width && img.height) {
                    const aspectRatio = img.width / img.height;
                    if (aspectRatio > 1) {
                      imageWidthFinal = Math.min(maxImageWidth, maxImageHeight * aspectRatio);
                      imageHeight = imageWidthFinal / aspectRatio;
                    } else {
                      imageHeight = Math.min(maxImageHeight, maxImageWidth / aspectRatio);
                      imageWidthFinal = imageHeight * aspectRatio;
                    }
                  }

                  const imageX = margin + 4;
                  const imageY = yPos + (itemHeight - imageHeight) / 2;

                  try {
                    // Add colored border to image
                    doc.setDrawColor(isError ? 245 : 67, isError ? 87 : 233, isError ? 108 : 123);
                    doc.setLineWidth(1.5);
                    doc.roundedRect(
                      imageX - 2,
                      imageY - 2,
                      imageWidthFinal + 4,
                      imageHeight + 4,
                      3,
                      3,
                      'D'
                    );

                    doc.addImage(
                      img,
                      'PNG',
                      imageX,
                      imageY,
                      imageWidthFinal,
                      imageHeight,
                      undefined,
                      'FAST'
                    );
                  } catch (e) {
                    doc.setFontSize(8);
                    doc.setTextColor(180, 180, 180);
                    doc.text('Image', imageX + imageWidthFinal / 2 - 5, imageY + imageHeight / 2);
                  }

                  resolve();
                };
                img.onerror = () => {
                  doc.setFontSize(8);
                  doc.setTextColor(180, 180, 180);
                  doc.text('No Image', margin + imageWidth / 2 - 5, yPos + itemHeight / 2);
                  resolve();
                };

                img.src = item.screenshot;
              });
            } catch (error) {
              doc.setFontSize(8);
              doc.setTextColor(180, 180, 180);
              doc.setFont(undefined, 'normal');
              doc.text('No Image', margin + imageWidth / 2 - 5, yPos + itemHeight / 2);
            }
          } else {
            // Placeholder for no image
            doc.setFillColor(241, 245, 249);
            doc.roundedRect(margin + 4, yPos + 4, imageWidth - 8, itemHeight - 8, 3, 3, 'F');
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(1);
            doc.roundedRect(margin + 4, yPos + 4, imageWidth - 8, itemHeight - 8, 3, 3, 'D');
            doc.setFontSize(8);
            doc.setTextColor(180, 180, 180);
            doc.text('No Image', margin + imageWidth / 2 - 5, yPos + itemHeight / 2);
          }

          yPos += itemHeight + 8;
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
