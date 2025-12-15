import { u as c } from './index-D15ZO6Mi.js';
import { a as u, c as t, b as s, e as a, k as l, t as n, u as i } from './vendor-DJJw8Pl3.js';
const m = { class: 'results-section' },
  d = { key: 0, class: 'results-container' },
  h = u({
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
            : l('', !0),
        ])
      );
    },
  });
export { h as default };
