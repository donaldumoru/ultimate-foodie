import { createMenu, categoriesData } from '../fetch-manager.mjs';
import { internationalizeNum } from '../utils.mjs';

const menuObj = await createMenu(categoriesData);

/*****************************************
 *
 *
 *
 * CHECK ALL ELEMENTS THAT ARE CREATED MULTIPLE TIMES AND MAKE SEPARATE FUNCTIONS FOR THEM
 *
 *
 *
 *
 *****************************************/

const MAKE_CART = function (cartArr) {
  const orderMenuContainer = document.querySelector('.order-menu-container');

  const cartContainer = document.createElement('div');
  cartContainer.className = 'cart-container';
  orderMenuContainer.appendChild(cartContainer);

  const cartheaderContainer = document.createElement('div');
  const cartHeader = document.createElement('div');
  const cartSize = document.createElement('span');
  cartSize.className = 'cart-size';
  cartSize.textContent = 'your order';
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  cartHeader.append(cartSize, closeBtn);
  cartheaderContainer.appendChild(cartHeader);
  cartContainer.appendChild(cartheaderContainer);

  const cartItemsContainer = document.createElement('div');
  cartItemsContainer.className = 'cart-items-container';
  const cartSummaryContainer = document.createElement('div');
  cartSummaryContainer.className = 'cart-summary-container';
  const subTotalWrapper = document.createElement('div');
  subTotalWrapper.className = 'sub-total-wrapper';
  const subTotalDisplay = document.createElement('span');
  subTotalDisplay.className = 'sub-total-amount';

  subTotalWrapper.appendChild(subTotalDisplay);
  const deliveryFeeWrapper = document.createElement('div');
  deliveryFeeWrapper.className = 'delivery-fee-wrapper';
  const totalWrapper = document.createElement('div');
  totalWrapper.className = 'total-wrapper';
  cartSummaryContainer.append(
    subTotalWrapper,
    deliveryFeeWrapper,
    totalWrapper
  );

  cartContainer.append(cartItemsContainer, cartSummaryContainer);

  orderMenuContainer.append(cartContainer);
};

const checkIfCartEmpty = function (cartArr) {
  if (cartArr.length > 0 && document.querySelector('.cart-empty')) {
    document.querySelector('.cart-empty').remove();
    return;
  }

  if (cartArr.length === 0) {
    const cartFooterContainer = document.querySelector(
      '.cart-footer-container'
    );

    const cartSummaryContainer = document.querySelector(
      '.cart-summary-container'
    );

    if (cartFooterContainer) {
      cartFooterContainer.remove();
      cartSummaryContainer.remove();
    }
    const cartContainer = document.querySelector('.cart-container');
    const displayEmptyContainer = document.createElement('div');
    const displayEmpty = document.createElement('span');
    displayEmpty.className = 'cart-empty';
    displayEmpty.textContent = 'Your cart is empty';
    displayEmptyContainer.appendChild(displayEmpty);
    cartContainer.appendChild(displayEmptyContainer);
    return;
  }
};

const updateCartDisplay = function (cartArr, cartItem, total) {
  const subTotal = internationalizeNum(total);

  const subTotalDisplay = document.querySelector('.sub-total-amount');
  subTotalDisplay.textContent = 'Sub-Total' + subTotal;

  checkIfCartEmpty(cartArr);

  // if (cartArr.length > 0) {
  const cartContainer = document.querySelector('.cart-container');

  if (
    !document.querySelector('.cart-summary-container') &&
    cartArr.length === 0
  ) {
    const cartSummaryContainer = document.createElement('div');
    cartSummaryContainer.className = 'cart-summary-container';
    const subTotalDisplay = document.createElement('span');
    subTotalDisplay.className = 'sub-total-amount';
    cartSummaryContainer.appendChild(subTotalDisplay);
    cartContainer.appendChild(cartSummaryContainer);
    const cartSize = document.querySelector('.cart-size');
    cartSize.textContent = 'your order';
  }

  const cartSize = document.querySelector('.cart-size');
  const cartItemsQuantity = cartArr.reduce((acc, cartItem) => {
    return acc + cartItem.amount;
  }, 0);
  if (cartArr.length > 0) {
    cartSize.textContent = `your order (${cartItemsQuantity})`;
  }

  const cartItemsContainer = document.querySelector('.cart-items-container');

  const cartItemWrapper = document.createElement('div');
  cartItemWrapper.className = 'cart-item';
  cartItemWrapper.setAttribute('data-item-id', cartItem.id);

  if (
    [...cartItemsContainer.children].some(
      el => el.dataset.itemId === cartItem.id
    )
  ) {
    const sameItem = [...cartItemsContainer.children].find(
      el => el.dataset.itemId === cartItem.id
    );

    const updateAmountDisplay = [...sameItem.children].find(el =>
      el.classList.contains('cart-item-amount')
    );
    const updatePriceDisplay = [...sameItem.children].find(el =>
      el.classList.contains('cart-item-price')
    );

    updateAmountDisplay.textContent = cartItem.amount;
    updatePriceDisplay.textContent = internationalizeNum(cartItem.orderPrice);

    return;
  }

  const itemAmount = document.createElement('span');
  itemAmount.className = 'cart-item-amount';
  itemAmount.textContent = cartItem.amount;
  const itemName = document.createElement('span');
  itemName.className = 'cart-item-name';
  itemName.textContent = cartItem.name;
  const itemPrice = document.createElement('span');
  itemPrice.className = 'cart-item-price';
  itemPrice.textContent = internationalizeNum(cartItem.orderPrice);

  cartItemWrapper.append(itemAmount, itemName, itemPrice);
  cartItemsContainer.appendChild(cartItemWrapper);

  if (!document.querySelector('.cart-footer-container') && cartArr.length > 0) {
    const cartFooterContainer = document.createElement('div');
    cartFooterContainer.className = 'cart-footer-container';
    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'checkout-btn';
    checkoutBtn.textContent = 'Checkout';
    const totalAmount = document.createElement('span');
    totalAmount.className = 'total-amount';
    cartFooterContainer.append(checkoutBtn, totalAmount);
    cartContainer.appendChild(cartFooterContainer);
  }
  // }
};

export { MAKE_CART, updateCartDisplay, checkIfCartEmpty };
