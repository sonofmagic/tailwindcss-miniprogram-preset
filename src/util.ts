
const escapeMap = {
  '/': '-div-',
  '.': '-dot-'
}
/**
 * 转义工作
 */
export function escape (str: string) {
  return Object.entries(escapeMap).reduce((acc, [key, value]) => {
    return acc.replace(key, value)
  }, str)
}
