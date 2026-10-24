"use strict";

(() => {
    // This is for ignoring letter case and accents when searching.
    const normalize = (text) => {
        return String(text ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const getSearchTerms = (input) => {
        return normalize(input.value)
            .trim()
            .split(/\s+/)
            .filter(Boolean);
    };

    function setupBibliography() {
        const list = document.querySelector("#paper-list");
        const form = document.querySelector("#bibliography-controls");

        // These controls should only be ran on the bibliography page.
        if (!list || !form) {
            return;
        }

        const search = document.querySelector("#paper-search");
        const year = document.querySelector("#paper-year");
        const sort = document.querySelector("#paper-sort");
        const selected = document.querySelector("#selected-only");

        const count = document.querySelector("#result-count");
        const empty = document.querySelector("#empty-state");
        const print = document.querySelector("#print-list");

        const entries = Array.from(list.children);

        const texts = new Map(
            entries.map((entry) => [
                entry,
                normalize(
                    `${entry.textContent} ${entry.dataset.search ?? ""}`
                )
            ])
        );

        // The annotation links identify the 20 selected papers.
        const selectedEntries = new Set(
            entries.filter((entry) => {
                return entry.querySelector(
                    'a[href^="annotations.html#paper-"]'
                );
            })
        );

        const collator = new Intl.Collator("en", {
            sensitivity: "base",
            numeric: true
        });

        // This is for rebuilding the year menu without duplicating options.
        year.replaceChildren(new Option("All years", "all"));

        const publicationYears = [
            ...new Set(
                entries
                    .map((entry) => entry.dataset.year)
                    .filter(Boolean)
            )
        ].sort((a, b) => Number(b) - Number(a));

        publicationYears.forEach((value) => {
            year.add(new Option(value, value));
        });

        function updateBibliography() {
            const terms = getSearchTerms(search);

            const ordered = [...entries].sort((a, b) => {
                const byAuthor =
                    collator.compare(
                        a.dataset.author,
                        b.dataset.author
                    ) ||
                    collator.compare(
                        a.dataset.title,
                        b.dataset.title
                    );

                if (sort.value === "newest") {
                    return (
                        Number(b.dataset.year) -
                        Number(a.dataset.year)
                    ) || byAuthor;
                }

                if (sort.value === "oldest") {
                    return (
                        Number(a.dataset.year) -
                        Number(b.dataset.year)
                    ) || byAuthor;
                }

                if (sort.value === "title") {
                    return collator.compare(
                        a.dataset.title,
                        b.dataset.title
                    ) || byAuthor;
                }

                return byAuthor;
            });

            let shown = 0;
            const fragment = document.createDocumentFragment();

            ordered.forEach((entry) => {
                const matchesYear =
                    year.value === "all" ||
                    entry.dataset.year === year.value;

                const matchesSelection =
                    !selected?.checked ||
                    selectedEntries.has(entry);

                const matchesSearch = terms.every((term) => {
                    return texts.get(entry).includes(term);
                });

                const matches =
                    matchesYear &&
                    matchesSelection &&
                    matchesSearch;

                entry.hidden = !matches;

                if (matches) {
                    shown += 1;
                    entry.value = shown;
                }

                fragment.append(entry);
            });

            list.append(fragment);

            count.textContent =
                `Showing ${shown} of ${entries.length} papers`;

            empty.hidden = shown !== 0;
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        search.addEventListener("input", updateBibliography);
        year.addEventListener("change", updateBibliography);
        sort.addEventListener("change", updateBibliography);
        selected?.addEventListener("change", updateBibliography);

        // This is for updating after the browser restores the form defaults,
        // including clearing the selected-papers checkbox.
        form.addEventListener("reset", () => {
            requestAnimationFrame(updateBibliography);
        });

        if (print) {
            print.addEventListener("click", () => {
                window.print();
            });

            print.hidden = false;
        }

        form.hidden = false;
        updateBibliography();
    }

    function setupAnnotations() {
        const form = document.querySelector("#annotation-controls");

        // These controls should only be ran on the annotations page.
        if (!form) {
            return;
        }

        const search = document.querySelector("#annotation-search");
        const category = document.querySelector("#annotation-category");

        const count = document.querySelector("#annotation-count");
        const empty = document.querySelector("#annotation-empty");
        const print = document.querySelector("#print-annotations");

        const groups = Array.from(
            document.querySelectorAll(".annotation-group")
        );

        const entries = groups.flatMap((group) => {
            return Array.from(
                group.querySelectorAll(".paper-annotation")
            );
        });

        const texts = new Map(
            entries.map((entry) => [
                entry,
                normalize(entry.textContent)
            ])
        );

        function updateAnnotations() {
            const terms = getSearchTerms(search);
            let shown = 0;

            groups.forEach((group) => {
                let groupCount = 0;

                group.querySelectorAll(".paper-annotation")
                    .forEach((entry) => {
                        const matchesCategory =
                            category.value === "all" ||
                            category.value === group.id;

                        const matchesSearch = terms.every((term) => {
                            return texts.get(entry).includes(term);
                        });

                        const matches =
                            matchesCategory && matchesSearch;

                        entry.hidden = !matches;

                        if (matches) {
                            groupCount += 1;
                            shown += 1;
                        }
                    });

                // This is for hiding headings for categories with no results.
                group.hidden = groupCount === 0;
            });

            count.textContent =
                `Showing ${shown} of ${entries.length} papers`;

            empty.hidden = shown !== 0;
        }

        function clearAnnotationFilters() {
            search.value = "";
            category.value = "all";
            updateAnnotations();
        }

        function revealLinkedContent() {
            let id;

            try {
                id = decodeURIComponent(location.hash.slice(1));
            } catch {
                return;
            }

            const target = document.getElementById(id);

            if (
                !target ||
                !target.matches(".paper-annotation, .annotation-group")
            ) {
                return;
            }

            // This is to ensure that a direct link cannot lead to hidden content.
            clearAnnotationFilters();

            requestAnimationFrame(() => {
                target.scrollIntoView({
                    block: "start"
                });
            });
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();
        });

        search.addEventListener("input", updateAnnotations);
        category.addEventListener("change", updateAnnotations);

        form.addEventListener("reset", () => {
            requestAnimationFrame(updateAnnotations);
        });

        if (print) {
            print.addEventListener("click", () => {
                window.print();
            });

            print.hidden = false;
        }

        window.addEventListener("hashchange", revealLinkedContent);

        const navigation = document.querySelector(
            ".annotation-navigation"
        );

        navigation?.addEventListener("click", (event) => {
            if (event.target.closest('a[href^="#"]')) {
                clearAnnotationFilters();
            }
        });

        form.hidden = false;

        updateAnnotations();
        revealLinkedContent();
    }
    
    function setupReviewPrint() {
        const button = document.querySelector("#print-reviews");

        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            window.print();
        });

        button.hidden = false;
    }

    setupBibliography();
    setupAnnotations();
    setupReviewPrint();
})();