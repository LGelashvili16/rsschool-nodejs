import os from "node:os";
import { showOutput } from "../cli/output.js";

const showCpuInfo = () => {
  showOutput(`\nTotal CPUs: ${os.cpus().length}\n`);

  os.cpus().map((cpu, i) => {
    const model = cpu.model;
    const speed = cpu.speed / 1000;

    showOutput(`CPU${i + 1}:\n Model: ${model}\n Speed: ${speed}GHz\n`);
  });
};

export const osCommandsHandler = (commandArg) => {
  try {
    switch (commandArg.toLowerCase()) {
      case "--eol":
        showOutput(JSON.stringify(os.EOL));
        break;
      case "--cpus":
        showCpuInfo();
        break;
      case "--homedir":
        showOutput(os.homedir());
        break;
      case "--username":
        showOutput(os.userInfo().username);
        break;
      case "--architecture":
        showOutput(os.arch());
        break;
      default:
        showOutput("Please provide correct argument!");
        break;
    }
  } catch (error) {
    showOutput(`Failed to read information from the OS!`);
  }
};
