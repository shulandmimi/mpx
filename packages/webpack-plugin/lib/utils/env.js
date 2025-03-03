
/**
 *
 * @param {GlobalMode} mode
 * @returns {boolean}
 */
function isReact (mode) {
    return mode === 'ios' || mode === 'android'
}

/**
 *
 * @param {GlobalMode} mode
 * @returns {boolean}
 */
function isWeb (mode) {
    return mode === 'web'
}

/**
 *
 * @param {GlobalMode} mode
 * @returns {boolean}
 */
function isMiniProgram (mode) {
    return !isWeb(mode) && !isReact(mode)
}

module.exports = {
    isWeb,
    isReact,
    isMiniProgram
}
