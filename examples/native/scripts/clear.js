const del = require('del')

;(async () => {
  const deletedFilePaths = await del(['dist'])
  console.log(deletedFilePaths)
})()
