const runRules = require('./run-rules')

/**
 * @typedef {Object} RulesRunnerOption
 * @property {TemplateType} type
 * @property {GlobalMode} mode
 * @property {GlobalMode} srcMode
 * @property {Record<string, any>} data
 * @property {Record<string, any>} meta
 * @property {string} testKey
 * @property {string} mainKey
 * @property {boolean} waterfall
 * @property {Function} warn
 * @property {Function} error
 */

/**
 *
 * @param {RulesRunnerOption} param0
 * @returns
 */
module.exports = function getRulesRunner ({
  type,
  mode,
  srcMode,
  data,
  meta,
  testKey,
  mainKey,
  waterfall,
  warn,
  error
}) {
  /**
   * @type {Record<TemplateType, Record<GlobalMode, PlatformSpecProcessor>>}
   */
  const specMap = {
    template: {
      wx: require('./template/wx')
    },
    style: {
      wx: require('./style/wx')
    },
    json: {
      wx: require('./json/wx')
    }
  }
  const spec = specMap[type] && specMap[type][srcMode] && specMap[type][srcMode]({ warn, error })
  if (spec && spec.supportedModes.indexOf(mode) > -1) {
    const normalizeTest = spec.normalizeTest
    const mainRules = mainKey ? spec[mainKey] : spec
    if (mainRules) {
      return function (input) {
        return runRules(mainRules, input, { mode, data, meta, testKey, waterfall, normalizeTest })
      }
    }
  }
}
