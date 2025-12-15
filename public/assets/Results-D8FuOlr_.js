import { u as c } from './index-LKdfY_XZ.js';
import { a as l, c as t, b as s, e as a, l as u, t as n, u as i } from './vendor-DiATmvVG.js';
const m = { class: 'results-section' },
  d = { key: 0, class: 'results-container' },
  h = l({
    __name: 'Results',
    props: { data: {} },
    setup(e) {
      const o = c(),
        { t: r } = o;
      return (p, _) => (
        s(),
        t('div', m, [
          a('h2', null, n(i(r)('summary')), 1),
          e.data
            ? (s(), t('div', d, [a('pre', null, n(JSON.stringify(e.data, null, 2)), 1)]))
            : u('', !0),
        ])
      );
    },
  });
export { h as default };
