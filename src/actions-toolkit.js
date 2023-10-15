import { getOctokit } from '@actions/github';
import { exec } from '@actions/exec';

const octokit = getOctokit(process.env.GITHUB_TOKEN);

/**
 * Fetches the protection of a specific branch of a repository on GitHub.
 *
 * https://octokit.github.io/rest.js/v20#repos-get-branch-protection
 *
 * https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#get-branch-protection
 *
 * @async
 * @function getBranchProtection
 * @param {Object} params - Function parameters.
 * @param {string} params.owner - The account owner of the repository. The name is not case sensitive. This parameter is required.
 * @param {string} params.repo - The name of the repository without the .git extension. The name is not case sensitive. This parameter is required.
 * @param {string} params.branch - The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the [GraphQL API](https://docs.github.com/en/graphql). This parameter is required.
 * @returns {Promise<Object>} Promise resolving with the branch protection data.
 * @throws {Error} Throws an error if the GitHub API request fails or if any of the parameters are not provided.
 *
 * @example
 * const protection = await getBranchProtection({ owner: 'octocat', repo: 'Hello-World', branch: 'main' });
 */
async function getBranchProtection(params) {
  const { data } = await octokit.rest.repos.getBranchProtection(params);

  // console.log(JSON.stringify(data, null, 2));
  return data;
}

/**
 * Deletes the protection of a specific branch of a repository on GitHub.
 *
 * https://octokit.github.io/rest.js/v20#repos-delete-branch-protection
 *
 * https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#delete-branch-protection
 *
 * @async
 * @function deleteBranchProtection
 * @param {Object} params - Function parameters.
 * @param {string} params.owner - The account owner of the repository. The name is not case sensitive. This parameter is required.
 * @param {string} params.repo - The name of the repository without the .git extension. The name is not case sensitive. This parameter is required.
 * @param {string} params.branch - The name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the [GraphQL API](https://docs.github.com/en/graphql). This parameter is required.
 * @returns {Promise<void>} Promise resolving when the branch protection has been deleted.
 * @throws {Error} Throws an error if the GitHub API request fails or if any of the parameters are not provided.
 *
 * @example
 * await deleteBranchProtection({ owner: 'octocat', repo: 'Hello-World', branch: 'main' });
 */
async function deleteBranchProtection(params) {
  return octokit.rest.repos.deleteBranchProtection(params);
}

