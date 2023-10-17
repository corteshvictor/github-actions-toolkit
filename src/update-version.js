import { context } from '@actions/github';
import semver from 'semver';
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
    const version = semver.inc(packageJson.version, 'patch');

    packageJson.version = version;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    await commitAll('chore: Version Packages');
    await createTag(version);
    await pushTags();
    await pushOrigin('main');
    await createRelease({
      owner,
      repo,
      tag_name: version,
      name: version,
      generate_release_notes: true,
    });
  } catch (error) {
    console.error('Error updating version and create tag', error);
  }
}

run();
