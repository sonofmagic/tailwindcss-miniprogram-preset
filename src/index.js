
const _ = require('lodash')
const plugin = require('tailwindcss/plugin')
// const defaultConfig = require('tailwindcss/stubs/defaultConfig.stub')
// const boxShadowplugin = require('tailwindcss/lib/plugins/boxShadow')
const escapeMap = {
  '\/': '-div-',
  '\.': '-dot-'
}
/**
 * 转义工作
 * @param {string} str 
 * @returns {string}
 */
function escape(str) {
  return Object.entries(escapeMap).reduce((acc, [key, value]) => {
    return _.replace(acc, key, value)
  }, str)
}

const corePlugins = [
  //#endregion 基础样式
  //'preflight',
  //#endregion
  //#region  布局/容器
  //'container',
  //#endregion

  //#region 不支持 :not 选择器
  //参考 https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
  // 'space',
  // 'divideWidth',
  // 'divideColor',
  // 'divideStyle',
  // 'divideOpacity',
  //#endregion


  //#region 可访问性 :屏幕阅读器
  //'accessibility',
  //#endregion
  'appearance',
  'backgroundAttachment',
  'backgroundClip',
  'backgroundColor',
  'backgroundImage',
  'gradientColorStops',
  'backgroundOpacity',
  'backgroundPosition',
  'backgroundRepeat',
  'backgroundSize',
  'borderCollapse',
  'borderColor',
  'borderOpacity',
  'borderRadius',
  'borderStyle',
  'borderWidth',
  'boxSizing',
  'cursor',
  'display',
  'flexDirection',
  'flexWrap',
  //#region 盒对齐/Grid相关
  // 'placeItems',
  // 'placeContent',
  // 'placeSelf',
  //#endregion
  'alignItems',
  'alignContent',
  'alignSelf',
  'justifyItems',
  'justifyContent',
  'justifySelf',
  'flex',
  'flexGrow',
  'flexShrink',
  'order',
  'float',
  'clear',
  //#region 小程序字体需要js额外加载，这里先不用 fontFamily
  // 'fontFamily',
  //#endregion
  'fontWeight',
  //'height',
  'fontSize',
  'lineHeight',
  'listStylePosition',
  'listStyleType',
  // 'margin',
  // 'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'objectFit',
  'objectPosition',
  'opacity',
  'outline',
  'overflow',
  'overscrollBehavior',
  //'padding',
  'placeholderColor',
  'placeholderOpacity',
  'pointerEvents',
  'position',

  // 'inset', // 用不着
  'resize',
  // 'boxShadow', // *,::before,::after 限制
  //'ringWidth', // *,::before,::after 限制
  //'ringOffsetColor',
  //'ringOffsetWidth',
  //'ringColor',
  //'ringOpacity',
  //#region SVG 相关
  // 'fill',
  // 'stroke',
  // 'strokeWidth',
  //#endregion
  'tableLayout',
  'textAlign',
  'textColor',
  'textOpacity',
  'textOverflow',
  'fontStyle',
  'textTransform',
  'textDecoration',
  'fontSmoothing',
  'fontVariantNumeric',
  'letterSpacing',
  'userSelect',
  'verticalAlign',
  'visibility',
  'whitespace',
  'wordBreak',
  // 'width',
  'zIndex',
  //#region  网格布局
  // 'gap',
  // 'gridAutoFlow',
  // 'gridTemplateColumns',
  // 'gridAutoColumns',
  // 'gridColumn',
  // 'gridColumnStart',
  // 'gridColumnEnd',
  // 'gridTemplateRows',
  // 'gridAutoRows',
  // 'gridRow',
  // 'gridRowStart',
  // 'gridRowEnd',
  //#endregion
  'transform',
  'transformOrigin',
  'scale',
  'rotate',
  // 'translate', 没啥用
  'skew',
  'transitionProperty',
  'transitionTimingFunction',
  'transitionDuration',
  'transitionDelay',
  'animation',
]
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
    enabled: true,
    content: ['./public/index.html', './index.html', , './src/**/*.{vue,js,ts,jsx,tsx,wxml}']
  },
  darkMode: false, // 'class', // or 'media' or 'class'
  important: true,
  corePlugins,
  theme: {
    screens: false,
    extend: {},
  },
  variants: {
    ...emptyVariants,
    extend: {},
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, addBase, addVariant, e, prefix, config, theme, variants, postcss }) {
      // delve(object, keypath, [default]) 类似于get，找不到 'theme.height' 会从 defaultConfig里面找
      function escapeUtilities(path, prefix, attrKey) {
        const utilities = _.map(config(path), (value, key) => {
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
    }),
  ],
}
