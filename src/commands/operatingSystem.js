import os from "node:os";
import { showOutput } from "../cli/output.js";

export const showEol = () => {
  showOutput(JSON.stringify(os.EOL));
};

export const showCpuInfo = () => {
  showOutput(`\nTotal CPUs: ${os.cpus().length}\n`);

  os.cpus().map((cpu, i) => {
    const model = cpu.model;
    const speed = cpu.speed / 1000;

    showOutput(`CPU${i + 1}:\n Model: ${model}\n Speed: ${speed}GHz\n`);
  });
};
