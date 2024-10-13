import { createReadStream, createWriteStream, read } from "node:fs";

export const copyUserFile = (fileToCopy, copyDestination) => {
  const readableStream = createReadStream(fileToCopy);
  const writeableStream = createWriteStream(copyDestination);

  readableStream.pipe(writeableStream).on("error", () => {
    console.error("Failed to copy file!");
  });
};
