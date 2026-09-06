const calculateHealth = (structure) => {
  // Documentation
  const documentation = structure.hasReadme ? 20 : 0;

  // Testing
  const testing = structure.hasTests ? 20 : 0;

  // Configuration
  const configuration = structure.hasConfiguration ? 20 : 0;

  // Repository structure
  const structureScore =
    structure.totalFolders >= 5 ? 20 : 10;

  // Codebase
  const codeExtensions = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".rs",
    ".css",
    ".html",
  ];

  const codeTypes = codeExtensions.filter(
    (extension) => structure.extensionCounts[extension]
  ).length;

  const codebase = codeTypes >= 2 ? 20 : 10;

  // Final score
  const score =
    documentation +
    testing +
    configuration +
    structureScore +
    codebase;

  return {
    score,
    grade: getGrade(score),

    breakdown: {
      documentation,
      testing,
      structure: structureScore,
      configuration,
      codebase,
    },
  };
};

const getGrade = (score) => {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Fair";
  if (score >= 40) return "Needs Improvement";

  return "Poor";
};

module.exports = {
  calculateHealth,
};