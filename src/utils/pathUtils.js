import path from "node:path";

export const providePaths = (currentDir, userArgs) => {
  const [filePath, newFileName] = userArgs;
  const userProvidedPath = path.resolve(currentDir, filePath);

  const createSamePath = filePath.split("/").slice(0, -1).join("/");
  const userProvidedNewFileName = path.resolve(
    currentDir,
    createSamePath,
    newFileName
  );

  return [userProvidedPath, userProvidedNewFileName];
};
