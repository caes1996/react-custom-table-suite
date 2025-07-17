/**
 * Validates and cleans numeric input by removing non-digit characters
 * @param {string} value - The input value to validate
 * @returns {string} Cleaned numeric string
 */
export const validateNumericValue = (value) => {
  return value.replace(/\D/g, "");
};