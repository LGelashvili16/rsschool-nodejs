import os from "node:os";
import { exitProcess } from "../commands/exit.js";
import { username } from "../index.js";
import {
  existsDir,
  isDirectoryPath,
  showCurrentDir,
  showFileOrDir,
} from "../utils/directoryUtils.js";
import { showOutput } from "./output.js";
import path from "node:path";
import { readDir } from "../commands/ls.js";
import { readFromFile } from "../commands/readFromFile.js";
import { createNewFile } from "../commands/createNewFile.js";
import { renameFile } from "../commands/renameFile.js";
import { copyUserFile } from "../commands/copyFile.js";
import { providePaths } from "../utils/pathUtils.js";

const homeDir = os.homedir();
export let currentDir = os.homedir();

export const openCli = () => {
  showCurrentDir(homeDir);

  process.stdin.on("data", async (data) => {
    const userText = data.toString().trim();
    const [command, ...userArgs] = userText.split(" ");

    const userPath = path.resolve(currentDir, userArgs.join(" "));

    switch (command) {
      case "up":
        if (currentDir !== homeDir) {
          currentDir = path.resolve(currentDir, "..");
          showCurrentDir(currentDir);
        } else {
          showCurrentDir(currentDir);
        }
        break;
      case "cd":
        const isDir = await existsDir(path.resolve(currentDir, userPath));

        if (isDir) {
          currentDir = userPath;
          showCurrentDir(path.resolve(currentDir, userPath));
        } else {
          showOutput("Directory not found!");
        }

        break;
      case "ls":
        const currentDirItems = await readDir(currentDir);
        console.table(currentDirItems);
        showCurrentDir(currentDir);
        break;
      case "cat":
        await readFromFile(userPath);
        showCurrentDir(currentDir);
        break;
      case "add":
        await createNewFile(userPath);
        showCurrentDir(currentDir);
        break;
      case "rn":
        await renameFile(userArgs, currentDir);
        break;
      case "cp":
        if (userArgs.length < 2) {
          showOutput("Please provide correct file_path and new_path!");
          showCurrentDir(currentDir);
        } else if (userArgs.length > 2) {
          showOutput("Please do not use spaces in paths!");
          showCurrentDir(currentDir);
        } else {
          const [filePath, copyToPath] = userArgs;
          const copyFileSource = path.resolve(currentDir, filePath);
          const copyFileDestination = path.resolve(currentDir, copyToPath);

          const filename = path.basename(filePath);

          const checkDirectory = await isDirectoryPath(copyFileDestination);
          const defineDestination =
            checkDirectory === "Directory"
              ? path.resolve(copyFileDestination, filename)
              : copyFileDestination;

          copyUserFile(copyFileSource, defineDestination);
          showCurrentDir(currentDir);
        }
        break;
      case ".exit":
        exitProcess(username);
        break;
      default:
        showOutput("Invalid command. Please try again!");
        break;
    }
  });
};
