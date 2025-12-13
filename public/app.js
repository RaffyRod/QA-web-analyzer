let urlInput, analyzeBtn, stopBtn, loading, error, results;
let filterMissing, filterHasAttributes;
let optionCheckboxes = {};
let currentData = null;
let abortController = null;

function getAnalysisOptions() {
  return {
    checkImages: optionCheckboxes.checkImages?.checked || false,
    checkLinks: optionCheckboxes.checkLinks?.checked || false,
    checkButtons: optionCheckboxes.checkButtons?.checked || false,
    checkInputs: optionCheckboxes.checkInputs?.checked || false,
    checkRoles: optionCheckboxes.checkRoles?.checked || false,
    checkAltText: optionCheckboxes.checkAltText?.checked || false,
    checkAriaLabel: optionCheckboxes.checkAriaLabel?.checked || false,
    checkAriaLabelledby: optionCheckboxes.checkAriaLabelledby?.checked || false,
    checkAriaDescribedby: optionCheckboxes.checkAriaDescribedby?.checked || false,
    checkAriaHidden: optionCheckboxes.checkAriaHidden?.checked || false,
    checkAriaExpanded: optionCheckboxes.checkAriaExpanded?.checked || false,
    checkAriaControls: optionCheckboxes.checkAriaControls?.checked || false,
    checkAriaCurrent: optionCheckboxes.checkAriaCurrent?.checked || false,
    checkAriaRequired: optionCheckboxes.checkAriaRequired?.checked || false,
    checkAriaInvalid: optionCheckboxes.checkAriaInvalid?.checked || false,
    checkTabIndex: optionCheckboxes.checkTabIndex?.checked || false,
    checkLang: optionCheckboxes.checkLang?.checked || false,
    checkLabels: optionCheckboxes.checkLabels?.checked || false,
    checkTitle: optionCheckboxes.checkTitle?.checked || false,
    checkFocusStates: optionCheckboxes.checkFocusStates?.checked || false,
  };
}

async function analyzePage() {
  if (!urlInput) return;
  const url = urlInput.value.trim();
  
  if (!url) {
    showError(t('errorUrlRequired'));
    return;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    showError(t('errorInvalidUrl'));
    return;
  }

  abortController = new AbortController();
  
  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('hidden');
  }
  if (stopBtn) stopBtn.classList.remove('hidden');
  if (loading) loading.classList.remove('hidden');
  if (error) error.classList.add('hidden');
  if (results) results.classList.add('hidden');

  try {
    const options = getAnalysisOptions();
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url, options }),
      signal: abortController.signal,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || t('errorAnalysisFailed'));
    }

    currentData = data;
    window.currentData = data;
    displayResults(data);
  } catch (err) {
    if (err.name === 'AbortError') {
      showError(t('analysisCancelled') || 'Analysis cancelled');
    } else {
      showError(`Error: ${err.message}`);
    }
  } finally {
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.classList.remove('hidden');
    }
    if (stopBtn) stopBtn.classList.add('hidden');
    if (loading) loading.classList.add('hidden');
    abortController = null;
  }
}

function stopAnalysis() {
  if (abortController) {
    abortController.abort();
  }
}

function showError(message) {
  if (error) {
    error.textContent = message;
    error.classList.remove('hidden');
  }
}

function displayResults(data) {
  const options = getAnalysisOptions();
  displaySummary(data.summary);
  displayImages(data.images, options);
  displayLinks(data.links, options);
  displayButtons(data.buttons, options);
  displayInputs(data.inputs, options);
  displayRoles(data.roles, options);
  
  if (results) results.classList.remove('hidden');
  applyFilters();
}

