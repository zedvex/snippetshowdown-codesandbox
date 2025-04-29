#!/usr/bin/env node
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import fetch from "node-fetch";
import { getParameters } from "codesandbox-import-utils/lib/api/define.js";

const token = process.env.CODESANDBOX_TOKEN;
if (!token) {
  console.error("❌  Set CODESANDBOX_TOKEN first"); process.exit(1);
}

/* ---- walk the repo and build { <relativePath>: {content} } ---- */
const walk = dir =>
  Object.fromEntries(
    readdirSync(dir, { withFileTypes: true })
      .flatMap(d => d.isDirectory()
        ? Object.entries(walk(join(dir, d.name)))
        : [[ join(dir, d.name), { content: readFileSync(join(dir, d.name), "utf8") } ]])
  );

const files = walk(".");
const parameters = getParameters({ files });

/* ---- call the Define endpoint ---- */
const res = await fetch("https://codesandbox.io/api/v1/sandboxes/define?json=1", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({ parameters })
});

if (!res.ok) { console.error(await res.text()); process.exit(1); }

const { sandbox_id } = await res.json();
console.log("\n✅  Sandbox:", sandbox_id);
console.log("👉  Embed URL:\nhttps://codesandbox.io/p/sandbox/" +
            sandbox_id + "?embed=1&view=editor\n");
