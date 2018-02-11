const { resolve } = require('path')

module.exports = {
  '*{rc,.md,.js{on,}}': [
    'prettier --config ' + resolve(__dirname, './.prettierrc.js') + ' --write',
    'git add'
  ]
}
