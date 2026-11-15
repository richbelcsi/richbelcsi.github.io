# Agent-Based Modeling and Simulation of Urban Traffic

A literature survey for CSC754 by Richard Belitski and Mohammad Jehangir.

**Project website:** [View the website](https://richbelcsi.github.io/)

## Overview

This project examines how agent-based models represent travelers, vehicles, and traffic-control agents to investigate urban traffic congestion and evaluate strategies for reducing it.

New York City serves as the motivating case study. Research from other locations provides relevant methods, comparisons, and evaluation evidence. Topics include route choice, driver behavior, signal coordination, lane management, and travel-demand management.

The guiding question is how these models evaluate congestion-management strategies while balancing behavioral realism, computational efficiency, and agreement with observed traffic data.

DEVSJAVA is considered as a possible platform for future model implementation. This repository currently contains the survey website, not a traffic simulator.

## Current Progress

- Collected 60 publications with links to publication records or available full text.
- Prepared brief comments for all 60 bibliography papers.
- Selected 20 papers for thorough reading: 4 foundational papers, 8 journal papers, 6 conference papers, and 2 technical reports.
- Added paraphrased abstract summaries for the 20-paper shortlist.
- Completed detailed reviews and classifications for all 20 shortlisted papers, including a comparison table and cross-paper findings.
- Completed the class presentation and made the 40-slide submission deck available in PDF and PowerPoint formats.
- Began drafting the final survey paper, starting with the introduction.

The final paper will reference all 60 publications in relevant discussions, with detailed technical comparisons centered on the 20-paper shortlist.

Following presentation feedback, the manuscript will place greater emphasis on specific models, agent behavior, decision mechanisms, parameter settings, computational methods, and figures explaining model structure and results.

## Website Features

- Shared navigation, responsive layouts, skip links, and back-to-top links.
- Bibliography search, publication-year filtering, author/title/year sorting, and a filter for the 20 shortlisted papers.
- Search and group filtering across all 60 annotations, with result counts and empty-result messages.
- Links between bibliography entries, annotations, and detailed reviews.
- Detailed-review navigation, individual classifications, a comparison table, and cross-paper findings linked to supporting reviews.
- Print / Save as PDF controls on the bibliography, annotations, and detailed-review pages.
- A presentation page with an embedded PDF preview and PDF and PowerPoint download links.
- A final-paper page with drafting progress, planned structure, and manuscript availability.

The presentation and final-paper pages are accessible through Project Materials.

Printing the bibliography or annotations includes the currently visible results. Clear the filters before printing the complete collection. Printing the detailed-review page includes all 20 reviews, classifications, and cross-paper comparisons.

Publication access varies by source. Abstract summaries are paraphrased rather than reproduced from the original publications.

## Website Files

| File or directory | Purpose |
| --- | --- |
| `index.html` | Project description, research question, and current progress |
| `bibliography.html` | Bibliography of 60 publications with search, filtering, sorting, and print controls |
| `annotations.html` | Brief comments for all 60 papers and abstract summaries for the 20-paper shortlist |
| `review.html` | Detailed reviews, classifications, comparison table, and cross-paper findings |
| `materials.html` | Research materials, project progress, and course milestones |
| `presentation.html` | Presentation overview, PDF preview, and submission downloads |
| `paper.html` | Final-paper progress, planned structure, and manuscript availability |
| `styles.css` | Shared typography, colors, layouts, controls, responsive rules, and print styles |
| `script.js` | Search, filtering, sorting, annotation-link handling, and print controls |
| `logo.svg` | Website logo and browser-tab icon |
| `assets/` | Presentation files and, when available, the survey-paper PDF |
| `README.md` | Project overview and website maintenance instructions |

Some page-specific layout rules are included in the corresponding HTML files.

## Research Classification

The 20 shortlisted papers are grouped by their primary research contribution:

| Category | Papers |
| --- | ---: |
| Travel behavior and route choice | 4 |
| Traffic control and coordination | 6 |
| Travel-demand management | 1 |
| Simulation frameworks and computational efficiency | 6 |
| Calibration and validation methods | 3 |
| **Total** | **20** |

Each paper has one primary category, while connections to other categories are discussed in its review and the cross-paper analysis.

These categories describe research contributions. The foundational, journal, conference, and technical-report labels describe the composition of the reading shortlist.

The technical comparison examines:

- Agent types, states, observations, actions, and behavioral assumptions
- Decision rules, learning mechanisms, and interactions among agents
- Network representation, travel demand, and environmental constraints
- Model parameters, configuration choices, and calibration procedures
- Simulation execution, computational requirements, and scalability
- Experimental scenarios, baselines, performance measures, and validation evidence
- Findings, limitations, and relevance to congestion management

The final paper will develop these comparisons using technical explanations, figures, and supporting references. The classification and analysis may be refined during drafting.

## Course Milestones

The following dates are for the 2026 course schedule.

| Date | Task |
| --- | --- |
| September 17 | Topic selection, group information, and project description |
| October 1 | Bibliography containing at least 50 publications with links |
| October 15 | Brief bibliography annotations and identification of 20–25 papers for thorough reading |
| October 29 | Detailed comments on thoroughly read papers and a research classification scheme |
| November 12 and November 19 | Class presentations |
| December 10 | Final survey paper submission |

Our presentation is complete. The current stage is final-paper drafting.

## Local Preview

The website uses HTML, CSS, JavaScript, and SVG. No build step is required.

1. Clone or download the repository.
2. Keep the HTML pages, `styles.css`, `script.js`, and `logo.svg` in the website root.
3. Preserve the `assets/` subdirectory and its filenames.
4. Open `index.html` directly in a browser for a basic preview, or use a local server such as VS Code Live Server.
5. Navigate through the pages and check desktop and mobile layouts.

Use a local server when testing download buttons. When pages are opened through a `file:///` address, browsers may open a PDF instead of honoring its `download` attribute.

On the presentation page, check that the PDF preview, Open Slides link, and both download buttons use the intended submission files.

After changing styles or scripts, refresh the browser. On Windows, use `Ctrl + F5` if cached files prevent the latest changes from appearing.

## Development Workflow

1. Make changes on the `dev` branch.
2. Preview the website locally.
3. Check navigation, responsive layouts, search, filtering, sorting, and links between papers.
4. Check print previews on the bibliography, annotations, and detailed-review pages.
5. Check the presentation preview and downloads, along with any newly added manuscript links.
6. Update progress descriptions and content-updated dates on affected pages.
7. Commit and push changes to `dev`.
8. Open and review a pull request from `dev` into `main`.
9. Merge the changes when ready.
10. Confirm that the published website reflects the update.

The website is hosted through GitHub Pages. Deployment follows the repository’s configured publishing branch or GitHub Actions workflow.

## Maintaining Presentation and Manuscript Files

The presentation page uses:

- `assets/CSC754_Survey_Paper_Presentation_Slides (Submission).pdf`
- `assets/CSC754_Survey_Paper_Presentation_Slides (Submission).pptx`

Keep filenames and capitalization consistent with `presentation.html`. Both PDF buttons and the embedded preview should reference the same submission PDF.

Publish the submission versions without speaker notes. Keep presenter copies separate from the public website files.

The manuscript PDF is not yet available. When a draft is ready to share, add it to `assets/`, link it from `paper.html`, and update the relevant progress descriptions and dates.

## Maintaining Paper Links

Keep existing paper IDs stable so that links between pages continue to work.

The 20 shortlisted annotations use IDs such as `paper-45`. Additional bibliography annotations use IDs such as `annotation-ref-03`.

The bibliography script identifies shortlisted papers through links beginning with `annotations.html#paper-`. Continue using the `annotation-ref-XX` format for additional annotations so the shortlist filter includes only the intended 20 papers.

Preserve the existing detailed-review IDs when editing reviews, since annotations and cross-paper findings link to them.
