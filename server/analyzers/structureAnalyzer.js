const path = require("path");

const analyzeStructure = (tree) => {
  const files = tree.filter((item) => item.type === "blob");
  const folders = tree.filter((item) => item.type === "tree");

  const extensionCounts = {};

  files.forEach((file) => {
    const extension = path.extname(file.path).toLowerCase();

    if (extension) {
      extensionCounts[extension] =
        (extensionCounts[extension] || 0) + 1;
    }
  });

  const hasReadme = files.some((file) =>
    path.basename(file.path).toLowerCase().startsWith("readme")
  );

  const hasPackageJson = files.some(
    (file) => path.basename(file.path).toLowerCase() === "package.json"
  );

  const hasTests = files.some((file) => {
    const fileName = path.basename(file.path).toLowerCase();

    return (
      fileName.includes(".test.") ||
      fileName.includes(".spec.") ||
      file.path.toLowerCase().includes("/test/") ||
      file.path.toLowerCase().includes("/tests/")
    );
  });

  return {
    totalFiles: files.length,
    totalFolders: folders.length,
    extensionCounts,
    hasReadme,
    hasPackageJson,
    hasTests,
  };
};

module.exports = {
  analyzeStructure,
};