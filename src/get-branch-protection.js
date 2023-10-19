import { context } from '@actions/github';

import { getBranchProtection } from './utils/actions-toolkit.js';

async function run() {
  const { owner, repo } = context.repo;

  try {
    const response = await getBranchProtection({
      owner,
      repo,
      branch: 'main',
    });

    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error when getting branch protection data:', error);
  }
}

run();
