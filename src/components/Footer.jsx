function Footer() {
  return (
    <footer id="github" className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
              ◈
            </div>

            <span className="font-semibold">
              RepoMirror
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-600">
            See your codebase clearly.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>
        </div>

      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/5 pt-6 text-center text-xs text-gray-600">
        © 2026 RepoMirror. Built to understand better software.
      </div>
    </footer>
  );
}

export default Footer;