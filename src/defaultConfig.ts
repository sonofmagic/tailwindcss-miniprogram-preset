// this is a deep clone object

import deepCloneConfig from 'tailwindcss/defaultConfig'
import { createRem2rpx } from './rem2rpx'
import type {
  IPresetOption,
  TransformFunc,
  ConfigValue,
  ConfigArray
} from './types'
import type {
  TailwindThemeValue,
  TailwindTheme,
  TailwindThemeFontSizes
} from 'tailwindcss/tailwind-config'
import { defaultOptions } from './constant'

export function ObjectValueMap<T = TailwindThemeValue> (
  obj: T,
  fn: TransformFunc
) {
  return Object.entries(obj).reduce<T>((acc, [key, value], idx) => {
    // @ts-ignore
    acc[key] = fn(value as string, idx)
    return acc
  }, {} as T)
}

export function createExpandThemeConfig (option?: IPresetOption): TailwindTheme {
  const opts = Object.assign({}, defaultOptions, option)
  if (opts.rem2rpx) {
    const rem2rpx = createRem2rpx(opts)
    const replacer = (value: ConfigValue) => {
      return rem2rpx(value as string)
    }
    return {
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
      maxWidth: {
        none: 'none',
        0: '0',
        full: '100%',
        min: 'min-content',
        max: 'max-content'
      }
    }
  } else {
    return {
      // spacing
      spacing: deepCloneConfig.theme.spacing,
      // borderRadius
      borderRadius: deepCloneConfig.theme.borderRadius,
      // fontSize // xs: ['0.75rem', { lineHeight: '1rem' }],
      fontSize: deepCloneConfig.theme.fontSize,
      // lineHeight
      lineHeight: deepCloneConfig.theme.lineHeight,
      // maxWidth
      maxWidth: {
        none: 'none',
        0: '0',
        full: '100%',
        min: 'min-content',
        max: 'max-content'
      }
    }
  }
}

export const expandThemeConfig = createExpandThemeConfig()
