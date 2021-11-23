// this is a deep clone object

import deepCloneConfig from 'tailwindcss/defaultConfig'
import { rem2rpx } from './rem2rpx'
import type {
  TailwindThemeValue,
  TailwindTheme,
  TailwindThemeFontSizes
} from 'tailwindcss/tailwind-config'
type ConfigArray = [
  string,
  {
    lineHeight: string
    [key: string]: string
  }
]
type ConfigValue = string | ConfigArray

// type Config = Record<string, ConfigValue>

type TransformFunc = (value: ConfigValue, ...args: any[]) => ConfigValue
function ObjectValueMap<T = TailwindThemeValue>(
  obj: T,
  fn: TransformFunc
) {
  return Object.entries(obj).reduce<T>((acc, [key, value], idx) => {
    // @ts-ignore
    acc[key] = fn(value as string, idx)
    return acc
  }, {} as T)
}

const replacer = (value: ConfigValue) => {
  return rem2rpx(value as string)
}

export const expandThemeConfig: TailwindTheme = {
  // spacing
  spacing: ObjectValueMap(deepCloneConfig.theme.spacing, replacer),
  // borderRadius
  borderRadius: ObjectValueMap(deepCloneConfig.theme.borderRadius, replacer),
  // fontSize // xs: ['0.75rem', { lineHeight: '1rem' }],
  fontSize: ObjectValueMap<TailwindThemeFontSizes>(
    deepCloneConfig.theme.fontSize,
    (value) => {
      const [fontSize, { lineHeight }] = value as ConfigArray
      return [rem2rpx(fontSize), { lineHeight: rem2rpx(lineHeight) }]
    }
  ),
  // lineHeight
  lineHeight: ObjectValueMap(deepCloneConfig.theme.lineHeight, replacer),
  // maxWidth
  maxWidth: ObjectValueMap(
    {
      none: 'none',
      0: '0',
      full: '100%',
      min: 'min-content',
      max: 'max-content'
    },
    replacer
  )
}
