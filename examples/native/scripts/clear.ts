import del from 'del'
;(async () => {
  const deletedFilePaths = await del(['dist'])
  console.log(deletedFilePaths)
})()