function displaySummary(summary) {
  const summaryGrid = document.getElementById('summaryGrid');
  if (!summaryGrid) return;
  summaryGrid.innerHTML = `
    <div class="summary-card">
      <div class="summary-card-label">${t('totalImages')}</div>
      <div class="summary-card-value">${summary.totalImages}</div>
    </div>
    <div class="summary-card ${summary.imagesWithoutAlt > 0 ? 'danger' : 'success'}">
      <div class="summary-card-label">${t('imagesWithoutAlt')}</div>
      <div class="summary-card-value">${summary.imagesWithoutAlt}</div>
    </div>
    ${summary.imagesWithoutFocusState !== undefined ? `
    <div class="summary-card ${summary.imagesWithoutFocusState > 0 ? 'danger' : 'success'}">
      <div class="summary-card-label">${t('imagesWithoutFocusState')}</div>
      <div class="summary-card-value">${summary.imagesWithoutFocusState}</div>
    </div>
    ` : ''}
    <div class="summary-card">
      <div class="summary-card-label">${t('totalLinks')}</div>
      <div class="summary-card-value">${summary.totalLinks}</div>
    </div>
    <div class="summary-card ${summary.linksWithoutAccessibility > 0 ? 'danger' : 'success'}">
      <div class="summary-card-label">${t('linksWithoutAccessibility')}</div>
      <div class="summary-card-value">${summary.linksWithoutAccessibility}</div>
    </div>
    ${summary.linksWithoutFocusState !== undefined ? `
    <div class="summary-card ${summary.linksWithoutFocusState > 0 ? 'danger' : 'success'}">
      <div class="summary-card-label">${t('linksWithoutFocusState')}</div>
      <div class="summary-card-value">${summary.linksWithoutFocusState}</div>
    </div>
    ` : ''}
    <div class="summary-card">
      <div class="summary-card-label">${t('totalButtons')}</div>
      <div class="summary-card-value">${summary.totalButtons}</div>
    </div>
    <div class="summary-card ${summary.buttonsWithoutAccessibility > 0 ? 'danger' : 'success'}">
      <div class="summary-card-label">${t('buttonsWithoutAccessibility')}</div>
      <div class="summary-card-value">${summary.buttonsWithoutAccessibility}</div>
    </div>
    ${summary.buttonsWithoutFocusState !== undefined ? `
    <div class="summary-card ${summary.buttonsWithoutFocusState > 0 ? 'danger' : 'success'}">
      <div class="summary-card-label">${t('buttonsWithoutFocusState')}</div>
      <div class="summary-card-value">${summary.buttonsWithoutFocusState}</div>
    </div>
    ` : ''}
    <div class="summary-card">
      <div class="summary-card-label">${t('totalInputs')}</div>
      <div class="summary-card-value">${summary.totalInputs}</div>
    </div>
    <div class="summary-card ${summary.inputsWithoutAccessibility > 0 ? 'danger' : 'success'}">
      <div class="summary-card-label">${t('inputsWithoutAccessibility')}</div>
      <div class="summary-card-value">${summary.inputsWithoutAccessibility}</div>
    </div>
    <div class="summary-card">
      <div class="summary-card-label">${t('totalRoles')}</div>
      <div class="summary-card-value">${summary.totalRoles}</div>
    </div>
    <div class="summary-card ${summary.rolesWithoutAccessibility > 0 ? 'danger' : 'success'}">
      <div class="summary-card-label">${t('rolesWithoutAccessibility')}</div>
      <div class="summary-card-value">${summary.rolesWithoutAccessibility}</div>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatCodeSnippet(html, maxLength = 200) {
  if (!html) return '<code class="code-snippet"></code>';
  
  const escaped = escapeHtml(html);
  const isLong = html.length > maxLength;
  const truncated = isLong ? escaped.substring(0, maxLength) + '...' : escaped;
  const uniqueId = 'code-' + Math.random().toString(36).substr(2, 9);
  
  if (isLong) {
    const expandText = t('expand') || 'Expand';
    const collapseText = t('collapse') || 'Collapse';
    return '<div class="code-container">' +
      '<code class="code-snippet" id="' + uniqueId + '-short">' + truncated + '</code>' +
      '<code class="code-snippet hidden" id="' + uniqueId + '-full">' + escaped + '</code>' +
      '<button class="code-toggle" onclick="toggleCode(\'' + uniqueId + '\')" data-expanded="false">' +
      '<span class="toggle-text">' + expandText + '</span>' +
      '</button>' +
      '</div>';
  }
  return '<code class="code-snippet">' + escaped + '</code>';
}

window.toggleCode = function(id) {
  const short = document.getElementById(`${id}-short`);
  const full = document.getElementById(`${id}-full`);
  const button = short?.nextElementSibling?.nextElementSibling;
  const toggleText = button?.querySelector('.toggle-text');
  
  if (short && full && button) {
    const isExpanded = button.getAttribute('data-expanded') === 'true';
    
    if (isExpanded) {
      short.classList.remove('hidden');
      full.classList.add('hidden');
      button.setAttribute('data-expanded', 'false');
      if (toggleText) toggleText.textContent = t('expand') || 'Expand';
    } else {
      short.classList.add('hidden');
      full.classList.remove('hidden');
      button.setAttribute('data-expanded', 'true');
      if (toggleText) toggleText.textContent = t('collapse') || 'Collapse';
    }
  }
};

function displayImages(images, options) {
  const imagesList = document.getElementById('imagesList');
  const imagesCount = document.getElementById('imagesCount');
  if (imagesCount) imagesCount.textContent = `${images.length}`;
  
  if (!imagesList) return;
  
  if (images.length === 0) {
    imagesList.innerHTML = `<p class="no-results">${t('noImages')}</p>`;
    return;
  }
  
  imagesList.innerHTML = images.map(img => {
    const codeContent = formatCodeSnippet(img.outerHTML || '');
    const hasAltValue = img.alt !== null && img.alt.trim() !== '';
    let attributesHtml = '';
    if (options.checkAltText) {
      let altStatus = 'missing';
      let altDisplay = t('none');
      if (img.alt === null) {
        altStatus = 'missing';
        altDisplay = 'MISSING (attribute not present)';
      } else if (img.alt.trim() === '') {
        altStatus = 'warning';
        altDisplay = 'EMPTY (consider if decorative)';
      } else {
        altStatus = 'present';
        altDisplay = escapeHtml(img.alt);
      }
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">Alt:</span>
          <span class="attr-value ${altStatus}">${altDisplay}</span>
        </div>`;
    }
    attributesHtml += `
      <div class="attr-item full-width">
        <span class="attr-name">Source:</span>
        <span class="attr-value url-text">${img.src}</span>
      </div>`;
    
    return `
    <div class="result-item ${img.hasAlt ? 'has-attributes' : 'missing'}" data-has-attributes="${String(img.hasAlt)}">
      <div class="result-item-header">
        <span class="item-number">#${img.index}</span>
        <span class="item-title">${t('images')}</span>
        ${!img.hasAlt && options.checkAltText ? `<span class="status-badge error">${t('missing')} Alt</span>` : img.hasAlt ? `<span class="status-badge success">✓ Alt</span>` : ''}
      </div>
      ${img.screenshot ? `
      <div class="screenshot-container">
        <img src="${img.screenshot}" alt="Element screenshot" class="element-screenshot" />
      </div>
      ` : ''}
      <div class="attributes-grid">
        ${attributesHtml}
      </div>
      <div class="code-section">
        <div class="code-header">
          <span>${t('htmlCode')}</span>
        </div>
        <div class="code-content">${codeContent}</div>
      </div>
    </div>
  `;
  }).join('');
}

