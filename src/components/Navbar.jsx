function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 bg-[#05070d]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400">
            ◈
          </div>

          <span className="text-xl font-semibold tracking-tight">
            RepoMirror
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>

          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>

          <a href="#github" className="transition hover:text-white">
            GitHub
          </a>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button className="hidden text-sm text-gray-400 transition hover:text-white sm:block">
            Sign in
          </button>

          <button className="rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-medium transition hover:bg-purple-400">
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;