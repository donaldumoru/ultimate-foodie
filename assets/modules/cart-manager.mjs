import { createMenu, categoriesData } from './fetch-manager.mjs';

const menu = await createMenu(categoriesData);

console.log(menu);

const addToCart = function () {};
const removeFromCart = function () {};
