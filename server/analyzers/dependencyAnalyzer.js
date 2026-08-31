const analyzeDependencies = (packageJsonContent, structure) => {
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