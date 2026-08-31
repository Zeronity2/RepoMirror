const parseGitHubUrl = (repoUrl) => {
  try {
    const url = new URL(repoUrl);


    if (url.hostname !== "github.com") {
      throw new Error("Only GitHub repository URLs are supported");
    }

    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      throw new Error("Invalid GitHub repository URL");
    }

    return {
      owner: parts[0],
      repo: parts[1].replace(".git", ""),
    };
  } catch {
    throw new Error("Invalid GitHub repository URL");
  }
};

const getRepository = async (repoUrl) => {
  const { owner, repo } = parseGitHubUrl(repoUrl);

  console.log("Parsed repository:", { owner, repo });

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

  console.log("Fetching:", apiUrl);

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "RepoMirror",
      },
    });

    console.log("GitHub status:", response.status);

    const data = await response.json();
    

    if (!response.ok) {
      console.log("GitHub response:", data);

      if (response.status === 404) {
        throw new Error("Repository not found");
      }

      if (response.status === 401) {
        throw new Error("GitHub authentication failed");
      }

      if (response.status === 403) {
        throw new Error("GitHub API rate limit exceeded");
      }

      throw new Error(data.message || "GitHub API request failed");
    }

    return data;
  } catch (error) {
    console.error("GitHub API error:", error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  parseGitHubUrl,
  getRepository,
};