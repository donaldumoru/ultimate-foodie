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
