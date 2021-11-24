import config from '@/config'

describe('[Config]', () => {
  test('default config', () => {
    expect(config.important).toBe(true)
  })
})
