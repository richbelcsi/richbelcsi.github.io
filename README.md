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
- Drafted Sections 1–3: Introduction, Technical Background and Related Work, and Review Methodology and Classification Criteria. Section 4 will compare representative models and findings across the five research categories.

The final paper will reference all 60 publications in relevant discussions, with detailed technical comparisons centered on the 20-paper shortlist.

Following presentation feedback, the manuscript will place greater emphasis on specific models, agent behavior, decision mechanisms, parameter settings, computational methods, and figures explaining model structure and results.

## Website Features

- Shared navigation, responsive layouts, skip links, and back-to-top links.
- Bibliography search, publication-year filtering, author/title/year sorting, and a filter for the 20 shortlisted papers.
- Search and group filtering across all 60 annotations, with result counts and empty-result messages.
- Links between bibliography entries, annotations, and detailed reviews.
- Reference numbers such as [45] that match across the bibliography, annotations, and detailed reviews, and stay the same when the bibliography is sorted or filtered.
- Detailed-review navigation (a contents sidebar on wide screens and "Back to contents" links on smaller screens), individual classifications, a comparison table grouped by research category, and cross-paper findings linked to supporting reviews.
- Print / Save as PDF controls on the bibliography, annotations, and detailed-review pages.
- A Copy citation button on each bibliography entry, and a Copy Shown Citations button that copies every citation currently listed, in the current order. Copied citations include their reference numbers.
- Search and filter choices saved in the page address, so a filtered view can be shared and survives a refresh. For example, `bibliography.html?q=calibration&shortlist=1` or `annotations.html?group=journal`.
- Highlighted search matches in the bibliography and annotations.
- Keyboard shortcuts on the bibliography and annotations pages: press `/` to jump to the search box and `Esc` to clear it.
- A Copy link button beside each annotation and detailed-review heading.
- A note at the end of each detailed review linking to the cross-paper findings that discuss it.
- A floating Top link on the annotations and detailed-review pages for smaller screens.
- Section-by-section progress on the final-paper page.
- A custom page for addresses that do not exist.
- A presentation page with an embedded PDF preview and PDF and PowerPoint download links.
- A final-paper page with drafting progress, planned structure, and manuscript availability.

The presentation and final-paper pages are accessible through Project Materials. When either page is open, Project Materials is highlighted in the navigation.

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
| `styles.css` | Shared typography, colors, layouts, page-specific layouts, controls, responsive rules, and print styles |
| `script.js` | Search, filtering, sorting, annotation-link handling, print controls, copy buttons, shareable filter addresses, search highlighting, keyboard shortcuts, links to cross-paper findings, and the floating Top link |
| `logo.svg` | Website logo and browser-tab icon |
| `404.html` | Page GitHub Pages shows for addresses that do not exist |
| `.github/workflows/check-links.yml` | Weekly and on-update check of every internal and external link |
| `assets/` | Presentation files and, when available, the survey-paper PDF |
| `README.md` | Project overview and website maintenance instructions |

All styles, including page-specific layout rules, are in `styles.css`.

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

Copy buttons and shareable filter addresses work best through a local server, because some browsers block clipboard access and address changes for pages opened as files.

`404.html` uses addresses that begin with `/` so that it works at any depth on GitHub Pages. It only displays correctly on GitHub Pages or through a local server started in the website folder.

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
11. Check the Actions tab for the result of the link check.

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

Preserve the existing detailed-review IDs, such as `review-raney`, when editing reviews, since annotations and cross-paper findings link to them.

The numbers inside paper IDs are fixed labels, not reference numbers. For most shortlisted papers the number in `paper-N` equals the reference number, but Khan is `paper-26` with reference [25] and Kieu is `paper-25` with reference [26]. Copy an ID from the annotation you are linking to rather than working it out.

The note at the end of each detailed review that lists its cross-paper findings is built by `script.js` from the review links inside the Cross-Paper Comparison and Findings section, so it updates automatically when those links change.

## Maintaining Citations

The bibliography, annotations, and detailed-review pages use the same text for each citation. The bibliography entry is the reference version: when correcting a citation, update it there first, then copy the same text to the paper's annotation and, for shortlisted papers, its detailed review.

Page ranges use an en dash (–), months are written in full, proceedings venues begin with "In", and the DOI or URL is shown as the link text.

## Maintaining Reference Numbers

Reference numbers such as [45] follow the alphabetical order of the bibliography. They are written into each bibliography entry, each annotation heading, and each detailed-review heading, comparison-table row, and contents-sidebar link. If a paper is added or removed, update the numbers on all three pages and in the manuscript.

## Maintaining the Final-Paper Page

Each section in the planned structure has a status label. Change its `data-status` value and text to `not-started` (Not Started), `in-progress` (In Progress), or `drafted` (Drafted), and update the "Section progress as of" date.

The manuscript block (version note, PDF buttons, preview, and a Cite This Survey line) is already written inside an HTML comment in `paper.html`. When a draft is ready, follow the steps in that comment to turn it on.

## Link Checking

`.github/workflows/check-links.yml` checks every link on the website: links between pages, anchors such as `annotations.html#paper-45`, files in `assets/`, and external DOI and PDF links. It runs every Monday, after HTML changes reach `main`, and on demand from the Actions tab (Check links > Run workflow).

A failed run means at least one link needs attention, and the run's summary page lists each broken link. Publishers often refuse automated checkers, so 403 (Forbidden) and 429 (Too Many Requests) responses count as reachable.

GitHub pauses scheduled workflows in public repositories after 60 days without repository activity. If that happens, re-enable the workflow from the Actions tab.
