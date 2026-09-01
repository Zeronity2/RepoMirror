const analyzePractices = (tree) => {
  const paths = tree.map((item) => item.path.toLowerCase());

  const hasFile = (fileName) =>
    paths.some((path) => path === fileName.toLowerCase());

  const hasFolder = (folderName) =>
    paths.some((path) => path.startsWith(folderName.toLowerCase()));

  return {
    documentation: {
      readme: hasFile("readme.md") || hasFile("readme"),
      license: paths.some((path) => path.startsWith("license")),
    },

    testing: {
      hasTests: paths.some(
        (path) =>
          path.includes("test") ||
          path.includes("spec")
      ),
    },

    ciCd: {
      githubActions: hasFolder(".github/workflows/"),
    },

    containerization: {
      docker: hasFile("dockerfile") || hasFile("docker-compose.yml"),
    },

    configuration: {
      envExample: hasFile(".env.example"),
      gitignore: hasFile(".gitignore"),
    },

    codeQuality: {
      eslint: paths.some((path) => path.includes("eslint")),
      prettier: paths.some((path) => path.includes("prettier")),
    },
  };
};

module.exports = {
  analyzePractices,
};