import { getOctokit, context } from '@actions/github';

async function run() {
  const octokit = getOctokit(process.env.GITHUB_TOKEN);
  const { owner, repo } = context.repo;

  try {
    // Use this query to remove Branch protection rules
    // await octokit.rest.repos.deleteBranchProtection({
    //   owner,
    //   repo,
    //   branch: 'main',
    // });

    // Use this query to verify your Branch protection settings
    // https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#get-branch-protection
    // const { data } = await octokit.rest.repos.getBranchProtection({
    //   owner,
    //   repo,
    //   branch: 'main',
    // });
    // console.log(JSON.stringify(data, null, 2));

    // Leaving the Branch protection without security.
    // https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#update-branch-protection
    // await octokit.rest.repos.updateBranchProtection({
    //   owner,
    //   repo,
    //   branch: 'main',
    //   required_status_checks: null,
    //   enforce_admins: null,
    //   required_pull_request_reviews: null,
    //   restrictions: null,
    // });

    // This query updates my Branch protection to my security settings.
    // https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#update-branch-protection
    await octokit.rest.repos.updateBranchProtection({
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
    });

    console.log('La protección de la rama ha sido eliminada.');
  } catch (error) {
    console.error('Error al eliminar la protección de la rama:', error);
  }
}

run();
