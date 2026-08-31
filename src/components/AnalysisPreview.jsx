function AnalysisPreview() {
  const metrics = [
    { name: "Code Quality", score: 84 },
    { name: "Security", score: 91 },
    { name: "Testing", score: 52 },
    { name: "Documentation", score: 87 },
  ];

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl">

          {/* Header */}
          <div className="flex flex-col gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Repository Analysis
              </p>

              <p className="mt-1 text-sm text-gray-300">
                github.com/user/project
              </p>
            </div>

            <span className="w-fit rounded-full bg-green-400/10 px-3 py-1 text-xs font-medium text-green-400">
              ● Healthy
            </span>
          </div>

          {/* Score */}
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[180px_1fr] md:items-center">

            <div className="text-center">
              <div className="text-6xl font-bold">
                82
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Overall Health
              </p>

              <p className="text-xs text-gray-600">
                out of 100
              </p>
            </div>

            {/* Metrics */}
            <div className="space-y-5">
              {metrics.map((metric) => (
                <div key={metric.name}>

                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-gray-400">
                      {metric.name}
                    </span>

                    <span className="text-gray-300">
                      {metric.score}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-400"
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Recommendation */}
          <div className="border-t border-white/10 px-6 py-5">
            <div className="flex items-start gap-3">

              <div className="mt-0.5">
                ⚠️
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  3 improvements recommended
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Testing coverage and project documentation could
                  be improved.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AnalysisPreview;