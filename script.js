document.getElementById("year").textContent = new Date().getFullYear();

// Cycle the "status" value in the hero code sample
const statuses = ['"building…"', '"shipping 🚀"', '"learning"', '"open to work"'];
const statusEl = document.getElementById("status");
let i = 0;
setInterval(() => {
  i = (i + 1) % statuses.length;
  statusEl.textContent = statuses[i];
}, 2000);

// Render snippets with search + copy buttons
const list = document.getElementById("snippet-list");
const search = document.getElementById("snippet-search");
const empty = document.getElementById("snippet-empty");

const escapeHTML = (str) =>
  str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const renderSnippets = (query = "") => {
  const q = query.trim().toLowerCase();
  const matches = SNIPPETS.filter((s) =>
    [s.title, s.description, ...s.tags].join(" ").toLowerCase().includes(q)
  );

  list.innerHTML = matches
    .map(
      (s) => `
      <article class="snippet">
        <div class="snippet-head">
          <h3>${escapeHTML(s.title)}</h3>
          <button class="copy" type="button" data-title="${escapeHTML(s.title)}">Copy</button>
        </div>
        <p>${escapeHTML(s.description).replace(/`([^`]+)`/g, "<code>$1</code>")}</p>
        <div class="tags">${s.tags.map((t) => `<span>#${escapeHTML(t)}</span>`).join("")}</div>
        <pre><code>${escapeHTML(s.code)}</code></pre>
      </article>`
    )
    .join("");
  empty.hidden = matches.length > 0;
};

list.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy");
  if (!btn) return;
  const snippet = SNIPPETS.find((s) => s.title === btn.dataset.title);
  try {
    await navigator.clipboard.writeText(snippet.code);
    btn.textContent = "Copied!";
  } catch {
    btn.textContent = "Failed";
  }
  setTimeout(() => (btn.textContent = "Copy"), 1500);
});

search.addEventListener("input", (e) => renderSnippets(e.target.value));
renderSnippets();
