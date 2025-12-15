const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['assets/Results-BQ6i_MMp.js', 'assets/vendor-DJJw8Pl3.js'])
) => i.map((i) => d[i]);
import {
  d as L,
  r as g,
  a as _,
  o as z,
  c as u,
  b as x,
  w as P,
  e as n,
  v as R,
  u as i,
  f as D,
  g as A,
  h as V,
  i as B,
  n as F,
  F as j,
  j as q,
  t as h,
  k as M,
  l as b,
  m as T,
  p as H,
  q as W,
  s as G,
  x as I,
  y as K,
  S as N,
  z as Q,
  A as J,
} from './vendor-DJJw8Pl3.js';
(function () {
  const o = document.createElement('link').relList;
  if (o && o.supports && o.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) a(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === 'childList')
        for (const l of t.addedNodes) l.tagName === 'LINK' && l.rel === 'modulepreload' && a(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (t.credentials = 'include')
        : e.crossOrigin === 'anonymous'
          ? (t.credentials = 'omit')
          : (t.credentials = 'same-origin'),
      t
    );
  }
  function a(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = r(e);
    fetch(e.href, t);
  }
})();
const X = 'modulepreload',
  Y = function (s) {
    return '/' + s;
  },
  E = {},
  Z = function (o, r, a) {
    let e = Promise.resolve();
    if (r && r.length > 0) {
      document.getElementsByTagName('link');
      const l = document.querySelector('meta[property=csp-nonce]'),
        f = (l == null ? void 0 : l.nonce) || (l == null ? void 0 : l.getAttribute('nonce'));
      e = Promise.allSettled(
        r.map((c) => {
          if (((c = Y(c)), c in E)) return;
          E[c] = !0;
          const p = c.endsWith('.css'),
            w = p ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${c}"]${w}`)) return;
          const d = document.createElement('link');
          if (
            ((d.rel = p ? 'stylesheet' : X),
            p || (d.as = 'script'),
            (d.crossOrigin = ''),
            (d.href = c),
            f && d.setAttribute('nonce', f),
            document.head.appendChild(d),
            p)
          )
            return new Promise((m, v) => {
              (d.addEventListener('load', m),
                d.addEventListener('error', () => v(new Error(`Unable to preload CSS for ${c}`))));
            });
        })
      );
    }
    function t(l) {
      const f = new Event('vite:preloadError', { cancelable: !0 });
      if (((f.payload = l), window.dispatchEvent(f), !f.defaultPrevented)) throw l;
    }
    return e.then((l) => {
      for (const f of l || []) f.status === 'rejected' && t(f.reason);
      return o().catch(t);
    });
  },
  k = L('language', () => {
    const s = g(localStorage.getItem('language') || 'en'),
      o = {
        en: {
          title: 'QA Web Analyzer',
          subtitle: 'Accessibility Analysis Tool',
          urlPlaceholder: 'Enter URL (e.g., http://localhost:3000 or https://example.com)',
          analyzeBtn: 'Analyze',
          analyzing: 'Analyzing page...',
          analysisOptions: 'Analysis Options',
          elementsToCheck: 'Elements to Check',
          attributesToCheck: 'Attributes to Check',
          selectAll: 'Select All',
          deselectAll: 'Deselect All',
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
          selectAll: 'Seleccionar Todo',
          deselectAll: 'Deseleccionar Todo',
          summary: 'Resumen',
          errorUrlRequired: 'Por favor ingresa una URL',
          errorInvalidUrl: 'La URL debe comenzar con http:// o https://',
          errorAnalysisFailed: 'Error al analizar la página',
        },
      };
    function r(e) {
      ((s.value = e), localStorage.setItem('language', e), (document.documentElement.lang = e));
    }
    function a(e) {
      return o[s.value][e] || e;
    }
    return { currentLanguage: s, translations: o, setLanguage: r, t: a };
  }),
  ee = { class: 'language-toggle' },
  re = ['id'],
  ae = ['for'],
  $ = _({
    __name: 'LanguageToggle',
    props: { mobile: { type: Boolean } },
    setup(s) {
      const o = s,
        r = k(),
        a = o.mobile ? 'languageToggleMobile' : 'languageToggle',
        e = g(r.currentLanguage === 'es');
      z(() => {
        e.value = r.currentLanguage === 'es';
      });
      function t() {
        r.setLanguage(e.value ? 'es' : 'en');
      }
      return (l, f) => (
        x(),
        u('div', ee, [
          P(
            n(
              'input',
              {
                id: i(a),
                'onUpdate:modelValue': f[0] || (f[0] = (c) => (e.value = c)),
                type: 'checkbox',
                class: 'language-toggle-input',
                onChange: t,
              },
              null,
              40,
              re
            ),
            [[R, e.value]]
          ),
          n(
            'label',
            { for: i(a), class: 'language-toggle-label' },
            [
              ...(f[1] ||
                (f[1] = [
                  n('span', { class: 'toggle-option', 'data-lang': 'en' }, 'US', -1),
                  n('span', { class: 'toggle-separator' }, '/', -1),
                  n('span', { class: 'toggle-option', 'data-lang': 'es' }, 'ES', -1),
                ])),
            ],
            8,
            ae
          ),
        ])
      );
    },
  }),
  C = {
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
function te(s) {
  if (s === '#ffffff' || s === 'white' || s === 'rgb(255, 255, 255)') return !0;
  const o = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (o) {
    const a = parseInt(o[1]),
      e = parseInt(o[2]),
      t = parseInt(o[3]);
    if (a > 240 && e > 240 && t > 240) return !0;
  }
  const r = s.replace('#', '');
  if (r.length === 3) {
    const a = parseInt(r[0] + r[0], 16),
      e = parseInt(r[1] + r[1], 16),
      t = parseInt(r[2] + r[2], 16);
    return (a + e + t) / 3 > 240;
  }
  if (r.length === 6) {
    const a = parseInt(r.substring(0, 2), 16),
      e = parseInt(r.substring(2, 4), 16),
      t = parseInt(r.substring(4, 6), 16);
    return (a + e + t) / 3 > 240;
  }
  return !1;
}
const oe = L('theme', () => {
    const s = g(localStorage.getItem('theme') || 'light');
    function o(r) {
      (C[r] || (r = 'light'), (s.value = r), localStorage.setItem('theme', r));
      const a = C[r],
        e = document.documentElement;
      (Object.keys(a).forEach((c) => {
        c !== 'name' && e.style.setProperty(c, a[c]);
      }),
        document.body.setAttribute('data-theme', r));
      const t = a['--primary-color'] || '#3b82f6',
        f = te(t) ? '#1e293b' : '#ffffff';
      e.style.setProperty('--button-text-color', f);
    }
    return (
      o(s.value),
      D(s, (r) => {
        o(r);
      }),
      { currentTheme: s, themes: C, applyTheme: o }
    );
  }),
  ne = { class: 'theme-selector' },
  se = ['id', 'aria-expanded'],
  le = ['id'],
  ce = ['data-theme', 'data-selected', 'onClick'],
  O = _({
    __name: 'ThemeSelector',
    props: { mobile: { type: Boolean } },
    setup(s) {
      const o = s,
        r = oe(),
        a = o.mobile ? 'themeButtonMobile' : 'themeButton',
        e = o.mobile ? 'themeDropdownMobile' : 'themeDropdown',
        t = g(!1),
        l = A(() => r.themes),
        f = A(() => r.currentTheme);
      function c() {
        t.value = !t.value;
      }
      function p(d) {
        (r.applyTheme(d), (t.value = !1));
      }
      function w(d) {
        const m = d.target,
          v = document.getElementById(a),
          y = document.getElementById(e);
        v && y && !v.contains(m) && !y.contains(m) && (t.value = !1);
      }
      return (
        z(() => {
          document.addEventListener('click', w);
        }),
        V(() => {
          document.removeEventListener('click', w);
        }),
        (d, m) => (
          x(),
          u('div', ne, [
            n(
              'button',
              {
                id: i(a),
                class: 'theme-button',
                'aria-expanded': t.value,
                'aria-haspopup': 'true',
                title: 'Theme',
                onClick: c,
              },
              [
                ...(m[0] ||
                  (m[0] = [
                    B(
                      '<svg class="theme-button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect x="3" y="3" width="7" height="7" fill="#ef4444"></rect><rect x="14" y="3" width="7" height="7" fill="#3b82f6"></rect><rect x="3" y="14" width="7" height="7" fill="#10b981"></rect><rect x="14" y="14" width="7" height="7" fill="#f59e0b"></rect></svg>',
                      1
                    ),
                  ])),
              ],
              8,
              se
            ),
            n(
              'div',
              { id: i(e), class: F(['theme-dropdown', { hidden: !t.value }]) },
              [
                (x(!0),
                u(
                  j,
                  null,
                  q(
                    l.value,
                    (v, y) => (
                      x(),
                      u(
                        'button',
                        {
                          key: y,
                          class: 'theme-option',
                          'data-theme': y,
                          'data-selected': y === f.value,
                          onClick: (ze) => p(y),
                        },
                        h(v.name),
                        9,
                        ce
                      )
                    )
                  ),
                  128
                )),
              ],
              10,
              le
            ),
          ])
        )
      );
    },
  }),
  fe = { class: 'header-top' },
  ie = { class: 'header-controls desktop-controls' },
  de = ['aria-expanded'],
  pe = { key: 0, id: 'mobileMenu', class: 'mobile-menu' },
  ge = { class: 'mobile-menu-content' },
  xe = { class: 'header-title-group' },
  ue = { class: 'subtitle' },
  he = _({
    __name: 'Header',
    setup(s) {
      const o = k(),
        { t: r } = o,
        a = g(!1);
      function e() {
        a.value = !a.value;
      }
      return (t, l) => (
        x(),
        u('header', null, [
          n('div', fe, [
            n('div', ie, [b($), b(O)]),
            n(
              'button',
              {
                id: 'mobileMenuToggle',
                class: 'mobile-menu-toggle',
                'aria-expanded': a.value,
                'aria-label': 'Menu',
                onClick: e,
              },
              [
                ...(l[0] ||
                  (l[0] = [
                    n(
                      'svg',
                      {
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                      },
                      [
                        n('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
                        n('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
                        n('line', { x1: '3', y1: '18', x2: '21', y2: '18' }),
                      ],
                      -1
                    ),
                  ])),
              ],
              8,
              de
            ),
            a.value ? (x(), u('div', pe, [n('div', ge, [b($), b(O)])])) : M('', !0),
          ]),
          n('div', xe, [
            l[1] ||
              (l[1] = n(
                'svg',
                {
                  class: 'header-icon',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  'stroke-width': '2',
                },
                [
                  n('path', { d: 'M9 11l3 3L22 4' }),
                  n('path', { d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' }),
                ],
                -1
              )),
            n('h1', null, h(i(r)('title')), 1),
          ]),
          n('p', ue, h(i(r)('subtitle')), 1),
        ])
      );
    },
  }),
  S = L('analysis', () => {
    const s = g(!1),
      o = g(null),
      r = g(null),
      a = g({
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
    async function e(f) {
      ((s.value = !0), (r.value = null));
      try {
        const c = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: f, options: a.value }),
        });
        if (!c.ok) {
          const w = await c.json();
          throw new Error(w.message || 'Analysis failed');
        }
        const p = await c.json();
        o.value = p;
      } catch (c) {
        ((r.value = c.message || 'Failed to analyze page'), (o.value = null));
      } finally {
        s.value = !1;
      }
    }
    function t(f) {
      a.value = { ...a.value, ...f };
    }
    function l() {
      ((o.value = null), (r.value = null));
    }
    return {
      isLoading: s,
      results: o,
      error: r,
      options: a,
      analyze: e,
      updateOptions: t,
      reset: l,
    };
  }),
  be = { class: 'options-section' },
  me = { class: 'option-group' },
  ye = { class: 'option-group-header' },
  we = { class: 'radio-group' },
  ve = _({
    __name: 'OptionsPanel',
    setup(s) {
      S();
      const o = k(),
        { t: r } = o;
      function a() {}
      function e() {}
      return (t, l) => (
        x(),
        u('div', be, [
          n('h2', null, h(i(r)('analysisOptions')), 1),
          n('div', me, [
            n('div', ye, [
              n('h3', null, h(i(r)('elementsToCheck')), 1),
              n('div', we, [
                n('label', null, [
                  n(
                    'input',
                    { type: 'radio', name: 'elements', value: 'all', onChange: a },
                    null,
                    32
                  ),
                  T(' ' + h(i(r)('selectAll')), 1),
                ]),
                n('label', null, [
                  n(
                    'input',
                    { type: 'radio', name: 'elements', value: 'none', onChange: e },
                    null,
                    32
                  ),
                  T(' ' + h(i(r)('deselectAll')), 1),
                ]),
              ]),
            ]),
          ]),
        ])
      );
    },
  }),
  _e = { class: 'input-section' },
  Ae = { class: 'input-group' },
  ke = ['placeholder'],
  Ce = { class: 'button-group' },
  Le = ['disabled'],
  Se = _({
    __name: 'AnalysisForm',
    setup(s) {
      const o = S(),
        r = k(),
        { t: a } = r,
        e = g(''),
        t = A(() => o.isLoading);
      async function l() {
        if (e.value.trim()) {
          if (!e.value.startsWith('http://') && !e.value.startsWith('https://')) {
            alert(a('errorInvalidUrl'));
            return;
          }
          await o.analyze(e.value);
        }
      }
      return (f, c) => (
        x(),
        u('div', _e, [
          n('div', Ae, [
            P(
              n(
                'input',
                {
                  'onUpdate:modelValue': c[0] || (c[0] = (p) => (e.value = p)),
                  type: 'text',
                  class: 'url-input-compact',
                  placeholder: i(a)('urlPlaceholder'),
                  onKeyup: W(l, ['enter']),
                },
                null,
                40,
                ke
              ),
              [[H, e.value]]
            ),
            n('div', Ce, [
              n(
                'button',
                { class: 'btn-primary', disabled: t.value || !e.value.trim(), onClick: l },
                h(t.value ? i(a)('analyzing') : i(a)('analyzeBtn')),
                9,
                Le
              ),
              c[1] ||
                (c[1] = B(
                  '<button id="wcagInfoToggle" class="btn-info" aria-expanded="false" title="WCAG Information"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button>',
                  1
                )),
            ]),
          ]),
          b(ve),
        ])
      );
    },
  }),
  Te = { class: 'container' },
  Ie = _({
    __name: 'App',
    setup(s) {
      const o = K(() => Z(() => import('./Results-BQ6i_MMp.js'), __vite__mapDeps([0, 1]))),
        r = S(),
        a = A(() => !!r.results),
        e = A(() => r.results);
      return (t, l) => (
        x(),
        u('div', Te, [
          b(he),
          b(Se),
          a.value
            ? (x(),
              G(
                N,
                { key: 0 },
                {
                  default: I(() => [b(i(o), { data: e.value }, null, 8, ['data'])]),
                  fallback: I(() => [
                    ...(l[0] ||
                      (l[0] = [n('div', { class: 'loading' }, 'Loading results...', -1)])),
                  ]),
                  _: 1,
                }
              ))
            : M('', !0),
        ])
      );
    },
  }),
  Ee = (s, o) => {
    const r = s.__vccOpts || s;
    for (const [a, e] of o) r[a] = e;
    return r;
  },
  $e = Ee(Ie, [['__scopeId', 'data-v-6d169837']]),
  U = Q($e),
  Oe = J();
U.use(Oe);
U.mount('#app');
export { k as u };
