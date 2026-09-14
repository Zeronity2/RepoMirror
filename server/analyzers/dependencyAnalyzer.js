const { parseGitHubUrl } = require("../services/githubService");

// =====================================================
// MAIN DEPENDENCY ANALYZER
// =====================================================

const analyzeDependencies = async (tree, repoUrl) => {
  if (!tree || !repoUrl) {
    return null;
  }

  const { owner, repo } = parseGitHubUrl(repoUrl);

  const paths = tree
    .filter((item) => item.type === "blob")
    .map((item) => item.path);

  const structure = buildStructure(tree);

  // ===================================================
  // JAVASCRIPT / TYPESCRIPT
  // ===================================================

  const packageJsonFiles = paths.filter(
    (path) => path.toLowerCase().endsWith("package.json")
  );

  if (packageJsonFiles.length > 0) {
    const rootPackage = packageJsonFiles.find(
      (path) => path.toLowerCase() === "package.json"
    );

    const rootContent = await getFileContent(
      owner,
      repo,
      rootPackage || packageJsonFiles[0]
    );

    const rootPackageJson = JSON.parse(rootContent);

    // Normal project
    if (!rootPackageJson.workspaces) {
      return analyzeNodeDependencies(
        rootContent,
        structure
      );
    }

    // Monorepo
    return analyzeNodeMonorepoDependencies(
      owner,
      repo,
      tree,
      rootPackageJson,
      structure
    );
  }

  // ===================================================
  // PYTHON
  // ===================================================

  if (
    paths.some(
      (path) =>
        path.toLowerCase() === "pyproject.toml"
    )
  ) {
    const content = await getFileContent(
      owner,
      repo,
      "pyproject.toml"
    );

    return analyzePythonDependencies(
      content,
      structure
    );
  }

  return {
    productionCount: 0,
    developmentCount: 0,
    totalCount: 0,
    packageManager: detectPackageManagerFromTree(
      paths
    ),
    lockfile: detectLockfile(paths),
    dependencyLevel: "Minimal",
    dependencies: {},
    devDependencies: {},
  };
};


// =====================================================
// FETCH FILE FROM GITHUB
// =====================================================

const getFileContent = async (
  owner,
  repo,
  path
) => {
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

  return Buffer.from(
    data.content,
    "base64"
  ).toString("utf-8");
};


// =====================================================
// NODE DEPENDENCIES
// =====================================================

