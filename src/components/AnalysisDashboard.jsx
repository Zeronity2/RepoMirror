function AnalysisDashboard({ analysis }) {
  if (!analysis) return null;

  const {
    repository,
    structure,
    health,
    projectType,
    dependencies,
    practices,
    security,
    recommendations,
  } = analysis;

  const healthScore = health?.score ?? 0;

  const practiceItems = [
    ["README", practices?.documentation?.readme],
    ["LICENSE", practices?.documentation?.license],
    ["TESTS", practices?.testing?.hasTests],
    ["CI / CD", practices?.ciCd?.githubActions],
    ["DOCKER", practices?.containerization?.docker],
    [".ENV EXAMPLE", practices?.configuration?.envExample],
    [".GITIGNORE", practices?.configuration?.gitignore],
    ["ESLINT", practices?.codeQuality?.eslint],
    ["PRETTIER", practices?.codeQuality?.prettier],
  ];

  const getHealthLabel = () => {
    if (healthScore >= 90) return "EXCELLENT";
    if (healthScore >= 75) return "GOOD";
    if (healthScore >= 60) return "FAIR";
    if (healthScore >= 40) return "NEEDS IMPROVEMENT";
    return "POOR";
  };

  const getRiskClass = () => {
    if (security?.riskLevel === "Low") {
      return "border-emerald-500/40 text-emerald-400";
    }

    if (security?.riskLevel === "Medium") {
      return "border-amber-500/40 text-amber-400";
    }

    return "border-red-500/40 text-red-400";
  };

  return (
    <section
      id="analysis-dashboard"
      className="border-y border-slate-800 bg-[#0a0e17] py-12"
    >
      <div className="mx-auto w-full max-w-[1500px] px-5 lg:px-8">

        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-6 border-b border-slate-800 pb-6 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-4 w-0.5 bg-amber-400" />

              <span className="technical-label text-amber-400">
                ANALYSIS COMPLETE
              </span>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-slate-100 lg:text-4xl">
              Repository Intelligence
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3">

              <span className="font-mono text-base text-slate-200">
                {repository?.fullName ||
                  repository?.name ||
                  "Repository"}
              </span>

              <span className="border border-slate-700 px-2 py-1 font-mono text-[10px] uppercase text-slate-400">
                {projectType?.type || "Unknown"}
              </span>

              <span className="border border-emerald-500/30 bg-emerald-500/5 px-2 py-1 font-mono text-[10px] uppercase text-emerald-400">
                {projectType?.confidence || "Unknown"} confidence
              </span>

            </div>
          </div>

          <div className="flex flex-col items-start gap-3 lg:items-end">

            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
              REPOSITORY ANALYSIS
            </div>

            <div className="font-mono text-xs text-slate-400">
              {repository?.html_url || repository?.url || ""}
            </div>

          </div>
        </div>

        {/* TOP METRICS */}
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

          {/* HEALTH */}
          <div className="technical-panel p-5">

            <p className="technical-label text-slate-500">
              OVERALL HEALTH
            </p>

            <div className="mt-3 flex items-end justify-between">

              <div>
                <span className="telemetry-number text-5xl text-amber-400">
                  {healthScore}
                </span>

                <span className="ml-2 font-mono text-sm text-slate-500">
                  /100
                </span>
              </div>

              <span className="font-mono text-xs font-semibold text-amber-400">
                {getHealthLabel()}
              </span>

            </div>

            <div className="mt-4 h-1.5 bg-slate-800">
              <div
                className="h-full bg-amber-400"
                style={{
                  width: `${Math.min(healthScore, 100)}%`,
                }}
              />
            </div>

          </div>

          {/* FILES */}
          <div className="technical-panel p-5">

            <p className="technical-label text-slate-500">
              FILES
            </p>

            <p className="telemetry-number mt-3 text-4xl text-slate-100">
              {structure?.totalFiles ?? 0}
            </p>

            <p className="mt-2 font-mono text-[10px] uppercase text-slate-600">
              SOURCE FILES DETECTED
            </p>

          </div>

          {/* FOLDERS */}
          <div className="technical-panel p-5">

            <p className="technical-label text-slate-500">
              FOLDERS
            </p>

            <p className="telemetry-number mt-3 text-4xl text-slate-100">
              {structure?.totalFolders ?? 0}
            </p>

            <p className="mt-2 font-mono text-[10px] uppercase text-slate-600">
              DIRECTORIES INDEXED
            </p>

          </div>

          {/* DEPENDENCIES */}
          <div className="technical-panel p-5">

            <p className="technical-label text-slate-500">
              DEPENDENCIES
            </p>

            <p className="telemetry-number mt-3 text-4xl text-slate-100">
              {dependencies?.totalCount ?? 0}
            </p>

            <p className="mt-2 font-mono text-[10px] uppercase text-slate-600">
              PACKAGES ANALYZED
            </p>

          </div>

        </div>

        {/* ROW 1 */}
        <div className="mt-3 grid gap-3 lg:grid-cols-12">

          {/* HEALTH MATRIX */}
          <div className="technical-panel lg:col-span-5">

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

              <div className="flex items-center gap-3">
                <span className="h-4 w-0.5 bg-amber-400" />

                <div>
                  <p className="technical-label text-slate-400">
                    HEALTH MATRIX
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Engineering quality breakdown
                  </p>
                </div>
              </div>

              <span className="font-mono text-[10px] text-slate-600">
                SCORE / 20
              </span>

            </div>

            <div className="space-y-5 p-5">

              {Object.entries(health?.breakdown || {}).map(
                ([name, value]) => (

                  <div key={name}>

                    <div className="mb-2 flex justify-between">

                      <span className="font-mono text-[10px] uppercase text-slate-400">
                        {name}
                      </span>

                      <span className="font-mono text-[10px] text-slate-300">
                        {value}/20
                      </span>

                    </div>

                    <div className="h-1.5 bg-slate-800">

                      <div
                        className="h-full bg-amber-400"
                        style={{
                          width: `${Math.min(
                            (value / 20) * 100,
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

          {/* PROJECT CLASSIFICATION */}
          <div className="technical-panel lg:col-span-4">

            <div className="border-b border-slate-800 px-5 py-4">

              <p className="technical-label text-slate-400">
                PROJECT CLASSIFICATION
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Detected project type
              </p>

            </div>

            <div className="p-5">

              <div className="border border-slate-700 bg-[#0a0e17] p-5">

                <div className="flex items-center justify-between gap-4">

                  <span className="text-2xl font-semibold text-slate-100">
                    {projectType?.type || "Unknown"}
                  </span>

                  <span className="border border-emerald-500/30 px-2 py-1 font-mono text-[9px] uppercase text-emerald-400">
                    {projectType?.confidence || "Unknown"}
                  </span>

                </div>

              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">

                <div className="border border-slate-800 p-4">

                  <p className="technical-label text-slate-600">
                    README
                  </p>

                  <p
                    className={`mt-2 font-mono text-xs ${
                      structure?.hasReadme
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {structure?.hasReadme
                      ? "PRESENT"
                      : "MISSING"}
                  </p>

                </div>

                <div className="border border-slate-800 p-4">

                  <p className="technical-label text-slate-600">
                    TESTS
                  </p>

                  <p
                    className={`mt-2 font-mono text-xs ${
                      structure?.hasTests
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {structure?.hasTests
                      ? "DETECTED"
                      : "MISSING"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* SECURITY */}
          <div className="technical-panel lg:col-span-3">

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

              <p className="technical-label text-slate-400">
                SECURITY SCAN
              </p>

              <span
                className={`border px-2 py-1 font-mono text-[9px] uppercase ${getRiskClass()}`}
              >
                {security?.riskLevel || "UNKNOWN"} RISK
              </span>

            </div>

            <div className="p-5">

              <p className="text-xs text-slate-500">
                Sensitive files found
              </p>

              <p className="telemetry-number mt-2 text-4xl text-slate-100">
                {security?.sensitiveFiles?.count ?? 0}
              </p>

              <div className="mt-5 border-t border-slate-800 pt-4">

                <p className="font-mono text-[10px] text-emerald-400">
                  ●{" "}
                  {security?.sensitiveFiles?.count === 0
                    ? "NO SENSITIVE FILES DETECTED"
                    : "SENSITIVE FILES REQUIRE REVIEW"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ROW 2 */}
        <div className="mt-3 grid gap-3 lg:grid-cols-12">

          {/* ENGINEERING PRACTICES */}
          <div className="technical-panel lg:col-span-7">

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <p className="technical-label text-slate-400">
                  ENGINEERING PRACTICES
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Repository standards detected
                </p>

              </div>

              <span className="font-mono text-[10px] text-emerald-400">
                {
                  practiceItems.filter((item) => item[1]).length
                }
                /9 DETECTED
              </span>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3">

              {practiceItems.map(([label, enabled]) => (

                <div
                  key={label}
                  className="border-b border-r border-slate-800 p-4"
                >

                  <div className="flex items-center gap-3">

                    <span
                      className={`h-2 w-2 rounded-full ${
                        enabled
                          ? "bg-emerald-400 green-glow"
                          : "bg-slate-700"
                      }`}
                    />

                    <span
                      className={`font-mono text-[10px] ${
                        enabled
                          ? "text-slate-300"
                          : "text-slate-600"
                      }`}
                    >
                      {label}
                    </span>

                  </div>

                  <p
                    className={`mt-2 pl-5 font-mono text-[9px] ${
                      enabled
                        ? "text-emerald-400"
                        : "text-slate-600"
                    }`}
                  >
                    {enabled
                      ? "PRESENT"
                      : "NOT DETECTED"}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* DEPENDENCIES */}
          <div className="technical-panel lg:col-span-5">

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <p className="technical-label text-slate-400">
                  DEPENDENCY INVENTORY
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Package footprint
                </p>

              </div>

              <span className="border border-slate-700 px-2 py-1 font-mono text-[9px] text-slate-400">
                {dependencies?.packageManager || "N/A"}
              </span>

            </div>

            <div className="grid grid-cols-3 border-b border-slate-800">

              <div className="p-5">

                <p className="technical-label text-slate-600">
                  PRODUCTION
                </p>

                <p className="telemetry-number mt-2 text-3xl text-slate-100">
                  {dependencies?.productionCount ?? 0}
                </p>

              </div>

              <div className="border-x border-slate-800 p-5">

                <p className="technical-label text-slate-600">
                  DEVELOPMENT
                </p>

                <p className="telemetry-number mt-2 text-3xl text-slate-100">
                  {dependencies?.developmentCount ?? 0}
                </p>

              </div>

              <div className="p-5">

                <p className="technical-label text-slate-600">
                  TOTAL
                </p>

                <p className="telemetry-number mt-2 text-3xl text-amber-400">
                  {dependencies?.totalCount ?? 0}
                </p>

              </div>

            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-3">

              <div>
                <p className="technical-label text-slate-600">
                  LEVEL
                </p>

                <p className="mt-2 font-mono text-xs uppercase text-amber-400">
                  {dependencies?.dependencyLevel || "UNKNOWN"}
                </p>
              </div>

              <div>
                <p className="technical-label text-slate-600">
                  LOCKFILE
                </p>

                <p className="mt-2 font-mono text-xs text-emerald-400">
                  {dependencies?.lockfile
                    ? "PRESENT"
                    : "NOT DETECTED"}
                </p>
              </div>

              <div>
                <p className="technical-label text-slate-600">
                  MANAGER
                </p>

                <p className="mt-2 font-mono text-xs text-slate-300">
                  {dependencies?.packageManager || "N/A"}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ROW 3 */}
        <div className="mt-3 grid gap-3 lg:grid-cols-12">

          {/* FILE EXTENSIONS */}
          <div className="technical-panel lg:col-span-5">

            <div className="border-b border-slate-800 px-5 py-4">

              <p className="technical-label text-slate-400">
                FILE EXTENSION DISTRIBUTION
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Top file types in repository
              </p>

            </div>

            <div className="space-y-3 p-5">

              {Object.entries(
                structure?.extensionCounts || {}
              )
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([extension, count]) => {

                  const total =
                    structure?.totalFiles || 1;

                  const percentage =
                    (count / total) * 100;

                  return (
                    <div key={extension}>

                      <div className="mb-1 flex items-center gap-3">

                        <span className="w-10 font-mono text-[10px] text-slate-400">
                          {extension}
                        </span>

                        <div className="h-1.5 flex-1 bg-slate-800">

                          <div
                            className="h-full bg-slate-400"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                        <span className="w-14 text-right font-mono text-[9px] text-slate-500">
                          {percentage.toFixed(1)}%
                        </span>

                      </div>

                    </div>
                  );
                })}

            </div>

          </div>

          {/* RECOMMENDATIONS */}
          <div className="technical-panel lg:col-span-7">

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

              <div>

                <p className="technical-label text-slate-400">
                  RECOMMENDATIONS
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Suggested improvements
                </p>

              </div>

              <span className="font-mono text-[10px] text-amber-400">
                {recommendations?.totalRecommendations ?? 0} ITEMS
              </span>

            </div>

            <div className="space-y-2 p-4">

              {(recommendations?.recommendations || []).map(
                (item, index) => {

                  const text =
                    typeof item === "string"
                      ? item
                      : item?.message ||
                        item?.recommendation ||
                        item?.title ||
                        JSON.stringify(item);

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 border border-slate-800 bg-[#0a0e17] p-4"
                    >

                      <span className="font-mono text-[10px] font-semibold text-amber-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="text-xs leading-5 text-slate-400">
                        {text}
                      </p>

                    </div>
                  );
                }
              )}

              {!recommendations?.recommendations?.length && (
                <div className="p-4 font-mono text-xs text-emerald-400">
                  NO IMMEDIATE RECOMMENDATIONS
                </div>
              )}

            </div>

          </div>

        </div>

        {/* STRENGTHS */}
        <div className="technical-panel mt-3">

          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

            <div>

              <p className="technical-label text-slate-400">
                STRENGTH SIGNALS
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Detected repository strengths
              </p>

            </div>

            <span className="font-mono text-[10px] text-emerald-400">
              POSITIVE SIGNALS
            </span>

          </div>

          <div className="grid gap-2 p-4 sm:grid-cols-2 lg:grid-cols-4">

            {(recommendations?.strengths || []).map(
              (strength, index) => {

                const text =
                  typeof strength === "string"
                    ? strength
                    : strength?.message ||
                      strength?.title ||
                      JSON.stringify(strength);

                return (
                  <div
                    key={index}
                    className="border border-emerald-500/20 bg-emerald-500/5 p-3"
                  >

                    <div className="flex gap-3">

                      <span className="font-mono text-sm text-emerald-400">
                        +
                      </span>

                      <p className="text-xs leading-5 text-slate-300">
                        {text}
                      </p>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default AnalysisDashboard;