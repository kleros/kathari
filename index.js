#!/usr/bin/env node

process.on('unhandledRejection', err => {
  throw err
})

const spawn = require('cross-spawn')
const runCommitizen = require('commitizen/dist/cli/git-cz').bootstrap

const { resolveInDir, resolveBin } = require('./resolve-utils')

const CLICargs = process.argv.slice(3)
const runCommand = (command, args, { resolveCommand = true } = {}) => {
  const result = spawn.sync(
    resolveCommand ? resolveBin(command) : command,
    args ? args.concat(CLICargs) : CLICargs,
    {
      stdio: 'inherit'
    }
  )

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'Failed because the process exited too early. This probably means the system ran out of memory or someone called `kill -9` on the process.'
      )
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'Failed because the process exited too early. Someone might have called `kill` or `killall`, or the system could be shutting down.'
      )
    }
    process.exit(1)
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
  case 'lint':
    runCommand('eslint', [
      '--config',
      resolveInDir('./.eslintrc.js'),
      './*.js',
      './{src,.storybook,stories,demo/src,mocks,tests}/**/*.js'
    ])
    runCommand('stylelint', [
      '--config',
      resolveInDir('./.stylelintrc.js'),
      './{src,demo/src}/**/*.scss'
    ])
    break
  case 'commitmsg':
    runCommand('commitlint', [
      '--config',
      resolveInDir('./.commitlintrc.js'),
      '--edit',
      '$GIT_PARAMS'
    ])
    break
  case 'precommit':
    runCommand('lint-staged', ['--config', resolveInDir('./.lintstagedrc.js')])
    runCommand('yarn', ['run', 'lint'], { resolveCommand: false })
    runCommand('yarn', ['test'], { resolveCommand: false })
    break
  case 'cz':
    process.argv = []
    runCommitizen({
      cliPath: './node_modules/commitizen',
      config: { path: './node_modules/@commitlint/prompt' }
    })
    break
  default:
    console.log('Unknown script "' + scriptName + '".')
    process.exit(1)
}
