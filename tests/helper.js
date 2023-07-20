import fs from "fs";

export function createDemoFiles() {
  const demoFilesPath = __dirname + '/demo-files';
  const testPath = __dirname + '/__tests__';

  // Copy style.demo.css.
  fs.copyFileSync(demoFilesPath + '/style.demo.css', testPath + '/style.css');

  // Copy package.demo.json.
  fs.copyFileSync(demoFilesPath + '/package.demo.json', testPath + '/package.json');
  fs.copyFileSync(demoFilesPath + '/package-lock.demo.json', testPath + '/package-lock.json');

  // Copy plugin.demo.php.
  fs.copyFileSync(demoFilesPath + '/plugin.demo.php', testPath + '/plugin.php');
  fs.copyFileSync(demoFilesPath + '/plugin-comment.demo.php', testPath + '/plugin-comment.php');
}
