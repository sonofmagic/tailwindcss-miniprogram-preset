import plugin from 'tailwindcss/plugin'
import corePlugins from './corePlugins'
import { escape } from './util'
import { expandThemeConfig } from './defaultConfig'
import type { TailwindConfig } from 'tailwindcss/tailwind-config'
const emptyVariants = corePlugins.reduce<Record<string, any[]>>((acc, cur) => {
  acc[cur] = []
  return acc
}, {})

const config: TailwindConfig = {
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
    screens: {}, // false,
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
      function escapeUtilities(
        path: string,
        prefix: string,
        attrKey: string | ((value: string) => any)
      ) {
        const utilities = Object.entries(config(path)).reduce<
          Record<string, any>[]
        >((acc, [key, value]) => {
          if (path === 'theme.margin' && key[0] === '-') {
            // do continue
            // ignore -m-x
            return acc
          }
          const str = escape(`${prefix}${key}`)
          if (typeof attrKey === 'function') {
            const fn = attrKey
            acc.push({
              [`.${e(str)}`]: fn(value as string)
            })
          } else {
            acc.push({
              [`.${e(str)}`]: {
                [attrKey]: `${value}`
              }
            })
          }
          return acc
        }, [])

        addUtilities(utilities)
      }
      escapeUtilities('theme.height', 'h-', 'height')
      escapeUtilities('theme.margin', 'm-', 'margin')
      escapeUtilities('theme.margin', 'my-', (value: string) => {
        return {
          'margin-top': `${value}`,
          'margin-bottom': `${value}`
        }
      })
      escapeUtilities('theme.margin', 'mx-', (value: string) => {
        return {
          'margin-left': `${value}`,
          'margin-right': `${value}`
        }
      })
      escapeUtilities('theme.margin', 'mt-', 'margin-top')
      escapeUtilities('theme.margin', 'mr-', 'margin-right')
      escapeUtilities('theme.margin', 'mb-', 'margin-bottom')
      escapeUtilities('theme.margin', 'ml-', 'margin-left')
      escapeUtilities('theme.maxHeight', 'max-h-', 'max-height')
      escapeUtilities('theme.padding', 'p-', 'padding')

      escapeUtilities('theme.padding', 'py-', (value: string) => {
        return {
          'padding-top': `${value}`,
          'padding-bottom': `${value}`
        }
      })
      escapeUtilities('theme.padding', 'px-', (value: string) => {
        return {
          'padding-left': `${value}`,
          'padding-right': `${value}`
        }
      })
      escapeUtilities('theme.padding', 'pt-', 'padding-top')
      escapeUtilities('theme.padding', 'pr-', 'padding-right')
      escapeUtilities('theme.padding', 'pb-', 'padding-bottom')
      escapeUtilities('theme.padding', 'pl-', 'padding-left')

      escapeUtilities('theme.width', 'w-', 'width')
    })
  ]
}

export default config
