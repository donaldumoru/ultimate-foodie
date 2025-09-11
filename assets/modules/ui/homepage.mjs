import { createMenu } from '../fetch-manager.mjs';

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

const renderHighestRated = function (menu) {
  let maxItemsToRate = 5;

  const allMenuItems = menu
    .flat()
    .filter(el => typeof el !== 'string')
    .flat()
    .sort((a, b) => a.rate - b.value);

  const highestRated = allMenuItems.reduce((acc, item) => {
    if (acc.length < maxItemsToRate) {
      acc.push(item);
    }
    return acc;
  }, []);

  console.log(highestRated);
};

renderHighestRated(menu);

const MAKE_MUST_TRY_SECTION = function (data) {
  const mustTryTitle = document.querySelector('.must-try-title');
  mustTryTitle.textContent = data.musttrysection.title;
  const mustTryDesc = document.querySelector('.must-try-desc');
  mustTryDesc.textContent = data.musttrysection.description;
};

MAKE_MUST_TRY_SECTION(homepageData);
