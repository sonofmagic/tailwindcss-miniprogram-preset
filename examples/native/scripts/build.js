const log = console.log
const fs = require('fs')

const chokidar = require('chokidar')
const internalPath = require('path')
const { handleScss, handleTs, copy } = require('./assets')

// purgecss

const suffixArray = [
  // 'wxss'
  'scss',
  // wxml 更改触发 css purge
  'wxml',
  'ts',
  'json',
  'wxs'
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
const watcher = chokidar.watch(`./src/**/*.${getHolder(suffixArray)}`, {
  // eslint-disable-next-line no-useless-escape
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true
})
const cwd = process.cwd()
const scssOptions = {
  dir: 'dist',
  cwd
}

function handleFile(path, isChange = false) {
  const extname = internalPath.extname(path)
  if (extname === '.scss') {
    handleScss(path, scssOptions)
  } else if (extname === '.ts') {
    handleTs(path, scssOptions.dir)
  } else if (isChange && extname === '.wxml') {
    const guessScssPath = path.replace('.wxml', '.scss')
    const exists = fs.existsSync(guessScssPath)
    if (exists) {
      handleScss(guessScssPath, scssOptions)
    }
    copy(path, scssOptions.dir)
  } else {
    // copy
    copy(path, scssOptions.dir)
  }
}

watcher
  .on('add', (path) => {
    log(`File ${path} has been added`)
    handleFile(path)
  })
  .on('change', (path) => {
    log(`File ${path} has been change`)
    handleFile(path, true)
  })
  .on('unlink', (path) => log(`File ${path} has been removed`))
  .on('error', (error) => log(`Watcher error: ${error}`))
  .on('ready', () => {
    log('Initial scan complete. Ready for changes')
  })
