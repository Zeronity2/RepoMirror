function Features() {
  const features = [
    {
      number: "01",
      code: "STRUCT",
      title: "Repository Structure",
      description:
        "Understand how the codebase is organized, how large it is, and what file types make up the project.",
      signals: [
        "FILE COUNT",
        "FOLDER COUNT",
        "FILE TYPES",
      ],
      accent: "amber",
    },
    {
      number: "02",
      code: "HEALTH",
      title: "Project Health",
      description:
        "Get a clear health score based on documentation, testing, configuration, structure, and codebase signals.",
      signals: [
        "HEALTH SCORE",
        "GRADE",
        "BREAKDOWN",
      ],
      accent: "amber",
    },
    {
      number: "03",
      code: "DEPS",
      title: "Dependencies",
      description:
        "Inspect production and development dependencies, package managers, lockfiles, and dependency footprint.",
      signals: [
        "DEPENDENCIES",
        "DEV PACKAGES",
        "PACKAGE MANAGER",
      ],
      accent: "emerald",
    },
    {
      number: "04",
      code: "SEC",
      title: "Security Signals",
      description:
        "Detect potentially sensitive files and review repository configuration that can reduce accidental exposure.",
      signals: [
        "SENSITIVE FILES",
        "GITIGNORE",
        "RISK LEVEL",
      ],
      accent: "emerald",
    },
    {
      number: "05",
      code: "PRACTICE",
      title: "Engineering Practices",
      description:
        "Identify testing, documentation, CI/CD, containerization, configuration, and code-quality practices.",
      signals: [
        "TESTING",
        "CI/CD",
        "CODE QUALITY",
      ],
      accent: "amber",
    },
    {
      number: "06",
      code: "ADVICE",
      title: "Actionable Recommendations",
      description:
        "Turn detected gaps into practical recommendations based on the project's language and engineering setup.",
      signals: [
        "IMPROVEMENTS",
        "STRENGTHS",
        "NEXT STEPS",
      ],
      accent: "emerald",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-slate-800 bg-[#0a0e17]"
    >
      {/* Technical background */}
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-8 lg:py-28">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">

          <div className="lg:col-span-8">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-4 w-0.5 bg-amber-400" />

              <span className="technical-label text-amber-400">
                WHAT REPOMIRROR CHECKS
              </span>

            </div>

            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.035em] text-slate-100 sm:text-5xl lg:text-6xl">
              Every repository has
              <br />
              <span className="text-slate-500">
                signals worth understanding.
              </span>
            </h2>

          </div>

          <div className="lg:col-span-4 lg:pb-1">

            <p className="max-w-md text-sm leading-6 text-slate-500 lg:ml-auto">
              RepoMirror goes beyond a file listing. It combines repository
              structure and engineering signals into a readable technical
              overview.
            </p>

          </div>

        </div>

        {/* =====================================================
            FEATURE MATRIX
        ===================================================== */}

        <div className="grid border-l border-t border-slate-800 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {

            const accentClass =
              feature.accent === "emerald"
                ? "text-emerald-400"
                : "text-amber-400";

            const borderClass =
              feature.accent === "emerald"
                ? "bg-emerald-400"
                : "bg-amber-400";

            return (
              <article
                key={feature.number}
                className="group relative min-h-[330px] border-b border-r border-slate-800 bg-[#0f172a] p-6 transition-colors duration-200 hover:bg-[#111b2e] lg:p-7"
              >

                {/* Top technical row */}
                <div className="flex items-center justify-between">

                  <span className={`font-mono text-xs ${accentClass}`}>
                    {feature.number}
                  </span>

                  <span className="technical-label text-slate-600">
                    {feature.code}
                  </span>

                </div>

                {/* Accent line */}
                <div
                  className={`mt-7 h-px w-10 ${borderClass} transition-all duration-200 group-hover:w-16`}
                />

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-100">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

                {/* Signals */}
                <div className="absolute bottom-6 left-6 right-6 border-t border-slate-800 pt-4 lg:left-7 lg:right-7">

                  <div className="flex flex-wrap gap-x-5 gap-y-2">

                    {feature.signals.map((signal) => (
                      <div
                        key={signal}
                        className="flex items-center gap-2"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${borderClass}`}
                        />

                        <span className="font-mono text-[9px] tracking-wide text-slate-600">
                          {signal}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>

              </article>
            );
          })}

        </div>

        {/* =====================================================
            BOTTOM TECHNICAL STRIP
        ===================================================== */}

        <div className="mt-8 grid border border-slate-800 bg-[#0f172a] sm:grid-cols-3">

          <div className="border-b border-slate-800 p-5 sm:border-b-0 sm:border-r">

            <p className="technical-label text-slate-600">
              INPUT
            </p>

            <p className="mt-2 font-mono text-xs text-slate-300">
              PUBLIC GITHUB REPOSITORY
            </p>

          </div>

          <div className="border-b border-slate-800 p-5 sm:border-b-0 sm:border-r">

            <p className="technical-label text-slate-600">
              ANALYSIS
            </p>

            <p className="mt-2 font-mono text-xs text-slate-300">
              MULTI-SIGNAL SCAN
            </p>

          </div>

          <div className="p-5">

            <p className="technical-label text-slate-600">
              OUTPUT
            </p>

            <p className="mt-2 font-mono text-xs text-emerald-400">
              READABLE INSIGHTS
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Features;