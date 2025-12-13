/**
 * Export module for generating PDF reports
 */

/**
 * Exports report as interactive PDF
 */
window.exportReportAsPDF = async function() {
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
  
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont(undefined, 'bold');
  doc.text('Accessibility Report', pageWidth / 2, 20, { align: 'center' });
  
  yPos = 35;
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  const data = window.currentData;
  doc.text(`URL: ${data.url}`, margin, yPos);
  yPos += 6;
  doc.text(`Analyzed at: ${new Date(data.analyzedAt).toLocaleString()}`, margin, yPos);
  yPos += 10;
  
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPos, pageWidth - margin * 2, 10, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Summary', margin + 2, yPos + 7);
  bookmarks.push({ title: 'Summary', page: doc.internal.getCurrentPageInfo().pageNumber, y: yPos });
  yPos += 12;
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  const summary = data.summary;
  
  const showImages = document.getElementById('showImages')?.checked !== false;
  const showLinks = document.getElementById('showLinks')?.checked !== false;
  const showButtons = document.getElementById('showButtons')?.checked !== false;
  const showInputs = document.getElementById('showInputs')?.checked !== false;
  const showRoles = document.getElementById('showRoles')?.checked !== false;
  
  const filterMissing = document.getElementById('filterMissing')?.checked || false;
  const filterHasAttributes = document.getElementById('filterHasAttributes')?.checked || false;
  
  const summaryData = [];
  if (showImages) {
    summaryData.push({ label: 'Total Images', value: summary.totalImages, color: [30, 30, 30] });
    summaryData.push({ label: 'Images without Alt', value: summary.imagesWithoutAlt, color: summary.imagesWithoutAlt > 0 ? [220, 38, 38] : [16, 185, 129] });
  }
  if (showLinks) {
    summaryData.push({ label: 'Total Links', value: summary.totalLinks, color: [30, 30, 30] });
    summaryData.push({ label: 'Links without Accessibility', value: summary.linksWithoutAccessibility, color: summary.linksWithoutAccessibility > 0 ? [220, 38, 38] : [16, 185, 129] });
  }
  if (showButtons) {
    summaryData.push({ label: 'Total Buttons', value: summary.totalButtons, color: [30, 30, 30] });
    summaryData.push({ label: 'Buttons without Accessibility', value: summary.buttonsWithoutAccessibility, color: summary.buttonsWithoutAccessibility > 0 ? [220, 38, 38] : [16, 185, 129] });
  }
  if (showInputs) {
    summaryData.push({ label: 'Total Inputs', value: summary.totalInputs, color: [30, 30, 30] });
    summaryData.push({ label: 'Inputs without Accessibility', value: summary.inputsWithoutAccessibility, color: summary.inputsWithoutAccessibility > 0 ? [220, 38, 38] : [16, 185, 129] });
  }
  
  summaryData.forEach(item => {
    doc.setTextColor(item.color[0], item.color[1], item.color[2]);
    doc.text(`${item.label}: ${item.value}`, margin, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  doc.setTextColor(0, 0, 0);
  
  const items = [];
  const sectionItems = { Images: [], Links: [], Buttons: [], Inputs: [], Roles: [] };
  
  if (showImages) {
    data.images.forEach(img => {
      const shouldInclude = !filterMissing && !filterHasAttributes ? true : 
                           filterMissing && !img.hasAlt ? true :
                           filterHasAttributes && img.hasAlt ? true : false;
      
      if (shouldInclude) {
        const item = {
          type: 'Image',
          screenshot: img.screenshot || null,
          missingAttributes: img.hasAlt ? [] : ['Alt Text'],
          index: img.index,
          hasAccessibility: img.hasAlt
        };
        items.push(item);
        sectionItems.Images.push(item);
      }
    });
  }
  
  if (showLinks) {
    data.links.forEach(link => {
      const hasMissing = link.missingAttributes && link.missingAttributes.length > 0;
      const shouldInclude = !filterMissing && !filterHasAttributes ? true :
                           filterMissing && hasMissing ? true :
                           filterHasAttributes && !hasMissing && link.hasAccessibility ? true : false;
      
      if (shouldInclude) {
        const item = {
          type: 'Link',
          screenshot: link.screenshot || null,
          missingAttributes: link.missingAttributes || [],
          index: link.index,
          text: link.text,
          hasAccessibility: link.hasAccessibility
        };
        items.push(item);
        sectionItems.Links.push(item);
      }
    });
  }
  
  if (showButtons) {
    data.buttons.forEach(btn => {
      const hasMissing = btn.missingAttributes && btn.missingAttributes.length > 0;
      const shouldInclude = !filterMissing && !filterHasAttributes ? true :
                           filterMissing && hasMissing ? true :
                           filterHasAttributes && !hasMissing && btn.hasAccessibility ? true : false;
      
      if (shouldInclude) {
        const item = {
          type: 'Button',
          screenshot: btn.screenshot || null,
          missingAttributes: btn.missingAttributes || [],
          index: btn.index,
          text: btn.text,
          hasAccessibility: btn.hasAccessibility
        };
        items.push(item);
        sectionItems.Buttons.push(item);
      }
    });
  }
  
  if (showInputs) {
    data.inputs.forEach(input => {
      const hasMissing = input.missingAttributes && input.missingAttributes.length > 0;
      const shouldInclude = !filterMissing && !filterHasAttributes ? true :
                           filterMissing && hasMissing ? true :
                           filterHasAttributes && !hasMissing && input.hasAccessibility ? true : false;
      
      if (shouldInclude) {
        const item = {
          type: 'Input',
          screenshot: input.screenshot || null,
          missingAttributes: input.missingAttributes || [],
          index: input.index,
          typeName: input.type,
          hasAccessibility: input.hasAccessibility
        };
        items.push(item);
        sectionItems.Inputs.push(item);
      }
    });
  }
  
  if (showRoles) {
    data.roles.forEach(role => {
      const hasMissing = role.missingAttributes && role.missingAttributes.length > 0;
      const shouldInclude = !filterMissing && !filterHasAttributes ? true :
                           filterMissing && hasMissing ? true :
                           filterHasAttributes && !hasMissing && role.hasAccessibility ? true : false;
      
      if (shouldInclude) {
        const item = {
          type: 'Role',
          screenshot: role.screenshot || null,
          missingAttributes: role.missingAttributes || [],
          index: role.index,
          role: role.role,
          hasAccessibility: role.hasAccessibility
        };
        items.push(item);
        sectionItems.Roles.push(item);
      }
    });
  }
  
  if (items.length > 0) {
    const sectionTitle = filterMissing ? 'Issues Found' : filterHasAttributes ? 'Elements with Accessibility' : 'All Elements';
    
    if (yPos > pageHeight - 50) {
      doc.addPage();
      yPos = margin;
    }
    
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, yPos, pageWidth - margin * 2, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(sectionTitle, margin + 2, yPos + 7);
    bookmarks.push({ title: sectionTitle, page: doc.internal.getCurrentPageInfo().pageNumber, y: yPos });
    yPos += 12;
    
    const sections = [
      { name: 'Images', items: sectionItems.Images },
      { name: 'Links', items: sectionItems.Links },
      { name: 'Buttons', items: sectionItems.Buttons },
      { name: 'Inputs', items: sectionItems.Inputs },
      { name: 'Roles', items: sectionItems.Roles }
    ];
    
    for (const section of sections) {
      if (section.items.length > 0) {
        if (yPos > pageHeight - 50) {
          doc.addPage();
          yPos = margin;
        }
        
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(30, 30, 30);
        doc.text(`${section.name} (${section.items.length})`, margin, yPos);
        const sectionY = yPos;
        const sectionPage = doc.internal.getCurrentPageInfo().pageNumber;
        bookmarks.push({ title: section.name, page: sectionPage, y: sectionY, parent: sectionTitle });
        yPos += 8;
        
        for (const item of section.items) {
          if (yPos > pageHeight - 40) {
            doc.addPage();
            yPos = margin;
          }
          
          const tableStartY = yPos;
          const tableWidth = pageWidth - margin * 2;
          const imageWidth = 30;
          const textWidth = tableWidth - imageWidth - 6;
          
          doc.setLineWidth(0.2);
          doc.setDrawColor(226, 232, 240);
          doc.setFillColor(255, 255, 255);
          
          const attrCount = item.missingAttributes && item.missingAttributes.length > 0 ? item.missingAttributes.length : 1;
          const rowHeight = Math.max(35, 15 + (attrCount * 5));
          let currentRowY = tableStartY;
          
          doc.roundedRect(margin, currentRowY, tableWidth, rowHeight, 3, 3, 'FD');
          doc.setDrawColor(220, 38, 38);
          doc.setLineWidth(1);
          doc.line(margin, currentRowY, margin + tableWidth, currentRowY);
          
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.2);
          doc.line(margin + imageWidth + 2, currentRowY, margin + imageWidth + 2, currentRowY + rowHeight);
          
          doc.setFontSize(12);
          doc.setTextColor(30, 30, 30);
          doc.setFont(undefined, 'bold');
          doc.text(`#${item.index} - ${item.type}`, margin + imageWidth + 4, currentRowY + 8);
          
          doc.setFont(undefined, 'normal');
          doc.setFontSize(10);
          
          if (item.missingAttributes && item.missingAttributes.length > 0) {
            doc.setTextColor(220, 38, 38);
            const missingText = `Missing: ${item.missingAttributes.join(', ')}`;
            const missingLines = doc.splitTextToSize(missingText, textWidth - 4);
            doc.text(missingLines, margin + imageWidth + 4, currentRowY + 15);
          } else if (item.hasAccessibility) {
            doc.setTextColor(16, 185, 129);
            doc.text('All required attributes present', margin + imageWidth + 4, currentRowY + 15);
          }
          
          if (item.text) {
            doc.setFontSize(9);
            doc.setTextColor(60, 60, 60);
            const cleanText = item.text.replace(/[^\x20-\x7E]/g, '').substring(0, 60);
            const textLines = doc.splitTextToSize(`Text: ${cleanText}`, textWidth - 4);
            doc.text(textLines, margin + imageWidth + 4, currentRowY + 22);
          }
          
          if (item.screenshot && (item.screenshot.startsWith('data:image') || item.screenshot.startsWith('http'))) {
            try {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              
              await new Promise((resolve) => {
                img.onload = () => {
                  const maxImageHeight = rowHeight - 6;
                  const maxImageWidth = imageWidth - 2;
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
                  
                  const imageX = margin + 1;
                  const imageY = currentRowY + (rowHeight - imageHeight) / 2;
                  
                  try {
                    doc.addImage(img, 'PNG', imageX, imageY, imageWidthFinal, imageHeight, undefined, 'FAST');
                  } catch (e) {
                    doc.setFontSize(10);
                    doc.setTextColor(180, 180, 180);
                    doc.text('Image', imageX + 5, imageY + maxImageHeight / 2);
                  }
                  
                  resolve();
                };
                img.onerror = () => {
                  doc.setFontSize(10);
                  doc.setTextColor(180, 180, 180);
                  doc.text('No Image', margin + 8, currentRowY + rowHeight / 2);
                  resolve();
                };
                
                img.src = item.screenshot;
              });
            } catch (error) {
              doc.setFontSize(10);
              doc.setTextColor(180, 180, 180);
              doc.setFont(undefined, 'normal');
              doc.text('No Image', margin + 8, currentRowY + rowHeight / 2);
            }
          } else {
            doc.setFontSize(10);
            doc.setTextColor(180, 180, 180);
            doc.setFont(undefined, 'normal');
            doc.text('No Image', margin + 8, currentRowY + rowHeight / 2);
          }
          
          yPos = currentRowY + rowHeight + 3;
        }
      }
    }
  }
  
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
