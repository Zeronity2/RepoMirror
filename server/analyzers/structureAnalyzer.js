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

  // README detection
  const hasReadme = files.some((file) =>
    path.basename(file.path).toLowerCase().startsWith("readme")
  );

  // JavaScript / Node.js configuration
  const hasPackageJson = files.some(
    (file) =>
      path.basename(file.path).toLowerCase() === "package.json"
  );

  // General project configuration
  // Supports JavaScript, Python, and other common project types
  const hasConfiguration = files.some((file) => {
    const fileName = path.basename(file.path).toLowerCase();

    return (
      fileName === "package.json" ||
      fileName === "requirements.txt" ||
      fileName === "pyproject.toml" ||
      fileName === "pipfile" ||
      fileName === "setup.py"
    );
  });

  // Test detection
  const hasTests = files.some((file) => {
    const fileName = path.basename(file.path).toLowerCase();
    const filePath = file.path.toLowerCase();

    return (
      fileName.includes(".test.") ||
      fileName.includes(".spec.") ||
      filePath.startsWith("test/") ||
      filePath.startsWith("tests/") ||
      filePath.includes("/test/") ||
      filePath.includes("/tests/") ||
      filePath.includes("/__tests__/") ||
      filePath.startsWith("__tests__/")
    );
  });

  return {
    totalFiles: files.length,
    totalFolders: folders.length,
    extensionCounts,
    hasReadme,
    hasPackageJson,
    hasConfiguration,
    hasTests,
  };
};

module.exports = {
  analyzeStructure,
};