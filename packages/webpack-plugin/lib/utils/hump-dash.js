module.exports = {
  /**
   *
   * @param {string} value
   * @returns {string}
   */
  hump2dash (value) {
    return value.replace(/[A-Z]/g, function (match) {
      return '-' + match.toLowerCase()
    })
  },
  /**
   *
   * @param {string} value
   * @returns {string}
   */
  dash2hump (value) {
    return value.replace(/-([a-z])/g, function (match, p1) {
      return p1.toUpperCase()
    })
  }
}
