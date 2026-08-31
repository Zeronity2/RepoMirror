function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-white/[0.03] to-blue-500/10 px-6 py-16 text-center sm:px-12">

        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
            Start analyzing
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            What's hiding inside your repository?
          </h2>

          <p className="mt-4 text-gray-400">
            Let RepoMirror take a closer look at your project and
            discover where it can be improved.
          </p>

          <button className="mt-8 rounded-lg bg-purple-500 px-7 py-3 text-sm font-medium transition hover:bg-purple-400">
            Analyze Your Repository →
          </button>
        </div>

      </div>
    </section>
  );
}

export default CTA;