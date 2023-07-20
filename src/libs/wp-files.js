import fs from "fs";

export function upgradeThemeFile(nextVersion, sourceDir) {
  const filePath = sourceDir + '/style.css';
  if (!fs.existsSync(filePath)) {
    return;
  }

  updateFile(nextVersion, filePath);
}

export function updatePluginFile(nextVersion, sourceDir, pluginFile) {
  const filePath = detectFilePath(sourceDir, pluginFile);
  if (!fs.existsSync(filePath)) {
    return;
  }

  updateFile(nextVersion, filePath);
}

function updateFile(nextVersion, filePath) {
  const code = fs.readFileSync(filePath, 'utf8');

  // Find the line that starts with "Version:" and replace with new version.
  let newCode = code.replace(/Version:.*$/m, `Version: ${nextVersion}`);
  newCode = newCode.replace(/@version .*$/m, `@version ${nextVersion}`);

  // Overwrite the original file with new content.
  fs.writeFileSync(filePath, newCode, 'utf8');
}

function detectFilePath(sourceDir, fileName) {
  if (!fileName) {
    const possibleOptions = ['style.css', 'index.php', sourceDir.split('/').pop() + '.php'];
    fileName = possibleOptions.find((fileName) => {
      return fs.existsSync(sourceDir + '/' + fileName);
    });
  }

  if (!fileName) {
    throw new Error("Can't detect file with version details. \nPlease use --file argument to specify the file.");
  }

  return sourceDir + '/' + fileName;
}

export function getThemeOrPluginVersion(sourceDir, fileName) {
  let filePath = detectFilePath(sourceDir, fileName);

  // Open and read the style.css file from provided path, put it in variable.
  const file = fs.readFileSync(filePath, 'utf8');

  const lines = file.split('\n');

  // Go line by line until we find the line that starts with "Version:"
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.indexOf('Version:') !== -1) {
      return line.replace('Version:', '').split(' ').pop().trim();
    }
  }

  return null;
}
