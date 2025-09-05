export const categoriesData = '/data/categories.json';

// Initialize empty menu object
const menu = {};

/**
 * Async function to handle fetching and populating restaurant menu
 * @param {json} - Json file with item categories and amount of available items per category
 */
export const createMenu = async data => {
  // Check if MENU is already stored in sessionStorage to prevent multiple API calls
  if (sessionStorage.getItem('storedMenu')) {
    const obj = JSON.parse(sessionStorage.getItem('storedMenu'));
    return obj;
  }

  // Initialize empty array to store promises per category
  const jobs = [];

  // API endpoint from netflify functions
  const apiUrl = `/.netlify/functions/fetch`;

  try {
    const response = await fetch(categoriesData);
    const apiResponse = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();

    const apiItems = await apiResponse.json();

    // Convert categories and amount of items per category to arrays
    const categoriesAndAmounts = Object.entries(data);

    // Directly destructure the array and loop through each category to perform fetch for each one
    categoriesAndAmounts.forEach(([category, amount]) => {
      // const menuUrl = `https://free-food-menus-api-two.vercel.app/${category}`;
      const itemsInCategory = apiItems[category];

      // console.log('Category Object', itemsInCategory);

      /**
       * Async function to make call to api to build one promise per category
       * @param {string,number,url} - This functions takes in the category, number of items in category and the url to perfom fetch
        },
      */
      async function categoryJob(itemCategory, itemNum, url) {
        try {
          // const response = await fetch(url);

          // if (!response.ok) {
          //   throw new Error(`Response status: ${response.status}`);
          // }

          // const itemsInCategory = await response.json();

          // console.log('items', 'in', category, itemsInCategory);

          /**
           * Async function to perform check on each item to see which items have invalid images (Error 404)
           * @param {obj} - This functions takes in the food object, makes the call with the image link and returns the items that have valid images
            },
          */
          async function checkItemImgIsAvailable(food) {
            try {
              const response = await fetch(food.img);

              if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
              }

              return food;
            } catch (error) {
              console.log(error.message);
            }
          }

          // Make one promise per item that checks whether its image loads.
          // After this line, `checks` is an array of promises, not results yet.
          const checks = itemsInCategory.map(item =>
            checkItemImgIsAvailable(item)
          );

          // Wait until all image checks finish (success or fail).
          // `settled` will be an array of entries like
          //   { status: "fulfilled", value: <food>  OR value: undefined}
          const settledChecks = await Promise.allSettled(checks);

          // If value of above is undefined, we filter it out here, get the valid food items and then take only number of items needed
          const results = settledChecks
            .filter(result => result.value)
            .map(result => result.value)
            .slice(0, itemNum);

          // We return the name of category and the results per category
          return { itemCategory, results };
        } catch (error) {
          console.log(error.message);
        }
      }

      // Push the built promise per category in jobs array
      jobs.push(categoryJob(category, amount, itemsInCategory));
    });

    // Wait until every category job has finished
    // Each entry will look like:
    //   { status: "fulfilled", value: { itemCategory, results } }
    const settledJobs = await Promise.allSettled(jobs);

    // Build the final `menu` from ONLY the successful jobs
    for (const entry of settledJobs) {
      // The successful job returns the pair we need.
      const { itemCategory, results } = entry.value;

      // Store that category's items on the menu object.
      menu[itemCategory] = results;
    }

    return menu;
  } catch (error) {
    console.log(error.message);
  }
};
