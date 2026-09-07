const analyzePractices = (tree, projectType) => {
  const paths = tree.map((item) => item.path.toLowerCase());

  const hasFile = (fileName) =>
    paths.some((path) => path === fileName.toLowerCase());

  const hasFolder = (folderName) =>
    paths.some((path) => path.startsWith(folderName.toLowerCase()));

  const type = projectType?.type?.toLowerCase() || "";

  const isJavaScript =
    type.includes("frontend") ||
    type.includes("backend") ||
    type.includes("javascript") ||
    type.includes("typescript");

  const isPython = type.includes("python");

  const isJava = type.includes("java");

  const isRust = type.includes("rust");

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
      docker:
        hasFile("dockerfile") ||
        hasFile("docker-compose.yml"),
    },

    configuration: {
      envExample: hasFile(".env.example"),
      gitignore: hasFile(".gitignore"),
    },

    codeQuality: {
      // JavaScript / TypeScript
      eslint: isJavaScript &&
        paths.some((path) => path.includes("eslint")),

      prettier: isJavaScript &&
        paths.some((path) => path.includes("prettier")),

      // Python
      ruff: isPython &&
        paths.some((path) => path.includes("ruff")),

      black: isPython &&
        (
          paths.some((path) => path.includes("black")) ||
          paths.some((path) => path === "pyproject.toml")
        ),

      // Java
      checkstyle: isJava &&
        paths.some((path) => path.includes("checkstyle")),

      // Rust
      clippy: isRust &&
        paths.some((path) => path.includes("clippy")),
    },
  };
};

module.exports = {
  analyzePractices,
};