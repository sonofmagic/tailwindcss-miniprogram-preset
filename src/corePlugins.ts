import type { TailwindCorePlugin } from 'tailwindcss/tailwind-config'

const corePlugins: TailwindCorePlugin[] = [
  // #endregion 基础样式
  // 'preflight',
  // #endregion
  // #region  布局/容器
  // 'container',
  // #endregion

  // #region 不支持 :not 选择器
  // 参考 https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html
  // 'space',
  // 'divideWidth',
  // 'divideColor',
  // 'divideStyle',
  // 'divideOpacity',
  // #endregion

  // #region 可访问性 :屏幕阅读器
  // 'accessibility',
  // #endregion
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
  // #region 盒对齐/Grid相关
  // 'placeItems',
  // 'placeContent',
  // 'placeSelf',
  // #endregion
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
  // #region 小程序字体需要js额外加载，这里先不用 fontFamily
  // 'fontFamily',
  // #endregion
  'fontWeight',
  // 'height',
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
  // 'padding',
  'placeholderColor',
  'placeholderOpacity',
  'pointerEvents',
  'position',

  // 'inset', // 用不着
  'resize',
  // 'boxShadow', // *,::before,::after 限制
  // 'ringWidth', // *,::before,::after 限制
  // 'ringOffsetColor',
  // 'ringOffsetWidth',
  // 'ringColor',
  // 'ringOpacity',
  // #region SVG 相关
  // 'fill',
  // 'stroke',
  // 'strokeWidth',
  // #endregion
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
  // #region  网格布局(小程序自己的兼容问题还没搞定)
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
  // #endregion
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
  'animation'
]

export default corePlugins
