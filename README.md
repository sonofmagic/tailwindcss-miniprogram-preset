# tailwindcss-miniprogram-preset

> tailwindcss 小程序版本预设  
> tailwindcss-preset for miniprogram

用 `tailwindcss` 来改善你的小程序开发体验吧

## 功能

大部分有用的 tailwindcss utilities 兼容小程序 + rem 转 rpx (默认 1rem = 32rpx)

## migration(From v1 -> v2)

```js
// # v1
// tailwind.config.js
module.exports = {
  presets: [require('tailwindcss-miniprogram-preset')]
  // ...
}
// # v2
// tailwind.config.js
const { defaultPreset, createPreset } = require('tailwindcss-miniprogram-preset')
module.exports = {
  presets: [defaultPreset]
  // ...
}
```

## How to use it

Installation

```sh
npm i -D tailwindcss-miniprogram-preset
# or
yarn add -D tailwindcss-miniprogram-preset
```

Then

[Installing Tailwind CSS as a PostCSS plugin](https://tailwindcss.com/docs/installation)

and `npx tailwindcss init`

then add `tailwindcss-miniprogram-preset` into your `presets`:

```js
// tailwind.config.js
const { defaultPreset, createPreset } = require('tailwindcss-miniprogram-preset')
module.exports = {
  presets: [defaultPreset]
  // ...
}
```

Then import tailwindcss

```css
/* @tailwind base;
@tailwind components; */
@tailwind utilities;
```

or Using with Preprocessors

```scss
// uni-app App.vue 公共部分
// 小程序不需要 'base' 'components'
// @import 'tailwindcss/base';
// @import 'tailwindcss/components';
// 只需引入工具类
@import "tailwindcss/utilities";
```

## 最佳实践

建议配合 vscode 插件 [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 使用

可以根据配置自动生成智能提示,可有效提升开发体验

使用 `uni-app` 的朋友可以直接使用提供的模板

[uni-app-vue3-tailwind-vscode-template](https://github.com/sonofmagic/uni-app-vue3-tailwind-vscode-template)

## 默认配置

> 默认配置都可通过 preset merge 策略开启

- `darkMode` 默认 `false`
- `theme.screens` 默认 `false` , 不需要 pc 那种自适应
- `important` 默认 `true` , 需要用它去覆盖原生样式
- `purge.enabled` 默认 `process.env.NODE_ENV === 'production'` ,可通过 `NODE_ENV` 环境变量,避免打包出来的 wxss 过大的问题,开发环境默认关闭
- 一些 `class` 的 `rename` 见下表

## 定制化兼容小程序的牺牲

### 小程序的 class 不支持大量特殊符号

解决方案: 做 class rename 处理

| form | to      | sample             |
| ---- | ------- | ------------------ |
| `\/` | `-div-` | `w-1/4` -> `w-1-div-4` |
| `\.` | `-dot-` | `w-1.5` -> `w-1-dot-5` |

### 小程序 wxss 只支持少量选择器

[官方文档链接](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

解决方案:

- 去除基于 `:not` 选择器的 `corePlugins`
- 去除不支持 `*` 选择器的 `corePlugins` , 例如默认添加 `'*, ::before, ::after'` 的插件
- 清空 variants (`hover:` `focus:` 这些)
- 不启用 `mode: 'jit'` 即时编译模式，因为 `wxml` 里写 `w-[762px]` ,`[` 和 `]`,会被默认转义为空格，导致即时编译无效。

### 去除自适应和无用插件

解决方案:

- 只使用 `utilities` , 不导入 `base` 和 `components`

## 如何覆盖此预设配置？

核心插件:

`corePlugins` 选项根据您是将其配置为对象还是数组而表现不同。

如果您把 `corePlugins` 配置为一个对象，那么它就会被跨配置合并。

如果您把 `corePlugins` 配置为一个数组，它就会取代您配置的预设所提供的任何 `corePlugins` 配置。

[官方参考文档](https://www.tailwindcss.cn/docs/presets)

## 注意事项

如果开发时，HMR 热更新不起作用，可以更改 `purge` 选项

也可以直接用自定义的 `purge` 选项, 覆盖当前 `preset`

```js
// tailwind.config.js
const { defaultPreset } = require('tailwindcss-miniprogram-preset')
/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  purge: defaultPreset.purge.content,
  presets: [defaultPreset]
}
```

## corePlugins 启用状况

|插件|是否启用|
|---|---|
|**preflight**|<span style="color:red;font-weight: bolder;">否</span>|
|**container**|<span style="color:red;font-weight: bolder;">否</span>|
|**space**|<span style="color:red;font-weight: bolder;">否</span>|
|**divideWidth**|<span style="color:red;font-weight: bolder;">否</span>|
|**divideColor**|<span style="color:red;font-weight: bolder;">否</span>|
|**divideStyle**|<span style="color:red;font-weight: bolder;">否</span>|
|**divideOpacity**|<span style="color:red;font-weight: bolder;">否</span>|
|**accessibility**|<span style="color:red;font-weight: bolder;">否</span>|
|**appearance**|<span style="color:green;font-weight: bolder;">是</span>|
|**backgroundAttachment**|<span style="color:green;font-weight: bolder;">是</span>|
|**backgroundClip**|<span style="color:green;font-weight: bolder;">是</span>|
|**backgroundColor**|<span style="color:green;font-weight: bolder;">是</span>|
|**backgroundImage**|<span style="color:green;font-weight: bolder;">是</span>|
|**gradientColorStops**|<span style="color:green;font-weight: bolder;">是</span>|
|**backgroundOpacity**|<span style="color:green;font-weight: bolder;">是</span>|
|**backgroundPosition**|<span style="color:green;font-weight: bolder;">是</span>|
|**backgroundRepeat**|<span style="color:green;font-weight: bolder;">是</span>|
|**backgroundSize**|<span style="color:green;font-weight: bolder;">是</span>|
|**borderCollapse**|<span style="color:green;font-weight: bolder;">是</span>|
|**borderColor**|<span style="color:green;font-weight: bolder;">是</span>|
|**borderOpacity**|<span style="color:green;font-weight: bolder;">是</span>|
|**borderRadius**|<span style="color:green;font-weight: bolder;">是</span>|
|**borderStyle**|<span style="color:green;font-weight: bolder;">是</span>|
|**borderWidth**|<span style="color:green;font-weight: bolder;">是</span>|
|**boxSizing**|<span style="color:green;font-weight: bolder;">是</span>|
|**cursor**|<span style="color:green;font-weight: bolder;">是</span>|
|**display**|<span style="color:green;font-weight: bolder;">是</span>|
|**flexDirection**|<span style="color:green;font-weight: bolder;">是</span>|
|**flexWrap**|<span style="color:green;font-weight: bolder;">是</span>|
|**placeItems**|<span style="color:red;font-weight: bolder;">否</span>|
|**placeContent**|<span style="color:red;font-weight: bolder;">否</span>|
|**placeSelf**|<span style="color:red;font-weight: bolder;">否</span>|
|**alignItems**|<span style="color:green;font-weight: bolder;">是</span>|
|**alignContent**|<span style="color:green;font-weight: bolder;">是</span>|
|**alignSelf**|<span style="color:green;font-weight: bolder;">是</span>|
|**justifyItems**|<span style="color:green;font-weight: bolder;">是</span>|
|**justifyContent**|<span style="color:green;font-weight: bolder;">是</span>|
|**justifySelf**|<span style="color:green;font-weight: bolder;">是</span>|
|**flex**|<span style="color:green;font-weight: bolder;">是</span>|
|**flexGrow**|<span style="color:green;font-weight: bolder;">是</span>|
|**flexShrink**|<span style="color:green;font-weight: bolder;">是</span>|
|**order**|<span style="color:green;font-weight: bolder;">是</span>|
|**float**|<span style="color:green;font-weight: bolder;">是</span>|
|**clear**|<span style="color:green;font-weight: bolder;">是</span>|
|**fontFamily**|<span style="color:red;font-weight: bolder;">否</span>|
|**fontWeight**|<span style="color:green;font-weight: bolder;">是</span>|
|**height**|<span style="color:red;font-weight: bolder;">否</span>|
|**fontSize**|<span style="color:green;font-weight: bolder;">是</span>|
|**lineHeight**|<span style="color:green;font-weight: bolder;">是</span>|
|**listStylePosition**|<span style="color:green;font-weight: bolder;">是</span>|
|**listStyleType**|<span style="color:green;font-weight: bolder;">是</span>|
|**margin**|<span style="color:red;font-weight: bolder;">否</span>|
|**maxHeight**|<span style="color:red;font-weight: bolder;">否</span>|
|**maxWidth**|<span style="color:green;font-weight: bolder;">是</span>|
|**minHeight**|<span style="color:green;font-weight: bolder;">是</span>|
|**minWidth**|<span style="color:green;font-weight: bolder;">是</span>|
|**objectFit**|<span style="color:green;font-weight: bolder;">是</span>|
|**objectPosition**|<span style="color:green;font-weight: bolder;">是</span>|
|**opacity**|<span style="color:green;font-weight: bolder;">是</span>|
|**outline**|<span style="color:green;font-weight: bolder;">是</span>|
|**overflow**|<span style="color:green;font-weight: bolder;">是</span>|
|**overscrollBehavior**|<span style="color:green;font-weight: bolder;">是</span>|
|**padding**|<span style="color:red;font-weight: bolder;">否</span>|
|**placeholderColor**|<span style="color:green;font-weight: bolder;">是</span>|
|**placeholderOpacity**|<span style="color:green;font-weight: bolder;">是</span>|
|**pointerEvents**|<span style="color:green;font-weight: bolder;">是</span>|
|**position**|<span style="color:green;font-weight: bolder;">是</span>|
|**inset**|<span style="color:red;font-weight: bolder;">否</span>|
|**resize**|<span style="color:green;font-weight: bolder;">是</span>|
|**boxShadow**|<span style="color:red;font-weight: bolder;">否</span>|
|**ringWidth**|<span style="color:red;font-weight: bolder;">否</span>|
|**ringOffsetColor**|<span style="color:red;font-weight: bolder;">否</span>|
|**ringOffsetWidth**|<span style="color:red;font-weight: bolder;">否</span>|
|**ringColor**|<span style="color:red;font-weight: bolder;">否</span>|
|**ringOpacity**|<span style="color:red;font-weight: bolder;">否</span>|
|**fill**|<span style="color:red;font-weight: bolder;">否</span>|
|**stroke**|<span style="color:red;font-weight: bolder;">否</span>|
|**strokeWidth**|<span style="color:red;font-weight: bolder;">否</span>|
|**tableLayout**|<span style="color:green;font-weight: bolder;">是</span>|
|**textAlign**|<span style="color:green;font-weight: bolder;">是</span>|
|**textColor**|<span style="color:green;font-weight: bolder;">是</span>|
|**textOpacity**|<span style="color:green;font-weight: bolder;">是</span>|
|**textOverflow**|<span style="color:green;font-weight: bolder;">是</span>|
|**fontStyle**|<span style="color:green;font-weight: bolder;">是</span>|
|**textTransform**|<span style="color:green;font-weight: bolder;">是</span>|
|**textDecoration**|<span style="color:green;font-weight: bolder;">是</span>|
|**fontSmoothing**|<span style="color:green;font-weight: bolder;">是</span>|
|**fontVariantNumeric**|<span style="color:green;font-weight: bolder;">是</span>|
|**letterSpacing**|<span style="color:green;font-weight: bolder;">是</span>|
|**userSelect**|<span style="color:green;font-weight: bolder;">是</span>|
|**verticalAlign**|<span style="color:green;font-weight: bolder;">是</span>|
|**visibility**|<span style="color:green;font-weight: bolder;">是</span>|
|**whitespace**|<span style="color:green;font-weight: bolder;">是</span>|
|**wordBreak**|<span style="color:green;font-weight: bolder;">是</span>|
|**width**|<span style="color:red;font-weight: bolder;">否</span>|
|**zIndex**|<span style="color:green;font-weight: bolder;">是</span>|
|**gap**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridAutoFlow**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridTemplateColumns**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridAutoColumns**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridColumn**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridColumnStart**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridColumnEnd**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridTemplateRows**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridAutoRows**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridRow**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridRowStart**|<span style="color:red;font-weight: bolder;">否</span>|
|**gridRowEnd**|<span style="color:red;font-weight: bolder;">否</span>|
|**transform**|<span style="color:green;font-weight: bolder;">是</span>|
|**transformOrigin**|<span style="color:green;font-weight: bolder;">是</span>|
|**scale**|<span style="color:green;font-weight: bolder;">是</span>|
|**rotate**|<span style="color:green;font-weight: bolder;">是</span>|
|**translate**|<span style="color:red;font-weight: bolder;">否</span>|
|**skew**|<span style="color:green;font-weight: bolder;">是</span>|
|**transitionProperty**|<span style="color:green;font-weight: bolder;">是</span>|
|**transitionTimingFunction**|<span style="color:green;font-weight: bolder;">是</span>|
|**transitionDuration**|<span style="color:green;font-weight: bolder;">是</span>|
|**transitionDelay**|<span style="color:green;font-weight: bolder;">是</span>|
|**animation**|<span style="color:green;font-weight: bolder;">是</span>|


