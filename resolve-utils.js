const { resolve, join } = require('path')

const resolveInDir = filePath => resolve(__dirname, filePath)
const resolveModule = filePath => resolveInDir(join('./node_modules', filePath))
const resolveBin = filePath => resolveModule(join('./.bin', filePath))

module.exports = { resolveInDir, resolveModule, resolveBin }
