const del = require('del')

;(async () => {
  const deletedFilePaths = await del([
    'miniprogram/**/*.js',
    'miniprogram/**/*.wxss',
    'dist'
  ])
  console.log(deletedFilePaths)
})()
