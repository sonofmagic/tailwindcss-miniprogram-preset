
const plugin = require('tailwindcss/plugin')
const corePlugins = require('./corePlugins')
const { escape } = require('./util')
const { expandThemeConfig } = require('./defaultConfig')

const emptyVariants = corePlugins.reduce((acc, cur) => {
  acc[cur] = []
  return acc
}, {})

/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  // 由于微信小程序会把 w-[750rpx] 中的中括号强制去除，所以不推荐开启此模式
  // mode: 'jit',
  purge: {
    // 如果 development 下,wxss过大，可以一直开启 enabled
    // 默认在 NODE_ENV=production 下开启
    // enabled: process.env.NODE_ENV === 'production',
    content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx,wxml}']
  },
  darkMode: false, // 'class', // or 'media' or 'class'
  important: true,
  corePlugins,
  theme: {
    screens: false,
    ...expandThemeConfig,
    extend: {}
  },
  variants: {
    ...emptyVariants,
    extend: {}
  },
  plugins: [
    plugin(function ({ addUtilities, e, config }) {
      // delve(object, keypath, [default]) 类似于get，找不到 'theme.height' 会从 defaultConfig里面找
      function escapeUtilities (path, prefix, attrKey) {
        const utilities = Object.entries(config(path)).map(([key, value]) => {
          const str = escape(`${prefix}${key}`)
          return {
            [`.${e(str)}`]: {
              [attrKey]: `${value}`
            }
          }
        })
        addUtilities(utilities)
      }
      escapeUtilities('theme.height', 'h-', 'height')
      escapeUtilities('theme.margin', 'm-', 'margin')
      escapeUtilities('theme.maxHeight', 'max-h-', 'max-height')
      escapeUtilities('theme.padding', 'p-', 'padding')
      escapeUtilities('theme.width', 'w-', 'width')
    })
  ]
}
