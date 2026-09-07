function Footer() {
  return (
    <footer
      id="docs"
      className="relative overflow-hidden bg-[#0a0e17]"
    >
      {/* Technical background */}
      <div className="technical-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-[1500px] px-5 lg:px-8">

        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="grid border-b border-slate-800 py-14 lg:grid-cols-12 lg:py-16">

          {/* Brand */}
          <div className="lg:col-span-6">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center border border-amber-500/50 bg-amber-500/5">
                <span className="font-mono text-lg font-bold text-amber-400">
                  R
                </span>
              </div>

              <div>
                <p className="font-semibold tracking-tight text-slate-100">
                  RepoMirror
                </p>

                <p className="technical-label mt-0.5 text-slate-600">
                  Repository Intelligence
                </p>
              </div>

            </div>

            <p className="mt-6 max-w-md text-sm leading-6 text-slate-500">
              A developer tool for turning GitHub repositories into
              readable engineering insights.
            </p>

          </div>

          {/* Navigation */}
          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:mt-0">

            <div>
              <p className="technical-label text-slate-600">
                PRODUCT
              </p>

              <div className="mt-5 space-y-3">

                <a
                  href="#analyze"
                  className="block text-sm text-slate-500 transition hover:text-slate-200"
                >
                  Analyze
                </a>

                <a
                  href="#features"
                  className="block text-sm text-slate-500 transition hover:text-slate-200"
                >
                  Features
                </a>

                <a
                  href="#how-it-works"
                  className="block text-sm text-slate-500 transition hover:text-slate-200"
                >
                  How it works
                </a>

              </div>
            </div>

            <div>
              <p className="technical-label text-slate-600">
                RESOURCES
              </p>

              <div className="mt-5 space-y-3">

                <a
                  href="#docs"
                  className="block text-sm text-slate-500 transition hover:text-slate-200"
                >
                  Documentation
                </a>

                <a
                  href="#analyze"
                  className="block text-sm text-slate-500 transition hover:text-slate-200"
                >
                  Repository Scanner
                </a>

              </div>
            </div>

            <div>
              <p className="technical-label text-slate-600">
                SOURCE
              </p>

              <div className="mt-5 space-y-3">

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-slate-500 transition hover:text-slate-200"
                >
                  GitHub
                </a>

                <a
                  href="#analyze"
                  className="block text-sm text-slate-500 transition hover:text-slate-200"
                >
                  Get Started
                </a>

              </div>
            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="font-mono text-[10px] tracking-wide text-slate-600">
            © 2026 REPOMIRROR
          </p>

          <div className="flex items-center gap-3">

            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

            <span className="font-mono text-[10px] tracking-wide text-slate-600">
              SYSTEM ONLINE
            </span>

          </div>

          <p className="font-mono text-[10px] tracking-wide text-slate-700">
            REPOSITORY INTELLIGENCE // v1.0
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;