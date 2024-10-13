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

export const showFileOrDir = async (newPath) => {
  try {
    const stats = await fs.lstat(newPath);

    if (stats.isDirectory()) {
      return "Directory";
    } else if (stats.isFile()) {
      return "File";
    } else {
      return `Unknown type!`;
    }
  } catch (err) {
    console.error(err);
  }
};

export const isDirectoryPath = async (newPath) => {
  try {
    const stats = await fs.lstat(newPath);

    if (stats.isDirectory()) return true;
  } catch (err) {
    return false;
  }
};
