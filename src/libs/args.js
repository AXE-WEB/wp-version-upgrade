import yargs from "yargs/yargs";
import {hideBin} from "yargs/helpers";

export const projectArgs = yargs(hideBin(process.argv)).argv || {
  file: undefined,
  minor: undefined,
  major: undefined,
  build: undefined,
};
