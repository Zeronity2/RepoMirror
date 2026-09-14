const analyzeRecommendations = ({
  structure,
  dependencies,
  practices,
  security,
  projectType,
}) => {
  const recommendations = [];
  const strengths = [];

  const type = projectType?.type || "Unknown";

  // =========================
  // SECURITY
  // =========================

  if (security?.riskLevel === "High") {
    recommendations.push({
      severity: "High",
      category: "Security",
      message:
        `Detected ${security.sensitiveFiles.count} sensitive file(s). Verify that they do not contain secrets or credentials. Remove and rotate any exposed secrets immediately.`,
    });
  } else if (security?.riskLevel === "Medium") {
    recommendations.push({
      severity: "Medium",
      category: "Security",
      message:
        "No sensitive files were detected, but the repository is missing a .gitignore file. Add one to reduce the risk of accidentally committing sensitive files.",
    });
  } else {
    strengths.push("No major sensitive-file security risks detected.");
  }

  // =========================
  // DOCUMENTATION
  // =========================

  if (practices?.documentation?.readme) {
    strengths.push("README documentation is present.");
  } else {
    recommendations.push({
      severity: "Medium",
      category: "Documentation",
      message:
        "Add a README file explaining the project, setup instructions, usage, and contribution guidelines.",
    });
  }

  if (practices?.documentation?.license) {
    strengths.push("Project license is present.");
  } else {
    recommendations.push({
      severity: "Low",
      category: "Documentation",
      message:
        "Consider adding a LICENSE file to clearly define how others can use the project.",
    });
  }

  // =========================
  // TESTING
  // =========================

  if (practices?.testing?.hasTests) {
    strengths.push("Test files are present.");
  } else {
    recommendations.push({
      severity: "High",
      category: "Testing",
      message:
        "No test files were detected. Add automated tests to improve reliability and prevent regressions.",
    });
  }

  // =========================
  // CI/CD
  // =========================

  if (practices?.ciCd?.githubActions) {
    strengths.push("GitHub Actions CI/CD configuration is present.");
  } else {
    recommendations.push({
      severity: "Low",
      category: "CI/CD",
      message:
        "Consider adding GitHub Actions to automatically run tests and checks.",
    });
  }

  // =========================
  // CONFIGURATION
  // =========================

  if (!practices?.configuration?.envExample) {
    recommendations.push({
      severity: "Low",
      category: "Configuration",
      message:
        "Consider adding a .env.example file to document required environment variables safely.",
    });
  }

  if (practices?.configuration?.gitignore) {
    strengths.push(".gitignore is present.");
  } else {
    recommendations.push({
      severity: "Medium",
      category: "Configuration",
      message:
        "Add a .gitignore file to prevent generated files, dependencies, and sensitive configuration from being committed.",
    });
  }

  // =========================
  // CODE QUALITY
  // =========================

  // JavaScript / TypeScript only
  if (
    type === "Frontend" ||
    type === "Backend" ||
    type === "JavaScript / TypeScript"
  ) {
    if (!practices?.codeQuality?.eslint) {
      recommendations.push({
        severity: "Low",
        category: "Code Quality",
        message:
          "Consider adding ESLint to detect common JavaScript and TypeScript issues.",
      });
    } else {
      strengths.push("ESLint configuration is present.");
    }

    if (!practices?.codeQuality?.prettier) {
      recommendations.push({
        severity: "Low",
        category: "Code Quality",
        message:
          "Consider adding Prettier to maintain consistent code formatting.",
      });
    } else {
      strengths.push("Prettier configuration is present.");
    }
  }

  // Python only
  if (type === "Python") {
    if (!practices?.codeQuality?.ruff) {
      recommendations.push({
        severity: "Low",
        category: "Code Quality",
        message:
          "Consider adding Ruff for Python linting and code quality checks.",
      });
    } else {
      strengths.push("Ruff configuration is present.");
    }

    if (!practices?.codeQuality?.black) {
      recommendations.push({
        severity: "Low",
        category: "Code Quality",
        message:
          "Consider adding a Python formatter such as Black for consistent code formatting.",
      });
    } else {
      strengths.push("Python formatting configuration is present.");
    }
  }

  // Java only
  if (type === "Java") {
    if (!practices?.codeQuality?.checkstyle) {
      recommendations.push({
        severity: "Low",
        category: "Code Quality",
        message:
          "Consider adding Checkstyle to maintain consistent Java code quality and style.",
      });
    } else {
      strengths.push("Checkstyle configuration is present.");
    }
  }

  // Rust only
  if (type === "Rust") {
    if (!practices?.codeQuality?.clippy) {
      recommendations.push({
        severity: "Low",
        category: "Code Quality",
        message:
          "Consider using Clippy for Rust linting and code quality checks.",
      });
    } else {
      strengths.push("Clippy configuration is present.");
    }
  }

  // =========================
  // DEPENDENCIES
  // =========================

  if (dependencies?.totalCount > 150) {
    recommendations.push({
      severity: "Medium",
      category: "Dependencies",
      message:
        "The project has a large number of dependencies. Review them regularly and remove unnecessary packages.",
    });
  } else if (dependencies?.totalCount > 75) {
    recommendations.push({
      severity: "Low",
      category: "Dependencies",
      message:
        "The project has a moderate dependency footprint. Review dependencies periodically to keep the project maintainable.",
    });
  } else if (dependencies) {
    strengths.push("Dependency footprint is manageable.");
  }

  // =========================
  // RESULT
  // =========================

  return {
    totalRecommendations: recommendations.length,
    recommendations,
    strengths,
  };
};

module.exports = {
  analyzeRecommendations,
};