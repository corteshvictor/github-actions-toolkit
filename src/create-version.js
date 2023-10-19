import { context } from '@actions/github';
import semanticRelease from 'semantic-release';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import {
  commitAll,
  createRelease,
  createTag,
  pushOrigin,
  pushTags,
} from './utils/actions-toolkit.js';

async function run() {
  const { owner, repo } = context.repo;

  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const { lastRelease, nextRelease } = await semanticRelease({
      branches: ['main', 'feat/run-locally'],
      repositoryUrl: 'https://github.com/corteshvictor/github-actions-toolkit',
    });
    const { version, gitTag, name } = nextRelease;

    if (lastRelease.version >= version) {
      throw new Error(
        'You have a version equal to or greater than the one published.'
      );
    }

    packageJson.version = version;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    await commitAll('chore: Version Packages');
    await createTag(gitTag);
    await pushTags();
    await pushOrigin('main');
    await createRelease({
      owner,
      repo,
      tag_name: name,
      generate_release_notes: true,
    });
  } catch (error) {
    console.error('Error updating version and create tag', error);
  }
}

run();