function displayLinks(links, options) {
  const linksList = document.getElementById('linksList');
  const linksCount = document.getElementById('linksCount');
  if (linksCount) linksCount.textContent = `${links.length}`;
  
  if (!linksList) return;
  
  if (links.length === 0) {
    linksList.innerHTML = `<p class="no-results">${t('noLinks')}</p>`;
    return;
  }
  
  linksList.innerHTML = links.map(link => {
    const missingAttrs = link.missingAttributes && link.missingAttributes.length > 0 ? link.missingAttributes : [];
    const statusClass = link.hasAccessibility ? 'has-attributes' : 'missing';
    const statusBadge = link.hasAccessibility 
      ? `<span class="status-badge success">✓ OK</span>` 
      : `<span class="status-badge error">${missingAttrs.length} ${t('missing')}</span>`;
    const codeContent = formatCodeSnippet(link.outerHTML || '');
    
    let attributesHtml = '';
    if (options.checkAriaLabel) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-label:</span>
          <span class="attr-value ${link.ariaLabel ? 'present' : 'missing'}">${link.ariaLabel ? escapeHtml(link.ariaLabel) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaLabelledby) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-labelledby:</span>
          <span class="attr-value ${link.ariaLabelledby ? 'present' : 'missing'}">${link.ariaLabelledby ? escapeHtml(link.ariaLabelledby) : t('none')}</span>
        </div>`;
    }
    if (options.checkTitle) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">title:</span>
          <span class="attr-value ${link.title ? 'present' : 'missing'}">${link.title ? escapeHtml(link.title) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaHidden && link.ariaHidden !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-hidden:</span>
          <span class="attr-value ${link.ariaHidden === 'true' ? 'warning' : 'present'}">${escapeHtml(link.ariaHidden)}</span>
        </div>`;
    }
    if (options.checkAriaExpanded && link.ariaExpanded !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-expanded:</span>
          <span class="attr-value present">${escapeHtml(link.ariaExpanded)}</span>
        </div>`;
    }
    if (options.checkAriaControls && link.ariaControls !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-controls:</span>
          <span class="attr-value present">${escapeHtml(link.ariaControls)}</span>
        </div>`;
    }
    if (options.checkAriaCurrent && link.ariaCurrent !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-current:</span>
          <span class="attr-value present">${escapeHtml(link.ariaCurrent)}</span>
        </div>`;
    }
    if (options.checkTabIndex && link.tabIndex !== null) {
      const tabIndexValue = parseInt(link.tabIndex);
      const tabIndexClass = tabIndexValue > 0 ? 'warning' : 'present';
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">tabindex:</span>
          <span class="attr-value ${tabIndexClass}">${escapeHtml(link.tabIndex)}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}</span>
        </div>`;
    }
    if (options.checkLang && link.lang !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">lang:</span>
          <span class="attr-value present">${escapeHtml(link.lang)}</span>
        </div>`;
    }
    attributesHtml += `
      <div class="attr-item full-width">
        <span class="attr-name">Href:</span>
        <span class="attr-value url-text">${link.href}</span>
      </div>`;
    
    return `
    <div class="result-item ${statusClass}" data-has-attributes="${String(link.hasAccessibility)}">
      <div class="result-item-header">
        <span class="item-number">#${link.index}</span>
        <span class="item-title">${t('links')}: "${escapeHtml(link.text || t('noText'))}"</span>
        ${statusBadge}
      </div>
      ${link.screenshot ? `
      <div class="screenshot-container">
        <img src="${link.screenshot}" alt="Element screenshot" class="element-screenshot" />
      </div>
      ` : ''}
      <div class="attributes-grid">
        ${attributesHtml}
      </div>
      <div class="code-section">
        <div class="code-header">
          <span>${t('htmlCode')}</span>
        </div>
        <div class="code-content">${codeContent}</div>
      </div>
    </div>
  `;
  }).join('');
}

function displayButtons(buttons, options) {
  const buttonsList = document.getElementById('buttonsList');
  const buttonsCount = document.getElementById('buttonsCount');
  if (buttonsCount) buttonsCount.textContent = `${buttons.length}`;
  
  if (!buttonsList) return;
  
  if (buttons.length === 0) {
    buttonsList.innerHTML = `<p class="no-results">${t('noButtons')}</p>`;
    return;
  }
  
  buttonsList.innerHTML = buttons.map(btn => {
    const missingAttrs = btn.missingAttributes && btn.missingAttributes.length > 0 ? btn.missingAttributes : [];
    const statusClass = btn.hasAccessibility ? 'has-attributes' : 'missing';
    const statusBadge = btn.hasAccessibility 
      ? `<span class="status-badge success">✓ OK</span>` 
      : `<span class="status-badge error">${missingAttrs.length} ${t('missing')}</span>`;
    const codeContent = formatCodeSnippet(btn.outerHTML || '');
    
    let attributesHtml = '';
    if (options.checkAriaLabel) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-label:</span>
          <span class="attr-value ${btn.ariaLabel ? 'present' : 'missing'}">${btn.ariaLabel ? escapeHtml(btn.ariaLabel) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaLabelledby) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-labelledby:</span>
          <span class="attr-value ${btn.ariaLabelledby ? 'present' : 'missing'}">${btn.ariaLabelledby ? escapeHtml(btn.ariaLabelledby) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaDescribedby) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-describedby:</span>
          <span class="attr-value ${btn.ariaDescribedby ? 'present' : 'missing'}">${btn.ariaDescribedby ? escapeHtml(btn.ariaDescribedby) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaHidden && btn.ariaHidden !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-hidden:</span>
          <span class="attr-value ${btn.ariaHidden === 'true' ? 'warning' : 'present'}">${escapeHtml(btn.ariaHidden)}</span>
        </div>`;
    }
    if (options.checkAriaExpanded && btn.ariaExpanded !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-expanded:</span>
          <span class="attr-value present">${escapeHtml(btn.ariaExpanded)}</span>
        </div>`;
    }
    if (options.checkAriaControls && btn.ariaControls !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-controls:</span>
          <span class="attr-value present">${escapeHtml(btn.ariaControls)}</span>
        </div>`;
    }
    if (options.checkAriaCurrent && btn.ariaCurrent !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-current:</span>
          <span class="attr-value present">${escapeHtml(btn.ariaCurrent)}</span>
        </div>`;
    }
    if (options.checkTabIndex && btn.tabIndex !== null) {
      const tabIndexValue = parseInt(btn.tabIndex);
      const tabIndexClass = tabIndexValue > 0 ? 'warning' : 'present';
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">tabindex:</span>
          <span class="attr-value ${tabIndexClass}">${escapeHtml(btn.tabIndex)}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}</span>
        </div>`;
    }
    if (options.checkLang && btn.lang !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">lang:</span>
          <span class="attr-value present">${escapeHtml(btn.lang)}</span>
        </div>`;
    }
    
    return `
    <div class="result-item ${statusClass}" data-has-attributes="${String(btn.hasAccessibility)}">
      <div class="result-item-header">
        <span class="item-number">#${btn.index}</span>
        <span class="item-title">${t('buttons')}: "${escapeHtml(btn.text || t('noText'))}"</span>
        ${statusBadge}
      </div>
      ${btn.screenshot ? `
      <div class="screenshot-container">
        <img src="${btn.screenshot}" alt="Element screenshot" class="element-screenshot" />
      </div>
      ` : ''}
      <div class="attributes-grid">
        ${attributesHtml}
      </div>
      <div class="code-section">
        <div class="code-header">
          <span>${t('htmlCode')}</span>
        </div>
        <div class="code-content">${codeContent}</div>
      </div>
    </div>
  `;
  }).join('');
}

function displayInputs(inputs, options) {
  const inputsList = document.getElementById('inputsList');
  const inputsCount = document.getElementById('inputsCount');
  if (inputsCount) inputsCount.textContent = `${inputs.length}`;
  
  if (!inputsList) return;
  
  if (inputs.length === 0) {
    inputsList.innerHTML = `<p class="no-results">${t('noInputs')}</p>`;
    return;
  }
  
  inputsList.innerHTML = inputs.map(input => {
    const missingAttrs = input.missingAttributes && input.missingAttributes.length > 0 ? input.missingAttributes : [];
    const statusClass = input.hasAccessibility ? 'has-attributes' : 'missing';
    const statusBadge = input.hasAccessibility 
      ? `<span class="status-badge success">✓ OK</span>` 
      : `<span class="status-badge error">${missingAttrs.length} ${t('missing')}</span>`;
    const codeContent = formatCodeSnippet(input.outerHTML || '');
    
    let attributesHtml = '';
    if (options.checkAriaLabel) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-label:</span>
          <span class="attr-value ${input.ariaLabel ? 'present' : 'missing'}">${input.ariaLabel ? escapeHtml(input.ariaLabel) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaLabelledby) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-labelledby:</span>
          <span class="attr-value ${input.ariaLabelledby ? 'present' : 'missing'}">${input.ariaLabelledby ? escapeHtml(input.ariaLabelledby) : t('none')}</span>
        </div>`;
    }
    if (options.checkLabels) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">&lt;label&gt;:</span>
          <span class="attr-value ${input.label ? 'present' : 'missing'}">${input.label ? escapeHtml(input.label) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaDescribedby && input.ariaDescribedby !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-describedby:</span>
          <span class="attr-value present">${escapeHtml(input.ariaDescribedby)}</span>
        </div>`;
    }
    if (options.checkAriaRequired && input.ariaRequired !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-required:</span>
          <span class="attr-value present">${escapeHtml(input.ariaRequired)}</span>
        </div>`;
    }
    if (options.checkAriaInvalid && input.ariaInvalid !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-invalid:</span>
          <span class="attr-value ${input.ariaInvalid === 'true' ? 'warning' : 'present'}">${escapeHtml(input.ariaInvalid)}</span>
        </div>`;
    }
    if (options.checkAriaHidden && input.ariaHidden !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-hidden:</span>
          <span class="attr-value warning">${escapeHtml(input.ariaHidden)} (should not be true for inputs)</span>
        </div>`;
    }
    if (options.checkTabIndex && input.tabIndex !== null) {
      const tabIndexValue = parseInt(input.tabIndex);
      const tabIndexClass = tabIndexValue > 0 ? 'warning' : 'present';
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">tabindex:</span>
          <span class="attr-value ${tabIndexClass}">${escapeHtml(input.tabIndex)}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}</span>
        </div>`;
    }
    if (options.checkLang && input.lang !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">lang:</span>
          <span class="attr-value present">${escapeHtml(input.lang)}</span>
        </div>`;
    }
    
    return `
    <div class="result-item ${statusClass}" data-has-attributes="${String(input.hasAccessibility)}">
      <div class="result-item-header">
        <span class="item-number">#${input.index}</span>
        <span class="item-title">${input.type} ${input.name ? `(${escapeHtml(input.name)})` : ''}</span>
        ${statusBadge}
      </div>
      ${input.screenshot ? `
      <div class="screenshot-container">
        <img src="${input.screenshot}" alt="Element screenshot" class="element-screenshot" />
      </div>
      ` : ''}
      <div class="attributes-grid">
        ${attributesHtml}
      </div>
      <div class="code-section">
        <div class="code-header">
          <span>${t('htmlCode')}</span>
        </div>
        <div class="code-content">${codeContent}</div>
      </div>
    </div>
  `;
  }).join('');
}

