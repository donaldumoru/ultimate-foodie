//  Wrap entire nav interactions in initializeNavInteractions function
// so I can wait for navBar to be loaded before this funtions kicks off
const initializeNavInteractions = function () {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-links');
  const navLinksDesktop = document.querySelector('.nav-links');
  const orderBtn = document.querySelector('.order-btn');
  const orderBtnLi = document.querySelector('.order-link');
  const appendEl = document.querySelector('.append');
  const navLinksMobile = document.querySelector('.nav-links--mobile');
  const hamburger = document.querySelector('.hamburger');
  const hamburgerInput = document.querySelector('#hamburger-input');
  const hamburgerSpan = document.querySelector('.hamburger-span');
  const logo = document.querySelector('.logo');

  let mediumScreenSize = window.matchMedia('(max-device-width: 768px)');

  addEventListener('DOMContentLoaded', () => {
    if (mediumScreenSize.matches) {
      navLinks[0].prepend(appendEl);
      orderBtn.textContent = 'order';
    }
  });

  const checkScreenSize = function () {
    if (mediumScreenSize.matches) {
      navLinks[0].append(appendEl);
      orderBtn.textContent = 'order';
    } else {
      orderBtn.textContent = 'order now';
      const parentDiv = orderBtn.parentNode.parentNode;
      parentDiv.insertBefore(appendEl, orderBtnLi);
    }
  };

  window.addEventListener('resize', checkScreenSize.bind(window.screen.width));

  const hamburgerClick = function () {
    if (hamburgerInput.checked) {
      navLinksDesktop.style.display = 'flex';
      nav.classList.add('nav--active');
      orderBtn.classList.add('nav-links-mobile--background');
      logo.children[0].children[0].classList.add('nav-links-mobile---active');
    } else {
      navLinksDesktop.style.display = 'none';
      nav.classList.remove('nav--active');
      orderBtn.classList.remove('nav-links-mobile--background');
      logo.children[0].children[0].classList.remove(
        'nav-links-mobile---active'
      );
    }
  };

  hamburger.addEventListener('click', hamburgerClick);
};

export { initializeNavInteractions };
