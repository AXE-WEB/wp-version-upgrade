import fs from "fs";

export function getPackageJsonVersion(filePath = '') {
  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(file);
    return json.version;
  }

  return undefined;
}

export function updatePackageJson(nextVersion, sourceDir, file = 'package.json') {
  const packageJsonPath = sourceDir + '/' + file;

  if (!checkIfJsonFileExists(sourceDir, file)) {
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.version = nextVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
}

export function checkIfJsonFileExists(sourceDir, file = 'package.json') {
  const packageJsonPath = sourceDir + '/' + file;
  return fs.existsSync(packageJsonPath);
}
