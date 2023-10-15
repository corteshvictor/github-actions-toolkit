import { context } from '@actions/github';

import { updateBranchProtection } from './utils/actions-toolkit.js';

async function run() {
  const { owner, repo } = context.repo;

  try {
    await updateBranchProtection({
      owner,
      repo,
      branch: 'main',
      required_status_checks: null,
      enforce_admins: null,
      required_pull_request_reviews: null,
      restrictions: null,
    });

    console.log('Protected branch security has been disabled.');
  } catch (error) {
    console.error('Error when disabling protected branch security:', error);
  }
}

run();
