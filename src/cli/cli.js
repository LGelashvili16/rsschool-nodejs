import os from "node:os";
import { exitProcess } from "../commands/exit.js";
import { username } from "../index.js";
import { existsDir, showCurrentDir } from "../utils/directoryUtils.js";
import { showOutput } from "./output.js";
import path from "node:path";

const homeDir = os.homedir();
let currentDir = os.homedir();

export const openCli = () => {
  showCurrentDir(homeDir);

  process.stdin.on("data", async (data) => {
    const userText = data.toString().trim();
    const [command, ...userArgs] = userText.split(" ");

    switch (command) {
      case "up":
        if (currentDir !== homeDir) {
          showCurrentDir(path.resolve(currentDir, ".."));
        } else {
          showCurrentDir(currentDir);
        }
        break;
      case "cd":
        const userPath = userArgs.join(" ");
        const isDir = await existsDir(path.resolve(currentDir, userPath));

        if (isDir) {
          showCurrentDir(path.resolve(currentDir, userPath));
        } else {
          showOutput("Directory not found!");
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
