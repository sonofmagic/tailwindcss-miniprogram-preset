const log = console.log
const fs = require('fs')
/**
 * @type {import('postcss').Postcss}
 */
const postcss = require('postcss')
const chokidar = require('chokidar')
const sass = require('sass')
const Fiber = require('fibers')
// ${suffixArray.join(',')}
const suffixArray = [
  // 'wxss'
  'scss'
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

function handle (path) {
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
    handle(path)
  })
  .on('change', (path, stats) => {
    log(`File ${path} has been change`)
    handle(path)
  })
  .on('unlink', path => log(`File ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => {
    log('Initial scan complete. Ready for changes')
  })

// .on('addDir', path => log(`Directory ${path} has been added`))
// .on('unlinkDir', path => log(`Directory ${path} has been removed`))
// .on('raw', (event, path, details) => { // internal
//   log('Raw event info:', event, path, details)
// })
