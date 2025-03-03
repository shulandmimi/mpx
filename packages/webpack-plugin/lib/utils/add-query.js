const parseRequest = require('./parse-request')
const stringifyQuery = require('./stringify-query')
const type = require('./type')
const hasOwn = require('./has-own')

/**
 * 默认为非强行覆盖原 query ，如需强行覆盖传递 force 为 true
 * @param {string} request
 * @param {Record<string, unknown>} data
 * @param {boolean} force
 * @param {string[]} removeKeys
 * @returns {string}
 */
module.exports = function addQuery (request, data = {}, force, removeKeys) {
  const { rawResourcePath: resourcePath, loaderString, queryObj: queryObjRaw } = parseRequest(request)
  const queryObj = Object.assign({}, queryObjRaw)
  if (force) {
    Object.assign(queryObj, data)
  } else {
    Object.keys(data).forEach((key) => {
      if (!hasOwn(queryObj, key)) {
        queryObj[key] = data[key]
      }
    })
  }

  if (removeKeys) {
    if (type(removeKeys) === 'String') {
      removeKeys = [removeKeys]
    }
    removeKeys.forEach((key) => {
      delete queryObj[key]
    })
  }

  return (loaderString ? `${loaderString}!` : '') + resourcePath + stringifyQuery(queryObj)
}
