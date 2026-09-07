const { getRepository } = require("../services/githubService");
const { getRepositoryTree } = require("../services/treeService");

const { analyzeStructure } = require("../analyzers/structureAnalyzer");
const { calculateHealth } = require("../analyzers/healthAnalyzer");
const { detectProjectType } = require("../analyzers/projectAnalyzer");
const { analyzeDependencies } = require("../analyzers/dependencyAnalyzer");
const { analyzePractices } = require("../analyzers/practiceAnalyzer");
const { analyzeSecurity } = require("../analyzers/securityAnalyzer");
const { analyzeRecommendations } = require("../analyzers/recommendationAnalyzer");

const analyzeRepository = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl) {
      return res.status(400).json({
        message: "Repository URL is required.",
      });
    }

    // Get repository information
    const repository = await getRepository(repoUrl);

    // Get repository file tree
    const tree = await getRepositoryTree(
  repository.owner.login,
  repository.name,
  repository.default_branch
);

    // Analyze repository structure
    const structure = analyzeStructure(tree);

    // Calculate health score
    const health = calculateHealth(structure);

    // Detect project type
    const projectType = detectProjectType(
  repository,
  structure
);

    // Analyze dependencies
    const dependencies = await analyzeDependencies(
      tree,
      repoUrl
    );

    // Analyze engineering practices
    const practices = analyzePractices(
      tree,
      projectType
    );

    // Analyze security
    const security = analyzeSecurity(tree);

    // Generate recommendations
    const recommendations = analyzeRecommendations({
  structure,
  dependencies,
  practices,
  security,
  projectType,
});

return res.status(200).json({
  repository,
  structure,
  health,
  projectType,
  dependencies,
  practices,
  security,
  recommendations,
});

    return res.status(200).json({
      repository,
      structure,
      health,
      projectType,
      dependencies,
      practices,
      security,
      recommendations,
    });

  } catch (error) {
    console.error("Analysis error:", error);

    return res.status(500).json({
      message:
        error.message || "Failed to analyze repository.",
    });
  }
};

module.exports = {
  analyzeRepository,
};