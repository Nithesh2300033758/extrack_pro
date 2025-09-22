/**
 * Formats a number into a currency string with commas.
 * e.g., 50000 becomes "50,000.00"
 * @param {number} amount The number to format.
 * @returns {string} The formatted currency string.
 */
export const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};