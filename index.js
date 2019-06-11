#!/usr/bin/env node
process.on('unhandledRejection', err => {
  throw err
})
const runCommitizen = require('commitizen/dist/cli/git-cz').bootstrap
const spawn = require('cross-spawn')

const { resolveBin, resolveInDir } = require('./resolve-utils')

const flag = process.argv[3]
const CLICargs = process.argv.slice(flag === '--no-root' ? 4 : 3)
const runCommand = (command, args, { resolveCommand = true } = {}) => {
  const result = spawn.sync(
    resolveCommand ? resolveBin(command) : command,
    args ? args.concat(CLICargs) : CLICargs,
    {
      stdio: 'inherit'
    }
  )
  if (result.signal || result.status) {
    if (result.signal === 'SIGKILL')
      console.log(
        'Failed because the process exited too early. This probably means the system ran out of memory or someone called `kill -9` on the process.'
      )
    else if (result.signal === 'SIGTERM')
      console.log(
        'Failed because the process exited too early. Someone might have called `kill` or `killall`, or the system could be shutting down.'
      )
    throw new Error(1)
  }
}
const scriptName = process.argv[2]
switch (scriptName) {
  case 'prettify':
    runCommand('prettier', [
      '--config',
      resolveInDir('./.prettierrc.js'),
      '--write',
      './*{rc,.md,.js{on,}}',
      './{src,.storybook,stories,demo/src,mocks,tests}/**/*.js{on,}'
    ])
    break
  case 'lint:sol':
    runCommand('solium', [
      '--no-soliumignore',
      '--config',
      resolveInDir('./.soliumrc.js'),
      '--dir',
      './contracts'
    ])
    break
  case 'lint:scss':
    runCommand('stylelint', [
      '--config',
      resolveInDir('./.scss.stylelintrc.js'),
      './{src,demo/src}/**/*.scss'
    ])
    break
  case 'lint:styled':
    runCommand('stylelint', [
      '--config',
      resolveInDir('./.styled.stylelintrc.js'),
      './{src,demo/src}/**/*.js'
    ])
    break
  case 'lint:js':
    runCommand(
      'eslint',
      [
        '--config',
        resolveInDir('./.eslintrc.js'),
        flag !== '--no-root' && './*.js',
        './{src,.storybook,stories,demo/src,mocks,tests,test}/**/*.js'
      ].filter(s => s)
    )
    break
  case 'commitmsg':
    runCommand('commitlint', [
      '--config',
      resolveInDir('./.commitlintrc.js'),
      '--env',
      'HUSKY_GIT_PARAMS'
    ])
    break
  case 'precommit':
    runCommand('lint-staged', ['--config', resolveInDir('./.lintstagedrc.js')])
    runCommand('git', ['stash', '--keep-index', '--include-untracked'], {
      resolveCommand: false
    })
    try {
      runCommand('yarn', ['run', 'lint'], { resolveCommand: false })
    } finally {
      runCommand('git', ['stash', 'pop'], { resolveCommand: false })
    }
    runCommand('yarn', ['test:truffle'], { resolveCommand: false })
    break
  case 'cz':
    process.argv = []
    runCommitizen({
      cliPath: './node_modules/commitizen',
      config: { path: './node_modules/@commitlint/prompt' }
    })
    break
  default:
    console.log(`Unknown script "${scriptName}".`)
    process.exit(1)
}