const analyzeNodeDependencies = (
  packageJsonContent,
  structure
) => {
  try {
    const packageJson =
      JSON.parse(packageJsonContent);

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
        detectPackageManager(
          packageJson,
          structure
        ),

      lockfile:
        detectLockfile(
          structure.paths
        ),

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


// =====================================================
// NODE MONOREPO DEPENDENCIES
// =====================================================

const analyzeNodeMonorepoDependencies = async (
  owner,
  repo,
  tree,
  rootPackageJson,
  structure
) => {
  const packageFiles =
    getWorkspacePackageFiles(
      tree,
      rootPackageJson
    );

  const productionDependencies = {};
  const developmentDependencies = {};

  // Include root dependencies
  addDependencies(
    productionDependencies,
    rootPackageJson.dependencies || {}
  );

  addDependencies(
    developmentDependencies,
    rootPackageJson.devDependencies || {}
  );

  // Analyze workspace packages
  for (const packagePath of packageFiles) {
    try {
      const content = await getFileContent(
        owner,
        repo,
        packagePath
      );

      const packageJson =
        JSON.parse(content);

      addDependencies(
        productionDependencies,
        packageJson.dependencies || {}
      );

      addDependencies(
        developmentDependencies,
        packageJson.devDependencies || {}
      );

    } catch (error) {
      console.log(
        `Skipping invalid package file: ${packagePath}`
      );
    }
  }

  // If a package appears in both,
  // treat it as production.
  Object.keys(productionDependencies)
    .forEach((dependency) => {
      delete developmentDependencies[
        dependency
      ];
    });

  const productionCount =
    Object.keys(
      productionDependencies
    ).length;

  const developmentCount =
    Object.keys(
      developmentDependencies
    ).length;

  const totalCount =
    productionCount +
    developmentCount;

  return {
    productionCount,
    developmentCount,
    totalCount,

    packageManager:
      detectPackageManager(
        rootPackageJson,
        structure
      ),

    lockfile:
      detectLockfile(
        structure.paths
      ),

    dependencyLevel:
      getDependencyLevel(totalCount),

    dependencies:
      productionDependencies,

    devDependencies:
      developmentDependencies,
  };
};


// =====================================================
// WORKSPACE PACKAGE FILES
// =====================================================

const getWorkspacePackageFiles = (
  tree,
  packageJson
) => {
  const workspaces =
    Array.isArray(packageJson.workspaces)
      ? packageJson.workspaces
      : packageJson.workspaces?.packages || [];

  if (!workspaces.length) {
    return [];
  }

  const packageFiles = tree
    .filter(
      (item) =>
        item.type === "blob" &&
        item.path.toLowerCase().endsWith(
          "package.json"
        )
    )
    .map((item) => item.path)
    .filter(
      (path) =>
        path.toLowerCase() !== "package.json"
    );

  return packageFiles.filter((filePath) =>
    workspaces.some((pattern) =>
      matchesWorkspace(
        filePath,
        pattern
      )
    )
  );
};


// =====================================================
// WORKSPACE MATCHING
// =====================================================

const matchesWorkspace = (
  filePath,
  pattern
) => {
  const normalizedPath =
    filePath.replace(/\\/g, "/");

  const normalizedPattern =
    pattern
      .replace(/\\/g, "/")
      .replace(/^\.\//, "")
      .replace(/\/$/, "");

  // packages/*
  if (normalizedPattern.endsWith("/*")) {
    const prefix =
      normalizedPattern.slice(0, -2);

    const parts =
      normalizedPath.split("/");

    return (
      normalizedPath.startsWith(
        `${prefix}/`
      ) &&
      parts.length ===
        prefix.split("/").length + 2 &&
      normalizedPath.endsWith(
        "/package.json"
      )
    );
  }

  // packages/**
  if (normalizedPattern.endsWith("/**")) {
    const prefix =
      normalizedPattern.slice(0, -3);

    return (
      normalizedPath.startsWith(
        `${prefix}/`
      ) &&
      normalizedPath.endsWith(
        "/package.json"
      )
    );
  }

  return (
    normalizedPath ===
    `${normalizedPattern}/package.json`
  );
};


// =====================================================
// ADD DEPENDENCIES
// =====================================================

const addDependencies = (
  target,
  dependencies
) => {
  Object.entries(dependencies)
    .forEach(([name, version]) => {
      target[name] = version;
    });
};


// =====================================================
// PYTHON DEPENDENCIES
// =====================================================

const analyzePythonDependencies = (
  content,
  structure
) => {
  const dependencies = [];

  const dependencySection =
    content.match(
      /\[project\][\s\S]*?dependencies\s*=\s*\[([\s\S]*?)\]/
    );

  if (dependencySection) {
    const matches =
      dependencySection[1].match(
        /["']([^"']+)["']/g
      );

    if (matches) {
      matches.forEach(
        (dependency) => {
          dependencies.push(
            dependency.replace(
              /^["']|["']$/g,
              ""
            )
          );
        }
      );
    }
  }

  const totalCount =
    dependencies.length;

  return {
    productionCount:
      totalCount,

    developmentCount: 0,

    totalCount,

    packageManager: "pip",

    lockfile:
      detectLockfile(
        structure.paths
      ),

    dependencyLevel:
      getDependencyLevel(
        totalCount
      ),

    dependencies,

    devDependencies: {},
  };
};


// =====================================================
// BUILD STRUCTURE
// =====================================================

const buildStructure = (tree) => {
  const files = tree.filter(
    (item) =>
      item.type === "blob"
  );

  const extensionCounts = {};

  files.forEach((file) => {
    const match =
      file.path.match(
        /(\.[^./]+)$/
      );

    if (match) {
      const extension =
        match[1].toLowerCase();

      extensionCounts[extension] =
        (extensionCounts[extension] || 0) + 1;
    }
  });

  return {
    extensionCounts,
    paths: files.map(
      (file) => file.path
    ),
  };
};


// =====================================================
// PACKAGE MANAGER
// =====================================================

const detectPackageManager = (
  packageJson,
  structure
) => {
  if (packageJson.packageManager) {
    return packageJson.packageManager;
  }

  return detectPackageManagerFromTree(
    structure.paths
  );
};


const detectPackageManagerFromTree = (
  paths
) => {
  const lowerPaths =
    paths.map((path) =>
      path.toLowerCase()
    );

  if (
    lowerPaths.includes(
      "pnpm-lock.yaml"
    )
  ) {
    return "pnpm";
  }

  if (
    lowerPaths.includes(
      "yarn.lock"
    )
  ) {
    return "yarn";
  }

  if (
    lowerPaths.includes(
      "bun.lock"
    ) ||
    lowerPaths.includes(
      "bun.lockb"
    )
  ) {
    return "bun";
  }

  if (
    lowerPaths.includes(
      "package-lock.json"
    )
  ) {
    return "npm";
  }

  return "npm";
};


// =====================================================
// LOCKFILE
// =====================================================

const detectLockfile = (
  paths
) => {
  if (!paths) {
    return {
      detected: false,
      type: "Not detected",
    };
  }

  const lowerPaths =
    paths.map((path) =>
      path.toLowerCase()
    );

  if (
    lowerPaths.includes(
      "package-lock.json"
    )
  ) {
    return {
      detected: true,
      type: "package-lock.json",
    };
  }

  if (
    lowerPaths.includes(
      "yarn.lock"
    )
  ) {
    return {
      detected: true,
      type: "yarn.lock",
    };
  }

  if (
    lowerPaths.includes(
      "pnpm-lock.yaml"
    )
  ) {
    return {
      detected: true,
      type: "pnpm-lock.yaml",
    };
  }

  if (
    lowerPaths.includes(
      "bun.lock"
    ) ||
    lowerPaths.includes(
      "bun.lockb"
    )
  ) {
    return {
      detected: true,
      type: "bun.lock",
    };
  }

  if (
    lowerPaths.includes(
      "poetry.lock"
    )
  ) {
    return {
      detected: true,
      type: "poetry.lock",
    };
  }

  if (
    lowerPaths.includes(
      "pipfile.lock"
    )
  ) {
    return {
      detected: true,
      type: "Pipfile.lock",
    };
  }

  if (
    lowerPaths.includes(
      "uv.lock"
    )
  ) {
    return {
      detected: true,
      type: "uv.lock",
    };
  }

  return {
    detected: false,
    type: "Not detected",
  };
};


// =====================================================
// DEPENDENCY LEVEL
// =====================================================

const getDependencyLevel = (
  totalCount
) => {
  if (totalCount >= 100) {
    return "High";
  }

  if (totalCount >= 50) {
    return "Medium";
  }

  if (totalCount >= 20) {
    return "Low";
  }

  return "Minimal";
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  analyzeDependencies,
};