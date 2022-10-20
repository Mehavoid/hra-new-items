'use strict';

const items = R.querySelectorAll('a.btn-addtocart');

for (const item of items) {
  add(item);
  clone(item);
}
