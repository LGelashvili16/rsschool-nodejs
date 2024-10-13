import { writeFile } from "node:fs/promises";

export const createNewFile = async (filePath) => {
  try {
    await writeFile(filePath, "", { flag: "wx" });
  } catch (error) {
    console.error("Failed to create file!");
  }
};
