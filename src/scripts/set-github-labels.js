#!/usr/bin/env node
const fetch = require('isomorphic-fetch')

// Helper
const githubAPICaller = (path, { method = 'GET', body } = {}) =>
  fetch(`https://api.github.com${encodeURI(path)}`, {
    method,
    headers: {
      Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
    },
    body: body && JSON.stringify(body)
  }).then(res => (method === 'DELETE' ? res : res.json()))

// Run
const run = async () => {
  // Loop over repos
  for (const repo of (await githubAPICaller('/orgs/kleros/repos')).map(
    r => r.name
  )) {
    // Delete all of the repo's labels
    for (const label of (await githubAPICaller(
      `/repos/kleros/${repo}/labels`
    )).map(l => l.name))
      await githubAPICaller(`/repos/kleros/${repo}/labels/${label}`, {
        method: 'DELETE'
      })

    // Set new labels for repo
    for (const newLabel of [
      {
        name: 'duplicate :two:',
        color: 'ededed',
        description: 'Is a duplicate.'
      },
      {
        name: 'starter :baby_bottle:',
        color: 'ffc0cb',
        description: 'Good for new contributors.'
      },
      {
        name: 'Priority: Critical :fire:',
        color: 'ee0701',
        description: 'Mission critical.'
      },
      {
        name: 'Priority: High',
        color: 'd93f0b',
        description: 'Top of to-do list.'
      },
      {
        name: 'Priority: Low',
        color: '0e8a16',
        description: 'Bottom of to-do list.'
      },
      {
        name: 'Priority: Medium',
        color: 'fbca04',
        description: 'Somewhere in the middle of to-do list.'
      },
      {
        name: 'Status: Abandoned',
        color: '000000',
        description: 'The assigned contributor gave up.'
      },
      {
        name: 'Status: Available',
        color: 'c2e0c6',
        description: 'Open for anyone to work on.'
      },
      {
        name: 'Status: Blocked',
        color: 'ee0701',
        description: 'Blocked by another issue.'
      },
      {
        name: 'Status: In Progress',
        color: 'cccccc',
        description: 'Someone is already working on it.'
      },
      {
        name: 'Status: On Hold',
        color: 'e99695',
        description: 'Purposely paused.'
      },
      {
        name: 'Status: Proposal',
        color: 'd4c5f9',
        description: "Don't work on it until accepted."
      },
      {
        name: 'Status: Review Needed',
        color: 'fbca04',
        description: 'Pending reviews.'
      },
      { name: 'Type: Bug :bug:', color: 'ee0701', description: 'Bugs.' },
      {
        name: 'Type: Documentation :books:',
        color: '5319e7',
        description: 'Documentation work.'
      },
      {
        name: 'Type: Enhancement :sparkles:',
        color: '1d76db',
        description: 'Enhancements.'
      },
      {
        name: 'Type: Maintenance :construction:',
        color: 'fbca04',
        description: 'Chores.'
      },
      {
        name: 'Type: Question :grey_question:',
        color: 'cc317c',
        description: 'Queries about the project.'
      }
    ])
      await githubAPICaller(`/repos/kleros/${repo}/labels`, {
        method: 'POST',
        body: newLabel
      })

    console.log(`Finished setting labels for ${repo}.`)
  }
}
run()
