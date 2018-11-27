const { resolve } = require('path')

const { resolveBin } = require('./resolve-utils')

module.exports = {
  '*{rc,.md,.js{on,}}': [
    resolveBin('prettier') +
      ' --config ' +
      resolve(__dirname, './.prettierrc.js') +
      ' --write',
    'git add'
  ]
}
