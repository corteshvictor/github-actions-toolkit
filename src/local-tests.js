import 'dotenv/config';

const { NAME_FUNC } = process.env;

async function run() {
  if (NAME_FUNC === 'enableSecurityBranch') {
    return await import('./get-branch-protection.js');
  }

  if (NAME_FUNC === 'disableSecurityBranch') {
    return await import('./get-branch-protection.js');
  }

  await import('./get-branch-protection.js');
}

run();
