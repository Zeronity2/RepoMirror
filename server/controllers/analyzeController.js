const { getRepository } = require("../services/githubService");
const { getRepositoryTree } = require("../services/treeService");
const { analyzeStructure } = require("../analyzers/structureAnalyzer");
const { calculateHealth } = require("../analyzers/healthAnalyzer");
const { detectProjectType } = require("../analyzers/projectAnalyzer");
const { getFileContent } = require("../services/contentService");
const { analyzeDependencies } = require("../analyzers/dependencyAnalyzer");
const { analyzePractices } = require("../analyzers/practiceAnalyzer");
const { analyzeSecurity } = require("../analyzers/securityAnalyzer");
const {
  analyzeRecommendations,
} = require("../analyzers/recommendationAnalyzer");

const analyzeRepository = async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({
      message: "Repository URL is required",
    });
  }

  try {
    // Get repository information
    const repository = await getRepository(repoUrl);

    // Get complete repository tree
    const tree = await getRepositoryTree(
      repository.owner.login,
      repository.name,
      repository.default_branch
    );

    // Analyze repository structure
    const structure = analyzeStructure(tree);

    // Detect project type
    const projectType = detectProjectType(repository, structure);

    // Analyze repository health
    const health = calculateHealth(structure);

    // Analyze engineering practices
    const practices = analyzePractices(tree);

    // Analyze security
    const security = analyzeSecurity(tree);

    // Analyze dependencies
    let dependencies = null;

    const files = tree
      .filter((item) => item.type === "blob")
      .map((item) => item.path);

    // JavaScript / TypeScript
    if (structure.hasPackageJson) {
      const packageJsonContent = await getFileContent(
        repository.owner.login,
        repository.name,
        "package.json",
        repository.default_branch
      );

      dependencies = analyzeDependencies(
        packageJsonContent,
        structure,
        projectType.type
      );
    }

    // Python
    else if (projectType.type === "Python") {
      const requirementsFile = files.find(
        (file) => file.toLowerCase() === "requirements.txt"
      );

      const pyprojectFile = files.find(
        (file) => file.toLowerCase() === "pyproject.toml"
      );

      const pipfile = files.find(
        (file) => file.toLowerCase() === "pipfile"
      );

      const dependencyFile =
        requirementsFile || pyprojectFile || pipfile;

      if (dependencyFile) {
        const dependencyContent = await getFileContent(
          repository.owner.login,
          repository.name,
          dependencyFile,
          repository.default_branch
        );

        dependencies = analyzeDependencies(
          dependencyContent,
          structure,
          projectType.type
        );
      }
    }

    // Generate recommendations
    const recommendations = analyzeRecommendations({
      structure,
      dependencies,
      practices,
      security,
      projectType,
    });

    // Send final analysis response
    res.json({
      message: "Repository analyzed successfully",

      repository: {
        name: repository.name,
        owner: repository.owner.login,
        fullName: repository.full_name,
        description: repository.description,
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        language: repository.language,
        visibility: repository.visibility,
        defaultBranch: repository.default_branch,
      },

      structure,
      health,
      projectType,
      dependencies,
      practices,
      security,
      recommendations,
    });
  } catch (error) {
    console.error("Repository analysis error:", error.message);

    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeRepository,
};