"use strict";

(() => {
    const list = document.querySelector("#paper-list");

    // This is for only running the bibliography controls on the bibliography webpage.
    if (!list) {
        return;
    }

    const entries = Array.from(list.children);

    const form = document.querySelector("#bibliography-controls");
    const search = document.querySelector("#paper-search");
    const year = document.querySelector("#paper-year");
    const sort = document.querySelector("#paper-sort");

    const count = document.querySelector("#result-count");
    const empty = document.querySelector("#empty-state");
    const print = document.querySelector("#print-list");

    // This allows for searches to ignore letter case and accents.
    const normalize = (text) => {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const texts = new Map(
        entries.map((entry) => [
            entry,
            normalize(
                `${entry.textContent} ${entry.dataset.search ?? ""}`
            )
        ])
    );

    const collator = new Intl.Collator("en", {
        sensitivity: "base",
        numeric: true
    });

    // This is for building the year menu from the bibliography entries given.
    const publicationYears = [
        ...new Set(
            entries.map((entry) => entry.dataset.year)
        )
    ].sort((a, b) => Number(b) - Number(a));

    publicationYears.forEach((value) => {
        const option = document.createElement("option");

        option.value = value;
        option.textContent = value;

        year.append(option);
    });

    function update() {
        const terms = normalize(search.value.trim())
            .split(/\s+/)
            .filter(Boolean);

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

            const matchesSearch = terms.every((term) => {
                return texts.get(entry).includes(term);
            });

            const matches = matchesYear && matchesSearch;

            entry.hidden = !matches;

            if (matches) {
                shown += 1;
                entry.value = shown;
            }

            fragment.append(entry);
        });

        list.append(fragment);

        if (shown === entries.length) {
            count.textContent =
                `Showing all ${entries.length} entries`;
        } else {
            count.textContent =
                `Showing ${shown} of ${entries.length} entries`;
        }

        empty.hidden = shown !== 0;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    });

    search.addEventListener("input", update);
    year.addEventListener("change", update);
    sort.addEventListener("change", update);

    form.addEventListener("reset", (event) => {
        event.preventDefault();

        search.value = "";
        year.value = "all";
        sort.value = "author";

        update();
    });

    print.addEventListener("click", () => {
        window.print();
    });

    // This is for revealing controls only when JavaScript is available.
    form.hidden = false;
    print.hidden = false;

    update();
})();