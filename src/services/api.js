const API_BASE_URL = "http://localhost:5000/api";

export const analyzeRepository = async (repoUrl) => {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repoUrl }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to analyze repository");
  }

  return data;
};