export interface IPresetOption {
  /**
   * @default '1rem=32rpx'
   */
  rootValue: number
  /**
   * @default 5(Number)
   */
  unitPrecision: number
  /**
   * 'Set the minimum pixel value to replace'
   * @default 2(Number)
   */
  minRemValue: number
  /**
   * default open rem -> rpx setting
   * @default true
   */
  rem2rpx: boolean
}

export type ConfigArray = [
  string,
  {
    lineHeight: string
    [key: string]: string
  }
]
export type ConfigValue = string | ConfigArray

// type Config = Record<string, ConfigValue>

export type TransformFunc = (value: ConfigValue, ...args: any[]) => ConfigValue
