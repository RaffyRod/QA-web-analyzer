/**
 * @author RaffyRod (https://github.com/RaffyRod)
 */

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref<'en' | 'es'>(
    (localStorage.getItem('language') as 'en' | 'es') || 'en'
  );

  const translations = {
    en: {
      title: 'QA Web Analyzer',
      subtitle: 'Accessibility Analysis Tool',
      urlPlaceholder: 'Enter URL (e.g., http://localhost:3000 or https://example.com)',
      saveUrl: 'Save URL',
      savedUrls: 'Saved URLs',
      selectSavedUrl: 'Select a saved URL',
      noSavedUrls: 'No saved URLs',
      urlSaved: 'URL saved',
      urlRemoved: 'URL removed',
      maxUrlsReached: 'Maximum of 10 URLs reached. Remove one to save a new URL.',
      removeUrl: 'Remove',
      maxUrlsReachedTitle: 'Maximum URLs Reached',
      maxUrlsReachedMessage:
        'You have reached the maximum of 10 saved URLs. Please remove one to save a new URL.',
      selectUrlToRemove: 'Select a URL to remove:',
      analyzeBtn: 'Analyze',
      analyzing: '🔍 Analyzing page...',
      analysisOptions: 'Analysis Options',
      fullWcagMode: 'Full WCAG Mode',
      fullWcagModeHint:
        'When enabled, applies WCAG rules (visible text, image alt in links). When disabled, only validates selected attributes.',
      elementsToCheck: 'Elements to Check',
      attributesToCheck: 'Attributes to Check',
      images: 'Images',
      links: 'Links',
      buttons: 'Buttons',
      inputs: 'Inputs',
      elementsWithRole: 'Elements with Role',
      headings: 'Headings (h1-h6)',
      tables: 'Tables',
      formElements: 'Form Elements (select, textarea)',
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
      ariaChecked: 'aria-checked',
      ariaDisabled: 'aria-disabled',
      ariaPressed: 'aria-pressed',
      ariaBusy: 'aria-busy',
      ariaLive: 'aria-live',
      autocomplete: 'autocomplete',
      required: 'required',
      tabIndex: 'tabindex',
      lang: 'lang',
      labelElements: '<label> elements',
      titleAttribute: 'title attribute',
      focusStates: 'Focus States (WCAG 2.2 AA)',
      href: 'href',
      selectAll: 'All',
      deselectAll: 'None',
      showMore: 'Show More',
      showLess: 'Show Less',
      search: 'Search...',
      searchPlaceholder: 'Search attributes and elements...',
      typeMore: 'Type at least 3 characters to search',
      clearSearch: 'Clear search',
      noResults: 'No results found',
      categoryAriaLabels: 'ARIA Labels & Names',
      categoryAriaStates: 'ARIA States',
      categoryAriaRelationships: 'ARIA Relationships',
      categoryAriaLiveRegions: 'ARIA Live Regions',
      categoryFormAttributes: 'Form Attributes',
      categoryOtherAttributes: 'Other Attributes',
      summary: 'Summary',
      errorUrlRequired: 'Please enter a URL',
      errorInvalidUrl: 'URL must start with http:// or https://',
      hintUrlRequired: 'Please enter a URL to analyze',
      errorAnalysisFailed: 'Failed to analyze page',
      errorNoElementsSelected:
        '⚠️ You must select at least one element to check before starting the analysis.',
      errorNoAttributesSelected:
        '⚠️ You must select at least one attribute to check before starting the analysis.',
      errorNoElementsOrAttributesSelected:
        '⚠️ You must select at least one element and one attribute to check before starting the analysis.',
      totalImages: 'Total Images',
      imagesWithoutAlt: 'Images Without Alt',
      imagesWithoutFocusState: 'Images Without Focus State',
      totalLinks: 'Total Links',
      linksWithoutAccessibility: 'Links Without Accessibility',
      linksWithoutFocusState: 'Links Without Focus State',
      totalButtons: 'Total Buttons',
      buttonsWithoutAccessibility: 'Buttons Without Accessibility',
      buttonsWithoutFocusState: 'Buttons Without Focus State',
      totalInputs: 'Total Inputs',
      inputsWithoutAccessibility: 'Inputs Without Accessibility',
      totalRoles: 'Total Roles',
      rolesWithoutAccessibility: 'Roles Without Accessibility',
      filters: 'Filters',
      showMissing: 'Show Missing',
      showHasAttributes: 'Show Has Attributes',
      showSections: 'Show Sections',
      noImages: 'No images found',
      noLinks: 'No links found',
      noButtons: 'No buttons found',
      noInputs: 'No inputs found',
      noRoles: 'No roles found',
      noText: 'No text',
      none: 'None',
      missing: 'Missing',
      htmlCode: 'HTML Code',
      expand: 'Expand',
      collapse: 'Collapse',
      exportAsPDF: 'Export as PDF',
      exportReport: 'Export Report',
      exporting: 'Exporting...',
      exported: 'Exported',
      errorNoReport: 'No report available to export',
      errorExportFailed: 'Export failed',
      stop: 'Stop',
      analysisCancelled: 'Analysis cancelled successfully',
      confirmCancelTitle: 'Cancel Analysis?',
      confirmCancelMessage: 'Are you sure you want to cancel the current analysis?',
      confirmCancel: 'Yes, Cancel',
      keepAnalyzing: 'No, Keep Analyzing',
      analysisCompleted: 'Analysis completed',
      analysisCompletedMessage: 'The page analysis has been completed successfully.',
      exportPDF: 'Export PDF',
      reportFormat: 'Report Format',
      pdfFormat: 'PDF',
      htmlFormat: 'HTML',
      exportFormatInfo:
        'Select the format(s) for your report. You can export as PDF, HTML, or both.',
      elementsToInclude: 'Elements to Include',
      resultsStatus: 'Results Status',
      passed: 'Passed',
      failed: 'Failed',
      exportStatusInfo:
        'Select which results to include in the report. You can export only passed items, only failed items, or both.',
      additionalOptions: 'Additional Options',
      includeSummary: 'Include Summary',
      includeScreenshots: 'Include Screenshots',
      includeHTML: 'Include HTML Code',
      validationPassedReason:
        'Validation passed because the required accessibility attribute was found in this element.',
      validationFailedReason:
        'Validation failed because the required accessibility attribute(s) are missing from this element.',
      validationPassedReasonImage:
        'Validation passed because this image has alternative text (alt, aria-label, or aria-labelledby) as required by WCAG 2.2 AA.',
      validationFailedReasonImage:
        'Validation failed because this image is missing alternative text. Images must have alt, aria-label, or aria-labelledby per WCAG 2.2 AA.',
      validationPassedReasonLink:
        'Validation passed because this link has an accessible name (aria-label, aria-labelledby, title, or visible text).',
      validationFailedReasonLink:
        'Validation failed because this link is missing an accessible name. Links must have aria-label, aria-labelledby, title, or visible text.',
      validationPassedReasonButton:
        'Validation passed because this button has an accessible name (aria-label, aria-labelledby, or visible text).',
      validationFailedReasonButton:
        'Validation failed because this button is missing an accessible name. Buttons must have aria-label, aria-labelledby, or visible text.',
      validationPassedReasonInput:
        'Validation passed because this input has an accessible name (aria-label, aria-labelledby, or associated label).',
      validationFailedReasonInput:
        'Validation failed because this input is missing an accessible name. Inputs must have aria-label, aria-labelledby, or an associated label element.',
      validationPassedReasonRole:
        'Validation passed because this element with role has an accessible name (aria-label or aria-labelledby).',
      validationFailedReasonRole:
        'Validation failed because this element with role is missing an accessible name. Elements with roles must have aria-label or aria-labelledby.',
      attributeHighlighted: 'Highlighted attribute',
      elementScreenshot: 'Element Screenshot',
      analyzedImage: 'Analyzed Image',
      visibleText: 'Visible Text',
      noAttributesRequired:
        'No accessibility attributes required (validation passed because no attributes were checked in analysis options)',
      notValidatedNoAttributes:
        'Not validated - No attributes selected for validation in analysis options',
      notValidatedExplanation:
        'This element was not validated because no accessibility attributes were selected for validation in the analysis options. Please select at least one attribute to check for this element type.',
      wcagVisibleTextNote:
        'ℹ️ WCAG 2.2 AA: Visible text is always a valid accessible name. This element passes because it has visible text content, which meets accessibility requirements.',
      wcagImageAltInLinkNote:
        "ℹ️ WCAG 2.2 AA: When a link contains only an image, the alt text of the image becomes the accessible name of the link. This link passes because the image has alt text, which serves as the link's accessible name.",
      cancel: 'Cancel',
      wcagGuidelines: 'WCAG 2.2 AA Accessibility Guidelines',
      close: 'Close',
      wcagAltText: 'Alt Text',
      wcagAltTextDesc:
        'All images must have descriptive <strong>alt</strong> attributes. Decorative images should use <strong>alt=""</strong>.',
      wcagAltTextNote:
        '<strong>For Images:</strong> According to WCAG 2.2 AA, images must have alternative text via <strong>alt</strong> (preferred), <strong>aria-label</strong>, or <strong>aria-labelledby</strong>. If an image has <strong>alt</strong>, <strong>aria-label</strong> is not required. If no <strong>alt</strong> is present, the image must have either <strong>aria-label</strong> or <strong>aria-labelledby</strong>.',
      wcagAriaLabel: 'aria-label',
      wcagAriaLabelDesc:
        "Provides an accessible name for elements that don't have visible text labels.",
      wcagAriaLabelNote:
        '<strong>For Images:</strong> <strong>aria-label</strong> can be used as alternative text for images, but <strong>alt</strong> is the preferred method. If an image has <strong>alt</strong>, <strong>aria-label</strong> is not required. Only mark as missing if the image has no <strong>alt</strong> and no <strong>aria-label</strong>.',
      wcagAriaLabelledby: 'aria-labelledby',
      wcagAriaLabelledbyDesc: 'References another element that provides the accessible name.',
      wcagAriaLabelledbyNote:
        '<strong>For Images:</strong> <strong>aria-labelledby</strong> can be used as alternative text for images, but <strong>alt</strong> is the preferred method. If an image has <strong>alt</strong>, <strong>aria-labelledby</strong> is not required.',
      wcagAriaDescribedby: 'aria-describedby',
      wcagAriaDescribedbyDesc:
        'References elements that provide additional descriptive information.',
      wcagAriaHidden: 'aria-hidden',
      wcagAriaHiddenDesc:
        'Should be used carefully. Hides decorative elements from screen readers.',
      wcagAriaExpanded: 'aria-expanded',
      wcagAriaExpandedDesc: 'Indicates whether collapsible elements are expanded or collapsed.',
      wcagAriaControls: 'aria-controls',
      wcagAriaControlsDesc: 'Identifies elements controlled by the current element.',
      wcagAriaCurrent: 'aria-current',
      wcagAriaCurrentDesc: 'Indicates the current item in a set of related elements.',
      wcagAriaRequired: 'aria-required',
      wcagAriaRequiredDesc: 'Indicates that user input is required for form controls.',
      wcagAriaInvalid: 'aria-invalid',
      wcagAriaInvalidDesc: 'Indicates that the value entered is invalid.',
      wcagTabIndex: 'tabindex',
      wcagTabIndexDesc:
        'Controls keyboard navigation. Use <strong>tabindex="0"</strong> for focusable elements, avoid positive values.',
      wcagLang: 'lang',
      wcagLangDesc: "Specifies the language of the element's content for screen readers.",
      wcagLabelElements: '<label> elements',
      wcagLabelElementsDesc:
        'All form inputs should have associated <strong>&lt;label&gt;</strong> elements.',
      wcagTitleAttribute: 'title attribute',
      wcagTitleAttributeDesc:
        'Provides additional tooltip information, but should not be the only way to convey important information.',
      wcagFocusStates: 'Focus States',
      wcagFocusStatesDesc:
        'All interactive elements must have visible focus indicators that meet WCAG 2.2 AA contrast requirements.',
      wcagAriaChecked: 'aria-checked',
      wcagAriaCheckedDesc:
        'Indicates the checked state of checkboxes, radio buttons, and other toggleable elements. Required for custom controls.',
      wcagAriaDisabled: 'aria-disabled',
      wcagAriaDisabledDesc:
        'Indicates that an element is disabled but still visible. Use with interactive elements that cannot be activated.',
      wcagAriaPressed: 'aria-pressed',
      wcagAriaPressedDesc:
        'Indicates the pressed state of toggle buttons. Use for buttons that can be toggled on/off.',
      wcagAriaBusy: 'aria-busy',
      wcagAriaBusyDesc:
        'Indicates that an element is being modified and assistive technologies may need to wait before presenting updates.',
      wcagAriaLive: 'aria-live',
      wcagAriaLiveDesc:
        'Indicates that an element will be updated and describes the types of updates. Use for dynamic content regions.',
      wcagAriaLiveNote:
        '<strong>Values:</strong> <strong>off</strong> (default), <strong>polite</strong> (announce when idle), <strong>assertive</strong> (announce immediately).',
      wcagAutocomplete: 'autocomplete',
      wcagAutocompleteDesc:
        'Helps users fill out forms faster and more accurately. Required for certain input types per WCAG 2.2 AA.',
      wcagAutocompleteNote:
        '<strong>Common values:</strong> name, email, tel, url, address-line1, country, etc.',
      wcagRequired: 'required',
      wcagRequiredDesc:
        'Indicates that a form field must be filled out before submission. Provides visual and programmatic indication.',
      wcagHeadings: 'Headings (h1-h6)',
      wcagHeadingsDesc:
        'Provide semantic structure to content. Must have proper hierarchy (one h1 per page, no skipped levels).',
      wcagHeadingsNote:
        '<strong>Best Practice:</strong> Use headings to organize content logically. Screen readers use them for navigation.',
      wcagTables: 'Tables',
      wcagTablesDesc:
        'Data tables must have proper headers (th elements) with scope attributes, and optionally caption or summary.',
      wcagTablesNote:
        '<strong>Requirements:</strong> Use <strong>scope</strong> on th elements (col, row, colgroup, rowgroup). Complex tables may need <strong>headers</strong> attribute on td.',
      wcagFormElements: 'Form Elements (select, textarea)',
      wcagFormElementsDesc:
        'Form controls must have associated labels and proper accessibility attributes. Select elements need accessible options.',
      wcagFormElementsNote:
        '<strong>Requirements:</strong> All form elements should have <strong>label</strong> elements or <strong>aria-label</strong>/<strong>aria-labelledby</strong>.',
    },
    es: {
      title: 'QA Web Analyzer',
      subtitle: 'Herramienta de Análisis de Accesibilidad',
      urlPlaceholder: 'Ingresa URL (ej: http://localhost:3000 o https://example.com)',
      saveUrl: 'Guardar URL',
      savedUrls: 'URLs Guardadas',
      selectSavedUrl: 'Selecciona una URL guardada',
      noSavedUrls: 'No hay URLs guardadas',
      urlSaved: 'URL guardada',
      urlRemoved: 'URL eliminada',
      maxUrlsReached: 'Máximo de 10 URLs alcanzado. Elimina una para guardar una nueva URL.',
      removeUrl: 'Eliminar',
      maxUrlsReachedTitle: 'Máximo de URLs Alcanzado',
      maxUrlsReachedMessage:
        'Has alcanzado el máximo de 10 URLs guardadas. Por favor, elimina una para guardar una nueva URL.',
      selectUrlToRemove: 'Selecciona una URL para eliminar:',
      analyzeBtn: 'Analizar',
      analyzing: '🔍 Analizando página...',
      analysisOptions: 'Opciones de Análisis',
      elementsToCheck: 'Elementos a Verificar',
      attributesToCheck: 'Atributos a Verificar',
      images: 'Imágenes',
      links: 'Enlaces',
      buttons: 'Botones',
      inputs: 'Inputs',
      elementsWithRole: 'Elementos con Role',
      headings: 'Encabezados (h1-h6)',
      tables: 'Tablas',
      formElements: 'Elementos de Formulario (select, textarea)',
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
      ariaChecked: 'aria-checked',
      ariaDisabled: 'aria-disabled',
      ariaPressed: 'aria-pressed',
      ariaBusy: 'aria-busy',
      ariaLive: 'aria-live',
      autocomplete: 'autocomplete',
      required: 'required',
      tabIndex: 'tabindex',
      lang: 'lang',
      labelElements: 'elementos <label>',
      titleAttribute: 'atributo title',
      focusStates: 'Estados de Foco (WCAG 2.2 AA)',
      href: 'href',
      selectAll: 'Todo',
      deselectAll: 'Ninguno',
      showMore: 'Mostrar Más',
      showLess: 'Mostrar Menos',
      search: 'Buscar...',
      searchPlaceholder: 'Buscar atributos y elementos...',
      typeMore: 'Escribe al menos 3 caracteres para buscar',
      clearSearch: 'Limpiar búsqueda',
      noResults: 'No se encontraron resultados',
      categoryAriaLabels: 'Etiquetas y Nombres ARIA',
      categoryAriaStates: 'Estados ARIA',
      categoryAriaRelationships: 'Relaciones ARIA',
      categoryAriaLiveRegions: 'Regiones ARIA Live',
      categoryFormAttributes: 'Atributos de Formulario',
      categoryOtherAttributes: 'Otros Atributos',
      summary: 'Resumen',
      errorUrlRequired: 'Por favor ingresa una URL',
      errorInvalidUrl: 'La URL debe comenzar con http:// o https://',
      hintUrlRequired: 'Por favor ingresa una URL para analizar',
      errorAnalysisFailed: 'Error al analizar la página',
      errorNoElementsSelected:
        '⚠️ Debes seleccionar al menos un elemento a verificar antes de iniciar el análisis.',
      errorNoAttributesSelected:
        '⚠️ Debes seleccionar al menos un atributo a verificar antes de iniciar el análisis.',
      errorNoElementsOrAttributesSelected:
        '⚠️ Debes seleccionar al menos un elemento y un atributo a verificar antes de iniciar el análisis.',
      totalImages: 'Total de Imágenes',
      imagesWithoutAlt: 'Imágenes Sin Alt',
      imagesWithoutFocusState: 'Imágenes Sin Estado de Foco',
      totalLinks: 'Total de Enlaces',
      linksWithoutAccessibility: 'Enlaces Sin Accesibilidad',
      linksWithoutFocusState: 'Enlaces Sin Estado de Foco',
      totalButtons: 'Total de Botones',
      buttonsWithoutAccessibility: 'Botones Sin Accesibilidad',
      buttonsWithoutFocusState: 'Botones Sin Estado de Foco',
      totalInputs: 'Total de Inputs',
      inputsWithoutAccessibility: 'Inputs Sin Accesibilidad',
      totalRoles: 'Total de Roles',
      rolesWithoutAccessibility: 'Roles Sin Accesibilidad',
      filters: 'Filtros',
      showMissing: 'Mostrar Faltantes',
      showHasAttributes: 'Mostrar Con Atributos',
      showSections: 'Mostrar Secciones',
      noImages: 'No se encontraron imágenes',
      noLinks: 'No se encontraron enlaces',
      noButtons: 'No se encontraron botones',
      noInputs: 'No se encontraron inputs',
      noRoles: 'No se encontraron roles',
      noText: 'Sin texto',
      none: 'Ninguno',
      missing: 'Faltante',
      htmlCode: 'Código HTML',
      expand: 'Expandir',
      collapse: 'Contraer',
      exportAsPDF: 'Exportar como PDF',
      exportReport: 'Exportar Reporte',
      exporting: 'Exportando...',
      exported: 'Exportado',
      errorNoReport: 'No hay reporte disponible para exportar',
      errorExportFailed: 'Error al exportar',
      stop: 'Detener',
      analysisCancelled: 'Análisis cancelado exitosamente',
      confirmCancelTitle: '¿Cancelar Análisis?',
      confirmCancelMessage: '¿Estás seguro de que quieres cancelar el análisis actual?',
      confirmCancel: 'Sí, Cancelar',
      keepAnalyzing: 'No, Continuar Analizando',
      analysisCompleted: 'Análisis completado',
      analysisCompletedMessage: 'El análisis de la página se ha completado exitosamente.',
      exportPDF: 'Exportar PDF',
      reportFormat: 'Formato de Reporte',
      pdfFormat: 'PDF',
      htmlFormat: 'HTML',
      exportFormatInfo:
        'Selecciona el formato(s) para tu reporte. Puedes exportar como PDF, HTML, o ambos.',
      elementsToInclude: 'Elementos a Incluir',
      resultsStatus: 'Estado de Resultados',
      passed: 'Aprobado',
      failed: 'Fallido',
      exportStatusInfo:
        'Selecciona qué resultados incluir en el reporte. Puedes exportar solo elementos aprobados, solo fallidos, o ambos.',
      additionalOptions: 'Opciones Adicionales',
      includeSummary: 'Incluir Resumen',
      includeScreenshots: 'Incluir Capturas',
      includeHTML: 'Incluir Código HTML',
      validationPassedReason:
        'La validación pasó porque se encontró el atributo de accesibilidad requerido en este elemento.',
      validationFailedReason:
        'La validación falló porque faltan los atributos de accesibilidad requeridos en este elemento.',
      validationPassedReasonImage:
        'La validación pasó porque esta imagen tiene texto alternativo (alt, aria-label, o aria-labelledby) según lo requerido por WCAG 2.2 AA.',
      validationFailedReasonImage:
        'La validación falló porque esta imagen no tiene texto alternativo. Las imágenes deben tener alt, aria-label, o aria-labelledby según WCAG 2.2 AA.',
      validationPassedReasonLink:
        'La validación pasó porque este enlace tiene un nombre accesible (aria-label, aria-labelledby, title, o texto visible).',
      validationFailedReasonLink:
        'La validación falló porque este enlace no tiene un nombre accesible. Los enlaces deben tener aria-label, aria-labelledby, title, o texto visible.',
      validationPassedReasonButton:
        'La validación pasó porque este botón tiene un nombre accesible (aria-label, aria-labelledby, o texto visible).',
      validationFailedReasonButton:
        'La validación falló porque este botón no tiene un nombre accesible. Los botones deben tener aria-label, aria-labelledby, o texto visible.',
      validationPassedReasonInput:
        'La validación pasó porque este input tiene un nombre accesible (aria-label, aria-labelledby, o label asociado).',
      validationFailedReasonInput:
        'La validación falló porque este input no tiene un nombre accesible. Los inputs deben tener aria-label, aria-labelledby, o un elemento label asociado.',
      validationPassedReasonRole:
        'La validación pasó porque este elemento con role tiene un nombre accesible (aria-label o aria-labelledby).',
      validationFailedReasonRole:
        'La validación falló porque este elemento con role no tiene un nombre accesible. Los elementos con roles deben tener aria-label o aria-labelledby.',
      attributeHighlighted: 'Atributo resaltado',
      elementScreenshot: 'Captura del Elemento',
      analyzedImage: 'Imagen Analizada',
      visibleText: 'Texto Visible',
      noAttributesRequired:
        'No se requieren atributos de accesibilidad (la validación pasó porque no se verificaron atributos en las opciones de análisis)',
      notValidatedNoAttributes:
        'No validado - No se seleccionaron atributos para validación en las opciones de análisis',
      notValidatedExplanation:
        'Este elemento no fue validado porque no se seleccionaron atributos de accesibilidad para validación en las opciones de análisis. Por favor, seleccione al menos un atributo para verificar para este tipo de elemento.',
      wcagVisibleTextNote:
        'ℹ️ WCAG 2.2 AA: El texto visible es siempre un nombre accesible válido. Este elemento pasa porque tiene contenido de texto visible, lo cual cumple con los requisitos de accesibilidad.',
      wcagImageAltInLinkNote:
        'ℹ️ WCAG 2.2 AA: Cuando un enlace contiene solo una imagen, el texto alternativo (alt) de la imagen se convierte en el nombre accesible del enlace. Este enlace pasa porque la imagen tiene texto alternativo, que sirve como nombre accesible del enlace.',
      cancel: 'Cancelar',
      wcagGuidelines: 'Guías de Accesibilidad WCAG 2.2 AA',
      close: 'Cerrar',
      wcagAltText: 'Texto Alt',
      wcagAltTextDesc:
        'Todas las imágenes deben tener atributos <strong>alt</strong> descriptivos. Las imágenes decorativas deben usar <strong>alt=""</strong>.',
      wcagAltTextNote:
        '<strong>Para Imágenes:</strong> Según WCAG 2.2 AA, las imágenes deben tener texto alternativo mediante <strong>alt</strong> (preferido), <strong>aria-label</strong>, o <strong>aria-labelledby</strong>. Si una imagen tiene <strong>alt</strong>, <strong>aria-label</strong> no es requerido. Si no hay <strong>alt</strong>, la imagen debe tener <strong>aria-label</strong> o <strong>aria-labelledby</strong>.',
      wcagAriaLabel: 'aria-label',
      wcagAriaLabelDesc:
        'Proporciona un nombre accesible para elementos que no tienen etiquetas de texto visibles.',
      wcagAriaLabelNote:
        '<strong>Para Imágenes:</strong> <strong>aria-label</strong> puede usarse como texto alternativo para imágenes, pero <strong>alt</strong> es el método preferido. Si una imagen tiene <strong>alt</strong>, <strong>aria-label</strong> no es requerido. Solo marcar como faltante si la imagen no tiene <strong>alt</strong> ni <strong>aria-label</strong>.',
      wcagAriaLabelledby: 'aria-labelledby',
      wcagAriaLabelledbyDesc:
        'Hace referencia a otro elemento que proporciona el nombre accesible.',
      wcagAriaLabelledbyNote:
        '<strong>Para Imágenes:</strong> <strong>aria-labelledby</strong> puede usarse como texto alternativo para imágenes, pero <strong>alt</strong> es el método preferido. Si una imagen tiene <strong>alt</strong>, <strong>aria-labelledby</strong> no es requerido.',
      wcagAriaDescribedby: 'aria-describedby',
      wcagAriaDescribedbyDesc:
        'Hace referencia a elementos que proporcionan información descriptiva adicional.',
      wcagAriaHidden: 'aria-hidden',
      wcagAriaHiddenDesc:
        'Debe usarse con cuidado. Oculta elementos decorativos de los lectores de pantalla.',
      wcagAriaExpanded: 'aria-expanded',
      wcagAriaExpandedDesc: 'Indica si los elementos colapsables están expandidos o contraídos.',
      wcagAriaControls: 'aria-controls',
      wcagAriaControlsDesc: 'Identifica elementos controlados por el elemento actual.',
      wcagAriaCurrent: 'aria-current',
      wcagAriaCurrentDesc: 'Indica el elemento actual en un conjunto de elementos relacionados.',
      wcagAriaRequired: 'aria-required',
      wcagAriaRequiredDesc:
        'Indica que se requiere entrada del usuario para los controles de formulario.',
      wcagAriaInvalid: 'aria-invalid',
      wcagAriaInvalidDesc: 'Indica que el valor ingresado es inválido.',
      wcagTabIndex: 'tabindex',
      wcagTabIndexDesc:
        'Controla la navegación por teclado. Usa <strong>tabindex="0"</strong> para elementos enfocables, evita valores positivos.',
      wcagLang: 'lang',
      wcagLangDesc: 'Especifica el idioma del contenido del elemento para lectores de pantalla.',
      wcagLabelElements: 'elementos <label>',
      wcagLabelElementsDesc:
        'Todos los inputs de formulario deben tener elementos <strong>&lt;label&gt;</strong> asociados.',
      wcagTitleAttribute: 'atributo title',
      wcagTitleAttributeDesc:
        'Proporciona información adicional de tooltip, pero no debe ser la única forma de transmitir información importante.',
      wcagFocusStates: 'Estados de Foco',
      wcagFocusStatesDesc:
        'Todos los elementos interactivos deben tener indicadores de foco visibles que cumplan con los requisitos de contraste WCAG 2.2 AA.',
      wcagAriaChecked: 'aria-checked',
      wcagAriaCheckedDesc:
        'Indica el estado marcado de casillas, botones de radio y otros elementos alternables. Requerido para controles personalizados.',
      wcagAriaDisabled: 'aria-disabled',
      wcagAriaDisabledDesc:
        'Indica que un elemento está deshabilitado pero aún visible. Usar con elementos interactivos que no pueden activarse.',
      wcagAriaPressed: 'aria-pressed',
      wcagAriaPressedDesc:
        'Indica el estado presionado de botones alternables. Usar para botones que pueden activarse/desactivarse.',
      wcagAriaBusy: 'aria-busy',
      wcagAriaBusyDesc:
        'Indica que un elemento está siendo modificado y las tecnologías asistivas pueden necesitar esperar antes de presentar actualizaciones.',
      wcagAriaLive: 'aria-live',
      wcagAriaLiveDesc:
        'Indica que un elemento será actualizado y describe los tipos de actualizaciones. Usar para regiones de contenido dinámico.',
      wcagAriaLiveNote:
        '<strong>Valores:</strong> <strong>off</strong> (por defecto), <strong>polite</strong> (anunciar cuando esté inactivo), <strong>assertive</strong> (anunciar inmediatamente).',
      wcagAutocomplete: 'autocomplete',
      wcagAutocompleteDesc:
        'Ayuda a los usuarios a completar formularios más rápido y con mayor precisión. Requerido para ciertos tipos de input según WCAG 2.2 AA.',
      wcagAutocompleteNote:
        '<strong>Valores comunes:</strong> name, email, tel, url, address-line1, country, etc.',
      wcagRequired: 'required',
      wcagRequiredDesc:
        'Indica que un campo de formulario debe completarse antes del envío. Proporciona indicación visual y programática.',
      wcagHeadings: 'Encabezados (h1-h6)',
      wcagHeadingsDesc:
        'Proporcionan estructura semántica al contenido. Deben tener jerarquía adecuada (un h1 por página, sin niveles saltados).',
      wcagHeadingsNote:
        '<strong>Mejor Práctica:</strong> Usa encabezados para organizar el contenido lógicamente. Los lectores de pantalla los usan para navegación.',
      wcagTables: 'Tablas',
      wcagTablesDesc:
        'Las tablas de datos deben tener encabezados apropiados (elementos th) con atributos scope, y opcionalmente caption o summary.',
      wcagTablesNote:
        '<strong>Requisitos:</strong> Usa <strong>scope</strong> en elementos th (col, row, colgroup, rowgroup). Las tablas complejas pueden necesitar el atributo <strong>headers</strong> en td.',
      wcagFormElements: 'Elementos de Formulario (select, textarea)',
      wcagFormElementsDesc:
        'Los controles de formulario deben tener etiquetas asociadas y atributos de accesibilidad apropiados. Los elementos select necesitan opciones accesibles.',
      wcagFormElementsNote:
        '<strong>Requisitos:</strong> Todos los elementos de formulario deben tener elementos <strong>label</strong> o <strong>aria-label</strong>/<strong>aria-labelledby</strong>.',
    },
  };

  function setLanguage(lang: 'en' | 'es') {
    currentLanguage.value = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }

  function t(key: string): string {
    return translations[currentLanguage.value][key as keyof typeof translations.en] || key;
  }

  return {
    currentLanguage,
    translations,
    setLanguage,
    t,
  };
});
