import { useState } from "react";
import { analyzeRepository } from "../services/api";
import repoHero from "../assets/repo-hero.png";

function Hero({ onAnalysis }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (url = repoUrl) => {
    const value = url.trim();

    if (!value) {
      setError("Enter a GitHub repository URL.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await analyzeRepository(value);
      onAnalysis(data);
    } catch (err) {
      setError(err.message || "Unable to analyze repository.");
    } finally {
      setLoading(false);
    }
  };

  const examples = [
    "https://github.com/facebook/react",
    "https://github.com/expressjs/express",
    "https://github.com/psf/requests",
  ];

  return (
    <section
      id="analyze"
      className="relative overflow-hidden border-b border-slate-800 bg-[#0a0e17]"
    >
      {/* Technical background */}
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-[1500px] px-5 py-16 lg:px-8 lg:py-24">

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* =====================================================
              LEFT — HERO CONTENT
          ===================================================== */}

          <div className="lg:col-span-7">

            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">

              <span className="h-4 w-0.5 bg-amber-400" />

              <span className="technical-label text-amber-400">
                OPEN SOURCE INTELLIGENCE
              </span>

            </div>

            {/* Main heading */}
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-slate-100 sm:text-6xl lg:text-7xl">
              Open source
              <br />
              <span className="text-slate-400">
                made readable.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-400 lg:text-lg">
              RepoMirror analyzes GitHub repositories and turns complex
              codebases into clear insights about structure, health,
              dependencies, security, and engineering practices.
            </p>

            {/* =================================================
                REPOSITORY INPUT
            ================================================= */}

            <div className="mt-9 max-w-3xl">

              <div className="flex flex-col border border-slate-700 bg-[#0f172a] transition-colors focus-within:border-amber-500/50 sm:flex-row">

                {/* Terminal symbol */}
                <div className="flex items-center border-b border-slate-700 sm:border-b-0">

                  <span className="px-4 font-mono text-sm text-amber-400">
                    $
                  </span>

                </div>

                {/* Input */}
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => {
                    setRepoUrl(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAnalyze();
                    }
                  }}
                  placeholder="https://github.com/owner/repository"
                  className="h-14 min-w-0 flex-1 bg-transparent px-1 pr-4 font-mono text-sm text-slate-200 outline-none placeholder:text-slate-600"
                />

                {/* Analyze button */}
                <button
                  type="button"
                  onClick={() => handleAnalyze()}
                  disabled={loading}
                  className="h-14 border-t border-slate-700 bg-amber-400 px-7 font-mono text-xs font-semibold uppercase tracking-wide text-[#0a0e17] transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60 sm:border-l sm:border-t-0"
                >
                  {loading ? "ANALYZING..." : "ANALYZE REPOSITORY"}
                </button>

              </div>

              {/* Error */}
              {error && (
                <div className="mt-3 border border-red-500/20 bg-red-500/5 px-4 py-3">

                  <p className="font-mono text-xs text-red-400">
                    ERROR :: {error}
                  </p>

                </div>
              )}

              {/* Example repositories */}
              <div className="mt-4 flex flex-wrap items-center gap-2">

                <span className="technical-label mr-1 text-slate-600">
                  TRY:
                </span>

                {examples.map((example) => {
                  const shortName = example.replace(
                    "https://github.com/",
                    ""
                  );

                  return (
                    <button
                      key={example}
                      type="button"
                      onClick={() => {
                        setRepoUrl(example);
                        handleAnalyze(example);
                      }}
                      className="border border-slate-800 bg-[#0a0e17] px-3 py-1.5 font-mono text-[10px] text-slate-500 transition hover:border-amber-500/40 hover:text-amber-400"
                    >
                      {shortName}
                    </button>
                  );
                })}

              </div>

            </div>

            {/* =================================================
                TELEMETRY
            ================================================= */}

            <div className="mt-10 grid max-w-2xl grid-cols-3 border-y border-slate-800">

              <div className="py-5 pr-5">

                <p className="technical-label text-slate-600">
                  INPUT
                </p>

                <p className="mt-2 font-mono text-xs text-slate-300">
                  GITHUB URL
                </p>

              </div>

              <div className="border-x border-slate-800 px-5 py-5">

                <p className="technical-label text-slate-600">
                  ENGINE
                </p>

                <p className="mt-2 font-mono text-xs text-slate-300">
                  REPOSITORY SCAN
                </p>

              </div>

              <div className="py-5 pl-5">

                <p className="technical-label text-slate-600">
                  OUTPUT
                </p>

                <p className="mt-2 font-mono text-xs text-emerald-400">
                  ACTIONABLE
                </p>

              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT — HERO IMAGE
          ===================================================== */}

          <div className="relative -mt-4 lg:col-span-5 lg:-mt-12">

            {/* Amber atmosphere */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl" />

            {/* Hero image */}
            <div className="relative flex items-center justify-center">

              <img
                src={repoHero}
                alt="GitHub repository analysis visualization"
                className="w-[115%] max-w-none translate-x-4 -translate-y-8 scale-[1.05] object-contain"
              />

            </div>

            {/* Technical status label */}
            <div className="absolute bottom-2 left-2 hidden border border-slate-800 bg-[#0a0e17] px-3 py-2 lg:block">

              <p className="technical-label text-slate-600">
                REPOSITORY ANALYSIS
              </p>

              <p className="mt-1 font-mono text-[9px] text-emerald-400">
                SYSTEM READY
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom technical line */}
      <div className="relative mx-auto hidden h-px max-w-[1500px] bg-slate-800 lg:block" />

    </section>
  );
}

export default Hero;