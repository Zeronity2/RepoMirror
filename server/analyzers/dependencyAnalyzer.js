const analyzeDependencies = (content, structure, projectType) => {
  if (!content) {
    return null;
  }

  if (projectType === "Python") {
    return analyzePythonDependencies(content, structure);
  }

  return analyzeNodeDependencies(content, structure);
};

// JavaScript / TypeScript dependencies
const analyzeNodeDependencies = (packageJsonContent, structure) => {
  try {
    const packageJson = JSON.parse(packageJsonContent);

    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    const productionCount = Object.keys(dependencies).length;
    const developmentCount = Object.keys(devDependencies).length;
    const totalCount = productionCount + developmentCount;

    return {
      productionCount,
      developmentCount,
      totalCount,
      packageManager: detectPackageManager(packageJson),
      lockfile: detectLockfile(structure),
      dependencyLevel: getDependencyLevel(totalCount),
      dependencies,
      devDependencies,
    };
  } catch (error) {
    console.error("Dependency analyzer error:", error.message);
    throw new Error("Invalid package.json");
  }
};

// Python dependencies
const analyzePythonDependencies = (content, structure) => {
  const dependencies = [];

  const dependencySection = content.match(
    /\[project\][\s\S]*?dependencies\s*=\s*\[([\s\S]*?)\]/
  );

  if (dependencySection) {
    const matches = dependencySection[1].match(/["']([^"']+)["']/g);

    if (matches) {
      matches.forEach((dependency) => {
        dependencies.push(
          dependency.replace(/^["']|["']$/g, "")
        );
      });
    }
  }

  const totalCount = dependencies.length;

  return {
    productionCount: totalCount,
    developmentCount: 0,
    totalCount,
    packageManager: "pip",
    lockfile: detectLockfile(structure),
    dependencyLevel: getDependencyLevel(totalCount),
    dependencies,
    devDependencies: {},
  };
};

const detectPackageManager = (packageJson) => {
  if (packageJson.packageManager) {
    return packageJson.packageManager;
  }

  return "npm";
};

const detectLockfile = (structure) => {
  const extensions = structure.extensionCounts;

  return {
    detected:
      Boolean(extensions[".lock"]) ||
      Boolean(extensions[".yaml"]) ||
      Boolean(extensions[".yml"]),

    type: extensions[".lock"]
      ? "lockfile"
      : extensions[".yaml"] || extensions[".yml"]
        ? "YAML configuration"
        : "Not detected",
  };
};

const getDependencyLevel = (totalCount) => {
  if (totalCount >= 100) return "High";
  if (totalCount >= 50) return "Medium";
  if (totalCount >= 20) return "Low";

  return "Minimal";
};

module.exports = {
  analyzeDependencies,
};