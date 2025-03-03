/**
 * @param {string} path
 * @returns {string}
 */
module.exports = function (path) {
  return path.replace(/\\/g, '/')
}
