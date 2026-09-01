const analyzeSecurity = (tree) => {
  const paths = tree.map((item) => item.path.toLowerCase());

  const sensitiveFiles = paths.filter(
    (path) =>
      path.endsWith(".env") ||
      path.endsWith(".pem") ||
      path.endsWith(".key") ||
      path.includes("credentials") ||
      path.includes("secrets")
  );

  const hasGitignore = paths.some(
    (path) => path === ".gitignore"
  );

  const envIgnored = paths.some(
    (path) =>
      path === ".gitignore" &&
      tree.find((item) => item.path.toLowerCase() === path)
  );

  let riskLevel = "Low";

  if (sensitiveFiles.length > 0) {
    riskLevel = "High";
  } else if (!hasGitignore) {
    riskLevel = "Medium";
  }

  return {
    riskLevel,

    sensitiveFiles: {
      count: sensitiveFiles.length,
      files: sensitiveFiles,
    },

    gitignore: {
      present: hasGitignore,
      protectsSensitiveFiles: envIgnored,
    },
  };
};

module.exports = {
  analyzeSecurity,
};