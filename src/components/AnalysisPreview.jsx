function AnalysisPreview() {
  return (
    <section className="relative border-b border-slate-800 bg-[#0a0e17]">
      
      {/* Technical background */}
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-8 lg:py-28">

        {/* Section heading */}
        <div className="mb-10 flex items-end justify-between gap-8">

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-4 w-0.5 bg-amber-400" />

              <span className="technical-label text-amber-400">
                ANALYSIS PREVIEW
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
              From repository
              <span className="text-slate-500"> to readable signals.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
              RepoMirror scans the repository and organizes the important
              engineering signals into one technical overview.
            </p>
          </div>

          <div className="hidden text-right lg:block">
            <p className="technical-label text-slate-600">
              SAMPLE OUTPUT
            </p>

            <p className="mt-2 font-mono text-xs text-emerald-400">
              ANALYSIS READY
            </p>
          </div>

        </div>

        {/* =====================================================
            MAIN ANALYSIS PANEL
        ===================================================== */}

        <div className="technical-panel overflow-hidden">

          {/* Panel header */}
          <div className="flex flex-col gap-4 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="technical-label text-slate-600">
                REPOSITORY
              </p>

              <p className="mt-1 font-mono text-sm text-slate-200">
                github.com/facebook/react
              </p>
            </div>

            <div className="flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="technical-label text-emerald-400">
                ANALYSIS COMPLETE
              </span>

            </div>

          </div>

          {/* =================================================
              TOP METRICS
          ================================================= */}

          <div className="grid grid-cols-2 border-b border-slate-800 lg:grid-cols-4">

            <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r">
              <p className="technical-label text-slate-600">
                HEALTH
              </p>

              <p className="telemetry-number mt-3 text-3xl text-amber-400">
                100
              </p>

              <p className="mt-1 font-mono text-[10px] text-slate-600">
                / 100
              </p>
            </div>

            <div className="border-b border-slate-800 p-5 lg:border-b-0 lg:border-r">
              <p className="technical-label text-slate-600">
                FILES
              </p>

              <p className="telemetry-number mt-3 text-3xl text-slate-100">
                7,213
              </p>

              <p className="mt-1 font-mono text-[10px] text-slate-600">
                DETECTED
              </p>
            </div>

            <div className="border-r border-slate-800 p-5">
              <p className="technical-label text-slate-600">
                DEPENDENCIES
              </p>

              <p className="telemetry-number mt-3 text-3xl text-slate-100">
                113
              </p>

              <p className="mt-1 font-mono text-[10px] text-slate-600">
                PACKAGES
              </p>
            </div>

            <div className="p-5">
              <p className="technical-label text-slate-600">
                SECURITY
              </p>

              <p className="telemetry-number mt-3 text-3xl text-emerald-400">
                LOW
              </p>

              <p className="mt-1 font-mono text-[10px] text-slate-600">
                RISK LEVEL
              </p>
            </div>

          </div>

          {/* =================================================
              LOWER GRID
          ================================================= */}

          <div className="grid lg:grid-cols-12">

            {/* Health breakdown */}
            <div className="border-b border-slate-800 p-6 lg:col-span-7 lg:border-b-0 lg:border-r">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <p className="technical-label text-slate-600">
                    HEALTH SIGNALS
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-slate-200">
                    Engineering quality
                  </h3>
                </div>

                <span className="font-mono text-xs text-amber-400">
                  100%
                </span>

              </div>

              <div className="space-y-5">

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      DOCUMENTATION
                    </span>

                    <span className="font-mono text-xs text-slate-500">
                      20/20
                    </span>
                  </div>

                  <div className="h-1 bg-slate-800">
                    <div className="h-full w-full bg-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      TESTING
                    </span>

                    <span className="font-mono text-xs text-slate-500">
                      20/20
                    </span>
                  </div>

                  <div className="h-1 bg-slate-800">
                    <div className="h-full w-full bg-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      STRUCTURE
                    </span>

                    <span className="font-mono text-xs text-slate-500">
                      20/20
                    </span>
                  </div>

                  <div className="h-1 bg-slate-800">
                    <div className="h-full w-full bg-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      CONFIGURATION
                    </span>

                    <span className="font-mono text-xs text-slate-500">
                      20/20
                    </span>
                  </div>

                  <div className="h-1 bg-slate-800">
                    <div className="h-full w-full bg-amber-400" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between">
                    <span className="font-mono text-xs text-slate-400">
                      CODEBASE
                    </span>

                    <span className="font-mono text-xs text-slate-500">
                      20/20
                    </span>
                  </div>

                  <div className="h-1 bg-slate-800">
                    <div className="h-full w-full bg-amber-400" />
                  </div>
                </div>

              </div>

            </div>

            {/* Project classification */}
            <div className="p-6 lg:col-span-5">

              <p className="technical-label text-slate-600">
                PROJECT DETECTION
              </p>

              <h3 className="mt-2 text-lg font-semibold text-slate-200">
                Frontend
              </h3>

              <div className="mt-6 border border-slate-800 bg-[#0a0e17] p-5">

                <div className="flex items-center justify-between">

                  <span className="font-mono text-xs text-slate-500">
                    CONFIDENCE
                  </span>

                  <span className="font-mono text-xs text-emerald-400">
                    HIGH
                  </span>

                </div>

                <div className="mt-5 h-1 bg-slate-800">
                  <div className="h-full w-[92%] bg-emerald-400" />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="border border-slate-800 p-3">
                    <p className="technical-label text-slate-600">
                      TYPE
                    </p>

                    <p className="mt-2 font-mono text-xs text-slate-300">
                      REACT
                    </p>
                  </div>

                  <div className="border border-slate-800 p-3">
                    <p className="technical-label text-slate-600">
                      STATUS
                    </p>

                    <p className="mt-2 font-mono text-xs text-emerald-400">
                      DETECTED
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              FOOTER SIGNALS
          ================================================= */}

          <div className="grid border-t border-slate-800 sm:grid-cols-3">

            <div className="border-b border-slate-800 p-5 sm:border-b-0 sm:border-r">

              <p className="technical-label text-slate-600">
                STRUCTURE
              </p>

              <p className="mt-2 font-mono text-sm text-emerald-400">
                DETECTED
              </p>

            </div>

            <div className="border-b border-slate-800 p-5 sm:border-b-0 sm:border-r">

              <p className="technical-label text-slate-600">
                SECURITY
              </p>

              <p className="mt-2 font-mono text-sm text-emerald-400">
                LOW RISK
              </p>

            </div>

            <div className="p-5">

              <p className="technical-label text-slate-600">
                RECOMMENDATIONS
              </p>

              <p className="mt-2 font-mono text-sm text-amber-400">
                AVAILABLE
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AnalysisPreview;