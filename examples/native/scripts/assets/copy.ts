import { promises as fsp } from 'fs'
import { join } from 'path'
import { removePrefix } from '../common'

export async function copy(src: string, dir: string) {
  const dest = join(dir, removePrefix(src))
  await fsp.copyFile(src, dest)
}
