#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function findGitDir(startDir) {
  let dir = path.resolve(startDir);
  while (true) {
    if (fs.existsSync(path.join(dir, '.git'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

const startDir = __dirname; // scripts folder (inside frontend)
const gitDir = findGitDir(startDir);
if (gitDir) {
  try {
    // Run husky install from the git directory so husky can locate .git
    execSync('husky install', { stdio: 'inherit', cwd: gitDir });
  } catch (err) {
    // Don't fail the whole install if husky can't be run in this environment.
    // Log the error and continue so `npm install` doesn't abort.
    console.warn('husky install failed (continuing):', err && err.message ? err.message : err);
    process.exit(0);
  }
} else {
  // No .git found up the tree — skip husky install (monorepo root likely)
  // This avoids failures when installing from a package subfolder where .git is in repo root.
  process.exit(0);
}
