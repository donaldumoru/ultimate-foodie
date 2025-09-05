const cart = [];

/**
 * Calculates the total price for a cart item.
 *
 * @param {Object} item - The cart item object containing price information.
 * @param {number} quantity - The number of items.
 * @returns {number} The total price (item price × quantity).
 */

const calcPriceOfItem = function (numItems) {
  return this.price * numItems;
};

/**
 * Adds an item to the shopping cart or updates its quantity if it already exists.
 *
 * - If the item is already in the cart, increases its quantity and recalculates the order price.
 * - If the item is new, adds it as a new entry with the quantity and order price.
 *
 * @param {{ id: string|number, name: string, price: number }} item - The product to add.
 * @param {number} numItems - The number of items to add.
 * @returns {Array} The updated cart containing all items.
 */

const addToCart = function (item, numItems) {
  if (cart.some(cartItem => cartItem.id === item.id)) {
    cart.find(cartItem => {
      cartItem.numberofItems += numItems;

      cartItem.orderPrice = calcPriceOfItem.call(
        cartItem,
        cartItem.numberofItems
      );
    });
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      numberofItems: numItems,
      // Call calcPriceItem to set the price of order to the item object
      orderPrice: calcPriceOfItem.call(item, numItems),
    });
  }

  return cart;
};

/**
 * Removes an item from the cart at the specified position.
 *
 * @param {Array} cartArr - The shopping cart array.
 * @param {number} itemPosition - The index of the item to remove.
 * @returns {Array} The updated cart array.
 */
const removeFromCart = function (cartArr, itemPostion) {
  cartArr.splice(itemPostion, 1);

  return cart;
};

/**
 * Calculates the total price of all items in the cart.
 *
 * @param {Array} cartArr - The shopping cart array, where each item contains an `orderPrice`.
 * @returns {number} The total cost of the cart.
 */
const calcTotal = function (cartArr) {
  return cartArr.reduce((acc, item) => acc + item.orderPrice, 0);
};

export { cart, addToCart, removeFromCart, calcTotal };
