import type { IPresetOption } from './config'

export const remUnitRegex = /(\d*\.?\d+) *rem/g

export const defaultOptions = {
  rootValue: 32,
  unitPrecision: 5,
  minPixelValue: 0
}

export function toFixed (number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

export function createRemReplace (
  rootValue: number,
  unitPrecision: number,
  minPixelValue: number
) {
  return (m: string, $1?: string) => {
    if (!$1) return m
    const rem = parseFloat($1)
    if (rem < minPixelValue) return m
    const fixedVal = toFixed(rem * rootValue, unitPrecision)
    return fixedVal === 0 ? '0' : fixedVal + 'rpx'
  }
}

export function createRem2rpx (option: IPresetOption) {
  const remReplace = createRemReplace(
    option.rootValue,
    option.unitPrecision,
    option.minPixelValue
  )
  return (str: string) => {
    const execArr = /(\d*\.?\d+) *rem/g.exec(str)
    return execArr ? remReplace(str, execArr[1]) : str
  }
}
export const rem2rpx = createRem2rpx(defaultOptions)
