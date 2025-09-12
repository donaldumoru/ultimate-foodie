//  Wrap entire nav interactions in initializeNavInteractions function
// so I can wait for navBar to be loaded before this funtions kicks off
const initializeNavInteractions = function () {
  const body = document.querySelector('body');
  const header = document.querySelector('header');
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
  const contactLi = document.querySelector('.contact');
  const homeBackgroundImg = document.querySelector('.home-background-img');

  let mediumScreenSize = window.matchMedia('(max-width: 768px)');

  addEventListener('DOMContentLoaded', () => {
    contactLi.style.display = 'none';

    if (mediumScreenSize.matches) {
      navLinks[0].prepend(appendEl);
      orderBtn.textContent = 'order';
      contactLi.style.display = 'block';
      homeBackgroundImg.src = 'assets/images/homepage/main_mobile.jpg';
    }
  });

  const checkScreenSize = function () {
    if (mediumScreenSize.matches) {
      navLinks[0].prepend(appendEl);
      orderBtn.textContent = 'order';
      contactLi.style.display = 'block';
      homeBackgroundImg.src = 'assets/images/homepage/main_mobile.jpg';
    } else {
      orderBtn.textContent = 'order now';
      const parentDiv = orderBtn.parentNode.parentNode;
      parentDiv.insertBefore(appendEl, orderBtnLi);
      contactLi.style.display = 'none';
      homeBackgroundImg.src = 'assets/images/homepage/main.jpg';
    }
  };

  window.addEventListener('resize', checkScreenSize);

  function setNavTop() {
    const top = header.getBoundingClientRect().bottom;

    navLinksDesktop.style.top = `${top}px`;
  }

  const hamburgerClick = function () {
    nav.classList.toggle('nav--active', hamburgerInput.checked);
    setNavTop();

    if (hamburgerInput.checked) {
      navLinksDesktop.style.display = 'flex';
      navLinksDesktop.classList.add('fade-in-element');
      nav.classList.add('nav--active');
      orderBtn.classList.add('nav-links-mobile--background');
      logo.children[0].children[0].classList.add('nav-links-mobile---active');
    } else {
      header.style.position = 'sticky';
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
