#!/usr/bin/env node

import {getVersion, getNextVersion, upgradeVersion} from "./src/index.js";
import {projectArgs as args} from "./src/libs/args.js";

const currentPath = args['project-path'] || process.cwd();
const currentVersion = getVersion({
  currentPath,
  file: args.file,
});

let type = 'patch';
if (args?.minor) {
  type = 'minor';
} else if (args?.major) {
  type = 'major';
}

let nextVersion = args?.force || getNextVersion(currentVersion, type);
if (args?.build) {
  nextVersion = `${nextVersion}-${args?.build}`;
}

upgradeVersion(nextVersion, currentPath, args?.file);

console.log(`🎉 Done! Upgraded from ${currentVersion} to ${nextVersion}.`);
