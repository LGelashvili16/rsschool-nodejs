import { openCli } from "./cli/cli.js";
import { exitProcess } from "./commands/exit.js";

export const username =
  process.argv.length > 2 ? process.argv.slice(2)[0].split("=")[1] : undefined;

const welcomeMsg =
  username === undefined
    ? "Please run script correctly! Example: 'npm run start -- --username=your_username'"
    : `Welcome to the file manager, ${username}!`;

process.stdout.write(welcomeMsg + "\n");

openCli();

process.on("SIGINT", () => {
  exitProcess(username);
});
