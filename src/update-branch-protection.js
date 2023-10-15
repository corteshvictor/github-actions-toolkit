import { context } from '@actions/github';

import { updateBranchProtection } from './actions-toolkit.js';

async function run() {
  const { owner, repo } = context.repo;

  try {
    await updateBranchProtection({
      owner,
      repo,
      branch: 'main',
      required_status_checks: {
        strict: true,
        contexts: ['Analyze with CodeQL (javascript-typescript)'],
      },
      enforce_admins: null,
      required_pull_request_reviews: {
        dismiss_stale_reviews: true,
        require_code_owner_reviews: false,
        require_last_push_approval: false,
        required_approving_review_count: 1,
      },
      restrictions: null,
      allow_force_pushes: true,
    });

    console.log('Branch protection has been updated.');
  } catch (error) {
    console.error('Error updating branch protection:', error);
  }
}

run();
