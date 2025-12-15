const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['assets/Results-BuWE-Rdr.js', 'assets/vendor-DJJw8Pl3.js'])
) => i.map((i) => d[i]);
import {
  d as R,
  r as v,
  a as T,
  o as M,
  c as C,
  b as k,
  w as b,
  e,
  v as g,
  u as i,
  f as D,
  g as y,
  h as W,
  i as F,
  n as j,
  F as N,
  j as G,
  t as p,
  k as q,
  l as I,
  m as S,
  p as K,
  q as Q,
  s as J,
  x as $,
  y as X,
  S as Y,
  z as Z,
  A as ee,
} from './vendor-DJJw8Pl3.js';
(function () {
  const l = document.createElement('link').relList;
  if (l && l.supports && l.supports('modulepreload')) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) t(a);
  new MutationObserver((a) => {
    for (const n of a)
      if (n.type === 'childList')
        for (const c of n.addedNodes) c.tagName === 'LINK' && c.rel === 'modulepreload' && t(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(a) {
    const n = {};
    return (
      a.integrity && (n.integrity = a.integrity),
      a.referrerPolicy && (n.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : a.crossOrigin === 'anonymous'
          ? (n.credentials = 'omit')
          : (n.credentials = 'same-origin'),
      n
    );
  }
  function t(a) {
    if (a.ep) return;
    a.ep = !0;
    const n = r(a);
    fetch(a.href, n);
  }
})();
const ae = 'modulepreload',
  te = function (f) {
    return '/' + f;
  },
  B = {},
  re = function (l, r, t) {
    let a = Promise.resolve();
    if (r && r.length > 0) {
      document.getElementsByTagName('link');
      const c = document.querySelector('meta[property=csp-nonce]'),
        h = (c == null ? void 0 : c.nonce) || (c == null ? void 0 : c.getAttribute('nonce'));
      a = Promise.allSettled(
        r.map((u) => {
          if (((u = te(u)), u in B)) return;
          B[u] = !0;
          const m = u.endsWith('.css'),
            _ = m ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${u}"]${_}`)) return;
          const d = document.createElement('link');
          if (
            ((d.rel = m ? 'stylesheet' : ae),
            m || (d.as = 'script'),
            (d.crossOrigin = ''),
            (d.href = u),
            h && d.setAttribute('nonce', h),
            document.head.appendChild(d),
            m)
          )
            return new Promise((w, L) => {
              (d.addEventListener('load', w),
                d.addEventListener('error', () => L(new Error(`Unable to preload CSS for ${u}`))));
            });
        })
      );
    }
    function n(c) {
      const h = new Event('vite:preloadError', { cancelable: !0 });
      if (((h.payload = c), window.dispatchEvent(h), !h.defaultPrevented)) throw c;
    }
    return a.then((c) => {
      for (const h of c || []) h.status === 'rejected' && n(h.reason);
      return l().catch(n);
    });
  },
  E = R('language', () => {
    const f = v(localStorage.getItem('language') || 'en'),
      l = {
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
          focusStates: 'Focus States (WCAG 2.2 AA)',
          selectAll: 'All',
          deselectAll: 'None',
          summary: 'Summary',
          errorUrlRequired: 'Please enter a URL',
          errorInvalidUrl: 'URL must start with http:// or https://',
          errorAnalysisFailed: 'Failed to analyze page',
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
          labelElements: 'elementos <label>',
          titleAttribute: 'atributo title',
          focusStates: 'Estados de Foco (WCAG 2.2 AA)',
          selectAll: 'Todo',
          deselectAll: 'Ninguno',
          summary: 'Resumen',
          errorUrlRequired: 'Por favor ingresa una URL',
          errorInvalidUrl: 'La URL debe comenzar con http:// o https://',
          errorAnalysisFailed: 'Error al analizar la página',
        },
      };
    function r(a) {
      ((f.value = a), localStorage.setItem('language', a), (document.documentElement.lang = a));
    }
    function t(a) {
      return l[f.value][a] || a;
    }
    return { currentLanguage: f, translations: l, setLanguage: r, t };
  }),
  oe = { class: 'language-toggle' },
  ne = ['id'],
  le = ['for'],
  z = T({
    __name: 'LanguageToggle',
    props: { mobile: { type: Boolean } },
    setup(f) {
      const l = f,
        r = E(),
        t = l.mobile ? 'languageToggleMobile' : 'languageToggle',
        a = v(r.currentLanguage === 'es');
      M(() => {
        a.value = r.currentLanguage === 'es';
      });
      function n() {
        r.setLanguage(a.value ? 'es' : 'en');
      }
      return (c, h) => (
        k(),
        C('div', oe, [
          b(
            e(
              'input',
              {
                id: i(t),
                'onUpdate:modelValue': h[0] || (h[0] = (u) => (a.value = u)),
                type: 'checkbox',
                class: 'language-toggle-input',
                onChange: n,
              },
              null,
              40,
              ne
            ),
            [[g, a.value]]
          ),
          e(
            'label',
            { for: i(t), class: 'language-toggle-label' },
            [
              ...(h[1] ||
                (h[1] = [
                  e('span', { class: 'toggle-option', 'data-lang': 'en' }, 'US', -1),
                  e('span', { class: 'toggle-separator' }, '/', -1),
                  e('span', { class: 'toggle-option', 'data-lang': 'es' }, 'ES', -1),
                ])),
            ],
            8,
            le
          ),
        ])
      );
    },
  }),
  U = {
    light: {
      name: 'Light Mode',
      '--bg-color': '#e0e5ec',
      '--card-bg': '#f5f7fa',
      '--text-primary': '#1e293b',
      '--text-secondary': '#475569',
      '--border-color': '#cbd5e1',
      '--primary-color': '#3b82f6',
      '--primary-hover': '#2563eb',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--danger-color': '#ef4444',
      '--shadow': '8px 8px 16px #b8bec4, -8px -8px 16px #ffffff',
      '--shadow-inset': 'inset 4px 4px 8px #b8bec4, inset -4px -4px 8px #ffffff',
      '--shadow-lg': '12px 12px 24px #b8bec4, -12px -12px 24px #ffffff',
      '--header-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.15)',
    },
    dark: {
      name: 'Dark Mode',
      '--bg-color': '#1a1d24',
      '--card-bg': '#252932',
      '--text-primary': '#f1f5f9',
      '--text-secondary': '#cbd5e1',
      '--border-color': '#334155',
      '--primary-color': '#3b82f6',
      '--primary-hover': '#60a5fa',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--danger-color': '#ef4444',
      '--shadow': '8px 8px 16px #0f1115, -8px -8px 16px #252932',
      '--shadow-inset': 'inset 4px 4px 8px #0f1115, inset -4px -4px 8px #252932',
      '--shadow-lg': '12px 12px 24px #0f1115, -12px -12px 24px #252932',
      '--header-bg': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      '--header-text': '#f1f5f9',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.1)',
    },
    flat: {
      name: 'Flat Design',
      '--bg-color': '#f5f5f5',
      '--card-bg': '#ffffff',
      '--text-primary': '#212121',
      '--text-secondary': '#757575',
      '--border-color': '#e0e0e0',
      '--primary-color': '#2196f3',
      '--primary-hover': '#1976d2',
      '--success-color': '#4caf50',
      '--warning-color': '#ff9800',
      '--danger-color': '#f44336',
      '--shadow': 'none',
      '--shadow-inset': 'none',
      '--shadow-lg': '0 2px 4px rgba(0,0,0,0.1)',
      '--header-bg': '#2196f3',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    material: {
      name: 'Material Design',
      '--bg-color': '#fafafa',
      '--card-bg': '#ffffff',
      '--text-primary': '#212121',
      '--text-secondary': '#757575',
      '--border-color': '#e0e0e0',
      '--primary-color': '#6200ea',
      '--primary-hover': '#3700b3',
      '--success-color': '#00c853',
      '--warning-color': '#ff6d00',
      '--danger-color': '#d50000',
      '--shadow': '0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)',
      '--shadow-inset': 'inset 0 1px 2px rgba(0,0,0,0.1)',
      '--shadow-lg': '0 8px 16px rgba(0,0,0,0.15), 0 16px 32px rgba(0,0,0,0.1)',
      '--header-bg': 'linear-gradient(135deg, #6200ea 0%, #3700b3 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    glassmorphism: {
      name: 'Glassmorphism',
      '--bg-color': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      '--card-bg': 'rgba(255, 255, 255, 0.1)',
      '--text-primary': '#ffffff',
      '--text-secondary': 'rgba(255, 255, 255, 0.8)',
      '--border-color': 'rgba(255, 255, 255, 0.2)',
      '--primary-color': '#ffffff',
      '--primary-hover': 'rgba(255, 255, 255, 0.9)',
      '--success-color': '#4ade80',
      '--warning-color': '#fbbf24',
      '--danger-color': '#f87171',
      '--shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
      '--shadow-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      '--shadow-lg': '0 8px 32px rgba(0, 0, 0, 0.2)',
      '--header-bg': 'rgba(255, 255, 255, 0.15)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    cyberpunk: {
      name: 'Cyberpunk',
      '--bg-color': '#0a0e27',
      '--card-bg': '#1a1f3a',
      '--text-primary': '#00ff88',
      '--text-secondary': '#00d9ff',
      '--border-color': '#ff0080',
      '--primary-color': '#00ff88',
      '--primary-hover': '#00d9ff',
      '--success-color': '#00ff88',
      '--warning-color': '#ffaa00',
      '--danger-color': '#ff0080',
      '--shadow': '0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 217, 255, 0.2)',
      '--shadow-inset': 'inset 0 0 10px rgba(0, 255, 136, 0.2)',
      '--shadow-lg': '0 0 30px rgba(0, 255, 136, 0.4), 0 0 60px rgba(0, 217, 255, 0.3)',
      '--header-bg': 'linear-gradient(135deg, #ff0080 0%, #00d9ff 100%)',
      '--header-text': '#0a0e27',
      '--header-controls-bg': 'rgba(0, 255, 136, 0.2)',
    },
    minimal: {
      name: 'Minimal',
      '--bg-color': '#ffffff',
      '--card-bg': '#fafafa',
      '--text-primary': '#000000',
      '--text-secondary': '#666666',
      '--border-color': '#e5e5e5',
      '--primary-color': '#000000',
      '--primary-hover': '#333333',
      '--success-color': '#000000',
      '--warning-color': '#666666',
      '--danger-color': '#000000',
      '--shadow': 'none',
      '--shadow-inset': 'none',
      '--shadow-lg': '0 1px 3px rgba(0,0,0,0.05)',
      '--header-bg': '#000000',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.1)',
    },
    ocean: {
      name: 'Ocean',
      '--bg-color': '#e0f2fe',
      '--card-bg': '#f0f9ff',
      '--text-primary': '#0c4a6e',
      '--text-secondary': '#075985',
      '--border-color': '#7dd3fc',
      '--primary-color': '#0284c7',
      '--primary-hover': '#0369a1',
      '--success-color': '#06b6d4',
      '--warning-color': '#f59e0b',
      '--danger-color': '#ef4444',
      '--shadow': '8px 8px 16px #b3d9f0, -8px -8px 16px #ffffff',
      '--shadow-inset': 'inset 4px 4px 8px #b3d9f0, inset -4px -4px 8px #ffffff',
      '--shadow-lg': '12px 12px 24px #b3d9f0, -12px -12px 24px #ffffff',
      '--header-bg': 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    sunset: {
      name: 'Sunset',
      '--bg-color': '#fff5e6',
      '--card-bg': '#fffaf0',
      '--text-primary': '#7c2d12',
      '--text-secondary': '#9a3412',
      '--border-color': '#fdba74',
      '--primary-color': '#ea580c',
      '--primary-hover': '#c2410c',
      '--success-color': '#f59e0b',
      '--warning-color': '#f97316',
      '--danger-color': '#dc2626',
      '--shadow': '8px 8px 16px #ffe0b3, -8px -8px 16px #ffffff',
      '--shadow-inset': 'inset 4px 4px 8px #ffe0b3, inset -4px -4px 8px #ffffff',
      '--shadow-lg': '12px 12px 24px #ffe0b3, -12px -12px 24px #ffffff',
      '--header-bg': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    forest: {
      name: 'Forest',
      '--bg-color': '#f0fdf4',
      '--card-bg': '#f7fef9',
      '--text-primary': '#14532d',
      '--text-secondary': '#166534',
      '--border-color': '#86efac',
      '--primary-color': '#16a34a',
      '--primary-hover': '#15803d',
      '--success-color': '#22c55e',
      '--warning-color': '#eab308',
      '--danger-color': '#dc2626',
      '--shadow': '8px 8px 16px #c8e6d1, -8px -8px 16px #ffffff',
      '--shadow-inset': 'inset 4px 4px 8px #c8e6d1, inset -4px -4px 8px #ffffff',
      '--shadow-lg': '12px 12px 24px #c8e6d1, -12px -12px 24px #ffffff',
      '--header-bg': 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    monochrome: {
      name: 'Monochrome',
      '--bg-color': '#f5f5f5',
      '--card-bg': '#ffffff',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#666666',
      '--border-color': '#cccccc',
      '--primary-color': '#1a1a1a',
      '--primary-hover': '#333333',
      '--success-color': '#4a4a4a',
      '--warning-color': '#808080',
      '--danger-color': '#1a1a1a',
      '--shadow': '0 2px 8px rgba(0,0,0,0.1)',
      '--shadow-inset': 'inset 0 1px 2px rgba(0,0,0,0.1)',
      '--shadow-lg': '0 4px 16px rgba(0,0,0,0.15)',
      '--header-bg': '#1a1a1a',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.1)',
    },
    highContrast: {
      name: 'High Contrast',
      '--bg-color': '#ffffff',
      '--card-bg': '#ffffff',
      '--text-primary': '#000000',
      '--text-secondary': '#000000',
      '--border-color': '#000000',
      '--primary-color': '#0000ff',
      '--primary-hover': '#0000cc',
      '--success-color': '#008000',
      '--warning-color': '#ff8c00',
      '--danger-color': '#ff0000',
      '--shadow': '0 0 0 2px #000000',
      '--shadow-inset': 'inset 0 0 0 2px #000000',
      '--shadow-lg': '0 0 0 3px #000000',
      '--header-bg': '#000000',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    blue: {
      name: 'Blue Theme',
      '--bg-color': '#d4e4f7',
      '--card-bg': '#e8f2fc',
      '--text-primary': '#0c2440',
      '--text-secondary': '#1e3a8a',
      '--border-color': '#93c5fd',
      '--primary-color': '#2563eb',
      '--primary-hover': '#1d4ed8',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--danger-color': '#ef4444',
      '--shadow': '8px 8px 16px #b8c9e0, -8px -8px 16px #f0f8ff',
      '--shadow-inset': 'inset 4px 4px 8px #b8c9e0, inset -4px -4px 8px #f0f8ff',
      '--shadow-lg': '12px 12px 24px #b8c9e0, -12px -12px 24px #f0f8ff',
      '--header-bg': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    green: {
      name: 'Green Theme',
      '--bg-color': '#d4f4e0',
      '--card-bg': '#e8faf0',
      '--text-primary': '#052e16',
      '--text-secondary': '#14532d',
      '--border-color': '#86efac',
      '--primary-color': '#22c55e',
      '--primary-hover': '#16a34a',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--danger-color': '#ef4444',
      '--shadow': '8px 8px 16px #b8e0c8, -8px -8px 16px #f0fff8',
      '--shadow-inset': 'inset 4px 4px 8px #b8e0c8, inset -4px -4px 8px #f0fff8',
      '--shadow-lg': '12px 12px 24px #b8e0c8, -12px -12px 24px #f0fff8',
      '--header-bg': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    purple: {
      name: 'Purple Theme',
      '--bg-color': '#ede9fe',
      '--card-bg': '#f5f3ff',
      '--text-primary': '#3b0764',
      '--text-secondary': '#581c87',
      '--border-color': '#c084fc',
      '--primary-color': '#a855f7',
      '--primary-hover': '#9333ea',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--danger-color': '#ef4444',
      '--shadow': '8px 8px 16px #d1c5e8, -8px -8px 16px #ffffff',
      '--shadow-inset': 'inset 4px 4px 8px #d1c5e8, inset -4px -4px 8px #ffffff',
      '--shadow-lg': '12px 12px 24px #d1c5e8, -12px -12px 24px #ffffff',
      '--header-bg': 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    rose: {
      name: 'Rose',
      '--bg-color': '#fff1f2',
      '--card-bg': '#fff5f7',
      '--text-primary': '#881337',
      '--text-secondary': '#9f1239',
      '--border-color': '#fda4af',
      '--primary-color': '#e11d48',
      '--primary-hover': '#be123c',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--danger-color': '#dc2626',
      '--shadow': '8px 8px 16px #ffe0e6, -8px -8px 16px #ffffff',
      '--shadow-inset': 'inset 4px 4px 8px #ffe0e6, inset -4px -4px 8px #ffffff',
      '--shadow-lg': '12px 12px 24px #ffe0e6, -12px -12px 24px #ffffff',
      '--header-bg': 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    amber: {
      name: 'Amber',
      '--bg-color': '#fffbeb',
      '--card-bg': '#fefce8',
      '--text-primary': '#78350f',
      '--text-secondary': '#92400e',
      '--border-color': '#fde68a',
      '--primary-color': '#f59e0b',
      '--primary-hover': '#d97706',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--danger-color': '#ef4444',
      '--shadow': '8px 8px 16px #ffe4b3, -8px -8px 16px #ffffff',
      '--shadow-inset': 'inset 4px 4px 8px #ffe4b3, inset -4px -4px 8px #ffffff',
      '--shadow-lg': '12px 12px 24px #ffe4b3, -12px -12px 24px #ffffff',
      '--header-bg': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
    teal: {
      name: 'Teal',
      '--bg-color': '#f0fdfa',
      '--card-bg': '#f5fffe',
      '--text-primary': '#134e4a',
      '--text-secondary': '#0f766e',
      '--border-color': '#5eead4',
      '--primary-color': '#14b8a6',
      '--primary-hover': '#0d9488',
      '--success-color': '#10b981',
      '--warning-color': '#f59e0b',
      '--danger-color': '#ef4444',
      '--shadow': '8px 8px 16px #c8f0ea, -8px -8px 16px #ffffff',
      '--shadow-inset': 'inset 4px 4px 8px #c8f0ea, inset -4px -4px 8px #ffffff',
      '--shadow-lg': '12px 12px 24px #c8f0ea, -12px -12px 24px #ffffff',
      '--header-bg': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      '--header-text': '#ffffff',
      '--header-controls-bg': 'rgba(255, 255, 255, 0.2)',
    },
  };
function se(f) {
  if (f === '#ffffff' || f === 'white' || f === 'rgb(255, 255, 255)') return !0;
  const l = f.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (l) {
    const t = parseInt(l[1]),
      a = parseInt(l[2]),
      n = parseInt(l[3]);
    if (t > 240 && a > 240 && n > 240) return !0;
  }
  const r = f.replace('#', '');
  if (r.length === 3) {
    const t = parseInt(r[0] + r[0], 16),
      a = parseInt(r[1] + r[1], 16),
      n = parseInt(r[2] + r[2], 16);
    return (t + a + n) / 3 > 240;
  }
  if (r.length === 6) {
    const t = parseInt(r.substring(0, 2), 16),
      a = parseInt(r.substring(2, 4), 16),
      n = parseInt(r.substring(4, 6), 16);
    return (t + a + n) / 3 > 240;
  }
  return !1;
}
const ce = R('theme', () => {
    const f = v(localStorage.getItem('theme') || 'light');
    function l(r) {
      (U[r] || (r = 'light'), (f.value = r), localStorage.setItem('theme', r));
      const t = U[r],
        a = document.documentElement;
      (Object.keys(t).forEach((u) => {
        u !== 'name' && a.style.setProperty(u, t[u]);
      }),
        document.body.setAttribute('data-theme', r));
      const n = t['--primary-color'] || '#3b82f6',
        h = se(n) ? '#1e293b' : '#ffffff';
      a.style.setProperty('--button-text-color', h);
    }
    return (
      l(f.value),
      D(f, (r) => {
        l(r);
      }),
      { currentTheme: f, themes: U, applyTheme: l }
    );
  }),
  ie = { class: 'theme-selector' },
  de = ['id', 'aria-expanded'],
  fe = ['id'],
  pe = ['data-theme', 'data-selected', 'onClick'],
  P = T({
    __name: 'ThemeSelector',
    props: { mobile: { type: Boolean } },
    setup(f) {
      const l = f,
        r = ce(),
        t = l.mobile ? 'themeButtonMobile' : 'themeButton',
        a = l.mobile ? 'themeDropdownMobile' : 'themeDropdown',
        n = v(!1),
        c = y(() => r.themes),
        h = y(() => r.currentTheme);
      function u() {
        n.value = !n.value;
      }
      function m(d) {
        (r.applyTheme(d), (n.value = !1));
      }
      function _(d) {
        const w = d.target,
          L = document.getElementById(t),
          A = document.getElementById(a);
        L && A && !L.contains(w) && !A.contains(w) && (n.value = !1);
      }
      return (
        M(() => {
          document.addEventListener('click', _);
        }),
        W(() => {
          document.removeEventListener('click', _);
        }),
        (d, w) => (
          k(),
          C('div', ie, [
            e(
              'button',
              {
                id: i(t),
                class: 'theme-button',
                'aria-expanded': n.value,
                'aria-haspopup': 'true',
                title: 'Theme',
                onClick: u,
              },
              [
                ...(w[0] ||
                  (w[0] = [
                    F(
                      '<svg class="theme-button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect x="3" y="3" width="7" height="7" fill="#ef4444"></rect><rect x="14" y="3" width="7" height="7" fill="#3b82f6"></rect><rect x="3" y="14" width="7" height="7" fill="#10b981"></rect><rect x="14" y="14" width="7" height="7" fill="#f59e0b"></rect></svg>',
                      1
                    ),
                  ])),
              ],
              8,
              de
            ),
            e(
              'div',
              { id: i(a), class: j(['theme-dropdown', { hidden: !n.value }]) },
              [
                (k(!0),
                C(
                  N,
                  null,
                  G(
                    c.value,
                    (L, A) => (
                      k(),
                      C(
                        'button',
                        {
                          key: A,
                          class: 'theme-option',
                          'data-theme': A,
                          'data-selected': A === h.value,
                          onClick: (V) => m(A),
                        },
                        p(L.name),
                        9,
                        pe
                      )
                    )
                  ),
                  128
                )),
              ],
              10,
              fe
            ),
          ])
        )
      );
    },
  }),
  ue = { class: 'header-top' },
  he = { class: 'header-controls desktop-controls' },
  be = ['aria-expanded'],
  ge = { key: 0, id: 'mobileMenu', class: 'mobile-menu' },
  xe = { class: 'mobile-menu-content' },
  me = { class: 'header-title-group' },
  ye = { class: 'subtitle' },
  ve = T({
    __name: 'Header',
    setup(f) {
      const l = E(),
        { t: r } = l,
        t = v(!1);
      function a() {
        t.value = !t.value;
      }
      return (n, c) => (
        k(),
        C('header', null, [
          e('div', ue, [
            e('div', he, [I(z), I(P)]),
            e(
              'button',
              {
                id: 'mobileMenuToggle',
                class: 'mobile-menu-toggle',
                'aria-expanded': t.value,
                'aria-label': 'Menu',
                onClick: a,
              },
              [
                ...(c[0] ||
                  (c[0] = [
                    e(
                      'svg',
                      {
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                      },
                      [
                        e('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
                        e('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
                        e('line', { x1: '3', y1: '18', x2: '21', y2: '18' }),
                      ],
                      -1
                    ),
                  ])),
              ],
              8,
              be
            ),
            t.value ? (k(), C('div', ge, [e('div', xe, [I(z), I(P)])])) : q('', !0),
          ]),
          e('div', me, [
            c[1] ||
              (c[1] = e(
                'svg',
                {
                  class: 'header-icon',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  'stroke-width': '2',
                },
                [
                  e('path', { d: 'M9 11l3 3L22 4' }),
                  e('path', { d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' }),
                ],
                -1
              )),
            e('h1', null, p(i(r)('title')), 1),
          ]),
          e('p', ye, p(i(r)('subtitle')), 1),
        ])
      );
    },
  }),
  O = R('analysis', () => {
    const f = v(!1),
      l = v(null),
      r = v(null),
      t = v({
        checkImages: !1,
        checkLinks: !1,
        checkButtons: !1,
        checkInputs: !1,
        checkRoles: !1,
        checkAltText: !1,
        checkAriaLabel: !1,
        checkAriaLabelledby: !1,
        checkAriaDescribedby: !1,
        checkAriaHidden: !1,
        checkAriaExpanded: !1,
        checkAriaControls: !1,
        checkAriaCurrent: !1,
        checkAriaRequired: !1,
        checkAriaInvalid: !1,
        checkTabIndex: !1,
        checkLang: !1,
        checkLabels: !1,
        checkTitle: !1,
        checkFocusStates: !1,
        checkHref: !1,
      });
    async function a(h) {
      ((f.value = !0), (r.value = null));
      try {
        const u = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: h, options: t.value }),
        });
        if (!u.ok) {
          const _ = await u.json();
          throw new Error(_.message || 'Analysis failed');
        }
        const m = await u.json();
        l.value = m;
      } catch (u) {
        ((r.value = u.message || 'Failed to analyze page'), (l.value = null));
      } finally {
        f.value = !1;
      }
    }
    function n(h) {
      t.value = { ...t.value, ...h };
    }
    function c() {
      ((l.value = null), (r.value = null));
    }
    return {
      isLoading: f,
      results: l,
      error: r,
      options: t,
      analyze: a,
      updateOptions: n,
      reset: c,
    };
  }),
  ke = { class: 'options-section' },
  we = { class: 'option-group' },
  Ae = { class: 'option-group-header' },
  Ce = { class: 'radio-group' },
  _e = ['checked'],
  Le = ['checked'],
  Ie = { class: 'checkbox-group' },
  Te = { class: 'option-group attributes-group' },
  Se = { class: 'option-group-header' },
  Ee = { class: 'radio-group' },
  Ue = ['checked'],
  Re = ['checked'],
  Oe = { class: 'checkbox-group' },
  Ve = T({
    __name: 'OptionsPanel',
    setup(f) {
      const l = O(),
        r = E(),
        { t } = r,
        a = y(() => l.options),
        n = y(() => ['checkImages', 'checkLinks', 'checkButtons', 'checkInputs', 'checkRoles']),
        c = y(() => [
          'checkAltText',
          'checkAriaLabel',
          'checkAriaLabelledby',
          'checkAriaDescribedby',
          'checkAriaHidden',
          'checkAriaExpanded',
          'checkAriaControls',
          'checkAriaCurrent',
          'checkAriaRequired',
          'checkAriaInvalid',
          'checkTabIndex',
          'checkLang',
          'checkLabels',
          'checkTitle',
          'checkFocusStates',
        ]),
        h = y(() => n.value.every((x) => a.value[x])),
        u = y(() => n.value.every((x) => !a.value[x])),
        m = y(() => c.value.every((x) => a.value[x])),
        _ = y(() => c.value.every((x) => !a.value[x]));
      function d() {}
      function w() {
        const x = {};
        (n.value.forEach((o) => {
          x[o] = !0;
        }),
          l.updateOptions(x));
      }
      function L() {
        const x = {};
        (n.value.forEach((o) => {
          x[o] = !1;
        }),
          l.updateOptions(x));
      }
      function A() {
        const x = {};
        (c.value.forEach((o) => {
          x[o] = !0;
        }),
          l.updateOptions(x));
      }
      function V() {
        const x = {};
        (c.value.forEach((o) => {
          x[o] = !1;
        }),
          l.updateOptions(x));
      }
      return (
        D(
          () => a.value,
          () => {},
          { deep: !0 }
        ),
        (x, o) => (
          k(),
          C('div', ke, [
            e('h2', null, p(i(t)('analysisOptions')), 1),
            e('div', we, [
              e('div', Ae, [
                e('h3', null, p(i(t)('elementsToCheck')), 1),
                e('div', Ce, [
                  e('label', null, [
                    e(
                      'input',
                      { type: 'radio', name: 'elements', checked: h.value, onChange: w },
                      null,
                      40,
                      _e
                    ),
                    S(' ' + p(i(t)('selectAll')), 1),
                  ]),
                  e('label', null, [
                    e(
                      'input',
                      { type: 'radio', name: 'elements', checked: u.value, onChange: L },
                      null,
                      40,
                      Le
                    ),
                    S(' ' + p(i(t)('deselectAll')), 1),
                  ]),
                ]),
              ]),
              e('div', Ie, [
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkImages',
                        'onUpdate:modelValue': o[0] || (o[0] = (s) => (a.value.checkImages = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkImages]]
                  ),
                  e('span', null, p(i(t)('images')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkLinks',
                        'onUpdate:modelValue': o[1] || (o[1] = (s) => (a.value.checkLinks = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkLinks]]
                  ),
                  e('span', null, p(i(t)('links')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkButtons',
                        'onUpdate:modelValue': o[2] || (o[2] = (s) => (a.value.checkButtons = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkButtons]]
                  ),
                  e('span', null, p(i(t)('buttons')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkInputs',
                        'onUpdate:modelValue': o[3] || (o[3] = (s) => (a.value.checkInputs = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkInputs]]
                  ),
                  e('span', null, p(i(t)('inputs')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkRoles',
                        'onUpdate:modelValue': o[4] || (o[4] = (s) => (a.value.checkRoles = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkRoles]]
                  ),
                  e('span', null, p(i(t)('elementsWithRole')), 1),
                ]),
              ]),
            ]),
            e('div', Te, [
              e('div', Se, [
                e('h3', null, p(i(t)('attributesToCheck')), 1),
                e('div', Ee, [
                  e('label', null, [
                    e(
                      'input',
                      { type: 'radio', name: 'attributes', checked: m.value, onChange: A },
                      null,
                      40,
                      Ue
                    ),
                    S(' ' + p(i(t)('selectAll')), 1),
                  ]),
                  e('label', null, [
                    e(
                      'input',
                      { type: 'radio', name: 'attributes', checked: _.value, onChange: V },
                      null,
                      40,
                      Re
                    ),
                    S(' ' + p(i(t)('deselectAll')), 1),
                  ]),
                ]),
              ]),
              e('div', Oe, [
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAltText',
                        'onUpdate:modelValue': o[5] || (o[5] = (s) => (a.value.checkAltText = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAltText]]
                  ),
                  e('span', null, p(i(t)('altText')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaLabel',
                        'onUpdate:modelValue': o[6] || (o[6] = (s) => (a.value.checkAriaLabel = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaLabel]]
                  ),
                  e('span', null, p(i(t)('ariaLabel')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaLabelledby',
                        'onUpdate:modelValue':
                          o[7] || (o[7] = (s) => (a.value.checkAriaLabelledby = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaLabelledby]]
                  ),
                  e('span', null, p(i(t)('ariaLabelledby')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaDescribedby',
                        'onUpdate:modelValue':
                          o[8] || (o[8] = (s) => (a.value.checkAriaDescribedby = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaDescribedby]]
                  ),
                  e('span', null, p(i(t)('ariaDescribedby')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaHidden',
                        'onUpdate:modelValue':
                          o[9] || (o[9] = (s) => (a.value.checkAriaHidden = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaHidden]]
                  ),
                  e('span', null, p(i(t)('ariaHidden')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaExpanded',
                        'onUpdate:modelValue':
                          o[10] || (o[10] = (s) => (a.value.checkAriaExpanded = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaExpanded]]
                  ),
                  e('span', null, p(i(t)('ariaExpanded')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaControls',
                        'onUpdate:modelValue':
                          o[11] || (o[11] = (s) => (a.value.checkAriaControls = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaControls]]
                  ),
                  e('span', null, p(i(t)('ariaControls')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaCurrent',
                        'onUpdate:modelValue':
                          o[12] || (o[12] = (s) => (a.value.checkAriaCurrent = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaCurrent]]
                  ),
                  e('span', null, p(i(t)('ariaCurrent')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaRequired',
                        'onUpdate:modelValue':
                          o[13] || (o[13] = (s) => (a.value.checkAriaRequired = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaRequired]]
                  ),
                  e('span', null, p(i(t)('ariaRequired')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkAriaInvalid',
                        'onUpdate:modelValue':
                          o[14] || (o[14] = (s) => (a.value.checkAriaInvalid = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkAriaInvalid]]
                  ),
                  e('span', null, p(i(t)('ariaInvalid')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkTabIndex',
                        'onUpdate:modelValue':
                          o[15] || (o[15] = (s) => (a.value.checkTabIndex = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkTabIndex]]
                  ),
                  e('span', null, p(i(t)('tabIndex')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkLang',
                        'onUpdate:modelValue': o[16] || (o[16] = (s) => (a.value.checkLang = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkLang]]
                  ),
                  e('span', null, p(i(t)('lang')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkLabels',
                        'onUpdate:modelValue': o[17] || (o[17] = (s) => (a.value.checkLabels = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkLabels]]
                  ),
                  e('span', null, p(i(t)('labelElements')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkTitle',
                        'onUpdate:modelValue': o[18] || (o[18] = (s) => (a.value.checkTitle = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkTitle]]
                  ),
                  e('span', null, p(i(t)('titleAttribute')), 1),
                ]),
                e('label', null, [
                  b(
                    e(
                      'input',
                      {
                        id: 'checkFocusStates',
                        'onUpdate:modelValue':
                          o[19] || (o[19] = (s) => (a.value.checkFocusStates = s)),
                        type: 'checkbox',
                        onChange: d,
                      },
                      null,
                      544
                    ),
                    [[g, a.value.checkFocusStates]]
                  ),
                  e('span', null, p(i(t)('focusStates')), 1),
                ]),
              ]),
            ]),
          ])
        )
      );
    },
  }),
  $e = { class: 'input-section' },
  Be = { class: 'input-group' },
  ze = ['placeholder'],
  Pe = { class: 'button-group' },
  Me = ['disabled'],
  De = T({
    __name: 'AnalysisForm',
    setup(f) {
      const l = O(),
        r = E(),
        { t } = r,
        a = v(''),
        n = y(() => l.isLoading);
      async function c() {
        if (a.value.trim()) {
          if (!a.value.startsWith('http://') && !a.value.startsWith('https://')) {
            alert(t('errorInvalidUrl'));
            return;
          }
          await l.analyze(a.value);
        }
      }
      return (h, u) => (
        k(),
        C('div', $e, [
          e('div', Be, [
            b(
              e(
                'input',
                {
                  'onUpdate:modelValue': u[0] || (u[0] = (m) => (a.value = m)),
                  type: 'text',
                  class: 'url-input-compact',
                  placeholder: i(t)('urlPlaceholder'),
                  onKeyup: Q(c, ['enter']),
                },
                null,
                40,
                ze
              ),
              [[K, a.value]]
            ),
            e('div', Pe, [
              e(
                'button',
                { class: 'btn-primary', disabled: n.value || !a.value.trim(), onClick: c },
                p(n.value ? i(t)('analyzing') : i(t)('analyzeBtn')),
                9,
                Me
              ),
              u[1] ||
                (u[1] = F(
                  '<button id="wcagInfoToggle" class="btn-info" aria-expanded="false" title="WCAG Information"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button>',
                  1
                )),
            ]),
          ]),
          I(Ve),
        ])
      );
    },
  }),
  Fe = { class: 'container' },
  qe = T({
    __name: 'App',
    setup(f) {
      const l = X(() => re(() => import('./Results-BuWE-Rdr.js'), __vite__mapDeps([0, 1]))),
        r = O(),
        t = y(() => !!r.results),
        a = y(() => r.results);
      return (n, c) => (
        k(),
        C('div', Fe, [
          I(ve),
          I(De),
          t.value
            ? (k(),
              J(
                Y,
                { key: 0 },
                {
                  default: $(() => [I(i(l), { data: a.value }, null, 8, ['data'])]),
                  fallback: $(() => [
                    ...(c[0] ||
                      (c[0] = [e('div', { class: 'loading' }, 'Loading results...', -1)])),
                  ]),
                  _: 1,
                }
              ))
            : q('', !0),
        ])
      );
    },
  }),
  He = (f, l) => {
    const r = f.__vccOpts || f;
    for (const [t, a] of l) r[t] = a;
    return r;
  },
  We = He(qe, [['__scopeId', 'data-v-bd4ee5e9']]),
  H = Z(We),
  je = ee();
H.use(je);
H.mount('#app');
export { E as u };
