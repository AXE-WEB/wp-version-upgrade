# Overview

This package serves as a versioning tool for your WordPress plugins or themes, allowing you to update or "bump" your
version number before you release an update. It utilizes semantic versioning and, by default, will increment the "patch"
version.

The package also offers a feature that allows you to manually set the version, which could be beneficial when
incorporated into Continuous Integration/Continuous Deployment (CI/CD) pipelines, allowing for build version inclusion.

# How to Use

Execute these commands within the root directory of your plugin or theme:

```bash
npx wp-version-bump
npx wp-version-bump --file=your-plugin.php

npx wp-version-bump --patch
npx wp-version-bump --minor
npx wp-version-bump --major
npx wp-version-bump --build=123
npx wp-version-bump --force=1.1.20-alpha.1
```

Each command initiates a different function:

* `npx wp-version-bump`: runs the script, updating the "patch" version by default.
* `npx wp-version-bump --file=your-plugin.php`: specifies the file to update.
* `npx wp-version-bump --patch`: increments the patch version number. (1.0.x)
* `npx wp-version-bump --minor`: increments the minor version number. (1.x.0)
* `npx wp-version-bump --major`: increments the major version number. (x.0.0)
* `npx wp-version-bump --build=123`: adds the build number to the version. (1.0.0-123)
* `npx wp-version-bump --force=1.1.20-alpha.1`: forces the version to the specified version (in this case,
  1.1.20-alpha.1).
