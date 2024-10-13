import fs from "node:fs";

export const readFromFile = async (path) => {
  const readableStream = fs.createReadStream(path);

  readableStream.on("data", (chunk) => {
    process.stdout.write(chunk + "\n");
  });

  readableStream.on("error", (err) => {
    console.error("Failed to read file!");
  });
};
