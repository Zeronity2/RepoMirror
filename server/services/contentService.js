const getFileContent = async (owner, repo, path, branch) => {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

  console.log("Fetching file:", apiUrl);

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
    throw new Error(data.message || "Failed to fetch file");
  }

  if (!data.content) {
    throw new Error("File content not available");
  }

  return Buffer.from(data.content, "base64").toString("utf-8");
};

module.exports = {
  getFileContent,
};