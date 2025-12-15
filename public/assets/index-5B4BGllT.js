const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['assets/Results--7Bz_YBs.js', 'assets/vendor-CR1X3c2X.js'])
) => i.map((i) => d[i]);
import {
  d as R,
  r as _,
  a as S,
  o as V,
  c as I,
  b as L,
  w as b,
  e,
  v as x,
  u as c,
  f as $,
  g as C,
  h as F,
  i as M,
  j as H,
  n as G,
  F as Q,
  k as J,
  l as X,
  t as u,
  m as j,
  p as T,
  q as E,
  s as Y,
  x as Z,
  y as ee,
  z as q,
  A as ae,
  S as te,
  B as oe,
  C as ne,
} from './vendor-CR1X3c2X.js';
(function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) t(a);
  new MutationObserver((a) => {
    for (const o of a)
      if (o.type === 'childList')
        for (const r of o.addedNodes) r.tagName === 'LINK' && r.rel === 'modulepreload' && t(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(a) {
    const o = {};
    return (
      a.integrity && (o.integrity = a.integrity),
      a.referrerPolicy && (o.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : a.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    );
  }
  function t(a) {
    if (a.ep) return;
    a.ep = !0;
    const o = l(a);
    fetch(a.href, o);
  }
})();
const re = 'modulepreload',
  le = function (d) {
    return '/' + d;
  },
  z = {},
  se = function (s, l, t) {
    let a = Promise.resolve();
    if (l && l.length > 0) {
      document.getElementsByTagName('link');
      const r = document.querySelector('meta[property=csp-nonce]'),
        f = (r == null ? void 0 : r.nonce) || (r == null ? void 0 : r.getAttribute('nonce'));
      a = Promise.allSettled(
        l.map((g) => {
          if (((g = le(g)), g in z)) return;
          z[g] = !0;
          const w = g.endsWith('.css'),
            k = w ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${g}"]${k}`)) return;
          const p = document.createElement('link');
          if (
            ((p.rel = w ? 'stylesheet' : re),
            w || (p.as = 'script'),
            (p.crossOrigin = ''),
            (p.href = g),
            f && p.setAttribute('nonce', f),
            document.head.appendChild(p),
            w)
          )
            return new Promise((A, m) => {
              (p.addEventListener('load', A),
                p.addEventListener('error', () => m(new Error(`Unable to preload CSS for ${g}`))));
            });
        })
      );
    }
    function o(r) {
      const f = new Event('vite:preloadError', { cancelable: !0 });
      if (((f.payload = r), window.dispatchEvent(f), !f.defaultPrevented)) throw r;
    }
    return a.then((r) => {
      for (const f of r || []) f.status === 'rejected' && o(f.reason);
      return s().catch(o);
    });
  },
  O = R('language', () => {
    const d = _(localStorage.getItem('language') || 'en'),
      s = {
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
    function l(a) {
      ((d.value = a), localStorage.setItem('language', a), (document.documentElement.lang = a));
    }
    function t(a) {
      return s[d.value][a] || a;
    }
    return { currentLanguage: d, translations: s, setLanguage: l, t };
  }),
  ie = { class: 'language-toggle' },
  ce = ['id'],
  de = ['for'],
  W = S({
    __name: 'LanguageToggle',
    props: { mobile: { type: Boolean } },
    setup(d) {
      const s = d,
        l = O(),
        t = s.mobile ? 'languageToggleMobile' : 'languageToggle',
        a = _(l.currentLanguage === 'es');
      V(() => {
        a.value = l.currentLanguage === 'es';
      });
      function o() {
        l.setLanguage(a.value ? 'es' : 'en');
      }
      return (r, f) => (
        L(),
        I('div', ie, [
          b(
            e(
              'input',
              {
                id: c(t),
                'onUpdate:modelValue': f[0] || (f[0] = (g) => (a.value = g)),
                type: 'checkbox',
                class: 'language-toggle-input',
                onChange: o,
              },
              null,
              40,
              ce
            ),
            [[x, a.value]]
          ),
          e(
            'label',
            { for: c(t), class: 'language-toggle-label' },
            [
              ...(f[1] ||
                (f[1] = [
                  e('span', { class: 'toggle-option', 'data-lang': 'en' }, 'US', -1),
                  e('span', { class: 'toggle-separator' }, '/', -1),
                  e('span', { class: 'toggle-option', 'data-lang': 'es' }, 'ES', -1),
                ])),
            ],
            8,
            de
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
function P(d) {
  if (!d) return !1;
  if (d === '#ffffff' || d === 'white' || d === 'rgb(255, 255, 255)') return !0;
  const s = d.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (s) {
    const t = parseInt(s[1]),
      a = parseInt(s[2]),
      o = parseInt(s[3]);
    if (t > 240 && a > 240 && o > 240) return !0;
  }
  const l = d.replace('#', '');
  if (l.length === 3) {
    const t = parseInt(l[0] + l[0], 16),
      a = parseInt(l[1] + l[1], 16),
      o = parseInt(l[2] + l[2], 16);
    return (t + a + o) / 3 > 240;
  }
  if (l.length === 6) {
    const t = parseInt(l.substring(0, 2), 16),
      a = parseInt(l.substring(2, 4), 16),
      o = parseInt(l.substring(4, 6), 16);
    return (t + a + o) / 3 > 240;
  }
  return !1;
}
const fe = R('theme', () => {
    const d = _(localStorage.getItem('theme') || 'light');
    function s(t) {
      (U[t] || (t = 'light'), (d.value = t), localStorage.setItem('theme', t));
      const a = U[t],
        o = document.documentElement;
      (Object.keys(a).forEach((k) => {
        k !== 'name' && o.style.setProperty(k, a[k]);
      }),
        document.body.setAttribute('data-theme', t));
      const r = a['--primary-color'] || '#3b82f6',
        f = P(r),
        g = f ? '#1e293b' : '#ffffff';
      o.style.setProperty('--button-text-color', g);
      const w = f ? '#1e293b' : '#ffffff';
      (o.style.setProperty('--modal-header-text-color', w),
        o.style.setProperty(
          '--modal-close-bg',
          f ? 'rgba(30, 41, 59, 0.2)' : 'rgba(255, 255, 255, 0.2)'
        ),
        o.style.setProperty(
          '--modal-close-bg-hover',
          f ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.3)'
        ),
        l(t, r, f));
    }
    function l(t, a, o) {
      document.querySelectorAll('.theme-option[data-selected="true"]').forEach((f) => {
        const g = f;
        if (g.dataset.theme === t) {
          g.style.setProperty('background', a, 'important');
          const w = o ? '#1e293b' : '#ffffff';
          g.style.setProperty('color', w, 'important');
        }
      });
    }
    return (
      s(d.value),
      $(d, (t) => {
        s(t);
      }),
      { currentTheme: d, themes: U, applyTheme: s }
    );
  }),
  pe = { class: 'theme-selector' },
  ue = ['id', 'aria-expanded'],
  ge = ['id'],
  he = ['data-theme', 'data-selected', 'onClick'],
  D = S({
    __name: 'ThemeSelector',
    props: { mobile: { type: Boolean } },
    setup(d) {
      const s = d,
        l = fe(),
        t = s.mobile ? 'themeButtonMobile' : 'themeButton',
        a = s.mobile ? 'themeDropdownMobile' : 'themeDropdown',
        o = _(!1),
        r = C(() => l.themes),
        f = C(() => l.currentTheme);
      function g(A) {
        (A && A.stopPropagation(), (o.value = !o.value));
      }
      function w(A, m) {
        (m && m.stopPropagation(), l.applyTheme(A), (o.value = !1));
      }
      function k(A, m) {
        if (A === f.value) {
          const y = m['--primary-color'] || '#3b82f6',
            v = P(y);
          return {
            background: `${y} !important`,
            color: `${v ? '#1e293b' : '#ffffff'} !important`,
          };
        }
        return {};
      }
      function p(A) {
        const m = A.target,
          y = document.getElementById(t),
          v = document.getElementById(a),
          h = document.getElementById('mobileMenu');
        if (h && h.contains(m)) {
          y && v && !y.contains(m) && !v.contains(m) && (o.value = !1);
          return;
        }
        y && v && !y.contains(m) && !v.contains(m) && (o.value = !1);
      }
      return (
        $([f, o], () => {
          o.value &&
            setTimeout(() => {
              document.querySelectorAll('.theme-option').forEach((m) => {
                const y = m,
                  v = y.dataset.theme;
                if (v && r.value[v]) {
                  const h = r.value[v];
                  if (v === f.value) {
                    const n = h['--primary-color'] || '#3b82f6',
                      i = P(n);
                    (y.style.setProperty('background', n, 'important'),
                      y.style.setProperty('color', i ? '#1e293b' : '#ffffff', 'important'));
                  } else (y.style.removeProperty('background'), y.style.removeProperty('color'));
                }
              });
            }, 50);
        }),
        V(() => {
          document.addEventListener('click', p);
        }),
        F(() => {
          document.removeEventListener('click', p);
        }),
        (A, m) => (
          L(),
          I('div', pe, [
            e(
              'button',
              {
                id: c(t),
                class: 'theme-button',
                'aria-expanded': o.value,
                'aria-haspopup': 'true',
                title: 'Theme',
                onClick: M(g, ['stop']),
              },
              [
                ...(m[0] ||
                  (m[0] = [
                    H(
                      '<svg class="theme-button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect x="3" y="3" width="7" height="7" fill="#ef4444"></rect><rect x="14" y="3" width="7" height="7" fill="#3b82f6"></rect><rect x="3" y="14" width="7" height="7" fill="#10b981"></rect><rect x="14" y="14" width="7" height="7" fill="#f59e0b"></rect></svg>',
                      1
                    ),
                  ])),
              ],
              8,
              ue
            ),
            e(
              'div',
              { id: c(a), class: G(['theme-dropdown', { hidden: !o.value }]) },
              [
                (L(!0),
                I(
                  Q,
                  null,
                  J(
                    r.value,
                    (y, v) => (
                      L(),
                      I(
                        'button',
                        {
                          key: v,
                          class: 'theme-option',
                          'data-theme': v,
                          'data-selected': v === f.value,
                          style: X(k(v, y)),
                          onClick: M((h) => w(v, h), ['stop']),
                        },
                        u(y.name),
                        13,
                        he
                      )
                    )
                  ),
                  128
                )),
              ],
              10,
              ge
            ),
          ])
        )
      );
    },
  }),
  be = { class: 'header-top' },
  xe = { class: 'header-controls desktop-controls' },
  me = ['aria-expanded'],
  ve = { key: 0, id: 'mobileMenu', class: 'mobile-menu' },
  ye = { class: 'mobile-menu-content' },
  ke = { class: 'header-title-group' },
  we = { class: 'subtitle' },
  Ae = S({
    __name: 'Header',
    setup(d) {
      const s = O(),
        { t: l } = s,
        t = _(!1);
      function a() {
        t.value = !t.value;
      }
      return (o, r) => (
        L(),
        I('header', null, [
          e('div', be, [
            e('div', xe, [T(W), T(D)]),
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
                ...(r[0] ||
                  (r[0] = [
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
              me
            ),
            t.value ? (L(), I('div', ve, [e('div', ye, [T(W), T(D)])])) : j('', !0),
          ]),
          e('div', ke, [
            r[1] ||
              (r[1] = e(
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
            e('h1', null, u(c(l)('title')), 1),
          ]),
          e('p', we, u(c(l)('subtitle')), 1),
        ])
      );
    },
  }),
  B = R('analysis', () => {
    const d = _(!1),
      s = _(null),
      l = _(null),
      t = _({
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
    async function a(f) {
      ((d.value = !0), (l.value = null));
      try {
        const g = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: f, options: t.value }),
        });
        if (!g.ok) {
          const k = await g.json();
          throw new Error(k.message || 'Analysis failed');
        }
        const w = await g.json();
        s.value = w;
      } catch (g) {
        ((l.value = g.message || 'Failed to analyze page'), (s.value = null));
      } finally {
        d.value = !1;
      }
    }
    function o(f) {
      t.value = { ...t.value, ...f };
    }
    function r() {
      ((s.value = null), (l.value = null));
    }
    return {
      isLoading: d,
      results: s,
      error: l,
      options: t,
      analyze: a,
      updateOptions: o,
      reset: r,
    };
  }),
  Ce = { class: 'options-section' },
  _e = { class: 'options-container' },
  Le = { class: 'option-group' },
  Ie = { class: 'option-group-header' },
  Te = { class: 'radio-group' },
  Se = ['checked'],
  Ee = ['checked'],
  Oe = { class: 'checkbox-group' },
  Ue = { class: 'option-group attributes-group' },
  Me = { class: 'option-group-header' },
  Pe = { class: 'radio-group' },
  Re = ['checked'],
  Ve = ['checked'],
  $e = { class: 'checkbox-group' },
  Be = S({
    __name: 'OptionsPanel',
    setup(d) {
      const s = B(),
        l = O(),
        { t } = l,
        a = C(() => s.options),
        o = C(() => ['checkImages', 'checkLinks', 'checkButtons', 'checkInputs', 'checkRoles']),
        r = C(() => [
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
        f = C(() => o.value.every((h) => a.value[h])),
        g = C(() => o.value.every((h) => !a.value[h])),
        w = C(() => r.value.every((h) => a.value[h])),
        k = C(() => r.value.every((h) => !a.value[h]));
      function p() {}
      function A() {
        const h = {};
        (o.value.forEach((n) => {
          h[n] = !0;
        }),
          s.updateOptions(h));
      }
      function m() {
        const h = {};
        (o.value.forEach((n) => {
          h[n] = !1;
        }),
          s.updateOptions(h));
      }
      function y() {
        const h = {};
        (r.value.forEach((n) => {
          h[n] = !0;
        }),
          s.updateOptions(h));
      }
      function v() {
        const h = {};
        (r.value.forEach((n) => {
          h[n] = !1;
        }),
          s.updateOptions(h));
      }
      return (
        $(
          () => a.value,
          () => {},
          { deep: !0 }
        ),
        (h, n) => (
          L(),
          I('div', Ce, [
            e('h2', null, u(c(t)('analysisOptions')), 1),
            e('div', _e, [
              e('div', Le, [
                e('div', Ie, [
                  e('h3', null, u(c(t)('elementsToCheck')), 1),
                  e('div', Te, [
                    e('label', null, [
                      e(
                        'input',
                        { type: 'radio', name: 'elements', checked: f.value, onChange: A },
                        null,
                        40,
                        Se
                      ),
                      E(' ' + u(c(t)('selectAll')), 1),
                    ]),
                    e('label', null, [
                      e(
                        'input',
                        { type: 'radio', name: 'elements', checked: g.value, onChange: m },
                        null,
                        40,
                        Ee
                      ),
                      E(' ' + u(c(t)('deselectAll')), 1),
                    ]),
                  ]),
                ]),
                e('div', Oe, [
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkImages',
                          'onUpdate:modelValue': n[0] || (n[0] = (i) => (a.value.checkImages = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkImages]]
                    ),
                    e('span', null, u(c(t)('images')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkLinks',
                          'onUpdate:modelValue': n[1] || (n[1] = (i) => (a.value.checkLinks = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkLinks]]
                    ),
                    e('span', null, u(c(t)('links')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkButtons',
                          'onUpdate:modelValue': n[2] || (n[2] = (i) => (a.value.checkButtons = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkButtons]]
                    ),
                    e('span', null, u(c(t)('buttons')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkInputs',
                          'onUpdate:modelValue': n[3] || (n[3] = (i) => (a.value.checkInputs = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkInputs]]
                    ),
                    e('span', null, u(c(t)('inputs')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkRoles',
                          'onUpdate:modelValue': n[4] || (n[4] = (i) => (a.value.checkRoles = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkRoles]]
                    ),
                    e('span', null, u(c(t)('elementsWithRole')), 1),
                  ]),
                ]),
              ]),
              e('div', Ue, [
                e('div', Me, [
                  e('h3', null, u(c(t)('attributesToCheck')), 1),
                  e('div', Pe, [
                    e('label', null, [
                      e(
                        'input',
                        { type: 'radio', name: 'attributes', checked: w.value, onChange: y },
                        null,
                        40,
                        Re
                      ),
                      E(' ' + u(c(t)('selectAll')), 1),
                    ]),
                    e('label', null, [
                      e(
                        'input',
                        { type: 'radio', name: 'attributes', checked: k.value, onChange: v },
                        null,
                        40,
                        Ve
                      ),
                      E(' ' + u(c(t)('deselectAll')), 1),
                    ]),
                  ]),
                ]),
                e('div', $e, [
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAltText',
                          'onUpdate:modelValue': n[5] || (n[5] = (i) => (a.value.checkAltText = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAltText]]
                    ),
                    e('span', null, u(c(t)('altText')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaLabel',
                          'onUpdate:modelValue':
                            n[6] || (n[6] = (i) => (a.value.checkAriaLabel = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaLabel]]
                    ),
                    e('span', null, u(c(t)('ariaLabel')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaLabelledby',
                          'onUpdate:modelValue':
                            n[7] || (n[7] = (i) => (a.value.checkAriaLabelledby = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaLabelledby]]
                    ),
                    e('span', null, u(c(t)('ariaLabelledby')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaDescribedby',
                          'onUpdate:modelValue':
                            n[8] || (n[8] = (i) => (a.value.checkAriaDescribedby = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaDescribedby]]
                    ),
                    e('span', null, u(c(t)('ariaDescribedby')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaHidden',
                          'onUpdate:modelValue':
                            n[9] || (n[9] = (i) => (a.value.checkAriaHidden = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaHidden]]
                    ),
                    e('span', null, u(c(t)('ariaHidden')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaExpanded',
                          'onUpdate:modelValue':
                            n[10] || (n[10] = (i) => (a.value.checkAriaExpanded = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaExpanded]]
                    ),
                    e('span', null, u(c(t)('ariaExpanded')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaControls',
                          'onUpdate:modelValue':
                            n[11] || (n[11] = (i) => (a.value.checkAriaControls = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaControls]]
                    ),
                    e('span', null, u(c(t)('ariaControls')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaCurrent',
                          'onUpdate:modelValue':
                            n[12] || (n[12] = (i) => (a.value.checkAriaCurrent = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaCurrent]]
                    ),
                    e('span', null, u(c(t)('ariaCurrent')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaRequired',
                          'onUpdate:modelValue':
                            n[13] || (n[13] = (i) => (a.value.checkAriaRequired = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaRequired]]
                    ),
                    e('span', null, u(c(t)('ariaRequired')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkAriaInvalid',
                          'onUpdate:modelValue':
                            n[14] || (n[14] = (i) => (a.value.checkAriaInvalid = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkAriaInvalid]]
                    ),
                    e('span', null, u(c(t)('ariaInvalid')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkTabIndex',
                          'onUpdate:modelValue':
                            n[15] || (n[15] = (i) => (a.value.checkTabIndex = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkTabIndex]]
                    ),
                    e('span', null, u(c(t)('tabIndex')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkLang',
                          'onUpdate:modelValue': n[16] || (n[16] = (i) => (a.value.checkLang = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkLang]]
                    ),
                    e('span', null, u(c(t)('lang')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkLabels',
                          'onUpdate:modelValue':
                            n[17] || (n[17] = (i) => (a.value.checkLabels = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkLabels]]
                    ),
                    e('span', null, u(c(t)('labelElements')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkTitle',
                          'onUpdate:modelValue': n[18] || (n[18] = (i) => (a.value.checkTitle = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkTitle]]
                    ),
                    e('span', null, u(c(t)('titleAttribute')), 1),
                  ]),
                  e('label', null, [
                    b(
                      e(
                        'input',
                        {
                          id: 'checkFocusStates',
                          'onUpdate:modelValue':
                            n[19] || (n[19] = (i) => (a.value.checkFocusStates = i)),
                          type: 'checkbox',
                          onChange: p,
                        },
                        null,
                        544
                      ),
                      [[x, a.value.checkFocusStates]]
                    ),
                    e('span', null, u(c(t)('focusStates')), 1),
                  ]),
                ]),
              ]),
            ]),
          ])
        )
      );
    },
  }),
  N = (d, s) => {
    const l = d.__vccOpts || d;
    for (const [t, a] of s) l[t] = a;
    return l;
  },
  qe = N(Be, [['__scopeId', 'data-v-b9adb488']]),
  ze = S({
    __name: 'WcagInfoModal',
    setup(d) {
      const s = _(!1);
      function l() {
        ((s.value = !0), (document.body.style.overflow = 'hidden'));
      }
      function t() {
        ((s.value = !1), (document.body.style.overflow = ''));
      }
      function a(o) {
        o.key === 'Escape' && s.value && t();
      }
      return (
        V(() => {
          (document.addEventListener('keydown', a),
            (window.openWcagModal = l),
            (window.closeWcagModal = t));
        }),
        F(() => {
          (document.removeEventListener('keydown', a),
            delete window.openWcagModal,
            delete window.closeWcagModal);
        }),
        (o, r) => (
          L(),
          I(
            'div',
            {
              id: 'wcagInfoSection',
              class: G(['wcag-info-modal', { hidden: !s.value }]),
              onClick: M(t, ['self']),
            },
            [
              e('div', { class: 'wcag-modal-overlay', onClick: t }),
              e('div', { class: 'wcag-modal-content' }, [
                e('div', { class: 'wcag-modal-header' }, [
                  r[0] || (r[0] = e('h4', null, 'WCAG 2.2 AA Accessibility Guidelines', -1)),
                  e(
                    'button',
                    {
                      id: 'wcagInfoClose',
                      class: 'wcag-modal-close',
                      onClick: t,
                      'aria-label': 'Close',
                    },
                    ' × '
                  ),
                ]),
                r[1] ||
                  (r[1] = H(
                    '<div class="wcag-info-content"><div class="wcag-info-grid"><div class="wcag-item"><strong>Alt Text</strong><p>All images must have descriptive <strong>alt</strong> attributes. Decorative images should use <strong>alt=&quot;&quot;</strong>.</p></div><div class="wcag-item"><strong>aria-label</strong><p>Provides an accessible name for elements that don&#39;t have visible text labels.</p></div><div class="wcag-item"><strong>aria-labelledby</strong><p>References another element that provides the accessible name.</p></div><div class="wcag-item"><strong>aria-describedby</strong><p>References elements that provide additional descriptive information.</p></div><div class="wcag-item"><strong>aria-hidden</strong><p>Should be used carefully. Hides decorative elements from screen readers.</p></div><div class="wcag-item"><strong>aria-expanded</strong><p>Indicates whether collapsible elements are expanded or collapsed.</p></div><div class="wcag-item"><strong>aria-controls</strong><p>Identifies elements controlled by the current element.</p></div><div class="wcag-item"><strong>aria-current</strong><p>Indicates the current item in a set of related elements.</p></div><div class="wcag-item"><strong>aria-required</strong><p>Indicates that user input is required for form controls.</p></div><div class="wcag-item"><strong>aria-invalid</strong><p>Indicates that the value entered is invalid.</p></div><div class="wcag-item"><strong>tabindex</strong><p>Controls keyboard navigation. Use <strong>tabindex=&quot;0&quot;</strong> for focusable elements, avoid positive values.</p></div><div class="wcag-item"><strong>lang</strong><p>Specifies the language of the element&#39;s content for screen readers.</p></div><div class="wcag-item"><strong>&lt;label&gt; elements</strong><p>All form inputs should have associated <strong>&lt;label&gt;</strong> elements.</p></div><div class="wcag-item"><strong>title attribute</strong><p>Provides additional tooltip information, but should not be the only way to convey important information.</p></div><div class="wcag-item"><strong>Focus States</strong><p>All interactive elements must have visible focus indicators that meet WCAG 2.2 AA contrast requirements.</p></div></div></div>',
                    1
                  )),
              ]),
            ],
            2
          )
        )
      );
    },
  }),
  We = { class: 'input-section' },
  De = { class: 'input-group' },
  Fe = ['placeholder'],
  He = { class: 'button-group' },
  Ge = ['disabled'],
  je = ['aria-expanded'],
  Ne = S({
    __name: 'AnalysisForm',
    setup(d) {
      const s = B(),
        l = O(),
        { t } = l,
        a = _(''),
        o = C(() => s.isLoading),
        r = _(!1);
      function f() {
        ((r.value = !r.value),
          window.openWcagModal && r.value
            ? window.openWcagModal()
            : window.closeWcagModal && !r.value && window.closeWcagModal());
      }
      async function g() {
        if (a.value.trim()) {
          if (!a.value.startsWith('http://') && !a.value.startsWith('https://')) {
            alert(t('errorInvalidUrl'));
            return;
          }
          await s.analyze(a.value);
        }
      }
      return (w, k) => (
        L(),
        I('div', We, [
          e('div', De, [
            b(
              e(
                'input',
                {
                  'onUpdate:modelValue': k[0] || (k[0] = (p) => (a.value = p)),
                  type: 'text',
                  class: 'url-input-compact',
                  placeholder: c(t)('urlPlaceholder'),
                  onKeyup: Z(g, ['enter']),
                },
                null,
                40,
                Fe
              ),
              [[Y, a.value]]
            ),
            e('div', He, [
              e(
                'button',
                { class: 'btn-primary', disabled: o.value || !a.value.trim(), onClick: g },
                u(o.value ? c(t)('analyzing') : c(t)('analyzeBtn')),
                9,
                Ge
              ),
              e(
                'button',
                {
                  id: 'wcagInfoToggle',
                  class: 'btn-info',
                  'aria-expanded': r.value,
                  title: 'WCAG Information',
                  onClick: f,
                },
                [
                  ...(k[1] ||
                    (k[1] = [
                      e(
                        'svg',
                        {
                          xmlns: 'http://www.w3.org/2000/svg',
                          viewBox: '0 0 24 24',
                          fill: 'none',
                          stroke: 'currentColor',
                          'stroke-width': '2',
                          width: '20',
                          height: '20',
                        },
                        [
                          e('circle', { cx: '12', cy: '12', r: '10' }),
                          e('path', { d: 'M12 16v-4' }),
                          e('path', { d: 'M12 8h.01' }),
                        ],
                        -1
                      ),
                    ])),
                ],
                8,
                je
              ),
            ]),
          ]),
          T(qe),
          T(ze),
        ])
      );
    },
  }),
  Ke = { class: 'container' },
  Qe = S({
    __name: 'App',
    setup(d) {
      const s = ae(() => se(() => import('./Results--7Bz_YBs.js'), __vite__mapDeps([0, 1]))),
        l = B(),
        t = C(() => !!l.results),
        a = C(() => l.results);
      return (o, r) => (
        L(),
        I('div', Ke, [
          T(Ae),
          T(Ne),
          t.value
            ? (L(),
              ee(
                te,
                { key: 0 },
                {
                  default: q(() => [T(c(s), { data: a.value }, null, 8, ['data'])]),
                  fallback: q(() => [
                    ...(r[0] ||
                      (r[0] = [e('div', { class: 'loading' }, 'Loading results...', -1)])),
                  ]),
                  _: 1,
                }
              ))
            : j('', !0),
        ])
      );
    },
  }),
  Je = N(Qe, [['__scopeId', 'data-v-bd4ee5e9']]),
  K = oe(Je),
  Xe = ne();
K.use(Xe);
K.mount('#app');
export { O as u };
