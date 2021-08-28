const escapeMap = {
  // eslint-disable-next-line no-useless-escape
  '\/': '-div-',
  // eslint-disable-next-line no-useless-escape
  '\.': '-dot-'
}
/**
 * 转义工作
 * @param {string} str
 * @returns {string}
 */
function escape (str) {
  return Object.entries(escapeMap).reduce((acc, [key, value]) => {
    return acc.replace(key, value)
  }, str)
}

module.exports = {
  escape
}
