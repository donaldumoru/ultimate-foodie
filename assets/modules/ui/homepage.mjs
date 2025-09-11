import { createMenu } from '../fetch-manager.mjs';

const mustTryWrapper = document.querySelector('.must-try-items-wrapper');
const scrollToRatingsContainer = document.querySelector('.scroll-to');
const arrowsContainer = document.querySelector('.arrows');

const menuObj = await createMenu();
const menu = Object.entries(menuObj);

const homepageDataFile = '/data/homepage.json';

const fetchHomepageData = async function (data) {
  try {
    const response = await fetch(data);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const homepageData = await fetchHomepageData(homepageDataFile);

const MAKE_MAIN = function (data) {
  const heroH1 = document.querySelector('h1');
  heroH1.textContent = data.herosection.title;
};

MAKE_MAIN(homepageData);

// const renderRatingCount = function(num){
//     const
// }

const renderHighestRated = function (menu) {
  let maxItemsToRate = 5;

  ///Remove drinks and return all menu items
  const allMenuItems = menu
    .filter(item => !item.includes('drinks'))
    .flat()
    .filter(item => typeof item !== 'string')
    .flat()
    .sort((a, b) => b.rate - a.rate);

  const highestRated = allMenuItems.slice(0, 5);

  highestRated.forEach(item => {
    const itemWrapper = document.createElement('div');
    itemWrapper.className = 'must-try-item-wrapper';

    const itemImg = document.createElement('img');
    itemImg.src = item.img;

    const textWrapper = document.createElement('div');
    textWrapper.className = 'must-try-items-text-wrapper';

    const topRateItemsContainer = document.createElement('div');
    topRateItemsContainer.className = 'top-rate-items';

    const itemRatingWrapper = document.createElement('div');
    itemRatingWrapper.className = 'item-rate';

    for (let i = 0; i < item.rate; i++) {
      const itemRating = document.createElement('img');
      itemRating.className = 'item-rate-img';
      itemRating.src = 'assets/images/icons/star.svg';
      itemRatingWrapper.appendChild(itemRating);
    }

    const itemName = document.createElement('span');
    itemName.className = 'item-rate-name';
    itemName.textContent = item.name;

    const itemDescription = document.createElement('p');
    itemDescription.textContent = item.dsc;
    itemDescription.className = 'item-rate-description';

    topRateItemsContainer.append(itemRatingWrapper, itemName, itemDescription);

    const itemLinkWrapper = document.createElement('a');
    itemLinkWrapper.className = 'item-rate-link';
    const itemLink = document.createElement('div');
    const linkImg = document.createElement('img');
    linkImg.src = 'assets/images/icons/right_black.svg';
    itemLinkWrapper.href = '/order';
    itemLink.textContent = 'Order now';
    itemLinkWrapper.append(itemLink, linkImg);

    textWrapper.append(topRateItemsContainer, itemLinkWrapper);

    itemWrapper.append(itemImg, textWrapper);
    mustTryWrapper.appendChild(itemWrapper);
  });
};

renderHighestRated(menu);

const MAKE_MUST_TRY_SECTION = function (data) {
  const mustTryTitle = document.querySelector('.must-try-title');
  mustTryTitle.textContent = data.musttrysection.title;
  const mustTryDesc = document.querySelector('.must-try-desc');
  mustTryDesc.textContent = data.musttrysection.description;
};

MAKE_MUST_TRY_SECTION(homepageData);

let scrollPosition = 0;

const scrollToFirstOrLast = function (e) {
  const scrollOptions = {
    left: 0,
    behavior: 'smooth',
  };

  if (!e.target.classList.contains('scroll-to')) {
    const clicked = e.target;
    const unclicked = [...e.target.parentElement.children].filter(
      child => child !== e.target
    )[0];

    clicked.classList.remove('grey-out');
    unclicked.classList.add('grey-out');

    if (clicked.classList.contains('right-scroll')) {
      scrollOptions.left = 800;
      mustTryWrapper.scroll(scrollOptions);
    } else if (clicked.classList.contains('left-scroll')) {
      scrollOptions.left = 0;
      mustTryWrapper.scroll(scrollOptions);
    }
  }

  scrollPosition = scrollOptions.left;
};

const scrollRatingsIntoView = function (e) {
  const scrollOptions = {
    left: scrollPosition,
    behavior: 'smooth',
  };

  if (!e.target.classList.contains('arrows')) {
    const clicked = e.target;

    // const unclicked = [...e.target.parentElement.children].filter(
    //   child => child !== e.target
    // )[0];

    if (clicked.classList.contains('right-arrow')) {
      if (scrollPosition >= 800) {
        return;
      }

      scrollPosition += 800;
      scrollOptions.left = scrollPosition;
      mustTryWrapper.scroll(scrollOptions);
    } else if (clicked.classList.contains('left-arrow')) {
      if (scrollPosition > 0) {
        scrollPosition -= 800;
        scrollOptions.left = scrollPosition;
        mustTryWrapper.scroll(scrollOptions);
      }
    }
  }
};

scrollToRatingsContainer.addEventListener('click', scrollToFirstOrLast);
arrowsContainer.addEventListener('click', scrollRatingsIntoView);
