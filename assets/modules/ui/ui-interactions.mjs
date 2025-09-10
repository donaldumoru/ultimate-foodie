//  Wrap entire nav interactions in initializeNavInteractions function
// so I can wait for navBar to be loaded before this funtions kicks off
const initializeNavInteractions = function () {
  const navLinks = document.querySelectorAll('.nav-links');
  const navLinksDesktop = document.querySelector('.nav-links');
  const orderBtn = document.querySelector('.order-btn');
  const orderBtnLi = document.querySelector('.order-link');
  const appendEl = document.querySelector('.append');
  const navLinksMobile = document.querySelector('.nav-links--mobile');
  const hamburger = document.querySelector('.hamburger5');
  const hamburgerInput = document.querySelector('#hamburger5-input');

  let mediumScreenSize = window.matchMedia('(max-width: 768px)');

  addEventListener('DOMContentLoaded', () => {
    if (mediumScreenSize.matches) {
      navLinks[0].append(appendEl);
      orderBtn.textContent = 'order';
      hamburger.style.display = 'block';
    }
  });

  const checkScreenSize = function () {
    if (mediumScreenSize.matches) {
      navLinksDesktop.style.display = 'none';
      navLinks[0].append(appendEl);
      orderBtn.textContent = 'order';
      hamburger.style.display = 'block';
    } else {
      orderBtn.textContent = 'order now';
      hamburger.style.display = 'none';
      navLinksDesktop.style.display = 'flex';
      const parentDiv = orderBtn.parentNode.parentNode;

      parentDiv.insertBefore(appendEl, orderBtnLi);
    }
  };

  window.addEventListener('resize', checkScreenSize.bind(window.screen.width));

  const hamburgerClick = function () {
    if (hamburgerInput.checked) {
      navLinksDesktop.style.display = 'flex';
    } else {
      navLinksDesktop.style.display = 'none';
    }
  };

  hamburger.addEventListener('click', hamburgerClick);
};

export { initializeNavInteractions };
