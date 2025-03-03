const path = require('path')

/**
 *
 * @param {string} resourcePath
 * @param {string} infix
 * @param {string} extname
 * @returns {string}
 */
module.exports = function (resourcePath, infix, extname) {
  extname = extname || path.extname(resourcePath)
  return resourcePath.substring(0, resourcePath.length - extname.length) + '.' + infix + extname
}
