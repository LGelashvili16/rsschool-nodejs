import { createReadStream, createWriteStream } from "node:fs";
import { showOutput } from "../cli/output.js";
import { isDirectoryPath, showCurrentDir } from "../utils/directoryUtils.js";
import path from "node:path";

export const copyUserFile = async (userArgs, currentDir) => {
  if (userArgs.length < 2) {
    showOutput("Please provide correct file_path and new_path!");
    showCurrentDir(currentDir);
  } else if (userArgs.length > 2) {
    showOutput("Please do not use spaces in paths!");
    showCurrentDir(currentDir);
  } else {
    const [filePath, copyToPath] = userArgs;
    const copyFileSource = path.resolve(currentDir, filePath);
    const copyFileDestination = path.resolve(currentDir, copyToPath);

    const filename = path.basename(filePath);

    const defineDestination = (await isDirectoryPath(copyFileDestination))
      ? path.resolve(copyFileDestination, filename)
      : copyFileDestination;

    const readableStream = createReadStream(copyFileSource);
    const writeableStream = createWriteStream(defineDestination);

    readableStream.pipe(writeableStream).on("error", (err) => {
      console.error("Failed to copy file!");
      console.log(err);
    });
    showCurrentDir(currentDir);
  }
};
