import fs from "node:fs/promises";
import path from "node:path";
import { showFileOrDir } from "../utils/directoryUtils.js";

export const readDir = async (directory) => {
  try {
    const currentDirItems = await fs.readdir(directory);

    const arr = await Promise.all(
      currentDirItems.map(async (item) => {
        const itemType = await showFileOrDir(path.join(directory, item));
        return { name: item, type: itemType };
      })
    );

    return arr;
  } catch (error) {
    console.log(error);
    return [];
  }
};
