// Zero-build: the browser imports the same data + renderer the build script uses.
import { types, TYPE_KEYS } from "./data/types.mjs";
import { renderConfig } from "./data/render.mjs";
import { examples } from "./data/examples.mjs";

// A little fun: one glyph per type (no external assets, works offline).
const EMOJI = {
  INTJ: "♟️", INTP: "🔬", ENTJ: "📊", ENTP: "⚡",
  INFJ: "🕯️", INFP: "🌙", ENFJ: "🤝", ENFP: "✨",
  ISTJ: "📐", ISFJ: "🛡️", ESTJ: "🗂️", ESFJ: "🎈",
  ISTP: "🔧", ISFP: "🎨", ESTP: "🏍️", ESFP: "🎤",
};

const grid = document.getElementById("grid");
const output = document.getElementById("output");
const preview = document.querySelector("#preview code");
const status = document.getElementById("status");
const exPrompt = document.getElementById("ex-prompt");
const exReply = document.getElementById("ex-reply");
const outputType = document.getElementById("output-type");

let selected = null;

function currentMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

function render() {
  if (!selected) return;
  const mode = currentMode();
  preview.textContent = renderConfig(selected, mode);
  const ex = examples[selected];
  if (ex) {
    exPrompt.textContent = ex.prompt;
    exReply.textContent = ex[mode];
  }
  outputType.textContent = `${EMOJI[selected] || ""} ${selected} · ${types[selected].nickname}`;
}

// Build the 16-card grid.
for (const key of TYPE_KEYS) {
  const t = types[key];
  const card = document.createElement("button");
  card.className = "card" + (t.stub ? " stub" : "");
  card.dataset.type = key;
  card.innerHTML = `<span class="emoji">${EMOJI[key] || ""}</span>
    <span class="mbti">${key}</span>
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
  flash("Copied. Now paste it into your AI's instructions (step 3 below).");
});

document.getElementById("download").addEventListener("click", () => {
  const blob = new Blob([preview.textContent], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "AGENTS.md";
  a.click();
  URL.revokeObjectURL(a.href);
  flash("Saved AGENTS.md. See step 3 below for where it goes.");
});

function flash(msg) {
  status.textContent = msg;
  setTimeout(() => (status.textContent = ""), 4000);
}
