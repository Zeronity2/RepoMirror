const features = [
  {
    icon: "🧹",
    title: "Code Quality",
    description:
      "Identify large files, complex code, TODOs, and potential maintainability issues.",
  },
  {
    icon: "🔐",
    title: "Security",
    description:
      "Detect common security risks and accidentally exposed sensitive information.",
  },
  {
    icon: "🧪",
    title: "Testing",
    description:
      "Check whether your project has tests and understand where testing can be improved.",
  },
  {
    icon: "🏗️",
    title: "Architecture",
    description:
      "Understand your project structure and identify architectural weaknesses.",
  },
  {
    icon: "📚",
    title: "Documentation",
    description:
      "Evaluate README quality and discover missing documentation that affects usability.",
  },
  {
    icon: "🤖",
    title: "AI Recommendations",
    description:
      "Get practical recommendations explaining what to improve and why it matters.",
  },
];

function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
            What RepoMirror checks
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Understand every part of your project.
          </h2>

          <p className="mt-4 text-gray-400">
            RepoMirror looks beyond individual lines of code to
            understand the overall health of your software project.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.05]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Features;