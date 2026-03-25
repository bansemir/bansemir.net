# bansemir.net — SAP Software Architect Portfolio

> A freelancer portfolio website built as a SAPUI5 application — because the best way to prove SAPUI5 expertise is to build with it.

The medium is the message. Instead of listing SAP skills on a generic template, this site _is_ the proof: a fully functional SAPUI5 application with strict MVC separation, proper i18n, accessibility compliance, and zero linter warnings — built and reviewed through an AI-assisted agent workflow.


## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | SAPUI5 1.136 LTS (from SAP CDN) |
| Language | JavaScript ES6+ (`sap.ui.define` modules) |
| Tooling | @ui5/cli 4.x, ui5-middleware-livereload |
| Theme | sap_fiori_3 |
| Hosting | IONOS (static files) |
| Analytics | Plausible (GDPR-compliant, no cookie banner) |
| Booking | Calendly (embedded) |


## Architecture

Hybrid approach: static landing pages handle SEO and initial load speed, the SAPUI5 SPA provides the interactive portfolio experience.

```
bansemir.net/
├── index.html              ← Root redirect (language detection)
├── de/index.html           ← Landing Page (German)
├── en/index.html           ← Landing Page (English)
├── app/webapp/             ← SAPUI5 Application
│   ├── Component.js        ← Root Component
│   ├── manifest.json       ← App Descriptor, Models, Routing
│   ├── controller/         ← MVC Controllers
│   │   ├── BaseController.js
│   │   ├── App.controller.js
│   │   ├── Overview.controller.js
│   │   └── ProjectDetail.controller.js
│   ├── view/               ← XML Views
│   │   ├── App.view.xml
│   │   ├── Overview.view.xml
│   │   ├── ProjectDetail.view.xml
│   │   └── fragment/       ← Reusable Fragments
│   ├── model/              ← JSON Data + Formatter
│   │   ├── projects.json
│   │   ├── skills.json
│   │   ├── toolkit.json
│   │   ├── config.json
│   │   └── formatter.js
│   └── i18n/               ← DE + EN
├── assets/                 ← Images
├── legal/                  ← Impressum, Datenschutz
├── sitemap.xml
└── robots.txt
```


## Local Development

```bash
cd app
npm install
npx ui5 serve -o index.html
```

The dev server starts with livereload. The SAPUI5 framework loads from SAP CDN — no local UI5 installation required.


## Production Build

```bash
cd app
npx ui5 build --all --dest ../dist/app
```

Produces optimized, preload-bundled output in `dist/app/`. The landing pages and static assets are deployed separately alongside the built app.


## Design Decisions

**SAPUI5 instead of React/Astro/Next.js** — The site targets SAP hiring managers and project leads. Showing SAPUI5 proficiency through the site itself is more convincing than a React page that claims SAPUI5 expertise. The framework choice _is_ the portfolio.

**JavaScript instead of TypeScript** — Deliberate trade-off. TypeScript adds tooling complexity without changing the showcase value for a project of this size. The strict MVC separation and linter discipline provide the structural guarantees that TypeScript would add.

**Hybrid architecture** — Single-page applications are invisible to search engines without SSR. Rather than adding a rendering layer, the site uses static HTML landing pages for SEO and fast initial load, with the SAPUI5 app handling the interactive portfolio section.

**Strict MVC enforcement** — All data lives in JSON models declared in `manifest.json`. All UI is defined in XML views and fragments. Controllers handle events and navigation only. Formatters are pure functions. No exceptions.


## AI-Assisted Development

This project was built with Claude Code as development orchestrator, using SAP-specific MCP servers for tooling integration.

**Workflow:**
1. A project planner agent breaks features into work packages
2. SAP-specialized agents (frontend developer, fullstack developer) implement each package
3. QA agents review: code review, accessibility audit, performance benchmarking
4. The UI5 Linter (`@ui5/mcp-server`) validates every change before commit

**Tooling:**
- `@ui5/mcp-server` — UI5 linting, guidelines enforcement, API reference, manifest validation
- `@sap-ux/fiori-mcp-server` — Fiori documentation search, functionality lookup

**Every commit documents** which agent implemented the change and which agents reviewed it. This is not a marketing claim — check the git log.


## Quality Gates

| Check | Target | Status |
|-------|--------|--------|
| UI5 Linter | 0 errors, 0 warnings | Enforced |
| Accessibility | WCAG 2.1 AA | Audited |
| Landing Page Performance | Lighthouse >= 98 | Measured |
| Internationalization | Complete DE + EN | Verified |
| MVC Compliance | No violations | Reviewed |
| Code Quality | No deprecated APIs, no AI slop | Linted |


## Project Data

The SAPUI5 app renders its content from JSON models — no backend, no API calls:

- `projects.json` — SAP project references with bilingual descriptions
- `skills.json` — Technical skills by category with experience levels
- `toolkit.json` — Developer tools built by the author
- `config.json` — Application configuration


## License

MIT


## Author

Carsten Bansemir — [bansemir.net](https://bansemir.net)
