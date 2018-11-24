const { join, resolve } = require('path')

const resolveInDir = filePath => resolve(__dirname, filePath)
const resolveBin = filePath =>
  resolveInDir(join('./node_modules/.bin', filePath))
module.exports = { resolveBin, resolveInDir }
