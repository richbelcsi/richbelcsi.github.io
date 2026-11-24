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

    // This is for copying text, with a fallback for browsers or local
    // previews where the Clipboard API is unavailable.
    const copyText = async (text) => {
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                // Fall back to the older copy command below.
            }
        }

        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.append(area);
        area.select();

        let copied = false;

        try {
            copied = document.execCommand("copy");
        } catch {
            copied = false;
        }

        area.remove();
        return copied;
    };

    // This is for announcing copy results to screen readers.
    let announcer = null;

    const announce = (message) => {
        if (!announcer) {
            announcer = document.createElement("p");
            announcer.className = "visually-hidden";
            announcer.setAttribute("role", "status");
            announcer.setAttribute("aria-live", "polite");
            document.body.append(announcer);
        }

        announcer.textContent = "";

        requestAnimationFrame(() => {
            announcer.textContent = message;
        });
    };

    // This is for briefly showing the result on the button that was pressed.
    const showResult = (button, message) => {
        if (!button.dataset.label) {
            button.dataset.label = button.textContent.trim();
        }

        button.textContent = message;
        announce(message);

        clearTimeout(Number(button.dataset.timer));

        button.dataset.timer = String(
            setTimeout(() => {
                button.textContent = button.dataset.label;
            }, 2000)
        );
    };

    const makeCopyButton = (label) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "copy-button";
        button.textContent = label;
        return button;
    };

    // This is for removing line breaks and extra spaces from copied text.
    const tidy = (text) => text.replace(/\s+/g, " ").trim();

    // This is for keeping search and filter choices in the page address,
    // so a filtered view can be shared or restored after a refresh.
    const readFilters = () => new URLSearchParams(window.location.search);

    const saveFilters = (values, hash = window.location.hash) => {
        const params = new URLSearchParams();

        Object.entries(values).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });

        const query = params.toString();
        const address =
            window.location.pathname +
            (query ? `?${query}` : "") +
            hash;

        try {
            history.replaceState(history.state, "", address);
        } catch {
            // Some browsers block address changes for pages opened as local files.
        }
    };

    // This is for highlighting search terms inside visible results.
    // Like the search itself, matching ignores letter case and accents.
    const clearHighlights = (root) => {
        root.querySelectorAll("mark.search-hit").forEach((mark) => {
            const parent = mark.parentNode;
            mark.replaceWith(mark.textContent);
            parent.normalize();
        });
    };

    const highlightTerms = (root, terms) => {
        const usable = terms.filter((term) => term.length >= 2);

        if (usable.length === 0) {
            return;
        }

        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (
                    !node.nodeValue.trim() ||
                    node.parentElement.closest("button, mark")
                ) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        nodes.forEach((node) => {
            const original = node.nodeValue;
            const positions = [];
            let folded = "";

            // The folded copy remembers which original character each letter came from.
            for (let index = 0; index < original.length; index += 1) {
                const piece = normalize(original[index]);

                for (let part = 0; part < piece.length; part += 1) {
                    folded += piece[part];
                    positions.push(index);
                }
            }

            const ranges = [];

            usable.forEach((term) => {
                let start = folded.indexOf(term);

                while (start !== -1) {
                    ranges.push([
                        positions[start],
                        positions[start + term.length - 1] + 1
                    ]);
                    start = folded.indexOf(term, start + term.length);
                }
            });

            if (ranges.length === 0) {
                return;
            }

            ranges.sort((a, b) => a[0] - b[0]);

            const merged = [];

            ranges.forEach(([start, end]) => {
                const last = merged[merged.length - 1];

                if (last && start <= last[1]) {
                    last[1] = Math.max(last[1], end);
                } else {
                    merged.push([start, end]);
                }
            });

            const fragment = document.createDocumentFragment();
            let cursor = 0;

            merged.forEach(([start, end]) => {
                fragment.append(original.slice(cursor, start));

                const mark = document.createElement("mark");
                mark.className = "search-hit";
                mark.textContent = original.slice(start, end);
                fragment.append(mark);

                cursor = end;
            });

            fragment.append(original.slice(cursor));
            node.replaceWith(fragment);
        });
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
        const copyList = document.querySelector("#copy-list");

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

        // This is for restoring a shared or refreshed view from the page address.
        const saved = readFilters();
        search.value = saved.get("q") ?? "";

        if (publicationYears.includes(saved.get("year"))) {
            year.value = saved.get("year");
        }

        if ([...sort.options].some((option) => option.value === saved.get("sort"))) {
            sort.value = saved.get("sort");
        }

        if (selected) {
            selected.checked = saved.get("shortlist") === "1";
        }

        // This is for the "Copy citation" button on each entry.
        // The copied text includes the entry's reference number.
        entries.forEach((entry) => {
            const citation = entry.querySelector(".acm-citation");
            const row = entry.querySelector(".reference > p:last-child");

            if (!citation || !row) {
                return;
            }

            const button = makeCopyButton("Copy citation");

            button.addEventListener("click", async () => {
                const copied = await copyText(tidy(citation.textContent));
                showResult(button, copied ? "Citation copied" : "Copy failed");
            });

            row.append(button);
        });


        function updateBibliography() {
            const terms = getSearchTerms(search);
            clearHighlights(list);

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

                // Reference numbers are part of each entry's text, so they
                // stay the same however the list is sorted or filtered.
                if (matches) {
                    shown += 1;
                    highlightTerms(entry, terms);
                }

                fragment.append(entry);
            });

            list.append(fragment);

            count.textContent =
                `Showing ${shown} of ${entries.length} papers`;

            empty.hidden = shown !== 0;

            saveFilters({
                q: search.value.trim(),
                year: year.value === "all" ? "" : year.value,
                sort: sort.value === "author" ? "" : sort.value,
                shortlist: selected?.checked ? "1" : ""
            });
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

        // This is for copying every citation currently shown, in the current order.
        if (copyList) {
            copyList.addEventListener("click", async () => {
                const shownEntries = Array.from(list.children)
                    .filter((entry) => !entry.hidden);

                if (shownEntries.length === 0) {
                    showResult(copyList, "No citations to copy");
                    return;
                }

                const text = shownEntries
                    .map((entry) => {
                        return tidy(entry.querySelector(".acm-citation").textContent);
                    })
                    .join("\n");

                const copied = await copyText(text);

                showResult(
                    copyList,
                    copied
                        ? `Copied ${shownEntries.length} ${shownEntries.length === 1 ? "citation" : "citations"}`
                        : "Copy failed"
                );
            });

            copyList.hidden = false;
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

        // This is for restoring a shared or refreshed view from the page address.
        const saved = readFilters();
        search.value = saved.get("q") ?? "";

        if ([...category.options].some((option) => option.value === saved.get("group"))) {
            category.value = saved.get("group");
        }

        function updateAnnotations(hash = window.location.hash) {
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
                        clearHighlights(entry);

                        if (matches) {
                            groupCount += 1;
                            shown += 1;
                            highlightTerms(entry, terms);
                        }
                    });

                // This is for hiding headings for categories with no results.
                group.hidden = groupCount === 0;
            });

            count.textContent =
                `Showing ${shown} of ${entries.length} papers`;

            empty.hidden = shown !== 0;

            saveFilters({
                q: search.value.trim(),
                group: category.value === "all" ? "" : category.value
            }, hash);
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

        // Once the reader edits the filters, the URL should describe
        // the filtered list rather than the paper they originally opened.
        const applyEditedFilters = () => updateAnnotations("");

        search.addEventListener("input", applyEditedFilters);
        category.addEventListener("change", applyEditedFilters);

        form.addEventListener("reset", () => {
            requestAnimationFrame(applyEditedFilters);
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

    // This is for the "Copy link" button beside each annotation and review heading.
    function setupCopyLinks() {
        const items = document.querySelectorAll(
            ".paper-annotation[id], .detailed-review[id]"
        );

        items.forEach((item) => {
            const heading = item.querySelector("h3");

            if (!heading) {
                return;
            }

            const row = document.createElement("div");
            row.className = "heading-row";
            heading.replaceWith(row);
            row.append(heading);

            const button = makeCopyButton("Copy link");

            button.setAttribute(
                "aria-label",
                `Copy link to ${tidy(heading.textContent)}`
            );

            button.addEventListener("click", async () => {
                const address = new URL(window.location.href);
                address.search = "";
                address.hash = item.id;

                const copied = await copyText(address.href);
                showResult(button, copied ? "Link copied" : "Copy failed");
            });

            row.append(button);
        });
    }

    // This is for linking each detailed review to the cross-paper findings
    // that discuss it. The list is built from the links already in the findings.
    function setupFindingLinks() {
        const findings = document.querySelectorAll(".review-finding");

        if (findings.length === 0) {
            return;
        }

        const discussed = new Map();

        findings.forEach((finding) => {
            const heading = finding.querySelector("h3[id]");

            if (!heading) {
                return;
            }

            finding.querySelectorAll('a[href^="#review-"]').forEach((link) => {
                const id = link.getAttribute("href").slice(1);
                const headings = discussed.get(id) ?? [];

                if (!headings.includes(heading)) {
                    headings.push(heading);
                }

                discussed.set(id, headings);
            });
        });

        discussed.forEach((headings, id) => {
            const text = document.getElementById(id)?.querySelector(".review-text");

            if (!text) {
                return;
            }

            const note = document.createElement("p");
            note.className = "review-discussed";
            note.append("Discussed in the cross-paper findings: ");

            headings.forEach((heading, index) => {
                if (index > 0) {
                    note.append("; ");
                }

                const link = document.createElement("a");
                link.href = `#${heading.id}`;
                link.textContent = tidy(heading.textContent);
                note.append(link);
            });

            note.append(".");
            text.append(note);
        });
    }

    // This is for the keyboard shortcuts: "/" jumps to the search box,
    // and Escape clears it.
    function setupSearchShortcut() {
        const search = document.querySelector("#paper-search, #annotation-search");

        if (!search) {
            return;
        }

        document.addEventListener("keydown", (event) => {
            if (
                event.key !== "/" ||
                event.ctrlKey ||
                event.metaKey ||
                event.altKey ||
                event.target.closest("input, textarea, select, [contenteditable]") ||
                search.closest("[hidden]")
            ) {
                return;
            }

            event.preventDefault();
            search.focus();
            search.select();
        });

        search.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && search.value) {
                event.preventDefault();
                search.value = "";
                search.dispatchEvent(new Event("input", { bubbles: true }));
            }
        });
    }

    // This is for a floating "Top" link on long pages. It appears after
    // scrolling and is only shown on smaller screens (see styles.css).
    function setupFloatingTop() {
        if (!document.querySelector(".annotation-layout, .review-content")) {
            return;
        }

        const link = document.createElement("a");
        link.href = "#top";
        link.className = "floating-top";
        link.setAttribute("aria-label", "Back to top");
        link.innerHTML = '<span aria-hidden="true">↑</span> Top';
        link.hidden = true;
        document.body.append(link);

        const update = () => {
            link.hidden = window.scrollY < window.innerHeight * 1.5;
        };

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        update();
    }

    setupBibliography();
    setupAnnotations();
    setupReviewPrint();
    setupCopyLinks();
    setupFindingLinks();
    setupSearchShortcut();
    setupFloatingTop();
})();