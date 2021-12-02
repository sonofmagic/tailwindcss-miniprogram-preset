import postcss from 'postcss'
import sass from 'sass'
import fs from 'fs'
import path from 'path'
import { plugins } from '../../postcss.config'
import { removePrefix } from '../common'

export function handleScss(
  sourcePath: string,
  { cwd, dir }: { cwd: string; dir: string }
) {
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
        )
        postcss(plugins)
          .process(result.css, {
            from: sourcePath,
            to: destPath
          })
          .then((result) => {
            fs.writeFile(destPath, result.css, () => true)
            if (result.map) {
              fs.writeFile(destPath + '.map', result.map.toString(), () => true)
            }
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      }
    )
  })
}
