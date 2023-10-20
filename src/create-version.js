import semanticRelease from 'semantic-release';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { commitAll } from './utils/actions-toolkit.js';

async function run() {
  try {
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

    // https://github.com/semantic-release/semantic-release/blob/bdfb5296f20ee92ecbd3915f681b83b925e0b4ee/docs/developer-guide/js-api.md
    const { lastRelease, nextRelease } = await semanticRelease({
      branches: ['main', 'feat/run-locally'],
    });
    const { version } = nextRelease;

    if (lastRelease.version >= version) {
      throw new Error(
        'You have a version equal to or greater than the one published.'
      );
    }

    packageJson.version = version;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    await commitAll('chore: Update version package.json');
  } catch (error) {
    console.error('Error updating version and create tag', error);
  }
}

run();
