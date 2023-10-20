import 'dotenv/config';

const { NAME_FUNC } = process.env;

const functionModules = {
  getBranchProtection: './get-branch-protection.js',
  enableSecurityBranch: './get-branch-protection.js',
  disableSecurityBranch: './get-branch-protection.js',
  createVersion: './create-version.js',
  calverVersion: './calver-version.js',
};

async function run() {
  try {
    await import(functionModules[NAME_FUNC]);
  } catch (error) {
    console.error('Error searching for the module:', error);
  }
}

run();
