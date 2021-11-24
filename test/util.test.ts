import { escape } from '@/util'
describe('[util] test', () => {
  test('escape test ', () => {
    expect(escape('w-1.5')).toBe('w-1-dot-5')
    expect(escape('pb-3.5')).toBe('pb-3-dot-5')
    expect(escape('w-1/2')).toBe('w-1-div-2')
  })
})
