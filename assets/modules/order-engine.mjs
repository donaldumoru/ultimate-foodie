import { menu, MAKE_ORDER_MENU } from './ui/render-order-menu.mjs';

import {
  cart,
  calcPriceOfItem,
  addToCart,
  removeFromCart,
  calcTotal,
} from './cart-manager.mjs';

import { internationalizeNum } from './utils.mjs';

MAKE_ORDER_MENU(menu);

const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const inputAmountElements = document.querySelectorAll('.input-amount');

const checkQuantity = function (e) {
  const quantity = Number(
    e.target.parentElement.querySelector('.input-amount').value
  );

  return quantity;
};

const updatePriceDisplayOfItem = function (e) {
  menu.forEach(([category, menuItems]) => {
    if (
      menuItems.some(
        menuItem => menuItem.id === e.target.parentElement.dataset.itemId
      )
    ) {
      const el = menuItems.find(
        menuItem => menuItem.id === e.target.parentElement.dataset.itemId
      ).id;

      const price = menuItems.find(
        menuItem => menuItem.id === e.target.parentElement.dataset.itemId
      ).price;

      const updatedPrice = price * checkQuantity(e);

      document
        .querySelector(`[data-item-id="${el}"]`)
        .querySelector('.item-price').textContent =
        internationalizeNum(updatedPrice);
    }
  });
};

inputAmountElements.forEach(inputEl => {
  inputEl.addEventListener('click', e => updatePriceDisplayOfItem(e));
});

// Add the item to cart
const addItemToCart = function (e) {
  const itemId = e.target.parentElement.dataset.itemId;

  menu.forEach(([category, menuItems]) => {
    // Find the actual menu object that was clicked
    if (menuItems.some(menuItem => menuItem.id === itemId)) {
      const itemToAdd = menuItems.find(menuItem => menuItem.id === itemId);

      // Add item to cart
      addToCart(
        //Cart
        cart,
        // Item to add to cart
        itemToAdd,
        //Number of items
        checkQuantity(e)
      );
    }
  });

  console.log(cart);
};

addToCartBtns.forEach(btn => {
  btn.addEventListener('click', e => addItemToCart(e));
});
