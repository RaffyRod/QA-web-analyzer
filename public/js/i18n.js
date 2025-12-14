const translations = {
  en: {
    title: 'QA Web Analyzer',
    subtitle: 'Accessibility Analysis Tool',
    urlPlaceholder: 'Enter URL (e.g., http://localhost:3000 or https://example.com)',
    analyzeBtn: 'Analyze',
    analyzing: 'Analyzing page...',
    analysisOptions: 'Analysis Options',
    elementsToCheck: 'Elements to Check',
    attributesToCheck: 'Attributes to Check',
    images: 'Images',
    links: 'Links',
    buttons: 'Buttons',
    inputs: 'Inputs',
    elementsWithRole: 'Elements with Role',
    altText: 'Alt Text',
    ariaLabel: 'aria-label',
    ariaLabelledby: 'aria-labelledby',
    ariaDescribedby: 'aria-describedby',
    ariaHidden: 'aria-hidden',
    ariaExpanded: 'aria-expanded',
    ariaControls: 'aria-controls',
    ariaCurrent: 'aria-current',
    ariaRequired: 'aria-required',
    ariaInvalid: 'aria-invalid',
    tabIndex: 'tabindex',
    lang: 'lang',
    labelElements: '<label> elements',
    titleAttribute: 'title attribute',
    summary: 'Summary',
    filters: 'Filters',
    showMissing: 'Show only missing accessibility attributes',
    showHasAttributes: 'Show elements with accessibility attributes',
    showSections: 'Show Sections',
    imagesAltText: 'Images (Alt Text)',
    totalImages: 'Total Images',
    imagesWithoutAlt: 'Images without Alt',
    totalLinks: 'Total Links',
    linksWithoutAccessibility: 'Links without Accessibility',
    totalButtons: 'Total Buttons',
    buttonsWithoutAccessibility: 'Buttons without Accessibility',
    totalInputs: 'Total Inputs',
    inputsWithoutAccessibility: 'Inputs without Accessibility',
    totalRoles: 'Elements with Role',
    rolesWithoutAccessibility: 'Roles without Accessibility',
    source: 'Source:',
    href: 'Href:',
    type: 'Type:',
    name: 'Name:',
    htmlCode: 'HTML Code:',
    none: 'NONE',
    noText: '(no text)',
    noResults: 'No results found',
    noImages: 'No images found',
    noLinks: 'No links found',
    noButtons: 'No buttons found',
    noInputs: 'No inputs found',
    noRoles: 'No elements with role found',
    missing: 'Missing',
    exportReport: 'Export Report as Image',
    exporting: 'Exporting...',
    exported: 'Exported!',
    errorUrlRequired: 'Please enter a URL',
    errorInvalidUrl: 'URL must start with http:// or https://',
    errorNoReport: 'No report available to export',
    errorExportFailed: 'Failed to export report',
    errorAnalysisFailed: 'Failed to analyze page',
    expand: 'Expand',
    collapse: 'Collapse',
    screenshot: 'Screenshot',
    stopBtn: 'Stop',
    analysisCancelled: 'Analysis cancelled',
    selectTheme: 'Theme:',
    exportAsImage: 'Export as Image',
    exportAsPDF: 'Export as PDF',
    focusStates: 'Focus States (WCAG 2.2 AA)',
    imagesWithoutFocusState: 'Images without Focus State',
    linksWithoutFocusState: 'Links without Focus State',
    buttonsWithoutFocusState: 'Buttons without Focus State',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    // PDF translations
    pdfTitle: 'QA-web-analyzer Accessibility Report',
    pdfSummary: 'Summary',
    pdfTotalImages: 'Total Images',
    pdfWithoutAlt: 'Without Alt',
    pdfTotalLinks: 'Total Links',
    pdfLinkIssues: 'Link Issues',
    pdfIssuesFound: 'Issues Found',
    pdfElementsWithAccessibility: 'Elements with Accessibility',
    pdfAllElements: 'All Elements',
    pdfFilters: 'Filters',
    pdfMissingAttributes: 'Missing Attributes',
    pdfWithAttributes: 'With Attributes',
    pdfMissing: 'Missing',
    pdfAllAttributesPresent: 'All attributes present',
    pdfText: 'Text',
    pdfAlt: 'Alt',
    pdfURL: 'URL',
    pdfType: 'Type',
    pdfRole: 'Role',
    pdfSelector: 'Selector',
    pdfNoImage: 'No Image',
    pdfImages: 'Images',
    pdfLinks: 'Links',
    pdfButtons: 'Buttons',
    pdfInputs: 'Inputs',
    pdfRoles: 'Roles',
    pdfDate: 'Date',
    pdfPassed: 'Passed',
    pdfFailed: 'Failed',
  },
  es: {
    title: 'QA Web Analyzer',
    subtitle: 'Herramienta de Análisis de Accesibilidad',
    urlPlaceholder: 'Ingresa URL (ej: http://localhost:3000 o https://example.com)',
    analyzeBtn: 'Analizar',
    analyzing: 'Analizando página...',
    analysisOptions: 'Opciones de Análisis',
    elementsToCheck: 'Elementos a Verificar',
    attributesToCheck: 'Atributos a Verificar',
    images: 'Imágenes',
    links: 'Enlaces',
    buttons: 'Botones',
    inputs: 'Inputs',
    elementsWithRole: 'Elementos con Role',
    altText: 'Texto Alt',
    ariaLabel: 'aria-label',
    ariaLabelledby: 'aria-labelledby',
    ariaDescribedby: 'aria-describedby',
    ariaHidden: 'aria-hidden',
    ariaExpanded: 'aria-expanded',
    ariaControls: 'aria-controls',
    ariaCurrent: 'aria-current',
    ariaRequired: 'aria-required',
    ariaInvalid: 'aria-invalid',
    tabIndex: 'tabindex',
    lang: 'lang',
    labelElements: 'elementos &lt;label&gt;',
    titleAttribute: 'atributo title',
    summary: 'Resumen',
    filters: 'Filtros',
    showMissing: 'Mostrar solo elementos sin atributos de accesibilidad',
    showHasAttributes: 'Mostrar elementos con atributos de accesibilidad',
    showSections: 'Mostrar Secciones',
    imagesAltText: 'Imágenes (Texto Alt)',
    totalImages: 'Total de Imágenes',
    imagesWithoutAlt: 'Imágenes sin Alt',
    totalLinks: 'Total de Enlaces',
    linksWithoutAccessibility: 'Enlaces sin Accesibilidad',
    totalButtons: 'Total de Botones',
    buttonsWithoutAccessibility: 'Botones sin Accesibilidad',
    totalInputs: 'Total de Inputs',
    inputsWithoutAccessibility: 'Inputs sin Accesibilidad',
    totalRoles: 'Elementos con Role',
    rolesWithoutAccessibility: 'Roles sin Accesibilidad',
    source: 'Fuente:',
    href: 'Href:',
    type: 'Tipo:',
    name: 'Nombre:',
    htmlCode: 'Código HTML:',
    none: 'NINGUNO',
    noText: '(sin texto)',
    noResults: 'No se encontraron resultados',
    noImages: 'No se encontraron imágenes',
    noLinks: 'No se encontraron enlaces',
    noButtons: 'No se encontraron botones',
    noInputs: 'No se encontraron inputs',
    noRoles: 'No se encontraron elementos con role',
    missing: 'Falta',
    exportReport: 'Exportar Reporte como Imagen',
    exporting: 'Exportando...',
    exported: '¡Exportado!',
    errorUrlRequired: 'Por favor ingresa una URL',
    errorInvalidUrl: 'La URL debe comenzar con http:// o https://',
    errorNoReport: 'No hay reporte disponible para exportar',
    errorExportFailed: 'Error al exportar el reporte',
    errorAnalysisFailed: 'Error al analizar la página',
    expand: 'Expandir',
    collapse: 'Colapsar',
    screenshot: 'Captura de Pantalla',
    stopBtn: 'Detener',
    analysisCancelled: 'Análisis cancelado',
    selectTheme: 'Tema:',
    exportAsImage: 'Exportar como Imagen',
    exportAsPDF: 'Exportar como PDF',
    focusStates: 'Estados de Foco (WCAG 2.2 AA)',
    imagesWithoutFocusState: 'Imágenes sin Estado de Foco',
    linksWithoutFocusState: 'Enlaces sin Estado de Foco',
    buttonsWithoutFocusState: 'Botones sin Estado de Foco',
    selectAll: 'Seleccionar Todo',
    deselectAll: 'Deseleccionar Todo',
    // PDF translations
    pdfTitle: 'Reporte de Accesibilidad QA-web-analyzer',
    pdfSummary: 'Resumen',
    pdfTotalImages: 'Total de Imágenes',
    pdfWithoutAlt: 'Sin Alt',
    pdfTotalLinks: 'Total de Enlaces',
    pdfLinkIssues: 'Problemas de Enlaces',
    pdfIssuesFound: 'Problemas Encontrados',
    pdfElementsWithAccessibility: 'Elementos con Accesibilidad',
    pdfAllElements: 'Todos los Elementos',
    pdfFilters: 'Filtros',
    pdfMissingAttributes: 'Atributos Faltantes',
    pdfWithAttributes: 'Con Atributos',
    pdfMissing: 'Falta',
    pdfAllAttributesPresent: 'Todos los atributos presentes',
    pdfText: 'Texto',
    pdfAlt: 'Alt',
    pdfURL: 'URL',
    pdfType: 'Tipo',
    pdfRole: 'Rol',
    pdfSelector: 'Selector',
    pdfNoImage: 'Sin Imagen',
    pdfImages: 'Imágenes',
    pdfLinks: 'Enlaces',
    pdfButtons: 'Botones',
    pdfInputs: 'Inputs',
    pdfRoles: 'Roles',
    pdfDate: 'Fecha',
    pdfPassed: 'Pasó',
    pdfFailed: 'Falló',
  },
};

