const log = console.log
const fs = require('fs')

const chokidar = require('chokidar')
const internalPath = require('path')
const { handleScss, handleTs } = require('./assets')

// purgecss

const suffixArray = [
  // 'wxss'
  'scss',
  // wxml 更改触发 css purge
  'wxml',
  'ts'
  // 'less'
]

/**
 *
 * @param {Array} arr
 * @returns {string}
 */
function getHolder(arr) {
  if (arr.length === 1) {
    return arr[0]
  } else if (arr.length > 1) {
    return `{${arr.join(',')}}`
  }
  return ''
}
const watcher = chokidar.watch(`./miniprogram/**/*.${getHolder(suffixArray)}`, {
  // eslint-disable-next-line no-useless-escape
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
})

watcher
  .on('add', (path) => {
    log(`File ${path} has been added`)
    const extname = internalPath.extname(path)
    if (extname === '.scss') {
      handleScss(path)
    } else if (extname === '.ts') {
      handleTs(path)
    }
  })
  .on('change', (path) => {
    log(`File ${path} has been change`)
    const extname = internalPath.extname(path)
    if (extname === '.scss') {
      handleScss(path)
    } else if (extname === '.ts') {
      handleTs(path)
    } else if (extname === '.wxml') {
      const guessScssPath = path.replace('.wxml', '.scss')
      const exists = fs.existsSync(guessScssPath)
      if (exists) {
        handleScss(guessScssPath)
      }
    }
  })
  .on('unlink', (path) => log(`File ${path} has been removed`))
  .on('error', (error) => log(`Watcher error: ${error}`))
  .on('ready', () => {
    log('Initial scan complete. Ready for changes')
  })
