const esbuild = require('esbuild')
const path = require('path')

async function handleEsbuild(entryPoint) {
  const outdir = path.dirname(entryPoint)
  const res = await esbuild.build({
    entryPoints: [entryPoint],
    // entryNames: [],
    bundle: false,
    watch: false,
    absWorkingDir: process.cwd(),
    outdir,
    tsconfig: './tsconfig.json',
    target: ['es2015']
  })
  return res
}

module.exports = handleEsbuild
