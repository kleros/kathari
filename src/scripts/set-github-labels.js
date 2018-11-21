#!/usr/bin/env node
const fetch = require('isomorphic-fetch')

// Helper
const githubAPICaller = (path, { method = 'GET', body } = {}) =>
  fetch(`https://api.github.com${encodeURI(path)}`, {
    body: body && JSON.stringify(body),
    headers: {
      Authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`
    },
    method
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
        color: 'ededed',
        description: 'Is a duplicate.',
        name: 'duplicate :two:'
      },
      {
        color: 'ffc0cb',
        description: 'Good for new contributors.',
        name: 'starter :baby_bottle:'
      },
      {
        color: 'ee0701',
        description: 'Mission critical.',
        name: 'Priority: Critical :fire:'
      },
      {
        color: 'd93f0b',
        description: 'Top of to-do list.',
        name: 'Priority: High'
      },
      {
        color: '0e8a16',
        description: 'Bottom of to-do list.',
        name: 'Priority: Low'
      },
      {
        color: 'fbca04',
        description: 'Somewhere in the middle of to-do list.',
        name: 'Priority: Medium'
      },
      {
        color: '000000',
        description: 'The assigned contributor gave up.',
        name: 'Status: Abandoned'
      },
      {
        color: 'c2e0c6',
        description: 'Open for anyone to work on.',
        name: 'Status: Available'
      },
      {
        color: 'ee0701',
        description: 'Blocked by another issue.',
        name: 'Status: Blocked'
      },
      {
        color: 'cccccc',
        description: 'Someone is already working on it.',
        name: 'Status: In Progress'
      },
      {
        color: 'e99695',
        description: 'Purposely paused.',
        name: 'Status: On Hold'
      },
      {
        color: 'd4c5f9',
        description: "Don't work on it until accepted.",
        name: 'Status: Proposal'
      },
      {
        color: 'fbca04',
        description: 'Pending reviews.',
        name: 'Status: Review Needed'
      },
      { color: 'ee0701', description: 'Bugs.', name: 'Type: Bug :bug:' },
      {
        color: '5319e7',
        description: 'Documentation work.',
        name: 'Type: Documentation :books:'
      },
      {
        color: '1d76db',
        description: 'Enhancements.',
        name: 'Type: Enhancement :sparkles:'
      },
      {
        color: 'fbca04',
        description: 'Chores.',
        name: 'Type: Maintenance :construction:'
      },
      {
        color: 'cc317c',
        description: 'Queries about the project.',
        name: 'Type: Question :grey_question:'
      }
    ])
      await githubAPICaller(`/repos/kleros/${repo}/labels`, {
        body: newLabel,
        method: 'POST'
      })

    console.log(`Finished setting labels for ${repo}.`)
  }
}
run()
