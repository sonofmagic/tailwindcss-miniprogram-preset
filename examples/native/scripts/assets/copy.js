const fsp = require('fs').promises
const path = require('path')

async function copy(src, dir) {
  const dest = path.join(dir, src.replace(/miniprogram[\\/]/, ''))
  await fsp.copyFile(src, dest)
}

module.exports = copy
