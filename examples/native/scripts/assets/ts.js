const esbuild = require('esbuild')
const path = require('path')

async function handleEsbuild(entryPoint, dir) {
  const outfile = path.join(
    dir,
    entryPoint.replace(/miniprogram[\\/]/, '').replace(/\.ts$/, '.js')
  )

  // const entrydir = path.dirname(entryPoint)
  // const outdir = path.resolve(entrydir, '..', dir) // sourcePath.replace(/\.scss$/, '.wxss')
  const res = await esbuild.build({
    entryPoints: [entryPoint],
    outfile,
    // entryNames: [],
    bundle: false,
    watch: false,
    absWorkingDir: process.cwd(),
    // outdir,
    tsconfig: './tsconfig.json',
    target: ['es2015']
  })
  return res
}

module.exports = handleEsbuild
