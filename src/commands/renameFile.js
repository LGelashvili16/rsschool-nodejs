import { rename } from "node:fs/promises";
import { showOutput } from "../cli/output.js";
import { showCurrentDir } from "../utils/directoryUtils.js";
import { providePaths } from "../utils/pathUtils.js";

export const renameFile = async (userArgs, currentDir) => {
  try {
    if (userArgs.length < 2) {
      showOutput("Please provide correct file_path and new_filename!");
      showCurrentDir(currentDir);
    } else if (userArgs.length > 2) {
      showOutput("Please do not use spaces in paths or names!");
      showCurrentDir(currentDir);
    } else {
      const [userProvidedPath, userProvidedNewFileName] = providePaths(
        currentDir,
        userArgs
      );

      await rename(userProvidedPath, userProvidedNewFileName);
      showCurrentDir(currentDir);
    }
  } catch (error) {
    console.error("Failed to rename file!");
    console.log(error);
    showCurrentDir(currentDir);
  }
};
