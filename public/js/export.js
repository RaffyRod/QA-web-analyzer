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
  yPos += 12;
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  const summary = data.summary;
  
  const summaryData = [
    { label: 'Total Images', value: summary.totalImages, color: [30, 30, 30] },
    { label: 'Images without Alt', value: summary.imagesWithoutAlt, color: summary.imagesWithoutAlt > 0 ? [220, 38, 38] : [16, 185, 129] },
    { label: 'Total Links', value: summary.totalLinks, color: [30, 30, 30] },
    { label: 'Links without Accessibility', value: summary.linksWithoutAccessibility, color: summary.linksWithoutAccessibility > 0 ? [220, 38, 38] : [16, 185, 129] },
    { label: 'Total Buttons', value: summary.totalButtons, color: [30, 30, 30] },
    { label: 'Buttons without Accessibility', value: summary.buttonsWithoutAccessibility, color: summary.buttonsWithoutAccessibility > 0 ? [220, 38, 38] : [16, 185, 129] },
    { label: 'Total Inputs', value: summary.totalInputs, color: [30, 30, 30] },
    { label: 'Inputs without Accessibility', value: summary.inputsWithoutAccessibility, color: summary.inputsWithoutAccessibility > 0 ? [220, 38, 38] : [16, 185, 129] },
  ];
  
  summaryData.forEach(item => {
    doc.setTextColor(item.color[0], item.color[1], item.color[2]);
    doc.text(`${item.label}: ${item.value}`, margin, yPos);
    yPos += 6;
  });
  
  yPos += 5;
  doc.setTextColor(0, 0, 0);
  
  const items = [];
  
  data.images.forEach(img => {
    if (!img.hasAlt && img.screenshot) {
      items.push({
        type: 'Image',
        screenshot: img.screenshot,
        missingAttributes: ['Alt Text'],
        index: img.index
      });
    }
  });
  
  data.links.forEach(link => {
    if (link.missingAttributes.length > 0 && link.screenshot) {
      items.push({
        type: 'Link',
        screenshot: link.screenshot,
        missingAttributes: link.missingAttributes,
        index: link.index,
        text: link.text
      });
    }
  });
  
  data.buttons.forEach(btn => {
    if (btn.missingAttributes.length > 0 && btn.screenshot) {
      items.push({
        type: 'Button',
        screenshot: btn.screenshot,
        missingAttributes: btn.missingAttributes,
        index: btn.index,
        text: btn.text
      });
    }
  });
  
  data.inputs.forEach(input => {
    if (input.missingAttributes.length > 0 && input.screenshot) {
      items.push({
        type: 'Input',
        screenshot: input.screenshot,
        missingAttributes: input.missingAttributes,
        index: input.index,
        typeName: input.type
      });
    }
  });
  
  data.roles.forEach(role => {
    if (role.missingAttributes.length > 0 && role.screenshot) {
      items.push({
        type: 'Role',
        screenshot: role.screenshot,
        missingAttributes: role.missingAttributes,
        index: role.index,
        role: role.role
      });
    }
  });
  
  if (items.length > 0) {
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, yPos, pageWidth - margin * 2, 10, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Issues Found', margin + 2, yPos + 7);
    yPos += 12;
  }
  
  for (const item of items) {
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
    
    const rowHeight = Math.max(35, 15 + (item.missingAttributes.length * 5));
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
    doc.setTextColor(220, 38, 38);
    const missingText = `Missing: ${item.missingAttributes.join(', ')}`;
    const missingLines = doc.splitTextToSize(missingText, textWidth - 4);
    doc.text(missingLines, margin + imageWidth + 4, currentRowY + 15);
    
    if (item.text) {
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      const cleanText = item.text.replace(/[^\x20-\x7E]/g, '').substring(0, 60);
      const textLines = doc.splitTextToSize(`Text: ${cleanText}`, textWidth - 4);
      doc.text(textLines, margin + imageWidth + 4, currentRowY + 22);
    }
    
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
          doc.text('Image', margin + 8, currentRowY + rowHeight / 2);
          resolve();
        };
        
        if (item.screenshot && (item.screenshot.startsWith('data:image') || item.screenshot.startsWith('http'))) {
          img.src = item.screenshot;
        } else {
          resolve();
        }
      });
    } catch (error) {
      doc.setFontSize(10);
      doc.setTextColor(180, 180, 180);
      doc.setFont(undefined, 'normal');
      doc.text('Image', margin + 8, currentRowY + rowHeight / 2);
    }
    
    yPos = currentRowY + rowHeight + 3;
  }
  
  return doc;
};
