import * as fs from 'fs'
import path from 'path'
import allCorePlugins from './allCorePlugins'
import selectedCorePlugins from '../src/corePlugins'

const resolve = (p: string) => {
  return path.resolve(__dirname, p)
}
const mdTemplate = fs.readFileSync(resolve('./template.md'), {
  encoding: 'utf-8'
})
const pluginsTableHeader = '|插件|是否启用|\n|---|---|\n'

const createSpan = (enable: boolean) => {
  return `<span style="color:${
    enable ? 'green' : 'red'
  };font-weight: bolder;">${enable ? '是' : '否'}</span>`
}
const pluginsTable = allCorePlugins.reduce((acc, cur) => {
  const enableFlag = selectedCorePlugins.includes(cur)
  acc += '|**' + cur + '**|' + createSpan(enableFlag) + '|\n'
  return acc
}, pluginsTableHeader)

fs.writeFileSync(
  resolve('../CorePlugins.md'),
  mdTemplate.replace('{{id:corePlugins}}', pluginsTable)
)
// ; (async () => {

// })()
