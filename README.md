# Agent-Based Modeling and Simulation of Urban Traffic

A literature survey for CSC754 by Richard Belitski and Mohammad Jehangir.

**Project website:** [View the website](https://richbelcsi.github.io/)

## Overview

This project surveys how agent-based models represent vehicles, travelers, and traffic-control agents to investigate urban traffic congestion and evaluate strategies for reducing it.

New York City serves as the motivating case study, while research from other cities provides relevant methods and comparisons. The survey examines route choice, driver behavior, signal coordination, lane management, and travel incentives.

Our guiding question is how these models evaluate congestion-reduction strategies while balancing behavioral realism, computational efficiency, and agreement with observed traffic data.

The review also considers how the surveyed approaches could inform a future implementation in DEVSJAVA.

## Current Progress

- Collected 60 publications with links to publication records or available full text.
- Prepared brief comments for all 60 bibliography papers, explaining their contributions and relevance to the survey.
- Selected 20 papers for thorough reading: 4 foundational papers, 8 recent journal papers, 6 conference papers, and 2 technical reports.
- Added paraphrased abstract summaries and more developed brief comments for the 20-paper shortlist.
- Completed detailed reviews and classifications for all 20 shortlisted papers, with cross-paper comparisons of modeling choices, congestion outcomes, computational trade-offs, and validation evidence.
- Planned presentation materials and the final survey paper.

The annotations cover the full bibliography. The detailed reviews focus on the 20-paper shortlist and examine methods, findings, supporting evidence, limitations, and relevance to congestion management.

Abstract summaries are paraphrased rather than reproduced from the original publications. Reviews and classifications will be refined as the project develops.

## Website Features

- Shared navigation across the description, bibliography, project materials, annotations, and detailed-review pages.
- Bibliography search, publication-year filtering, author/title/year sorting, and a filter for the 20 shortlisted papers.
- Search and group filtering across all 60 annotations.
- Separate annotation groups for the shortlisted foundational papers, journal papers, conference papers and reports, and the 40 additional bibliography papers.
- Result counts, empty-result messages, and controls for clearing filters.
- Links from all bibliography entries to their annotations, with links from the 20 shortlisted annotations to their detailed reviews.
- Navigation within the detailed-review page, including category shortcuts and links from cross-paper findings to supporting reviews.
- Print controls on the bibliography, annotations, and detailed-review pages, including the browser’s Save as PDF option.
- Responsive layouts, keyboard-accessible controls, skip links, and back-to-top navigation.

Printing the bibliography or annotations uses the currently visible results. Clear the filters before printing the complete collection. Printing the detailed-review page includes all 20 reviews, classifications, and cross-paper comparisons.

Publication links lead to publisher pages, repositories, or available PDFs. Access requirements vary by publication.

## Website Files

| File | Purpose |
| --- | --- |
| `index.html` | Project description, research question, and overview |
| `bibliography.html` | Bibliography of 60 publications with search, filtering, sorting, and print controls |
| `annotations.html` | Brief comments for all 60 papers, plus abstract summaries for the 20-paper shortlist |
| `review.html` | Detailed reviews and classifications for 20 papers, a comparison table, and cross-paper findings |
| `materials.html` | Research materials, progress, and course milestones |
| `styles.css` | Shared colors, typography, responsive layouts, controls, and print styles |
| `script.js` | Bibliography and annotation search/filter controls, bibliography sorting, and print controls for the bibliography, annotations, and detailed reviews |
| `logo.svg` | Website logo and browser-tab icon |
| `README.md` | Repository overview and development instructions |

Some page-specific layout rules are included in the corresponding HTML files.

## Research Scope and Classification

The comparison of shortlisted papers focuses on:

- Agent representations and behavioral assumptions
- Interactions between travelers, vehicles, and traffic controls
- Strategies for understanding and reducing congestion
- Simulation scale and computational requirements
- Data requirements, calibration, and validation
- Findings, limitations, and opportunities for further research

The classification scheme groups research into five categories according to its main contribution:

- Travel behavior and route choice
- Traffic control and coordination
- Travel-demand management
- Simulation frameworks and computational efficiency
- Calibration and validation methods

Each shortlisted paper has one primary category and a specific focus. Connections between categories are discussed in the individual reviews and cross-paper comparisons.

These research categories describe what each paper contributes. The foundational, journal, conference, and technical-report labels describe the composition of the reading shortlist.

The classification scheme may be refined as the comparative analysis and final survey paper develop.

## Course Milestones

| Date | Task |
| --- | --- |
| September 17 | Topic selection, group information, and project description |
| October 1 | Bibliography containing at least 50 publications with links |
| October 15 | Brief bibliography annotations and identification of 20–25 papers for thorough reading |
| October 29 | Detailed comments on thoroughly read papers and a research classification scheme |
| November 12 and November 19 | Class presentations |
| December 10 | Final survey paper submission |

## Local Preview

The website uses HTML, CSS, JavaScript, and SVG. No installation or build step is required.

1. Clone or download the repository.
2. Keep the website files together in the same directory.
3. Open `index.html` in a web browser.
4. Use the navigation links to visit the other pages.

A local preview server, such as the VS Code Live Server extension, may also be used.

After changing styles or scripts, refresh the browser. Use `Ctrl + F5` if cached files prevent the latest changes from appearing.

## Development Workflow

1. Make changes on the `dev` branch.
2. Preview the website locally.
3. Check navigation and desktop and mobile layouts.
4. Check bibliography search, year filtering, sorting, and the selected-paper filter.
5. Check annotation search, group filtering, links between pages, detailed-review navigation, and print previews on all three printable pages.
6. Update relevant progress descriptions and content-updated dates.
7. Commit and push the changes to `dev`.
8. Open a pull request from `dev` into `main`.
9. Review and merge the changes when they are ready.
10. Confirm that the published website reflects the merged changes.

The live website is hosted through GitHub Pages. Deployment follows the repository’s configured publishing branch or GitHub Actions workflow.

## Maintaining Paper Links

Keep existing paper IDs stable so that links between pages continue to work.

The 20 shortlisted annotations use IDs such as `paper-45`. Additional bibliography annotations use IDs such as `annotation-ref-03`.

The bibliography script currently identifies shortlisted papers through links beginning with `annotations.html#paper-`. Use the `annotation-ref-XX` format when linking to additional annotations so that the selected-paper filter continues to identify only the 20-paper shortlist.

## Implementation Scope

DEVSJAVA is a possible future implementation platform. This repository currently contains the literature-survey website; it does not yet include a traffic simulator.
