function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-[#0a0e17]">
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-20 lg:px-8 lg:py-28">

        <div className="relative overflow-hidden border border-slate-700 bg-[#0f172a]">

          {/* Amber accent line */}
          <div className="absolute left-0 right-0 top-0 h-px bg-amber-400" />

          <div className="grid lg:grid-cols-12">

            {/* Main CTA */}
            <div className="p-7 sm:p-10 lg:col-span-8 lg:p-14">

              <div className="flex items-center gap-3">

                <span className="h-4 w-0.5 bg-amber-400" />

                <span className="technical-label text-amber-400">
                  READY TO ANALYZE
                </span>

              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.035em] text-slate-100 sm:text-5xl lg:text-6xl">
                Make your next
                <br />
                <span className="text-slate-500">
                  repository readable.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-500 lg:text-base">
                Drop in a public GitHub repository and let RepoMirror
                turn its structure and engineering signals into a clear
                technical overview.
              </p>

              <a
                href="#analyze"
                className="mt-8 inline-flex items-center gap-3 bg-amber-400 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-wide text-[#0a0e17] transition hover:bg-amber-300"
              >
                ANALYZE A REPOSITORY

                <span className="text-base">
                  →
                </span>
              </a>

            </div>

            {/* Technical status panel */}
            <div className="border-t border-slate-800 lg:col-span-4 lg:border-l lg:border-t-0">

              <div className="h-full p-7 sm:p-10 lg:p-8">

                <div className="flex items-center justify-between">

                  <span className="technical-label text-slate-600">
                    REPOMIRROR
                  </span>

                  <span className="font-mono text-[10px] text-emerald-400">
                    ONLINE
                  </span>

                </div>

                <div className="mt-8 space-y-5">

                  <div className="border-b border-slate-800 pb-4">

                    <p className="technical-label text-slate-600">
                      INPUT
                    </p>

                    <p className="mt-2 font-mono text-xs text-slate-300">
                      GITHUB REPOSITORY
                    </p>

                  </div>

                  <div className="border-b border-slate-800 pb-4">

                    <p className="technical-label text-slate-600">
                      ENGINE
                    </p>

                    <p className="mt-2 font-mono text-xs text-slate-300">
                      REPOSITORY INTELLIGENCE
                    </p>

                  </div>

                  <div className="border-b border-slate-800 pb-4">

                    <p className="technical-label text-slate-600">
                      SIGNALS
                    </p>

                    <p className="mt-2 font-mono text-xs text-slate-300">
                      HEALTH / SECURITY / DEPS
                    </p>

                  </div>

                  <div>

                    <p className="technical-label text-slate-600">
                      OUTPUT
                    </p>

                    <p className="mt-2 font-mono text-xs text-emerald-400">
                      ACTIONABLE INSIGHTS
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom technical strip */}
          <div className="flex flex-col border-t border-slate-800 sm:flex-row sm:items-center sm:justify-between">

            <div className="px-7 py-4 sm:px-10">

              <p className="font-mono text-[10px] text-slate-600">
                REPOMIRROR // REPOSITORY INTELLIGENCE
              </p>

            </div>

            <div className="border-t border-slate-800 px-7 py-4 sm:border-l sm:border-t-0 sm:px-10">

              <p className="font-mono text-[10px] text-emerald-400">
                ● READY FOR INPUT
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CTA;