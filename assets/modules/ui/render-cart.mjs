import { createMenu, categoriesData } from '../fetch-manager.mjs';

const menuObj = await createMenu(categoriesData);

import {
  cart,
  addToCart,
  removeFromCart,
  calcTotal,
} from '../cart-manager.mjs';

const MAKE_CART = function (cartArr) {};
