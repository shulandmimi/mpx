
/**
 * @this {import('webpack').LoaderContext<any>}
 * @returns {string}
 */
module.exports = function () {
  return `module.exports = __mpx_resolve_path__(${JSON.stringify(this.resource)})`
}
