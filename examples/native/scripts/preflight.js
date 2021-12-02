const fsp = require('fs').promises
const { removePrefix } = require('./assets/common')
const path = require('path')
async function mkdir(destDir) {
  await fsp.mkdir(destDir, {
    recursive: true
  })
  return true
}

function createDefaults() {
  return {
    cwd: process.cwd(),
    outdir: 'dist'
  }
}

function getDestFileStat(sourcePath, options = createDefaults()) {
  const { cwd, outdir } = options
  const destPath = path.resolve(cwd, outdir, removePrefix(sourcePath))
  const destDir = path.dirname(destPath)
  return {
    path: destPath,
    dir: destDir
  }
}

async function preflight(sourcePath) {
  const { dir } = getDestFileStat(sourcePath)
  return await mkdir(dir)
}

module.exports = {
  mkdir,
  getDestFileStat,
  preflight
}