/**
 * Updates the protection of a specific branch of a repository on GitHub.
 *
 * https://octokit.github.io/rest.js/v20#repos-update-branch-protection
 *
 * https://docs.github.com/en/rest/branches/branch-protection?apiVersion=2022-11-28#update-branch-protection
 *
 * @async
 * @function updateBranchProtection
 * @param {Object} params - Function parameters.
 * @param {string} params.owner - The account owner of the repository. The name is not case sensitive. This parameter is required.
 * @param {string} params.repo - The name of the repository without the .git extension. The name is not case sensitive. This parameter is required.
 * @param {string} params.branch - he name of the branch. Cannot contain wildcard characters. To use wildcard characters in branch names, use the [GraphQL API](https://docs.github.com/en/graphql). This parameter is required.
 * @param {Object|null} params.required_status_checks - Required status checks object or null. Require status checks to pass before merging. Set to null to disable. When it's an object, it includes the following properties:
 * @param {boolean} params.required_status_checks.strict - Require branches to be up to date before merging.
 * @param {Array<string>} params.required_status_checks.contexts - An array of strings. Deprecated: The list of status checks to require in order to merge into this branch. If any of these checks have recently been set by a particular GitHub App, they will be required to come from that app in future for the branch to merge. Use checks instead of contexts for more fine-grained control.
 * @param {Array<Object>} params.required_status_checks.checks - An array of check objects. The list of status checks to require in order to merge into this branch. Each check object includes:
 * @param {string} params.required_status_checks.checks[].context - The name of the required check.
 * @param {number} [params.required_status_checks.checks[].app_id] - The optional app ID associated with the check. The ID of the GitHub App that must provide this check. Omit this field to automatically select the GitHub App that has recently provided this check, or any app if it was not set by a GitHub App. Pass -1 to explicitly allow any app to set the status.
 * @param {boolean|null} params.enforce_admins - Enforce all configured restrictions for administrators. Set to true to enforce required status checks for repository administrators. Set to null to disable. This parameter is required.
 * @param {Object|null} params.required_pull_request_reviews - Require at least one approving review on a pull request, before merging. Set to null to disable. This parameter is required.
 * @param {Object} [params.required_pull_request_reviews.dismissal_restrictions] Specify which users, teams, and apps can dismiss pull request reviews. Pass an empty dismissal_restrictions object to disable. User and team dismissal_restrictions are only available for organization-owned repositories. Omit this parameter for personal repositories.
 * @param {Array<string>} [params.required_pull_request_reviews.dismissal_restrictions.users] The list of user logins with dismissal access
 * @param {Array<string>} [params.required_pull_request_reviews.dismissal_restrictions.teams] The list of team slugs with dismissal access
 * @param {Array<string>} [params.required_pull_request_reviews.dismissal_restrictions.apps] The list of app slugs with dismissal access
 * @param {boolean} [params.required_pull_request_reviews.dismiss_stale_reviews] Set to true if you want to automatically dismiss approving reviews when someone pushes a new commit.
 * @param {boolean} [params.required_pull_request_reviews.require_code_owner_reviews] Blocks merging pull requests until code owners review them.
 * @param {number} [params.required_pull_request_reviews.required_approving_review_count] Specify the number of reviewers required to approve pull requests. Use a number between 1 and 6 or 0 to not require reviewers.
 * @param {boolean} [params.required_pull_request_reviews.require_last_push_approval] Whether the most recent push must be approved by someone other than the person who pushed it. Default: false.
 * @param {Object} [params.required_pull_request_reviews.bypass_pull_request_allowances] Allow specific users, teams, or apps to bypass pull request requirements.
 * @param {Array<string>} [params.required_pull_request_reviews.bypass_pull_request_allowances.users] The list of user logins allowed to bypass pull request requirements.
 * @param {Array<string>} [params.required_pull_request_reviews.bypass_pull_request_allowances.teams] The list of team slugs allowed to bypass pull request requirements.
 * @param {Array<string>} [params.required_pull_request_reviews.bypass_pull_request_allowances.apps] The list of app slugs allowed to bypass pull request requirements.
 * @param {Object|null} params.restrictions - Restrict who can push to the protected branch. User, app, and team restrictions are only available for organization-owned repositories. Set to null to disable. This parameter is required.
 * @param {Array<string>} params.restrictions.users The list of user logins with push access
 * @param {Array<string>} params.restrictions.teams The list of team slugs with push access
 * @param {Array<string>} [params.restrictions.apps] The list of app slugs with push access
 * @param {boolean} [params.required_linear_history] Enforces a linear commit Git history, which prevents anyone from pushing merge commits to a branch. Set to true to enforce a linear commit history. Set to false to disable a linear commit Git history. Your repository must allow squash merging or rebase merging before you can enable a linear commit history. Default: false.
 * @param {boolean|null} [params.allow_force_pushes] Permits force pushes to the protected branch by anyone with write access to the repository. Set to true to allow force pushes. Set to false or null to block force pushes. Default: false.
 * @param {boolean} [allow_deletions] Allows deletion of the protected branch by anyone with write access to the repository. Set to false to prevent deletion of the protected branch. Default: false.
 * @param {boolean} [block_creations] If set to true, the restrictions branch protection settings which limits who can push will also block pushes which create new branches, unless the push is initiated by a user, team, or app which has the ability to push. Set to true to restrict new branch creation. Default: false.
 * @param {boolean} [required_conversation_resolution] Requires all conversations on code to be resolved before a pull request can be merged into a branch that matches this rule. Set to false to disable. Default: false.
 * @param {boolean} [lock_branch] Whether to set the branch as read-only. If this is true, users will not be able to push to the branch. Default: false.
 * @param {boolean} [allow_fork_syncing] Whether users can pull changes from upstream when the branch is locked. Set to true to allow fork syncing. Set to false to prevent fork syncing. Default: false.
 * @returns {Promise<Object>} Promise resolving with the updated branch protection data.
 * @throws {Error} Throws an error if the GitHub API request fails or if any of the parameters are not provided.
 *
 * @example
 * await updateBranchProtection({
 *   owner: 'octocat',
 *   repo: 'Hello-World',
 *   branch: 'main',
 *   required_status_checks: {
 *      strict: true,
 *      contexts: ['Analyze with CodeQL (javascript-typescript)'],
 *   },
 *   enforce_admins: null,
 *   required_pull_request_reviews: {
 *      dismiss_stale_reviews: true,
 *      require_code_owner_reviews: false,
 *      require_last_push_approval: false,
 *      required_approving_review_count: 1,
 *   },
 *   restrictions: null,
 * });
 *
 * @example
 * await updateBranchProtection({
 *   owner: 'octocat',
 *   repo: 'Hello-World',
 *   branch: 'main',
 *   required_status_checks: null,
 *   enforce_admins: null,
 *   required_pull_request_reviews: null,
 *   restrictions: null,
 * });
 */
