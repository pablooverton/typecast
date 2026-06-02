// Zero-build: the browser imports the same data + renderer the build script uses.
import { types, TYPE_KEYS } from "./data/types.mjs";
import { renderConfig } from "./data/render.mjs";

const grid = document.getElementById("grid");
const output = document.getElementById("output");
const preview = document.querySelector("#preview code");
const status = document.getElementById("status");

let selected = null;

function currentMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

function render() {
  if (!selected) return;
  preview.textContent = renderConfig(selected, currentMode());
}

// Build the 16-card grid.
for (const key of TYPE_KEYS) {
  const t = types[key];
  const card = document.createElement("button");
  card.className = "card" + (t.stub ? " stub" : "");
  card.dataset.type = key;
  card.innerHTML = `<span class="mbti">${key}</span>
    <span class="nick">${t.nickname}</span>
    <span class="blurb">${t.blurb}</span>
    ${t.stub ? '<span class="soon">coming soon</span>' : ""}`;
  card.addEventListener("click", () => {
    if (t.stub) return;
    selected = key;
    document.querySelectorAll(".card").forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
    output.hidden = false;
    render();
    output.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  grid.appendChild(card);
}

document.querySelectorAll('input[name="mode"]').forEach((r) =>
  r.addEventListener("change", render)
);

document.getElementById("copy").addEventListener("click", async () => {
  await navigator.clipboard.writeText(preview.textContent);
  flash("Copied. Paste into your project's AGENTS.md or custom instructions.");
});

document.getElementById("download").addEventListener("click", () => {
  const blob = new Blob([preview.textContent], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "AGENTS.md";
  a.click();
  URL.revokeObjectURL(a.href);
  flash("Downloaded AGENTS.md");
});

function flash(msg) {
  status.textContent = msg;
  setTimeout(() => (status.textContent = ""), 4000);
}