let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
  if (!translations[lang]) {
    lang = 'en';
  }
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  updateUI();
}

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function updateUI() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    if (element.tagName === 'INPUT' && element.type === 'text') {
      element.placeholder = translation;
    } else if (element.tagName === 'INPUT' && element.type === 'checkbox') {
      const label = element.closest('label');
      if (label) {
        const span = label.querySelector('span[data-i18n]');
        if (span) {
          span.textContent = translation;
        } else {
          const textNode = Array.from(label.childNodes).find(
            (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
          );
          if (textNode) {
            textNode.textContent = ' ' + translation;
          }
        }
      }
    } else if (element.tagName === 'BUTTON') {
      element.textContent = translation;
    } else {
      element.textContent = translation;
    }
  });

  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    const key = element.getAttribute('data-i18n-html');
    element.innerHTML = t(key);
  });
}

function initLanguage() {
  const savedLanguage = localStorage.getItem('language') || 'en';
  setLanguage(savedLanguage);

  // Setup language toggle (desktop)
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    // Set initial state based on saved language
    languageToggle.checked = savedLanguage === 'es';

    // Handle toggle change
    languageToggle.addEventListener('change', (e) => {
      const newLang = e.target.checked ? 'es' : 'en';
      setLanguage(newLang);
      // Sync with mobile toggle
      const languageToggleMobile = document.getElementById('languageToggleMobile');
      if (languageToggleMobile) {
        languageToggleMobile.checked = e.target.checked;
      }
    });
  }

  // Setup language toggle (mobile)
  const languageToggleMobile = document.getElementById('languageToggleMobile');
  if (languageToggleMobile) {
    // Set initial state based on saved language
    languageToggleMobile.checked = savedLanguage === 'es';

    // Handle toggle change
    languageToggleMobile.addEventListener('change', (e) => {
      const newLang = e.target.checked ? 'es' : 'en';
      setLanguage(newLang);
      // Sync with desktop toggle
      if (languageToggle) {
        languageToggle.checked = e.target.checked;
      }
    });
  }
}

// Make setLanguage available globally
window.setLanguage = setLanguage;
