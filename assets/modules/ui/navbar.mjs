const MAKE_NAV_BAR = function () {
  const body = document.querySelector('body');

  // Header
  const header = document.querySelector('header');
  //Nav
  const nav = document.createElement('nav');

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger';
  const hamburgerInput = document.createElement('label');
  hamburgerInput.setAttribute('for', 'hamburger-input');
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.id = 'hamburger-input';
  const hamburgerSpan = document.createElement('span');
  hamburgerSpan.className = 'hamburger-span';
  hamburgerInput.append(input, hamburgerSpan);
  hamburger.appendChild(hamburgerInput);

  // Nav Links --- First
  const navLinksUl1 = document.createElement('ul');
  navLinksUl1.className = 'nav-links';

  const aboutLi = document.createElement('li');
  const aboutLink = document.createElement('a');
  aboutLink.href = 'about';
  aboutLink.textContent = 'about';
  aboutLi.appendChild(aboutLink);

  const locationLi = document.createElement('li');
  const locationLink = document.createElement('a');
  locationLink.href = 'locations';
  locationLink.textContent = 'locations';
  locationLi.appendChild(locationLink);

  const ContactLi = document.createElement('li');
  const ContactLink = document.createElement('a');
  ContactLink.href = 'contact';
  ContactLink.textContent = 'contact';
  ContactLi.appendChild(ContactLink);

  navLinksUl1.append(aboutLi, ContactLi, locationLi);

  // Logo
  const logoUl = document.createElement('ul');
  logoUl.className = 'logo';
  const logoLi = document.createElement('li');
  const logoLink = document.createElement('a');
  logoLink.textContent = 'ultimate foodie';
  logoLink.href = '/';
  logoLi.appendChild(logoLink);
  logoUl.appendChild(logoLi);

  // Nav links --- Second
  const navLinksUl2 = document.createElement('ul');
  navLinksUl2.className = 'nav-links--mobile';

  const menuLi = document.createElement('li');
  menuLi.className = 'append';
  const menuLink = document.createElement('a');
  menuLink.href = 'menu';
  menuLink.textContent = 'menu';
  menuLi.appendChild(menuLink);

  const orderLi = document.createElement('li');
  orderLi.className = 'order-link';
  const orderLink = document.createElement('a');
  orderLink.className = 'order-btn';
  orderLink.href = 'order';
  orderLink.textContent = 'order now';
  orderLi.appendChild(orderLink);
  navLinksUl2.append(menuLi, orderLi);

  // Append everything -- bring it all together
  nav.append(hamburger, navLinksUl1, logoUl, navLinksUl2);
  header.append(nav);
  body.prepend(header);
};

export { MAKE_NAV_BAR };
