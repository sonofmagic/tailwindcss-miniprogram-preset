const fsp = require('fs').promises
const path = require('path')
const { removePrefix } = require('./common')
async function copy(src, dir) {
  const dest = path.join(dir, removePrefix(src))
  await fsp.copyFile(src, dest)
}

module.exports = copy
