import { context } from '@actions/github';
import calver from 'calver';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import {
  commitAll,
  createRelease,
  createTag,
  pushOrigin,
  pushTags,
  setupUser,
} from './utils/actions-toolkit.js';

async function run() {
  const { owner, repo } = context.repo;

  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    if (!calver.isValid('yyyy.mm.dd.minor', packageJson.version)) {
      packageJson.version = '';
    }

    const newVersion = calver.inc(
      'yyyy.mm.dd.minor',
      packageJson.version,
      'calendar.minor'
    );

    packageJson.version = newVersion;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const tagName = `${packageJson.name}@${packageJson.version}`;

    await setupUser();
    await commitAll('chore: Version Packages');
    await createTag(tagName);
    await pushTags();
    await pushOrigin('test');
    await createRelease({
      owner,
      repo,
      tag_name: tagName,
      name: tagName,
      generate_release_notes: true,
    });
  } catch (error) {
    console.error('Error updating version and create tag', error);
  }
}

run();
