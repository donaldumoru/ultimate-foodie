import { MAKE_CART, updateCartDisplay } from './ui/render-cart.mjs';

const cart = [];

const cartManager = {
  /**
   * Calculates the total price for a cart item.
   *
   * @param {number} numItems - The number of items.
   * @returns {number} The total price (item price × quantity).
   */
  calcPriceOfItem: function (numItems) {
    return this.price * numItems;
  },

  /**
   * Calculates the total price of all items in the cart.
   *
   * @param {Array} cartArr - The shopping cart array, where each item contains an `orderPrice`.
   * @returns {number} The total cost of the cart.
   */
  calcTotal: function (cartArr) {
    return cartArr.reduce((acc, item) => acc + item.orderPrice, 0);
  },

  /**
   * Adds an item to the shopping cart or updates its quantity if it already exists.
   *
   * @param {Array} cartArr - The shopping cart
   * @param {Object} menuItem - The item to add
   * @param {Object} numItems - The number of items to add.
   * @returns {Array} The updated cart containing all items.
   */
  addToCart: function (cartArr, menuItem, numItems) {
    if (cartArr.some(item => item.id === menuItem.id)) {
      const sameItem = cartArr.find(item => item.id === menuItem.id);

      sameItem.amount = numItems;
      sameItem.orderPrice = this.calcPriceOfItem.call(
        menuItem,
        sameItem.amount
      );

      const cartTotal = this.calcTotal(cartArr);

      updateCartDisplay(cart, sameItem, cartTotal);

      return cartArr;
    }

    const itemToAdd = {
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      amount: numItems,
      orderPrice: this.calcPriceOfItem.call(menuItem, numItems),
    };

    cartArr.push(itemToAdd);
    const cartTotal = this.calcTotal(cartArr);

    updateCartDisplay(cart, itemToAdd, cartTotal);

    return cartArr;
  },

  /**
   * Removes an item from the cart at the specified position.
   *
   * @param {Array} cartArr - The shopping cart array.
   * @param {number} itemPosition - The index of the item to remove.
   * @returns {Array} The updated cart array.
   */
  removeFromCart: function (cartArr, itemToRemove, itemPostion) {
    cartArr.splice(itemPostion, 1);
    const cartTotal = this.calcTotal(cartArr);
    updateCartDisplay(cart, itemToRemove, cartTotal);

    return cart;
  },
};

export { cart, cartManager };
