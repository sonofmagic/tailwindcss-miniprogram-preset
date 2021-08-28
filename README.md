# tailwindcss-miniprogram-preset

tailwindcss-preset for miniprogram

tailwindcss 小程序版本预设

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
- `theme.screens` 默认 `false` , 不需要pc那种自适应
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

### 小程序wxss只支持少量选择器

[官方文档链接](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html)

解决方案:

- 去除基于 `:not` 选择器的 `corePlugins`
- 去除不支持 `*` 选择器的 `corePlugins` , 例如默认添加 `'*, ::before, ::after'` 的插件
- 清空 variants (`hover:` `focus:` 这些)
- 不启用 `mode: 'jit'` 即时编译模式，因为 `wxml` 里写 `w-[762px]` ,`[` 和 `]`,会被默认转义为空格，导致即时编译无效。

### 去除自适应和无用插件

解决方案:

- 只使用 `utilities` , 不导入 `base` 和 `components`


