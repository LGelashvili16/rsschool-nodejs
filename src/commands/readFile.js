import fs from "node:fs";
import { pipeline } from "node:stream/promises";

const path = `C:/Users/Lado Gelashvili/desktop/wt/reads.txt`;

export const customReadFile = async (path) => {
  const readableStream = fs.createReadStream(path);

  try {
    await pipeline(readableStream, process.stdout);
  } catch (error) {
    console.error("Failed to read file!");
  }
};

await customReadFile(path);
