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

  if (
    (hasJavaScript || hasTypeScript) &&
    repository.name &&
    (description.includes("react") ||
      description.includes("frontend") ||
      description.includes("web"))
  ) {
    return {
      type: "Frontend",
      confidence: "High",
    };
  }

  if (hasPython) {
    return {
      type: "Python",
      confidence: "High",
    };
  }

  if (hasJava) {
    return {
      type: "Java",
      confidence: "High",
    };
  }

  if (hasRust) {
    return {
      type: "Rust",
      confidence: "High",
    };
  }

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