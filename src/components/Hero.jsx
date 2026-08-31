function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-24">
      
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="mx-auto max-w-5xl text-center">

        {/* Small badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
          <span>✦</span>
          Analyze. Understand. Improve.
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          See your codebase
          <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            clearly.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          RepoMirror analyzes your GitHub repository and gives you
          actionable insights to improve code quality, security,
          maintainability, and more.
        </p>

        {/* Repository input */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:flex-row">
          
          <div className="flex flex-1 items-center gap-3 px-4">
            <span className="text-xl">◉</span>

            <input
              type="text"
              placeholder="https://github.com/username/repository"
              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-gray-600"
            />
          </div>

          <button className="rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium transition hover:bg-purple-400">
            Analyze Repository →
          </button>

        </div>

        {/* Trust points */}
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