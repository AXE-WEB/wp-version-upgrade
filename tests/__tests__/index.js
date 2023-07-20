import {describe, expect, test} from '@jest/globals';
import {getNextVersion, getVersion, upgradeVersion} from "../../src";
import {createDemoFiles} from "../helper";
import {checkIfJsonFileExists} from "../../src/libs/package-files";
import {updatePluginFile} from "../../src/libs/wp-files";

createDemoFiles();

describe('Read/Get version', () => {

  test('Read version of style.css', () => {
    const version = getVersion({path: __dirname});
    expect(version).toBe('100.0.14');
  });

  test('Read version package.json', () => {
    const version = getVersion({path: __dirname, file: 'package.json'});
    expect(version).toBe('100.0.1');
  });

  test('Read version plugin.php', () => {
    const version = getVersion({path: __dirname, file: 'plugin.php'});
    expect(version).toBe('1.6');
  });

  test('Read version plugin-comment.php', () => {
    const version = getVersion({path: __dirname, file: 'plugin-comment.php'});
    expect(version).toBe('1.2.3');
  });

  test('Get next version', () => {
    const nextVersion = getNextVersion('100.0.14');
    expect(nextVersion).toBe('100.0.15');
  });

});

describe('Write version', () => {
  test('Upgrade versions in files', () => {
    const version = getVersion({path: __dirname});
    const nextVersion = getNextVersion(version);

    upgradeVersion(nextVersion, __dirname, 'plugin.php');

    const newVersion = getVersion({path: __dirname});
    expect(newVersion).toBe('100.0.15');
  });

  test('Upgrade versions in plugin-comment file', () => {
    const version = getVersion({path: __dirname, file: 'plugin-comment.php'});
    const nextVersion = getNextVersion(version);

    updatePluginFile(nextVersion, __dirname, 'plugin-comment.php');

    const newVersion = getVersion({path: __dirname, file: 'plugin-comment.php'});
    expect(newVersion).toBe('1.2.4');
  });

  test('Make sure version in package.json and package-lock.json updated as well.', () => {
    if (!checkIfJsonFileExists(__dirname, 'package.json')) {
      return true;
    }

    const version = getVersion({path: __dirname, file: 'package.json'});

    expect(version).toBe('100.0.15');
  });

  test('Make sure plugin file updated properly.', () => {
    const version = getVersion({path: __dirname, file: 'plugin.php'});

    expect(version).toBe('100.0.15');
  });

  test('Minor version upgrade', () => {
    const version = getVersion({path: __dirname});
    const nextVersion = getNextVersion(version, 'minor');

    upgradeVersion(nextVersion, __dirname);

    const newVersion = getVersion({path: __dirname});
    expect(newVersion).toBe('100.1.0');
  });

  test('Major version upgrade', () => {
    const version = getVersion({path: __dirname});
    const nextVersion = getNextVersion(version, 'major');

    upgradeVersion(nextVersion, __dirname);

    const newVersion = getVersion({path: __dirname});
    expect(newVersion).toBe('101.0.0');
  });

  test('Build version', () => {
    const version = getNextVersion('101.0.0', 'build', 'build.123');

    upgradeVersion(version, __dirname);

    const newVersion = getVersion({path: __dirname});
    expect(newVersion).toBe('101.0.0-build.123');
  });

  test('Custom version', () => {
    const nextVersion = '1.2.3-build.123';

    upgradeVersion(nextVersion, __dirname);

    const newVersion = getVersion({path: __dirname});
    expect(newVersion).toBe(nextVersion);
  });

});

