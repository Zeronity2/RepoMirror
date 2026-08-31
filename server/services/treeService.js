const getRepositoryTree = async (owner, repo, branch) => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;

  console.log("Fetching tree:", apiUrl);

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "RepoMirror",
    },
  });

  console.log("Tree status:", response.status);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch repository tree");
  }

  return data.tree;
};

module.exports = {
  getRepositoryTree,
};