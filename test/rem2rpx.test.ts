import {
  // createRemReplace,
  // defaultOptions,
  rem2rpx
  // createRem2rpx
  // remReplace,
  // remUnitRegex,
  // toFixed
} from '@/rem2rpx'
import { ObjectValueMap } from '@/defaultConfig'
import type { ConfigValue } from '@/defaultConfig'

describe('[rem2rpx]', () => {
  test('rem2rpx', () => {
    expect(rem2rpx('padding-bottom: 1px !important')).toBe(
      'padding-bottom: 1px !important'
    )
    expect(rem2rpx('margin-top: 1rem !important')).toBe('32rpx')
    expect(rem2rpx('margin-top: 1     rem;')).toBe('32rpx')
  })

  test('create rem2rpx with default option', () => {
    const replacer = (value: ConfigValue) => {
      return rem2rpx(value as string)
    }

    const styleObj = {
      none: 'none',
      0: '0',
      full: '100%',
      min: 'min-content',
      max: 'max-content'
    }

    expect(ObjectValueMap(styleObj, replacer)).toEqual(styleObj)
  })
})
