import { menu, MAKE_ORDER_MENU } from './ui/render-order-menu.mjs';
import {
  cart,
  calcPriceOfItem,
  addToCart,
  removeFromCart,
  calcTotal,
} from './cart-manager.mjs';
import {
  MAKE_CART,
  updateCartDisplay,
  checkIfCartEmpty,
} from './ui/render-cart.mjs';
import { internationalizeNum } from './utils.mjs';

MAKE_ORDER_MENU(menu);
MAKE_CART(cart);
checkIfCartEmpty(cart);

const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const amountBtnWrapper = document.querySelectorAll('.amount-btn-wrapper');

const handleNumOfItems = function (e) {
  const clickedBtn = e.target;

  if (clickedBtn.textContent === '+' || clickedBtn.textContent === '-') {
    // Loop over the menu array which is now THIS
    this.forEach(([category, menuItems]) => {
      if (
        menuItems.some(
          menuItem =>
            menuItem.id === e.currentTarget.parentElement.dataset.itemId
        )
      ) {
        const el = menuItems.find(
          menuItem =>
            menuItem.id === e.currentTarget.parentElement.dataset.itemId
        );

        let numOfItemsDisplay = e.currentTarget.children[1];
        let numOfItems = Number(e.currentTarget.children[1].textContent);

        if (clickedBtn.textContent === '+') {
          numOfItems++;
        } else {
          if (numOfItems <= 1) {
            return;
          }
          numOfItems--;
        }

        el.numOfItems = numOfItems;
        numOfItemsDisplay.textContent = el.numOfItems;

        document
          .querySelector(`[data-item-id="${el.id}"]`)
          .querySelector('.item-price').textContent = internationalizeNum(
          el.price * el.numOfItems
        );
      }
    });
  }
};

amountBtnWrapper.forEach(wrapper => {
  // Set the THIS value to the menu array
  wrapper.addEventListener('click', handleNumOfItems.bind(menu));
});

/**
 * Add an item to the cart when its button is clicked.
 * NOTE:
 *  - When using .bind(), any arguments passed in bind(...) come BEFORE the event (e) object.
 *  - The browser always appends the event object last when calling this handler.
 *  - Example: addItemToCart.bind(1, "a", "b") → (a="a", b="b", e=<Event>)
 */
const addItemToCart = function (e) {
  const item = e.target.parentElement;
  const itemId = item.dataset.itemId;

  const addToCartBtn = [...item.children].find(child =>
    child.classList.contains('add-to-cart-btn')
  );

  addToCartBtn.textContent = 'Update Cart';

  menu.forEach(([category, menuItems]) => {
    // Find the actual menu object that was clicked
    if (menuItems.some(menuItem => menuItem.id === itemId)) {
      const itemToAdd = menuItems.find(menuItem => menuItem.id === itemId);

      itemToAdd.numOfItems = itemToAdd.numOfItems ?? this;

      // Add item to cart
      addToCart(
        //Cart
        cart,
        // Item to add to cart
        itemToAdd,
        //Number of items
        itemToAdd.numOfItems
      );
    }
  });
};

addToCartBtns.forEach(btn => {
  // Bind this=1 (used as default quantity),
  // pre-fill extra args ("this", "that"),
  // !!!!!! the click event will ALWAYS be passed as the LAST argument!!!!!
  btn.addEventListener('click', addItemToCart.bind(1));
});

/// Removing items from the cart
const removeItemFromCart = function (e) {
  //// THIS becomes the cartArray in this case
  const cartItemClicked = e.target.closest('.cart-item');
  if (!cartItemClicked) return;

  const itemToRemove = this.find(
    cartItem => cartItem.id === cartItemClicked.dataset.itemId
  );

  const indexOfItemToRemove = this.indexOf(itemToRemove);

  removeFromCart(this, itemToRemove, indexOfItemToRemove);

  console.log(this);

  cartItemClicked.remove();
};

const allCartItemsContainer = document.querySelector('.cart-items-container');

//// Bind this to cart array
allCartItemsContainer.addEventListener('click', removeItemFromCart.bind(cart));
