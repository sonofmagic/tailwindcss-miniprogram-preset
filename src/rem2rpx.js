
const remUnitRegex = /(\d*\.?\d+) *rem/g

const defaultOptions = {
  rootValue: 32,
  unitPrecision: 5,
  minPixelValue: 0
}

const remReplace = createRemReplace(
  defaultOptions.rootValue,
  defaultOptions.unitPrecision,
  defaultOptions.minPixelValue
)

function toFixed (number, precision) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}
/**
 *
 * @param {number} rootValue
 * @param {number} unitPrecision
 * @param {number} minPixelValue
 * @returns {(string)=>string}
 */
function createRemReplace (rootValue, unitPrecision, minPixelValue) {
  return (m, $1) => {
    if (!$1) return m
    const rem = parseFloat($1)
    if (rem < minPixelValue) return m
    const fixedVal = toFixed(rem * rootValue, unitPrecision)
    return fixedVal === 0 ? '0' : fixedVal + 'rpx'
  }
}

/**
 *
 * @param {string} str
 */
function rem2rpx (str) {
  // 重新创建解决 exec 问题
  const execArr = /(\d*\.?\d+) *rem/g.exec(str)
  return execArr ? remReplace(str, execArr[1]) : str
}

module.exports = {
  defaultOptions,
  remUnitRegex,
  rem2rpx,
  createRemReplace
}
