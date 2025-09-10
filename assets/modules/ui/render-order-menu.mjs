const initializeOrderMenuContainer = function () {
  const body = document.querySelector('body');
  const orderMenuContainer = document.createElement('section');
  orderMenuContainer.className = 'order-menu-container';
  const orderMenuWrapper = document.createElement('section');
  orderMenuWrapper.className = 'order-menu-wrapper';
  orderMenuContainer.appendChild(orderMenuWrapper);
  body.append(orderMenuContainer);
};

import { createMenu, categoriesData } from '../fetch-manager.mjs';
import { internationalizeNum } from '../utils.mjs';

/// Make this in a different to avoid the repetiion here and in render-menu
const menuObj = await createMenu();

const menu = Object.entries(menuObj);

// Check and save menu to localStorage if its not already saved
if (!localStorage.getItem('storedMenu')) {
  localStorage.setItem('storedMenu', JSON.stringify(menuObj));
}

/**
 * Populates the DOM with order menu items.
 *
 * @param {Array} categories - An array of categories,
 * each containing a nested array of items to display.
 */
const MAKE_ORDER_MENU = function (arr) {
  let orderMenuContainer = document.querySelector('.order-menu-wrapper');

  // Destructure array elements into category -> string and items -> array of category items
  arr.forEach(([category, items]) => {
    const categorySection = document.createElement('section');
    categorySection.className = 'category-container';
    const categoryHeader = document.createElement('h2');

    categoryHeader.textContent = category.split('-').join(' ');

    categorySection.appendChild(categoryHeader);

    const itemsContainer = document.createElement('section');
    itemsContainer.className = 'items-container';

    items.forEach(item => {
      const itemWrapper = document.createElement('div');
      itemWrapper.className = 'item-wrapper';

      const itemName = document.createElement('p');
      itemName.className = 'item-name';
      itemName.textContent = item.name;

      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.dsc;

      const itemPrice = document.createElement('p');
      itemPrice.textContent = internationalizeNum(item.price);
      itemPrice.className = 'item-price';

      const inputWrapper = document.createElement('div');
      inputWrapper.className = 'amount-btn-wrapper';
      const reduceBtnElement = document.createElement('button');
      reduceBtnElement.className = 'amount-btn';
      reduceBtnElement.textContent = '-';
      const numAmount = document.createElement('span');
      numAmount.className = 'num-amount';
      numAmount.textContent = 1;
      const increaseBtnElement = document.createElement('button');
      increaseBtnElement.className = 'amount-btn';
      increaseBtnElement.textContent = '+';
      inputWrapper.append(reduceBtnElement, numAmount, increaseBtnElement);

      const addToCartButton = document.createElement('button');
      addToCartButton.className = 'add-to-cart-btn';
      addToCartButton.textContent = 'add to cart';

      itemWrapper.append(
        itemName,
        itemDescription,
        itemPrice,
        inputWrapper,
        addToCartButton
      );

      // set a data attribute of ID of the menu Item to each item
      itemWrapper.setAttribute('data-item-id', item.id);

      itemsContainer.appendChild(itemWrapper);

      categorySection.appendChild(itemsContainer);
    });

    orderMenuContainer.appendChild(categorySection);
  });
};

export { menu, MAKE_ORDER_MENU, initializeOrderMenuContainer };
