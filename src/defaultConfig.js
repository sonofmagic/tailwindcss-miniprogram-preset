// this is a deep clone object
const deepCloneConfig = require('tailwindcss/defaultConfig')
const { rem2rpx } = require('./rem2rpx')

function ObjectValueMap (obj, fn) {
  return Object.entries(obj).reduce((acc, [key, value], idx) => {
    acc[key] = fn(value, idx)
    return acc
  }, {})
}

const expandThemeConfig = {
  // spacing
  spacing: ObjectValueMap(deepCloneConfig.theme.spacing, rem2rpx),
  // borderRadius
  borderRadius: ObjectValueMap(deepCloneConfig.theme.borderRadius, rem2rpx),
  // fontSize // xs: ['0.75rem', { lineHeight: '1rem' }],
  fontSize: ObjectValueMap(deepCloneConfig.theme.fontSize, (value) => {
    const [fontSize, { lineHeight }] = value
    return [rem2rpx(fontSize), { lineHeight: rem2rpx(lineHeight) }]
  }),
  // lineHeight
  lineHeight: ObjectValueMap(deepCloneConfig.theme.lineHeight, rem2rpx),
  // maxWidth
  maxWidth: ObjectValueMap({
    none: 'none',
    0: '0',
    full: '100%',
    min: 'min-content',
    max: 'max-content'
  }, rem2rpx)
}

module.exports = {
  expandThemeConfig
}
