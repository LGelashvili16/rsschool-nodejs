import { rm } from "node:fs/promises";
import path from "node:path";

export const removeUserFile = async (userArgs, currentDir) => {
  try {
    const removeFilePath = path.resolve(currentDir, userArgs[0]);
    await rm(removeFilePath);
  } catch (error) {
    console.error("Failed to remove file!");
  }
};
