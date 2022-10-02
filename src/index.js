'use strict';

const { Date } = H;

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
  print(release, time);
}
