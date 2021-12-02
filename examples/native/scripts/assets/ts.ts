import * as esbuild from 'esbuild'
import path from 'path'
import { removePrefix } from '../common'

export async function handleTs(entryPoint: string, dir: string) {
  const outfile = path.join(
    dir,
    removePrefix(entryPoint).replace(/\.ts$/, '.js')
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
