import { available } from './available.js';
import { clone } from './copy.js';

const items = R.querySelectorAll('a.btn-addtocart');

for (const item of items) {
  available(item);
  clone(item);
}
