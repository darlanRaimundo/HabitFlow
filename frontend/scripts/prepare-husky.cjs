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
    execSync('husky install', { stdio: 'inherit', cwd: gitDir });
  } catch (err) {
    console.warn('husky install failed (continuing):', err && err.message ? err.message : err);
    process.exit(0);
  }
} else {
  process.exit(0);
}
