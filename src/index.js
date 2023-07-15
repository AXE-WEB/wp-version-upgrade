import {coerce, inc, patch} from 'semver';
import {getPackageJsonVersion, updatePackageJson} from "./libs/package-files.js";
import {getThemeOrPluginVersion, updatePluginFile, upgradeThemeFile} from "./libs/wp-files.js";

export function getVersion(args = {}) {
  let sourceDir = args.path;
  if (!sourceDir) {
    sourceDir = process.cwd();
  }

  if (args.file === 'package.json') {
    return getPackageJsonVersion(sourceDir + '/' + args.file);
  }

  return getThemeOrPluginVersion(sourceDir, args.file);
}

export function getNextVersion(version = '0.0.0', type = 'patch', build) {
  if (build) {
    return `${coerce(version).version}-${build}`;
  }

  if (['major', 'minor', 'patch'].indexOf(type) === -1) {
    type = 'patch';
  }

  return inc(version, type);
}

export function upgradeVersion(nextVersion, sourceDir, pluginFile) {
  upgradeThemeFile(nextVersion, sourceDir);
  updatePackageJson(nextVersion, sourceDir, 'package.json');
  updatePackageJson(nextVersion, sourceDir, 'package-lock.json');
  updatePluginFile(nextVersion, sourceDir, pluginFile);
}
