const detectProjectType = (repository, structure) => {
  const extensions = structure.extensionCounts;

  const hasJavaScript =
    extensions[".js"] ||
    extensions[".jsx"] ||
    extensions[".mjs"];

  const hasTypeScript =
    extensions[".ts"] ||
    extensions[".tsx"];

  const hasPython = extensions[".py"];
  const hasJava = extensions[".java"];
  const hasRust = extensions[".rs"];

  const description = (repository.description || "").toLowerCase();
  const repoName = (repository.name || "").toLowerCase();

  // React / Frontend detection
  if (
    description.includes("react") ||
    repoName.includes("react") ||
    extensions[".jsx"] ||
    extensions[".tsx"]
  ) {
    return {
      type: "Frontend",
      confidence: "High",
    };
  }

  // Backend / Node.js detection
  if (
    (hasJavaScript || hasTypeScript) &&
    (
      description.includes("server") ||
      description.includes("backend") ||
      description.includes("api") ||
      description.includes("node") ||
      repoName.includes("express")
    )
  ) {
    return {
      type: "Backend",
      confidence: "High",
    };
  }

  // Python
  if (hasPython) {
    return {
      type: "Python",
      confidence: "High",
    };
  }

  // Java
  if (hasJava) {
    return {
      type: "Java",
      confidence: "High",
    };
  }

  // Rust
  if (hasRust) {
    return {
      type: "Rust",
      confidence: "High",
    };
  }

  // Generic JavaScript / TypeScript
  if (hasJavaScript || hasTypeScript) {
    return {
      type: "JavaScript / TypeScript",
      confidence: "Medium",
    };
  }

  return {
    type: "Unknown",
    confidence: "Low",
  };
};

module.exports = {
  detectProjectType,
};