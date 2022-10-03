'use strict';

const MONTH = 30;
const MSEC_PER_DAY = 1000 * 60 * 60 * 24;

const { Date, Math } = H;

const utc = (t) => {
  const d = new Date(t);
  const day = d.getDate();
  const year = d.getFullYear();
  const month = d.getMonth();
  return Date.UTC(year, month, day);
};
const diff = (t1, t2) => {
  const now = utc(t1);
  const then = utc(t2);
  return Math.floor((then - now) / MSEC_PER_DAY);
};
const compare = (d1, d2) => d1 >= d2;

const create = (name) => R.createElement(name);
const createT = (str) => R.createTextNode(str);
const append = (a, b) => a.append(b);
const before = (a, b) => a.insertBefore(b, a.lastChild);
const print = (target, time) => {
  const p = create('p');
  const s = create('strong');
  const text = createT(time);
  const space = createT('\u00A0');
  s.textContent = 'Available:';
  append(p, s);
  append(p, space);
  append(p, text);
  before(target.offsetParent, p);
};

const now = Date.now();
const releases = R.querySelectorAll('a.btn-addtocart');

for (const release of releases) {
  const { id } = release.dataset;
  if (!id) continue;
  const time = await GM.getValue(id, now);
  if (time === now) await GM.setValue(id, now);
  else if (compare(diff(time, now), MONTH)) await GM.deleteValue(id);
  print(release, time);
}
