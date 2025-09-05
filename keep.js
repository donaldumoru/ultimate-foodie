async function menuObj() {
  const menu = {};
  /**
   * Async function to get the items and amount of each item to fetch from the api
   * @param {json} - Json file with food/drinks and amount of each item
   */
  async function getAvailableMenu(data) {
    try {
      const response = await fetch(data);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const availableMenuObj = await response.json();
      return availableMenuObj;
    } catch (error) {
      console.log(error.message);
    }
  }

  getAvailableMenu(availableMenu).then(availableObj => {
    //Create array from the available menu object
    let availableCategories = Object.entries(availableObj);

    //Directly destructure the array to get individual categories and amounts of items in each category
    availableCategories.forEach(([category, amount]) => {
      const menuUrl = `https://free-food-menus-api-two.vercel.app/${category}`;
      /**
           * Async function to make call to api to get only the items specified in the above getAvailableMenu function
           * @param {url} - free api returning
              id: ...,
              img: ...,
              name: ...,
              dsc: ...,
              price: ...,
              rate: ...,
              country: ...
            },
          */
      async function getMenu(url) {
        try {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const categoryMenu = await response.json();

          /**
           * Async function to make call to api using each item object to be used later to check and remove items with invalid images (Error 404)
           * @param {obj} - individual food object
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

          // Array of promises
          const checks = categoryMenu.map(item =>
            checkItemImgIsAvailable(item)
          );

          // Settled promises containing status and value of each item... then filtered to remove invalid images and sliced to get only the specified amount in menu.json file
          const results = await Promise.allSettled(checks).then(results =>
            results
              .filter(result => result.value)
              .map(result => result.value)
              .slice(0, amount)
          );

          // Create food category for each result and set value as the results gotten from settled promise
          menu[category] = results;

          return menu;
        } catch (error) {
          console.log(error.message);
        }
      }

      getMenu(menuUrl);
    });
  });

  return menu;
}
