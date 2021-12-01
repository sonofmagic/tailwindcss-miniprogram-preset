const postcss = require('postcss')
const sass = require('sass')
// const Fiber = require('fibers')
const fs = require('fs')
const path = require('path')

const { plugins } = require('../../postcss.config')
const { removePrefix } = require('./common')

function handleScss(sourcePath, { cwd, dir }) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: sourcePath
        // fiber: Fiber
      },
      (err, result) => {
        if (err) {
          console.error(err)
        }
        const destPath = path.resolve(
          cwd,
          dir,
          removePrefix(sourcePath).replace(/\.scss$/, '.wxss')
        ) // sourcePath.replace(/\.scss$/, '.wxss')
        const destDir = path.dirname(destPath)
        fs.mkdir(
          destDir,
          {
            recursive: true
          },
          (_err, res) => {
            // console.log(err, res)
            postcss(plugins)
              .process(result.css, {
                from: sourcePath,
                to: destPath
              })
              .then((result) => {
                fs.writeFile(destPath, result.css, () => true)
                if (result.map) {
                  fs.writeFile(
                    destPath + '.map',
                    result.map.toString(),
                    () => true
                  )
                }
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          }
        )
      }
    )
  })
}

module.exports = handleScss
