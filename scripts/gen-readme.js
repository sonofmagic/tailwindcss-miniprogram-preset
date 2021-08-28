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

const pluginsTable = allCorePlugins.reduce((acc, cur) => {
  const enableFlag = selectedCorePlugins.includes(cur)
  acc += '|**' + cur + '**|' + `${enableFlag ? '<font color="green">是</font>' : '<font color="red">否</font>'}` + '|\n'
  return acc
}, pluginsTableHeader)

fs.writeFileSync(resolve('../README.md'), mdTemplate.replace('{{id:corePlugins}}', pluginsTable))
// ; (async () => {

// })()
