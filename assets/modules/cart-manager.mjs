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
 *
 * @param {Array} cartArr - The shopping cart
 * @param {Object} menuItem - The item to add
 * @param {Object} numItems - The number of items to add.
 * @returns {Array} The updated cart containing all items.
 */
const addToCart = function (cartArr, menuItem, numItems) {
  if (cartArr.some(item => item.id === menuItem.id)) {
    const sameItem = cartArr.find(item => item.id === menuItem.id);

    sameItem.amount = numItems;
    sameItem.orderPrice = calcPriceOfItem.call(menuItem, sameItem.amount);

    return cartArr;
  }

  cartArr.push({
    id: menuItem.id,
    name: menuItem.name,
    price: menuItem.price,
    amount: numItems,
    orderPrice: calcPriceOfItem.call(menuItem, numItems),
  });

  return cartArr;
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

export { cart, calcPriceOfItem, addToCart, removeFromCart, calcTotal };
