import { createMenu, categoriesData } from '../fetch-manager.mjs';

const menuObj = await createMenu(categoriesData);

import {
  cart,
  addToCart,
  removeFromCart,
  calcTotal,
} from '../cart-manager.mjs';

// Call AddToCart function with the item and number of items to add to cart
addToCart(menuObj.bbqs[5], 2);
addToCart(menuObj.bbqs[1], 1);
addToCart(menuObj.bbqs[3], 3);
addToCart(menuObj.bbqs[2], 3);

console.log(cart);

// Call removeFromCart function with cart and position of the item to be removed
removeFromCart(cart, 1);

console.log(cart);
