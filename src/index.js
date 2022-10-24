'use strict';

const items = R.querySelectorAll('a.btn-addtocart');

for (const item of items) {
  available(item);
  clone(item);
}
