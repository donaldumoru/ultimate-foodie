import { createMenu, categoriesData } from '../fetch-manager.mjs';
import { internationalizeNum } from '../utils.mjs';

let orderMenuContainer = document.querySelector('.order-menu-container');

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
  // Destructure array elements into category -> string and items -> array of category items
  arr.map(([category, items]) => {
    const categorySection = document.createElement('section');
    categorySection.className = 'category-container';
    const categoryHeader = document.createElement('h2');

    categoryHeader.textContent = category.split('-').join(' ');

    categorySection.appendChild(categoryHeader);

    const itemsContainer = document.createElement('section');
    itemsContainer.className = 'items-container';

    items.map(item => {
      const itemWrapper = document.createElement('div');
      itemWrapper.className = 'item-wrapper';
      const itemName = document.createElement('p');
      itemName.className = 'item-name';
      itemName.textContent = 'Name: ' + item.name;
      itemWrapper.appendChild(itemName);
      const itemDescription = document.createElement('p');
      itemDescription.textContent = 'Description: ' + item.dsc;
      itemWrapper.appendChild(itemDescription);
      const itemPrice = document.createElement('p');
      itemPrice.textContent = internationalizeNum(item.price);
      itemPrice.className = 'item-price';
      itemWrapper.appendChild(itemPrice);

      const itemAmount = document.createElement('input');
      itemAmount.type = 'number';
      itemAmount.name = 'item-amount';
      itemAmount.min = 1;
      itemAmount.className = 'input-amount';
      itemAmount.value = 1;

      itemWrapper.appendChild(itemAmount);

      const addToCartButton = document.createElement('button');
      addToCartButton.className = 'add-to-cart-btn';
      addToCartButton.textContent = 'add to cart';

      itemWrapper.appendChild(addToCartButton);

      // set a data attribute of ID of the menu Item to each item
      itemWrapper.setAttribute('data-item-id', item.id);

      itemsContainer.appendChild(itemWrapper);

      categorySection.appendChild(itemsContainer);
    });

    orderMenuContainer.appendChild(categorySection);
  });
};

export { menu, MAKE_ORDER_MENU };
