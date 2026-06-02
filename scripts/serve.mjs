#!/usr/bin/env node
// Tiny zero-dependency static server for local preview. Run: npm run serve
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = process.env.PORT || 5173;
const mime = {
  ".html": "text/html", ".css": "text/css", ".mjs": "text/javascript",
  ".js": "text/javascript", ".md": "text/markdown", ".json": "application/json",
};

createServer(async (req, res) => {
  let path = decodeURIComponent(req.url.split("?")[0]);
  if (path === "/") path = "/index.html";
  const file = join(root, normalize(path).replace(/^(\.\.[/\\])+/, ""));
  try {
    const data = await readFile(file);
    res.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("404");
  }
}).listen(port, () => console.log(`claudetype → http://localhost:${port}`));
