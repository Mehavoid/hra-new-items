'use strict';

const { Date, Math } = H;

const NOW = Date.now();
const MSECOND = 1000;
const SECOND = 1;
const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const MONTH =
  DAY *
  new Date(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth() + 1,
    0,
  ).getDate();

const DURATION_UNITS = {
  s: SECOND,
  m: MINUTE,
  h: HOUR,
  d: DAY,
  M: MONTH,
};

const THRESHOLD = {
  s: 50,
  m: 55,
  h: 22,
  d: 27,
  M: 11,
};

const PAST = '%s ago';
const TEMPLATE = {
  M: ['a month', '%d months'],
  d: ['a day', '%d days'],
  h: ['an hour', '%d hours'],
  m: ['a minute', '%d minutes'],
  s: ['a few seconds', '%d seconds'],
};

const utc = (t) => {
  const d = new Date(t);
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return Date.UTC(year, month, day, hours, minutes, seconds);
};

const diff = (t1, t2) => {
  const now = utc(t1);
  const then = utc(t2);
  return (then - now) / MSECOND;
};

const compare = (d1, d2) => d1 >= d2;

const relative = (delta) => {
  for (const name in DURATION_UNITS) {
    const threshold = THRESHOLD[name];
    const div = DURATION_UNITS[name];
    const n = Math.round(delta / div);
    if (n > 0 && n <= threshold) return [n, name];
  }
  return [0, 's'];
};

const pretty = (time, unit) => {
  const [short, long] = TEMPLATE[unit];
  const templ = time <= 1 ? short : long;
  return PAST.replace('%s', templ.replace('%d', time));
};

const print = (target, time) => {
  const p = R.createElement('p');
  const s = R.createElement('strong');
  const text = R.createTextNode(time);
  const space = R.createTextNode('\u00A0');
  s.textContent = 'Available:';
  p.append(s);
  p.append(space);
  p.append(text);
  target.parentNode.before(p);
};

const update = async (id) => {
  const time = await GM.getValue(id, NOW);
  if (time === NOW) await GM.setValue(id, NOW);
  const delta = diff(time, NOW);
  if (compare(delta, MONTH)) await GM.deleteValue(id);
  return pretty(...relative(delta));
};

const items = R.querySelectorAll('a.btn-addtocart');

for (const item of items) {
  const { id } = item.dataset;
  if (!id) continue;
  const time = await update(id);
  if (time) print(item, time);
}
