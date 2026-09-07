const { parseGitHubUrl } = require("../services/githubService");

// Main dependency analyzer
const analyzeDependencies = async (tree, repoUrl) => {
  if (!tree || !repoUrl) {
    return null;
  }

  const { owner, repo } = parseGitHubUrl(repoUrl);

  const paths = tree
    .filter((item) => item.type === "blob")
    .map((item) => item.path);

  const structure = buildStructure(tree);

  // JavaScript / TypeScript
  if (paths.some((path) => path.toLowerCase() === "package.json")) {
    const content = await getFileContent(
      owner,
      repo,
      "package.json"
    );

    return analyzeNodeDependencies(content, structure);
  }

  // Python
  if (
    paths.some(
      (path) => path.toLowerCase() === "pyproject.toml"
    )
  ) {
    const content = await getFileContent(
      owner,
      repo,
      "pyproject.toml"
    );

    return analyzePythonDependencies(content, structure);
  }

  return {
    productionCount: 0,
    developmentCount: 0,
    totalCount: 0,
    packageManager: "Unknown",
    lockfile: detectLockfile(structure),
    dependencyLevel: "Minimal",
    dependencies: {},
    devDependencies: {},
  };
};


// Fetch a file from GitHub
const getFileContent = async (owner, repo, path) => {
  const apiUrl =
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "RepoMirror",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || `Failed to fetch ${path}`
    );
  }

  return Buffer.from(data.content, "base64").toString("utf-8");
};


// JavaScript / TypeScript dependencies
const analyzeNodeDependencies = (
  packageJsonContent,
  structure
) => {
  try {
    const packageJson = JSON.parse(packageJsonContent);

    const dependencies =
      packageJson.dependencies || {};

    const devDependencies =
      packageJson.devDependencies || {};

    const productionCount =
      Object.keys(dependencies).length;

    const developmentCount =
      Object.keys(devDependencies).length;

    const totalCount =
      productionCount + developmentCount;

    return {
      productionCount,
      developmentCount,
      totalCount,
      packageManager:
        detectPackageManager(packageJson),
      lockfile:
        detectLockfile(structure),
      dependencyLevel:
        getDependencyLevel(totalCount),
      dependencies,
      devDependencies,
    };
  } catch (error) {
    console.error(
      "Dependency analyzer error:",
      error.message
    );

    throw new Error("Invalid package.json");
  }
};


// Python dependencies
const analyzePythonDependencies = (
  content,
  structure
) => {
  const dependencies = [];

  const dependencySection = content.match(
    /\[project\][\s\S]*?dependencies\s*=\s*\[([\s\S]*?)\]/
  );

  if (dependencySection) {
    const matches =
      dependencySection[1].match(
        /["']([^"']+)["']/g
      );

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
    dependencyLevel:
      getDependencyLevel(totalCount),
    dependencies,
    devDependencies: {},
  };
};


// Build the structure information needed here
const buildStructure = (tree) => {
  const files = tree.filter(
    (item) => item.type === "blob"
  );

  const extensionCounts = {};

  files.forEach((file) => {
    const match = file.path.match(/(\.[^./]+)$/);

    if (match) {
      const extension =
        match[1].toLowerCase();

      extensionCounts[extension] =
        (extensionCounts[extension] || 0) + 1;
    }
  });

  return {
    extensionCounts,
  };
};


const detectPackageManager = (packageJson) => {
  if (packageJson.packageManager) {
    return packageJson.packageManager;
  }

  return "npm";
};


const detectLockfile = (structure) => {
  const extensions =
    structure.extensionCounts;

  return {
    detected:
      Boolean(extensions[".lock"]) ||
      Boolean(extensions[".yaml"]) ||
      Boolean(extensions[".yml"]),

    type: extensions[".lock"]
      ? "lockfile"
      : extensions[".yaml"] ||
        extensions[".yml"]
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