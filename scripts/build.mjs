#!/usr/bin/env node
// Regenerates types/AGENTS_<TYPE>.md for every type from the single source of
// truth (data/types.mjs). Run: npm run build

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { TYPE_KEYS, types } from "../data/types.mjs";
import { renderBoth } from "../data/render.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "types");
mkdirSync(outDir, { recursive: true });

let written = 0;
let stubs = 0;
for (const key of TYPE_KEYS) {
  const file = join(outDir, `AGENTS_${key}.md`);
  writeFileSync(file, renderBoth(key));
  written++;
  if (types[key].stub) stubs++;
}

console.log(`✓ wrote ${written} files to types/ (${written - stubs} complete, ${stubs} stubs)`);
