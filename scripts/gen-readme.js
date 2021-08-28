const fs = require('fs')
const path = require('path')
const allCorePlugins = require('./allCorePlugins')
const selectedCorePlugins = require('../src/corePlugins')
const resolve = (p) => {
  return path.resolve(__dirname, p)
}
const mdTemplate = fs.readFileSync(resolve('./template.md'), {
  encoding: 'utf-8'
})
const pluginsTableHeader = '|插件|是否启用|\n|---|---|\n'

const createSpan = (enable) => {
  return `<span style="color:${enable ? 'green' : 'red'};font-weight: bolder;">${enable ? '是' : '否'}</span>`
}
const pluginsTable = allCorePlugins.reduce((acc, cur) => {
  const enableFlag = selectedCorePlugins.includes(cur)
  acc += '|**' + cur + '**|' + createSpan(enableFlag) + '|\n'
  return acc
}, pluginsTableHeader)

fs.writeFileSync(resolve('../README.md'), mdTemplate.replace('{{id:corePlugins}}', pluginsTable))
// ; (async () => {

// })()
