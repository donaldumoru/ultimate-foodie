import { createMenu, categoriesData } from '../fetch-manager.mjs';
import { internationalizeNum } from '../utils.mjs';

let orderMenuContainer = document.querySelector('.order-menu-container');

/// Make this in a different to avoid the repetiion here and in render-menu
const menuObj = await createMenu();

const menu = Object.entries(menuObj);

// Check and save menu to sessionStorage if its not already saved
if (!sessionStorage.getItem('storedMenu')) {
  sessionStorage.setItem('storedMenu', JSON.stringify(menuObj));
}

/**
 * Populates the DOM with order menu items.
 *
 * @param {Array} categories - An array of categories,
 * each containing a nested array of items to display.
 */
export const renderOrderMenu = function (arr) {
  // Destructure array elements into category -> string and items -> array of category items
  arr.map(([category, items]) => {
    const categorySection = document.createElement('section');
    const categoryHeader = document.createElement('h2');

    categoryHeader.textContent = category.split('-').join(' ');

    categorySection.appendChild(categoryHeader);

    items.map(item => {
      const itemWrapper = document.createElement('div');
      const itemName = document.createElement('p');
      itemName.textContent = 'Name: ' + item.name;
      itemWrapper.appendChild(itemName);
      const itemDescription = document.createElement('p');
      itemDescription.textContent = 'Description: ' + item.dsc;
      itemWrapper.appendChild(itemDescription);
      const itemPrice = document.createElement('p');
      itemPrice.textContent = 'Price: ' + internationalizeNum(item.price);
      itemWrapper.appendChild(itemPrice);

      categorySection.appendChild(itemWrapper);
    });

    orderMenuContainer.appendChild(categorySection);
  });
};

renderOrderMenu(menu);
