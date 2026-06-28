const script = `
(() => {
  if (window.__foundjobBackofficeTableFilter) return;
  window.__foundjobBackofficeTableFilter = true;

  function findTable(bar) {
    const container = bar.closest(".bo-content") || bar.closest("main") || document.body;
    return container.querySelector("table");
  }

  function applyFilter(bar) {
    const table = findTable(bar);
    if (!table) return;

    const terms = Array.from(bar.querySelectorAll("input"))
      .map((input) => input.value.trim().toLowerCase())
      .filter(Boolean);

    Array.from(table.querySelectorAll("tbody tr")).forEach((row) => {
      const text = (row.textContent || "").toLowerCase();
      row.hidden = terms.length > 0 && !terms.every((term) => text.includes(term));
    });
  }

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!target || target.tagName !== "INPUT") return;

    const bar = target.closest(".bo-filterbar");
    if (bar) applyFilter(bar);
  });
})();
`;

export function TableFilterEnhancer() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
