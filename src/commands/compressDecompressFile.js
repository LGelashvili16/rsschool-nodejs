import { createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { showOutput } from "../cli/output.js";
import { isDirectoryPath } from "../utils/directoryUtils.js";

export const compressFile = async (userArgs, currentPath) => {
  try {
    const [filePath, destinationPath] = userArgs;

    const compressFilePath = path.resolve(currentPath, filePath);
    const compressedFilePath = path.resolve(currentPath, destinationPath);

    const filename = path.basename(filePath);

    const defineDestination = (await isDirectoryPath(compressedFilePath))
      ? path.resolve(compressedFilePath, filename)
      : compressedFilePath;

    const readableStream = createReadStream(compressFilePath);
    const writableStream = createWriteStream(defineDestination + ".br");

    const brotli = createBrotliCompress();
    await pipeline(readableStream, brotli, writableStream);
  } catch (error) {
    showOutput("Failed to compress file!");
  }
};

export const decompressFile = async (userArgs, currentPath) => {
  try {
    const [filePath, destinationPath] = userArgs;

    const decompressFilePath = path.resolve(currentPath, filePath);
    const decompressedFilePath = path.resolve(currentPath, destinationPath);

    const readableStream = createReadStream(decompressFilePath);
    const writableStream = createWriteStream(decompressedFilePath);

    const brotli = createBrotliDecompress();

    await pipeline(readableStream, brotli, writableStream);
  } catch (error) {
    showOutput("Failed to decompress file!");
  }
};
