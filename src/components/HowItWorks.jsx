const steps = [
  {
    number: "01",
    title: "Connect your repository",
    description:
      "Enter the URL of a public GitHub repository you want RepoMirror to analyze.",
  },
  {
    number: "02",
    title: "RepoMirror scans it",
    description:
      "Our analyzer examines your project structure, code quality, testing, documentation, and security.",
  },
  {
    number: "03",
    title: "Understand the results",
    description:
      "Get a clear health score with detailed insights into the strengths and weaknesses of your project.",
  },
  {
    number: "04",
    title: "Improve your project",
    description:
      "Follow actionable recommendations to make your codebase cleaner, safer, and easier to maintain.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-purple-400">
            How it works
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            From repository to insight.
          </h2>

          <p className="mt-4 text-gray-400">
            Four simple steps to understand what is happening inside
            your project.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-8 md:grid-cols-4">

          {/* Connecting line */}
          <div className="absolute left-[12%] right-[12%] top-6 hidden h-px bg-white/10 md:block" />

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/30 bg-[#05070d] text-sm font-semibold text-purple-400">
                {step.number}
              </div>

              <h3 className="mt-6 text-lg font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                {step.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;