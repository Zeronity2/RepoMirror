const { getRepository } = require("../services/githubService");
const { getRepositoryTree } = require("../services/treeService");
const { analyzeStructure } = require("../analyzers/structureAnalyzer");
const { calculateHealth } = require("../analyzers/healthAnalyzer");
const { detectProjectType } = require("../analyzers/projectAnalyzer");
const { getFileContent } = require("../services/contentService");
const { analyzeDependencies } = require("../analyzers/dependencyAnalyzer");
const { analyzePractices } = require("../analyzers/practiceAnalyzer");
const { analyzeSecurity } = require("../analyzers/securityAnalyzer");
const {analyzeRecommendations,}= require("../analyzers/recommendationAnalyzer");

const analyzeRepository = async (req, res) => {
  const { repoUrl } = req.body;

  if (!repoUrl) {
    return res.status(400).json({
      message: "Repository URL is required",
    });
  }

  try {
    const repository = await getRepository(repoUrl);

    const tree = await getRepositoryTree(
      repository.owner.login,
      repository.name,
      repository.default_branch
    );

    const structure = analyzeStructure(tree);
    const health = calculateHealth(structure);
    const projectType = detectProjectType(repository, structure);
    const practices = analyzePractices(tree);
    const security = analyzeSecurity(tree);
   

    let dependencies = null;

if (structure.hasPackageJson) {
  const packageJsonContent = await getFileContent(
    repository.owner.login,
    repository.name,
    "package.json",
    repository.default_branch
  );

  dependencies = analyzeDependencies(packageJsonContent, structure);
}
const recommendations = analyzeRecommendations({
  structure,
  dependencies,
  practices,
  security,

});

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
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  analyzeRepository,
};