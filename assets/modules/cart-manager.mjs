const cart = [];

/**
 * Function to calculate the price of individual cart items
 * @param {obj,number} - This functions takes in the item object and the number of items and returns the price of the item multiplied by the number of items
},
*/
const calcPriceOfItem = function (numItems) {
  return this.price * numItems;
};

/**
 * Function to add Items to cart
 * @param {obj,number} - This functions takes in the item object and the number of items and returns a cart object containing each item with item name, price, number of items, and the order price
},
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
 * Function to remove Items to cart
 * @param {array, obj, number} - This functions takes in a cart array and the position of the item to remove
},
*/
const removeFromCart = function (cartArr, itemPostion) {
  cartArr.splice(itemPostion, 1);

  return cart;
};

/**
 * Function to calculate cart total
 * @param {array} - This function takes in an array and adds together the orderprice of all items in the cart
},
*/
const calcTotal = function (cartArr) {
  return cartArr.reduce((acc, item) => acc + item.orderPrice, 0);
};

export { cart, addToCart, removeFromCart, calcTotal };
