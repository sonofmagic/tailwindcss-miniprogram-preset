/**
 *
 * @param {String} p
 * @returns {String}
 */
function removePrefix(p) {
  return String.prototype.replace.call(p, /src[\\/]/, '')
}

module.exports = {
  removePrefix
}
