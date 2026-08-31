const calculateHealth = (structure) => {
  const documentation = structure.hasReadme ? 20 : 0;

  const testing = structure.hasTests ? 20 : 0;

  const configuration = structure.hasPackageJson ? 20 : 0;

  const structureScore =
    structure.totalFolders >= 5 ? 20 : 10;

  const codeExtensions = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".css",
    ".html",
  ];

  const codeTypes = codeExtensions.filter(
    (extension) => structure.extensionCounts[extension]
  ).length;

  const codebase = codeTypes >= 2 ? 20 : 10;

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