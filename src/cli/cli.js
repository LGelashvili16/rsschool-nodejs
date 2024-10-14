import os from "node:os";
import { exitProcess } from "../commands/exit.js";
import { username } from "../index.js";
import { existsDir, showCurrentDir } from "../utils/directoryUtils.js";
import { showOutput } from "./output.js";
import path from "node:path";
import { readDir } from "../commands/ls.js";
import { readFromFile } from "../commands/readFromFile.js";
import { createNewFile } from "../commands/createNewFile.js";
import { renameFile } from "../commands/renameFile.js";
import { copyUserFile } from "../commands/copyFile.js";
import { moveUserFile } from "../commands/moveFile.js";
import { removeUserFile } from "../commands/removeFile.js";

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
        await copyUserFile(userArgs, currentDir);
        break;
      case "mv":
        await copyUserFile(userArgs, currentDir);
        await removeUserFile(userArgs, currentDir);
        break;
      case "rm":
        await removeUserFile(userArgs, currentDir);
        showCurrentDir(currentDir);
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
