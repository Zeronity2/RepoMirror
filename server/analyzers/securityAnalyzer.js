const analyzeSecurity = (tree) => {
  const paths = tree.map((item) => item.path.toLowerCase());

  const isTestOrFixture = (filePath) => {
    return (
      filePath.startsWith("test/") ||
      filePath.startsWith("tests/") ||
      filePath.includes("/test/") ||
      filePath.includes("/tests/") ||
      filePath.startsWith("fixtures/") ||
      filePath.includes("/fixtures/") ||
      filePath.includes("__tests__") ||
      filePath.includes("test-fixtures")
    );
  };

  const isSensitiveFile = (filePath) => {
    return (
      filePath.endsWith(".env") ||
      filePath.endsWith(".pem") ||
      filePath.endsWith(".key") ||
      filePath.includes("credentials") ||
      filePath.includes("secrets")
    );
  };

  // Detect sensitive-looking files
  const allSensitiveFiles = paths.filter(isSensitiveFile);

  // Separate likely test/fixture files from potentially real sensitive files
  const fixtureSensitiveFiles = allSensitiveFiles.filter(
    isTestOrFixture
  );

  const realSensitiveFiles = allSensitiveFiles.filter(
    (filePath) => !isTestOrFixture(filePath)
  );

  const hasGitignore = paths.some(
    (path) => path === ".gitignore"
  );

  /*
   * We can confirm that .gitignore exists,
   * but we cannot determine from the repository tree alone
   * whether it actually contains rules for sensitive files.
   */
  const protectsSensitiveFiles = hasGitignore;

  let riskLevel = "Low";

  // Only potentially real sensitive files trigger High Risk
  if (realSensitiveFiles.length > 0) {
    riskLevel = "High";
  } else if (!hasGitignore) {
    riskLevel = "Medium";
  }

  return {
    riskLevel,

    sensitiveFiles: {
      count: realSensitiveFiles.length,
      files: realSensitiveFiles,
    },

    fixtureSensitiveFiles: {
      count: fixtureSensitiveFiles.length,
      files: fixtureSensitiveFiles,
    },

    gitignore: {
      present: hasGitignore,
      protectsSensitiveFiles,
    },
  };
};

module.exports = {
  analyzeSecurity,
};