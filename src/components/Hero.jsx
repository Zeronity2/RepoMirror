import { useState } from "react";
import { analyzeRepository } from "../services/api";

function Hero() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await analyzeRepository(repoUrl);
      console.log("Analysis result:", JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-24">
      
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="mx-auto max-w-5xl text-center">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
          <span>✦</span>
          Analyze. Understand. Improve.
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          See your codebase
          <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            clearly.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          RepoMirror analyzes your GitHub repository and gives you
          actionable insights to improve code quality, security,
          maintainability, and more.
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:flex-row">
          
          <div className="flex flex-1 items-center gap-3 px-4">
            <span className="text-xl">◉</span>

            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAnalyze();
                }
              }}
              placeholder="https://github.com/username/repository"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-600"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Repository →"}
          </button>

        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span>🛡️ Secure</span>
          <span>🔒 Your code stays private</span>
          <span>⚡ No installation needed</span>
        </div>

      </div>
    </section>
  );
}

export default Hero;