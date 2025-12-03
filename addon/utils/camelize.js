/**
 * Converts a string to camelCase
 * @param {string} str - The string to convert
 * @returns {string} The camelized string
 */
export default function camelize(str) {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
}
