'use strict';

const source = R.querySelector('div.row-pagination');
const target = R.querySelector('hr');

if (source && target) {
  const cloned = source.cloneNode(true);
  target.after(cloned);
}
