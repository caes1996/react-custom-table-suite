/**
 * Formats a number as Colombian Peso (COP) currency
 * @param {number|string} saldo - The amount to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted currency string
 */
export const formatSaldoCOP = (saldo, decimals = 2) => {
  // Convert to number if it's a string
  const numericSaldo = typeof saldo === 'string' ? parseFloat(saldo) : saldo;
  
  // Check if it's a valid number
  if (isNaN(numericSaldo)) {
    return '0 COP';
  }
  
  // Format number as COP currency
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: decimals,
  }).format(numericSaldo);
};

/**
 * Formats a number with thousands separators
 * @param {number|string} number - The number to format
 * @param {number} minDec - Minimum decimal places (default: 0)
 * @param {number} maxDec - Maximum decimal places (default: 0)
 * @returns {string} Formatted number string
 */
export const formatMiles = (number, minDec = 0, maxDec = 0) => {
  // Convert to number if it's a string
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  // Check if number is NaN after conversion
  if (isNaN(num)) {
    return '0';
  }
  
  // Format number with thousands separators and decimals
  return num.toLocaleString('es-ES', {
    minimumFractionDigits: minDec,
    maximumFractionDigits: maxDec,
  });
};

/**
 * Formats a number as percentage
 * @param {number|string} number - The number to format (should be decimal, e.g., 0.25 for 25%)
 * @param {number} minDec - Minimum decimal places (default: 0)
 * @param {number} maxDec - Maximum decimal places (default: 0)
 * @returns {string} Formatted percentage string
 */
export const formatPercent = (number, minDec = 0, maxDec = 0) => {
  // Convert to number if it's a string
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  // Check if number is NaN after conversion
  if (isNaN(num)) {
    return '0%';
  }
  
  // Multiply by 100 to convert to percentage
  const percentValue = num * 100;
  
  // Format number with 2 decimals and add % symbol
  return `${percentValue.toLocaleString('es-ES', {
    minimumFractionDigits: minDec,
    maximumFractionDigits: maxDec,
  })}%`;
};

/**
 * Formats a percentage value for display
 * @param {number|string} value - The value to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined) return '';
  
  // Convert to number if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check if it's a valid number
  if (isNaN(numValue)) return value;
  
  // Format as percentage with specified decimal places
  return `${(numValue * 100).toFixed(decimals)}%`;
};

/**
 * Formats money with additional description (format: "amount - (description)")
 * @param {string} saldo - String in format "amount-description"
 * @param {number} dec - Number of decimal places (default: 0)
 * @returns {string} Formatted money string with description
 */
export const formatMoneyInt = (saldo, dec = 0) => {
  if (typeof saldo !== 'string' || !saldo.includes('-')) {
    return 'Formato inválido';
  }
  
  // Split string into x and y parts
  const [x, y] = saldo.split('-');
  
  // Convert x to number to format as COP currency
  const numericX = parseFloat(x);
  
  // Check if x is a valid number
  if (isNaN(numericX)) {
    return '0 COP';
  }
  
  // Format x as COP currency
  const formattedX = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: dec,
  }).format(numericX);
  
  // Return formatted result with y in parentheses
  return `${formattedX} - (${y.trim()})`;
};