async function updateBranchProtection(params) {
  return octokit.rest.repos.updateBranchProtection(params);
}

/**
 * Creates a release for a repository on GitHub.
 * Users with push access to the repository can create a release. This endpoint triggers notifications. Creating content too quickly using this endpoint may result in secondary rate limiting.
 *
 * https://octokit.github.io/rest.js/v20#repos-create-release
 *
 * https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#create-a-release
 *
 * @async
 * @function createRelease
 * @param {Object} params - Function parameters.
 * @param {string} params.owner - The account owner of the repository. The name is not case sensitive. This parameter is required.
 * @param {string} params.repo - The name of the repository without the .git extension. The name is not case sensitive. This parameter is required.
 * @param {string} params.tag_name - The name of the tag. This parameter is required.
 * @param {string} [params.target_commitish] Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch.
 * @param {string} [params.name] - The name of the release.
 * @param {string} [params.body] - Text describing the contents of the tag.
 * @param {boolean} [params.draft] - true to create a draft (unpublished) release, false to create a published one default false.
 * @param {boolean} [params.prerelease] - true to identify the release as a prerelease, false to identify the release as a full release. default false.
 * @returns {Promise<Object>} Promise resolving with the created release data.
 * @throws {Error} Throws an error if the GitHub API request fails or if any of the parameters are not provided.
 *
 * @example
 * await createRelease({
 *   owner: 'octocat',
 *   repo: 'Hello-World',
 *   tag_name: 'v1.0.0',
 *   target_commitish: 'main',
 *   name: 'Initial release',
 *   body: 'First version of our project',
 *   draft: false,
 *   prerelease: false
 * });
 */
async function createRelease(params) {
  return octokit.rest.repos.createRelease(params);
}

/**
 * Sets up the Git user for commits.
 *
 * @async
 * @function setupUser
 * @throws {Error} Throws an error if the Git commands fail.
 *
 * @example
 * await setupUser();
 */
async function setupUser() {
  await exec('git', ['config', 'user.name', `"github-actions[bot]"`]);
  await exec('git', [
    'config',
    'user.email',
    `"github-actions[bot]@users.noreply.github.com"`,
  ]);
}

/**
 * Pushes the current HEAD to a branch.
 *
 * @async
 * @function push
 * @param {string} branch - The branch to push to.
 * @throws {Error} Throws an error if the Git command fails.
 *
 * @example
 * await push('main');
 */
async function pushOrigin(branch) {
  await exec('git', ['push', 'origin', `HEAD:${branch}`]);
}

/**
 * Pushes all tags to the origin remote.
 *
 * @async
 * @function pushTags
 * @throws {Error} Throws an error if the Git command fails.
 *
 * @example
 * await pushTags();
 */
async function pushTags() {
  await exec('git', ['push', 'origin', '--tags']);
}

/**
 * Creates a new Git tag.
 *
 * @async
 * @function createTag
 * @param {string} tagName - The name of the tag to create.
 * @throws {Error} Throws an error if the Git command fails.
 *
 * @example
 * await createTag('v1.0.0');
 */
async function createTag(tagName) {
  await exec('git', ['tag', tagName]);
}

/**
 * Creates a new Git commit with a message.
 *
 * @async
 * @function commit
 * @param {string} message - The commit message.
 * @throws {Error} Throws an error if the Git command fails.
 *
 * @example
 * await commit('Initial commit');
 */
async function commitAll(message) {
  await exec('git', ['commit', '-am', message]);
}

export {
  getBranchProtection,
  deleteBranchProtection,
  updateBranchProtection,
  createRelease,
  setupUser,
  pushOrigin,
  pushTags,
  createTag,
  commitAll,
};
