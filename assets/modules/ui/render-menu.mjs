const InitializeMenuContainer = function () {
  const body = document.querySelector('body');
  const menuContainer = document.createElement('section');
  menuContainer.className = 'menu-container';
  body.append(menuContainer);
};

import { createMenu, categoriesData } from '../fetch-manager.mjs';

const menuObj = await createMenu();

const menu = Object.entries(menuObj);

// Check and save menu to localStorage if its not already saved
if (!localStorage.getItem('storedMenu')) {
  localStorage.setItem('storedMenu', JSON.stringify(menuObj));
}

/**
 * Populates the DOM with menu items.
 *
 * @param {Array} categories - An array of categories,
 * each containing a nested array of items to display.
 */
const MAKE_MENU = function (arr) {
  let menuContainer = document.querySelector('.menu-container');

  // Destructure array elements into category -> string and items -> array of category items
  arr.forEach(([category, items]) => {
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

      categorySection.appendChild(itemWrapper);
    });

    menuContainer.appendChild(categorySection);
  });
};

export { InitializeMenuContainer, menu, MAKE_MENU };
