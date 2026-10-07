# Agent-Based Modeling and Simulation of Urban Traffic

A literature survey for CSC754 by Richard Belitski and Mohammad Jehangir.

**Project website:** [View the website](richbelcsi.github.io)

## Overview

This project surveys how agent-based models represent vehicles, travelers,
and traffic-control agents to investigate urban traffic congestion and
evaluate strategies for reducing it.

New York City serves as the motivating case study, while research from
other cities provides relevant methods and comparisons. The survey
examines route choice, driver behavior, signal coordination, lane
management, and travel incentives.

Our guiding question is how these models evaluate congestion-reduction
strategies while balancing behavioral realism, computational efficiency,
and agreement with observed traffic data.

The review also considers how the surveyed approaches could inform a
future implementation in DEVSJAVA.

## Current Progress

- Collected 60 publications with links to their publication records.
- Selected 20 papers for detailed reading:
  - 4 foundational papers
  - 8 recent journal papers
  - 6 conference papers
  - 2 technical reports
- Prepared preliminary summaries and comments explaining each selected
  paper’s contribution, limitations, and relevance to traffic congestion.
- Detailed reading and research classification are in progress.
- Presentation materials and the final survey paper are planned.

The summaries are paraphrased. Annotations will be refined as the
selected papers are reviewed in greater detail.

## Website Files

| File | Purpose |
|---|---|
| `index.html` | Project description, research question, and overview |
| `bibliography.html` | Full bibliography with search, filtering, and sorting |
| `annotations.html` | Summaries and comments for the 20 selected papers |
| `materials.html` | Research materials, progress, and course milestones |
| `styles.css` | Shared colors, typography, layouts, and responsive styles |
| `script.js` | Bibliography search, filtering, sorting, and print controls |
| `logo.svg` | Website logo and browser-tab icon |
| `README.md` | Repository overview and development instructions |

## Local Preview

The website uses HTML, CSS, JavaScript, and SVG. No installation or build
step is required.

1. Clone or download the repository.
2. Keep the website files together in the same directory.
3. Open `index.html` in a web browser.
4. Use the navigation links to visit the other pages.

After changing styles or scripts, refresh the browser. Use `Ctrl + F5`
if cached files prevent the latest changes from appearing.

## Development Workflow

1. Make changes on the `dev` branch.
2. Preview the website locally.
3. Check navigation, desktop and mobile layouts, bibliography controls,
   and links to the selected-paper annotations.
4. Commit and push the changes to `dev`.
5. Open a pull request from `dev` into `main`.
6. Review and merge the changes when they are ready.

The live website is hosted through GitHub Pages. Deployment follows the
repository’s configured publishing branch or GitHub Actions workflow.

## Research Scope

The comparison of selected papers focuses on:

- Agent representations and behavioral assumptions
- Interactions between travelers, vehicles, and traffic controls
- Strategies for understanding and reducing congestion
- Simulation scale and computational requirements
- Data requirements, calibration, and validation
- Findings, limitations, and opportunities for further research

DEVSJAVA is a possible future implementation platform; this repository
currently contains the survey website rather than a traffic simulator.
