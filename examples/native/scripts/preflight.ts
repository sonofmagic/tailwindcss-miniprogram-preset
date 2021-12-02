import { promises as fsp } from 'fs'
import { removePrefix } from './common'
import { resolve, dirname } from 'path'

export async function mkdir(outdir: string) {
  await fsp.mkdir(outdir, {
    recursive: true
  })
  return true
}

export function createDefaults() {
  return {
    cwd: process.cwd(),
    outdir: 'dist'
  }
}

export function getDestFileStat(
  entryPoint: string,
  options = createDefaults()
) {
  const { cwd, outdir } = options
  const destPath = resolve(cwd, outdir, removePrefix(entryPoint))
  const destDir = dirname(destPath)
  return {
    path: destPath,
    dir: destDir
  }
}

export async function preflight(entryPoint: string) {
  const { dir } = getDestFileStat(entryPoint)
  return await mkdir(dir)
}
