const log = console.log
const fs = require('fs')
/**
 * @type {import('postcss').Postcss}
 */
const postcss = require('postcss')
const chokidar = require('chokidar')
const sass = require('sass')
const Fiber = require('fibers')
const internalPath = require('path')
// purgecss

const suffixArray = [
  // 'wxss'
  'scss',
  // wxml 更改触发 css purge
  'wxml'
  // 'less'
]

/**
 *
 * @param {Array} arr
 * @returns {string}
 */
function getHolder (arr) {
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
const { plugins } = require('../postcss.config')

function handleScss (path) {
  sass.render({
    file: path,
    fiber: Fiber
  }, (err, result) => {
    if (err) {
      console.log(err)
    }
    const destPath = path.replace('.scss', '.wxss')
    postcss(plugins).process(result.css, {
      from: path,
      to: destPath
    }).then(result => {
      fs.writeFile(destPath, result.css, () => true)
      if (result.map) {
        fs.writeFile(destPath + '.map', result.map.toString(), () => true)
      }
    })
  })
}

watcher
  .on('add', path => {
    log(`File ${path} has been added`)
    const extname = internalPath.extname(path)
    if (extname === '.scss') { handleScss(path) }
  })
  .on('change', (path) => {
    log(`File ${path} has been change`)
    const extname = internalPath.extname(path)
    if (extname === '.scss') { handleScss(path) } else if (extname === '.wxml') {
      const guessScssPath = path.replace('.wxml', '.scss')
      const exists = fs.existsSync(guessScssPath)
      if (exists) {
        handleScss(guessScssPath)
      }
    }
  })
  .on('unlink', path => log(`File ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => {
    log('Initial scan complete. Ready for changes')
  })
