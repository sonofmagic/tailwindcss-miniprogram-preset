# tailwindcss-miniprogram-preset

> tailwindcss 小程序版本预设  
> tailwindcss-preset for miniprogram

## How to use it

```js
// tailwind.config.js
module.exports = {
  presets: [require('tailwindcss-miniprogram-preset')]
  // ...
}
```

```scss
<style lang="scss">
// uni-app App.vue 公共部分
// 小程序不需要 'base' 'components'
// @import 'tailwindcss/base';
// @import 'tailwindcss/components';
// 只需引入工具类
@import "tailwindcss/utilities";
/*每个页面公共css */
</style>

```

## 最佳实践

建议配合 vscode 插件 [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 使用

可以根据配置自动生成智能提示,可有效提升开发体验

## 默认配置

> 默认配置都可通过 preset merge 策略开启

- `darkMode` 默认 `false`
- `theme.screens` 默认 `false` , 不需要 pc 那种自适应
- `important` 默认 `true` , 需要用它去覆盖原生样式
- `purge.enabled` 默认 `true` , 避免打包出来的 wxss 过大，影响上传
- 一些 `class` 的 `rename` 见下表

## 定制化兼容小程序的牺牲

### 小程序的 class 不支持大量特殊符号

解决方案: 做 class rename 处理

| form | to      | sample             |
| ---- | ------- | ------------------ |
| '\/' | '-div-' | w-1/4 -> w-1-div-4 |
| '\.' | '-dot-' | w-1.5 -> w-1-dot-5 |

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

## corePlugins 启用状况

|插件|是否启用|
|---|---|
|**preflight**|<font color="red">否</font>|
|**container**|<font color="red">否</font>|
|**space**|<font color="red">否</font>|
|**divideWidth**|<font color="red">否</font>|
|**divideColor**|<font color="red">否</font>|
|**divideStyle**|<font color="red">否</font>|
|**divideOpacity**|<font color="red">否</font>|
|**accessibility**|<font color="red">否</font>|
|**appearance**|<font color="green">是</font>|
|**backgroundAttachment**|<font color="green">是</font>|
|**backgroundClip**|<font color="green">是</font>|
|**backgroundColor**|<font color="green">是</font>|
|**backgroundImage**|<font color="green">是</font>|
|**gradientColorStops**|<font color="green">是</font>|
|**backgroundOpacity**|<font color="green">是</font>|
|**backgroundPosition**|<font color="green">是</font>|
|**backgroundRepeat**|<font color="green">是</font>|
|**backgroundSize**|<font color="green">是</font>|
|**borderCollapse**|<font color="green">是</font>|
|**borderColor**|<font color="green">是</font>|
|**borderOpacity**|<font color="green">是</font>|
|**borderRadius**|<font color="green">是</font>|
|**borderStyle**|<font color="green">是</font>|
|**borderWidth**|<font color="green">是</font>|
|**boxSizing**|<font color="green">是</font>|
|**cursor**|<font color="green">是</font>|
|**display**|<font color="green">是</font>|
|**flexDirection**|<font color="green">是</font>|
|**flexWrap**|<font color="green">是</font>|
|**placeItems**|<font color="red">否</font>|
|**placeContent**|<font color="red">否</font>|
|**placeSelf**|<font color="red">否</font>|
|**alignItems**|<font color="green">是</font>|
|**alignContent**|<font color="green">是</font>|
|**alignSelf**|<font color="green">是</font>|
|**justifyItems**|<font color="green">是</font>|
|**justifyContent**|<font color="green">是</font>|
|**justifySelf**|<font color="green">是</font>|
|**flex**|<font color="green">是</font>|
|**flexGrow**|<font color="green">是</font>|
|**flexShrink**|<font color="green">是</font>|
|**order**|<font color="green">是</font>|
|**float**|<font color="green">是</font>|
|**clear**|<font color="green">是</font>|
|**fontFamily**|<font color="red">否</font>|
|**fontWeight**|<font color="green">是</font>|
|**height**|<font color="red">否</font>|
|**fontSize**|<font color="green">是</font>|
|**lineHeight**|<font color="green">是</font>|
|**listStylePosition**|<font color="green">是</font>|
|**listStyleType**|<font color="green">是</font>|
|**margin**|<font color="red">否</font>|
|**maxHeight**|<font color="red">否</font>|
|**maxWidth**|<font color="green">是</font>|
|**minHeight**|<font color="green">是</font>|
|**minWidth**|<font color="green">是</font>|
|**objectFit**|<font color="green">是</font>|
|**objectPosition**|<font color="green">是</font>|
|**opacity**|<font color="green">是</font>|
|**outline**|<font color="green">是</font>|
|**overflow**|<font color="green">是</font>|
|**overscrollBehavior**|<font color="green">是</font>|
|**padding**|<font color="red">否</font>|
|**placeholderColor**|<font color="green">是</font>|
|**placeholderOpacity**|<font color="green">是</font>|
|**pointerEvents**|<font color="green">是</font>|
|**position**|<font color="green">是</font>|
|**inset**|<font color="red">否</font>|
|**resize**|<font color="green">是</font>|
|**boxShadow**|<font color="red">否</font>|
|**ringWidth**|<font color="red">否</font>|
|**ringOffsetColor**|<font color="red">否</font>|
|**ringOffsetWidth**|<font color="red">否</font>|
|**ringColor**|<font color="red">否</font>|
|**ringOpacity**|<font color="red">否</font>|
|**fill**|<font color="red">否</font>|
|**stroke**|<font color="red">否</font>|
|**strokeWidth**|<font color="red">否</font>|
|**tableLayout**|<font color="green">是</font>|
|**textAlign**|<font color="green">是</font>|
|**textColor**|<font color="green">是</font>|
|**textOpacity**|<font color="green">是</font>|
|**textOverflow**|<font color="green">是</font>|
|**fontStyle**|<font color="green">是</font>|
|**textTransform**|<font color="green">是</font>|
|**textDecoration**|<font color="green">是</font>|
|**fontSmoothing**|<font color="green">是</font>|
|**fontVariantNumeric**|<font color="green">是</font>|
|**letterSpacing**|<font color="green">是</font>|
|**userSelect**|<font color="green">是</font>|
|**verticalAlign**|<font color="green">是</font>|
|**visibility**|<font color="green">是</font>|
|**whitespace**|<font color="green">是</font>|
|**wordBreak**|<font color="green">是</font>|
|**width**|<font color="red">否</font>|
|**zIndex**|<font color="green">是</font>|
|**gap**|<font color="red">否</font>|
|**gridAutoFlow**|<font color="red">否</font>|
|**gridTemplateColumns**|<font color="red">否</font>|
|**gridAutoColumns**|<font color="red">否</font>|
|**gridColumn**|<font color="red">否</font>|
|**gridColumnStart**|<font color="red">否</font>|
|**gridColumnEnd**|<font color="red">否</font>|
|**gridTemplateRows**|<font color="red">否</font>|
|**gridAutoRows**|<font color="red">否</font>|
|**gridRow**|<font color="red">否</font>|
|**gridRowStart**|<font color="red">否</font>|
|**gridRowEnd**|<font color="red">否</font>|
|**transform**|<font color="green">是</font>|
|**transformOrigin**|<font color="green">是</font>|
|**scale**|<font color="green">是</font>|
|**rotate**|<font color="green">是</font>|
|**translate**|<font color="red">否</font>|
|**skew**|<font color="green">是</font>|
|**transitionProperty**|<font color="green">是</font>|
|**transitionTimingFunction**|<font color="green">是</font>|
|**transitionDuration**|<font color="green">是</font>|
|**transitionDelay**|<font color="green">是</font>|
|**animation**|<font color="green">是</font>|

