# RepoMirror

> Open source made readable.

RepoMirror is a GitHub repository intelligence and analysis platform that analyzes publicly accessible GitHub repositories and provides a clear overview of their structure, health, project type, dependencies, engineering practices, security indicators, strengths, and actionable recommendations.

## Features

- GitHub repository URL analysis
- Repository structure analysis
- Repository health score
- Project type detection
- Dependency analysis
- Package manager and lockfile detection
- Engineering practice detection
- Security indicator analysis
- Strength detection
- Actionable recommendations
- Project-aware code quality checks
- Responsive analysis dashboard
- Error handling and loading states

## How It Works

1. Enter a public GitHub repository URL.
2. RepoMirror sends the repository URL to the backend.
3. The backend retrieves repository information using the GitHub API.
4. The repository tree is analyzed by multiple analysis modules.
5. The results are combined into a structured analysis.
6. The frontend displays the results in an interactive dashboard.

## Analysis Modules

### Repository Structure

Analyzes:

- Total files
- Total folders
- File extensions
- README presence
- Configuration files
- Test files

### Repository Health

Calculates an overall health score based on:

- Documentation
- Testing
- Configuration
- Repository structure
- Codebase characteristics

### Project Type

Detects common project types such as:

- Frontend
- Backend
- JavaScript / TypeScript
- Python
- Java
- Rust

### Dependencies

Analyzes:

- Production dependencies
- Development dependencies
- Total dependencies
- Package manager
- Lockfile presence
- Dependency footprint

### Engineering Practices

Checks for practices such as:

- README
- License
- Tests
- GitHub Actions
- Docker
- `.env.example`
- `.gitignore`
- ESLint
- Prettier
- Ruff
- Black
- Checkstyle
- Clippy

### Security

Checks for indicators such as:

- Sensitive files
- Environment files
- Credential-related files
- Key and certificate files
- `.gitignore` protection

### Recommendations

Generates recommendations based on detected repository conditions, including:

- Security improvements
- Documentation improvements
- Testing improvements
- CI/CD improvements
- Configuration improvements
- Code quality improvements
- Dependency maintenance

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js
- REST API

### External API

- GitHub REST API

### Deployment

- Vercel — Frontend
- Render — Backend

## Project Structure

```text
RepoMirror/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── AnalysisPreview.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── CTA.jsx
│   │   ├── Footer.jsx
│   │   └── AnalysisDashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── analyzers/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
