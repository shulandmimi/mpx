const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 *
 * @param {object} obj
 * @param {string} key
 * @returns {boolean}
 */
module.exports = function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}
