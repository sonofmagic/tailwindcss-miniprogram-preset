import {
  // createRemReplace,
  // defaultOptions,
  rem2rpx
  // remReplace,
  // remUnitRegex,
  // toFixed
} from '@/rem2rpx'

describe('[rem2rpx]', () => {
  test('rem2rpx', () => {
    expect(rem2rpx('padding-bottom: 1px !important')).toBe(
      'padding-bottom: 1px !important'
    )
    expect(rem2rpx('margin-top: 1rem !important')).toBe(
      '32rpx'
    )
    expect(rem2rpx('margin-top: 1     rem;')).toBe(
      '32rpx'
    )
  })
})
