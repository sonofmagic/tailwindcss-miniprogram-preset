const del = require('del')

;(async () => {
  const deletedFilePaths = await del([
    'miniprogram/**/*.js',
    'miniprogram/**/*.wxss'
  ])
  console.log(deletedFilePaths)
})()
