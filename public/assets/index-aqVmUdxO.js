const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f || (m.f = ['assets/Results-7og6aEXv.js', 'assets/vendor-DJJw8Pl3.js'])
) => i.map((i) => d[i]);
import {
  d as S,
  r as h,
  a as k,
  o as I,
  c as g,
  b as m,
  w as O,
  e as o,
  v as D,
  u,
  f as V,
  g as x,
  h as U,
  i as M,
  n as R,
  F as j,
  j as F,
  t as f,
  k as P,
  l as v,
  m as C,
  p as W,
  q,
  s as H,
  x as $,
  y as K,
  S as N,
  z as G,
  A as Q,
} from './vendor-DJJw8Pl3.js';
(function () {
  const a = document.createElement('link').relList;
  if (a && a.supports && a.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
  new MutationObserver((e) => {
    for (const l of e)
      if (l.type === 'childList')
        for (const s of l.addedNodes) s.tagName === 'LINK' && s.rel === 'modulepreload' && t(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const l = {};
    return (
      e.integrity && (l.integrity = e.integrity),
      e.referrerPolicy && (l.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (l.credentials = 'include')
        : e.crossOrigin === 'anonymous'
          ? (l.credentials = 'omit')
          : (l.credentials = 'same-origin'),
      l
    );
  }
  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    const l = n(e);
    fetch(e.href, l);
  }
})();
const J = 'modulepreload',
  X = function (r) {
    return '/' + r;
  },
  E = {},
  Y = function (a, n, t) {
    let e = Promise.resolve();
    if (n && n.length > 0) {
      document.getElementsByTagName('link');
      const s = document.querySelector('meta[property=csp-nonce]'),
        c = (s == null ? void 0 : s.nonce) || (s == null ? void 0 : s.getAttribute('nonce'));
      e = Promise.allSettled(
        n.map((i) => {
          if (((i = X(i)), i in E)) return;
          E[i] = !0;
          const p = i.endsWith('.css'),
            b = p ? '[rel="stylesheet"]' : '';
          if (document.querySelector(`link[href="${i}"]${b}`)) return;
          const d = document.createElement('link');
          if (
            ((d.rel = p ? 'stylesheet' : J),
            p || (d.as = 'script'),
            (d.crossOrigin = ''),
            (d.href = i),
            c && d.setAttribute('nonce', c),
            document.head.appendChild(d),
            p)
          )
            return new Promise((_, w) => {
              (d.addEventListener('load', _),
                d.addEventListener('error', () => w(new Error(`Unable to preload CSS for ${i}`))));
            });
        })
      );
    }
    function l(s) {
      const c = new Event('vite:preloadError', { cancelable: !0 });
      if (((c.payload = s), window.dispatchEvent(c), !c.defaultPrevented)) throw s;
    }
    return e.then((s) => {
      for (const c of s || []) c.status === 'rejected' && l(c.reason);
      return a().catch(l);
    });
  },
  A = S('language', () => {
    const r = h(localStorage.getItem('language') || 'en'),
      a = {
        en: {
          title: 'QA Web Analyzer',
          subtitle: 'Accessibility Analysis Tool',
          analyzeBtn: 'Analyze',
        },
        es: {
          title: 'QA Web Analyzer',
          subtitle: 'Herramienta de Análisis de Accesibilidad',
          analyzeBtn: 'Analizar',
        },
      };
    function n(e) {
      ((r.value = e), localStorage.setItem('language', e), (document.documentElement.lang = e));
    }
    function t(e) {
      return a[r.value][e] || e;
    }
    return { currentLanguage: r, translations: a, setLanguage: n, t };
  }),
  Z = { class: 'language-toggle' },
  ee = ['id'],
  te = ['for'],
  T = k({
    __name: 'LanguageToggle',
    props: { mobile: { type: Boolean } },
    setup(r) {
      const a = r,
        n = A(),
        t = a.mobile ? 'languageToggleMobile' : 'languageToggle',
        e = h(n.currentLanguage === 'es');
      I(() => {
        e.value = n.currentLanguage === 'es';
      });
      function l() {
        n.setLanguage(e.value ? 'es' : 'en');
      }
      return (s, c) => (
        m(),
        g('div', Z, [
          O(
            o(
              'input',
              {
                id: u(t),
                'onUpdate:modelValue': c[0] || (c[0] = (i) => (e.value = i)),
                type: 'checkbox',
                class: 'language-toggle-input',
                onChange: l,
              },
              null,
              40,
              ee
            ),
            [[D, e.value]]
          ),
          o(
            'label',
            { for: u(t), class: 'language-toggle-label' },
            [
              ...(c[1] ||
                (c[1] = [
                  o('span', { class: 'toggle-option', 'data-lang': 'en' }, 'US', -1),
                  o('span', { class: 'toggle-separator' }, '/', -1),
                  o('span', { class: 'toggle-option', 'data-lang': 'es' }, 'ES', -1),
                ])),
            ],
            8,
            te
          ),
        ])
      );
    },
  }),
  ne = S('theme', () => {
    const r = h(localStorage.getItem('theme') || 'light'),
      a = {
        light: { name: 'Light Mode', '--primary-color': '#3b82f6' },
        dark: { name: 'Dark Mode', '--primary-color': '#3b82f6' },
        glassmorphism: { name: 'Glassmorphism', '--primary-color': '#ffffff' },
      };
    function n(t) {
      (a[t] || (t = 'light'), (r.value = t), localStorage.setItem('theme', t));
      const e = a[t],
        l = document.documentElement;
      (Object.keys(e).forEach((s) => {
        s !== 'name' && l.style.setProperty(s, e[s]);
      }),
        document.body.setAttribute('data-theme', t));
    }
    return (
      n(r.value),
      V(r, (t) => {
        n(t);
      }),
      { currentTheme: r, themes: a, applyTheme: n }
    );
  }),
  se = { class: 'theme-selector' },
  oe = ['id', 'aria-expanded'],
  ae = ['id'],
  le = ['data-theme', 'data-selected', 'onClick'],
  B = k({
    __name: 'ThemeSelector',
    props: { mobile: { type: Boolean } },
    setup(r) {
      const a = r,
        n = ne(),
        t = a.mobile ? 'themeButtonMobile' : 'themeButton',
        e = a.mobile ? 'themeDropdownMobile' : 'themeDropdown',
        l = h(!1),
        s = x(() => n.themes),
        c = x(() => n.currentTheme);
      function i() {
        l.value = !l.value;
      }
      function p(d) {
        (n.applyTheme(d), (l.value = !1));
      }
      function b(d) {
        const _ = d.target,
          w = document.getElementById(t),
          y = document.getElementById(e);
        w && y && !w.contains(_) && !y.contains(_) && (l.value = !1);
      }
      return (
        I(() => {
          document.addEventListener('click', b);
        }),
        U(() => {
          document.removeEventListener('click', b);
        }),
        (d, _) => (
          m(),
          g('div', se, [
            o(
              'button',
              {
                id: u(t),
                class: 'theme-button',
                'aria-expanded': l.value,
                'aria-haspopup': 'true',
                title: 'Theme',
                onClick: i,
              },
              [
                ...(_[0] ||
                  (_[0] = [
                    M(
                      '<svg class="theme-button-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect x="3" y="3" width="7" height="7" fill="#ef4444"></rect><rect x="14" y="3" width="7" height="7" fill="#3b82f6"></rect><rect x="3" y="14" width="7" height="7" fill="#10b981"></rect><rect x="14" y="14" width="7" height="7" fill="#f59e0b"></rect></svg>',
                      1
                    ),
                  ])),
              ],
              8,
              oe
            ),
            o(
              'div',
              { id: u(e), class: R(['theme-dropdown', { hidden: !l.value }]) },
              [
                (m(!0),
                g(
                  j,
                  null,
                  F(
                    s.value,
                    (w, y) => (
                      m(),
                      g(
                        'button',
                        {
                          key: y,
                          class: 'theme-option',
                          'data-theme': y,
                          'data-selected': y === c.value,
                          onClick: (Be) => p(y),
                        },
                        f(w.name),
                        9,
                        le
                      )
                    )
                  ),
                  128
                )),
              ],
              10,
              ae
            ),
          ])
        )
      );
    },
  }),
  re = { class: 'header-top' },
  ie = { class: 'header-controls desktop-controls' },
  ce = ['aria-expanded'],
  ue = { key: 0, id: 'mobileMenu', class: 'mobile-menu' },
  de = { class: 'mobile-menu-content' },
  pe = { class: 'header-title-group' },
  he = { class: 'subtitle' },
  me = k({
    __name: 'Header',
    setup(r) {
      const a = A(),
        { t: n } = a,
        t = h(!1);
      function e() {
        t.value = !t.value;
      }
      return (l, s) => (
        m(),
        g('header', null, [
          o('div', re, [
            o('div', ie, [v(T), v(B)]),
            o(
              'button',
              {
                id: 'mobileMenuToggle',
                class: 'mobile-menu-toggle',
                'aria-expanded': t.value,
                'aria-label': 'Menu',
                onClick: e,
              },
              [
                ...(s[0] ||
                  (s[0] = [
                    o(
                      'svg',
                      {
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                      },
                      [
                        o('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
                        o('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
                        o('line', { x1: '3', y1: '18', x2: '21', y2: '18' }),
                      ],
                      -1
                    ),
                  ])),
              ],
              8,
              ce
            ),
            t.value ? (m(), g('div', ue, [o('div', de, [v(T), v(B)])])) : P('', !0),
          ]),
          o('div', pe, [
            s[1] ||
              (s[1] = o(
                'svg',
                {
                  class: 'header-icon',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  'stroke-width': '2',
                },
                [
                  o('path', { d: 'M9 11l3 3L22 4' }),
                  o('path', { d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' }),
                ],
                -1
              )),
            o('h1', null, f(u(n)('title')), 1),
          ]),
          o('p', he, f(u(n)('subtitle')), 1),
        ])
      );
    },
  }),
  L = S('analysis', () => {
    const r = h(!1),
      a = h(null),
      n = h(null),
      t = h({
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
    async function e(c) {
      ((r.value = !0), (n.value = null));
      try {
        const i = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: c, options: t.value }),
        });
        if (!i.ok) {
          const b = await i.json();
          throw new Error(b.message || 'Analysis failed');
        }
        const p = await i.json();
        a.value = p;
      } catch (i) {
        ((n.value = i.message || 'Failed to analyze page'), (a.value = null));
      } finally {
        r.value = !1;
      }
    }
    function l(c) {
      t.value = { ...t.value, ...c };
    }
    function s() {
      ((a.value = null), (n.value = null));
    }
    return {
      isLoading: r,
      results: a,
      error: n,
      options: t,
      analyze: e,
      updateOptions: l,
      reset: s,
    };
  }),
  ge = { class: 'options-section' },
  fe = { class: 'option-group' },
  ve = { class: 'option-group-header' },
  _e = { class: 'radio-group' },
  ye = k({
    __name: 'OptionsPanel',
    setup(r) {
      L();
      const a = A(),
        { t: n } = a;
      function t() {}
      function e() {}
      return (l, s) => (
        m(),
        g('div', ge, [
          o('h2', null, f(u(n)('analysisOptions')), 1),
          o('div', fe, [
            o('div', ve, [
              o('h3', null, f(u(n)('elementsToCheck')), 1),
              o('div', _e, [
                o('label', null, [
                  o(
                    'input',
                    { type: 'radio', name: 'elements', value: 'all', onChange: t },
                    null,
                    32
                  ),
                  C(' ' + f(u(n)('selectAll')), 1),
                ]),
                o('label', null, [
                  o(
                    'input',
                    { type: 'radio', name: 'elements', value: 'none', onChange: e },
                    null,
                    32
                  ),
                  C(' ' + f(u(n)('deselectAll')), 1),
                ]),
              ]),
            ]),
          ]),
        ])
      );
    },
  }),
  be = { class: 'input-section' },
  we = { class: 'input-group' },
  ke = ['placeholder'],
  xe = { class: 'button-group' },
  Ae = ['disabled'],
  Se = k({
    __name: 'AnalysisForm',
    setup(r) {
      const a = L(),
        n = A(),
        { t } = n,
        e = h(''),
        l = x(() => a.isLoading);
      async function s() {
        if (e.value.trim()) {
          if (!e.value.startsWith('http://') && !e.value.startsWith('https://')) {
            alert(t('errorInvalidUrl'));
            return;
          }
          await a.analyze(e.value);
        }
      }
      return (c, i) => (
        m(),
        g('div', be, [
          o('div', we, [
            O(
              o(
                'input',
                {
                  'onUpdate:modelValue': i[0] || (i[0] = (p) => (e.value = p)),
                  type: 'text',
                  class: 'url-input-compact',
                  placeholder: u(t)('urlPlaceholder'),
                  onKeyup: q(s, ['enter']),
                },
                null,
                40,
                ke
              ),
              [[W, e.value]]
            ),
            o('div', xe, [
              o(
                'button',
                { class: 'btn-primary', disabled: l.value || !e.value.trim(), onClick: s },
                f(l.value ? u(t)('analyzing') : u(t)('analyzeBtn')),
                9,
                Ae
              ),
              i[1] ||
                (i[1] = M(
                  '<button id="wcagInfoToggle" class="btn-info" aria-expanded="false" title="WCAG Information"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg></button>',
                  1
                )),
            ]),
          ]),
          v(ye),
        ])
      );
    },
  }),
  Le = { class: 'container' },
  Ce = k({
    __name: 'App',
    setup(r) {
      const a = K(() => Y(() => import('./Results-7og6aEXv.js'), __vite__mapDeps([0, 1]))),
        n = L(),
        t = x(() => !!n.results),
        e = x(() => n.results);
      return (l, s) => (
        m(),
        g('div', Le, [
          v(me),
          v(Se),
          t.value
            ? (m(),
              H(
                N,
                { key: 0 },
                {
                  default: $(() => [v(u(a), { data: e.value }, null, 8, ['data'])]),
                  fallback: $(() => [
                    ...(s[0] ||
                      (s[0] = [o('div', { class: 'loading' }, 'Loading results...', -1)])),
                  ]),
                  _: 1,
                }
              ))
            : P('', !0),
        ])
      );
    },
  }),
  $e = (r, a) => {
    const n = r.__vccOpts || r;
    for (const [t, e] of a) n[t] = e;
    return n;
  },
  Ee = $e(Ce, [['__scopeId', 'data-v-38dcc68e']]),
  z = G(Ee),
  Te = Q();
z.use(Te);
z.mount('#app');
export { A as u };
