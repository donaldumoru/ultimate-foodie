/**
 * Formats a number as a localized currency string.
 *
 * @param {number} amount - The numeric value to format.
 * @returns {string} The formatted currency string based on the set locale.
 */

const internationalizeNum = num => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(num);
};

export { internationalizeNum };