function displayRoles(roles, options) {
  const rolesList = document.getElementById('rolesList');
  const rolesCount = document.getElementById('rolesCount');
  if (rolesCount) rolesCount.textContent = `${roles.length}`;
  
  if (!rolesList) return;
  
  if (roles.length === 0) {
    rolesList.innerHTML = `<p class="no-results">${t('noRoles')}</p>`;
    return;
  }
  
  rolesList.innerHTML = roles.map(role => {
    const missingAttrs = role.missingAttributes && role.missingAttributes.length > 0 ? role.missingAttributes : [];
    const statusClass = role.hasAccessibility ? 'has-attributes' : 'missing';
    const statusBadge = role.hasAccessibility 
      ? `<span class="status-badge success">✓ OK</span>` 
      : `<span class="status-badge error">${missingAttrs.length} ${t('missing')}</span>`;
    const codeContent = formatCodeSnippet(role.outerHTML || '');
    
    let attributesHtml = '';
    if (options.checkAriaLabel) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-label:</span>
          <span class="attr-value ${role.ariaLabel ? 'present' : 'missing'}">${role.ariaLabel ? escapeHtml(role.ariaLabel) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaLabelledby) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-labelledby:</span>
          <span class="attr-value ${role.ariaLabelledby ? 'present' : 'missing'}">${role.ariaLabelledby ? escapeHtml(role.ariaLabelledby) : t('none')}</span>
        </div>`;
    }
    if (options.checkAriaDescribedby && role.ariaDescribedby !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-describedby:</span>
          <span class="attr-value present">${escapeHtml(role.ariaDescribedby)}</span>
        </div>`;
    }
    if (options.checkAriaHidden && role.ariaHidden !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-hidden:</span>
          <span class="attr-value ${role.ariaHidden === 'true' ? 'warning' : 'present'}">${escapeHtml(role.ariaHidden)}</span>
        </div>`;
    }
    if (options.checkAriaExpanded && role.ariaExpanded !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-expanded:</span>
          <span class="attr-value present">${escapeHtml(role.ariaExpanded)}</span>
        </div>`;
    }
    if (options.checkAriaControls && role.ariaControls !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-controls:</span>
          <span class="attr-value present">${escapeHtml(role.ariaControls)}</span>
        </div>`;
    }
    if (options.checkAriaCurrent && role.ariaCurrent !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">aria-current:</span>
          <span class="attr-value present">${escapeHtml(role.ariaCurrent)}</span>
        </div>`;
    }
    if (options.checkTabIndex && role.tabIndex !== null) {
      const tabIndexValue = parseInt(role.tabIndex);
      const tabIndexClass = tabIndexValue > 0 ? 'warning' : 'present';
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">tabindex:</span>
          <span class="attr-value ${tabIndexClass}">${escapeHtml(role.tabIndex)}${tabIndexValue > 0 ? ' (anti-pattern)' : ''}</span>
        </div>`;
    }
    if (options.checkLang && role.lang !== null) {
      attributesHtml += `
        <div class="attr-item">
          <span class="attr-name">lang:</span>
          <span class="attr-value present">${escapeHtml(role.lang)}</span>
        </div>`;
    }
    
    return `
    <div class="result-item ${statusClass}" data-has-attributes="${String(role.hasAccessibility)}">
      <div class="result-item-header">
        <span class="item-number">#${role.index}</span>
        <span class="item-title">${role.tag} (role: ${escapeHtml(role.role)})</span>
        ${statusBadge}
      </div>
      ${role.screenshot ? `
      <div class="screenshot-container">
        <img src="${role.screenshot}" alt="Element screenshot" class="element-screenshot" />
      </div>
      ` : ''}
      <div class="attributes-grid">
        ${attributesHtml}
      </div>
      <div class="code-section">
        <div class="code-header">
          <span>${t('htmlCode')}</span>
        </div>
        <div class="code-content">${codeContent}</div>
      </div>
    </div>
  `;
  }).join('');
}

function applyFilters() {
  if (!filterMissing || !filterHasAttributes) return;
  const showMissing = filterMissing.checked;
  const showHasAttributes = filterHasAttributes.checked;
  
  const allItems = document.querySelectorAll('.result-item');
  
  allItems.forEach(item => {
    const hasAttributesValue = item.getAttribute('data-has-attributes');
    const hasAttributes = hasAttributesValue === 'true';
    
    if (showMissing && showHasAttributes) {
      item.style.display = 'block';
    } else if (showMissing && !showHasAttributes) {
      item.style.display = hasAttributes ? 'none' : 'block';
    } else if (!showMissing && showHasAttributes) {
      item.style.display = hasAttributes ? 'block' : 'none';
    } else {
      item.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  urlInput = document.getElementById('urlInput');
  analyzeBtn = document.getElementById('analyzeBtn');
  stopBtn = document.getElementById('stopBtn');
  loading = document.getElementById('loading');
  error = document.getElementById('error');
  results = document.getElementById('results');
  filterMissing = document.getElementById('filterMissing');
  filterHasAttributes = document.getElementById('filterHasAttributes');
  
  optionCheckboxes = {
    checkImages: document.getElementById('checkImages'),
    checkLinks: document.getElementById('checkLinks'),
    checkButtons: document.getElementById('checkButtons'),
    checkInputs: document.getElementById('checkInputs'),
    checkRoles: document.getElementById('checkRoles'),
    checkAltText: document.getElementById('checkAltText'),
    checkAriaLabel: document.getElementById('checkAriaLabel'),
    checkAriaLabelledby: document.getElementById('checkAriaLabelledby'),
    checkAriaDescribedby: document.getElementById('checkAriaDescribedby'),
    checkAriaHidden: document.getElementById('checkAriaHidden'),
    checkAriaExpanded: document.getElementById('checkAriaExpanded'),
    checkAriaControls: document.getElementById('checkAriaControls'),
    checkAriaCurrent: document.getElementById('checkAriaCurrent'),
    checkAriaRequired: document.getElementById('checkAriaRequired'),
    checkAriaInvalid: document.getElementById('checkAriaInvalid'),
    checkTabIndex: document.getElementById('checkTabIndex'),
    checkLang: document.getElementById('checkLang'),
    checkLabels: document.getElementById('checkLabels'),
    checkTitle: document.getElementById('checkTitle'),
    checkFocusStates: document.getElementById('checkFocusStates'),
  };
  
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  
  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', analyzePage);
  }
  
  if (stopBtn) {
    stopBtn.addEventListener('click', stopAnalysis);
  }
  
  if (urlInput) {
    urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        analyzePage();
      }
    });
  }
  
  if (filterMissing) {
    filterMissing.addEventListener('change', applyFilters);
  }
  
  if (filterHasAttributes) {
    filterHasAttributes.addEventListener('change', applyFilters);
  }
  
  const showImages = document.getElementById('showImages');
  const showLinks = document.getElementById('showLinks');
  const showButtons = document.getElementById('showButtons');
  const showInputs = document.getElementById('showInputs');
  const showRoles = document.getElementById('showRoles');
  
  function toggleSectionVisibility() {
    const imagesSection = document.getElementById('imagesSection');
    const linksSection = document.getElementById('linksSection');
    const buttonsSection = document.getElementById('buttonsSection');
    const inputsSection = document.getElementById('inputsSection');
    const rolesSection = document.getElementById('rolesSection');
    
    if (imagesSection) {
      imagesSection.classList.toggle('hidden', !showImages?.checked);
    }
    if (linksSection) {
      linksSection.classList.toggle('hidden', !showLinks?.checked);
    }
    if (buttonsSection) {
      buttonsSection.classList.toggle('hidden', !showButtons?.checked);
    }
    if (inputsSection) {
      inputsSection.classList.toggle('hidden', !showInputs?.checked);
    }
    if (rolesSection) {
      rolesSection.classList.toggle('hidden', !showRoles?.checked);
    }
  }
  
  if (showImages) showImages.addEventListener('change', toggleSectionVisibility);
  if (showLinks) showLinks.addEventListener('change', toggleSectionVisibility);
  if (showButtons) showButtons.addEventListener('change', toggleSectionVisibility);
  if (showInputs) showInputs.addEventListener('change', toggleSectionVisibility);
  if (showRoles) showRoles.addEventListener('change', toggleSectionVisibility);
  
  document.querySelectorAll('[data-section-toggle]').forEach(header => {
    header.addEventListener('click', (e) => {
      const sectionName = header.getAttribute('data-section-toggle');
      const section = document.querySelector(`[data-section="${sectionName}"]`);
      if (section) {
        section.classList.toggle('collapsed');
      }
    });
  });
  if (typeof initLanguage === 'function') {
    initLanguage();
  }
  
  if (typeof window.initTheme === 'function') {
    window.initTheme();
  }
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (typeof setLanguage === 'function') {
        setLanguage(lang);
      }
      
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  
  const currentLang = localStorage.getItem('language') || 'en';
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    }
  });
  
  const themeSelect = document.getElementById('themeSelect');
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      if (window.applyTheme) {
        window.applyTheme(e.target.value);
      }
    });
  }
  
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', async () => {
      if (!currentData) {
        showError(t('errorNoReport'));
        return;
      }

      exportPdfBtn.disabled = true;
      exportPdfBtn.textContent = `⏳ ${t('exporting')}`;

      try {
        const doc = await window.exportReportAsPDF();
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        doc.save(`accessibility-report-${timestamp}.pdf`);

        exportPdfBtn.textContent = `✅ ${t('exported')}`;
        setTimeout(() => {
          exportPdfBtn.textContent = t('exportAsPDF');
        }, 2000);
      } catch (err) {
        showError(t('errorExportFailed') + ': ' + err.message);
      } finally {
        exportPdfBtn.disabled = false;
      }
    });
  }
});

cl