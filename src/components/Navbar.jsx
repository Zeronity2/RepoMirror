function Navbar() {
  return (
    <header className="border-b border-slate-800/80 bg-[#0a0e17]/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-amber-500/50 bg-amber-500/5">
            <span className="font-mono text-lg font-bold text-amber-400">
              R
            </span>
          </div>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
              RepoMirror
            </h1>

            <p className="technical-label hidden text-slate-500 sm:block">
              Repository Intelligence
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#analyze"
            className="relative py-5 text-sm font-medium text-slate-100"
          >
            Analyze

            <span className="absolute bottom-0 left-0 h-px w-full bg-amber-400" />
          </a>

          <a
            href="#features"
            className="py-5 text-sm text-slate-400 transition hover:text-slate-100"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="py-5 text-sm text-slate-400 transition hover:text-slate-100"
          >
            How it works
          </a>

        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-white sm:flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.08.78 2.18v3.24c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>

            GitHub
          </a>

          {/* Status indicator */}
          <div
            className="h-2 w-2 rounded-full bg-emerald-400"
            title="RepoMirror online"
          />

          {/* Mobile menu indicator */}
          <button
            type="button"
            className="rounded-md border border-slate-700 px-3 py-2 text-xs text-slate-400 md:hidden"
          >
            MENU
          </button>

        </div>

      </div>
    </header>
  );
}

export default Navbar;