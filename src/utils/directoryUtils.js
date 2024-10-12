import fs from "node:fs/promises";

export const showCurrentDir = (dirname) => {
  process.stdout.write(`You are currently in ${dirname}\n`);
};

export const existsDir = async (newPath) => {
  try {
    await fs.access(newPath);
    return true;
  } catch (error) {
    return false;
  }
};
