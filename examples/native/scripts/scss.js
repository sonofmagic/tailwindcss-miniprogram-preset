const postcss = require('postcss')
const sass = require('sass')
const Fiber = require('fibers')
const fs = require('fs')
const { plugins } = require('../postcss.config')

function handleScss(path) {
  sass.render(
    {
      file: path,
      fiber: Fiber
    },
    (err, result) => {
      if (err) {
        console.error(err)
      }
      const destPath = path.replace(/\.scss$/, '.wxss')
      postcss(plugins)
        .process(result.css, {
          from: path,
          to: destPath
        })
        .then((result) => {
          fs.writeFile(destPath, result.css, () => true)
          if (result.map) {
            fs.writeFile(destPath + '.map', result.map.toString(), () => true)
          }
        })
    }
  )
}

module.exports = handleScss
