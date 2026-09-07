function HowItWorks() {
  const steps = [
    {
      number: "01",
      label: "INPUT",
      title: "Paste a repository",
      description:
        "Start with a public GitHub repository URL. No configuration or project setup is required.",
      command: "github.com/owner/repository",
    },
    {
      number: "02",
      label: "FETCH",
      title: "Inspect the codebase",
      description:
        "RepoMirror retrieves the repository structure and identifies the files, folders, configuration, and project signals.",
      command: "FETCH → STRUCTURE",
    },
    {
      number: "03",
      label: "ANALYZE",
      title: "Measure engineering signals",
      description:
        "The analysis engine evaluates health, dependencies, security, project type, and engineering practices.",
      command: "SCAN → ANALYZE",
    },
    {
      number: "04",
      label: "OUTPUT",
      title: "Read the results",
      description:
        "Get a focused technical overview with strengths, recommendations, and the signals that matter.",
      command: "REPORT → READY",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-slate-800 bg-[#0a0e17]"
    >
      {/* Technical background */}
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-25" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-8 lg:py-28">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">

          <div className="lg:col-span-7">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-4 w-0.5 bg-amber-400" />

              <span className="technical-label text-amber-400">
                HOW IT WORKS
              </span>

            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.035em] text-slate-100 sm:text-5xl lg:text-6xl">
              From URL
              <span className="text-slate-500">
                {" "}
                to intelligence.
              </span>
            </h2>

          </div>

          <div className="lg:col-span-5">

            <p className="max-w-lg text-sm leading-6 text-slate-500 lg:ml-auto">
              A simple input starts a structured repository scan.
              RepoMirror turns the resulting signals into information
              you can actually use.
            </p>

          </div>

        </div>

        {/* =====================================================
            PIPELINE
        ===================================================== */}

        <div className="relative mt-16">

          {/* Desktop connector */}
          <div className="absolute left-[12.5%] right-[12.5%] top-[38px] hidden h-px bg-slate-800 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative border border-slate-800 bg-[#0f172a] p-6 transition-colors hover:border-slate-700 lg:min-h-[300px]"
              >

                {/* Node */}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-amber-500/40 bg-[#0a0e17]">

                  <span className="font-mono text-xs font-semibold text-amber-400">
                    {step.number}
                  </span>

                </div>

                {/* Label */}
                <div className="mt-7 flex items-center justify-between">

                  <span className="technical-label text-amber-400">
                    {step.label}
                  </span>

                  {index < steps.length - 1 && (
                    <span className="hidden font-mono text-[10px] text-slate-700 lg:block">
                      →
                    </span>
                  )}

                </div>

                {/* Title */}
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-100">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>

                {/* Command */}
                <div className="absolute bottom-6 left-6 right-6 border-t border-slate-800 pt-4">

                  <p className="font-mono text-[9px] tracking-wide text-slate-600">
                    <span className="text-emerald-400">
                      $
                    </span>{" "}
                    {step.command}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* =====================================================
            PROCESS STATUS
        ===================================================== */}

        <div className="mt-8 flex flex-col border border-slate-800 bg-[#0f172a] sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4 px-5 py-4">

            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <div>

              <p className="technical-label text-slate-600">
                ANALYSIS PIPELINE
              </p>

              <p className="mt-1 font-mono text-xs text-slate-300">
                INPUT → FETCH → ANALYZE → OUTPUT
              </p>

            </div>

          </div>

          <div className="border-t border-slate-800 px-5 py-4 sm:border-l sm:border-t-0">

            <p className="font-mono text-[10px] text-emerald-400">
              ● SYSTEM READY
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;