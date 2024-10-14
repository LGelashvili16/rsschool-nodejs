import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { showOutput } from "../cli/output.js";
import path from "node:path";

export const calcHash = async (hashFilePath, currentDir) => {
  try {
    if (hashFilePath.length > 1) {
      throw new Error();
    }
    const filePath = path.resolve(currentDir, hashFilePath[0]);

    const readableStream = createReadStream(filePath);
    const hash = createHash("sha256");

    await pipeline(readableStream, hash);

    const digest = hash.digest("hex");

    showOutput(`Hash: ${digest}`);
  } catch (error) {
    console.log(error);
    showOutput("Failed to hash file!");
  }
};
